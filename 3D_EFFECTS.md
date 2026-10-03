# 3D Effects & Parallax Guide

Your portfolio includes subtle 3D effects and parallax scrolling that add depth and interactivity without requiring Three.js or increasing load times significantly.

## What was added

### 1. **Animated Particle Field with Parallax** (Hero section)
- **Component**: `src/components/HeroCanvas.jsx`
- **What it does**: 40 floating particles with depth simulation (Z-axis) that drift slowly across the hero background. Particles at different depths have different sizes and opacity. Lines connect nearby particles to emphasize spatial relationships.
- **Parallax**: Particles move at different speeds based on scroll position and their Z-depth, creating multi-layered depth
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

### 6. **Scroll-Based Parallax** (Hero section)
- **Effect**: Different content layers in the hero scroll at different speeds as you move down the page
- **Layers**: 
  - Name: -30% speed (moves slowest, appears furthest back)
  - Tagline: -20% speed
  - Buttons: -15% speed  
  - Facts: -10% speed (moves fastest, appears closest)
- **Hook**: `src/hooks/useParallax.js` - Reusable for any element
- **Customization**: Change the factor parameter (0 = no parallax, 1 = moves with scroll)

### 7. **Mouse Parallax** (Project cards)
- **Effect**: Project cards tilt and shift in 3D space based on cursor position when you hover over them
- **How it works**: Tracks mouse position relative to card center, applies smooth interpolated transforms
- **Hook**: `src/hooks/useMouseParallax.js`
- **Customization**:
  ```javascript
  const cardRef = useMouseParallax(8, 0.12)  // strength, smoothing
  // strength: how far elements move (in pixels)
  // smoothing: interpolation speed (0.1 = smooth, 1 = instant)
  ```

## Bundle impact

| Metric | Before 3D | After 3D | After Parallax | Total Change |
|--------|-----------|----------|----------------|--------------|
| JS (gzipped) | 74.68 KB | 75.39 KB | **76.03 KB** | **+1.35 KB** (~1.8%) |
| CSS (gzipped) | 3.78 KB | 4.20 KB | **4.23 KB** | **+0.45 KB** (~12%) |
| External libraries | 0 | 0 | **0** | **No change** |
| HTTP requests | 3 | 3 | **3** | **No change** |

The entire 3D + parallax system adds **~1.8 KB gzipped** to the total bundle—still less than a small image. No external dependencies were added.

## Accessibility

All 3D effects and parallax respect `prefers-reduced-motion`:
- Scroll parallax is disabled
- Mouse parallax is disabled  
- Animations pause
- Transforms are disabled
- The canvas still renders but particles don't move or parallax
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

### Change parallax speed in hero
```javascript
// src/components/Hero.jsx
const nameRef = useParallax(-0.5)  // was -0.3, more negative = slower
const ledeRef = useParallax(-0.3)  // was -0.2
```

### Adjust mouse parallax sensitivity
```javascript
// src/components/Projects.jsx, ProjectCard component
const cardRef = useMouseParallax(15, 0.12)  // was 8, higher = more movement
```

### Disable parallax on mobile
Both parallax hooks disable on screens < 768px by default. To change:
```javascript
const ref = useParallax(0.5, false)  // false = enable on mobile
```

### Disable the particle canvas
Comment out the `<HeroCanvas />` line in `src/components/Hero.jsx` (line 15). The hero grid background will still show.

### Disable scroll parallax
Remove the `useParallax` hook imports and ref assignments in `src/components/Hero.jsx`.

### Disable mouse parallax
In `src/components/Projects.jsx`, replace `useMouseParallax` with a simple `useRef`:
```javascript
const cardRef = useRef(null)  // instead of useMouseParallax(8, 0.12)
```

## Browser support

- **3D transforms**: All modern browsers (IE11+ with fallback)
- **Canvas**: Universal support
- **Fallback behavior**: On older browsers, effects gracefully degrade to 2D transforms or no transforms

## Performance notes

- The particle canvas runs at 60fps on devices with 2× pixel ratio, capped at 2× to avoid rendering 4× on high-DPI displays
- Scroll parallax uses `requestAnimationFrame` with a ticking flag to prevent layout thrashing
- Mouse parallax uses smooth interpolation so movements feel natural, not jittery
- Transforms use GPU-accelerated CSS properties (`transform`, not `top`/`left`)
- The canvas pauses rendering if the user switches tabs (browser behavior)
- `will-change` hints tell the browser to optimize transform performance
- No layout thrashing—transforms don't trigger reflow

---

**Want to go further?** The current effects are intentionally restrained. More dramatic options include:
- Gyroscope-based parallax on mobile (using DeviceOrientation API)
- Parallax on scroll with more layers (section backgrounds, images)
- Mouse parallax on the hero name itself
- Particle interactions (click to push particles away)

All can be added without Three.js using vanilla JS and CSS custom properties.
