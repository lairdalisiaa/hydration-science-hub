<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Homepage dashboard sections live in `src/components/dashboard/`, with display data in `src/lib/dashboard-data.ts` so it can later be swapped for live data in one place.
- Split device-specific presentation into small desktop/mobile layout components selected with CSS visibility at the existing lg breakpoint; reuse shared section components and data modules, never copy full routes or datasets, so phone edits cannot alter the desktop arrangement.
- TEWL band logic lives in `src/lib/tewl.ts` (tested in `tewl.test.ts`); components never hardcode band cutoffs.
- Every page wraps its body in `PageShell` (`src/components/site/`), which owns the header nav, page background and weekly sign-up strip, so site chrome changes happen once.
- Non-home pages keep components in `src/components/<area>/` and display data in `src/lib/<area>-data.ts` (theory, article, ingredients, reports, products), mirroring the dashboard split so sample data can be swapped for live data in one place.
- Report detail pages render inside `ReportShell` (market strip, live New York time bar, report icon rail); add new report routes to its rail rather than duplicating the frame.
- EGCG icon sections are child routes under `reports.egcg.tsx`; its shared report header and Outlet keep identity and controls consistent without duplicating them.
- Theory tabs are separate child routes of the `theory.tsx` layout, which switches the page to the ink theme for Trending Products.
- The desktop homepage pairs the article/search column with the focus/ingredient column in a shared grid; the article photo takes remaining height so their bottom cards align without fixed card heights.
- Articles browsing lives at /articles while /article retains the existing Green Tea detail page, so existing direct links continue to work.
- Keep the full Green Tea detail layout on both devices; mobile browsing has its own presentation and reads upcoming reports from the shared report data to avoid duplicating availability.
- Shared phone-only building blocks (cards, swipe rows) live in `src/components/site/mobile.tsx`; page-specific phone layouts sit beside their desktop components as Mobile*.tsx.
- Mobile carousel typography is opt-in per layout so reference-specific Theory headings do not change other pages or desktop presentation.
