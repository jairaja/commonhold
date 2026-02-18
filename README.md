# Commonhold mobile app

Expo + React Native + TypeScript starter configured with:

- Zustand for client state
- Supabase (`@supabase/supabase-js`) for BaaS
- React Navigation (native stack)
- React Native Paper for UI components
- Gesture handler, safe-area, screens, and reanimated primitives

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start Expo:

   ```bash
   npm run start
   ```

## Environment variables

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

These are read from `process.env` and exposed at build time by Expo.
