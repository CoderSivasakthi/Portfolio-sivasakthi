import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import gsap from "gsap";
const siva = "/pic.png";
import "./HeroSection.css";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Siva Sakthi";

  /* ---------------- Typing Effect ---------------- */
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayedName(fullName);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedName(fullName.slice(0, index));
      index++;
      if (index > fullName.length) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- Entrance Animation ---------------- */
  useEffect(() => {
    if (!heroRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = heroRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      }
    );
  }, []);

  /* ---------------- Floating Image Animation ---------------- */
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) * 0.03;
      const y = (window.innerHeight / 2 - e.clientY) * 0.03;

      gsap.to(imageRef.current, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden px-6"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl" />

      {/* Main Layout */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16">
        
        {/* -------- Left Content -------- */}
        <div className="text-center lg:text-left max-w-3xl mt-12">
          <h1
            ref={nameRef}
            className="text-6xl sm:text-xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-6"
          >
            {displayedName}
            <span className="inline-block w-1 h-16 sm:h-20 md:h-24 bg-primary ml-2 animate-pulse" />
          </h1>

          <p className="animate-in text-lg sm:text-xl md:text-2xl text-foreground/70 mb-4">
            Engineer <span className="text-primary">·</span> Builder{" "}
            <span className="text-primary">·</span> AI & Systems
          </p>

          <p className="animate-in text-base sm:text-lg text-muted-foreground max-w-2xl mb-12">
            Turning ideas into reliable, scalable products through thoughtful engineering and systems thinking.
          </p>

          <div className="animate-in flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15"
              onClick={scrollToProjects}
            >
              View Projects <ArrowDown className="ml-2 w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10"
            >
              Download Resume <Download className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* -------- Right Image -------- */}
          <div ref={imageRef} className="hero-image-wrapper">
            {/* Glow */}
            <div className="hero-image-glow" />

            {/* Image */}
            <img
              src={siva}
              alt="AI Visual"
              className="hero-image"
            />
          </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div> 
    </section>
  );
}
