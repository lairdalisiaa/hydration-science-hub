import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { topSearches } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import articleImg from "@/assets/green-tea-glass-skin.jpg";

export function FeaturedArticle({ className }: { className?: string }) {
  return (
    <article className={cn("rounded-3xl bg-card p-3 shadow-soft", className)}>
      <div className="relative overflow-hidden rounded-2xl">
        <img src={articleImg} alt="Green tea leaves and a serum dropper on glass" width={1024} height={640} className="aspect-[16/10] w-full object-cover" />
        <span className="eyebrow absolute left-3 top-3 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">Featured article</span>
      </div>
      <div className="px-2 pb-2 pt-3">
        <h3 className="text-xl font-medium">
          <Link to="/article" className="hover:underline hover:underline-offset-4">
            Green Tea for Glass Skin
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-2 text-foreground">
            <span className="size-6 rounded-full bg-blush" /> Albert Neilsen
          </span>
          <span>7 Aug 2026</span>
        </div>
      </div>
    </article>
  );
}

export function TopSearches({ className }: { className?: string }) {
  return (
    <section className={cn("flex flex-col rounded-3xl bg-card p-5 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-xl font-medium leading-tight">New York Top Searches</h2>
        <span className="shrink-0 pt-1 text-xs text-muted-foreground">vs prior week</span>
      </div>
      <p className="text-sm text-muted-foreground">Who's getting all the attention.</p>
      <ol className="mt-4 flex flex-1 flex-col gap-2">
        {topSearches.map((s, i) => (
          <li key={s.brand} className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-2.5">
            <span className="tabular w-6 text-lg">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-medium">
                {s.brand}
                {s.rising && (
                  <span className="eyebrow inline-flex items-center gap-1 rounded bg-ink px-1.5 py-0.5 text-[0.6rem] text-ink-foreground">
                    <Heart className="size-2.5 fill-current" /> Rising
                  </span>
                )}
              </p>
              <p className="truncate text-sm text-muted-foreground">{s.product}</p>
            </div>
            <span className={cn("tabular rounded-md px-2 py-1 text-xs font-medium", s.change >= 0 ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative")}>
              {s.change >= 0 ? "+" : ""}
              {s.change}%
            </span>
          </li>
        ))}
      </ol>
      <Button variant="ink" className="mt-4 w-full rounded-full" asChild>
        <Link to="/theory/trending-products">
          All trending products <ArrowUpRight className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
