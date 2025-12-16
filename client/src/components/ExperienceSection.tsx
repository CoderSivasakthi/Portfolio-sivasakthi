import { useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Trophy, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// todo: remove mock functionality
const experiences = [
  {
    type: "work",
    icon: Briefcase,
    title: "Senior Software Engineer",
    organization: "Tech Innovations Inc.",
    period: "2022 - Present",
    description:
      "Leading development of AI-powered analytics platform. Architected microservices handling 1M+ daily requests.",
  },
  {
    type: "work",
    icon: Briefcase,
    title: "Full Stack Developer",
    organization: "StartupXYZ",
    period: "2020 - 2022",
    description:
      "Built real-time collaboration features from scratch. Reduced load time by 60% through optimization.",
  },
  {
    type: "hackathon",
    icon: Trophy,
    title: "Winner - AI Innovation Challenge",
    organization: "TechCrunch Disrupt",
    period: "2023",
    description:
      "Built an AI assistant for developers that reduced debugging time by 40%.",
  },
  {
    type: "achievement",
    icon: Award,
    title: "Open Source Contributor",
    organization: "React Ecosystem",
    period: "2021 - Present",
    description:
      "Contributed to major open source projects with 500+ GitHub stars on personal libraries.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const items = sectionRef.current.querySelectorAll(".timeline-item");
    gsap.fromTo(
      items,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
          Journey
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Experience & Achievements
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item relative pl-20">
              <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <exp.icon className="w-4 h-4 text-primary" />
              </div>

              <GlassCard className="p-6" hover>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-sm text-primary font-medium">
                    {exp.period}
                  </span>
                </div>
                <p className="text-foreground/70 font-medium mb-2">
                  {exp.organization}
                </p>
                <p className="text-muted-foreground">{exp.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
