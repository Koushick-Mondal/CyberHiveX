# CyberHiveX Technologies

Existing React 19 + Vite 8 website, refined in place with strict TypeScript, clean routes and preserved legacy hash aliases. No new runtime dependencies were added; unused cinematic components and GSAP were removed. Use Node 24+; verification used Node 25. Prerendering uses Vite to transpile TypeScript; QA scripts use Node's TypeScript support.

## Run

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

Production output is `dist/`. Build runs strict TypeScript, Vite bundling, and real-page prerendering. The verified production preview is at `http://localhost:4186` while its process remains running. Vite prints the active URL for development instances.

## Architecture

- `src/App.tsx` and `src/routes.ts`: clean-path navigation, history/legacy hash support, lazy routes, metadata, loading/error boundaries and skip link.
- `src/index.css`: shared light design tokens, typography, controls, focus and reduced-motion rules.
- `src/styles/motion.css`, `usePageMotion` and `useMagneticInteractions`: one-shot section/chart reveals, bounded fine-pointer attraction, navigation/button feedback and route entrances. No pre-hidden content, scroll lock or new runtime library. `AnimatedMetric` exposes actual fixture counts to assistive technology while its decorative number interpolates.
- `src/components/ui.tsx` and `shell.css`: reusable section headings, badges, buttons, crawlable route links, native modal menu and footer.
- `src/pages/HomePage.tsx` and `home.css`: light institutional homepage, responsive Rakshak security-intelligence visualization, preserved event evidence, interactive lifecycle/architecture/operations and shared service catalogue.
- `src/components/visualization/`: layered SVG security core, inspectable fictional nodes, authored telemetry, eight-stage playback and motion controller. No WebGL or textures. One auto-play cycle, offscreen/page-hidden suspension, pause/step/reset and static reduced-motion mode.
- `src/components/RakshakCommandCenterPreview.tsx`, `src/components/rakshak/` and `rakshak.css`: thirteen focused local product modules, typed fixtures, evidence inspection, prepared Q&A, approval-gated response and report export. Additional modules load on demand.
- `src/pages/pages.css` and `pageTools.tsx`: secondary-page styling and keyboard-operated tabs.
- `scripts/build-pages.mjs`: prerenders the seventeen routes and produces `404.html`, `robots.txt` and `sitemap.xml`.

Primary routes: `/`, `/about`, `/services`, `/rakshak-ai`, `/products`, `/approach`, `/pricing`, `/contact`, `/responsible-disclosure`, `/404`, `/privacy-policy`, `/terms`, `/cookie-policy`. Existing `/capabilities`, `/solutions`, `/threatlab` and `/ecosystem` remain. Root hash aliases are preserved, including `#services` → capabilities, `#licensing` → contact, `#cyber-intelligence` → Threat Lab and `#security` → ecosystem.

The site uses one light, institutional experience across all routes. Dark surfaces are reserved for Rakshak/product demonstration panels where they communicate technical information; the global shell, navigation, footer and page backgrounds remain light.

Set `VITE_SITE_URL` to the confirmed deployment origin for build-time canonical/social URLs and a populated sitemap. Without it, browser metadata uses the current origin and the generated sitemap has no invented domain. Static hosting should serve route directories and return `404.html` with a 404 status for unknown paths.

Deploy at the origin root, not an unconfigured subdirectory. Vite preview's SPA fallback does not prove production HTTP status codes. Configure HTTPS and host security headers separately. Legal pages are website notices pending owner review, not approved policies. No dedicated disclosure channel or safe-harbor commitment is claimed. Phase 2 shells were not added.

## Contact delivery

No submission backend or contact email was present in the supplied project. By default, the form validates and prepares downloadable local drafts. It explicitly says **not sent** and never claims an assessment was scheduled.

To connect an approved backend, copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` to an existing same-origin path, for example `/api/contact`. Restart development or rebuild production. This is public build configuration, not a place for secrets.

After review, the person chooses **Send request**. The endpoint receives a JSON POST with `name`, `email`, `company`, `orgType`, `interest`, and `message`. Organization is optional; interests include assessment, business, partnership, general and retained specialist enquiries. Only an HTTP success response containing JSON `{ "success": true }` confirms receipt. Errors and uncertain receipts do not trigger automatic retries. Redirects are rejected; there is a 15-second timeout. This project does **not** implement that server.

The backend must independently validate lengths and values, control abuse/rate limits, enforce origin/CSRF rules where appropriate, and define retention/privacy practices. Client-side validation is not a security boundary. Keep API credentials server-side.

## Truthful demonstrations

Rakshak, the security core, OSINT, forensic timelines, architecture and Threat Lab use labelled fictional fixtures. They do not run an AI model, scan targets, connect monitoring or execute security changes. Example domains and documentation IP ranges are used. Confidence percentages and the baseline risk score are authored demonstration values, not generated probabilities or real security measurements. Pricing is custom quote-based; commercial product availability requires confirmation.

Founder names and roles are preserved as supplied. No founder photos were present; initials are displayed rather than invented portraits. Original artwork remains; the active logo is a smaller derivative at `public/cyberhivex-brand-mark.png`.

## UI regression checks

QA tooling is separate from the application dependency tree. Install `playwright-core` and `@axe-core/playwright` in an approved temporary/tool directory, then set `QA_TOOL_DIR` to that directory. A local Chrome installation is required; `CHROME_PATH` overrides the macOS default.

```sh
# Against an already running preview:
QA_TOOL_DIR=/path/to/qa-tools QA_URL=http://localhost:4186 npm run test:ui

# Homepage-only responsive, accessibility, CTA and theme-isolation checks:
QA_TOOL_DIR=/path/to/qa-tools QA_URL=http://localhost:4186 npm run test:landing

# After building: verify prerendered content, metadata, robots and sitemap:
node scripts/seo-qa.mjs
# For a build using a configured public origin:
QA_SITE_ORIGIN=https://your-confirmed-origin node scripts/seo-qa.mjs

# Security-core interaction, motion and responsive checks:
QA_TOOL_DIR=/path/to/qa-tools QA_URL=http://localhost:4186 node scripts/security-scene-qa.mjs

# Magnetic, scroll, product, lifecycle, touch and live reduced-motion fallback checks:
QA_TOOL_DIR=/path/to/qa-tools QA_URL=http://localhost:5174 node scripts/motion-qa.mjs

# Optional contact-adapter fixtures; first run a separate configured dev instance:
VITE_CONTACT_ENDPOINT=/api/contact npm run dev -- --port 5186 --strictPort
QA_TOOL_DIR=/path/to/qa-tools QA_CONTACT_URL=http://localhost:5186 node scripts/contact-qa.mjs
```

The contact check intercepts the endpoint locally and uses fictional details; it does not verify a real mail/ticket backend. General results are written to `reports/qa-results.json`. Security-core results, responsive screenshots and the implementation record are in `reports/security-scene-qa.json`, `reports/security-core-desktop.png`, `reports/security-core-mobile.png` and `reports/security-core-implementation.md`. Automated accessibility checks do not replace manual screen-reader/device testing.
