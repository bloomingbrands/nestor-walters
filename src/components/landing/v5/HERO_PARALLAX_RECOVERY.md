# Landing Page — Hero Parallax Recovery Guide

## Context

As of the latest build, the hero section (`HeroV5.tsx`) has been **flattened** — the scroll-driven parallax layers and Lenis smooth-scroll have been removed at the client's request. The hero now renders as a static composition with flat background layers.

This guide exists so a future agent can quickly restore the parallax effect if the client asks for it.

---

## What Was Removed

### 1. GSAP + ScrollTrigger parallax

Four layers scrolled at different rates on scroll:

| Layer | Content | yPercent |
|-------|---------|----------|
| 1 | Starry sky | 70 |
| 2 | Mountain | 55 |
| 3 | Title + tagline | 40 |
| 4 | Man with dog (later replaced by logo) | 10 |

### 2. Lenis smooth scroll

Initialized with:
- `duration: 1.4`
- Custom easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `smoothWheel: true`
- `wheelMultiplier: 0.85`
- `touchMultiplier: 1.2`

Lenis was wired to GSAP's ticker and ScrollTrigger so smooth-scroll events drove the parallax timeline.

---

## How to Restore

### Option A: Recover from git

The original parallax implementation is in the git history. The simplest recovery is:

```bash
git show HEAD~N:src/components/landing/v5/HeroV5.tsx > src/components/landing/v5/HeroV5.tsx
```

Where `N` is the number of commits back to the last parallax version (check `git log --oneline`).

### Option B: Manual restore

1. **Re-add imports** at the top of `HeroV5.tsx`:

```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
```

2. **Add the `useEffect` hook** (this was the full initialization block):

```tsx
export function HeroV5() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ref.current?.querySelector("[data-parallax-layers]");
    if (trigger) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger, start: "0% 0%", end: "100% 0%", scrub: 0 },
      });
      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];
      layers.forEach((l, i) => {
        tl.to(
          trigger.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
          { yPercent: l.yPercent, ease: "none" },
          i === 0 ? undefined : "<",
        );
      });
    }
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __v5Lenis?: Lenis }).__v5Lenis = lenis;
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (trigger) gsap.killTweensOf(trigger);
      lenis.destroy();
      delete (window as unknown as { __v5Lenis?: Lenis }).__v5Lenis;
    };
  }, []);

  return ( ... )
}
```

3. **Wrap background layers** in `data-parallax-layers` and `data-parallax-layer` attributes:

```tsx
<div data-parallax-layers className="absolute top-0 left-0 h-full w-full overflow-hidden">
  <div data-parallax-layer="1" className="absolute top-[-17.5%] left-0 h-[117.5%] w-full pointer-events-none">
    {/* Starry sky Image + overlay */}
  </div>
  <div data-parallax-layer="2" className="absolute top-[-17.5%] left-0 h-[117.5%] w-full pointer-events-none">
    {/* Mountain Image + overlay */}
  </div>
  <div data-parallax-layer="3" className="absolute top-0 left-0 flex h-svh w-full flex-col items-center justify-center gap-6 px-6">
    {/* Logo + Title + Tagline */}
  </div>
  <div data-parallax-layer="4" className="absolute bottom-0 left-0 h-[150%] w-full pointer-events-none">
    {/* Foreground element (logo/man-dog) */}
  </div>
</div>
```

4. **Attach the ref** to the outer container:

```tsx
<div ref={ref} className="relative w-full overflow-hidden" style={{ backgroundColor: VOID }}>
```

---

## Dependencies

Ensure these are in `package.json`:

```json
"gsap": "^3.12.x",
"@studio-freight/lenis": "^1.0.x"
```

Both were present when parallax was active and should still be installed.

---

## Notes

- The flat hero currently uses `absolute inset-0` for backgrounds instead of the parallax layer structure.
- The Lenis instance was stored on `window.__v5Lenis` so modals could access it to pause/resume smooth scroll.
- If restoring parallax, check that modals (WritingCardsGrid modal) still handle scroll correctly — they may need the Lenis pause/resume logic restored too.
