import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  immediate?: boolean;
}

export default function SplitTextComponent({
  text,
  tag = "div",
  className = "",
  delay = 0,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  immediate = false,
}: SplitTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: splitType });

    let tl: gsap.core.Timeline;
    let st: ScrollTrigger | undefined;

    if (immediate) {
      tl = gsap.timeline({
        onComplete: onLetterAnimationComplete,
      });
    } else {
      st = ScrollTrigger.create({
        trigger: textRef.current,
        start: `top ${threshold * 100}%`,
        end: "bottom top",
        toggleActions: "play none none reverse",
      });

      tl = gsap.timeline({
        scrollTrigger: st,
        onComplete: onLetterAnimationComplete,
      });
    }

    tl.fromTo(
      split.chars,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000, // delay is in ms, convert to seconds
      }
    );

    return () => {
      split.revert();
      if (st) {
        st.kill();
      }
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    onLetterAnimationComplete,
    immediate,
  ]);

  const Tag = tag as any;

  return (
    <Tag ref={textRef} className={className} style={{ textAlign }}>
      {text}
    </Tag>
  );
}
