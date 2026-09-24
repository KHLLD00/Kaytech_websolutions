"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { waLink } from "@/lib/constants";
import { buildMailto, buildQuoteMessage, QuoteFormData } from "@/lib/quote";

const WEBSITE_TYPES = ["Business website", "E-commerce", "Custom web app", "Not sure yet"];
const PACKAGES = ["Starter", "Business", "Professional", "Not sure yet"];

const initialData: QuoteFormData = {
  name: "",
  business: "",
  email: "",
  websiteType: WEBSITE_TYPES[0],
  packageName: PACKAGES[0],
  requirements: "",
};

const inputClasses =
  "w-full rounded-ui border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-body text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent-blue)]";

export default function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof QuoteFormData, string>> = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!data.requirements.trim()) next.requirements = "Please describe what you need.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) return <QuoteResult data={data} onEdit={() => setSubmitted(false)} />;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="text-support font-semibold">
          Name
        </label>
        <input
          id="name"
          className={`${inputClasses} mt-2`}
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <p className="text-support mt-1 text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="business" className="text-support font-semibold">
          Business name (optional)
        </label>
        <input
          id="business"
          className={`${inputClasses} mt-2`}
          value={data.business}
          onChange={(e) => update("business", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-support font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${inputClasses} mt-2`}
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <p className="text-support mt-1 text-red-500">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="websiteType" className="text-support font-semibold">
            Website Type
          </label>
          <select
            id="websiteType"
            className={`${inputClasses} mt-2`}
            value={data.websiteType}
            onChange={(e) => update("websiteType", e.target.value)}
          >
            {WEBSITE_TYPES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="packageName" className="text-support font-semibold">
            Package
          </label>
          <select
            id="packageName"
            className={`${inputClasses} mt-2`}
            value={data.packageName}
            onChange={(e) => update("packageName", e.target.value)}
          >
            {PACKAGES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className="text-support font-semibold">
          What do you need?
        </label>
        <textarea
          id="requirements"
          rows={5}
          className={`${inputClasses} mt-2`}
          value={data.requirements}
          onChange={(e) => update("requirements", e.target.value)}
        />
        {errors.requirements && (
          <p className="text-support mt-1 text-red-500">{errors.requirements}</p>
        )}
      </div>

      <Button type="submit">Generate My Quote Request</Button>
    </form>
  );
}

function QuoteResult({ data, onEdit }: { data: QuoteFormData; onEdit: () => void }) {
  const [copied, setCopied] = useState(false);
  const message = buildQuoteMessage(data);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the message is still visible below to copy manually
    }
  }

  return (
    <div>
      <h3 className="text-h3">Your message is ready</h3>
      <p className="text-body mt-2 text-[var(--color-text-secondary)]">
        Choose how you&rsquo;d like to send it. We&rsquo;ll get back to you shortly.
      </p>

      <pre className="text-support mt-6 whitespace-pre-wrap rounded-ui border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[var(--color-text-secondary)]">
        {message}
      </pre>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={buildMailto(data)} target="_blank" rel="noopener noreferrer">
          Open Email
        </Button>
        <Button
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="!bg-[#25D366] hover:!brightness-105"
        >
          Send via WhatsApp
        </Button>
        <Button variant="secondary" type="button" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Message"}
        </Button>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="text-support mt-6 text-[var(--color-text-secondary)] underline"
      >
        Edit details
      </button>
    </div>
  );
}
