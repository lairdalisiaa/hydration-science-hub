import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { theoryIntro } from "@/lib/theory-data";
import skinImg from "@/assets/theory-skin-equals.jpg";

const tabs = [
  { to: "/theory", n: "01", label: "Cell Simulation" },
  { to: "/theory/trend-signal", n: "02", label: "Ingredient Trend Signal" },
  { to: "/theory/bioinformatics", n: "03", label: "Bioinformatics" },
  { to: "/theory/trending-products", n: "04", label: "Trending Products" },
] as const;

export function TheoryHeader({ dark }: { dark: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={cn("rounded-3xl p-4 shadow-soft backdrop-blur-xl sm:px-6 lg:rounded-none lg:bg-transparent lg:p-0 lg:px-6 lg:shadow-none lg:backdrop-blur-none", dark ? "bg-ink-raised" : "bg-card")}>
        <div className="flex items-center gap-4 sm:gap-6 lg:ml-[114px]">
          <img
            src={skinImg}
            alt="Black-and-white close-up of hydrated skin with an equals sign in the centre"
            width={816}
            height={816}
            className="size-20 shrink-0 rounded-full border-4 border-secondary object-cover sm:size-24"
          />
          <div className="min-w-0 max-w-3xl">
            <p className={cn("font-script text-3xl font-normal", dark ? "text-crimson-bright" : "text-crimson")}>
              Our theory
            </p>
            <p className={cn("mt-2 font-sans text-sm font-normal leading-relaxed", dark ? "text-crimson-bright" : "text-crimson")}>
              {theoryIntro}
            </p>
          </div>
        </div>
      </div>
      <nav aria-label="Theory sections" className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: true }}
            className={cn(
              "flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors lg:whitespace-normal",
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
