import { Bell, ClipboardList, Home, Menu as MenuIcon, UserRound, WifiOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QBiteProvider } from "@/context/qbite-context";
import { notifications } from "@/data/qbite";
import { FloatingCart } from "./shared";

const nav = [{to:"/" as const,label:"Home",icon:Home},{to:"/menu" as const,label:"Menu",icon:MenuIcon},{to:"/orders" as const,label:"Orders",icon:ClipboardList},{to:"/profile" as const,label:"Profile",icon:UserRound}];

function AppContent({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(true);
  useEffect(() => { const sync=()=>setOnline(navigator.onLine); sync(); window.addEventListener("online",sync); window.addEventListener("offline",sync); return()=>{window.removeEventListener("online",sync);window.removeEventListener("offline",sync)}; },[]);
  return <div className="min-h-screen bg-background text-foreground">
    {!online && <div className="bg-foreground px-4 py-2 text-center text-xs font-medium text-background"><WifiOff className="mr-1.5 inline h-3.5 w-3.5"/>You’re offline · Some QBite features may not update.</div>}
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur"><div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6"><Link to="/" className="flex min-w-0 items-center gap-2"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-lg font-black text-primary-foreground">Q</span><span className="truncate text-xl font-black">QBite</span><span className="hidden rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary sm:inline">Skip the queue</span></Link><div className="flex items-center gap-2"><nav className="hidden items-center gap-1 md:flex">{nav.map(({to,label})=><Link key={to} to={to} activeOptions={{exact:to==="/"}} className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground" activeProps={{className:"bg-primary/10 text-primary"}}>{label}</Link>)}</nav><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="relative" aria-label="Open notifications"><Bell/><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background"/></Button></SheetTrigger><SheetContent className="w-[92vw] sm:w-96"><SheetHeader><SheetTitle>Notifications</SheetTitle><SheetDescription>Updates for your campus orders.</SheetDescription></SheetHeader><div className="mt-6 space-y-2">{notifications.slice(0,3).map(n=><div key={n.id} className="rounded-lg border bg-card p-4"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><p className="font-bold">{n.title}</p><span className="text-xs text-muted-foreground">{n.time}</span></div><p className="mt-1 text-sm text-muted-foreground">{n.body}</p></div>)}</div><Button asChild variant="outline" className="mt-4 w-full"><Link to="/notifications">See all notifications</Link></Button></SheetContent></Sheet><Link to="/profile" className="hidden h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-bold md:grid">SA</Link></div></div></header>
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 md:pb-16">{children}</main><FloatingCart/>
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-background/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">{nav.map(({to,label,icon:Icon})=><Link key={to} to={to} activeOptions={{exact:to==="/"}} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-semibold text-muted-foreground" activeProps={{className:"text-primary"}}><Icon className="h-5 w-5"/><span>{label}</span></Link>)}</nav>
  </div>;
}
export function AppShell({ children }: { children: ReactNode }) { return <QBiteProvider><AppContent>{children}</AppContent></QBiteProvider>; }
