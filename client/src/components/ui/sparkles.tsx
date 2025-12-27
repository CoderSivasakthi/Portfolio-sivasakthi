"use client";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from "@tsparticles/engine";

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  particleDensity = 100,
  className,
  particleColor = "#ffffff",
}: SparklesCoreProps) => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: any) => {
    // Optional: Handle particles loaded event
  };

  return (
    <div className={className} style={{ background }}>
      <Particles
        id={id || "tsparticles"}
        init={particlesInit}
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background,
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: {
                enable: true,
              },
            },
          },
          particles: {
            number: {
              value: particleDensity,
            },
            color: {
              value: particleColor,
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            size: {
              value: { min: minSize, max: maxSize },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: { min: 0.1, max: 0.5 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false,
              },
            },
            life: {
              duration: {
                sync: false,
                value: { min: 20, max: 40 },
              },
              count: 1,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
