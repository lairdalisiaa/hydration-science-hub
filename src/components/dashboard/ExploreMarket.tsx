import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hubs } from "@/lib/dashboard-data";

export function ExploreMarket({ className }: { className?: string }) {
  return (
    <section className={cn("rounded-3xl bg-card p-5 shadow-soft", className)}>
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
  );
}

export function PartnerCard({ className }: { className?: string }) {
  return (
    <section className={cn("flex flex-col justify-between rounded-3xl bg-ink p-5 text-ink-foreground", className)}>
      <div>
        <p className="eyebrow text-secondary">Weekly newsletter</p>
        <h3 className="mt-2 text-xl font-medium leading-snug">Make it official: subscribe to our weekly newsletter</h3>
        <p className="mt-2 text-sm text-ink-muted">Skin barrier science, TEWL readings and the skincare trends worth knowing — every week.</p>
      </div>
      <Button variant="blush" className="mt-4 self-start rounded-full" asChild>
        <a href="#weekly-signal">
          Get weekly signals <ArrowUpRight className="size-4" />
        </a>
      </Button>
    </section>
  );
}
