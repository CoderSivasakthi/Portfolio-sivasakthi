import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { useRef } from "react";

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Works" },
  { href: "/analytics", label: "Analytics", isRoute: true },
  { href: "https://twitter.com", label: "Twitter", external: true },
  { href: "https://linkedin.com", label: "LinkedIn", external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-2 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
          isScrolled
            ? "bg-black/60 border-white/10"
            : "bg-white/5 border-white/10"
        }`}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-foreground font-semibold text-sm ml-1"
          data-testid="link-logo"
        >
          S
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-full"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : link.isRoute ? (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-full"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-full"
                data-testid={`button-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            )
          )}
        </div>

        <Button
          size="sm"
          className="hidden md:flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-5"
          onClick={() => scrollToSection("#contact")}
          data-testid="button-contact-cta"
        >
          Get in Touch
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-colors text-left"
                  data-testid={`button-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              )
            )}
            <Button
              className="mt-2 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-mobile-contact"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
