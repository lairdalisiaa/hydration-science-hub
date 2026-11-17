import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { article, greenTeaProductIds, relatedArticles, routineSteps, takeaways } from "@/lib/article-data";
import { productById } from "@/lib/products-data";
import heroImg from "@/assets/green-tea-glass-skin.jpg";

export function MobileArticle() {
  const products = greenTeaProductIds.map(productById).filter(p => p !== undefined);
  return (
    <main className="flex flex-col gap-5 px-4 py-6 lg:hidden">
      <MobileCard className="overflow-hidden p-0">
        <div className="relative"><img src={heroImg} alt="Green tea leaves with a serum dropper" width={1280} height={896} className="aspect-[4/3] w-full object-cover" /><span className="absolute left-3 top-3 rounded-md bg-blush px-2 py-1 font-mono text-[0.6rem] text-crimson">INGREDIENT INTELLIGENCE</span></div>
        <div className="p-4"><h1 className="text-2xl font-semibold">Green Tea for <span className="font-script font-normal text-crimson">Glass Skin</span></h1><p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-5 rounded-full bg-secondary" />{article.author.name} · {article.readTime} · {article.date}</p></div>
      </MobileCard>
      <p className="text-sm leading-relaxed">{article.dek}</p>
      <MobileCarousel title="Key" script="takeaways" count={takeaways.length}>
        {takeaways.map((t, i) => <MobileCard key={t.title} className="w-60"><span className="grid size-7 place-items-center rounded-full bg-crimson font-mono text-[0.65rem] text-ink-foreground">{String(i + 1).padStart(2, "0")}</span><p className="mt-2 text-sm font-semibold">{t.title}</p><p className="mt-1 text-xs text-muted-foreground">{t.body}</p></MobileCard>)}
      </MobileCarousel>
      <blockquote className="border-l-2 border-crimson pl-4 font-serif text-2xl italic">“Consistency matters more than intensity.”</blockquote>
      <div className="grid grid-cols-2 gap-3">
        <MobileCard><MobileEyebrow>Routine fit</MobileEyebrow><ul className="mt-3 flex flex-col gap-1.5">{routineSteps.filter(s => s.greenTea).map(s => <li key={s.step} className="rounded-full bg-blush px-3 py-1 text-xs">{s.step}</li>)}</ul></MobileCard>
        <MobileCard className="bg-ingredient"><MobileEyebrow>EGCG</MobileEyebrow><div className="mt-6 flex items-center gap-2"><ScoreRing value={80} size={56}><span className="tabular text-sm font-semibold">80</span></ScoreRing><p className="text-xs">Penetration<br /><span className="text-muted-foreground">sample</span></p></div></MobileCard>
      </div>
      <MobileCarousel title="Products with" script="green tea" count={products.length}>
        {products.map(p => <MobileCard key={p.id} className="w-44"><img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" /><p className="mt-2 text-xs font-semibold">{p.name}</p><div className="mt-1 flex justify-between text-xs"><span>{p.price}</span><span className="text-positive">+{p.change}%</span></div></MobileCard>)}
      </MobileCarousel>
      <MobileCarousel title="Keep" script="reading" count={relatedArticles.length}>
        {relatedArticles.map(r => <MobileCard key={r.title} className="w-56"><div className="aspect-[16/9] rounded-xl bg-muted" /><p className="mt-2 font-mono text-[0.6rem] text-crimson">ARTICLES</p><p className="text-sm font-semibold">{r.title}</p></MobileCard>)}
      </MobileCarousel>
      <Link to="/skincare" className="flex items-center justify-between rounded-3xl bg-ink p-4 text-ink-foreground"><div><MobileEyebrow className="text-secondary">Plan with it</MobileEyebrow><p className="mt-1 font-script text-2xl">add green tea to your routine</p></div><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowUpRight className="size-4" /></span></Link>
    </main>
  );
}
