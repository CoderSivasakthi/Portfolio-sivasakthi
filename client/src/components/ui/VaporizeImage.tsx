import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface VaporizeImageProps {
  src: string;
  alt: string;
  className?: string;
  particleSize?: number;
  animationDuration?: number;
  triggerOnLoad?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

export default function VaporizeImage({
  src,
  alt,
  className = "",
  particleSize = 2,
  animationDuration = 2,
  triggerOnLoad = true,
}: VaporizeImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleImageLoad = () => {
      setImageLoaded(true);

      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw image to canvas to get pixel data
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create particles from image pixels
      const particles: Particle[] = [];
      const step = Math.max(1, Math.floor(particleSize));

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          // Skip transparent pixels
          if (a > 128) {
            particles.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
              size: particleSize,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
            });
          }
        }
      }

      particlesRef.current = particles;

      // Start animation if triggerOnLoad is true
      if (triggerOnLoad) {
        startVaporizeAnimation();
      }
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [src, particleSize, triggerOnLoad]);

  const startVaporizeAnimation = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = particlesRef.current;
    if (particles.length === 0) return;

    // Check for reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      // Skip animation and show final image
      setAnimationComplete(true);
      return;
    }

    // Initial state: particles scattered
    particles.forEach(particle => {
      particle.x = particle.originX + (Math.random() - 0.5) * 200;
      particle.y = particle.originY + (Math.random() - 0.5) * 200;
    });

    // Animate particles back to original positions
    animationRef.current = gsap.timeline({
      onComplete: () => {
        // Animation complete - hide canvas and show static image
        setAnimationComplete(true);
      }
    });

    particles.forEach((particle, index) => {
      animationRef.current!.to(particle, {
        x: particle.originX,
        y: particle.originY,
        duration: animationDuration,
        ease: "power2.out",
        delay: Math.random() * 0.5,
      }, 0);
    });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles(particles, ctx);
      requestAnimationFrame(render);
    };

    render();
  };

  const drawParticles = (particles: Particle[], ctx: CanvasRenderingContext2D) => {
    particles.forEach(particle => {
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Static image - shown after animation completes */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          animationComplete ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ filter: 'drop-shadow(0 40px 80px rgba(138, 99, 255, 0.35))' }}
      />

      {/* Canvas for particle animation - hidden after completion */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
          animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ imageRendering: "pixelated" }}
      />

      {/* Hidden image for loading and accessibility */}
      <img
        ref={imageRef}
        src={src}
        alt=""
        className="sr-only"
        crossOrigin="anonymous"
      />
    </div>
  );
}
