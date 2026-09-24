import { waLink } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi Kaytech, I'd like to talk about a website project.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kaytech on WhatsApp"
      className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.78 14.03c-.24.68-1.38 1.3-1.9 1.35-.5.06-1.03.28-3.42-.72-2.9-1.21-4.75-4.16-4.9-4.36-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.45.2.51.32.07.12.07.68-.17 1.35Z" />
      </svg>
    </a>
  );
}
