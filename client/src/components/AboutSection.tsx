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
            My journey began with curiosity and a strong inclination toward learning
            through experimentation. While formal education provided structure,
            hands-on problem solving shaped the way I think teaching me to question
            assumptions, learn from failure, and build understanding through
            consistent effort. Over time, persistence replaced self-doubt, and I
            developed a disciplined approach to learning by breaking systems down to
            their fundamentals and rebuilding them with clarity.
          </p>

          <p>
            I am deeply motivated by the process of turning ideas into tangible,
            working products. My interests span software engineering, artificial
            intelligence, and hardware systems, where I focus on bridging the gap
            between theory and real-world execution. Hackathons and applied projects
            strengthened my ability to work under constraints, think critically, and
            deliver solutions that are both practical and scalable.
          </p>

          <p>
            Today, I am the founder of{" "}
            <span className="text-foreground font-medium">TheVoltaura.com</span>, a
            growing solar energy platform focused on advancing sustainable technology
            and accelerating the adoption of clean energy solutions through
            intelligent system design.
          </p>

          <p>
            Looking ahead, my goal is to build technology that scales with purpose—
            particularly in AI-driven and sustainable systems. I aim to grow as both
            an engineer and a founder, prioritizing long-term impact, consistency, and
            thoughtful innovation over short-term wins.
          </p>
        </div>
      </GlassCard>


      <div className="animate-scroll grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">1+</p>
          <p className="text-muted-foreground text-sm">Years of Experience</p>
        </GlassCard>
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">20+</p>
          <p className="text-muted-foreground text-sm">Projects Shipped</p>
        </GlassCard>
        <GlassCard className="p-6 text-center" hover>
          <p className="text-4xl font-bold text-foreground mb-2">10+</p>
          <p className="text-muted-foreground text-sm">Users Impacted</p>
        </GlassCard>
      </div>
    </section>
  );
}
