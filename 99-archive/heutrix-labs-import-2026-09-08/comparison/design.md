---
name: Heutrix Labs
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#001815'
  on-tertiary: '#ffffff'
  tertiary-container: '#002f29'
  on-tertiary-container: '#00a292'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered for operational excellence, targeting enterprise decision-makers and technical leads. The brand personality is rooted in **precision, efficiency, and industrial-grade reliability**. The UI evokes a sense of "quiet power"—complex operations made legible through structured clarity.

The visual style follows a **Corporate / Modern** aesthetic with leanings toward **Minimalism**. It prioritizes high information density without sacrificing whitespace, ensuring that automation workflows and technical data are easily digestible. The interface uses a systematic approach to depth and hierarchy to communicate a "tech-forward" and secure environment for AI-driven operations.

## Colors
The palette is anchored by **Deep Slate Navy (#1E293B)**, used for structural elements, navigation, and primary headings to establish authority. The primary action color is **Vibrant Mint Green (#10B981)**, strategically applied to indicate "active" states, automation success, and primary calls-to-action, symbolizing a "safe-to-go" AI environment.

**Teal (#14B8A6)** serves as a secondary accent for data visualization or interactive highlights. Surfaces utilize a refined scale of Slate Grays (from #F8FAFC backgrounds to #334155 text) to maintain professional contrast and legibility.

## Typography
This design system utilizes a dual-font strategy. **Plus Jakarta Sans** is used for headlines to provide a modern, clean, and slightly approachable geometric feel. **Inter** is the workhorse for body copy and labels, chosen for its exceptional legibility in data-heavy environments and its "utilitarian-tech" aesthetic.

Hierarchy is strictly enforced through weight and scale. Large displays use tighter letter-spacing for a modern "editorial" look, while labels utilize uppercase styling and increased tracking to differentiate functional UI metadata from narrative content.

## Layout & Spacing
The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. Spacing is based on a **4px baseline rhythm**, ensuring all components align to a predictable vertical and horizontal scale. 

- **Desktop (1280px+):** 12 columns, 24px gutters, 64px page margins.
- **Tablet (768px - 1279px):** 8 columns, 16px gutters, 32px page margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 16px page margins.

Layouts should favor top-down scanning. Section spacing (xxl) is generous to prevent cognitive overload during complex discovery phases.

## Elevation & Depth
Depth is communicated through **Tonal Layers** supplemented by **Ambient Shadows**. 

- **Level 0 (Background):** #F8FAFC. The foundation layer.
- **Level 1 (Cards/Surfaces):** White (#FFFFFF) with a soft, 1px border in #E2E8F0. 
- **Level 2 (Interactive/Hover):** A subtle, diffused shadow (0px 4px 12px rgba(30, 41, 59, 0.05)).
- **Level 3 (Modals/Dropdowns):** A more pronounced shadow (0px 12px 32px rgba(30, 41, 59, 0.12)) to indicate temporary overlay status.

Shadows must always carry a slight navy tint (derived from the primary color) to maintain a cohesive professional atmosphere rather than using generic neutral grays.

## Shapes
The shape language is **Soft**, utilizing a 4px (0.25rem) base radius. This provides a professional, "tooled" look that feels engineered rather than playful. 

- **Standard Elements (Inputs, Buttons):** 4px.
- **Service Cards:** 8px (rounded-lg) for a more distinct container feel.
- **Badges/Tags:** 9999px (pill) to distinguish them from interactive buttons.
- **Active States:** High-contrast color fills or 2px stroke indicators.

## Components

### Buttons
Primary buttons use a solid **Deep Slate Navy** or **Mint Green** fill with white text for maximum contrast. The "High-contrast" CTA variant specifically pairs a Navy background with a Mint Green 2px left-border or icon to draw the eye. Hover states involve a slight brightness shift (10%) rather than a color change.

### Cards
Cards are the primary container for services. They feature a white background, an 8px corner radius, and a 1px border in Slate-200. On hover, the border transitions to Mint Green or the shadow deepens to Level 2.

### Input Fields
Forms utilize a "modern clean" style: 1px Slate-300 borders, 4px radius, and a 16px horizontal padding. Active/Focus states use a 2px Teal ring with a 0% offset. Labels are set in `label-md` for clear field identification.

### FAQ Accordions
Accordions use a flat, bordered style. The header remains `body-md` in semi-bold Navy. When expanded, the background of the header shifts to a very light Slate-50, and the toggle icon (a thin Chevron) rotates 180 degrees.

### Navigation
The navigation is **Sticky** with a blur effect (`backdrop-filter: blur(12px)`) on a semi-transparent white background. The active state for nav items is indicated by a 2px Mint Green underline that sits 4px below the text baseline.

### Chips & Badges
Used for status (e.g., "AI Optimized", "Secure"). These are pill-shaped with light tinted backgrounds (e.g., Mint-100) and dark text (Mint-800).
## CTA wording

Follow [CTA-STYLE-GUIDE.md](CTA-STYLE-GUIDE.md). Keep labels short, professional and low-pressure; explain benefits in surrounding copy.
