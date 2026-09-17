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
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`) driven by a token
  system — see "Design system" below — plus scoped `<style>` blocks per
  component that consume those tokens (`var(--ink)`, `.btn-primary`, etc.)
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
`users/{uid}` doc and phrases subcollection) is versioned in the repo and
referenced from `firebase.json`, but pushing code does **not** deploy it.
Deploy manually after any rules change: `firebase deploy --only
firestore:rules` (or paste the file into the Firebase console). If you
change Firestore access patterns in a store, update `firestore.rules` to
match and flag that it needs redeploying.

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
  `authStore.ts`, `backupStore.ts`
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

### No analytics

There is deliberately no usage-analytics/progress-tracking feature in this
app — an `analyticsStore.ts` + `/analytics` "My progress" page existed
briefly (Firestore-backed event tracking, a progress report UI) but was
**removed entirely** at the owner's request (no interest in maintaining the
Firestore composite index it needed, or the feature generally). If you're
tempted to re-add usage tracking, don't assume it's wanted — ask first.
`pictogramStore.ts`, `helpNavigator.vue`, `risposteRapidePage.vue`, and
`router/index.ts` briefly had tracking calls wired in; those are gone too.

### Design system

The whole app was redesigned around a token system (light/dark/high-contrast
variants, WCAG-contrast-checked) instead of ad hoc Tailwind gradients:

- **`src/assets/tokens.css`** — the single source of truth: neutrals, action
  colors, 8 CAA pictogram-category colors as tint/edge pairs keyed to the
  **Fitzgerald key** convention (`--cat-people`, `--cat-verb`, `--cat-descr`,
  `--cat-noun`, `--cat-social`, `--cat-quest`, `--cat-neg`, `--cat-other`,
  each with an `-edge` border color), spacing scale (`--space-1`…`--space-12`),
  touch targets (`--target-min` 44px / `--target` 56px / `--target-lg` 72px),
  radii, a two-tone focus ring, and `--ui-scale` (the accessibility panel's
  font-size multiplier — `html { font-size: calc(16px * var(--ui-scale)) }`,
  so it scales headings too, not just body text). Dark mode values live
  twice: once under `:root[data-theme="dark"]` (explicit choice — nothing
  sets this yet, no UI toggle exists) and once under `@media
  (prefers-color-scheme: dark)` (system default).
- **`src/assets/main.css`** imports `tokens.css` then `accessibility.css`,
  maps tokens into Tailwind's `@theme` (`--color-ink`, `--text-h2`, etc. →
  `text-ink`, `text-h2` utility classes), and defines the shared component
  classes every page should reuse: `.btn`/`.btn-primary`/`.btn-secondary`/
  `.btn-danger`, `.surface-card`, `.cat-tile` (category-colored, driven by
  `--tint`/`--edge` custom props), `.pictogram-tile` (always white — this is
  an invariant, pictograms never invert even in high-contrast/dark mode), and
  the single global `:focus-visible` rule.
- **`src/assets/accessibility.css`** — the classes `accessibilityStore.ts`
  toggles on `<html>` (`.high-contrast`, `.reduced-motion`,
  `.color-blind-friendly`, `.simplified-ui`, `.eye-tracking-mode`) now
  *redefine tokens* rather than doing blanket `* { ... } !important`
  overrides, so every component built on tokens adapts automatically.
- **`components/navigationCard.vue`**: its `color` prop is a **category key**
  (`'people'|'verb'|'descr'|'noun'|'social'|'quest'|'neg'|'other'`), not a
  hex string — every call site across the app was migrated. Root element is
  a real `RouterLink` (or `button` with no `route`), not a `div @click`.
- Emoji-as-icon (👋🎓📚💬 etc.) and decorative gradients/blur/`hover:scale-*`
  were removed from post-login pages during this pass; they're still fine on
  the pre-login/marketing pages (`LandingPage.vue`, `CreditsPage.vue`,
  `LoginPage.vue`, `RegistrationPage.vue`) which were **intentionally left
  alone** — those are the one place expressive styling still makes sense
  (the audience there is people evaluating the tool, not the AAC user).
  `main.css`'s old dead CSS (`button.login/.register/.loginCredits/
  .registerCredits`, `.rainbow-bounce`, `#fcffa1` background) was removed too
  since grep confirmed nothing referenced it — if you're about to restyle the
  pre-login pages, check they don't secretly depend on those before assuming
  they're gone for good.

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
5. **Pre-login pages (`LandingPage`, `CreditsPage`, `LoginPage`,
   `RegistrationPage`) were not redesigned** — deliberately deferred, see
   "Design system" above. They still use the old ad hoc Tailwind styling.
6. **No live browser verification of the redesign or the games** — all of
   it passes lint/type-check/test/build, but no session so far has had
   Chrome extension access to actually click through the app. Do a manual
   pass (`npm run dev`) before trusting it in production, especially: high
   contrast + dark mode pictogram legibility, `extra-large` font scaling at
   320px width, keyboard-only navigation, and the games' speech-synthesis
   flows (`imparaPage.vue`, `ascoltaTrovaPage.vue`).

## Working style for this repo

- This is a learning/school project — prefer small, explainable diffs and
  idiomatic Vue 3 Composition API over clever abstractions.
- Keep `en`/`it` i18n entries in sync; don't add a hardcoded string in one
  language only.
- Given the target users, treat accessibility (contrast, motion, screen
  reader labels, keyboard/gesture nav) and graceful offline/error handling
  as first-class concerns, not polish.
