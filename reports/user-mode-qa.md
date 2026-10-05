# CyberHiveX user mode selection — verification

Implemented without redesigning the existing route content. The feature adds a first-visit Business / Developer-Security-Engineer selection, localStorage persistence, theme tokens, a dismissible native modal, reduced-motion behavior, and a Preferences control for later switching.

## Checks

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass; 17 prerendered routes generated.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 npm run test:mode`: first visit, Business selection, Technical selection, persistence, refresh, mode switching, mobile stacking, keyboard activation, Escape dismissal, reduced motion, accessibility and console errors all pass.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 npm run test:ui`: 240 layouts, 59 accessibility audits, zero violations and zero console errors.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 node scripts/security-scene-qa.mjs`: existing Rakshak scene behavior remains passing.
- `QA_TOOL_DIR=<external QA install> QA_URL=http://localhost:4186 node scripts/motion-qa.mjs`: existing motion behavior remains passing.

Preview: `http://localhost:4186`.
