# CyberHiveX homepage transformation

## Scope

Only the landing page was art-directed. The existing routes, page content, navigation behavior, contact adapter, Rakshak product page, and secondary page styling were not redesigned.

The homepage now uses a light, structured institutional canvas with:

- A restrained hero with strong positioning typography, subtle borders, restrained blue accents, clear CTA hierarchy, and technical metadata.
- A responsive SVG/CSS Rakshak AI intelligence core with architectural framing, eight fictional nodes, layered rings, selected-node evidence, simulated telemetry, and keyboard/manual playback controls.
- A capability strip using real CyberHiveX capabilities rather than unsupported metrics.
- The existing compact/full Rakshak demos, lifecycle, proactive/reactive, operations, pipeline, services, audiences, FAQ, and contact CTAs retained within the light landing system.
- One consistent light shell across all routes. Dark surfaces are limited to Rakshak/product demonstration panels where they communicate technical information.

No WebGL, Three.js, new runtime dependency, stock imagery, live telemetry, AI inference, security scan, or real response action was added. Fictional content remains explicitly labelled.

## Verification

- `npm run lint`: pass.
- `npm run build`: pass, including strict TypeScript and 17 prerendered routes.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 npm run test:landing`: 8 responsive layouts, 9 accessibility audits, zero violations, zero console errors; CTA, empty/search/reset, local simulation, compact evidence, theme isolation and menu focus checks pass.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 npm run test:ui`: 240 responsive/module layouts, 59 accessibility audits, zero violations and zero console errors.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 node scripts/security-scene-qa.mjs`: eight visual-node widths, keyboard/manual stages, reduced/normal motion, offscreen suspension and replay pass; headless sample median 16.7ms with zero intervals over 33ms.

Screenshots and machine-readable results: `reports/landing-1440.png`, `reports/landing-390.png`, `reports/landing-full.png`, and `reports/landing-qa.json`.
