import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LiquidCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
}

export default function LiquidCard({
  children,
  className,
  hover = false,
  interactive = false
}: LiquidCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive || !cardRef.current || !highlightRef.current) return;

    const card = cardRef.current;
    const highlight = highlightRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Move highlight based on mouse position
      gsap.to(highlight, {
        x: x - 50,
        y: y - 50,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(highlight, {
        opacity: 0.6,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(highlight, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={cardRef}
      className={cn(
        // Base liquid glass styling
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02]",
        "backdrop-blur-sm border border-white/[0.08]",
        "shadow-lg shadow-black/5",
        // Subtle noise texture overlay
        "before:absolute before:inset-0 before:opacity-[0.02] before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]",
        // Soft edge glow
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/[0.1] after:to-transparent after:opacity-0 after:transition-opacity after:duration-300",
        // Hover effects
        hover && "hover:after:opacity-100 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.01] transition-all duration-300 ease-out",
        className
      )}
    >
      {/* Inner highlight for interactive cards */}
      {interactive && (
        <div
          ref={highlightRef}
          className="absolute inset-0 pointer-events-none opacity-0"
        >
          <div className="absolute w-24 h-24 bg-gradient-radial from-white/[0.15] to-transparent rounded-full blur-sm" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
