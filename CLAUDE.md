# CLAUDE.md

This file gives Claude Code (and other agents) the context needed to work in this repository.

## What this project is

**ComuniCAA** — a free, open-source web app for Augmentative and Alternative
Communication (AAC / CAA), built as a school project by students at IIS Volta
Lodi (Italy). It helps people with verbal communication difficulties (autism,
aphasia, cerebral palsy, intellectual disabilities, etc.) build sentences from
pictograms/symbols, hear them spoken aloud via TTS, and practice communication
skills through games. Secondary audiences: educators/therapists and families
supporting these users.

Live deployment: https://caa-communication.netlify.app/ (Netlify, SPA redirect
in `netlify.toml`).

Primary language of UI copy/content and code comments: **Italian**, with an
in-progress English translation via `vue-i18n` (`src/i18n.ts`). Keep both
locales in sync when editing user-facing strings.

## Tech stack

- **Framework**: Vue 3 (`<script setup>`, Composition API) + TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`) + hand-written CSS in
  `src/assets/main.css` / `src/assets/accessibility.css` and scoped `<style>`
  blocks per component
- **State**: Pinia (mix of setup-store and options-store syntax — see below)
- **Routing**: vue-router 4, `createWebHistory`, with a centralized
  `router.beforeEach` auth guard (see Routing below)
- **Backend**: Firebase (Auth + Firestore) — no custom backend/API server
- **i18n**: vue-i18n, two locales (`en`, `it`) defined inline in `src/i18n.ts`
- **Testing**: Vitest + `@vue/test-utils` + jsdom (`npm run test`)
- **HTTP**: axios (present in deps; check actual usage before assuming it's
  the primary data-fetching mechanism — most data appears to come from
  Firebase SDK calls directly)

Firestore security rules are versioned in-repo (`firestore.rules` +
`firebase.json`) but are **not deployed automatically** — see "Firestore
rules" below.

## Commands

```bash
npm install          # install deps
npm run dev           # start Vite dev server
npm run build          # type-check (vue-tsc) + production build
npm run preview        # preview production build locally
npm run lint            # eslint --fix over the whole project
npm run format            # prettier --write src/
npm run test             # run the Vitest suite once
```

### Environment setup

Firebase config is read from `VITE_FIREBASE_*` env vars (see `.env.example`).
Copy `.env.example` to `.env` and fill in a Firebase project's credentials
before running `npm run dev`. `src/firebaseConfig.ts` is explicitly marked
"DO NOT TOUCH" in a code comment — it just wires env vars into the Firebase
SDK; don't hardcode credentials there.

### Firestore rules

`firestore.rules` (root-scoped access: a user can only read/write their own
`users/{uid}` doc, phrases subcollection, and their own `analytics` events)
is versioned in the repo and referenced from `firebase.json`, but pushing
code does **not** deploy it. Deploy manually after any rules change:
`firebase deploy --only firestore:rules` (or paste the file into the
Firebase console). If you change Firestore access patterns in a store,
update `firestore.rules` to match and flag that it needs redeploying.

## Project structure

```
src/
  main.ts               # app bootstrap: pinia, router, i18n, auth listener,
                         # accessibility settings — all initialized once here
  App.vue                # root shell: RouterView + global HelpNavigator/
                          # ToastNotifications/AccessibilityPanel
  firebaseConfig.ts       # Firebase app/auth/firestore init from env vars
  i18n.ts                  # en/it translation strings (inline, not JSON files)
  router/index.ts           # routes + centralized auth guard (meta.requiresAuth)
  stores/                    # Pinia stores (see "State management" below)
  utils/toast.ts              # notify() helper wrapping window.showToast
  components/                # shared/global components
  views/
    preLogIn/                # landing, login, register, credits
    postLogin/                # home + childPages/ (dictionary, games, chat, etc.)
    generic/                   # 404, logout transition
```

### Routing (`src/router/index.ts`) and auth

Auth guarding is centralized: routes needing a signed-in user carry
`meta: { requiresAuth: true }`, and a single `router.beforeEach` awaits
`authStore.waitForAuthReady()` then redirects to `/login` if unauthenticated.
Individual page components no longer duplicate this check in `onMounted`.

`authStore.initializeStore()` (subscribes to `onAuthStateChanged`) is called
exactly **once**, in `main.ts` before mounting — it's now idempotent (a
module-level guard makes repeat calls no-ops), so it's safe to call from
elsewhere too, but there's no need to.

Two routes are **deliberately public** despite living under `postLogin/`:
`/nolog` (explore-without-registering hub) and the two pages it links to,
`/dictionary` and `/risposteRapide`. Cloud sync (`backupStore`) silently
no-ops while signed out, but pictogram selection and locally-saved phrases
still work — that's what makes "explore without registration" actually
functional. Don't add `requiresAuth` to these three without re-checking
whether that flow still needs to work.

### State management (Pinia) — two coexisting styles

- **Setup-store syntax** (`ref`/`computed`, returns an object):
  `authStore.ts`, `analyticsStore.ts`, `backupStore.ts`
- **Options-store syntax** (`state`/`actions` object):
  `pictogramStore.ts`, `accessibilityStore.ts`

Both styles work fine with Pinia, but pick the one matching the file you're
already editing rather than mixing styles within a store.

`accessibilityStore.ts` is now the **single** accessibility-settings system
(the old unused `composables/useAccessibility.ts` duplicate was deleted).
Its class names (`high-contrast`, `reduced-motion`, `color-blind-friendly`,
`simplified-ui`, `eye-tracking-mode`, …) are defined in
`src/assets/accessibility.css` — keep them in sync if you touch either file.
`main.ts` calls `loadSettings()` once at boot so persisted settings apply
immediately; `components/AccessibilityPanel.vue` is the UI for it and is
mounted globally in `App.vue`.

### Pictograms & phrases

`pictogramStore.ts` holds the in-progress phrase being built
(`selectedPictograms`) and `savedPhrases`. Saving a phrase calls
`backupStore.savePhraseToCloud`, which writes to Firestore under
`users/{uid}/phrases/{phraseId}` — no-ops if the user isn't authenticated
(`if (!user) return`), and on failure both logs to console **and** shows a
toast via `utils/toast.ts`'s `notify()` (wraps the `window.showToast` that
`toastNotifications.vue` exposes once mounted). `pictogramStore`'s own
try/catch around the `backupStore` call is effectively a dead fallback —
`backupStore.savePhraseToCloud` never rethrows — the real failure handling
lives in `backupStore.ts` itself.

### Analytics

`analyticsStore.ts` writes usage events (`pictogram_used`, `phrase_created`,
`voice_activated`, `page_visited`) to a top-level Firestore `analytics`
collection, keyed by `userId`. `generateProgressReport` queries and
summarizes these client-side. This is a real, if simple, analytics pipeline
— not a stub. `/analytics` requires auth (route guard).

## Conventions observed in this codebase

- Components: PascalCase filenames mostly, but some views/components are
  lowerCamelCase (`helpNavigator.vue`, `pageTitle.vue`, `dizionarioPage.vue`)
  — match the existing casing of the file you're editing/importing, don't
  "fix" casing project-wide without discussing it (case-sensitivity breaks
  imports differently across OSes).
  - `dizionarioPage.vue` and `dictionaryPage.vue` are **not** duplicates:
    `dizionarioPage.vue` (`/dizionario`, auth-required) is a small hub page
    with two cards linking to `/risposteRapide` and `/dictionary`;
    `dictionaryPage.vue` (`/dictionary`, public) is the actual searchable
    dictionary implementation.
- Two-space indentation, Prettier config in `.prettierrc.json`, ESLint flat
  config in `eslint.config.ts` (`vue/flat/essential` + `@vue/eslint-config-typescript`).
- Path alias `@` → `src/` is available (see imports mixing `@/…` and
  relative `../…` — prefer `@/…` for new code since it's unambiguous).
- Comments and internal identifiers are often Italian; UI strings must go
  through `i18n.ts`, not be hardcoded in templates.
- Tests live next to the file they cover as `*.spec.ts` (see
  `src/stores/pictogramStore.spec.ts`, `accessibilityStore.spec.ts`,
  `src/components/toastNotifications.spec.ts`). Mock `@/firebaseConfig` with
  `vi.mock` in any test that transitively imports a store touching Firebase,
  so tests never hit the real network.

## Known gaps worth being aware of

These aren't asks — just things to flag if a task touches them, since they
affect a communication tool used by vulnerable/dependent users:

1. **`components/VoiceReader.vue` is unused** (not imported anywhere) and
   duplicates TTS functionality that otherwise lives in `accessibilityStore`
   / `helpNavigator.vue`. Left in place — wiring it up or removing it is a
   product decision, not something fixed opportunistically.
2. **i18n is not fully audited for parity** — the `en` and `it` message
   objects in `i18n.ts` aren't guaranteed to have identical key sets; a
   dedicated pass would help.
3. **Firestore rules need manual deployment** (see "Firestore rules" above)
   — they exist in-repo but nothing in CI/CD pushes them to the actual
   Firebase project.
4. **No CI configured** — `npm run lint`/`type-check`/`test`/`build` all
   pass locally but nothing runs them automatically on push/PR.

## Working style for this repo

- This is a learning/school project — prefer small, explainable diffs and
  idiomatic Vue 3 Composition API over clever abstractions.
- Keep `en`/`it` i18n entries in sync; don't add a hardcoded string in one
  language only.
- Given the target users, treat accessibility (contrast, motion, screen
  reader labels, keyboard/gesture nav) and graceful offline/error handling
  as first-class concerns, not polish.
