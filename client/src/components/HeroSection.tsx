import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import VaporizeImage from "./ui/VaporizeImage";
import TextType from "./TextType";
const siva = "./pic.png";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHeroNameAnimated, setIsHeroNameAnimated] = useState(false);
  const [hasNameAnimated, setHasNameAnimated] = useState(false);



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

  /* ---------------- Background Distortion on Scroll ---------------- */
  useEffect(() => {
    if (!heroRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const bgGlows = heroRef.current.querySelectorAll(".absolute.rounded-full");

    gsap.to(bgGlows, {
      x: (i) => (i % 2 === 0 ? 30 : -30),
      y: (i) => (i % 2 === 0 ? -20 : 20),
      scale: 1.1,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const handleNameAnimationComplete = () => {
    if (!hasNameAnimated) {
      console.log("Name animation completed");
      setHasNameAnimated(true);
      setIsHeroNameAnimated(true);
    }
  };

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen overflow-hidden px-6"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/8 rounded-full blur-xl" />

      {/* Main Layout */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16">
        
        {/* -------- Left Content -------- */}
        <div className="text-center lg:text-left max-w-3xl mt-12">
          <SplitText
            text="Siva Sakthi"
            tag="h1"
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-6"
            delay={280}
            duration={2}
            ease="elastic.out(1,0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            onLetterAnimationComplete={handleNameAnimationComplete}
            immediate={true}
          />

          <p className="animate-in text-lg sm:text-xl md:text-2xl text-foreground/70 mb-4">
            Engineer <span className="text-primary">·</span> Builder{" "}
            <span className="text-primary">·</span> AI & Systems
          </p>

          {isHeroNameAnimated && (
            <TextType
              text={[
                "Welcome to my portfolio...",
                "I'm glad to see you, and I think you've already noticed my image and how I look.",
                "Turning ideas into reliable, scalable products through thoughtful engineering and systems thinking.",
                "Scroll down to explore more sections — we'll meet again as you continue or reload the page. Go down and enjoy."
              ]}
              typingSpeed={100}
              pauseDuration={500}
              deletingSpeed={10}
              showCursor={true}
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
              variableSpeed={{ min: 60, max: 120 }}

              className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12"
            />
          )}

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

            {/* Vaporize Image Animation */}
            <VaporizeImage
              src={siva}
              alt="AI Visual"
              className="hero-image"
              particleSize={3}
              animationDuration={2.5}
              triggerOnLoad={true}
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
