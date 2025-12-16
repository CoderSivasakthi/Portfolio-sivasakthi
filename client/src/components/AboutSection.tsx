import { useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = sectionRef.current.querySelectorAll(".animate-scroll");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 max-w-5xl mx-auto"
    >
      <div className="animate-scroll mb-12">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
          About
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          The Story
        </h2>
      </div>

      <GlassCard className="animate-scroll p-8 sm:p-12">
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            I'm a software engineer who thrives at the intersection of{" "}
            <span className="text-foreground font-medium">complex systems</span> and{" "}
            <span className="text-foreground font-medium">elegant solutions</span>.
            My approach is rooted in first-principles thinking—breaking down
            intricate problems to their fundamental components and rebuilding
            them with precision.
          </p>
          <p>
            Over the years, I've architected and shipped production systems
            serving millions of users. From distributed backends handling
            real-time data streams to AI-powered features that enhance user
            experiences, every project is an opportunity to push the boundaries
            of what's possible.
          </p>
          <p>
            I believe great software isn't just about writing code—it's about
            understanding the{" "}
            <span className="text-foreground font-medium">problem space</span>{" "}
            deeply, designing with empathy for users, and building with the
            craftsmanship that ensures longevity. Every line of code is a
            commitment to quality.
          </p>
        </div>
      </GlassCard>

      <div className="animate-scroll grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">5+</p>
          <p className="text-muted-foreground text-sm">Years of Experience</p>
        </GlassCard>
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">50+</p>
          <p className="text-muted-foreground text-sm">Projects Shipped</p>
        </GlassCard>
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">10M+</p>
          <p className="text-muted-foreground text-sm">Users Impacted</p>
        </GlassCard>
      </div>
    </section>
  );
}
