"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Row = { id: string; name: string; description: string; status: string; starts_at: string; ends_at: string; promotion_packages: { package_id: string; promo_price_ngn: number }[] };
const inputClass = "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm";
const watValue = (v?: string) => { const d = v ? new Date(v) : new Date(); return new Date(d.getTime() + 60 * 60000).toISOString().slice(0, 16); };
const watIso = (v: string) => new Date(v + ":00+01:00").toISOString();

export default function PromotionsAdmin({ onMessage }: { onMessage: (v: string) => void }) {
  const db = createClient();
  const [packages, setPackages] = useState<any[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>({ name: "", description: "", starts_at: watValue(), ends_at: "2026-12-01T00:00", prices: {} });
  const [busy, setBusy] = useState(false);
  const load = async () => {
    const [p, r] = await Promise.all([db.from("packages").select("id,name,price_ngn").eq("is_active", true).order("display_order"), db.from("promotions").select("*,promotion_packages(package_id,promo_price_ngn)").order("created_at", { ascending: false })]);
    if (p.error || r.error) onMessage(p.error?.message ?? r.error?.message ?? "Could not load promotions.");
    setPackages(p.data ?? []); setRows((r.data ?? []) as Row[]);
  };
  useEffect(() => { void load(); }, []);
  const openNew = () => { setEditing(null); setShowForm(true); setForm({ name: "", description: "", starts_at: watValue(), ends_at: "2026-12-01T00:00", prices: Object.fromEntries(packages.map(p => [p.id, ""])) }); };
  const openEdit = (row: Row) => { setEditing(row); setShowForm(true); setForm({ name: row.name, description: row.description ?? "", starts_at: watValue(row.starts_at), ends_at: watValue(row.ends_at), prices: Object.fromEntries(packages.map(p => [p.id, String(row.promotion_packages.find(x => x.package_id === p.id)?.promo_price_ngn ?? "")])) }); };
  const save = async (publish: boolean) => {
    if (!form.name.trim() || !form.starts_at || !form.ends_at || new Date(form.ends_at) <= new Date(form.starts_at)) { onMessage("Enter a campaign name and a valid start/end window."); return; }
    const prices = packages.filter(p => form.prices[p.id] !== "" && form.prices[p.id] !== undefined).map(p => ({ package_id: p.id, promo_price_ngn: Number(form.prices[p.id]) }));
    if (!prices.length || prices.some(p => !Number.isInteger(p.promo_price_ngn) || p.promo_price_ngn < 0)) { onMessage("Enter at least one valid promotional price."); return; }
    if (publish) { const live = rows.find(r => r.id !== editing?.id && r.status === "published" && new Date(r.starts_at) <= new Date() && new Date(r.ends_at) > new Date()); if (live) { onMessage("Another promotion is currently live. Cancel or let it expire first."); return; } }
    setBusy(true);
    const payload = { name: form.name.trim(), description: form.description.trim(), starts_at: watIso(form.starts_at), ends_at: watIso(form.ends_at), status: publish ? "published" : (editing?.status ?? "draft") };
    let id = editing?.id; let error: any = null;
    if (id) ({ error } = await db.from("promotions").update(payload).eq("id", id));
    else { const slug = form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36); const result = await db.from("promotions").insert({ ...payload, slug }).select("id").single(); error = result.error; id = result.data?.id; }
    if (!error && id) { const removed = await db.from("promotion_packages").delete().eq("promotion_id", id); error = removed.error; if (!error) error = (await db.from("promotion_packages").insert(prices.map(p => ({ ...p, promotion_id: id })))).error; }
    setBusy(false); if (error) { onMessage(error.message); return; }
    setEditing(null); setShowForm(false); onMessage(publish ? "Promotion published." : "Draft saved."); await load();
  };
  const changeStatus = async (row: Row, value: "published" | "cancelled") => {
    if (value === "published") { const live = rows.find(r => r.id !== row.id && r.status === "published" && new Date(r.starts_at) <= new Date() && new Date(r.ends_at) > new Date()); if (live) { onMessage("Another promotion is currently live. Cancel or let it expire first."); return; } }
    const { error } = await db.from("promotions").update({ status: value }).eq("id", row.id);
    onMessage(error?.message ?? (value === "published" ? "Promotion published." : "Promotion cancelled.")); if (!error) await load();
  };
  return <section className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Promotions</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Run limited-time campaigns without changing regular package prices.</p></div><button onClick={openNew} className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-white">Create promotion</button></div>
    {showForm && <div className="space-y-4 rounded-2xl border border-[var(--color-accent-blue)] bg-[var(--color-surface)] p-5">
      <div className="grid gap-4 md:grid-cols-2">{(["name", "description"] as const).map(k => <label key={k} className="space-y-1.5 text-sm"><span className="font-medium capitalize">{k}</span><input className={inputClass} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} /></label>)}
      <label className="space-y-1.5 text-sm"><span className="font-medium">Starts</span><input type="datetime-local" className={inputClass} value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })} /></label><label className="space-y-1.5 text-sm"><span className="font-medium">Ends</span><input type="datetime-local" className={inputClass} value={form.ends_at} onChange={e => setForm({ ...form, ends_at: e.target.value })} /></label></div>
      <h3 className="text-sm font-semibold">Promotional prices (NGN)</h3><div className="grid gap-3 sm:grid-cols-3">{packages.map(p => <label key={p.id} className="space-y-1.5 text-sm"><span>{p.name} <span className="text-[var(--color-text-secondary)]">· Regular ₦{p.price_ngn.toLocaleString("en-NG")}</span></span><input type="number" min="0" step="1" className={inputClass} placeholder="Promo price" value={form.prices[p.id] ?? ""} onChange={e => setForm({ ...form, prices: { ...form.prices, [p.id]: e.target.value } })} /></label>)}</div>
      <div className="flex flex-wrap gap-2"><button disabled={busy} onClick={() => void save(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm disabled:opacity-50">Save draft</button><button disabled={busy} onClick={() => void save(true)} className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Saving…" : "Publish promotion"}</button><button onClick={() => { setEditing(null); setShowForm(false); }} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm">Close</button></div>
      <p className="text-xs text-[var(--color-text-secondary)]">All campaign dates are interpreted as West Africa Time (WAT, UTC+1).</p>
    </div>}
    <div className="grid gap-3">{rows.map(row => { const live = row.status === "published" && new Date(row.starts_at) <= new Date() && new Date(row.ends_at) > new Date(); const expired = new Date(row.ends_at) <= new Date(); return <article key={row.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{row.name}</h3><span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs">{live ? "Live" : expired ? "Expired" : row.status}</span></div><p className="mt-1 text-sm text-[var(--color-text-secondary)]">{row.description}</p><p className="mt-2 text-xs text-[var(--color-text-secondary)]">{new Date(row.starts_at).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })} · {new Date(row.ends_at).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}</p><p className="mt-2 text-sm">{row.promotion_packages.map(item => { const p = packages.find(x => x.id === item.package_id); return p ? `${p.name}: ₦${item.promo_price_ngn.toLocaleString("en-NG")}` : null; }).filter(Boolean).join(" · ")}</p></div><div className="flex flex-wrap gap-2"><button onClick={() => openEdit(row)} className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm">Edit</button>{row.status !== "published" && !expired && <button onClick={() => void changeStatus(row, "published")} className="rounded-lg bg-[var(--color-accent-blue)] px-3 py-1.5 text-sm font-semibold text-white">Publish</button>}{row.status !== "cancelled" && !expired && <button onClick={() => void changeStatus(row, "cancelled")} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-sm">Cancel</button>}</div></div></article>; })}</div>
    {!rows.length && <p className="rounded-2xl border border-[var(--color-border)] p-6 text-sm text-[var(--color-text-secondary)]">No promotions yet.</p>}
  </section>;
}
