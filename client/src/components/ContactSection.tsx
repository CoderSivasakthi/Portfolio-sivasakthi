import { useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Mail, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".contact-card"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 max-w-3xl mx-auto">
      <GlassCard className="contact-card p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Let's Build Something Great
        </h2>

        <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from
          you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary hover:bg-primary/90"
            data-testid="button-email"
          >
            <Mail className="mr-2 w-5 h-5" />
            siva@example.com
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-white/20 hover:bg-white/10"
            data-testid="button-schedule"
          >
            Schedule a Call
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </GlassCard>
    </section>
  );
}
