"use client";

import { useEffect, useState } from "react";
import { getNgnToUsdRate } from "@/lib/currency";

export type Currency = "NGN" | "USD";

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    getNgnToUsdRate().then((value) => {
      if (active) setRate(value);
    });
    return () => {
      active = false;
    };
  }, []);

  // If the rate never loads, there's nothing to convert to — stay on Naira.
  const canToggle = rate !== null;

  return { currency: canToggle ? currency : "NGN" as Currency, setCurrency, rate, canToggle };
}
