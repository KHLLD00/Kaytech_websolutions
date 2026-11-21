"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/constants";

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
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.78 14.03c-.24.68-1.38 1.3-1.9 1.35-.5.06-1.03.28-3.42-.72-2.9-1.21-4.75-4.16-4.9-4.36-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.45.2.51.32.07.12.07.68-.17 1.35Z" /></svg>
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
        <button type="button" onClick={() => setOpen(true)} aria-label="Start a project chat" className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]" style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))", right: "max(1.25rem, env(safe-area-inset-right, 0px))" }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.78 14.03c-.24.68-1.38 1.3-1.9 1.35-.5.06-1.03.28-3.42-.72-2.9-1.21-4.75-4.16-4.9-4.36-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.45.2.51.32.07.12.07.68-.17 1.35Z" /></svg>
          Start a project
        </button>
      )}
    </>
  );
}
