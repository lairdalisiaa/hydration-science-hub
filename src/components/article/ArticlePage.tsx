import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChangeChip, Formula, Panel, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { article, greenTeaProductIds, relatedArticles, routineSteps, takeaways, toc } from "@/lib/article-data";
import { productById } from "@/lib/products-data";
import heroImg from "@/assets/green-tea-glass-skin.jpg";
import moleculeImg from "@/assets/egcg-molecule.jpg";

const share = ["Link", "IG", "Pin", "X", "@"] as const;

export function ArticlePage() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(toc[0]!.id);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      let current = toc[0]!.id;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = t.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onShare = (s: (typeof share)[number]) => {
    const url = window.location.href;
    if (s === "Link") {
      void navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      return;
    }
    const text = encodeURIComponent(article.title);
    const u = encodeURIComponent(url);
    const targets = {
      IG: "https://www.instagram.com/",
      Pin: `https://www.pinterest.com/pin/create/button/?url=${u}&description=${text}`,
      X: `https://x.com/intent/post?url=${u}&text=${text}`,
      "@": `mailto:?subject=${text}&body=${u}`,
    } as const;
    window.open(targets[s], "_blank", "noopener");
  };

  const products = greenTeaProductIds.map(productById).filter((p) => p !== undefined);

  return (
    <main className="px-4 py-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <p className="eyebrow text-[0.6rem] text-muted-foreground">{article.breadcrumb.join(" / ")}</p>
        <p className="eyebrow text-[0.6rem] text-primary">{article.section}</p>
        <h1 className="text-4xl font-medium tracking-tight lg:text-5xl">{article.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{article.dek}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="size-9 rounded-full bg-blush" aria-hidden />
            <div>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">{article.author.bio}</p>
              <p className="text-xs text-muted-foreground">
                {article.readTime} · {article.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {share.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onShare(s)}
                aria-label={s === "Link" ? "Copy link" : `Share via ${s}`}
                className="eyebrow grid h-8 min-w-8 place-items-center rounded-full border border-border bg-card px-2 text-[0.6rem] hover:bg-muted"
              >
                {s === "Link" && copied ? <Check className="size-3" /> : s}
              </button>
            ))}
            <Button variant="ink" size="sm" className="rounded-full" aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
              <Bookmark className={cn("size-3.5", saved && "fill-current")} /> {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <figure className="mt-5">
        <img src={heroImg} alt="Green tea leaves and a serum dropper on glass" width={1024} height={640} className="aspect-[21/9] w-full rounded-3xl object-cover" />
        <figcaption className="eyebrow mt-2 text-[0.6rem] text-muted-foreground">Green tea leaves and a glass-skin finish</figcaption>
      </figure>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="flex max-w-2xl flex-col gap-8">
          <section id="why-green-tea" className="scroll-mt-6">
            <h2 className="text-2xl font-medium">Why green tea belongs in the glass skin conversation</h2>
            <p className="mt-3 text-muted-foreground">
              Glass skin started as a look: smooth, luminous, almost reflective. The routines that hold it over time lean on hydration and a calm barrier, and that is where green tea earns its place.
            </p>
            <p className="mt-3 text-muted-foreground">
              Its catechins, led by EGCG, are among the best-documented plant antioxidants in skincare, and they sit comfortably in the light, watery layers the look depends on.
            </p>
          </section>

          <section id="key-takeaways" className="scroll-mt-6">
            <h2 className="text-xl font-medium">Key Takeaways</h2>
            <ol className="mt-3 flex flex-col gap-2">
              {takeaways.map((t, i) => (
                <li key={t.title} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-mono text-[0.65rem] text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-sm text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="long-term-care" className="scroll-mt-6">
            <h2 className="text-2xl font-medium">From instant glow to long-term care</h2>
            <p className="mt-3 text-muted-foreground">
              The first wave of glass skin chased a same-day finish. The current one is slower: fewer actives, more water, and ingredients that can be used daily without wearing the barrier down.
            </p>
            <blockquote className="my-5 border-l-2 border-primary pl-4 text-xl">"Consistency matters more than intensity."</blockquote>
            <p className="text-muted-foreground">Green tea suits that shift. It layers easily, rarely stings, and supports skin on the days stronger treatments are resting.</p>
          </section>

          <section id="routine" className="scroll-mt-6">
            <h2 className="text-2xl font-medium">Where green tea fits in a routine</h2>
            <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {routineSteps.map((s, i) => (
                <li key={s.step} className={cn("rounded-xl p-3 text-sm", s.greenTea ? "border border-secondary bg-accent" : "bg-muted/50")}>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-medium">{s.step}</p>
                  {s.greenTea && <p className="font-mono text-[0.65rem] text-primary">green tea</p>}
                </li>
              ))}
            </ol>
          </section>

          <section id="ingredient-intelligence" className="scroll-mt-6">
            <h2 className="text-2xl font-medium">Ingredient Intelligence</h2>
            <p className="mt-3 text-muted-foreground">EGCG is the catechin doing most of the work. It is effective at low levels but poorly soluble, so the formula around it matters as much as the percentage.</p>
            <Panel className="mt-4 grid gap-4 sm:grid-cols-[140px_1fr]">
              <img src={moleculeImg} alt="3D render of the EGCG molecule" width={768} height={896} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
              <div>
                <div className="flex flex-wrap gap-1.5">
                  <Tag tone="ink">Role: Active</Tag>
                  <Tag>Evidence: High</Tag>
                </div>
                <p className="mt-2 font-medium">
                  Epigallocatechin gallate <span className="font-mono text-xs text-muted-foreground">EGCG · <Formula value="C22H18O11" /></span>
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  {[
                    ["Optimal range", "0.10–2.00%"],
                    ["Penetration", "80 · High"],
                    ["Solubility", "27 · Low"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-muted/60 p-2.5">
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link to="/reports/egcg" className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-4">
                  Full ingredient report <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Panel>
          </section>

          <section id="products" className="scroll-mt-6">
            <h2 className="text-xl font-medium">Products with green tea</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {products.map((p) => {
                const isSaved = savedProducts.includes(p.id);
                return (
                  <li key={p.id} className="rounded-2xl bg-card p-3 shadow-soft">
                    <img src={p.image} alt={p.name} width={816} height={816} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                    <p className="mt-2 text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="tabular">{p.price}</span> <ChangeChip value={p.change} />
                      </span>
                      <button
                        type="button"
                        aria-pressed={isSaved}
                        onClick={() => setSavedProducts((s) => (isSaved ? s.filter((x) => x !== p.id) : [...s, p.id]))}
                        className="rounded-full bg-accent px-2.5 py-1 text-xs"
                      >
                        {isSaved ? "Saved ✓" : "+ Save"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-card p-4">
              <span className="size-12 shrink-0 rounded-full bg-blush" aria-hidden />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">{article.author.bio}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-card p-4">
              <p className="eyebrow text-[0.6rem] text-muted-foreground">Next article · coming soon</p>
            </div>
          </div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <Panel as="div">
            <p className="eyebrow text-[0.6rem] text-muted-foreground">In this article · {progress}% read</p>
            <div className="mt-2 h-0.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={cn("flex items-center gap-2 py-0.5", active === t.id ? "font-medium" : "text-muted-foreground hover:text-foreground")}>
                    <span className={cn("size-1.5 rounded-full", active === t.id ? "bg-primary" : "bg-transparent")} />
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel as="div">
            <h2 className="font-medium">Related Articles</h2>
            <ul className="mt-2 flex flex-col divide-y divide-border">
              {relatedArticles.map((r) => (
                <li key={r.title} className="flex gap-3 py-2.5">
                  <span className="size-10 shrink-0 rounded-lg bg-accent" aria-hidden />
                  <div>
                    <p className="text-sm leading-snug">{r.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <div className="rounded-3xl bg-ink p-5 text-ink-foreground">
            <p className="eyebrow text-[0.6rem] text-secondary">Plan with it</p>
            <p className="mt-1 text-lg font-medium leading-snug">Add a green tea product to your routine</p>
            <Button variant="blush" size="sm" className="mt-3 rounded-full" asChild>
              <Link to="/reports/eye-serum">Send to planner</Link>
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
