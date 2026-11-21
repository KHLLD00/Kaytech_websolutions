"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/constants";

function MessageIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.4" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const message = draft.trim();
    if (!message) {
      inputRef.current?.focus();
      return;
    }
    const whatsappMessage = [
      "Hello Kaytech! I'd like to discuss a new project.",
      "",
      "Project details:",
      message,
    ].join("\n");
    setSent((previous) => [...previous, message]);
    setDraft("");
    window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/35 p-0 backdrop-blur-[2px] sm:inset-auto sm:bottom-24 sm:right-6 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <section role="dialog" aria-modal="true" aria-labelledby="project-chat-title" className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-2xl sm:h-[min(620px,calc(100dvh-9rem))] sm:w-[min(400px,calc(100vw-3rem))] sm:rounded-[24px] sm:border sm:border-[var(--color-border)]">
            <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="project-chat-title" className="font-semibold">Start a project</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">Kaytech Web Solutions · Typically replies soon</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close project chat" className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[var(--color-bg)] px-4 py-5">
              <p className="self-center rounded-full bg-[var(--color-surface)] px-3 py-1 text-[11px] text-[var(--color-text-secondary)] shadow-sm">YOUR PROJECT CONVERSATION</p>
              <div className="max-w-[88%] self-start rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold">Hi there! 👋</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">Thanks for considering Kaytech. Tell us a little about the project you have in mind, and let's make it happen.</p>
              </div>
              {sent.map((message, index) => (
                <div key={index} className="max-w-[88%] self-end rounded-2xl rounded-tr-sm bg-[var(--color-text-primary)] px-4 py-3 text-sm leading-relaxed text-[var(--color-surface)]">
                  {message}
                  <p className="mt-2 text-right text-[10px] opacity-60">Prepared for WhatsApp</p>
                </div>
              ))}
              <p className="mt-auto self-center text-center text-[11px] text-[var(--color-text-secondary)]">Your message opens in WhatsApp. You can review it before sending.</p>
            </div>
            <form onSubmit={sendMessage} className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2">
                <textarea ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} rows={1} maxLength={3000} aria-label="Describe your project" placeholder="Describe your project..." className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]" />
                <button type="submit" disabled={!draft.trim()} aria-label="Send project inquiry to WhatsApp" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">
                  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[var(--color-text-secondary)]">Enter to send · Shift + Enter for a new line</p>
            </form>
          </section>
        </div>
      )}
      {!open && (
        <button type="button" onClick={() => setOpen(true)} aria-label="Start a project chat" className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.48)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_34px_-8px_rgba(37,99,235,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]" style={{ background: "linear-gradient(110deg, var(--color-accent-blue), var(--color-accent-violet))", bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))", right: "max(1.25rem, env(safe-area-inset-right, 0px))" }}>
          <MessageIcon className="h-[22px] w-[22px]" />
          Start a project
        </button>
      )}
    </>
  );
}
