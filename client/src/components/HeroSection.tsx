import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Siva";

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (reducedMotion) {
      setDisplayedName(fullName);
      return;
    }

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = heroRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8,
      }
    );
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-6"
        >
          {displayedName}
          <span className="inline-block w-1 h-16 sm:h-20 md:h-24 bg-primary ml-2 animate-pulse" />
        </h1>

        <p className="animate-in text-lg sm:text-xl md:text-2xl text-foreground/70 font-light tracking-wide mb-4">
          Software Engineer <span className="text-primary">·</span> Full Stack{" "}
          <span className="text-primary">·</span> AI & Systems
        </p>

        <p className="animate-in text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Building scalable, intelligent, production-grade platforms with clarity
          and impact.
        </p>

        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-base bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 text-foreground"
            onClick={scrollToProjects}
            data-testid="button-view-projects"
          >
            View Projects
            <ArrowDown className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base border-white/20 hover:bg-white/10 text-foreground"
            data-testid="button-download-resume"
          >
            Download Resume
            <Download className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
