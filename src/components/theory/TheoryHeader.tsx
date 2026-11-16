import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { theoryIntro } from "@/lib/theory-data";
import skinImg from "@/assets/dewy-skin.jpg";

const tabs = [
  { to: "/theory", n: "01", label: "Cell Simulation" },
  { to: "/theory/trend-signal", n: "02", label: "Ingredient Trend Signal" },
  { to: "/theory/bioinformatics", n: "03", label: "Bioinformatics" },
  { to: "/theory/trending-products", n: "04", label: "Trending Products" },
] as const;

export function TheoryHeader({ dark }: { dark: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6 lg:ml-[114px]">
          <img
            src={skinImg}
            alt="Close-up of hydrated skin"
            width={816}
            height={816}
            className="size-20 shrink-0 rounded-full border-4 border-secondary object-cover sm:size-24"
          />
          <p className={cn("min-w-0 max-w-2xl font-script text-xl font-bold leading-[1.35] sm:text-2xl", dark ? "text-crimson-bright" : "text-crimson")}>
            {theoryIntro}
          </p>
        </div>
      </div>
      <nav aria-label="Theory sections" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: true }}
            className={cn(
              "flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
              dark ? "border-ink-raised bg-ink-raised/50 hover:bg-ink-raised" : "border-border bg-card hover:bg-muted",
            )}
            activeProps={{
              className: dark
                ? "!border-secondary !bg-secondary text-secondary-foreground"
                : "!border-ink !bg-ink text-ink-foreground shadow-[inset_0_-2px_0_var(--primary)]",
            }}
          >
            {({ isActive }) => (
              <>
                <span className={cn("font-mono text-xs", isActive ? "text-primary" : dark ? "text-ink-muted" : "text-muted-foreground")}>{t.n}</span>
                {t.label}
              </>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
