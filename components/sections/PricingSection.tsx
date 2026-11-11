import PricingCards from "./PricingCards";
import { createClient } from "@/lib/supabase/server";
import { PRICING_PLANS } from "@/lib/content";

export default async function PricingSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const [packageResult, promotionResult] = await Promise.all([
    supabase.from("packages").select("*").eq("is_active", true).order("display_order"),
    supabase.from("promotions")
      .select("id,name,ends_at,promotion_packages(package_id,promo_price_ngn)")
      .eq("status", "published")
      .lte("starts_at", now)
      .gt("ends_at", now)
      .order("starts_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const plans = packageResult.data?.length
    ? packageResult.data
    : PRICING_PLANS.map(p => ({ name: p.name, price_ngn: p.priceNGN, description: p.description, features: p.features, is_featured: p.featured }));
  const prices = new Map((promotionResult.data?.promotion_packages ?? []).map((item: any) => [item.package_id, item.promo_price_ngn]));
  const displayPlans = plans.map((plan: any) => ({
    ...plan,
    promo_price_ngn: promotionResult.data && plan.id ? prices.get(plan.id) ?? null : null,
  }));

  return <PricingCards
    plans={displayPlans}
    promotion={promotionResult.data ? { name: promotionResult.data.name, ends_at: promotionResult.data.ends_at } : null}
    headingLevel={headingLevel}
  />;
}
