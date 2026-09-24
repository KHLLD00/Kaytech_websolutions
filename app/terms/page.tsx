import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions — Kaytech Web Solutions",
  description: "Terms governing the use of this website and Kaytech Web Solutions' services.",
};

export default function TermsPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <h1 className="text-h1">Terms &amp; Conditions</h1>
        <p className="text-support mt-3 text-[var(--color-text-secondary)]">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 flex max-w-[680px] flex-col gap-8">
          <div>
            <h2 className="text-h3">Overview</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              These terms govern your use of this website and any services
              requested from Kaytech Web Solutions (&ldquo;Kaytech&rdquo;). By using
              this site or submitting a quote request, you agree to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Use of Website</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              This website is provided to share information about Kaytech's
              services and to let visitors request quotes. Content on this
              site should not be reproduced without permission.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Intellectual Property</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              All designs, text and code on this website belong to Kaytech
              unless otherwise stated. Project deliverables and their
              ownership are agreed separately with each client.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Service Engagement</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              Submitting a quote request does not create a binding agreement.
              Project scope, pricing and timelines are confirmed directly
              with the client before any work begins.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Limitation of Liability</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              Kaytech is not liable for indirect or consequential damages
              arising from the use of this website or its services, to the
              extent permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Governing Law</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              These terms are governed by the laws of the Federal Republic of
              Nigeria.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Changes</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              These terms may be updated periodically. Continued use of this
              website means you accept the current version.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Contact</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-[var(--color-accent-blue)]">
                {CONTACT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
