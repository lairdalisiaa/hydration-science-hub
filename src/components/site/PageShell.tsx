import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./SiteHeader";
import { WeeklySignal } from "./WeeklySignal";

type Props = {
  children: ReactNode;
  /** Extra content pinned under the page (e.g. the homepage ticker). */
  footer?: ReactNode;
  /** Show the "Get the weekly signal" sign-up strip at the bottom. */
  signup?: boolean;
  className?: string;
  /** "ink" switches the page body to the dark theme (Theory · Trending Products). */
  tone?: "light" | "ink";
};

/** Shared frame for every page: rounded canvas, site header, page body. */
export function PageShell({ children, footer, signup = true, className, tone = "light" }: Props) {
  return (
    <div className="min-h-screen bg-muted/40 lg:p-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden bg-background lg:rounded-3xl lg:shadow-soft">
        <SiteHeader />
        <div className={cn(tone === "ink" ? "bg-page-ink text-ink-foreground" : "bg-page", className)}>
          {children}
          {signup && <WeeklySignal />}
        </div>
        {footer}
      </div>
    </div>
  );
}
