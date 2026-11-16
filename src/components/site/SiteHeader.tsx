import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/theory", label: "Theory" },
  { to: "/articles", label: "Articles" },
  { to: "/reports", label: "Report & Guides" },
  { to: "/skincare", label: "Skincare" },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "ink" }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cn("flex items-center justify-between gap-4 border-b border-border px-6 py-4 lg:px-8", tone === "ink" ? "bg-ink text-ink-foreground" : "bg-card")}>
      <Link to="/" className="font-display text-3xl font-extrabold tracking-tight">
        addottee.
      </Link>
      <nav aria-label="Main" className="hidden gap-1 rounded-full bg-muted p-1 lg:flex">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "bg-card font-medium text-foreground shadow-sm" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Button variant="blush" className="rounded-full px-5" asChild>
          <a href="#weekly-signal">Subscribe</a>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetTitle className="font-display text-3xl font-extrabold tracking-tight">addottee.</SheetTitle>
            <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-xl px-4 py-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-muted font-medium text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
