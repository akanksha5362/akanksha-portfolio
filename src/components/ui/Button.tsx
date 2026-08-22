import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  external,
  className,
}: Props) {
  const classes = cn(
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
    variant === "primary" &&
      "bg-emerald text-bg hover:bg-emerald-soft hover:shadow-glow",
    variant === "secondary" &&
      "glass text-ink hover:border-cyan/40 hover:text-cyan",
    variant === "ghost" && "text-ink-dim hover:text-ink",
    className
  );

  if (external || href.startsWith("http") || href.startsWith("mailto")) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={classes}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
