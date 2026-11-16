import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/theory", label: "Theory" },
  { to: "/article", label: "Article" },
  { to: "/reports", label: "Report & Guides" },
  { to: "/skincare", label: "Skincare" },
] as const;

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-4 lg:px-8">
      <Link to="/" className="font-display text-3xl font-extrabold tracking-tight">
        addottee.
      </Link>
      <nav aria-label="Main" className="order-3 flex w-full gap-1 overflow-x-auto rounded-full bg-muted p-1 lg:order-none lg:w-auto">
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
      <Button variant="blush" className="rounded-full px-5" asChild>
        <a href="#weekly-signal">Subscribe</a>
      </Button>
    </header>
  );
}
