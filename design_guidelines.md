# Design Guidelines: Siva's Portfolio

## Design Approach
**Apple-Inspired Premium Portfolio** - Drawing from apple.com, Linear, and Stripe for a minimal, cinematic, fluid experience suitable for a senior software engineer.

## Visual System

### Glassmorphism Rules
- Frosted glass containers with subtle transparency (10% white background)
- Heavy backdrop blur for depth
- Delicate borders with 10-15% white opacity
- Soft shadows for elevation
- Large rounded corners (pill and card-style)

### Color Palette
- **Base**: Deep blacks (#000000 to #0a0a0a) and dark greys (#1a1a1a)
- **Text**: Off-white (#f5f5f5) with hierarchy via opacity (100%, 70%, 50%)
- **Accents**: Extremely subtle yellow/violet/blue tints for CTAs only
- **No neon colors or heavy gradients**

### Typography
- Clean modern sans-serif (Apple system font aesthetic)
- Large, generous heading sizes with ample spacing
- Calm, comfortable reading rhythm
- Clear hierarchy through size and opacity, not color

## Layout System

### Spacing
Use Tailwind units: 2, 4, 8, 12, 16, 20, 24, 32 for consistent rhythm

### Navigation
**Floating Pill Navbar** (centered at top):
- Glassmorphic background with full blur
- Rounded-full container
- Left: Logo/icon
- Center: About, Works, Twitter, Dribbble, LinkedIn
- Right: Highlighted accent CTA button

## Page Structure

### Home Page Sections (in order):

**1. Hero Section**
- Full viewport height, centered
- Name: "Siva" (with typing animation)
- Subtitle: "Software Engineer · Full Stack · AI & Systems"
- Description: "Building scalable, intelligent, production-grade platforms with clarity and impact."
- Two glass CTAs: "View Projects" and "Download Resume"

**2. About Section**
- Storytelling narrative layout
- Focus: problem-solving, system thinking, product mindset
- Glassmorphic container with comfortable reading width

**3. Skills Section**
- Grid of glassmorphic cards
- Categories: Frontend, Backend, AI/ML, Databases, DevOps, System Design
- Clean icons with labels

**4. Projects Section**
- Apple-style product showcase
- Glass cards featuring: project name, one-line description, action buttons
- Staggered card layout

**5. Experience Section**
- Vertical timeline design
- Glassmorphic milestone cards
- Hackathons, achievements, professional experience

**6. Contact Section**
- Minimal, professional layout
- Focused outreach approach
- Glass contact card

**7. Footer**
- Simple copyright
- Subtle glass treatment

### Case Study Page (/voltAura)
- Product story layout (not documentation style)
- Sections: Problem, Solution, Architecture & Approach, Tech Stack, Impact & Outcomes
- Large imagery with glassmorphic overlays
- Generous whitespace between sections

### Analytics Dashboard (/analytics)
- Grid of glassmorphic metric cards
- Metrics: Portfolio views, Resume views, Resume downloads, Session duration, Screenshots/interactions, Visitor feedback
- Animated counters
- Clean, data-focused layout

## Component Library

### Buttons
- Primary: Accent color with glass background, rounded-full
- Secondary: White/10 with glass blur
- Magnetic hover effect (subtle movement toward cursor)
- Scale on hover (1.02-1.05)

### Cards
- Glass containers with blur
- Subtle borders
- Rounded-2xl corners
- Hover: slight elevation increase

### Custom Cursor
- Minimal circular design
- Smooth trailing motion
- Scale/opacity change on hover and click
- Disabled for reduced-motion users

## Animation Principles

### GSAP Requirements
- Smooth, natural easing (power3.out, expo.out)
- Hero typing animation for name
- Scroll-triggered section reveals
- Staggered card entrance animations
- Subtle parallax depth effects
- Magnetic button hovers
- **Performance-first approach**
- **Respect prefers-reduced-motion**
- **No over-animation** - enhance storytelling, don't distract

## Images
**Hero Section**: No background image - pure glassmorphism with dark gradient
**Case Study**: Include project mockups/screenshots with glassmorphic frames
**Projects Section**: Project thumbnails within glass cards

## Quality Standards
- Minimal, confident design - no clutter
- Production-ready polish
- Cinematic feel with fluid interactions
- Clean hierarchy and breathing room
- Lighthouse-optimized performance
- SEO-friendly structure