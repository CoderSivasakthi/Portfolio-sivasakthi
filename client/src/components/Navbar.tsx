import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { useRef } from "react";
import { TubelightIndicator } from "@/components/ui/tubelight-indicator";

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
  { href: "www.linkedin.com/in/siva-sakthi-smartvoltninja-url", label: "LinkedIn", external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
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

  useEffect(() => {
    if (location === "/analytics") {
      setActiveSection("Analytics");
    } else {
      setActiveSection("");
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .filter(link => link.href.startsWith("#"))
        .map(link => ({
          id: link.href.substring(1),
          label: link.label,
          element: document.getElementById(link.href.substring(1))
        }))
        .filter(section => section.element);

      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = section.element!;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleActivate = (label: string, href: string) => {
    setActiveSection(label);
    scrollToSection(href);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-2 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-white/[0.08] shadow-lg shadow-black/10"
            : "bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.08] backdrop-blur-sm border border-white/[0.08] shadow-lg shadow-black/5"
        }`}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-foreground font-semibold text-sm ml-1"
          data-testid="link-logo"
        >
          Siva
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
              <div className="relative">
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveSection(link.label)}
                  className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-full"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
                {activeSection === link.label && <TubelightIndicator />}
              </div>
            ) : (
              <div className="relative">
                <button
                  key={link.label}
                  onClick={() => handleActivate(link.label, link.href)}
                  className="relative px-4 py-2 text-sm rounded-full text-foreground/70 hover:text-foreground transition-colors"
                  data-testid={`button-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
                {activeSection === link.label && <TubelightIndicator />}
              </div>
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
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm border border-white/[0.08] shadow-lg shadow-black/10">
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
