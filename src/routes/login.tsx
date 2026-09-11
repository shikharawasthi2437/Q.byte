import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — QBite" },
      {
        name: "description",
        content: "Log in to QBite to pre-order campus food and skip the queue.",
      },
    ],
  }),
  component: LoginPage,
});

type LoginErrors = Partial<Record<"studentId" | "password", string>>;

function LoginPage() {
  const navigate = useNavigate({ from: "/login" });
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const clearError = (field: keyof LoginErrors) =>
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));

  const validate = () => {
    const next: LoginErrors = {};
    if (!studentId.trim()) next.studentId = "Please enter your student ID.";
    if (!password) next.password = "Please enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    // TODO(auth): wire up to Supabase auth sign-in once the backend is connected.
    // This is a UI-only placeholder — no account is actually authenticated yet.
    window.setTimeout(() => {
      setLoading(false);
      navigate({ to: "/" });
    }, 900);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-2">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-lg font-black text-primary-foreground">
          Q
        </span>
        <span className="text-2xl font-black text-foreground">QBite</span>
      </div>

      <Card className="w-full max-w-sm p-6 sm:p-7">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome back 👋</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Skip the queue. Get your food faster.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              name="studentId"
              autoComplete="username"
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(event) => {
                setStudentId(event.target.value);
                clearError("studentId");
              }}
              aria-invalid={!!errors.studentId}
              aria-describedby={errors.studentId ? "studentId-error" : undefined}
              className={
                errors.studentId ? "border-destructive focus-visible:ring-destructive" : undefined
              }
            />
            {errors.studentId && (
              <p id="studentId-error" className="text-xs font-medium text-destructive">
                {errors.studentId}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password">Password</Label>
              {/* TODO: swap for a TanStack <Link to="/forgot-password"> once that route exists */}
              <a href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError("password");
                }}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={
                  "pr-10" +
                  (errors.password ? " border-destructive focus-visible:ring-destructive" : "")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs font-medium text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          {/* TODO: swap for a TanStack <Link to="/signup"> once that route exists */}
          <a href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}