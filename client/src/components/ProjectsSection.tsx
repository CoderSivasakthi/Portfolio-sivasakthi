import { useEffect, useRef } from "react";
import LiquidCard from "./GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// todo: remove mock functionality
const projects = [
  {
    id: "voltaura",
    name: "VoltAura",
    description: "AI-powered energy management platform for smart buildings",
    tags: ["React", "Python", "TensorFlow", "AWS"],
    caseStudyUrl: "/voltaura",
    demoUrl: "#",
  },
  {
    id: "syncflow",
    name: "SyncFlow",
    description: "Real-time collaborative workspace for distributed teams",
    tags: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
    caseStudyUrl: "#",
    demoUrl: "#",
  },
  {
    id: "neuralscribe",
    name: "NeuralScribe",
    description: "Intelligent document processing with advanced NLP",
    tags: ["LangChain", "OpenAI", "FastAPI", "MongoDB"],
    caseStudyUrl: "#",
    demoUrl: "#",
  },
  {
    id: "quantedge",
    name: "QuantEdge",
    description: "High-frequency trading analytics dashboard",
    tags: ["Go", "TimescaleDB", "Grafana", "Kubernetes"],
    caseStudyUrl: "#",
    demoUrl: "#",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const cards = sectionRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
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
    <section ref={sectionRef} id="projects" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
          Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Featured Works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <LiquidCard
            key={project.id}
            className={`project-card p-8 ${index === 0 ? "md:col-span-2" : ""}`}
            hover
          >
            <div className={`${index === 0 ? "md:flex md:items-center md:justify-between md:gap-8" : ""}`}>
              <div className={index === 0 ? "md:flex-1" : ""}>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {project.name}
                </h3>
                <p className="text-foreground/70 text-lg mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={project.caseStudyUrl}>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/20 hover:bg-white/10"
                    data-testid={`button-case-study-${project.id}`}
                  >
                    Case Study
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  data-testid={`button-demo-${project.id}`}
                >
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </LiquidCard>
        ))}
      </div>
    </section>
  );
}
