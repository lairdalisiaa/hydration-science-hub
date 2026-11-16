import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hubs } from "@/lib/dashboard-data";

export function ExploreMarket() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-3xl bg-card p-5 shadow-soft">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-medium">Explore Market</h2>
          <span className="eyebrow text-muted-foreground">7 hubs</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Where else it's heating up, relative to New York.</p>
        <ul className="mt-4 flex flex-col gap-1.5">
          {hubs.map((h, i) =>
            i === 0 ? (
              <li key={h.city} className="flex items-center justify-between rounded-xl bg-ink px-4 py-4 text-sm text-ink-foreground">
                <span>{h.city}</span>
                <span className="tabular">{h.share}%</span>
              </li>
            ) : (
              <li key={h.city} className="relative overflow-hidden rounded-xl bg-muted text-sm">
                <div className="absolute inset-y-0 left-0 bg-blush" style={{ width: `${h.share}%` }} />
                <div className="relative flex items-center justify-between px-4 py-4">
                  <span>{h.city}</span>
                  <span className="tabular">{h.share}%</span>
                </div>
              </li>
            ),
          )}
        </ul>
      </section>

      <section className="rounded-3xl bg-ink p-5 text-ink-foreground">
        <p className="eyebrow text-secondary">Partner app</p>
        <h3 className="mt-2 text-xl font-medium leading-snug">Make it official: plan your routine around what you read here</h3>
        <Button variant="blush" className="mt-4 rounded-full">
          Open the planner <ArrowUpRight className="size-4" />
        </Button>
      </section>
    </div>
  );
}
