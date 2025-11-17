# Guidance for AI coding agents

This repository is a static marketing website for Liberia Renaissance Group (LRG Inc.). It uses Tailwind CSS (CDN), Bootstrap for some UI components, and small local scripts for behavior and content toggles.

Key patterns and where to change them
- Single-page multi-section layout. Each page/section is a `<section id="page-..."` and content is toggled by the `showPage(pageId)` function in `index.html` (search for `showPage`).
  - Add pages by creating `<section id="page-yourpage" class="page-content hidden" data-title="Your Title">` and add a nav link: `<a data-page="yourpage" class="nav-link">`.
- Navigation uses `data-page` attributes and `nav-link`/`mobile-nav-link` classes. Keep naming consistent (lowercase no spaces) for `data-page` values.
- Slider: `Src/slider.js` controls the top banner. It manipulates `.slides` and `#slider`. Use `slides` elements and `.slide` class for new images. The auto interval is set via setInterval (currently 3000ms).
- News & Insights: `Public/js/news-insights.js` controls the gallery modal and lazy-loading for images inside `#news-insights`.
- Styles: Global look-and-feel built with Tailwind + inline CSS in `index.html`. The Tailwind CDN config is declared inline to add `lrg-primary`, `lrg-accent` colors. There are duplicate CDN includes — be cautious when adding Tailwind-specific build steps.
- Project assets are under `Public/Image` (images), `Public/js` (client scripts), `Src` (local CSS/JS utilities). Things referenced with `/Src/...` expect those files at the repository root.

Build & dev workflows
- This is a purely static site; there is no build step in `package.json`. To preview locally:
  - Using Python's simple server (PowerShell):
    ```powershell
    cd "c:\LRG Inc\Liberia-Renaissance-Group-LRG-"
    python -m http.server 8000; Start-Process "http://localhost:8000"
    ```
  - Or with Node.js `http-server`:
    ```powershell
    cd "c:\LRG Inc\Liberia-Renaissance-Group-LRG-"
    npx http-server -p 8000; Start-Process "http://localhost:8000"
    ```
- Editing CSS/JS: modify `Src/slider.css` and `Src/slider.js`. JavaScript logic and the `showPage()` function are in `index.html` for now — search for `showPage` to find the single source of navigation logic.

Patterns for changes and feature additions
- Pages must have `data-title` to support dynamic title behavior; keep `data-page` on nav links equal to the `page-` suffix.
- Use the same `lrg-primary`/`lrg-accent` color names if you add Tailwind classes; they are declared in `tailwind.config` within `index.html`.
- When adding images, create optimized versions and reference them under `Public/Image` — the site relies on relative linking.
- Javascript: keep inline DOM manipulation minimal; follow the current event delegation pattern (e.g., `document.querySelectorAll('.nav-link')`) to maintain consistency.

Integration points and external dependencies
- Tailwind CSS CDN — licensing and customization controlled via `tailwind.config` inside `index.html`.
- Bootstrap CSS/JS (5.3.x) loaded via CDN — used for Carousel and Modal components.
- Google Maps iframe used in the contact section; edits to locations happen directly in the iframe `src` attribute.

Project conventions and gotchas
- Single-file navigation: `index.html` contains the page state and major scripts — avoid duplicating logic in other place unless extracting to `Src/`.
- There are duplicate Tailwind `<script>` includes; prefer a single include + inline config without adding multiple copies.
- Keep `data-page` naming consistent between nav links and the section IDs; otherwise `showPage()` won't map correctly.
- Avoid adding frameworks/build systems without a clear need; this repository is static and easier to preview without bundlers.

Examples (from the repo)
- Add a new page 'careers':
  1. Create `<section id="page-careers" class="page-content hidden" data-title="Careers">` inside `index.html`.
  2. Add `<a data-page="careers" class="nav-link">Careers</a>` to the nav.
  3. Ensure `showPage('careers')` maps correctly via the `data-page` attribute.
- Add entry to slider: add a `div.slide` inside the `.slides` container and include an image under `Public/Image`.

Testing & debugging
- Preview with a static server as shown above.
- Check console errors for missing images or missing element IDs referenced by JS, especially when copying modal IDs from other pages (e.g., `galleryModal`).
- Use the browser devtools to simulate mobile widths and test the `#mobile-menu` toggle.

When to ask for maintainers input
- If a page requires a server-side change or a restructured build pipeline (Tailwind/AOTA), ask maintainers before converting to a toolchain (e.g., PostCSS build), as the repo is intentionally static.

If anything is unclear or you want the guidance expanded to cover more internal conventions (naming, commit style, or CI) — I can iterate. Please tell me which areas to expand. 
