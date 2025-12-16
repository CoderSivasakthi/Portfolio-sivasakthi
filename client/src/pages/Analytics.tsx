import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import GlassCard from "@/components/GlassCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Eye,
  FileText,
  Download,
  Clock,
  Camera,
  MessageSquare,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// todo: remove mock functionality
const mockMetrics = {
  portfolioViews: 12847,
  resumeViews: 3456,
  resumeDownloads: 892,
  avgSessionDuration: 245,
  screenshots: 156,
  totalVisitors: 8234,
};

const mockFeedback = [
  {
    id: 1,
    message: "Love the clean design! Very professional portfolio.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    message: "The VoltAura case study is really well documented.",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    message: "Great work on the animations, very smooth!",
    timestamp: "1 day ago",
  },
];

export default function Analytics() {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState(mockFeedback);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".metric-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
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

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;

    setFeedbackList([
      {
        id: Date.now(),
        message: feedback,
        timestamp: "Just now",
      },
      ...feedbackList,
    ]);
    setFeedback("");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />

      <nav className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="ghost"
            className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10"
            data-testid="button-back-from-analytics"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
        </Link>
      </nav>

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Dashboard
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Portfolio Analytics
          </h1>
          <p className="text-foreground/70 max-w-md mx-auto">
            Track engagement and interactions with your portfolio
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-chart-1/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Views</p>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={mockMetrics.portfolioViews} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+12% this week</span>
            </div>
          </GlassCard>

          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resume Views</p>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={mockMetrics.resumeViews} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+8% this week</span>
            </div>
          </GlassCard>

          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Download className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resume Downloads</p>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={mockMetrics.resumeDownloads} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+15% this week</span>
            </div>
          </GlassCard>

          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatDuration(mockMetrics.avgSessionDuration)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>4 min 5 sec average</span>
            </div>
          </GlassCard>

          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-chart-5/20 flex items-center justify-center">
                <Camera className="w-6 h-6 text-chart-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Screenshots</p>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={mockMetrics.screenshots} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Interaction captures</span>
            </div>
          </GlassCard>

          <GlassCard className="metric-card p-6" hover>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={mockMetrics.totalVisitors} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+22% this month</span>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-32">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Leave Feedback</h3>
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about the portfolio..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-white/5 border-white/10 text-foreground resize-none min-h-[100px]"
                data-testid="input-feedback"
              />
              <Button
                onClick={handleSubmitFeedback}
                className="rounded-full bg-primary hover:bg-primary/90"
                disabled={!feedback.trim()}
                data-testid="button-submit-feedback"
              >
                Submit Feedback
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Recent Feedback</h3>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white/5 rounded-xl border border-white/5"
                  data-testid={`feedback-item-${item.id}`}
                >
                  <p className="text-foreground/80 mb-2">{item.message}</p>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}
