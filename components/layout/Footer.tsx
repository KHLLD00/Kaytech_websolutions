import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { NAV_LINKS, CONTACT, waLink } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_auto]">
          <div>
            <p className="text-h3">Kaytech Web Solutions</p>
            <p className="text-body mt-3 max-w-[320px] text-[var(--color-text-secondary)]">
              Modern websites and digital solutions built around your business.
            </p>
          </div>

          <div>
            <p className="text-support font-semibold text-[var(--color-text-primary)]">Explore</p>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-support font-semibold text-[var(--color-text-primary)]">Get in touch</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hi Kaytech, I'd like to talk about a website project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  @{CONTACT.twitterHandle}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:self-start">
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
          <p className="text-support text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Kaytech Web Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-support text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-support text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
