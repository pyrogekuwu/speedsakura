# SakuraSpeed 🌸🏎️

SakuraSpeed is a static mini-blog about JDM cars, modding, and overall japanese aesthetics.  
Built with HTML + CSS + vanilla JS as a portfolio project.

## about the project
this website is designed as a blog-style portal with:
- a home page featuring category shortcuts and featured posts
- category pages (eg. car models, JDM legends, itasha & aesthetics, modding, guides for newbies, Q&A)
- individual post pages (articles)

My goal was to build a clean and cute, responsive layout and add lightweight interactions without frameworks.

## features
- responsive UI (grid layouts + horizontal scroll category pills)
- category navigation with “pill” style buttons
- fade-in on scroll (IntersectionObserver)
- smooth scroll to the “about me” section (centered scroll behavior)
- filtering system for category pages (cards filtered by dataset attributes):
  - supports simple brand filtering
  - supports style tags filtering
  - supports multi-dimension filtering (e.g. era + brand)
- “no results” state when filters hide all cards

## tech stack
- HTML5
- CSS3 (custom styling, responsive grids)
- Vanilla JavaScript (DOM manipulation, IntersectionObserver, filtering)

## project structure
- `index.html` — home page
- `style.css` — global styles + post and category layouts
- `script.js` — filtering logic for category pages (based on data-* attributes)
- `categories/` — category pages
- `posts/` — article pages
- `img/` — images used across the site

## how to run locally
1. Download / clone the repository
2. Open `index.html` in your browser  
   (optional: use VS Code Live Server for smoother navigation)

## notes / future improvements
- connect newsletter and Q&A form to a backend (currently UI-only)
- add search
- add pagination / “load more”
- improve accessibility (ARIA labels, focus states, contrast checks)

## author
Created by Jules (portfolio project).
