# Design System

## Theme

Dark, atmospheric, cinematic. The experience reads at night, under low ambient light, in a contemplative mood. Every surface is tinted toward a warm, muted brand hue rather than pure neutral.

## Color

**Strategy: Committed.** One desaturated warm tone carries the emotional weight across a near-black ground.

### Palette

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `oklch(0.08 0.005 55)` | Primary ground, near-black with warm drift |
| `--color-surface` | `oklch(0.12 0.008 55)` | Elevated surfaces, cards, panels |
| `--color-surface-elevated` | `oklch(0.16 0.01 55)` | Hover states, modal backdrops |
| `--color-text-primary` | `oklch(0.94 0.003 55)` | Headings, primary copy |
| `--color-text-secondary` | `oklch(0.70 0.006 55)` | Captions, metadata, labels |
| `--color-text-muted` | `oklch(0.50 0.008 55)` | Placeholders, disabled states |
| `--color-accent` | `oklch(0.65 0.08 55)` | Warm sepia accent for links, highlights |
| `--color-accent-hover` | `oklch(0.75 0.10 55)` | Accent hover state |
| `--color-border` | `oklch(0.22 0.01 55)` | Subtle dividers, hairlines |
| `--color-parchment` | `oklch(0.95 0.02 75)` | Poem cards, manuscript backgrounds |
| `--color-ink` | `oklch(0.25 0.02 55)` | Manuscript text, handwriting |

### Poem card accents (muted, desaturated)

| Name | Value |
|---|---|
| Parchment yellow | `oklch(0.94 0.025 95)` |
| Faded sky | `oklch(0.92 0.02 230)` |
| Aged rose | `oklch(0.92 0.02 15)` |
| Dusty lime | `oklch(0.93 0.02 120)` |
| Warm amber | `oklch(0.93 0.025 85)` |
| Soft violet | `oklch(0.92 0.02 300)` |

## Typography

### Font families

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display serif | `var(--font-caveat)` | 400, 700 | Hero headlines, handwritten notes, polaroid captions |
| Sans-serif | `var(--font-geist-sans)` | 300, 400, 600 | Body text, UI labels, navigation |
| Monospace | `var(--font-geist-mono)` | 400 | Metadata, captions, technical labels |

### Scale

| Token | Size | Weight | Line-height | Usage |
|---|---|---|---|---|
| `text-hero` | `clamp(3rem, 12vw, 8em)` | 700 | 1.0 | Hero headlines |
| `text-display` | `3rem` / `4rem` (md) | 700 | 1.1 | Section headings |
| `text-title` | `1.5rem` | 600 | 1.25 | Card titles |
| `text-body` | `0.875rem` | 400 | 1.6 | Body copy, descriptions |
| `text-caption` | `0.75rem` | 400 | 1.5 | Labels, metadata |
| `text-micro` | `0.625rem` | 400 | 1.4 | Timestamps, fine print |

### Tracking

- Headlines: `tracking-tight` (-0.025em)
- Uppercase labels: `tracking-[0.2em]`
- Navigation: `tracking-[0.15em]`
- Body: default

## Spacing

### Rhythm

- Section padding: `py-8 px-6 md:px-12`
- Content max-width: `max-w-5xl`
- Grid gaps: `gap-4` to `gap-6`
- Card internal padding: `p-4` to `p-6`

### Elevation

No traditional shadow scale. Depth is achieved through:
- Layered parallax (z-depth via scroll)
- Atmospheric fog/gradients
- Subtle backdrop blur on overlays
- Warm ambient glow from accent colors

## Components

### Card

```
--rounded-lg
--border (subtle, oklch(0.22 0.01 55))
--bg-card (oklch(0.12 0.008 55))
--text-card-foreground (oklch(0.94 0.003 55))
--shadow-sm (barely visible, atmospheric)
```

### PoemCard

- Manuscript aesthetic: warm paper tones, handwriting font
- Tape-strip detail at top
- Slight rotation (-2deg to 2deg)
- Hover: lift, un-rotate, shadow deepens
- Modal expansion for full poem reading

### PolaroidCard

- White frame, sepia image
- Handwritten caption in Caveat
- Hover: desaturate-to-color reveal, lift, shadow deepens
- Rotation for scattered, discovered feel

### Navbar

- Fixed top, z-50
- Transparent over hero, glassmorphism on scroll
- Minimal: wordmark + one anchor link
- No heavy UI chrome

## Motion

### Philosophy

Motion should feel like memory, wind, drifting paper, breath.

### Patterns

| Animation | Easing | Duration |
|---|---|---|
| Parallax layers | `ease: "none"` (scroll-scrubbed) | Scroll-linked |
| Fade-in reveals | `ease-out-quart` | 0.6-0.8s |
| Card hover lift | `spring: { stiffness: 260, damping: 20 }` | Natural physics |
| Page transitions | `ease-out-expo` | 0.4s |
| Staggered children | `staggerChildren: 0.12` | Per-item |

### Reduced motion

When `prefers-reduced-motion: reduce`:
- Disable parallax
- Disable hover transforms
- Keep fade-ins but remove travel distance
- Maintain semantic transitions

## Layout

### Principles

- Vary spacing for rhythm; same padding everywhere is monotony
- Avoid nested cards
- Don't wrap everything in a container
- Cards are the lazy answer; use only when truly the best affordance

### Breakpoints

| Name | Width |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Assets

### Image treatment

- Hero parallax: layered PNGs with transparency (sky, mountains, figure)
- Polaroids: sepia default, color on hover
- Portrait: object-cover, gradient text overlay
- Background textures: subtle grain where appropriate

### Iconography

Minimal. Use text labels and handwritten elements over icon libraries.
