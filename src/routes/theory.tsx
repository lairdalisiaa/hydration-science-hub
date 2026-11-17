import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { TheoryHeader } from "@/components/theory/TheoryHeader";

export const Route = createFileRoute("/theory")({
  component: TheoryLayout,
});

function TheoryLayout() {
  const dark = useRouterState({ select: (s) => s.location.pathname.startsWith("/theory/trending-products") });
  return (
    <PageShell tone={dark ? "ink" : "light"} className={dark ? "" : "theory-mobile-paper"}>
      <main className="flex flex-col gap-5 px-4 py-6 lg:px-8">
        <TheoryHeader dark={dark} />
        <Outlet />
      </main>
    </PageShell>
  );
}
