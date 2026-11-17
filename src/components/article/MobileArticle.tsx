import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { article, greenTeaProductIds, relatedArticles, routineSteps, takeaways } from "@/lib/article-data";
import { productById } from "@/lib/products-data";
import heroImg from "@/assets/green-tea-glass-skin.jpg";

export function MobileArticle() {
  const products = greenTeaProductIds.map(productById).filter(p => p !== undefined);
  const bodyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const body = bodyRef.current;
      if (!body) return;
      const top = body.getBoundingClientRect().top + window.scrollY;
      const distance = body.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(100, Math.max(0, (window.scrollY - top) / distance * 100)) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  return (
    <main ref={bodyRef} className="flex flex-col gap-3.5 px-4 pb-6 lg:hidden">
      <div role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} className="sticky top-0 z-10 -mx-4 h-[3px] bg-muted">
        <div className="h-full bg-crimson" style={{ width: `${progress}%` }} />
      </div>
      <MobileCard className="overflow-hidden p-0">
        <div className="relative"><img src={heroImg} alt="Green tea leaves with a serum dropper" width={1280} height={896} className="h-60 w-full object-cover sm:h-72" /><span className="absolute left-3.5 top-3.5 rounded-md bg-blush px-2 py-1 font-mono text-[10px] text-crimson">INGREDIENT INTELLIGENCE</span></div>
        <div className="p-4"><h1 className="text-[28px] font-semibold leading-[1.1]">Green Tea for <span className="font-script text-[33px] font-normal text-crimson">Glass Skin</span></h1><div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground"><span aria-hidden className="size-[26px] shrink-0 rounded-full bg-secondary" /><div><p className="font-medium text-foreground">{article.author.name} <span className="font-normal text-muted-foreground">· {article.author.bio}</span></p><p className="mt-0.5">{article.readTime} · {article.date}</p></div></div></div>
      </MobileCard>
      <p className="text-base leading-[1.6]">{article.dek}</p>
      <MobileCarousel title="Key" script="takeaways" count={takeaways.length}>
        {takeaways.map((t, i) => <MobileCard key={t.title} className="w-60 bg-card/75"><span className="grid size-8 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">{String(i + 1).padStart(2, "0")}</span><p className="mt-2.5 text-[15px] font-semibold leading-tight">{t.title}</p><p className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">{t.body}</p></MobileCard>)}
      </MobileCarousel>
      <blockquote className="border-l-2 border-crimson py-1.5 pl-4 font-serif text-[26px] italic leading-[1.15]">“Consistency matters more than intensity.”</blockquote>
      <div className="grid grid-cols-2 items-stretch gap-3 [&>*]:min-w-0">
        <MobileCard className="flex min-h-56 flex-col"><MobileEyebrow>Routine fit</MobileEyebrow><ul className="mt-auto flex flex-col gap-1 pt-3">{routineSteps.filter(s => s.greenTea).map(s => <li key={s.step} className="rounded-full bg-blush px-2.5 py-1 text-xs font-semibold">{s.step}</li>)}</ul></MobileCard>
        <MobileCard className="flex flex-col bg-ingredient"><MobileEyebrow>EGCG</MobileEyebrow><div className="mt-auto flex flex-wrap items-center gap-2 pt-3"><ScoreRing value={80} size={62}><span className="tabular text-base font-semibold">80</span></ScoreRing><p className="text-xs">Penetration<br /><span className="text-muted-foreground">sample</span></p></div></MobileCard>
      </div>
      <MobileCarousel title="Products with" script="green tea" count={products.length}>
        {products.map(p => <MobileCard key={p.id} className="flex w-44 flex-col"><img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" /><p className="mt-2 text-sm font-semibold leading-tight">{p.name}</p><p className="mt-1 text-xs text-muted-foreground">{p.brand}</p><div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[13px] font-semibold"><span>{p.price}</span><span className="rounded-md bg-positive-soft px-1.5 py-1 text-[11px] text-positive">+{p.change}%</span></div></MobileCard>)}
      </MobileCarousel>
      <MobileCarousel title="Keep" script="reading" count={relatedArticles.length}>
        {relatedArticles.map(r => <MobileCard key={r.title} className="w-56"><div className="aspect-[16/9] rounded-xl bg-muted" /><p className="mt-2 font-mono text-[0.6rem] text-crimson">ARTICLES</p><p className="text-sm font-semibold">{r.title}</p></MobileCard>)}
      </MobileCarousel>
      <Button asChild variant="ink" className="h-auto justify-between whitespace-normal rounded-3xl p-4 text-left"><Link to="/skincare"><div className="min-w-0"><MobileEyebrow className="text-secondary">Plan with it</MobileEyebrow><p className="mt-1.5 font-script text-2xl font-normal leading-tight">add green tea to your routine</p></div><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowUpRight className="size-4" /></span></Link></Button>
    </main>
  );
}
