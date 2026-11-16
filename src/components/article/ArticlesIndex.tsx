import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { article, articleCategories, filterArticlePreviews, type ArticleCategory } from "@/lib/article-data";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/green-tea-glass-skin.jpg";

export function ArticlesIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory>("All");
  const [sort, setSort] = useState("recent");
  const results = filterArticlePreviews(query, category, sort);
  const featured = results.find((item) => item.available);
  const upcoming = results.filter((item) => !item.available);

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header>
        <h1 className="text-3xl font-medium">Articles</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ingredients behind the trends, the science, and the products built on them.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden />
            <Input aria-label="Search articles" placeholder="Search articles" value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 rounded-full pl-10" />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger aria-label="Sort articles" className="h-10 w-44 rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="recent">Recently Added</SelectItem><SelectItem value="title">Title A–Z</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Article categories">
          {articleCategories.map((item) => <Button key={item} variant="outline" size="sm" aria-pressed={category === item} onClick={() => setCategory(item)} className={cn("rounded-full px-5 shadow-none", category === item && "border-primary text-primary")}>{item}</Button>)}
        </div>
      </header>

      <section className="mt-9" aria-labelledby="trending-title">
        <h2 id="trending-title" className="text-xl font-medium">Trending</h2>
        <div className={cn("mt-4 grid gap-5", featured && upcoming.length > 0 && "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]")}>
          {featured && <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft backdrop-blur-xl">
            <Link to="/article" className="group block">
              <img src={heroImg} alt="Green tea leaves and a serum dropper on glass" width={1024} height={640} className="aspect-[16/9] w-full object-cover" />
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase text-primary">{featured.label}</p>
                <h3 className="mt-2 flex items-start justify-between gap-3 text-xl font-medium group-hover:underline">{featured.title}<ArrowUpRight className="mt-1 size-4 shrink-0" /></h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.dek}</p>
                <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"><span className="text-foreground">{article.author.name}</span><span>{article.readTime} · {article.date}</span></p>
              </div>
            </Link>
          </article>}
          {upcoming.length > 0 && <div className="flex flex-col gap-3">
            {upcoming.map((item) => <article key={item.id} className="flex min-h-24 flex-1 items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft backdrop-blur-xl">
              <div className="grid size-14 shrink-0 place-items-center rounded-md bg-muted"><FileText className="size-5 text-muted-foreground" aria-hidden /></div>
              <div><p className="font-mono text-[10px] uppercase text-primary">{item.label}</p><h3 className="mt-1 text-base font-medium">Coming soon</h3></div>
            </article>)}
          </div>}
        </div>
      </section>

      {results.length === 0 && <p role="status" className="py-8 text-sm text-muted-foreground">No articles found.</p>}
    </main>
  );
}