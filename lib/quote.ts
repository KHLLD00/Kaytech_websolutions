import { CONTACT } from "@/lib/constants";

export type QuoteFormData = {
  name: string;
  business: string;
  email: string;
  websiteType: string;
  packageName: string;
  requirements: string;
};

export function buildQuoteMessage(data: QuoteFormData): string {
  return [
    "New quote request from the Kaytech website:",
    "",
    `Name: ${data.name}`,
    data.business ? `Business: ${data.business}` : null,
    `Email: ${data.email}`,
    `Website Type: ${data.websiteType}`,
    `Package: ${data.packageName}`,
    "",
    "Requirements:",
    data.requirements,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function buildMailto(data: QuoteFormData) {
  const subject = `Quote Request — ${data.name}`;
  const body = buildQuoteMessage(data);
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
