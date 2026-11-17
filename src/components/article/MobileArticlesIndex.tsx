import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { article, filterArticlePreviews, routineSteps, takeaways, type ArticleCategory } from "@/lib/article-data";
import heroImg from "@/assets/green-tea-glass-skin.jpg";

export function MobileArticlesIndex({ query, category, sort }: { query: string; category: ArticleCategory; sort: string }) {
  const results = filterArticlePreviews(query, category, sort);
  const featured = results.find(item => item.available);
  return (
    <div className="mt-6 flex flex-col gap-5 lg:hidden">
      {featured && <section>
        <h2 className="mb-3 text-lg font-semibold">Featured <span className="font-script text-2xl font-normal text-crimson">article</span></h2>
        <Link to="/article" className="group block overflow-hidden rounded-3xl bg-card shadow-soft backdrop-blur-xl">
          <div className="relative"><img src={heroImg} alt="Green tea leaves and a serum dropper on glass" width={1280} height={896} className="aspect-[4/3] w-full object-cover" /><span className="absolute left-3 top-3 rounded-md bg-blush px-2 py-1 font-mono text-[10px] text-crimson">INGREDIENT INTELLIGENCE</span></div>
          <div className="p-4">
            <h3 className="flex items-start justify-between gap-3 text-[28px] font-semibold leading-tight"><span>Green Tea for <span className="font-script font-normal text-crimson">Glass Skin</span></span><ArrowUpRight className="mt-2 size-4 shrink-0" /></h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-6 shrink-0 rounded-full bg-secondary" aria-hidden /><div><p className="font-medium text-foreground">{article.author.name} · {article.author.bio}</p><p>{article.readTime} · {article.date}</p></div></div>
          </div>
        </Link>
      </section>}
      {featured && <>
        <p className="text-base leading-[1.6]">Glass skin started as a look. The routines that hold it lean on hydration and a calm barrier, and that is where green tea earns its place.</p>
        <MobileCarousel title="Key" script="takeaways" count={takeaways.length}>
          {takeaways.map((item, index) => <MobileCard key={item.title} className="w-60 border border-card"><span className="grid size-8 place-items-center rounded-full bg-primary font-mono text-xs font-medium text-primary-foreground">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 text-[15px] font-semibold leading-tight">{item.title}</h3><p className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">{item.body}</p></MobileCard>)}
        </MobileCarousel>
        <blockquote className="border-l-2 border-crimson py-1.5 pl-4 font-serif text-[26px] italic leading-[1.15]">“Consistency matters more than intensity.”</blockquote>
        <div className="grid grid-cols-2 items-stretch gap-3 [&>*]:min-w-0">
          <MobileCard className="flex min-h-56 flex-col"><MobileEyebrow>Routine fit</MobileEyebrow><ul className="mt-auto flex flex-col gap-1 pt-4">{routineSteps.filter(step => step.greenTea).map(step => <li key={step.step} className="rounded-full bg-blush px-2.5 py-1 text-xs font-semibold">{step.step}</li>)}</ul></MobileCard>
          <MobileCard className="flex flex-col border border-card bg-ingredient"><MobileEyebrow>EGCG</MobileEyebrow><div className="mt-auto flex flex-wrap items-center gap-2 pt-4"><ScoreRing value={80} size={62}><span className="tabular text-lg font-semibold">80</span></ScoreRing><p className="text-xs">Penetration<br /><span className="text-muted-foreground">Sample · evidence high</span></p></div></MobileCard>
        </div>
      </>}
      {results.length > 0 && <MobileCarousel title="Keep" script="reading" count={results.length}>
        {results.map(item => item.available ? <Link key={item.id} to="/article" className="block w-56 overflow-hidden rounded-3xl bg-card p-4 shadow-soft backdrop-blur-xl"><img src={heroImg} alt="Green tea leaves and a serum dropper" width={1280} height={896} className="aspect-[16/9] w-full rounded-xl object-cover" /><p className="mt-3 font-mono text-[10px] uppercase text-crimson">{item.label}</p><h3 className="mt-1 flex items-start justify-between gap-2 text-sm font-semibold">{item.title}<ArrowUpRight className="size-4 shrink-0" /></h3></Link> : <MobileCard key={item.id} className="w-56"><div className="grid aspect-[16/9] place-items-center rounded-xl bg-muted/60"><FileText className="size-6 text-muted-foreground" aria-hidden /></div><p className="mt-3 font-mono text-[10px] uppercase text-crimson">{item.label}</p><h3 className="mt-1 text-sm font-semibold">Coming soon</h3></MobileCard>)}
      </MobileCarousel>}
    </div>
  );
}