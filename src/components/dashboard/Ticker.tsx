import { ticker } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch overflow-hidden border-t-2 border-primary bg-ink font-mono text-xs text-ink-foreground">
      <span className="z-10 flex shrink-0 items-center gap-2 rounded-r-full bg-secondary px-5 py-3 text-secondary-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-primary" /> LIVE
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-ticker gap-8 py-3 pl-6">
          {items.map((t, i) => (
            <span key={i} className="whitespace-nowrap">
              {t.sym}{" "}
              <span className={cn(t.change >= 0 ? "text-positive-soft" : "text-negative")}>
                {t.change >= 0 ? "▲+" : "▼"}
                {t.change.toFixed(1)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
