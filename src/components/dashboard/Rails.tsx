import { Link } from "@tanstack/react-router";
import { Droplet, FlaskConical, Globe, Home, LayoutGrid, Plus, Search } from "lucide-react";
import { goals } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "./ScoreRing";

const tools = [
  { icon: Home, label: "Home", to: "/" },
  { icon: LayoutGrid, label: "Theory", to: "/theory" },
  { icon: Globe, label: "Trending products", to: "/theory/trending-products" },
  { icon: Search, label: "Articles", to: "/articles" },
  { icon: FlaskConical, label: "Ingredients", to: "/skincare" },
  { icon: Droplet, label: "EGCG report", to: "/reports/egcg" },
] as const;

export function ToolRail({ className }: { className?: string }) {
  return (
    <nav aria-label="Dashboard tools" className={cn("flex flex-col gap-5 rounded-2xl bg-card px-2 py-4 shadow-soft", className)}>
      {tools.map(({ icon: Icon, label, to }, i) => (
        <Link
          key={label}
          to={to}
          aria-label={label}
          title={label}
          className={cn(
            "grid size-10 place-items-center rounded-xl transition-colors",
            i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
        </Link>
      ))}
    </nav>
  );
}

export function GoalsRail({ className }: { className?: string }) {
  return (
    <aside className={cn("flex items-center gap-2 self-start rounded-full bg-ink p-2.5 text-ink-foreground lg:flex-col lg:py-3", className)}>
      <span className="eyebrow text-[0.6rem] text-ink-muted">Goals</span>
      {goals.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-1 text-center">
          <ScoreRing value={g.value} size={40} stroke={4} tone="ink">
            <span className="tabular text-xs">{g.value}</span>
          </ScoreRing>
          <span className="max-w-14 text-[0.65rem] leading-tight">{g.label}</span>
        </div>
      ))}
      <Button type="button" variant="secondary" size="icon" aria-label="Add goal" className="size-8 rounded-full">
        <Plus className="size-4" />
      </Button>
    </aside>
  );
}
