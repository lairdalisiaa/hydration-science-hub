export function ExploreMarket({ className }: { className?: string }) {
  const { city, setCity } = useMarket();
  return (
    <section className={cn("rounded-3xl bg-card p-5 shadow-soft", className)}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-medium">Explore Market</h2>
        <span className="eyebrow text-muted-foreground">7 hubs</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Tap a city to see its top searches and skinomic focus.</p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {hubs.map((h) => {
          const selected = h.city === city;
          return (
            <li key={h.city}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setCity(h.city)}
                className={cn(
                  "relative w-full overflow-hidden rounded-xl text-left text-sm transition-colors",
                  selected ? "bg-ink text-ink-foreground" : "bg-muted hover:bg-muted/70",
                )}
              >
                {!selected && <div className="absolute inset-y-0 left-0 bg-blush" style={{ width: `${h.share}%` }} />}
                <div className="relative flex items-center justify-between px-4 py-4">
                  <span>{h.city}</span>
                  <span className="tabular">{h.share}%</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
