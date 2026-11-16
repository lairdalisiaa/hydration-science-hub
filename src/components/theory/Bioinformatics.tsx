import { Bar, Eyebrow, Panel, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { activityProfile, invitroAssays, literature, mechanisms, synergies } from "@/lib/theory-data";
import moleculeImg from "@/assets/azelaic-molecule.jpg";

export function Bioinformatics() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_1.3fr]">
        <Panel>
          <Eyebrow className="text-[0.6rem]">Lipophilic ligand efficiency</Eyebrow>
          <p className="mt-2 text-2xl">pIC50 – cLogP</p>
          <p className="mt-2 text-xs text-muted-foreground">How much activity the molecule delivers for its oiliness.</p>
          <Tag className="mt-3">Small molecule</Tag>
        </Panel>
        <Panel>
          <Eyebrow className="text-[0.6rem]">In vitro profile</Eyebrow>
          <p className="mt-2 text-2xl leading-tight">Cell and enzyme activity</p>
          <p className="mt-2 text-xs text-muted-foreground">What the ingredient does in controlled lab tests.</p>
          <Tag className="mt-3">Lab evidence</Tag>
        </Panel>
        <Panel>
          <Eyebrow className="text-[0.6rem]">Activity profile significance</Eyebrow>
          <ul className="mt-3 flex flex-col gap-3 text-sm">
            {activityProfile.map((a) => (
              <li key={a.label}>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span>{a.label}</span>
                  <span className={cn("eyebrow rounded px-1.5 py-0.5 text-[0.55rem]", a.level === "High" ? "bg-ink text-ink-foreground" : "bg-muted")}>{a.level}</span>
                </div>
                <Bar value={a.value} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <Eyebrow className="text-[0.6rem]">In vitro assays · sample</Eyebrow>
          <dl className="mt-2 flex flex-col divide-y divide-border text-sm">
            {invitroAssays.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 py-2">
                <dt>{k}</dt>
                <dd className="tabular font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>

      <section>
        <h2 className="text-xl font-medium">
          Mechanism of Action <span className="text-sm font-normal text-muted-foreground">· targets ranked by benefit</span>
        </h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {mechanisms.map((m, i) => (
            <li key={m.name} className="rounded-2xl bg-card p-4 shadow-soft">
              <span className={cn("font-mono text-xs", i === 0 ? "text-primary" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 text-lg font-medium">{m.name}</p>
              <p className="font-mono text-[0.65rem] text-muted-foreground">{m.code}</p>
              <p className="mt-1 text-xs">{m.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <Panel className="grid gap-5 md:grid-cols-[300px_1fr]">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={moleculeImg} alt="3D render of the Azelaic Acid molecule" width={1024} height={640} loading="lazy" className="aspect-square h-full w-full object-cover" />
          <span className="eyebrow absolute left-3 top-3 rounded bg-ink px-2 py-0.5 text-[0.6rem] text-ink-foreground">Sample</span>
        </div>
        <div>
          <h2 className="text-lg font-medium">Ingredient Relationships</h2>
          <p className="text-sm text-muted-foreground">Sample relationship for Azelaic Acid, with the pathways it follows.</p>
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {mechanisms.map((m, i) => (
              <li key={m.name} className="grid grid-cols-[28px_1fr_24px_auto] items-center gap-2 py-2.5 text-sm">
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium">{m.name}</span>
                <span className="text-primary" aria-hidden>→</span>
                <Tag>{m.outcome}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <h2 className="text-lg font-medium">Key Synergies</h2>
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {synergies.map((s, i) => (
              <li key={s.pair} className="grid gap-2 py-3 text-sm sm:grid-cols-[1fr_1.3fr_auto] sm:items-center">
                <span className="font-medium">{s.pair}</span>
                <span>
                  {s.note}
                  <span className="eyebrow mt-0.5 block text-[0.55rem] text-muted-foreground">Sample citation {String(i + 1).padStart(2, "0")}</span>
                </span>
                <Tag tone={s.level === "High" ? "ink" : "soft"}>{s.level} synergy</Tag>
              </li>
            ))}
          </ul>
        </Panel>
        <section className="flex flex-col rounded-3xl bg-ink p-5 text-ink-foreground">
          <p className="eyebrow text-secondary">Bioinformatics summary</p>
          <h2 className="mt-1 text-xl font-medium">How it reaches the skin</h2>
          <p className="mt-2 text-sm text-ink-muted">
            A small dicarboxylic acid that crosses the stratum corneum at formula pH 4–6. It acts on keratinization and pigment pathways in the living epidermis, which is why it shows up for both clarity and tone.
          </p>
          <span className="mt-4 self-start rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Clarifying</span>
        </section>
      </div>

      <Panel>
        <h2 className="text-lg font-medium">
          Literature Review <span className="eyebrow text-[0.6rem] font-normal text-muted-foreground">· sample counts</span>
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {literature.map((l) => (
            <div key={l.kind} className="rounded-2xl bg-muted/70 p-4">
              <Eyebrow className="text-[0.6rem]">{l.kind}</Eyebrow>
              <p className="tabular mt-1 text-3xl">{l.count}</p>
              <p className="text-xs text-muted-foreground">{l.note}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
