# Siva's Portfolio Website

## Overview
A premium Apple-inspired software developer portfolio with glassmorphism UI, GSAP animations, and dark-mode-first design. Built for a senior software engineer named Siva.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, GSAP
- **Backend**: Express.js (minimal, serves frontend)
- **Routing**: Wouter
- **Data Fetching**: TanStack Query

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── examples/           # Component examples for preview
│   │   ├── GlassCard.tsx       # Glassmorphic card component
│   │   ├── CustomCursor.tsx    # Apple-style custom cursor
│   │   ├── Navbar.tsx          # Floating pill navbar
│   │   ├── HeroSection.tsx     # Hero with typing animation
│   │   ├── AboutSection.tsx    # Storytelling about section
│   │   ├── SkillsSection.tsx   # Skills grid
│   │   ├── ProjectsSection.tsx # Featured projects
│   │   ├── ExperienceSection.tsx # Timeline experience
│   │   ├── ContactSection.tsx  # Contact CTA
│   │   ├── Footer.tsx          # Simple footer
│   │   └── AnimatedCounter.tsx # Animated number counter
│   ├── pages/
│   │   ├── Home.tsx            # Main portfolio page
│   │   ├── VoltAura.tsx        # Case study page
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   └── not-found.tsx       # 404 page
│   ├── App.tsx                 # Main app with routing
│   └── index.css               # Global styles with CSS variables
```

## Pages
1. **Home (/)** - Full portfolio with all sections
2. **VoltAura (/voltaura)** - AI energy platform case study
3. **Analytics (/analytics)** - Portfolio analytics dashboard

## Design System
- **Colors**: Deep blacks, off-white text, subtle violet/yellow accents
- **Glassmorphism**: bg-white/5, backdrop-blur-xl, border-white/10
- **Animations**: GSAP scroll-triggered reveals, typing animation, staggered cards
- **Custom Cursor**: Trailing motion with hover states

## Recent Changes
- December 2024: Initial build with all sections and pages
- Added VoltAura case study page
- Added Analytics dashboard with animated counters
- Custom Apple-style cursor with reduced-motion support

## User Preferences
- Dark-mode first design
- Apple/Stripe-inspired minimal aesthetic
- Performance-optimized animations
- Accessibility support (prefers-reduced-motion)
