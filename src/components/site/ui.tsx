import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function Panel({ className, children, as: Tag = "section" }: { className?: string; children: ReactNode; as?: "section" | "div" | "article" | "aside" }) {
  return <Tag className={cn("rounded-3xl bg-card p-5 shadow-soft", className)}>{children}</Tag>;
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("eyebrow text-muted-foreground", className)}>{children}</p>;
}

/** Instrument Serif italic pink title, used for editorial section headings. */
export function SerifTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h2 className={cn("font-serif text-3xl italic text-primary", className)}>{children}</h2>;
}

export function Tag({ className, children, tone = "soft" }: { className?: string; children: ReactNode; tone?: "soft" | "ink" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs",
        tone === "soft" && "bg-accent text-accent-foreground",
        tone === "ink" && "bg-ink text-ink-foreground",
        tone === "outline" && "border border-border bg-card",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ChangeChip({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn(
        "tabular inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium",
        value >= 0 ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative",
        className,
      )}
    >
      {value >= 0 ? "+" : "−"}
      {Math.abs(value)}%
    </span>
  );
}

export function Bar({ value, tone = "pink", className }: { value: number; tone?: "pink" | "ink" | "blush"; className?: string }) {
  return (
    <div className={cn("h-1.5 rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full", tone === "pink" && "bg-primary", tone === "ink" && "bg-ink", tone === "blush" && "bg-secondary")}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

export type Level = "Low" | "Medium" | "High";

export function LevelScale({ level, tone = "light" }: { level: Level; tone?: "light" | "ink" }) {
  return (
    <span className="eyebrow inline-flex gap-1 text-[0.6rem]" aria-label={`${level} level`}>
      {(["Low", "Medium", "High"] as const).map((l) => (
        <span
          key={l}
          className={cn(
            "rounded px-1.5 py-0.5",
            l === level ? (tone === "ink" ? "bg-secondary text-secondary-foreground" : "bg-ink text-ink-foreground") : "text-muted-foreground",
          )}
        >
          {l}
        </span>
      ))}
    </span>
  );
}

/** Chemical formula with digits rendered as real subscripts in the UI font. */
export function Formula({ value, className }: { value: string; className?: string }) {
  const parts = value.split(/(\d+)/);
  return (
    <span className={className}>
      {parts.map((p, i) => (/^\d+$/.test(p) ? <sub key={i}>{p}</sub> : <span key={i}>{p}</span>))}
    </span>
  );
}

export function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" aria-label={`About ${label}`} className="inline-grid size-4 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground">
            <Info className="size-2.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-60 text-xs">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/** Two-option (or more) pill switch. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  tone = "light",
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  tone?: "light" | "ink";
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex gap-1 rounded-full p-1 text-xs", tone === "ink" ? "bg-ink-raised" : "bg-muted")}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={o === value}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            o === value
              ? tone === "ink"
                ? "bg-secondary text-secondary-foreground"
                : "bg-ink text-ink-foreground"
              : tone === "ink"
                ? "text-ink-muted hover:text-ink-foreground"
                : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
