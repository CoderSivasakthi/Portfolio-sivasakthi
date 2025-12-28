import { useEffect, useRef, useState } from "react";
import LiquidCard from "./GlassCard";
import Lanyard from "./LanyardSimple";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showLanyard, setShowLanyard] = useState(false);
  const hasLanyardPlayedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // ONE-TIME TRIGGER: Lanyard animation plays only once per page load
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top", // About section top reaches viewport top
      end: "bottom bottom", // About section bottom reaches viewport bottom
      onEnter: () => {
        // Check if Hero section is completely scrolled out
        const heroSection = document.querySelector("#hero");
        if (heroSection && !hasLanyardPlayedRef.current) {
          const heroRect = heroSection.getBoundingClientRect();
          const isHeroOutOfView = heroRect.bottom <= 0;

          if (isHeroOutOfView) {
            // Set persistent flag and show lanyard permanently
            hasLanyardPlayedRef.current = true;
            setShowLanyard(true);

            // Disconnect the trigger after first activation
            trigger.kill();
          }
        }
      },
      // Ignore all other scroll events - no onLeave, onLeaveBack, or onEnterBack
    });

    // Handle prefers-reduced-motion: show static card immediately on first trigger
    if (reducedMotion) {
      const checkInitialPosition = () => {
        const heroSection = document.querySelector("#hero");
        if (heroSection && !hasLanyardPlayedRef.current) {
          const heroRect = heroSection.getBoundingClientRect();
          const isHeroOutOfView = heroRect.bottom <= 0;

          if (isHeroOutOfView) {
            hasLanyardPlayedRef.current = true;
            setShowLanyard(true);
            trigger.kill();
          }
        }
      };

      // Check immediately and also on scroll for reduced motion users
      checkInitialPosition();
      const handleScroll = () => checkInitialPosition();
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        trigger.kill();
      };
    }

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 max-w-7xl mx-auto relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* About content shifted left with more space for lanyard */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="animate-scroll mb-12">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
              About
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              The Story
            </h2>
          </div>

          <LiquidCard className="animate-scroll p-8 sm:p-12">
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
          </LiquidCard>

          <div className="animate-scroll grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <LiquidCard className="p-6 text-center" hover interactive>
              <p className="text-4xl font-bold text-foreground mb-2">1+</p>
              <p className="text-muted-foreground text-sm">Years of Experience</p>
            </LiquidCard>
            <LiquidCard className="p-6 text-center" hover interactive>
              <p className="text-4xl font-bold text-foreground mb-2">20+</p>
              <p className="text-muted-foreground text-sm">Projects Shipped</p>
            </LiquidCard>
            <LiquidCard className="p-6 text-center" hover interactive>
              <p className="text-muted-foreground text-sm">Users Impacted</p>
            </LiquidCard>
          </div>
        </div>

        {/* Lanyard card hanging from top-right area */}
        <div className="lg:col-span-4 xl:col-span-4 relative flex justify-center items-start min-h-[600px]">
          {showLanyard && <Lanyard hasLanyardPlayed={showLanyard} />}
        </div>
      </div>
    </section>
  );
}
