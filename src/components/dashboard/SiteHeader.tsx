import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = ["Home", "Theory", "Article", "Report & Guides", "Skincare"];

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-4 lg:px-8">
      <span className="font-display text-3xl font-extrabold tracking-tight">addottee.</span>
      <nav className="order-3 flex w-full gap-1 overflow-x-auto rounded-full bg-muted p-1 lg:order-none lg:w-auto">
        {nav.map((item) => (
          <button
            key={item}
            type="button"
            aria-current={item === "Home" ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
              item === "Home" && "bg-card font-medium text-foreground shadow-sm",
            )}
          >
            {item}
          </button>
        ))}
      </nav>
      <Button variant="blush" className="rounded-full px-5">
        Subscribe
      </Button>
    </header>
  );
}
