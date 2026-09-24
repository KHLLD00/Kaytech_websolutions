import { createClient } from "@/lib/supabase/server";

export type SiteContent = Record<string, string>;

export async function getSiteContent(section: string): Promise<SiteContent> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("content_key,value")
    .eq("section", section);
  return Object.fromEntries((data ?? []).map((row) => [row.content_key, row.value]));
}

export async function getCmsRows<T>(table: string, columns = "*"): Promise<T[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from(table)
    .select(columns)
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return (data ?? []) as T[];
}
