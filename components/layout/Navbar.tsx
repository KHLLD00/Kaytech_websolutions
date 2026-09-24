"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="kaytech-nav-enter fixed inset-x-0 top-4 sm:top-6 z-50 flex justify-center px-4">
      <div className={`flex w-full max-w-[1120px] items-center justify-between gap-4 rounded-nav border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 shadow-[0_8px_24px_-12px_rgba(11,16,32,0.25)] transition-[backdrop-filter,box-shadow,background-color] duration-300 sm:px-6 ${scrolled ? "backdrop-blur-[18px] bg-[var(--color-surface)]/70 shadow-[0_14px_36px_-16px_rgba(11,16,32,0.32)]" : "backdrop-blur-md"}`}>
        <Link href="/" className="text-h3 font-extrabold tracking-tight">
          Kaytech
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button href="/quote">Get a Free Quote</Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-4 right-4 top-[calc(100%+8px)] rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-ui px-3 py-3 text-body text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href="/quote" className="mt-3 w-full">
            Get a Free Quote
          </Button>
        </div>
      )}
    </header>
  );
}
