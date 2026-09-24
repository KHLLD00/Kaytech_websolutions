import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — Kaytech Web Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "usmankhaleed899@gmail.com") redirect("/admin/login");
  return <AdminDashboard />;
}
