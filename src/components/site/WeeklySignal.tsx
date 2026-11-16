import { useState } from "react";
import { Button } from "@/components/ui/button";

export function WeeklySignal() {
  const [sent, setSent] = useState(false);
  return (
    <section id="weekly-signal" className="px-4 pb-6 lg:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="flex flex-col gap-3 rounded-3xl bg-card px-6 py-5 text-card-foreground shadow-soft sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="text-lg font-medium">Get weekly signals</h2>
        {sent ? (
          <p className="text-sm text-muted-foreground">Thanks — sign-ups open soon, we'll email you then.</p>
        ) : (
          <div className="flex gap-2 sm:w-[420px]">
            <label htmlFor="weekly-email" className="sr-only">
              Email address
            </label>
            <input
              id="weekly-email"
              type="email"
              required
              placeholder="Email address"
              className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" variant="blush" className="h-10 rounded-full px-5">
              Subscribe
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
