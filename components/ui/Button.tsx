import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-ui px-6 py-3 text-body font-semibold transition-[transform,filter,background-color,border-color] duration-150 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-blue)] text-white hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

export default function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} target={props.target} rel={props.rel}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, className: _c, children: _ch, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
