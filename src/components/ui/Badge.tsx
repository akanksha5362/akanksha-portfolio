import { cn } from "@/lib/utils";

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono border",
        variant === "default" &&
          "bg-emerald/10 text-emerald-soft border-emerald/20",
        variant === "cyan" && "bg-cyan/10 text-cyan border-cyan/20",
        variant === "outline" && "bg-transparent text-ink-dim border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}
