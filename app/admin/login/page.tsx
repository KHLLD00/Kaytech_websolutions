"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("usmankhaleed899@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">KAYTECH CMS</p>
        <h1 className="text-h1 mt-3">Admin login</h1>
        <p className="text-body mt-3 text-[var(--color-text-secondary)]">
          Sign in to manage Kaytech website content.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-support font-medium">Email</span>
            <input
              className="mt-2 w-full rounded-button border border-[var(--color-border)] bg-transparent px-4 py-3 outline-none"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-support font-medium">Password</span>
            <input
              className="mt-2 w-full rounded-button border border-[var(--color-border)] bg-transparent px-4 py-3 outline-none"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && (
            <p className="text-support rounded-button border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-button bg-[var(--color-accent-blue)] px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
