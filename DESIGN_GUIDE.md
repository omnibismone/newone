# Design Identity Guide: ELECTRONIC_BRUTALISM

This document outlines the visual language and design principles for the personal portfolio. The aesthetic is defined as **Electronic Brutalism**—a fusion of raw, massive structural elements with high-energy neon radiance.

---

## 1. Core Visual Concept
- **Mood:** High-tech, experimental, authoritative, and energetic.
- **Principles:**
  - **High Contrast:** Pitch black backgrounds against blinding neon accents.
  - **Massive Typography:** Headers should feel "architectural" in scale.
  - **Interactive Glow:** Every interaction should feel like it's powering on a machine.
  - **Data Rawness:** Use monospaced fonts and system logs to ground the scifi elements in reality.

---

## 2. Color Palette

### Primary (Electric Pink)
- **Hex:** `#ff0099`
- **Usage:** Call-to-action buttons, key headings, primary accents.
- **Vibe:** Pulse, energy, standout.

### Secondary (Neon Orange)
- **Hex:** `#f97316`
- **Usage:** Interactive handles, sub-headers, "MACHINE" text.
- **Vibe:** Stability, heat, industrial.

### Background (Deep Void)
- **Hex:** `#050505`
- **Usage:** Global background, card containers.
- **Vibe:** Infinite depth, focus.

### Accent (Cyan/Data)
- **Hex:** `#22d3ee`
- **Usage:** Status lights, jackpot details, links.

---

## 3. Typography

### Display (Headings)
- **Primary:** `Inter` (Sans-serif)
- **Style:** Bold / Black
- **Attributes:** `tracking-tighter`, `uppercase`, `leading-[0.8]`
- **Usage:** Main section headers, large impact text.

### Body (Description)
- **Primary:** `Inter`
- **Style:** Regular / Medium
- **Attributes:** `text-white/80`, `tracking-wide`
- **Usage:** Project descriptions, experience bullets.

### Mono (Technical)
- **Primary:** `JetBrains Mono` or `Fira Code`
- **Attributes:** `uppercase`, `tracking-[0.5em]`, `text-[10px]`
- **Usage:** System logs, boot sequences, date ranges, tags.

---

## 4. UI Elements & Layout

### Borders & Frames
- **Width:** `2px` to `4px`.
- **Style:** Solid, often with a `backdrop-blur` for semi-transparent layers.
- **Neon Glow:** Use `shadow-[0_0_20px_rgba(color)]` to simulate light emission.

### Buttons & CTAs
- **Shape:** Circular or sharp rectangles.
- **Interaction:** Hover effects should include a `scale-110` or a rotating ring (compass style) around the element.
- **Ease:** Use custom cubic-bezier: `[0.25, 1, 0.5, 1]` for "snappy" yet smooth transitions.

### Grid
- **Structure:** Modular 12-column grid.
- **Spacing:** Large gaps (32px+) to allow the massive typography room to "breathe".

---

## 5. Signature Components

### PixelLogo (The Ethereal Core)
- **Logic:** High-density particles (`step: 3`) mapped from vector SVG using sub-pixel weighting.
- **Behavior:** Particles react to mouse proximity, expanding and glowing to simulate neural activation.

### Software Slot Machine (The Neon Sign)
- **Design:** Mimics a Physical Neon Sign on a brick wall.
- **VFX:** Includes scanlines, pulsating status lights, and spring-based lever mechanics.

---

## 6. Motion & Animation
- **Entrance:** Vertical drift with opacity (`initial: { y: 50, opacity: 0 }`).
- **Rhythm:** Marquee text strips used as industrial dividers to keep the eye moving.
- **Vibe:** Transitions should feel like loading a terminal—fast but intentional.
