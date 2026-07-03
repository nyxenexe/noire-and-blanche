# Noire & Blanche — Project Guide

> **Project:** Marketing website for Noire & Blanche, an upscale café in Lekki Phase I, Lagos  
> **Stack:** HTML, CSS, Vanilla JavaScript  
> **Type:** Static single-page website (SPA-style navigation)

---

## Table of Contents

- [File Responsibilities](#file-responsibilities)
- [Folder Structure](#folder-structure)
- [HTML Documentation](#html-documentation)
- [CSS Documentation](#css-documentation)
- [JavaScript Documentation](#javascript-documentation)
- [Project Flow](#project-flow)
- [Maintenance Notes](#maintenance-notes)
- [Client & Interview Notes](#client--interview-notes)

---

## File Responsibilities

| File | Purpose |
|---|---|
| `index.html` | Single-page HTML document containing all semantic content, sections, and embedded structure. No templating — fully static. |
| `styles.css` | All visual styling — layout, colors, typography, animations, responsive breakpoints, and dark/light section theming. |
| `script.js` | All client-side interactivity — mobile navigation, smooth scrolling, scroll-based effects, lightbox, animations, and utility functions. |
| `README.md` | Project overview, branding description, and deployment notes. |
| `PROJECT_GUIDE.md` | **(This file)** Developer reference — explains every part of the codebase. |
| `images/` | Directory of image assets (interior photos, food/drink shots, ambiance shots) used throughout the site. |

---

## Folder Structure

```
noire-and-blanche/
├── index.html            # Main HTML document
├── styles.css            # All styles
├── script.js             # All JavaScript
├── README.md             # Project overview
├── PROJECT_GUIDE.md      # Developer reference
└── images/               # Image assets
    ├── cafeinterior.jpg
    ├── latteart.jpg
    ├── marblecounter.jpg
    ├── freshpastries.jpg
    ├── amiembent.jpg
    ├── creativespace.jpg
    ├── coffe.jpg
    ├── cof.jpg
    ├── cooffe.jpg
    ├── passte.jpg
    ├── art.jpg
    ├── cookies.jpg
    ├── counter-view.jpg
    ├── pendat.jpg
    ├── seatingarea.jpg
    ├── choco-shake.jpg
    ├── strawbrerry.jpg
    ├── a-moment-between-bites.jpg
    ├── pastry-spread-table-for-one.jpg
    ├── work-well-fueled.jpg
    └── fresh-from-the-oven.jpg
```

---

## HTML Documentation

### `<head>` — Metadata & Fonts

**Purpose:** Sets character encoding, viewport, description, theme color, title, and preconnects for Google Fonts.

**Important elements:**
- `<meta name="description">` — SEO description for search results.
- `<meta name="theme-color">` — Browser chrome color on mobile.
- `<link rel="preconnect">` — Performance optimization — pre-connects to Google Fonts CDN before the CSS loads.
- `<link href="...fonts.googleapis.com/...">` — Loads **Playfair Display** (headings) and **Inter** (body) font families.

**Connections:** These fonts are referenced in CSS via `--font-heading` and `--font-body` custom properties.

---

### Navigation — `<nav class="navbar">`

**What it does:** Fixed-position navigation bar with a logo, desktop horizontal links, and a mobile hamburger toggle.

**Important elements:**
- `.navbar` — Fixed top bar with dark background and blur.
- `.logo h1` — "Noire & Blanche" brand name.
- `#navToggle` — A `<button>` with three `<span>` bars. `aria-expanded` and `aria-controls` connect it to the menu.
- `#navLinks` — An unordered list of anchor links pointing to each section (`#home`, `#about`, `#menu`, `#gallery`, `#reviews`, `#location`).
- `#navOverlay` — A dimming overlay behind the mobile drawer, hidden by default.

**Static or interactive:** Interactive — controlled by JavaScript (Section 2 in `script.js`).

**Accessibility:**
- `<nav>` element with `aria-label="Main navigation"`.
- Toggle button has `aria-expanded` and `aria-controls`.
- Active section link gets `aria-current="page"` via JS.
- Mobile menu traps keyboard focus when open.
- Focus returns to the hamburger on close.

---

### Hero Section — `<section id="home" class="hero">`

**What it does:** Full-viewport hero with a background image, gradient overlays, a texture pattern, and CTAs. This is the first thing visitors see.

**Important elements:**
- `.hero-bg` — Positioned absolutely with a Unsplash coffee shop background image.
- `.hero-texture` — Subtle SVG noise texture overlay for depth.
- `.hero-content` — Centered text: café name, tagline, gold divider line, and two CTA buttons.
- `.cta-button.primary` — "View Menu" links to `#menu`.
- `.cta-button.secondary` — "Get Directions" links to `#location`.

**Static or interactive:** Primarily static with a CSS slide-up animation on load (`hero-slide-up`) and a JS-driven parallax effect on scroll.

---

### About Section — `<section id="about" class="about">`

**What it does:** Introduces the café's philosophy with a three-paragraph description and three feature cards.

**Important elements:**
- `.about-content` — Centered text block.
- `.about-features` — 3-column grid of `.feature` cards (Premium Coffee, Precise Design, Central Location).
- `.feature-icon` — Decorative gold line accent above each card title.

**Static or interactive:** Static content, but cards have hover lift animations and are revealed via IntersectionObserver on scroll.

---

### Menu Section — `<section id="menu" class="menu">`

**What it does:** Displays the café's full menu organized by category. The most content-heavy section.

**Important elements:**
- `.menu h2` — "Our Menu" heading with star accent (`::before`) and gold underline (`::after`).
- `.menu-subtitle` — Italic subtitle with gold flanking lines.
- `.menu-grid` — Auto-fit grid of `.menu-category` cards.
- `.menu-category` — Individual category card (Pair of the Day, Breakfast, Coffee, Bakery, Salads, Tea, Juices, Milkshakes).
- `.menu-item` — Each menu item with name, description, variants, and price.
- `.item-price` — Gold-colored price in Naira (₦).
- `.menu-category--sparse` — Modifier for centered, minimal categories like Tea.

**Static or interactive:** Static content rendered in HTML. Cards have hover lift effects, and all categories/items use IntersectionObserver for fade-in scroll animations.

**IDs and classes used:** `.menu`, `.menu-grid`, `.menu-category`, `.menu-item`, `.item-name`, `.item-price`, `.menu-item-desc`, `.item-variants`, `.menu-subtitle`, `.menu-coming-soon`.

---

### Gallery Section — `<section id="gallery" class="gallery">`

**What it does:** Shows café photography in a grid layout with an expandable "View More" section.

**Important elements:**
- `.gallery-grid` — 3-column grid of `.gallery-item` images.
- `.gallery-item` — Each image has `<img>`, an overlay caption, and optional `data-full` attribute for lightbox high-res.
- `#galleryExpanded` — Initially collapsed section with additional category galleries (Coffee, Pastries, Interior & Ambience, Milkshakes, Dinner Plates).
- `#galleryToggleBtn` — "View More / View Less" button with `aria-expanded`.

**Static or interactive:** Interactive. Clicking a gallery item opens a lightbox (JS Section 6). The "View More" toggle expands the hidden gallery with a `max-height` CSS transition.

**Accessibility:** Toggle button uses `aria-expanded`. Lightbox is keyboard-navigable with Escape to close and focus management.

---

### Reviews Section — `<section id="reviews" class="reviews">`

**What it does:** Displays three customer testimonial cards.

**Important elements:**
- `.reviews::before` — A large decorative quotation mark character via CSS pseudo-element.
- `.reviews-grid` — 3-column grid of `.review-card` items.
- Each card has star rating, quote text, and author name.

**Static or interactive:** Static content with scroll-reveal animations and card hover effects.

---

### Location Section — `<section id="location" class="location">`

**What it does:** Provides address, hours, phone, service options, and an embedded Google Maps iframe.

**Important elements:**
- `.location-info` — Contains hours, address, contact, and service tags.
- `.location-map` — Wrapper around the Google Maps `<iframe>`.
- `.info-block` — Each detail block (Address, Hours, Phone, Service Options).
- `.info-block ul li` — Pill-shaped service tags (Dine-in, Kerbside Pickup, No-contact Delivery).

**Static or interactive:** Static. The phone number link (`tel:+2348071844444`) is clickable on mobile.

**Accessibility:** Phone link has `href="tel:"` for click-to-call. Map iframe has `title` (via `aria-label` equivalent) and `loading="lazy"`.

---

### Footer — `<footer class="footer">`

**What it does:** Three-column footer with brand info, quick links, and social/contact links.

**Important elements:**
- `.footer-content` — 3-column grid layout.
- `.footer-section` — Each column (Brand, Quick Links, Connect).
- `.footer-bottom` — Copyright/attribution line.

**Static or interactive:** Static. The copyright year is dynamically set via JavaScript.

---

## CSS Documentation

### 1. Custom Properties (`:root`)

**What they control:** The entire visual language of the site — colors, fonts, spacing, shadows, transitions, and border radii.

**Why they exist:** Centralizing values into variables ensures consistency across sections and makes global theming changes trivial. Changing `--color-gold` once updates every accent on the site.

**Key variables:**
- `--font-heading`: Playfair Display (serif, elegant)
- `--font-body`: Inter (sans-serif, readable)
- `--color-gold`: `#d4af37` (brand accent)
- `--color-warm-dark`: `#1A1714` (warm charcoal for dark sections)
- `--color-ivory`: `#F0EBE3` (warm light text on dark backgrounds)
- `--color-cream-light`: `#faf8f6` (main page background)
- `--section-padding`: Controls vertical spacing for all sections
- `--transition-base`: `0.3s ease` (used throughout for consistency)

---

### 2. Reset & Base

**What it controls:** Box-sizing, body defaults, image behavior, link styling, list removal, and global container widths.

**Affected elements:** All elements (`*`), `html`, `body`, `img`, `a`, `ul`, `button`, `.container`, `section`.

**Why written this way:**
- `box-sizing: border-box` — Prevents padding from breaking layout widths.
- `body` starts with `opacity: 0` and transitions to `1` via the `.loaded` class — prevents FOUC (Flash of Unstyled Content).
- `button` reset — Ensures consistency across browsers for the hamburger toggle.

---

### 3. Typography

**What it controls:** Heading hierarchy (`h1`–`h5`), paragraph styles, and `.section-subtitle`.

**Affected elements:** All headings and paragraphs.

**Responsive behavior:** `h2` shrinks from `2.75rem` to `2rem` at 768px breakpoint via the media query.

---

### 4. Utilities

**What it controls:** Reusable `.cta-button` styles (primary/secondary variants), ripple animation, and scroll progress bar.

**Important classes:**
- `.cta-button.primary` — Gold background, dark text. Used for "View Menu" and "View More".
- `.cta-button.secondary` — Transparent with white border. Used for "Get Directions" on the hero.
- `.ripple` — Created by JS on button click, expands and fades out.

**Animation:** `@keyframes ripple-animation` — Scales from 0 to 4x size while fading out over 600ms.

---

### 5. Navigation

**What it controls:** The fixed top navbar, desktop link layout, hamburger toggle, mobile drawer, and overlay.

**Affected elements:** `.navbar`, `.nav-links`, `.nav-toggle`, `.nav-overlay`.

**Desktop behavior:**
- `.nav-links` is `display: flex` with horizontal items.
- Link underline (`::after`) animates from 0 to 100% width on hover.
- `.active` class (set by JS) makes the current section link gold.

**Mobile behavior** (at 768px breakpoint):
- `.nav-links` becomes a fixed-position drawer sliding in from the right (`transform: translateX(100%)` to `0`).
- `.nav-overlay` dims the page behind the drawer.
- `.nav-toggle` (hamburger) is `display: flex` with an X animation on `.active`.
- 250ms cubic-bezier animation for smooth slide.
- 48px minimum touch targets on all links.

**Transition:** `transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)` — This easing (ease-out quad) feels natural and premium.

---

### 6. Hero

**What it controls:** Full-screen hero with layered backgrounds and parallax.

**Affected elements:** `.hero`, `.hero-bg`, `.hero-texture`, `.hero-content`.

**Animations:**
- `hero-slide-up` — Content fades and slides up on page load.
- `.hero-bg` parallax — Applied via JS `transform: scale(1.05) translateY(...)`.

**Notable:** The `::before` overlay on `.hero` uses three gradients to create depth without a separate element. The `url("data:image/svg+xml,...")` on `.hero-texture` is an inline SVG mosaic pattern, avoiding an extra HTTP request.

---

### 7. About

**What it controls:** About text and 3-column feature cards layout.

**Responsive behavior:** At 768px, `.about-features` collapses to 1 column.

---

### 8. Menu

**What it controls:** Dark section with menu category cards, items, prices, and descriptions.

**Background:** Warm dark `#1A1714` with radial gradient glows for depth.

**Cards:** `.menu-category` uses:
- Warm cream background (`#F5F0EA`) with an inner top highlight gradient (`::after`).
- 12px border radius, 20px shadow for depth.
- Hover lifts 3px with gold border and stronger shadow.

**Typography:**
- Category headings: Warm gold-brown (`#8B7355`).
- Item names: Espresso (`#3c2415`).
- Prices: Gold (`#d4af37`) — always stands out.
- Descriptions: Muted espresso italic.

**Animations:** Menu categories use staggered `transition-delay` for cascade on scroll-reveal. Menu items use `slide-in-left` animation.

---

### 9. Gallery

**What it controls:** Main gallery grid and expandable category gallery.

**Key features:**
- `.gallery-grid` — 3-column grid on desktop, 2 on tablet, 1 on mobile.
- `.gallery-item` — 4:3 aspect ratio with `object-fit: cover` and zoom-on-hover.
- `.gallery-expanded` — Uses `max-height` transition (0 → 3000px) for smooth open/close.
- `.gallery-grid--expanded` — Sub-grid inside each category.

---

### 10. Reviews

**What it controls:** Testimonial cards with decorative quote accent.

**Notable:** The large quote mark is a CSS `::before` pseudo-element with `font-size: 8rem` and very low opacity — adds atmosphere without extra markup.

---

### 11. Location

**What it controls:** Address, hours, contact, service tags, and embedded map.

**Background:** Creamy brown (`#DCC8B0`) with warm radial glows — creates a warm, inviting feel.

**Typography:** Creamy black text (`#1C1712` and `#2A2218`) for strong readability.

**Tags:** Subtle espresso-colored pill badges for service options.

---

### 12. Footer

**What it controls:** Three-column footer with links and brand info.

**Responsive behavior:** Collapses to 1 column with centered text at 768px.

---

### 13. Animations

**What it controls:** Scroll-reveal behaviors for elements across the site.

**Key classes:**
- `.observe-element` — Invisible + shifted down by default.
- `.observe-element.fade-in` or `.revealed` — Visible + in position.

**Elements animated:**
- Menu categories — Fade + scale, staggered delays (0.12s–0.54s).
- Menu items — Slide in from left, staggered (0.05s–0.5s).
- Gallery items — Fade + scale, staggered (0.05s–0.3s).
- Review cards — Pop in with bounce easing, staggered (0.1s–0.3s).
- Navigation — Slide down on mobile open.

---

### 14. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 1024px` | Gallery 2-col, footer 2-col, reduced section padding |
| `max-width: 768px` | Mobile nav drawer, single-column layouts for about/menu/gallery/reviews/location, smaller headings |
| `max-width: 480px` | Smaller hero text, tighter menu card padding |

---

## JavaScript Documentation

### 1. Page Load (`window.addEventListener('load', ...)`)

**Purpose:** Fades the page in by adding `.loaded` to `<body>`, triggering the CSS `opacity: 0 → 1` transition.

**Why:** Prevents a flash of unstyled content (FOUC) before fonts and images load.

---

### 2. Mobile Navigation Manager (`const nav = { ... }`)

**Purpose:** Controls the mobile slide-in drawer with proper accessibility, focus management, and close-on-resize behavior.

**How it works:**

- **`nav.open()`**: Adds `.active` to drawer, overlay, and toggle. Sets `overflow: hidden` on body. Updates `aria-expanded` and `aria-hidden`. Calls `_trapFocus()` to keep Tab cycling within the drawer.
- **`nav.close()`**: Removes `.active` from all elements, restores body scroll, resets ARIA attributes, returns focus to the hamburger, and releases the focus trap.
- **`nav.toggle()`**: Calls `open()` or `close()` based on current state.

**Close triggers:**
1. **Hamburger click** — Toggles the menu.
2. **Overlay click** — Closes the menu (tap outside drawer).
3. **Link click** — Each nav anchor closes the menu.
4. **Escape key** — Global listener checks `isMobileNavOpen`.
5. **Resize to desktop** — Debounced resize listener closes the menu if viewport exceeds 768px.

**Focus trap (`_trapFocus`):**
- Queries all focusable elements inside `#navLinks`.
- On Tab: cycles forward (`first → last`).
- On Shift+Tab: cycles backward (`last → first`).
- Cleanup function is stored for release on close.

**Edge cases handled:**
- Double-open prevented by `isMobileNavOpen` flag.
- Focus returns to hamburger even if the active element was outside the menu.
- Resize timer debounced at 100ms to avoid rapid fires.

---

### 3. Smooth Scrolling

**Purpose:** Intercepts all `a[href^="#"]` clicks and smoothly scrolls to the target section with a navbar offset.

**How it works:**
1. Prevents default anchor jump.
2. Calculates target position: `element.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT`.
3. Calls `window.scrollTo({ top, behavior: 'smooth' })`.

**Edge cases:**
- Ignores `href="#"` (no-op links).
- `NAV_HEIGHT` constant (80px) prevents the fixed navbar from covering the section top.

---

### 4. Scroll Handler (Throttled)

**Purpose:** Runs on every scroll event (throttled to 60ms) to manage multiple UI updates.

**What it does:**
1. **Navbar scrolled state** — Adds `.scrolled` to navbar when `scrollY > 50` (toggles background opacity).
2. **Active navigation highlighting** — Iterates through all sections and sets `.active` + `aria-current="page"` on the corresponding nav link.
3. **Scroll progress bar** — Calculates scroll percentage and sets the `.scroll-progress` bar width.
4. **Hero parallax** — Translates `.hero-bg` at 8% of scroll speed for a subtle parallax.
5. **Reveal fallback** — For browsers without IntersectionObserver, manually checks element positions and adds `.revealed`.

---

### 5. Intersection Observer

**Purpose:** Triggers scroll-reveal animations and lazy-loads images.

**Scroll reveal:**
- Watches `.menu-category`, `.review-card`, `.feature`, `.gallery-item`.
- When an element enters the viewport (10% visible), adds `.fade-in` class and stops observing it.
- 80px bottom root margin triggers elements slightly before they enter the viewport.

**Image lazy loading:**
- Watches `<img data-src>` elements. When they enter the viewport, copies `data-src` to `src` and adds `.loaded` class.
- This is a fallback — most images already use native `loading="lazy"` in HTML.

---

### 6. Gallery Lightbox

**Purpose:** Opens a full-screen overlay with the clicked image when a gallery item is tapped.

**How it works:**
1. Click handler on every `.gallery-item`.
2. Reads `data-full` for high-res image (falls back to `src`).
3. Creates a `.lightbox` div with the image and caption.
4. Appends to body, then `requestAnimationFrame` triggers the active state.
5. Close triggers: close button click, overlay backdrop click, Escape key.

**Edge cases:**
- `data-full` attribute allows separate high-res images.
- Lightbox is removed from DOM after 300ms close animation completes.
- Escape listener is scoped (removed after firing once per lightbox).

---

### 7. Button Ripple Effect

**Purpose:** Adds a material-design ripple on `.cta-button` clicks.

**How it works:** Creates a `<span class="ripple">` positioned at the click coordinates, animates it via CSS, and removes it after 600ms.

---

### 8. Click-to-Call Feedback

**Purpose:** Briefly highlights phone links in gold when clicked.

**How it works:** Adds inline `color: #d4af37` on click and removes it after 300ms.

---

### 9. Utility Functions

| Function | Purpose |
|---|---|
| `isValidEmail(email)` | Regex validation for email format. |
| `validateForm(data)` | Checks name, email, and message fields — returns error array. |
| `filterMenuItems(category)` | Filters `.menu-category` by `data-category` attribute (opacity/pointerEvents). |
| `animateCounter(element, target)` | Animates a number from 0 to target over 2 seconds at ~60fps. |

These are exposed globally via `window.NoireBlanche` for potential use by other scripts or browser console.

---

### 10. Gallery Toggle

**Purpose:** Expands/collapses the hidden gallery section.

**How it works:**
1. Click toggles `.open` on `#galleryExpanded`, which transitions `max-height` from 0 → 3000px.
2. Button text changes between "View More" / "View Less".
3. `aria-expanded` is toggled for accessibility.
4. On first expand only, sets up IntersectionObserver for items inside the expanded gallery.

---

### 11. Console Welcome

**Purpose:** Logs a branded message to the browser console for a touch of personality.

---

## Project Flow

### What happens when the page first loads:

1. **HTML** is parsed — browser reads the `<head>` (fonts, CSS, meta) then the `<body>` (sections, images, scripts).
2. **CSS** is applied immediately — body starts hidden (`opacity: 0`), all sections in their default state.
3. **Google Fonts** load asynchronously (Playfair Display, Inter).
4. **`script.js`** executes after HTML parsing completes (`<script>` at end of `<body>`).
5. **`window.addEventListener('load')`** fires — adds `.loaded` class to `<body>`, triggering the fade-in transition. The page becomes visible.
6. **IntersectionObserver** starts watching elements for scroll-reveal animations.
7. **Scroll handler** initializes — calls `handleScroll()` once to set initial states (active nav link, scroll progress bar creation).
8. **User can now interact** — scroll, click gallery items, toggle mobile nav, click buttons.

### How user interactions work:

| Action | Response |
|---|---|
| **Click hamburger** | Drawer slides in from right, overlay fades in, body locks scroll |
| **Tap overlay** | Drawer slides out, overlay fades out |
| **Click nav link** | Smooth scroll to section, drawer closes (mobile) |
| **Click gallery image** | Lightbox opens with full-size image |
| **Click "View More"** | Expanded gallery section slides open |
| **Click CTA button** | Ripple effect, navigates to target section |
| **Scroll** | Nav updates active link, progress bar fills, parallax moves, elements fade in |
| **Resize to mobile** | Hamburger appears, nav links become drawer |
| **Resize to desktop** | Drawer auto-closes if open |

---

## Maintenance Notes

### Navigation

- **Where to edit:** `index.html` (links), `styles.css` (Section 5 + responsive 768px), `script.js` (Section 2).
- **Files involved:** All three.
- **What to avoid:** Don't change the `id` attributes (`navToggle`, `navLinks`, `navOverlay`) without updating JS references. Don't change `NAV_HEIGHT` in JS without updating `--nav-height` in CSS.
- **Common mistakes:** Breaking the focus trap by removing focusable elements from the drawer. Forgetting to add new nav links to both HTML and scroll handler.

### Menu

- **Where to edit:** `index.html` (add/edit items), `styles.css` (Section 8).
- **Files involved:** `index.html`, `styles.css`.
- **What to avoid:** Don't nest `.menu-category` inside other content outside `.menu-grid`. Don't remove `observe-element` classes from new cards (scroll-reveal won't work).
- **Adding items:** Copy an existing `.menu-item` block and update text/price. Categories are automatically arranged by the CSS grid.

### Gallery

- **Where to edit:** `index.html` (add images), `styles.css` (Section 9), `script.js` (Section 6).
- **Files involved:** `index.html`, `styles.css`, `script.js`, plus image files in `images/`.
- **What to avoid:** Don't remove `data-full` from images that need it for lightbox high-res. Don't add images without `loading="lazy"`.
- **Adding images:** Add `<img>` inside `.gallery-grid` or `.gallery-grid--expanded`. Image filenames are case-sensitive on GitHub Pages.

### Animations

- **Where to edit:** `styles.css` (Section 13), `script.js` (Section 5).
- **Files involved:** `styles.css`, `script.js`.
- **What to avoid:** Changing `transition-delay` staggered timings without considering the cascade order.
- **Disabling animations:** Remove `.observe-element` class from HTML or skip adding it in JS.

### Responsive

- **Breakpoints are at** 1024px, 768px, and 480px in `styles.css` (Section 14).
- **Test on all breakpoints** after any layout change. The mobile nav drawer specifically needs testing at the 768px boundary.
- **Common breakage:** Adding fixed-width elements inside a responsive grid. Always use relative units (`%`, `rem`, `vw`).

---

## Client & Interview Notes

### Why did you structure it this way?

> "The site is vanilla HTML, CSS, and JS because it's a marketing page — no dynamic data, no backend needed. Using a framework like React would add unnecessary complexity for a static brochure site. Vanilla means faster load times, simpler deployment (just upload files), and easier maintenance for anyone with basic web skills."

### Why did you use this approach?

> "The design prioritizes atmosphere and brand feel. Playfair Display for headings gives it the café/hospitality elegance. The dark sections with warm charcoal backgrounds create a cozy, intimate vibe. Gold accents throughout tie back to the 'quiet luxury' brand promise. Everything — from the 250ms drawer animation to the staggered card reveals — is tuned to feel deliberate and refined."

### How would you scale it?

> "If they add more locations or a full menu database, I'd migrate to a CMS or static site generator — probably Astro or Next.js with a headless CMS. The menu could be data-driven instead of hardcoded HTML. A reservations system or online ordering would require a backend (Node.js, Supabase, or similar). The existing CSS architecture with custom properties would make theming new sections straightforward."

### What would you improve in version 2?

> "I'd add:
> - **Actual menu data loading** — JSON or CMS-driven, so the team can update items without editing HTML.
> - **Image optimization pipeline** — Responsive image sets (WebP, srcset) for faster loading.
> - **Reservation widget** — Embed a booking system (e.g., OpenTable widget).
> - **Better performance monitoring** — Core Web Vitals tracking for ongoing optimization.
> - **Animation refinements** — Maybe reduce motion preference support for accessibility."

### Likely Questions

**Q: How does the mobile navigation work?**  
> "On mobile (below 768px), the nav links become a slide-in drawer from the right with a dimming overlay. The hamburger icon animates into an X. Pressing Escape, tapping the overlay, clicking a link, or resizing to desktop all close it. Keyboard focus is trapped inside while open."

**Q: How do the scroll animations work?**  
> "Elements start invisible and shifted down. As the user scrolls, an IntersectionObserver adds a class that triggers a CSS transition — fade, slide, or scale pop. Each element has a staggered delay so they cascade in one by one instead of all at once."

**Q: Why not use a framework?**  
> "For a single marketing page with no interactivity beyond scroll effects and a lightbox, a framework adds 50-100kb of JavaScript for no benefit. Vanilla JS is faster to load, easier to audit, and simpler to hand off to another developer."
