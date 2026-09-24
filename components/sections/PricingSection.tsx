"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/content";
import { useCurrency } from "@/hooks/useCurrency";

function formatPrice(amountNGN: number, currency: "NGN" | "USD", rate: number | null) {
  if (currency === "USD" && rate) {
    const usd = amountNGN * rate;
    return `$${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `₦${amountNGN.toLocaleString("en-NG")}`;
}

export default function PricingSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const { currency, setCurrency, rate, canToggle } = useCurrency();

  return (
    <Section id="pricing">
      <div className="flex flex-col items-center gap-6">
        <SectionHeading
          eyebrow="SIMPLE, TRANSPARENT PRICING"
          heading="Choose the right starting point for your business."
          align="center"
          level={headingLevel}
        />
        {canToggle && (
          <div className="inline-flex rounded-ui border border-[var(--color-border)] p-1">
            {(["NGN", "USD"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCurrency(option)}
                aria-pressed={currency === option}
                className={`rounded-[8px] px-4 py-2 text-support font-semibold transition-colors min-h-[36px] ${
                  currency === option
                    ? "bg-[var(--color-accent-blue)] text-white"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {option === "NGN" ? "₦ Naira" : "$ USD"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-card border p-8 ${
              plan.featured
                ? "border-[var(--color-accent-blue)] bg-[var(--color-surface)] shadow-[0_20px_40px_-24px_rgba(37,99,235,0.35)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }`}
          >
            {plan.featured && (
              <span className="mb-4 inline-block w-fit rounded-full bg-[var(--color-accent-blue)] px-3 py-1 text-support font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-h3">{plan.name}</h3>
            <p className="text-h1 mt-2">{formatPrice(plan.priceNGN, currency, rate)}</p>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              {plan.description}
            </p>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="text-body flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              href="/quote"
              variant={plan.featured ? "primary" : "secondary"}
              className="mt-8"
            >
              Get a Free Quote
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
