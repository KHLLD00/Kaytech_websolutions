const CACHE_KEY = "kaytech_ngn_usd_rate";
const CACHE_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 hours

type CachedRate = { rate: number; fetchedAt: number };

export async function getNgnToUsdRate(): Promise<number | null> {
  if (typeof window !== "undefined") {
    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedRate = JSON.parse(cached);
        if (Date.now() - parsed.fetchedAt < CACHE_MAX_AGE_MS) {
          return parsed.rate;
        }
      }
    } catch {
      // ignore malformed cache, fall through to fetch
    }
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/NGN");
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.rates?.USD;
    if (typeof rate !== "number") return null;

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ rate, fetchedAt: Date.now() } satisfies CachedRate)
        );
      } catch {
        // storage unavailable, not critical
      }
    }
    return rate;
  } catch {
    return null;
  }
}
