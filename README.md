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

## User management flow (Supabase Auth)

The app follows the Expo + Supabase auth flow:

- Restores the existing auth session on app launch.
- Shows an email/password sign-in and sign-up screen when signed out.
- Listens for auth state changes and routes users to the authenticated home screen.
- Displays basic profile info for the active user and supports sign out.

## Environment variables

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` (optional fallback for older setups)

The app prefers the publishable key and falls back to anon key for compatibility.
