import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — Kaytech Web Solutions",
  description: "How Kaytech Web Solutions handles information collected through this website.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <h1 className="text-h1">Privacy Policy</h1>
        <p className="text-support mt-3 text-[var(--color-text-secondary)]">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 flex max-w-[680px] flex-col gap-8">
          <div>
            <h2 className="text-h3">Introduction</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              This Privacy Policy explains how Kaytech Web Solutions
              (&ldquo;Kaytech,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses and
              protects information when you visit this website or submit a
              quote request.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Information We Collect</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              When you submit the quote form, we collect the information you
              provide, such as your name, business name, email address and
              project requirements. We do not collect this information
              through any other means on this site.
            </p>
          </div>

          <div>
            <h2 className="text-h3">How We Use Information</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              Information submitted through the quote form is used solely to
              respond to your request and discuss your project. We do not
              sell or share your information with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Cookies</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              This website may use minimal local storage to remember your
              theme and currency preference. This information stays in your
              browser and is not sent to us.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Third-Party Links</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              This site may link to third-party services, such as WhatsApp or
              email, to help you get in touch. Kaytech is not responsible for
              the privacy practices of those third-party services.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Changes to This Policy</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              This policy may be updated from time to time. Continued use of
              this website after changes means you accept the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-h3">Contact</h2>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              Questions about this policy can be sent to{" "}
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
