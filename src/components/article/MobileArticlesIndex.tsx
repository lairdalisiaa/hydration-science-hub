import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { article, filterArticlePreviews, type ArticleCategory } from "@/lib/article-data";
import { reports } from "@/lib/reports-data";
import heroImg from "@/assets/green-tea-glass-skin.jpg";

export function MobileArticlesIndex({ query, category, sort }: { query: string; category: ArticleCategory; sort: string }) {
  const results = filterArticlePreviews(query, category, sort);
  const featured = results.find(item => item.available);
  const upcoming = results.filter(item => !item.available);
  const upcomingReports = reports.filter(report => report.status === "Coming soon" && report.title.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="mt-6 flex flex-col gap-5 lg:hidden">
      {featured && <section>
        <h2 className="mb-3 text-lg font-semibold">Featured <span className="font-script text-2xl font-normal text-crimson">article</span></h2>
        <Link to="/article" className="group block overflow-hidden rounded-3xl bg-card shadow-soft backdrop-blur-xl">
          <div className="relative"><img src={heroImg} alt="Green tea leaves and a serum dropper on glass" width={1280} height={896} className="aspect-[4/3] w-full object-cover" /><span className="absolute left-3 top-3 rounded-md bg-blush px-2 py-1 font-mono text-[10px] text-crimson">INGREDIENT INTELLIGENCE</span></div>
          <div className="p-4">
            <h3 className="flex items-start justify-between gap-3 text-[28px] font-semibold leading-tight"><span>Green Tea for <span className="font-script font-normal text-crimson">Glass Skin</span></span><ArrowUpRight className="mt-2 size-4 shrink-0" /></h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.dek}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-6 shrink-0 rounded-full bg-secondary" aria-hidden /><div><p className="font-medium text-foreground">{article.author.name} · {article.author.bio}</p><p>{article.readTime} · {article.date}</p></div></div>
          </div>
        </Link>
      </section>}
      {upcoming.length > 0 && <MobileCarousel title="Keep" script="reading" count={upcoming.length}>
        {upcoming.map(item => <MobileCard key={item.id} className="w-56"><div className="grid aspect-[16/9] place-items-center rounded-xl bg-muted/60"><FileText className="size-6 text-muted-foreground" aria-hidden /></div><p className="mt-3 font-mono text-[10px] uppercase text-crimson">{item.label}</p><h3 className="mt-1 text-sm font-semibold">Coming soon</h3></MobileCard>)}
      </MobileCarousel>}
      {upcomingReports.length > 0 && <MobileCarousel title="Upcoming" script="reports" count={upcomingReports.length}>
        {upcomingReports.map(report => <MobileCard key={report.title} className="flex min-h-44 w-56 flex-col"><MobileEyebrow>Coming soon</MobileEyebrow><FileText className="my-3 size-6 text-muted-foreground" aria-hidden /><h3 className="text-base font-semibold leading-tight">{report.title}</h3><p className="mt-auto pt-3 font-mono text-[10px] text-muted-foreground">{report.types.join(" · ")}</p></MobileCard>)}
      </MobileCarousel>}
    </div>
  );
}