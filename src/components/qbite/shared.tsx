import { Check, Circle, Clock3, Heart, MapPin, Minus, Plus, Queue, ShoppingBag, WifiOff } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQBite } from "@/context/qbite-context";
import type { FoodItem, OrderStatus } from "@/data/qbite";

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
    <div className="min-w-0">{eyebrow && <p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p>}<h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p></div>{action}
  </div>;
}

export function SectionTitle({ title, note, action }: { title: string; note?: string; action?: ReactNode }) {
  return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3"><div className="min-w-0"><h2 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h2>{note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}</div>{action}</div>;
}

const statusStyle: Record<OrderStatus, string> = {
  Pending: "border-status-pending-border bg-status-pending text-status-pending-foreground",
  Accepted: "border-status-accepted-border bg-status-accepted text-status-accepted-foreground",
  Preparing: "border-status-preparing-border bg-status-preparing text-status-preparing-foreground",
  Ready: "border-status-ready-border bg-status-ready text-status-ready-foreground",
  Completed: "border-status-completed-border bg-status-completed text-status-completed-foreground",
  Cancelled: "border-status-cancelled-border bg-status-cancelled text-status-cancelled-foreground",
};
export function StatusBadge({ status }: { status: OrderStatus }) { return <Badge variant="outline" className={cn("gap-1.5 py-1", statusStyle[status])}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</Badge>; }

export function CanteenStatus({ compact = false }: { compact?: boolean }) {
  return <div className={cn("flex items-center gap-3", compact ? "" : "rounded-lg border bg-card p-4")}><span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40"/><span className="relative h-2.5 w-2.5 rounded-full bg-success"/></span><div className="min-w-0"><p className="font-semibold text-foreground">Canteen Open</p><p className="text-xs text-muted-foreground">11:00 AM – 5:00 PM</p></div></div>;
}

export function QueueCard({ compact = false }: { compact?: boolean }) {
  return <Card className={cn("overflow-hidden border-primary/20 shadow-sm", compact ? "p-4" : "p-5 sm:p-6")}><div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><div className="min-w-0"><div className="flex items-center gap-2 text-sm font-semibold text-primary"><Queue className="h-4 w-4"/>Current queue</div><p className="mt-2 text-2xl font-bold text-foreground">12 <span className="text-base font-medium text-muted-foreground">orders ahead</span></p><p className="mt-1 text-sm text-muted-foreground">Estimated preparation · ~15 min</p></div><div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Clock3 className="h-5 w-5"/></div></div><div className="mt-5 flex gap-1" aria-label="Queue progress">{Array.from({length:12}).map((_,i)=><span key={i} className={cn("h-2 flex-1 rounded-sm",i<8?"bg-primary":"bg-secondary")}/>)}</div><p className="mt-2 text-xs text-muted-foreground">Queue is moving steadily</p></Card>;
}

export function FoodCard({ item, compact = false }: { item: FoodItem; compact?: boolean }) {
  const { addToCart, toggleFavorite, favorites } = useQBite();
  const [added, setAdded] = useState(false);
  const favorite = favorites.includes(item.id);
  const add = () => { addToCart(item); setAdded(true); window.setTimeout(() => setAdded(false), 900); };
  return <Card className={cn("group overflow-hidden border-border/80 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md", compact && "grid grid-cols-[108px_minmax(0,1fr)]")}>
    <div className={cn("relative overflow-hidden bg-muted", compact ? "h-full min-h-36" : "aspect-[16/10]")}><img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"/><Button variant="secondary" size="icon" className="absolute right-2 top-2 h-9 w-9 rounded-full shadow-sm" onClick={() => toggleFavorite(item.id)} aria-label={favorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}><Heart className={cn("h-4 w-4", favorite && "fill-primary text-primary")}/></Button>{item.popular && <span className="absolute bottom-2 left-2 rounded-md bg-popular px-2 py-1 text-xs font-bold text-popular-foreground">Campus pick 🔥</span>}</div>
    <div className="flex min-w-0 flex-col p-4"><div className="min-w-0"><h3 className="truncate font-bold text-foreground">{item.name}</h3><p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.description}</p></div><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"><span className={cn("font-semibold", item.available ? "text-success" : "text-destructive")}>{item.available ? "● Available" : "● Out of stock"}</span><span className="flex items-center gap-1 text-muted-foreground"><Clock3 className="h-3.5 w-3.5"/>{item.prepMinutes} min</span></div><div className="mt-auto flex items-end justify-between gap-2 pt-4"><p className="text-lg font-bold text-foreground">₹{item.price}</p><Button size="sm" onClick={add} disabled={!item.available} className={cn("min-w-24 transition-transform", added && "scale-95")} >{added ? <><Check/>Added</> : <><Plus/>Add</>}</Button></div></div>
  </Card>;
}

export function QuantityControl({ id, quantity }: { id: string; quantity: number }) {
  const { changeQuantity } = useQBite();
  return <div className="flex h-10 items-center rounded-md border bg-background"><Button variant="ghost" size="icon" className="h-9 w-9" onClick={()=>changeQuantity(id,-1)} aria-label="Decrease quantity"><Minus/></Button><span className="w-7 text-center text-sm font-bold">{quantity}</span><Button variant="ghost" size="icon" className="h-9 w-9" onClick={()=>changeQuantity(id,1)} aria-label="Increase quantity"><Plus/></Button></div>;
}

export function FloatingCart() {
  const { cartCount, cartTotal } = useQBite();
  if (!cartCount) return null;
  return <Link to="/checkout" className="fixed bottom-20 left-4 right-4 z-40 flex min-h-14 items-center justify-between rounded-lg bg-foreground px-4 text-background shadow-xl transition hover:-translate-y-0.5 sm:bottom-6 sm:left-auto sm:right-6 sm:w-72"><span className="flex items-center gap-3"><ShoppingBag className="h-5 w-5"/><span><strong className="block text-sm">{cartCount} {cartCount===1?"item":"items"} · ₹{cartTotal}</strong><span className="text-xs opacity-70">Ready when you are</span></span></span><strong className="text-sm">View Cart →</strong></Link>;
}

export function EmptyState({ icon, title, description, actionLabel, to }: { icon?: ReactNode; title: string; description: string; actionLabel?: string; to?: "/menu" | "/orders" }) {
  return <div className="rounded-lg border border-dashed bg-card px-6 py-14 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary">{icon ?? <ShoppingBag/>}</div><h2 className="mt-4 text-xl font-bold">{title}</h2><p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>{actionLabel && to && <Button asChild className="mt-6"><Link to={to}>{actionLabel}</Link></Button>}</div>;
}

export function ErrorState({ title = "Something went wrong", description = "We couldn't load this right now." }: { title?: string; description?: string }) {
  return <div className="rounded-lg border bg-card px-6 py-12 text-center"><WifiOff className="mx-auto h-9 w-9 text-destructive"/><h2 className="mt-4 text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{description}</p><Button className="mt-5" onClick={()=>window.location.reload()}>Try Again</Button></div>;
}

export function LoadingGrid() { return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({length:6}).map((_,i)=><Card className="overflow-hidden" key={i}><Skeleton className="aspect-[16/10] rounded-none"/><div className="space-y-3 p-4"><Skeleton className="h-5 w-2/3"/><Skeleton className="h-4 w-full"/><Skeleton className="h-9 w-full"/></div></Card>)}</div>; }

export function ProgressSteps({ status }: { status: OrderStatus }) {
  const steps = ["Order Placed", "Accepted", "Preparing", "Ready", "Completed"];
  const current = status === "Pending" ? 0 : status === "Accepted" ? 1 : status === "Preparing" ? 2 : status === "Ready" ? 3 : 4;
  return <div><div className="relative flex justify-between"><div className="absolute left-[5%] right-[5%] top-4 h-1 bg-secondary"><div className="h-full bg-primary transition-all" style={{width:`${current*25}%`}}/></div>{steps.map((step,i)=><div key={step} className="relative z-10 flex w-1/5 flex-col items-center text-center"><span className={cn("grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold", i<current?"border-primary bg-primary text-primary-foreground":i===current?"border-primary bg-background text-primary":"border-border bg-background text-muted-foreground")}>{i<current?<Check className="h-4 w-4"/>:i===current?<span className="h-2 w-2 rounded-full bg-primary"/>:<Circle className="h-3 w-3"/>}</span><span className={cn("mt-2 hidden text-xs sm:block",i<=current?"font-semibold text-foreground":"text-muted-foreground")}>{step}</span></div>)}</div></div>;
}

export function PickupDetails({ slot="1:20 PM – 1:25 PM", counter="Main Canteen · Counter 2" }: { slot?: string; counter?: string }) {
  return <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-primary/10 p-4"><p className="text-xs font-bold uppercase text-primary">Pickup slot</p><p className="mt-1 text-lg font-bold text-foreground">{slot}</p></div><div className="rounded-lg bg-secondary p-4"><p className="flex items-center gap-1.5 text-xs font-bold uppercase text-muted-foreground"><MapPin className="h-3.5 w-3.5"/>Pickup counter</p><p className="mt-1 font-bold text-foreground">{counter}</p></div></div>;
}
