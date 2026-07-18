# FormFix — Comprehensive Visual Browser Audit Plan

> Every page must be audited in **Light Mode** and **Dark Mode** across **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)** viewports. This document covers all 48 pages across 8 categories.

---

## Global Audit Checklist (Apply to ALL Pages)

These checks apply to every single page before per-page specifics.

### 1. Layout & Structure
- [ ] Header sticky positioning holds on scroll
- [ ] Header `.scrolled` state (background change) triggers at correct scroll threshold
- [ ] Content never overflows the viewport horizontally
- [ ] Footer renders at the bottom with correct spacing (`margin-top: 80px`)
- [ ] Footer grid collapses correctly (4-col → 2-col → 1-col)
- [ ] Footer bottom bar text alignment (desktop: space-between, mobile: centered)
- [ ] `overflow-x: hidden` on body prevents horizontal scrollbar
- [ ] Main content entrance animation (`impactEntrance`) fires on page load

### 2. Header
- [ ] Logo (`favicon.png`) loads and displays crisp at 24×24
- [ ] Logo text "FormFix" matches design token colors
- [ ] Desktop nav links render horizontally with correct active state (accent color + `aria-current="page"`)
- [ ] "Open Tools" CTA button renders with correct inverted styling (bg: text-primary, color: surface-1)
- [ ] Dark mode toggle icon swaps between sun/moon correctly
- [ ] Hamburger menu hidden on desktop (>960px), visible on mobile
- [ ] Mobile drawer slides in from right, max-width 300px, covers 85% width
- [ ] Drawer overlay (rgba(0,0,0,0.4)) appears behind drawer
- [ ] Drawer close button (X) and Escape key close the drawer
- [ ] Body `overflow: hidden` applied when drawer open, removed on close
- [ ] Theme toggle in drawer works and drawer closes after toggle

### 3. Breadcrumb
- [ ] Breadcrumb renders on all subpages (not homepage)
- [ ] "Home" link present and points to `/`
- [ ] Last item rendered as `<span>` with `aria-current="page"` (not a link)
- [ ] Separator `/` between items with `aria-hidden="true"`
- [ ] Schema.org BreadcrumbList markup present in DOM
- [ ] Font size 0.85rem, color matches `--text-muted`
- [ ] Link hover color changes to `--accent-primary`

### 4. Footer
- [ ] Footer logo loads correctly
- [ ] All footer links are clickable and point to correct routes
- [ ] Social links open in new tab with `rel="noopener noreferrer"`
- [ ] Year dynamically generated (`new Date().getFullYear()`)
- [ ] "Your files stay yours." tagline visible
- [ ] Responsive: 4-col → 2-col → 1-col grid

### 5. Theme (Light & Dark)
- [ ] Light mode: backgrounds use `--surface-1: #f8f8f8`, surfaces correct
- [ ] Dark mode: `.dark` class on `<html>`, backgrounds use `--surface-1: #111111`
- [ ] All text meets contrast ratio (4.5:1 minimum for body text)
- [ ] Accent color correct in both modes (`#10b981` light, `#34d399` dark)
- [ ] Borders visible in both modes
- [ ] Shadows visible but not overpowering in dark mode
- [ ] Theme persists across page reloads (localStorage `ff-theme`)
- [ ] Theme init script prevents FOUC (flash of unstyled content)
- [ ] `prefers-color-scheme` media query respected for initial detection

### 6. Typography
- [ ] System font stack applied: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- [ ] Headings use `letter-spacing: -0.02em`
- [ ] `h1` through `h6` all use `--text-primary` color
- [ ] Body text uses `--text-secondary`
- [ ] Line heights: headings 1.2, body 1.6
- [ ] Font smoothing (`-webkit-font-smoothing: antialiased`) active

### 7. Accessibility
- [ ] Skip-to-content link visible on Tab focus
- [ ] All interactive elements have visible focus rings (`outline: 2px solid var(--accent-primary)`)
- [ ] `aria-label` on header, nav, footer regions
- [ ] Images have meaningful `alt` attributes (or `alt=""` for decorative)
- [ ] Buttons have `aria-label` when icon-only
- [ ] `role="banner"`, `role="main"`, `role="contentinfo"` present
- [ ] Cookie consent banner has `role="dialog"` and `aria-label`
- [ ] Back-to-top button has `aria-label="Back to top"`
- [ ] `@media (prefers-reduced-motion: reduce)` disables animations
- [ ] Screen reader only class (`.sr-only`) available and functional

### 8. Interactive Elements
- [ ] `button:active` and `a:active` press feedback (scale 0.96)
- [ ] All links underlined on hover (`.text-link::after` animation)
- [ ] Primary buttons: bg `--accent-primary`, white text, hover → `--accent-hover`
- [ ] Secondary buttons: bg `--surface-2`, border `--border-subtle`
- [ ] Button hover transitions smooth (0.15s ease)

### 9. Toast Notifications
- [ ] Toast container positioned `fixed; top:20px; right:20px; z-index:100001`
- [ ] Toasts slide in from right (`translateX(120%)` → `translateX(0)`)
- [ ] Success (green), error (red), info (emerald), warning (amber) colors correct
- [ ] Toasts auto-dismiss after 4 seconds
- [ ] Multiple toasts stack vertically with 10px gap

### 10. Cookie Consent Banner
- [ ] Banner appears at bottom of screen on first visit
- [ ] "Accept" and "Decline" buttons functional
- [ ] Consent stored in localStorage (`fc-cookie-consent`)
- [ ] Banner does not reappear after consent given
- [ ] Banner respects dark mode styling

### 11. Back-to-Top Button
- [ ] Hidden by default
- [ ] Appears after scrolling 400px
- [ ] Fixed position: bottom 80px, right 24px
- [ ] Smooth scroll to top on click
- [ ] z-index below cookie banner but above content

### 12. Responsive Breakpoints
- [ ] **Desktop (>960px):** Full nav visible, hamburger hidden, 4-col grids
- [ ] **Tablet (768px–960px):** Nav collapses to hamburger, grids reduce columns
- [ ] **Mobile (<768px):** Single column layouts, reduced padding
- [ ] **Small Mobile (<480px):** Further padding/font adjustments

### 13. Performance Visual Indicators
- [ ] No layout shift on page load (CLS)
- [ ] Images use `loading="lazy"` where below-fold
- [ ] Skeleton states appear while tools load
- [ ] No visible flash of unstyled content

---

## Category A: Homepage (`/`)

**File:** `src/pages/index.astro`

### Hero Section
- [ ] Hero padding: 100px top on desktop, 72px on mobile
- [ ] H1 font size: `clamp(1.8rem, 5vw, 3rem)`, correct line-height 1.15
- [ ] H1 max-width 640px, centered
- [ ] Description text: 1rem, `--text-secondary`, max-width 480px
- [ ] "Browse All Tools" button: accent bg, white text, rounded
- [ ] Hero is center-aligned text

### Tools Grid Section
- [ ] Section title "What people actually use" at 1.1rem, 600 weight
- [ ] 4-column grid on desktop, 2 on tablet, 1 on mobile
- [ ] 8 tool cards render with correct icons (SVG), titles, descriptions
- [ ] Cards have `--surface-2` bg, `--border-subtle` border, `--radius-md`
- [ ] Card hover: border changes to `--border-strong`
- [ ] Card icons: 36×36px, `--accent-soft` bg, `--accent-primary` color
- [ ] "See all 30+ tools →" link centered below grid

### FAQ Section
- [ ] "Common questions" title rendered
- [ ] 5 FAQ items in a column layout, max-width 640px
- [ ] Summary text: 0.9rem, 500 weight, `--text-primary`
- [ ] `+` / `−` indicator toggles on open/close
- [ ] Answer text: 0.85rem, `--text-secondary`, padded 16px
- [ ] FAQ items have `--surface-2` background

### Guides Section
- [ ] "Read the guides" title rendered
- [ ] 2-column grid (1 on mobile)
- [ ] 4 guide cards with correct titles and descriptions
- [ ] Card styling matches tool cards

---

## Category B: Tools Dashboard (`/tools`)

**File:** `src/pages/tools.astro`

### Page Header
- [ ] "All Tools" heading at `clamp(1.5rem, 4vw, 2.2rem)`
- [ ] Subtitle "Browse 30+ free tools..." in secondary color

### Featured Section
- [ ] Featured card renders with "Featured" tag (accent-soft bg)
- [ ] Embedded `CompressTool` component loads and functions
- [ ] Card has `--surface-2` background, correct border-radius

### Search & Filters
- [ ] Search input with magnifying glass icon
- [ ] Input has correct padding-left for icon
- [ ] Focus state: border changes to `--accent-primary`
- [ ] Filter tabs: All, Image, PDF, Utilities
- [ ] Active tab: inverted (bg: text-primary, color: surface-1)
- [ ] Tab `aria-selected` toggles correctly

### Tool Sections
- [ ] Three categories render: Image Tools (16), Document & PDF Tools (8), Utilities & Calculators (6)
- [ ] Each section has title + description with border-bottom separator
- [ ] Tool cards in 3-column grid (2 on tablet, 1 on mobile)
- [ ] Cards show title + description only (no icons on this page)
- [ ] No-results state shows "No tools found" message

### Activity/Recents
- [ ] "Recent" section hidden when no recents in localStorage
- [ ] Recent tools appear in `recent-grid` after visiting tools
- [ ] "Clear" button removes recents from localStorage
- [ ] Recent section hidden during search/filter

---

## Category C: Image Tool Pages (17 pages)

All image tools share the `ToolWrapper` layout pattern.

### Common ToolWrapper Layout
- [ ] Page padding: 48px top, 80px bottom (32px/60px on mobile)
- [ ] Container max-width: 900px
- [ ] Header centered, h1 at `clamp(1.5rem, 4vw, 2.2rem)`, subtitle at 0.95rem
- [ ] Tool card: `--surface-3` bg, `--card-border` border, `--radius-lg`, 32px padding (20px on mobile)
- [ ] Tool active area: min-height 280px
- [ ] Secondary section at 0.9 opacity (→ 1 on hover)
- [ ] Info section: h2 at 1.4rem, h3 at 1.1rem, body text 0.95rem/1.7
- [ ] Related Tools section: border-top separator, 60px margin-top, 40px padding-top
- [ ] FAQ items in tool-info slot styled consistently

### C1. Compress Image (`/compress-image`)
**File:** `src/pages/compress-image.astro`

- [ ] Breadcrumb: Home → Image Compressor
- [ ] `CompressTool` component renders inside `tool-ui` slot
- [ ] Tool title: "Online Image Compressor"
- [ ] Subtitle: "Compress photos to exactly 20KB, 50KB, or 100KB..."
- [ ] Tool info section with "The Professional Image Compressor Online" heading
- [ ] FAQ grid with 2 items (inline in tool-info)
- [ ] `active="compress"` on BaseLayout (header nav highlight)

### C2. Compress to 20KB (`/compress-image-to-20kb`)
**File:** `src/pages/compress-image-to-20kb.astro`

- [ ] Same ToolWrapper pattern as compress-image
- [ ] Title/subtitle specific to 20KB targeting
- [ ] `active="compress"` on header

### C3. Compress to 50KB (`/compress-image-to-50kb`)
**File:** `src/pages/compress-image-to-50kb.astro`

- [ ] Same pattern, 50KB-specific messaging
- [ ] `active="compress"` on header

### C4. Passport Size Photo (`/passport-size-photo`)
**File:** `src/pages/passport-size-photo.astro`

- [ ] Tool title: "Official Form Maker"
- [ ] Two choice cards render (Passport Photo + Digital Signature)
- [ ] Choice cards: 2-column grid (1 on mobile), 64×64 icon circles
- [ ] Hover effect: icon bg changes to accent-primary, card lifts 4px
- [ ] File input accepts image, triggers workspace panel
- [ ] Canvas editor renders with crop overlay
- [ ] Sidebar controls: Background toggle (Native/Pure White), Brightness slider, Zoom slider
- [ ] Download button: "Download Photo (JPG)"
- [ ] Signature mode: Threshold slider, Color correction (Auto/Black/Blue)
- [ ] Checkerboard background pattern on canvas
- [ ] Drag hint pill text visible below canvas
- [ ] FAQ grid with 3 items

### C5. Passport Photo Compressor (`/passport-photo-compressor`)
**File:** `src/pages/passport-photo-compressor.astro`

- [ ] Same ToolWrapper pattern
- [ ] CompressTool component embedded
- [ ] Passport-specific messaging

### C6. Official Passport Photo Maker (`/official-passport-photo-maker`)
**File:** `src/pages/official-passport-photo-maker.astro`

- [ ] ToolWrapper pattern
- [ ] Country selection or dimension presets visible
- [ ] Canvas editor with international dimensions

### C7. Signature Maker (`/signature-maker`)
**File:** `src/pages/signature-maker.astro`

- [ ] ToolWrapper with drawing canvas
- [ ] Font selection options visible
- [ ] Export options (PNG transparent)
- [ ] `active="signature"` on header

### C8. Background Remover (`/background-remover`)
**File:** `src/pages/background-remover.astro`

- [ ] Upload stage: centered box with dashed border, 32px border-radius
- [ ] Upload icon (🎨) renders at 3.5rem
- [ ] "Upload Photo" primary button
- [ ] Editor stage: 2-column grid (canvas + controls sidebar)
- [ ] Canvas with checkerboard pattern behind transparent areas
- [ ] Crosshair cursor on canvas
- [ ] Controls: White/Black preset buttons, Tolerance slider, Edge Softness slider
- [ ] Status pills show current values
- [ ] Download button: "Download Transparent PNG"
- [ ] "Start New" secondary button
- [ ] Privacy note at bottom

### C9. Crop Image (`/crop-image`)
**File:** `src/pages/crop-image.astro`

- [ ] ToolWrapper with canvas crop editor
- [ ] Aspect ratio presets (Free, 1:1, 4:3, 16:9, etc.)
- [ ] Crop handles visible and draggable

### C10. Resize Image (`/resize-image`)
**File:** `src/pages/resize-image.astro`

- [ ] Width/height inputs with lock aspect ratio toggle
- [ ] Unit selector (px, %, cm)
- [ ] Preview updates on change

### C11. Resize for Platform (`/resize-image-for-[platform]`)
**File:** `src/pages/resize-image-for-[platform].astro`

- [ ] Dynamic route renders with platform-specific presets
- [ ] Platform selector (Instagram, Twitter, LinkedIn, etc.)
- [ ] Pre-filled dimensions for selected platform

### C12. Circle Crop (`/circle-crop`)
**File:** `src/pages/circle-crop.astro`

- [ ] Circular crop preview visible
- [ ] Canvas renders with circular mask
- [ ] Download as PNG with transparency

### C13. Black and White (`/black-and-white`)
**File:** `src/pages/black-and-white.astro`

- [ ] Grayscale filter applied to preview
- [ ] Intensity/contrast slider if present
- [ ] Before/after comparison

### C14. Photo to Sketch (`/photo-to-sketch`)
**File:** `src/pages/photo-to-sketch.astro`

- [ ] Pencil sketch effect applied to preview
- [ ] Style options if present
- [ ] Canvas renders sketch output

### C15. Blur Image (`/blur-image`)
**File:** `src/pages/blur-image.astro`

- [ ] Blur tool with brush/area selection
- [ ] Blur intensity slider
- [ ] Preview shows blurred regions

### C16. Watermark Image (`/watermark-image`)
**File:** `src/pages/watermark-image.astro`

- [ ] Text input for watermark content
- [ ] Position selector (corner, center, tiled)
- [ ] Opacity slider
- [ ] Preview shows watermark overlay

### C17. Convert Image (`/convert-image`)
**File:** `src/pages/convert-image.astro`

- [ ] Format selector (JPG, PNG, WebP)
- [ ] Upload zone with format-specific messaging
- [ ] Download button shows target format

---

## Category D: PDF Tool Pages (5 pages)

### Common PDF Tool Pattern
- [ ] Uses ToolWrapper layout
- [ ] PDF-specific upload zones (accept `application/pdf`)
- [ ] File list with remove buttons
- [ ] Privacy messaging about local processing

### D1. Merge PDF (`/merge-pdf`)
**File:** `src/pages/merge-pdf.astro`

- [ ] Upload stage: dashed border zone with 📄 icon
- [ ] "Add PDF Files" title + subtitle
- [ ] "Select PDF Bundle" primary button
- [ ] Editor stage: 2-column layout (file workspace + sidebar)
- [ ] File rows: filename (truncated with ellipsis), file size, ❌ remove button
- [ ] "Combine Sequence" header with file count pill
- [ ] "Add More Documents" button
- [ ] Sidebar: Merge Configuration label, "Merge to One PDF" button
- [ ] "Start New" secondary button
- [ ] Privacy note: "🔒 Zero-upload security"
- [ ] Post-merge: confetti + share popup (X, WhatsApp)
- [ ] `active="tools"` on header

### D2. Split PDF (`/split-pdf`)
**File:** `src/pages/split-pdf.astro`

- [ ] PDF upload zone
- [ ] Page range selector or visual page thumbnails
- [ ] Split/extract action button

### D3. Rotate PDF (`/rotate-pdf`)
**File:** `src/pages/rotate-pdf.astro`

- [ ] PDF upload zone
- [ ] Rotation controls (90° CW, 90° CCW)
- [ ] Preview of rotated pages
- [ ] Download rotated PDF

### D4. Image to PDF (`/image-to-pdf`)
**File:** `src/pages/image-to-pdf.astro`

- [ ] Multi-image upload zone
- [ ] Image preview grid/thumbnails
- [ ] Reorder capability
- [ ] "Create PDF" action button

### D5. PDF to Image (`/pdf-to-image`)
**File:** `src/pages/pdf-to-image.astro`

- [ ] PDF upload zone
- [ ] Page selection or "all pages" option
- [ ] Output format selector (JPG/PNG)
- [ ] Download individual or ZIP of all pages

---

## Category E: Utility Tool Pages (8 pages)

### E1. QR Code Generator (`/qr-code-generator`)
**File:** `src/pages/qr-code-generator.astro`

- [ ] External QR library loads (`qr-code-styling@1.5.0` from unpkg)
- [ ] Designer grid: 2-column (settings sidebar 320px + preview)
- [ ] Settings sidebar: 4 sections with numbered labels (1–4)
- [ ] Input field for URL/text data
- [ ] 4 preset chips render (Midnight, Royal, Neon, Candy)
- [ ] Preset chips: colored dot + name, hover border accent
- [ ] Pattern style toggle: Square/Dots/Rounded pills
- [ ] Active pill: inverted styling (bg: surface-3, shadow)
- [ ] Logo upload zone with ✨ icon
- [ ] Logo preview: 64×64 circle with accent border
- [ ] Logo scale slider (10–80%) with percentage display
- [ ] Logo halo checkbox
- [ ] Preview frame: centered, min-height 400px, "Live QR Render" badge
- [ ] Download button: "Download High-Res"
- [ ] Privacy note: "Production-ready SVG & PNG output"
- [ ] FAQ section with 6 items
- [ ] Responsive: single column on mobile (<900px)
- [ ] Hidden inputs for legacy API compatibility

### E2. Password Generator (`/password-generator`)
**File:** `src/pages/password-generator.astro`

- [ ] Length slider with numeric display
- [ ] Character type toggles (uppercase, lowercase, numbers, symbols)
- [ ] Generated password display
- [ ] Copy-to-clipboard button
- [ ] Strength indicator bar

### E3. Image to Text / OCR (`/image-to-text`)
**File:** `src/pages/image-to-text.astro`

- [ ] Image upload zone
- [ ] Language selection if present
- [ ] OCR processing indicator
- [ ] Text output area
- [ ] Copy text button

### E4. Resume Builder (`/resume-builder`)
**File:** `src/pages/resume-builder.astro`

- [ ] 4-step stage indicator (Templates → Fill → Customize → Download)
- [ ] Active steps show accent color with white number circle
- [ ] Sticky toolbar with tab navigation (Editor, Templates, Customize, ATS)
- [ ] Toolbar actions: Undo, Redo, Duplicate, Export JSON, Import JSON, Download PDF
- [ ] Workspace: 2-column (editor panel + preview area)
- [ ] Editor panel: collapsible sections with drag-to-reorder
- [ ] Section headers: icon + label, collapse/toggle/delete actions
- [ ] Form fields: 2-column rows, correct input types
- [ ] Entry cards: accent left border, duplicate/delete controls
- [ ] Templates panel: 2×N grid of template cards with mini-previews
- [ ] Active template: accent border + shadow ring
- [ ] Customize panel: 2-column control grid (color, font, size, spacing)
- [ ] ATS panel: score ring (circular progress), bar charts, suggestions
- [ ] Preview area: sticky, A4 paper representation (210mm × 297mm)
- [ ] Paper has box-shadow, white background
- [ ] Resume renders with correct typography, sections, layout
- [ ] Dark preview mode toggle works
- [ ] Word count and page count display
- [ ] Responsive: single column on <1080px, paper min-width 680px on mobile
- [ ] FAQ section with 3 items

### E5. Text to Handwriting (`/text-to-handwriting`)
**File:** `src/pages/text-to-handwriting.astro`

- [ ] Text input area (textarea)
- [ ] Font/handwriting style selector
- [ ] Paper background options
- [ ] Preview renders handwritten text
- [ ] Download as image

### E6. File Size Converter (`/file-size-converter`)
**File:** `src/pages/file-size-converter.astro`

- [ ] Input field for numeric value
- [ ] From/To unit selectors (Bytes, KB, MB, GB, TB)
- [ ] Swap button between units
- [ ] Real-time result display

### E7. Age Calculator (`/age-calculator`)
**File:** `src/pages/age-calculator.astro`

- [ ] Date grid: 2 columns (Date of Birth + Calculate Age At)
- [ ] Date inputs styled with `modern-input` class
- [ ] Auto-populated with today's date and 20 years ago
- [ ] Result box: rounded corners (32px), shadow
- [ ] "LIVE CALCULATION" status pill
- [ ] "Your Exact Age" heading
- [ ] 3-column age stats grid (Years, Months, Days)
- [ ] Age numbers: 3.5rem, accent color, bold
- [ ] Age labels: uppercase, 0.85rem, muted
- [ ] Privacy note: "🔒 Your private dates never leave this browser"
- [ ] Responsive: single column on mobile (<640px)
- [ ] FAQ grid with 2 items

### E8. Percentage Calculator (`/percentage-calculator`)
**File:** `src/pages/percentage-calculator.astro`

- [ ] Multiple calculation modes (X% of Y, what % of Y is X, etc.)
- [ ] Input fields with labels
- [ ] Real-time calculation result
- [ ] Clean card layout

---

## Category F: Informational Pages (7 pages)

### F1. About (`/about`)
**File:** `src/pages/about.astro`

- [ ] Page padding: 32px top, 80px bottom
- [ ] Inner container max-width: 760px
- [ ] Page header with h1 + subtitle
- [ ] Content sections: h2 at 1.2rem, body at 0.95rem/1.7
- [ ] Values list: no bullets, vertical stack with gap
- [ ] Values: strong (title) + span (description) per item
- [ ] CTA box: `--surface-2` bg, rounded (lg), centered
- [ ] "Explore All Tools" button: accent bg, white text
- [ ] Active nav state: none (no `active` prop passed)

### F2. Contact (`/contact`)
**File:** `src/pages/contact.astro`

- [ ] Page header with h1 + subtitle
- [ ] Contact grid: 2 columns (1 on mobile)
- [ ] Contact cards: centered, icon circle (48×48), title, description, link
- [ ] Icon circles: accent-soft bg, accent-primary color
- [ ] FAQ section: 3 items with h3 headings (not `<details>`)
- [ ] FAQ items: margin-bottom 20px, not collapsible (static)

### F3. Privacy (`/privacy`)
**File:** `src/pages/privacy.astro`

- [ ] H1 "Privacy Policy" with effective date below
- [ ] 6 sections with h2 headings
- [ ] Section spacing: 36px margin-bottom
- [ ] Body text: 0.95rem/1.7, secondary color
- [ ] Strong text uses primary color
- [ ] Links: accent color, underline on hover

### F4. Terms (`/terms`)
**File:** `src/pages/terms.astro`

- [ ] Same layout pattern as privacy
- [ ] Terms content renders correctly
- [ ] Links functional

### F5. Security (`/security`)
**File:** `src/pages/security.astro`

- [ ] Same layout pattern as privacy
- [ ] Security policy content renders

### F6. 404 (`/404`)
**File:** `src/pages/404.astro`

- [ ] Centered layout, min-height 70vh
- [ ] "404" at `clamp(3rem, 10vw, 5rem)`
- [ ] Random joke text displayed
- [ ] Search bar: max-width 380px, dashed border
- [ ] Search input: transparent bg, accent button
- [ ] "Popular Tools" label: 0.7rem, uppercase, letter-spacing
- [ ] Popular grid: 3 columns (2 on mobile)
- [ ] 6 popular tool cards (Compress, Passport, Merge, Signature, QR, Resume)
- [ ] "Go Home" + "Go Back" buttons centered
- [ ] `noindex` meta tag present

---

## Category G: Blog Pages (2 pages)

### G1. Blog Index (`/blog`)
**File:** `src/pages/blog/index.astro`

- [ ] Wrapper max-width: 900px, padding: 64px 20px 100px
- [ ] "📚 Blog" brand badge: rounded pill, surface-3 bg
- [ ] H1 "FormFix Blog" at `clamp(2.5rem, 5vw, 3.5rem)`
- [ ] Hero subtitle: 1.15rem, max-width 600px, centered
- [ ] Blog grid: single column, 24px gap
- [ ] Blog cards: surface-3 bg, 32px padding, 16px border-radius
- [ ] Card hover: `translateY(-3px)` + shadow lift
- [ ] Badge pill: accent-soft bg, accent-primary text, uppercase
- [ ] Card title: 1.4rem, 600 weight, tight line-height
- [ ] Card description: 0.95rem, secondary color
- [ ] Meta row: date + read time, 0.8rem, muted

### G2. Blog Post (`/blog/[slug]`)
**File:** `src/pages/blog/[slug].astro`

- [ ] Article layout with prose styling
- [ ] Title, date, read time displayed
- [ ] Content renders with correct typography
- [ ] Internal links to tools work
- [ ] ShareBar renders at bottom

---

## Category H: Guide Pages (7 pages)

### Common Guide Pattern
**All guides share this layout:**

- [ ] Page header: padding 80px 0 40px, `--bg-subtle` background, centered text
- [ ] H1 renders at `clamp(1.5rem, 4vw, 2.2rem)`
- [ ] Subtitle: secondary color
- [ ] Content section: padding 60px 0
- [ ] Container narrow: max-width 800px
- [ ] Prose styling: line-height 1.8, secondary color
- [ ] H2 in prose: primary color, margin-top 2rem
- [ ] Ordered/unordered lists: 1.5rem margin-bottom, 1.5rem padding-left
- [ ] CTA box: `--primary-light` bg, 32px padding, 16px radius
- [ ] CTA button: primary-btn class
- [ ] ShareBar renders at bottom

### H1. How to Compress to 20KB (`/guides/how-to-compress-image-to-20kb`)
**File:** `src/pages/guides/how-to-compress-image-to-20kb.astro`

- [ ] HowTo schema markup present
- [ ] 5 numbered steps in ordered list
- [ ] Internal links to `/compress-image` and `/passport-size-photo`
- [ ] CTA: "Compress Your Photo Now" → `/compress-image`

### H2. How to Compress to 50KB (`/guides/how-to-compress-image-to-50kb`)
**File:** `src/pages/guides/how-to-compress-image-to-50kb.astro`

- [ ] Same layout pattern
- [ ] 50KB-specific content

### H3. Passport Photo Specifications (`/guides/passport-photo-specifications`)
**File:** `src/pages/guides/passport-photo-specifications.astro`

- [ ] Same layout pattern
- [ ] Dimension tables/lists render correctly

### H4. Making Signature Transparent (`/guides/make-signature-transparent`)
**File:** `src/pages/guides/make-signature-transparent.astro`

- [ ] Same layout pattern
- [ ] Links to background-remover tool

### H5. Making Branded QR Codes (`/guides/generating-branded-qr-codes`)
**File:** `src/pages/guides/generating-branded-qr-codes.astro`

- [ ] Same layout pattern
- [ ] Links to qr-code-generator tool

### H6. OCR Benefits On Device (`/guides/ocr-benefits-on-device`)
**File:** `src/pages/guides/ocr-benefits-on-device.astro`

- [ ] Same layout pattern
- [ ] Links to image-to-text tool

### H7. Secure PDF Merging Offline (`/guides/secure-pdf-merging-offline`)
**File:** `src/pages/guides/secure-pdf-merging-offline.astro`

- [ ] Same layout pattern
- [ ] Links to merge-pdf tool

---

## Component-Specific Audit

### CompressTool (`src/components/tools/CompressTool.astro`)
- [ ] Upload zone renders with drag-and-drop support
- [ ] Target size presets (20KB, 50KB, 100KB) visible
- [ ] Custom size input available
- [ ] Compress/optimization button functional
- [ ] Progress indicator during compression
- [ ] Result card shows before/after file sizes
- [ ] Download button for compressed image
- [ ] Quality slider or auto-calibration display

### UploadBox (`src/components/UploadBox.astro`)
- [ ] Dashed border styling
- [ ] Drag-over state (border color change, background tint)
- [ ] Click to upload opens file picker
- [ ] File type restriction enforced
- [ ] Upload icon/illustration visible

### ResultCard (`src/components/ResultCard.astro`)
- [ ] Shows download link/button
- [ ] File size information displayed
- [ ] Preview thumbnail if applicable
- [ ] Styled with `--surface-2` background

### RelatedTools (`src/components/RelatedTools.astro`)
- [ ] Section title "Try Other Free Tools"
- [ ] "View All 30+ Tools →" link
- [ ] Grid: auto-fit, minmax(260px, 1fr)
- [ ] 6 related tool cards render
- [ ] Cards: icon circle + title + description + arrow
- [ ] Arrow appears on hover (opacity 0 → 1)
- [ ] Responsive: 2-col on mobile, 1-col on small mobile
- [ ] Description hidden on mobile

### ShareBar (`src/components/ShareBar.astro`)
- [ ] "Share this guide" label centered
- [ ] 4 share buttons: X (black), WhatsApp (green), LinkedIn (blue), Reddit (orange)
- [ ] Buttons: 38×38px, rounded (8px), centered text
- [ ] All links open in new tab with correct share URLs
- [ ] Border-top and border-bottom separators

### Skeleton (`src/components/Skeleton.astro`)
- [ ] Skeleton animation (shimmer/pulse) visible
- [ ] Correct dimensions matching content being loaded

---

## Cross-Cutting Concerns

### SEO Meta Tags (Verify on every page)
- [ ] `<title>` tag includes page name + "FormFix"
- [ ] `<meta name="description">` present and ≤160 chars
- [ ] `<meta name="keywords">` present
- [ ] `<link rel="canonical">` points to correct URL
- [ ] Open Graph tags: og:title, og:description, og:image, og:url, og:type
- [ ] Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
- [ ] JSON-LD structured data present and valid
- [ ] `<meta name="robots">` correct (noindex on 404)
- [ ] Hreflang tags present

### Performance
- [ ] No render-blocking resources visible
- [ ] Fonts loaded via Google Fonts with preconnect
- [ ] Analytics scripts (Clarity, Plausible) load async/defer
- [ ] Service worker registered on page load
- [ ] Images use appropriate `loading` attribute
- [ ] No large CLS (cumulative layout shift) visible

### Security Headers (Cloudflare Pages)
- [ ] CSP header present
- [ ] HSTS header present
- [ ] X-Frame-Options set
- [ ] Referrer-Policy set
- [ ] Permissions-Policy set

---

## Audit Execution Order

1. **Phase 1:** Global elements (Header, Footer, Theme, Accessibility) — audit on homepage
2. **Phase 2:** Homepage (`/`) — all sections
3. **Phase 3:** Tools Dashboard (`/tools`) — search, filter, featured
4. **Phase 4:** Image Tools — start with Compress Image (most used), then Passport Photo, then remaining
5. **Phase 5:** PDF Tools — Merge PDF first, then remaining
6. **Phase 6:** Utility Tools — Resume Builder (most complex), QR Code, then remaining
7. **Phase 7:** Informational Pages — About, Contact, Privacy, Terms, Security, 404
8. **Phase 8:** Blog + Guides — all 9 content pages
9. **Phase 9:** Dark mode re-audit of all pages
10. **Phase 10:** Mobile re-audit of all pages

---

## Known Issues to Watch For

1. **Duplicated utility classes:** Many pages redefine `.hidden`, `.d-flex`, `.mb-24`, etc. — check for conflicts
2. **Legacy CSS variables:** `--surface-50`, `--surface-100`, `--text-main` used inconsistently alongside new tokens
3. **Tailwind config dead:** `tailwind.config.mjs` exists but Tailwind is not installed — could confuse contributors
4. **Inline SVG icons:** No icon library used — all icons are raw SVG, check for inconsistent sizing
5. **FAQ styling inconsistency:** Some pages use `summary::before` for +/-, others use `summary::after` — cosmetic but inconsistent
6. **Post-download share popups:** Dynamically injected HTML with inline styles — verify they render correctly in dark mode
7. **Resume Builder complexity:** Largest single component (600+ lines of JS) — verify all panels, drag-drop, and PDF export work
8. **QR Code external dependency:** Loaded from unpkg CDN — verify it loads and fallback behavior
