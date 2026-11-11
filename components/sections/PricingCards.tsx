"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCurrency } from "@/hooks/useCurrency";

type Promotion = { name: string; ends_at: string };
function formatPrice(n: number, c: "NGN" | "USD", r: number | null) { return c === "USD" && r ? `$${(n * r).toLocaleString("en-US", { maximumFractionDigits: 0 })}` : `₦${n.toLocaleString("en-NG")}`; }

export default function PricingCards({ plans, headingLevel = "h2", promotion }: { plans: any[]; headingLevel?: "h1" | "h2"; promotion?: Promotion | null }) {
  const { currency, setCurrency, rate, canToggle } = useCurrency();
  const [secondsLeft, setSecondsLeft] = useState(() => promotion ? Math.max(0, Math.floor((new Date(promotion.ends_at).getTime() - Date.now()) / 1000)) : 0);
  useEffect(() => {
    if (!promotion) { setSecondsLeft(0); return; }
    const update = () => setSecondsLeft(Math.max(0, Math.floor((new Date(promotion.ends_at).getTime() - Date.now()) / 1000)));
    update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer);
  }, [promotion?.ends_at]);
  const promoActive = Boolean(promotion && secondsLeft > 0);
  const countdown = [["Days", Math.floor(secondsLeft / 86400)], ["Hours", Math.floor((secondsLeft % 86400) / 3600)], ["Mins", Math.floor((secondsLeft % 3600) / 60)], ["Secs", secondsLeft % 60]] as const;
  return <Section id="pricing">
    <div className="flex flex-col items-center gap-6">
      <SectionHeading eyebrow={promoActive ? "LIMITED-TIME SPECIAL OFFER" : "SIMPLE, TRANSPARENT PRICING"} heading="Choose the right starting point for your business." align="center" level={headingLevel} />
      {promoActive && <div className="text-center"><span className="inline-flex rounded-full bg-[var(--color-accent-blue)] px-3 py-1 text-xs font-semibold text-white">{promotion?.name}</span><div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"><span className="font-medium text-[var(--color-text-secondary)]">Offer ends in</span>{countdown.map(([label, value]) => <span key={label} className="min-w-14 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-center"><strong className="block text-lg tabular-nums">{String(value).padStart(2, "0")}</strong><span className="text-xs text-[var(--color-text-secondary)]">{label}</span></span>)}</div></div>}
      {canToggle && <div className="inline-flex rounded-ui border border-[var(--color-border)] p-1">{(["NGN", "USD"] as const).map(o => <button key={o} type="button" onClick={() => setCurrency(o)} aria-pressed={currency === o} className={`rounded-[8px] px-4 py-2 text-support font-semibold ${currency === o ? "bg-[var(--color-accent-blue)] text-white" : "text-[var(--color-text-secondary)]"}`}>{o === "NGN" ? "₦ Naira" : "$ USD"}</button>)}</div>}
    </div>
    <div className="kaytech-stagger mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">{plans.map(p => {
      const hasPromoPrice = promoActive && p.promo_price_ngn !== null && p.promo_price_ngn !== undefined;
      return <div key={p.id ?? p.name} className={`kaytech-card-hover flex flex-col rounded-card border p-8 ${p.is_featured ? "border-[var(--color-accent-blue)] bg-[var(--color-surface)] shadow-[0_20px_40px_-24px_rgba(37,99,235,0.35)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}>
        {p.is_featured && <span className="mb-4 inline-block w-fit rounded-full bg-[var(--color-accent-blue)] px-3 py-1 text-support font-semibold text-white">Most Popular</span>}{hasPromoPrice && <span className="mb-3 inline-block w-fit rounded-full border border-[var(--color-accent-blue)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-blue)]">Limited-time price</span>}
        <h3 className="text-h3">{p.name}</h3>{hasPromoPrice ? <><p className="mt-2 text-sm text-[var(--color-text-secondary)] line-through">{formatPrice(p.price_ngn, currency, rate)}</p><p className="text-h1 font-bold">{formatPrice(p.promo_price_ngn, currency, rate)}</p></> : <p className="text-h1 mt-2">{formatPrice(p.price_ngn, currency, rate)}</p>}
        <p className="text-body mt-2 text-[var(--color-text-secondary)]">{p.description}</p><ul className="mt-6 flex flex-1 flex-col gap-3">{(p.features ?? []).map((f: string) => <li key={f} className="text-body flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]" />{f}</li>)}</ul>
        <Button href="/quote" variant={p.is_featured ? "primary" : "secondary"} className="mt-8">Get a Free Quote</Button>
      </div>;
    })}</div>
  </Section>;
}
