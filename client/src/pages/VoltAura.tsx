import { useEffect, useRef } from "react";
import { Link } from "wouter";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Zap,
  BarChart3,
  Shield,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React",
  "TypeScript",
  "Python",
  "TensorFlow",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
];

const metrics = [
  { label: "Energy Saved", value: "32%", description: "Average reduction in energy costs" },
  { label: "Buildings", value: "500+", description: "Smart buildings managed" },
  { label: "Data Points", value: "1B+", description: "Sensor readings processed daily" },
  { label: "Uptime", value: "99.99%", description: "Platform reliability" },
];

export default function VoltAura() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />

      <nav className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="ghost"
            className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10"
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
        </Link>
      </nav>

      <div ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-6 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-chart-4/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-chart-4/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-chart-4/20 text-chart-4 border-chart-4/20">
            Case Study
          </Badge>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            VoltAura
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-2xl mx-auto mb-8">
            AI-powered energy management platform for smart buildings
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm bg-white/5 rounded-full text-foreground/70 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-32">
        <section className="animate-section py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Problem</h2>
          <GlassCard className="p-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Commercial buildings account for nearly 40% of global energy consumption, yet most
              building management systems operate on static schedules and basic thermostat
              controls. Facility managers lack real-time insights into energy usage patterns,
              leading to significant waste and missed optimization opportunities.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mt-4">
              The challenge was to build an intelligent system that could learn building behavior,
              predict energy needs, and automatically optimize consumption without compromising
              occupant comfort.
            </p>
          </GlassCard>
        </section>

        <section className="animate-section py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Predictive Analytics
              </h3>
              <p className="text-foreground/70">
                ML models that analyze historical data, weather patterns, and occupancy to
                predict and optimize energy usage 24 hours in advance.
              </p>
            </GlassCard>

            <GlassCard className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Real-time Dashboard
              </h3>
              <p className="text-foreground/70">
                Intuitive interface showing live energy consumption, anomaly detection, and
                actionable recommendations for facility managers.
              </p>
            </GlassCard>

            <GlassCard className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Automated Controls
              </h3>
              <p className="text-foreground/70">
                Integration with HVAC, lighting, and other building systems for automatic
                optimization while maintaining comfort thresholds.
              </p>
            </GlassCard>

            <GlassCard className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Edge Computing
              </h3>
              <p className="text-foreground/70">
                Distributed processing at the edge for real-time response and reduced latency
                in critical building control decisions.
              </p>
            </GlassCard>
          </div>
        </section>

        <section className="animate-section py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Architecture</h2>
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Data Ingestion</h4>
                <p className="text-foreground/70">
                  IoT sensors stream data through Apache Kafka to handle 100K+ events per second.
                  Data is stored in TimescaleDB for time-series analysis and PostgreSQL for
                  relational data.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">ML Pipeline</h4>
                <p className="text-foreground/70">
                  TensorFlow models trained on historical consumption patterns, retrained weekly
                  using Kubeflow. Models deployed as microservices with real-time inference.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">API Layer</h4>
                <p className="text-foreground/70">
                  FastAPI backend with GraphQL interface for flexible data queries. Redis caching
                  for frequently accessed metrics and WebSocket for real-time updates.
                </p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="animate-section py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <GlassCard key={tech} className="px-5 py-3" hover>
                <span className="text-foreground font-medium">{tech}</span>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="animate-section py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Impact & Outcomes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <GlassCard key={metric.label} className="p-6 text-center" hover>
                <p className="text-4xl font-bold text-chart-4 mb-2">{metric.value}</p>
                <p className="text-foreground font-medium mb-1">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="animate-section py-16 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in Similar Solutions?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-md mx-auto">
              Let's discuss how I can help build intelligent systems for your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-chart-4 hover:bg-chart-4/90 text-black"
                  data-testid="button-contact-voltaura"
                >
                  Get in Touch
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-white/20 hover:bg-white/10"
                  data-testid="button-view-more-projects"
                >
                  View More Projects
                </Button>
              </Link>
            </div>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
