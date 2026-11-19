# Personal Portfolio Website

This is my personal portfolio website built to present my skills, experience, and frontend development journey.

The project is designed not only as a showcase of completed work, but also as an evolving product that continues to grow as I learn and improve as a developer. It reflects my approach to building clean, scalable, and user-focused interfaces.

Live Demo: https://portfolio-chi-six-34.vercel.app/

---

## 🧠 About the Project

This portfolio represents my current skill set in frontend development, including UI architecture, component design, and modern React patterns.

It includes multiple interactive sections and UI experiments that demonstrate both technical knowledge and attention to user experience.

The project is not a final version — I continuously improve and expand it as I learn new technologies and approaches.

---

## 🛠️ Tech Stack

- React
- TypeScript
- SCSS Modules
- GSAP (ScrollTrigger, SplitText) + @gsap/react
- Lenis (smooth scroll)
- React i18next
- React Portals
- HTML5

---

## ✨ Key Features

### 🎨 UI & Design
- Scroll storytelling: every section is a "scene" driven by the scroll
- Preloader with counter and curtain reveal
- Pinned hero that scales away while the content sheet slides over it
- Pinned horizontal projects gallery with video parallax
- Stacking soft-skill cards, scroll-driven experience timeline
- Velocity-based technology marquee, split-text reveals, magnetic buttons, custom cursor
- Fully responsive layout — all blocks are visible on mobile
- Custom design system with SCSS tokens (Unbounded + Manrope, violet / fuchsia palette)

### ⚙️ Functionality
- Multi-language support (4 languages via i18n)
- Smooth scroll synced with GSAP ScrollTrigger
- Respects `prefers-reduced-motion` (animations and smooth scroll are disabled)
- Keyboard support (ESC for modal and menu)
- Fullscreen mobile menu, video modal, copy-to-clipboard email
- Terminal-style developer contact section

### 🧩 Architecture
- Scalable folder structure
- Shared UI components and utilities
- Centralized styles system
- Reusable hooks and icons
- Widget-based layout (Header, Main sections, etc.)

---

## 📁 Project Structure
public/
assets, fonts, images, videos (initial load resources)

src/
app/ # App initialization and setup
shared/ # Reusable logic (hooks, UI, icons, utils)
styles/ # Global styles, variables, mixins
widgets/ # Main layout sections (Header, Content, etc.)

---

📌 Notes

This project is a personal frontend playground and portfolio combined into one.

It reflects my current understanding of:

component architecture
UI/UX principles
state management patterns
performance considerations in React applications

I continue to improve it over time as I grow as a developer.


---

## 🚀 Getting Started

```bash
npm install
npm run dev
yarn install
yarn dev

