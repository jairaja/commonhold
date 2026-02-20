# Commonhold App Architecture Recommendations

This repository already uses Expo + React Native + TypeScript, Zustand, and Supabase.
Given the current stack, the best path is a **hybrid approach**:

## 1) State management

### Recommendation
- Keep **Zustand** for local/UI/client state (already present).
- Add **@tanstack/react-query** for server/cache state.
- Skip Redux/MobX unless app complexity grows dramatically.
- Use **React Query Devtools** only in development builds.

### Why
- Zustand is simple and already integrated in this project (`src/store/useAppStore.ts`).
- Supabase data is asynchronous and cacheable, which fits React Query’s strengths.
- This separation avoids overloading a single store with remote fetching concerns.

## 2) API library

### Recommendation
- Use **Supabase JS client** as the primary API layer (already in use).
- Add a thin **typed repository/service layer** for domain operations.
- Use `fetch` for any non-Supabase endpoints; add Axios only if interceptors/cancellation ergonomics become necessary.

### Why
- The app already depends on `@supabase/supabase-js` and is configured for auth/session behavior.
- Introducing GraphQL/tRPC now adds complexity with limited near-term payoff unless backend architecture changes.

## 3) Unit + automation testing

### Recommendation (mix)
- **Jest + React Native Testing Library** for unit/component tests.
- **Playwright** for web E2E (Expo web flows) and fast CI smoke.
- **Maestro** for device-level mobile E2E user journeys.
- Avoid Cypress/Cucumber for now unless there is a specific BDD or browser-only requirement.

### Why
- This gives strong coverage across logic, UI, and mobile runtime behavior.
- Keeps tooling modern and aligned with RN/Expo workflows.

## 4) Local persistence, secure storage, session storage

### Recommendation (mix)
- **expo-secure-store** for tokens/secrets/refresh credentials.
- **MMKV** for high-performance non-sensitive local app data (feature flags, cached UI prefs, drafts).
- Keep Supabase session persistence enabled, but store sensitive auth material in secure storage when customizing auth flow.
- `jwt-decode` is optional utility only (not storage).
- `expo-auth-session` only if implementing OAuth/browser-based auth providers.

### Why
- Separate sensitive vs non-sensitive storage responsibilities.
- Balances performance and security for a property-management app.

## 5) Hermes

### Recommendation
- **Yes, keep Hermes enabled** (default for modern Expo/RN).

### Why
- Better startup/memory/perf characteristics for production React Native apps.
- No strong reason to disable unless blocked by a specific native library issue.

## 6) react-native-edge-to-edge

### Recommendation
- **Not strictly required** initially.
- Add it if your UX direction targets immersive/full-bleed layouts under system bars.

### Why
- Current stack already includes safe-area handling (`react-native-safe-area-context`).
- You can defer edge-to-edge until you have concrete screen designs that benefit from it.

## Suggested implementation order
1. Introduce React Query and wire it for Supabase-backed queries/mutations.
2. Add secure/non-secure persistence split (`expo-secure-store` + MMKV).
3. Add testing baseline: unit (Jest/RNTL), then Playwright and Maestro smoke tests.
4. Reassess Redux/MobX/GraphQL/tRPC only when backend/domain complexity demands it.
