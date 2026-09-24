import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== "usmankhaleed899@gmail.com") {
    redirect("/admin/login");
  }

  const [{ data: services }, { data: packages }, { data: projects }, { data: faqs }] =
    await Promise.all([
      supabase.from("services").select("id").eq("is_active", true),
      supabase.from("packages").select("id").eq("is_active", true),
      supabase.from("projects").select("id").eq("is_active", true),
      supabase.from("faqs").select("id").eq("is_active", true),
    ]);

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">KAYTECH CMS</p>
            <h1 className="text-h1 mt-2">Website content</h1>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              The CMS foundation is connected. Content editing screens come next.
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="rounded-button border border-[var(--color-border)] px-4 py-2 text-sm">
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Services", services?.length ?? 0],
            ["Packages", packages?.length ?? 0],
            ["Projects", projects?.length ?? 0],
            ["FAQs", faqs?.length ?? 0],
          ].map(([label, count]) => (
            <div key={label} className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="text-support text-[var(--color-text-secondary)]">{label}</p>
              <p className="mt-2 text-3xl font-semibold">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
