import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  const [showSparkles, setShowSparkles] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if user has already scrolled in this session
    const scrolled = sessionStorage.getItem("hasScrolled");
    if (scrolled === "true") {
      setShowSparkles(false);
      setHasScrolled(true);
      return;
    }

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setShowSparkles(false);
      return;
    }

    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
        sessionStorage.setItem("hasScrolled", "true");

        // Start dissolve animation
        setTimeout(() => {
          setShowSparkles(false);
        }, 100); // Small delay to ensure scroll is detected
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />

      {/* Sparkles Animation Layer */}
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 1.5, ease: "easeOut" }
            }}
            className="fixed top-16 left-0 right-0 h-32 pointer-events-none z-0"
            style={{ filter: "blur(0.5px)" }}
          >
            <SparklesCore
              id="sparkles-intro"
              background="transparent"
              minSize={1}
              maxSize={3}
              particleDensity={80}
              particleColor="#8a63ff"
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
