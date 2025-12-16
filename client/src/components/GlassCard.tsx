import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10",
        "transition-all duration-300",
        hover && "hover:bg-white/10 hover:border-white/15 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
}
