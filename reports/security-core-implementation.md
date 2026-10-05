# CyberHiveX — interactive security-core implementation

## Audit and direction

The active application is React 19/Vite 8 with strict TypeScript, seventeen clean-path routes, preserved root-hash aliases, scoped light editorial styling, Inter/IBM Plex Mono, a native modal navigation panel, route metadata and build-time static page rendering. The security workspace already supplies thirteen functional local modules; the contact form supplies validated drafts and an optional same-origin delivery adapter. No connected security backend, production model inference, dedicated disclosure channel or genuine founder portraits were supplied.

Preserved: branding, hero headline/copy/CTAs, founder identities, existing service/capability interactions, lifecycle/architecture diagrams, four sample hero events, event search/filter/simulation, explanation/review state and report downloads.

The key visual gap was the static event-list hero. The new visual uses layered SVG/CSS instead of a WebGL library: a faceted technical core, structural base, rings, thin connections, selected-node evidence and compact authored telemetry. Mobile shows four nodes rather than shrinking all eight desktop nodes. A new evidence section keeps the original compact event interactions available. Home service content now reuses the existing catalogue rather than maintaining divergent duplicate descriptions.

## Feature boundaries

- Eight scripted stages: Ready, simulated Monitoring, fixture Event detected, prepared Analyzing, prepared Correlating, authored High risk, Recommendation ready, demo review recorded; return to simulated Monitoring.
- One automatic cycle when visible, with pause/replay/step/reset. Offscreen and hidden-document suspension; timers, observers, event listeners and animation frames are cleaned up on unmount.
- Reduced motion: static scene, no autoplay, streams, scan or pointer depth. Manual inspection remains functional.
- Pointer depth is bounded to 6px horizontal/4px vertical, with transform-only CSS writes outside React render loops. Scroll depth is similarly bounded.
- Confidence 85% and baseline risk score 68/100 are authored fixture values. Neither is a production measurement or compromise probability. No external model, scan, attribution or remediation runs.

## Actual checks

- `npm run build`: strict TypeScript, client build and all seventeen prerendered routes pass.
- `npm run lint`: zero warnings/errors.
- `QA_TOOL_DIR=<external tool directory> QA_URL=http://localhost:5174 npm run test:ui`: **136** page/width checks, **15** recorded interaction groups, **zero** automated accessibility violations and **zero** console errors.
- `QA_TOOL_DIR=<external tool directory> QA_URL=http://localhost:5174 node scripts/security-scene-qa.mjs`: all eight requested widths; no page overflow, overlapping/clipped nodes or sub-44px node targets. Eight scene accessibility audits report zero violations. Keyboard inspection, manual stages/reset, automatic completion, replay and offscreen suspension pass.
- `QA_TOOL_DIR=<external tool directory> QA_CONTACT_URL=http://localhost:5187 node scripts/contact-qa.mjs`: intercepted fictional fixtures verify offline, loading/disabled, uncertain receipt without retry, acknowledged receipt and duplicate-send prevention. The test-only server was stopped afterwards; no real request was delivered.
- Scene performance sample: local headless Chrome, three active seconds, **179** intervals, **16.7ms median** and **one interval over 33ms**. This approximates 60Hz on this test machine, not a physical-device or production guarantee.
- New Home chunk: **52.43KB raw / 15.37KB gzip** in the recorded build. No new runtime packages, WebGL context or scene textures; focused product modules are code-split.

Evidence: `qa-results.json`, `security-scene-qa.json`, `security-core-desktop.png`, `security-core-mobile.png`, and preserved before/upgraded screenshots in this directory.

## Deployment inputs still needed

An approved real contact endpoint; the confirmed public origin for absolute metadata/sitemap; approved legal/disclosure commitments and channel; hosting configuration for correct HTTP 404 responses and deployment headers. These are not invented by the frontend. Manual screen-reader and physical-device verification remains a separate release check.
