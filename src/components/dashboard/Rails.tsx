import { Droplet, FlaskConical, Globe, LayoutGrid, Plus, Search } from "lucide-react";
import { goals } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { ScoreRing } from "./ScoreRing";

const tools = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Globe, label: "Markets" },
  { icon: Search, label: "Searches" },
  { icon: FlaskConical, label: "Ingredients" },
  { icon: Droplet, label: "Hydration" },
];

export function ToolRail() {
  return (
    <nav aria-label="Dashboard tools" className="flex gap-2 self-start rounded-2xl bg-card p-2 shadow-soft lg:flex-col">
      {tools.map(({ icon: Icon, label }, i) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className={cn(
            "grid size-10 place-items-center rounded-xl transition-colors",
            i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </nav>
  );
}

export function GoalsRail() {
  return (
    <aside className="flex items-center gap-4 self-start rounded-full bg-ink p-3 text-ink-foreground lg:flex-col lg:py-4">
      <span className="eyebrow text-[0.6rem] text-ink-muted">Goals</span>
      {goals.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-1 text-center">
          <ScoreRing value={g.value} size={48} stroke={5} tone="ink">
            <span className="tabular text-sm">{g.value}</span>
          </ScoreRing>
          <span className="max-w-14 text-[0.65rem] leading-tight">{g.label}</span>
        </div>
      ))}
      <button type="button" aria-label="Add goal" className="grid size-11 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Plus className="size-4" />
      </button>
    </aside>
  );
}
