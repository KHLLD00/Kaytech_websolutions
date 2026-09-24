"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tab = "overview" | "hero" | "services" | "packages" | "projects" | "testimonials" | "faqs" | "settings";
type Row = Record<string, any>;

const adminEmail = "usmankhaleed899@gmail.com";

function Field({ label, value, onChange, multiline = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  const props = {
    value, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent-blue)]",
    type,
  };
  return <label className="block space-y-1.5"><span className="text-sm font-medium">{label}</span>{multiline ? <textarea {...props} rows={4} /> : <input {...props} />}</label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />{label}</label>;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [hero, setHero] = useState<Row>({});
  const [settings, setSettings] = useState<Row>({});
  const [services, setServices] = useState<Row[]>([]);
  const [packages, setPackages] = useState<Row[]>([]);
  const [projects, setProjects] = useState<Row[]>([]);
  const [faqs, setFaqs] = useState<Row[]>([]);
  const [testimonials, setTestimonials] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Row | null>(null);

  const load = async () => {
    setLoading(true);
    const [heroRes, settingsRes, servicesRes, packagesRes, projectsRes, faqsRes, testimonialsRes] = await Promise.all([
      supabase.from("site_content").select("content_key,value").eq("section","hero"),
      supabase.from("site_content").select("content_key,value").eq("section","settings"),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("packages").select("*").order("display_order"),
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("faqs").select("*").order("display_order"),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    ]);
    setHero(Object.fromEntries((heroRes.data ?? []).map(x => [x.content_key, x.value])));
    setSettings(Object.fromEntries((settingsRes.data ?? []).map(x => [x.content_key, x.value])));
    setServices(servicesRes.data ?? []);
    setPackages(packagesRes.data ?? []);
    setProjects(projectsRes.data ?? []);
    setFaqs(faqsRes.data ?? []);
    setTestimonials(testimonialsRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveContent = async (section: string, values: Row) => {
    setSaving(true); setMessage("");
    const rows = Object.entries(values).map(([content_key, value]) => ({ section, content_key, value: String(value ?? "") }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "section,content_key" });
    setMessage(error ? error.message : "Saved successfully.");
    setSaving(false);
  };

  const saveRow = async (table: string, row: Row) => {
    setSaving(true); setMessage("");
    const { id, created_at, updated_at, ...payload } = row;
    const { error } = id
      ? await supabase.from(table).update(payload).eq("id", id)
      : await supabase.from(table).insert(payload);
    setMessage(error ? error.message : "Saved successfully.");
    setSaving(false);
    if (!error) { setEdit(null); await load(); }
  };

  const deleteRow = async (table: string, id: string) => {
    if (!confirm("Remove this item from the website?")) return;
    setSaving(true);
    const { error } = await supabase.from(table).update({ is_active: false }).eq("id", id);
    setMessage(error ? error.message : "Removed.");
    setSaving(false);
    await load();
  };

  const upload = async (bucket: "hero" | "projects" | "general", file: File) => {
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const tabs: [Tab,string][] = [["overview","Overview"],["hero","Hero"],["services","Services"],["packages","Packages"],["projects","Projects"],["testimonials","Testimonials"],["faqs","FAQs"],["settings","Site Settings"]];

  if (loading) return <main className="min-h-screen p-8"><div className="mx-auto max-w-6xl">Loading CMS…</div></main>;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-bold tracking-[0.18em] text-[var(--color-accent-blue)]">KAYTECH CMS</p><h1 className="mt-1 text-2xl font-bold">Website content</h1></div>
          <form action="/auth/signout" method="post"><button className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm">Sign out</button></form>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
          {tabs.map(([key,label]) => <button key={key} onClick={() => {setTab(key);setEdit(null)}} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm ${tab===key ? "bg-[var(--color-accent-blue)] text-white" : "text-[var(--color-text-secondary)]"}`}>{label}</button>)}
        </div>
        {message && <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm">{message}</div>}
        {saving && <div className="mb-5 text-sm text-[var(--color-text-secondary)]">Saving…</div>}

        {tab === "overview" && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Services",services.length],["Packages",packages.length],["Projects",projects.length],["Testimonials",testimonials.length],["FAQs",faqs.length]].map(([a,b]) => <button key={String(a)} onClick={() => setTab(String(a).toLowerCase() as Tab)} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-left"><p className="text-sm text-[var(--color-text-secondary)]">{a}</p><p className="mt-2 text-3xl font-bold">{b}</p></button>)}</div>}

        {tab === "hero" && <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
          <h2 className="text-xl font-bold">Hero</h2><div className="mt-6 grid gap-5 md:grid-cols-2">
            {["eyebrow","heading","description","primary_cta_text","primary_cta_link","secondary_cta_text","secondary_cta_link","supporting_text"].map(k => <Field key={k} label={k.replaceAll("_"," ")} value={hero[k] ?? ""} onChange={v=>setHero({...hero,[k]:v})} multiline={k==="description"} />)}
            <Field label="Desktop image URL" value={hero.desktop_image ?? ""} onChange={v=>setHero({...hero,desktop_image:v})} />
            <Field label="Mobile image URL" value={hero.mobile_image ?? ""} onChange={v=>setHero({...hero,mobile_image:v})} />
            <label className="text-sm">Upload desktop image<input className="mt-2 block w-full text-sm" type="file" accept="image/*" onChange={async e=>{if(e.target.files?.[0]){try{const url=await upload("hero",e.target.files[0]);setHero({...hero,desktop_image:url})}catch(err:any){setMessage(err.message)}}}}/></label>
            <label className="text-sm">Upload mobile image<input className="mt-2 block w-full text-sm" type="file" accept="image/*" onChange={async e=>{if(e.target.files?.[0]){try{const url=await upload("hero",e.target.files[0]);setHero({...hero,mobile_image:url})}catch(err:any){setMessage(err.message)}}}}/></label>
          </div><button onClick={()=>saveContent("hero",hero)} className="mt-6 rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white">Save Hero</button>
        </section>}

        {tab === "services" && <CrudSection tab="services" rows={services} edit={edit} setEdit={setEdit} saveRow={saveRow} deleteRow={deleteRow} upload={upload} />}
        {tab === "packages" && <CrudSection tab="packages" rows={packages} edit={edit} setEdit={setEdit} saveRow={saveRow} deleteRow={deleteRow} upload={upload} />}
        {tab === "projects" && <CrudSection tab="projects" rows={projects} edit={edit} setEdit={setEdit} saveRow={saveRow} deleteRow={deleteRow} upload={upload} />}
        {tab === "testimonials" && <TestimonialsAdmin rows={testimonials} projects={projects} reload={load} setMessage={setMessage} />}
        {tab === "faqs" && <CrudSection tab="faqs" rows={faqs} edit={edit} setEdit={setEdit} saveRow={saveRow} deleteRow={deleteRow} upload={upload} />}

        {tab === "settings" && <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
          <h2 className="text-xl font-bold">Site Settings</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Contact and social details used across the site.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{["email","whatsapp_number","twitter_handle","twitter_url","instagram_url","linkedin_url"].map(k=><Field key={k} label={k.replaceAll("_"," ")} value={settings[k] ?? ""} onChange={v=>setSettings({...settings,[k]:v})} />)}</div>
          <button onClick={()=>saveContent("settings",settings)} className="mt-6 rounded-xl bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white">Save Settings</button>
        </section>}
      </div>
    </main>
  );
}

function CrudSection({ tab, rows, edit, setEdit, saveRow, deleteRow, upload }: any) {
  const fresh = () => tab==="services"
    ? {number:String(rows.length+1).padStart(2,"0"),title:"",short_description:"",description:"",icon:"",included_items:[],display_order:rows.length+1,is_active:true}
    : tab==="packages"
    ? {name:"",description:"",price_ngn:0,features:[],is_featured:false,display_order:rows.length+1,is_active:true}
    : tab==="projects"
    ? {name:"",description:"",category:"",tags:[],live_url:"",fallback_image:"",featured:false,display_order:rows.length+1,is_active:true}
    : {question:"",answer:"",display_order:rows.length+1,is_active:true};

  const labels = tab==="services" ? ["number","title","short_description","description","icon","included_items","display_order"]
    : tab==="packages" ? ["name","description","price_ngn","features","display_order"]
    : tab==="projects" ? ["name","description","category","tags","live_url","fallback_image","display_order"]
    : ["question","answer","display_order"];

  const display = rows.filter((r:any)=>r.is_active);
  return <section className="space-y-5">
    <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold capitalize">{tab}</h2><p className="text-sm text-[var(--color-text-secondary)]">Create, edit, reorder or remove published items.</p></div><button onClick={()=>setEdit(fresh())} className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2.5 text-sm font-semibold text-white">Add {tab.slice(0,-1)}</button></div>
    {edit && <div className="rounded-2xl border border-[var(--color-accent-blue)] bg-[var(--color-surface)] p-5">
      <div className="grid gap-5 md:grid-cols-2">
        {labels.map((k:string)=><Field key={k} label={k.replaceAll("_"," ")} value={Array.isArray(edit[k]) ? edit[k].join(", ") : String(edit[k] ?? "")} onChange={(v:string)=>setEdit({...edit,[k]:["included_items","features","tags"].includes(k)?v.split(",").map(x=>x.trim()).filter(Boolean):["price_ngn","display_order"].includes(k)?Number(v):v})} multiline={["description","short_description","answer"].includes(k)} type={["price_ngn","display_order"].includes(k)?"number":"text"} />)}
        {tab==="packages" && <Toggle label="Featured package" checked={!!edit.is_featured} onChange={v=>setEdit({...edit,is_featured:v})}/>}
        {tab==="projects" && <Toggle label="Featured project" checked={!!edit.featured} onChange={v=>setEdit({...edit,featured:v})}/>}
        {tab==="projects" && <label className="text-sm">Upload fallback image<input className="mt-2 block w-full text-sm" type="file" accept="image/*" onChange={async e=>{if(e.target.files?.[0]){try{const url=await upload("projects",e.target.files[0]);setEdit({...edit,fallback_image:url})}catch(err:any){}}}}/></label>}
      </div>
      <div className="mt-5 flex gap-2"><button onClick={()=>saveRow(tab,edit)} className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2 text-sm font-semibold text-white">Save</button><button onClick={()=>setEdit(null)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm">Cancel</button></div>
    </div>}
    <div className="grid gap-4">{display.map((r:any)=><div key={r.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-semibold">{r.title||r.name||r.question}</p><p className="mt-1 text-sm text-[var(--color-text-secondary)]">{r.short_description||r.description||r.answer||r.category||""}</p></div><div className="flex gap-2"><button onClick={()=>setEdit({...r})} className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm">Edit</button><button onClick={()=>deleteRow(tab,r.id)} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-sm">Remove</button></div></div></div>)}</div>
  </section>;
}


function TestimonialsAdmin({ rows, projects, reload, setMessage }: any) {
  const supabase = createClient();
  const [filter, setFilter] = useState("pending");
  const [edit, setEdit] = useState<Row | null>(null);
  const update = async (id: string, patch: Row) => { const { error } = await supabase.from("testimonials").update(patch).eq("id", id); setMessage(error ? error.message : "Testimonial updated."); if (!error) { setEdit(null); await reload(); } };
  const remove = async (id: string) => { if (!confirm("Delete this testimonial permanently?")) return; const { error } = await supabase.from("testimonials").delete().eq("id", id); setMessage(error ? error.message : "Testimonial deleted."); if (!error) await reload(); };
  const visible = rows.filter((r: Row) => r.status === filter);
  const projectName = (id: string | null) => projects.find((p: Row) => p.id === id)?.name ?? "No project";
  return <section className="space-y-5">
    <div><h2 className="text-xl font-bold">Testimonials</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Review client submissions before they appear on the website.</p></div>
    <div className="flex gap-2 overflow-x-auto">{["pending","published","rejected"].map((s)=><button key={s} onClick={()=>setFilter(s)} className={"rounded-xl px-4 py-2 text-sm capitalize " + (filter===s ? "bg-[var(--color-accent-blue)] text-white" : "border border-[var(--color-border)]")}>{s} ({rows.filter((r:Row)=>r.status===s).length})</button>)}</div>
    {visible.map((r: Row) => <article key={r.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      {edit?.id===r.id ? <div className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Name" value={edit!.client_name} onChange={v=>setEdit({...edit,client_name:v})}/><Field label="Company" value={edit!.company} onChange={v=>setEdit({...edit,company:v})}/><Field label="Role" value={edit!.role ?? ""} onChange={v=>setEdit({...edit,role:v||null})}/><Field label="Rating" type="number" value={String(edit!.rating)} onChange={v=>setEdit({...edit,rating:Number(v)})}/></div><Field label="Testimonial" multiline value={edit!.content} onChange={v=>setEdit({...edit,content:v})}/><Field label="Photo URL" value={edit!.photo_url ?? ""} onChange={v=>setEdit({...edit,photo_url:v||null})}/><label className="block space-y-1.5 text-sm font-medium">Project<select value={edit!.project_id ?? ""} onChange={e=>setEdit({...edit,project_id:e.target.value||null})} className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">{<option value="">No project</option>}{projects.map((p:Row)=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><div className="flex gap-2"><button onClick={()=>update(r.id,{client_name:edit!.client_name,company:edit!.company,role:edit!.role,content:edit!.content,rating:edit!.rating,photo_url:edit!.photo_url,project_id:edit!.project_id})} className="rounded-xl bg-[var(--color-accent-blue)] px-4 py-2 text-sm font-semibold text-white">Save changes</button><button onClick={()=>setEdit(null)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm">Cancel</button></div></div> : <><div className="flex flex-col gap-4 sm:flex-row sm:justify-between"><div><div className="text-sm tracking-[0.18em] text-[var(--color-accent-blue)]">{"★".repeat(Math.max(0,Math.min(5,r.rating)))}</div><p className="mt-3 text-body">“{r.content}”</p><p className="mt-4 font-semibold">{r.client_name}</p><p className="text-support text-[var(--color-text-secondary)]">{[r.role,r.company].filter(Boolean).join(", ")}</p><p className="mt-2 text-xs text-[var(--color-text-secondary)]">{projectName(r.project_id)}</p></div><div className="flex flex-wrap gap-2">{r.status==="pending" && <button onClick={()=>update(r.id,{status:"published"})} className="rounded-lg bg-[var(--color-accent-blue)] px-3 py-2 text-sm font-semibold text-white">Approve</button>}{r.status==="published" && <button onClick={()=>update(r.id,{status:"pending",featured:false})} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm">Unpublish</button>}{r.status!=="rejected" && <button onClick={()=>update(r.id,{status:"rejected",featured:false})} className="rounded-lg border border-red-500/40 px-3 py-2 text-sm">Reject</button>}{r.status==="rejected" && <button onClick={()=>update(r.id,{status:"pending"})} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm">Restore</button>}<button onClick={()=>setEdit(r)} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm">Edit</button>{r.status==="published" && <button onClick={()=>update(r.id,{featured:!r.featured})} className={"rounded-lg border px-3 py-2 text-sm " + (r.featured ? "border-[var(--color-accent-blue)] text-[var(--color-accent-blue)]" : "border-[var(--color-border)]")}>{r.featured ? "Featured" : "Feature"}</button>}<button onClick={()=>remove(r.id)} className="rounded-lg border border-red-500/40 px-3 py-2 text-sm">Delete</button></div></div></>}
    </article>)}
    {!visible.length && <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-sm text-[var(--color-text-secondary)]">No {filter} testimonials.</div>}
  </section>;
}
