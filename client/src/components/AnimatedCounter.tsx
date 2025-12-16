import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (counterRef.current) {
        counterRef.current.textContent = value.toLocaleString() + suffix;
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const counter = { value: 0 };
            gsap.to(counter, {
              value,
              duration,
              ease: "power3.out",
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent =
                    Math.round(counter.value).toLocaleString() + suffix;
                }
              },
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [value, suffix, duration, hasAnimated]);

  return <span ref={counterRef}>0{suffix}</span>;
}
