import { useEffect, useRef } from "react";
import LiquidCard from "./GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Server,
  Brain,
  Database,
  Cloud,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Python", "Go", "GraphQL", "REST APIs"],
  },
  {
    category: "AI / ML",
    icon: Brain,
    items: ["TensorFlow", "PyTorch", "LangChain", "OpenAI", "RAG Systems"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Prisma"],
  },
  {
    category: "DevOps",
    icon: Cloud,
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    category: "System Design",
    icon: Layers,
    items: ["Microservices", "Event-Driven", "Distributed Systems", "Caching", "Load Balancing"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const cards = sectionRef.current.querySelectorAll(".skill-card");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
    <section ref={sectionRef} className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
          Expertise
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Skills & Technologies
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <LiquidCard key={skill.category} className="skill-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <skill.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {skill.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-sm bg-white/5 rounded-full text-foreground/70 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </LiquidCard>
        ))}
      </div>
    </section>
  );
}
