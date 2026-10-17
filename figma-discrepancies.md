# Figma vs Codebase Discrepancies & Improvements Log

This document tracks identified discrepancies, UX/interaction gaps, and improvement suggestions found during Figma inspection compared to the current code.

---

## 1. Hero Section (`node-id=765-4871`)
- **File:** `src/components/sections/hero.tsx`
- **Status:** **Resolved** (Hover animation + arrow button slide-in implemented)

### Observations & Improvements:
1. **Avatar Circle Radius:**
   - Social proof row avatars (`765:4905-4907`) in `hero.tsx:142` have `overflow-hidden` without `rounded-full`. Added safety check: Ensure `rounded-full` is explicitly set if raw avatar image assets are square.
2. **Text Vertical Alignment:**
   - Figma spec places `"Loved by 500+ Founders"` at `y: 2px` relative to container, code uses `top-0`. Minor 2px offset.
3. **Hero Animation Variant 2:**
   - Featured card (`Property 1=Variant2`) has `rgba(0,0,0,0.2)` black overlay + `rgba(0,171,12,0.1)` brand green tint with `backdrop-blur-[2px]`, and arrow badge (`56x56px`) sliding from `top: -61px` to `top: 27px` on hover. (Implemented).

---

## 2. Featured Work / Bento Grid (`node-id=765-4921`)
- **File:** `src/components/sections/featured-work.tsx`
- **Status:** **Resolved**

### Observations & Improvements:
1. **Section Padding:**
   - Figma uses `padding: 140px 220px` (`py-[140px]`). Code was initially `py-[116px]`. Updated to `py-[100px] lg:py-[140px]`.
2. **Avatar Container Clipping:**
   - Avatar images in the top-left card (`765:4933–4935`) updated with `rounded-full` to guarantee circular masking.

---

## 3. Showreel / Project Showcasing (`node-id=765-4983`)
- **File:** `src/components/sections/showreel.tsx`
- **Status:** **Pending User Decision**

### Observations & Improvements:
1. **Horizontal Scroll / Interaction (`overflowScroll: ["x"]` in Figma):**
   - **Current Code:** The container uses `overflow-hidden`, preventing users from scrolling or dragging to see all 9 project cards.
   - **Improvement:** Change wrapper from `overflow-hidden` to `overflow-x-auto scrollbar-none` or implement a draggable/touch swipe carousel / marquee so users can view the full 5,485px width of project cards.
2. **Left Padding / Alignment:**
   - In Figma, the cards strip starts at `x: 220px` (matching the page container gutter). In code, wrapping in `.page-container` works on wide viewports, but enabling horizontal scrolling with smooth scroll snap (`scroll-snap-type: x mandatory` / `snap-start`) will ensure a polished mobile/desktop browsing experience.
3. **Card Titles & Specs:**
   - All 9 cards in Figma currently reuse the same placeholder text (`"Garage Door Repair Platform"`, `"$600-$800"`). If real project titles/categories are needed later, replace the repeated static specs with per-card data.

---

## 4. Services Section (`node-id=765-6379`)
- **File:** `src/components/sections/services.tsx`
- **Status:** **Resolved**

### Observations, Fixes & Verified Items:
1. **Card 2 Image Right-Side Overflow (Investigated & Fixed):**
   - **Investigation:** In Figma, Card 2's image is positioned at `left: 876px` with `width: 636px` (total = `1512px`). Since the card's width is `1480px`, the image intentionally extends `32px` beyond the right edge in Figma.
   - **Fix Applied:** Previously `<article>` lacked `overflow-hidden`, which risked page horizontal scroll issues. Moved `overflow-hidden rounded-[32px]` directly onto the `<article>`, cleanly clipping the overflowing 32px of the image against the card's rounded corner.
2. **Background Decorative Ambient Glow:**
   - Added subtle top-right ambient glow circle (`360px`, `linear-gradient(180deg, rgba(255, 248, 248, 0.5) 0%, rgba(207, 255, 226, 0.5) 100%) blur-[40px]`) matching Figma `EL-4bc59535`.
3. **Card Linear Gradient Angle:**
   - Standardized gradient to `135deg` (`-45deg`), matching Figma's exact token `linear-gradient(-45deg, #ffffff 0%, #f4f4f4 100%)`.
4. **"Talk to Our Experts" CTA Interaction:**
   - Connected link to `#contact` with hover color change (`hover:text-brand`) and smooth arrow translate motion (`group-hover:translate-x-1 group-hover:-translate-y-1`).
5. **Card 1 & 2 Right-Side Image Standardization (Option A Implemented):**
   - **Discrepancy:** In Figma, Card 1 used `605x464px` (`left: 859`) and Card 2 used `636x427px` (`left: 876`), whereas Cards 3–8 uniformly used `488x488px` (`left: 948, top: 44, r: 12`), causing the right sides of cards 1 & 2 to look noticeably different and misaligned.
   - **Fix Applied:** Standardized Card 1 and Card 2 image dimensions and positions to `{ left: 948, top: 44, w: 488, h: 488, r: 12 }`. Now all 8 service cards have an identical right-side margin, size, and rounded aesthetic.

---

## 5. Testimonial Section (`node-id=765-4986`)
- **File:** `src/components/sections/testimonial.tsx`
- **Status:** **Resolved** (3-column layout restored & exact Figma image assets linked)

### Observations & Discrepancies:
1. **Broken 3-Column Layout Structure:**
   - **Figma Spec:** The section has a single horizontal flex row (`765:4987`, `height: 611px`) containing 3 distinct visual columns:
     1. **Left Col (`440px`):** Eyebrow (`// My Testimonial`), Title (`Clients words`), Lead text (`Throughout creative journey...`).
     2. **Center Col (`388px`):** Main portrait image (`388x480px`, `rounded-[20px]`) + Tablist of 5 customer avatar thumbnails (`68x68px`).
     3. **Right Col (`480px`):** Stars + Verified divider + Quote + Ronald Richards author block.
   - **Current Code Discrepancy:** The code placed the Left Col and Right Col side-by-side in a top row, and dumped the Center Col (main image + thumbnails) into an artificial bottom row (`justify-end`). This completely breaks the Figma 3-column layout!
2. **Incorrect / Non-Existent Image Paths:**
   - **Current Code:** Refers to non-existent filenames like `/figma/765-5076.png`, `/figma/765-5077.png`, `/figma/765-6462.png`, and `/figma/765-6454.png` to `6458.png`.
   - **Figma Reality:** The actual images in `public/figma/` matching the node IDs are:
     - Main photo: `/figma/765-4995.png` (`388x480px`)
     - 5 Thumbnails: `/figma/765-4998.png`, `765-5000.png`, `765-5002.png`, `765-5004.png`, `765-5006.png` (`68x68px`)
     - Rating Stars: `/figma/765-5010.png` (`68x28px`)
     - Verified Clutch Badge: `/figma/765-5012.png` (`116x20px`)
3. **Tablist Thumbnails Styling & Active State:**
   - Thumbnail 1 (`765:4997`) is the active tab with `borderRadius: 78px` (pill/circular).
   - Thumbnails 2–5 (`765:4999-5005`) are inactive tabs with `borderRadius: 12px`.
   - Gap between tabs in Figma is `12px` (`x: 0, 80, 160, 240, 320`).
4. **Padding & Alignment:**
   - Figma uses `padding: 140px 220px` with background `#F6F8F6`. Code should use `.page-container` and `py-[140px]`.
5. **Vertical Top Alignment (`items-start`):**
   - The 3 columns (Left text, Center portrait, Right quote) are aligned to the top (`lg:items-start`), ensuring the headline and ratings start from the exact top baseline of the central portrait photo.

---

## 6. Creative Work Section (`node-id=765-5019`)
- **File:** `src/components/sections/creative-work.tsx`
- **Status:** **Resolved** (Global tokens, page-container, and interactive hover effects applied)

### Observations & Discrepancies:
1. **Layout & Dimensions:**
   - **Figma:** Section padding `140px 220px`, width `1480px`, gap between rows `59px`, gap between cards in each row `59px` (`806.6 + 59 + 614.2 = 1479.8 ≈ 1480px`).
   - **Code:** Uses `gap-[59px]` and `w-[807px]` + `w-[614px]`. Matches Figma layout perfectly.
2. **Card Image Aspect Ratio & Dimensions:**
   - Big Card: `806.6px × 538.97px` (Code: `h-[539px] w-[807px]`).
   - Small Card: `614.2px × 538.97px` (Code: `h-[539px] w-[614px]`).
   - Border radius: `24.67px` (Code: `rounded-[24.67px]`). **Exact Match**.
3. **Card Metadata Alignment & Typography:**
   - Title: `Quantumix`, `NeuraCore`, `Orbitek`, `Noventra` (`24.67px / 29.6px`, Bold, `-0.04em`, `#242424`).
   - Tags: `17.27px / 25.9px`, Regular, `-0.01em`, `#242424`, separated by circular dot (`2.5px`).
   - Year: `2025` positioned right-aligned at `top: 1px`, `17.27px / 25.9px`, Medium (`fontWeight: 500`).
   - In code, `#232323` is used instead of `#242424` (or `text-ink-2`). Standardizing to `text-ink-2` preserves theme tokens.
4. **Section Outer Container:**
   - Current code uses hardcoded `px-10` on `<section>`. Standardizing to `.page-container` and `.content-1480` ensures seamless responsive alignment with the rest of the site.
5. **Card Hover Effect (Enhancement):**
   - Adding a subtle zoom (`group-hover:scale-105 transition-transform duration-500`) to the project cards creates a premium interactive feel matching other showcase cards.

---

## 7. Our Process Section (`node-id=765-5061`)
- **File:** `src/components/sections/our-process.tsx`
- **Status:** **Resolved** (Interactive step state, clickable cards/nodes, responsive wrapper applied)

### Observations, Improvements & Fixes Applied:
1. **Interactive Step Selection (`useState(0)`):**
   - Implemented dynamic active step state (`activeIdx`). Users can now click any of the 5 Step Cards, Circular Nodes, or Bottom Indicator Pills.
   - Selecting a step dynamically updates:
     - Card border shadow highlight (`#00AB0C` green glow).
     - Circular node gradient and drop shadow.
     - Bottom detail banner with corresponding step number, title, description, and icon.
     - Indicator pill width expansion (`w-[32px] bg-[#00AB0C]`).
2. **Smooth Hover & Micro-Animations:**
   - Added hover scale transition on step cards (`hover:scale-[1.02]`) and circular nodes (`hover:scale-110`).
   - Added smooth color transitions on connector lines and status indicators.
3. **Responsive Mobile/Tablet Support:**
   - Wrapped the 1480px stage inside `.page-container overflow-x-auto`, ensuring mobile and tablet users can smoothly pan/scroll through the full 5-step wave diagram without breaking the page layout.

---
## 8. Industries We Serve Section (`node-id=765-5191`)
- **File:** `src/components/sections/industries-we-serve.tsx`
- **Status:** **Resolved** (Dual-tone headline and CTA button label aligned with Figma)

### Observations, Discrepancies & Fixes Applied:
1. **Headline Dual-Tone Color (`765:5196`):**
   - **Figma:** `"Built for the World's "` is dark `#242424` (`text-ink-2`), followed by `"Most Demanding Industries"` in light gray `#A4A7AE`.
   - **Code Before:** Entire headline was solid `#242424`.
   - **Fix:** Added `<span className="text-[#A4A7AE]">Most Demanding Industries</span>` to mirror Figma.
2. **Bottom Banner CTA Button Text (`765:5339;271:1279`):**
   - **Figma:** Button text is `"Talk to Our Experts"`.
   - **Code Before:** `<CtaButton>Become a Client</CtaButton>`.
   - **Fix:** Updated button label to `"Talk to Our Experts"`.
3. **Card Grid & Geometry:**
   - Cards are `232px` tall, `rounded-[24px]`, with `border-[#E3E8E3]` and shadow matching Figma.
   - Icon box: `59x59px`, `rounded-[16px]`, bg `#F1F3F7` with smooth hover states.
   - 3 rows × 4 columns layout matches Figma node hierarchy.

---

## 10. Let’s Work Together Section (`node-id=765-6647`)
- **File:** `src/components/sections/lets-work-together.tsx`
- **Status:** **Implemented & Verified** (Pixel-perfect Figma structure, gradient card fills, badge indicators, and zero overflow)

### Observations, Dimensions & Implementation Details:
1. **Section Eyebrow & Typography:**
   - Eyebrow: `// LET’S WORK TOGETHER` (`fontSize: 14px`, `lineHeight: 20px`, `letterSpacing: 0.08em`, font-semibold, uppercase).
   - Headline: `Complete Digital Solutions / From Idea to Launch` (`fontSize: 56px`, `lineHeight: 64px`, `letterSpacing: -0.02em`, font-bold, `#1B1B1B`).
   - Lead Paragraph: `max-w: 792px`, `fontSize: 18px`, `lineHeight: 30px`, `#5C635E`.
2. **CTA Button Component:**
   - Outlined brand pill with right green arrow badge (`Become a Client`).
3. **Stat Cards (4 Columns Bento Row):**
   - Cards: `300px` height, `rounded-[24px]`, with `border-t border-l border-[rgba(23,23,23,0.08)]`.
   - Card Fill: Exact Figma linear gradient `linear-gradient(180deg, rgba(187, 242, 191, 0) 0%, rgba(255, 255, 255, 1) 71%)`.
   - Top-right badge indicator pill: `16px × 15px`, `rounded-[16px]`, `border-[3px] border-[#00AB0C]`, bg `#F5F5F5`.
   - Stats metrics:
     - `+76` Projects Completed
     - `+80` Real Clients here
     - `+22` Winning Awards
     - `+12` Years of experience
   - Green `+` sign: `fontSize: 64px`, `lineHeight: 72px`, `#00AB0C`. Numbers: `#171717`.
---

## 11. Footer Section (`node-id=765-6160` / `765-6162`)
- **File:** `src/components/sections/footer.tsx`
- **Status:** **Implemented & Verified** (Pixel-perfect dark footer with ambient green radial glow, frosted glass bars, floating rotating pills, and giant brand wordmark)

### Observations, Dimensions & Implementation Details:
1. **Background & Atmosphere (`765:6160`, `765:6162`):**
   - Height: `780px`, rounded top corners `rounded-t-[30px]`.
   - Dark theme styling with emerald ambient radial glow matching Figma's layered glow.
2. **Top Row (Social Links & Contact Info):**
   - 3 circular glass social buttons (`52×52px`, `rounded-full`, border `white/16`, bg `white/0.08`, backdrop-blur) with exact Figma vector icons:
     - Facebook (`/figma/765-6163.svg`)
     - LinkedIn (`/figma/765-6167.svg`)
     - Dribbble (`/figma/765-6173.svg`)
   - Contact info columns with subtle `white/70` label and bold `white` value:
     - Email: `Softvence@gmail.com`
     - Phone: `+8801731317107`
     - Location: `Ambon. Complex`
3. **Middle Glassmorphic Bar (`765:6183`):**
   - `height: 98px`, `rounded-[20px]`, `border border-white/16 bg-white/[0.08] backdrop-blur-[30px]`.
   - Smooth `Back to top` scroll button with upward arrow (`/figma/765-6186.svg`).
   - Copyright notice with green underlined credits (`uxshakil`, `License`, `softvence`).
4. **Giant SOFTVENCE Wordmark & Dynamic Floating Pills:**
   - Giant bottom wordmark: `fontSize: clamp(80px, 14.5vw, 242px)` with gradient fill `linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(139, 139, 139, 0.35) 69%)`.
   - 6 dynamic floating glass service pills (`UI/UX Design`, `AI Development`, `Instagram`, `Facebook`, `Facebook`, `Twitter`) with custom interactive rotations, hover scales, and glass blur matching Figma layout.

