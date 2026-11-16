import { TEWL_BANDS, classifyTewl, tewlMarkerPosition } from "@/lib/tewl";

/** Four-band TEWL scale with a marker, drawn on an ink background. */
export function TewlScale({ value }: { value: number }) {
  const marker = tewlMarkerPosition(value) * 100;
  const band = classifyTewl(value);
  return (
    <div>
      <div className="relative flex gap-1">
        {TEWL_BANDS.map((b) => (
          <div
            key={b.label}
            className={
              b.label === "Healthy"
                ? "h-1.5 flex-1 rounded-full bg-ink-foreground"
                : b.label === "Very healthy"
                  ? "h-1.5 flex-1 rounded-full bg-secondary"
                  : "h-1.5 flex-1 rounded-full bg-ink-raised"
            }
          />
        ))}
        <span className="absolute -top-1 h-3.5 w-1 -translate-x-1/2 rounded-full bg-primary" style={{ left: `${marker}%` }} />
      </div>
      <div className="eyebrow mt-2 grid grid-cols-4 text-[0.6rem] text-ink-muted">
        {TEWL_BANDS.map((b) => (
          <span key={b.label} className={b.label === band ? "text-ink-foreground" : undefined}>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
