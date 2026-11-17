import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Phone-only building blocks shared by every mobile page layout. */
export function MobileCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-3xl bg-card p-4 shadow-soft backdrop-blur-xl", className)}>{children}</div>;
}

export function MobileEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow flex items-center gap-2 text-[0.65rem]", className)}><span className="size-1.5 shrink-0 rounded-full bg-crimson" />{children}</p>;
}

/** Section title with a red script word and a swipeable row of cards. */
export function MobileCarousel({ title, script, count, children }: { title: string; script: string; count: number; children: ReactNode }) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">{title} <span className="font-script text-2xl font-normal text-crimson">{script}</span></h2>
        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">{count}<ArrowRight className="size-3 text-crimson" /></span>
      </div>
      <div tabIndex={0} className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&>*]:shrink-0 [&>*]:snap-start">{children}</div>
    </section>
  );
}
