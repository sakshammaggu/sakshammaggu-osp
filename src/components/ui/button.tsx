import { forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "icon";
type ButtonSize = "default" | "sm" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none cursor-pointer";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "text-[var(--on-accent)] rounded-[var(--radius-md)] h-11 px-5 hover:-translate-y-[1px] active:scale-[0.98]",
  secondary:
    "bg-transparent border border-[var(--line-strong)] text-[var(--text-1)] rounded-[var(--radius-md)] h-11 px-5 hover:bg-[var(--surface-3)] hover:border-[var(--accent-line)]",
  ghost:
    "bg-transparent text-[var(--text-2)] rounded-[var(--radius-md)] h-11 px-5 hover:text-[var(--text-1)] hover:bg-[var(--surface-3)]",
  link: "text-[var(--text-1)] underline underline-offset-4 decoration-[var(--accent-line)] hover:decoration-[var(--accent)] gap-1",
  icon: "w-10 h-10 rounded-[10px] bg-transparent text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-3)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "",
  sm: "h-9 px-3 text-sm",
  lg: "h-12 px-6 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", style, href, target, rel, ...props }, ref) => {
    const btnStyle =
      variant === "primary"
        ? {
            backgroundImage: "var(--btn-grad)",
            boxShadow: "var(--btn-inset), var(--shadow-sm)",
            ...style,
          }
        : style;

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className={`${classes} no-underline`}
            style={{
              transitionDuration: "var(--dur-base)",
              transitionTimingFunction: "var(--ease-out)",
              ...btnStyle,
            }}
          >
            {props.children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={`${classes} no-underline`}
          style={{
            transitionDuration: "var(--dur-base)",
            transitionTimingFunction: "var(--ease-out)",
            ...btnStyle,
          }}
        >
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        suppressHydrationWarning
        className={classes}
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out)",
          ...btnStyle,
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
