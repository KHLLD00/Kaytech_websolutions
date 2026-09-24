export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  level = "h2",
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const Heading = level;
  const headingStyle = level === "h1" ? "text-h1" : "text-h2";
  return (
    <div className={`max-w-[640px] ${alignment}`}>
      <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">
        {eyebrow}
      </p>
      <Heading className={`${headingStyle} mt-3`}>{heading}</Heading>
      {description && (
        <p className="text-body mt-4 text-[var(--color-text-secondary)]">{description}</p>
      )}
    </div>
  );
}
