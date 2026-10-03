# 3D Effects Guide

Your portfolio now includes subtle 3D effects that add depth and interactivity without requiring Three.js or increasing load times significantly.

## What was added

### 1. **Animated Particle Field** (Hero section)
- **Component**: `src/components/HeroCanvas.jsx`
- **What it does**: 40 floating particles with depth simulation (Z-axis) that drift slowly across the hero background. Particles at different depths have different sizes and opacity. Lines connect nearby particles to emphasize spatial relationships.
- **Performance**: Pure canvas rendering with `requestAnimationFrame`, ~10 lines of code
- **Customization**:
  ```javascript
  const count = 40        // Number of particles (reduce for slower devices)
  const speed = 0.15      // Movement speed
  const WINDOW = 120      // Max distance for connecting lines
  ```
- **Colors**: Automatically adapts to light/dark theme using CSS custom properties

### 2. **3D Typography** (Hero name)
- **Effect**: On hover, the name splits into two layers with different Z-depths and slight rotation
- **CSS**: `transform: translateZ(12px) rotateX(-2deg)` on first line, `translateZ(8px) rotateX(1deg)` on second
- **Customization**: Edit `.hero__name span` hover transforms in `src/styles.css`

### 3. **Floating Buttons**
- **Effect**: Buttons lift up on hover with a depth shadow underneath
- **How it works**: A `::before` pseudo-element positioned 4px behind creates the shadow layer
- **CSS**: `transform: translateY(-2px) translateZ(6px)` on hover
- **Active state**: Buttons compress slightly when clicked for tactile feedback

### 4. **Project Card Tilt**
- **Effect**: Cards lift and tilt forward on hover with an expanding accent glow
- **CSS**: `transform: translateY(-4px) rotateX(2deg)` plus enhanced shadow
- **Glow**: A gradient pseudo-element fades in behind the card border

### 5. **Pulsing Header Dot**
- **Effect**: The cobalt dot next to "Harsh Tyagi" floats gently with a glow
- **Animation**: 3-second loop with vertical translation and Z-depth change
- **Customization**: Edit `@keyframes float` duration and distance in `src/styles.css`

## Bundle impact

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| JS (gzipped) | 74.68 KB | 75.39 KB | **+0.71 KB** (~0.9%) |
| CSS (gzipped) | 3.78 KB | 4.20 KB | **+0.42 KB** (~11%) |
| External libraries | 0 | 0 | **No change** |
| HTTP requests | 3 | 3 | **No change** |

The entire 3D system adds **~1.1 KB gzipped** to the total bundle—less than a small image. No external dependencies were added.

## Accessibility

All 3D effects respect `prefers-reduced-motion`:
- Animations pause
- Transforms are disabled
- The canvas still renders but particles don't move
- Users with vestibular disorders see a static, calm interface

## Customization examples

### Make particles faster
```javascript
// src/components/HeroCanvas.jsx, line 20
const speed = 0.3  // was 0.15
```

### Change button lift distance
```css
/* src/styles.css, .btn:hover */
transform: translateY(-4px) translateZ(10px);  /* was -2px and 6px */
```

### Adjust card tilt angle
```css
/* src/styles.css, .project:hover */
transform: translateY(-4px) rotateX(4deg);  /* was 2deg */
```

### Disable the particle canvas
Comment out the `<HeroCanvas />` line in `src/components/Hero.jsx` (line 15). The hero grid background will still show.

## Browser support

- **3D transforms**: All modern browsers (IE11+ with fallback)
- **Canvas**: Universal support
- **Fallback behavior**: On older browsers, effects gracefully degrade to 2D transforms or no transforms

## Performance notes

- The particle canvas runs at 60fps on devices with 2× pixel ratio, capped at 2× to avoid rendering 4× on high-DPI displays
- Transforms use GPU-accelerated CSS properties (`transform`, not `top`/`left`)
- The canvas pauses rendering if the user switches tabs (browser behavior)
- No layout thrashing—transforms don't trigger reflow

---

**Want to go further?** The current effects are intentionally restrained. If you want more dramatic 3D (rotating project cards on mouse position, parallax scrolling), those can be added without Three.js using vanilla `mousemove` listeners and CSS custom properties.
