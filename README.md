# Portfolio — A A D Dinithi Dulasha

A personal portfolio website for an IT undergraduate: about, skills, projects, education, certificates and contact.
Built with plain HTML, CSS and JavaScript — no frameworks and no build step.

## Project structure

```
portfolio/
├── index.html              Page content (semantic HTML, one file)
├── css/
│   └── styles.css          All styles, organised in numbered sections
├── js/
│   └── main.js             All behaviour, one small function per feature
├── assets/
│   ├── favicon.svg
│   ├── cv/                 CV PDF used by the "Download CV" button
│   └── images/
│       ├── profile.webp
│       ├── projects/       One screenshot per project
│       └── certificates/   One image per certificate
└── README.md
```

## Run it locally

Double-click `index.html`, or serve the folder (closest to how GitHub Pages works):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Publish with GitHub Pages

1. Create a **public** repository named `<your-username>.github.io`.
2. Upload the **contents** of this folder (keep the `css`, `js` and `assets` folders).
3. Repository **Settings → Pages → Deploy from a branch → `main` / root**.
4. Open `https://<your-username>.github.io` after a minute or two.

## How to make common changes

| I want to…                  | Do this                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| Update my CV                | Replace `assets/cv/A_A_D_Dinithi_Dulasha_CV.pdf` (keep the same file name).                       |
| Add a project               | Copy an existing `<article class="card project-card">` block in `index.html`, edit the text, and add its screenshot to `assets/images/projects/`. |
| Add a certificate           | Copy an existing `<article class="card cert-card">` block and add its image to `assets/images/certificates/`. |
| Change the career interests | Edit the `CAREER_INTERESTS` list at the top of `js/main.js`.                                      |
| Change colours              | Edit the variables at the top of `css/styles.css` (`:root` for light, `body.dark` for dark).      |
| Add a skill                 | Copy a `<span class="skill-logo-pill">` in the Skills section.                                    |

## Coding conventions

- **HTML:** semantic elements (`nav`, `main`, `section`, `article`, `dialog`), meaningful `alt` text, `aria-label`s on
  icon-only controls, a skip link, and `width`/`height` on images to avoid layout jumps.
- **CSS:** design tokens as custom properties, one declaration per line, component-based sections, a single shared
  carousel (`.carousel` / `.scroll-row`) for projects and certificates, and mobile rules kept next to their component.
- **JavaScript:** one IIFE with `'use strict'`, named constants for settings, one `init…` function per feature, and no
  global variables. Works when opened directly from disk (no ES modules).
- **Images:** screenshots are JPEG, the portrait is WebP, and everything lives in `assets/` instead of being embedded
  in the page.

## Credits

- Technology logos: [Devicon](https://devicon.dev) (loaded from jsDelivr, pinned to v2.16.0).
