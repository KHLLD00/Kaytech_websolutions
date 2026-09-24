import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="pt-8 pb-16 md:pt-16 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">
              WEB DESIGN &amp; DEVELOPMENT
            </p>
            <h1 className="text-hero mt-4">
              Websites built to move your business forward.
            </h1>
            <p className="text-body mt-6 max-w-[480px] text-[var(--color-text-secondary)]">
              We design and build modern, high-performing websites that help
              businesses look credible, connect with their audience, and grow
              online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote">Get a Free Quote</Button>
              <Button href="/projects" variant="secondary">
                View Our Projects
              </Button>
            </div>
            <p className="text-support mt-6 text-[var(--color-text-secondary)]">
              From idea to launch — we handle the digital side.
            </p>
          </div>

          <div className="order-first md:order-last">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px]">
      <svg
        viewBox="0 0 520 400"
        className="h-full w-full"
        role="img"
        aria-label="Abstract composition of layered browser windows and interface panels"
      >
        <defs>
          <linearGradient id="glowBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        <circle cx="120" cy="90" r="120" fill="url(#glowBlue)" filter="url(#blur1)" />
        <circle cx="420" cy="300" r="100" fill="#06B6D4" opacity="0.15" filter="url(#blur1)" />

        <rect
          x="40"
          y="60"
          width="360"
          height="230"
          rx="16"
          fill="var(--color-surface)"
          stroke="var(--color-border)"
        />
        <circle cx="62" cy="82" r="4" fill="var(--color-border)" />
        <circle cx="76" cy="82" r="4" fill="var(--color-border)" />
        <circle cx="90" cy="82" r="4" fill="var(--color-border)" />
        <rect x="40" y="98" width="360" height="1" fill="var(--color-border)" />
        <rect x="60" y="120" width="180" height="14" rx="4" fill="url(#panelGrad)" opacity="0.9" />
        <rect x="60" y="146" width="260" height="8" rx="4" fill="var(--color-border)" />
        <rect x="60" y="162" width="220" height="8" rx="4" fill="var(--color-border)" />
        <rect x="60" y="188" width="100" height="34" rx="8" fill="var(--color-accent-blue)" />
        <rect x="172" y="188" width="100" height="34" rx="8" fill="transparent" stroke="var(--color-border)" />

        <g>
          <rect
            x="300"
            y="150"
            width="180"
            height="130"
            rx="14"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
          />
          <rect x="318" y="170" width="140" height="10" rx="4" fill="#06B6D4" opacity="0.8" />
          <rect x="318" y="192" width="100" height="8" rx="4" fill="var(--color-border)" />
          <rect x="318" y="208" width="120" height="8" rx="4" fill="var(--color-border)" />
          <rect x="318" y="234" width="70" height="24" rx="8" fill="#7C3AED" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
