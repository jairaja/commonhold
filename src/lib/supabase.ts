import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const extra = Constants.expoConfig?.extra ?? {};

export const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? (extra.supabaseUrl as string | undefined) ?? '';

const publishableKeyFromEnv =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  (extra.supabasePublishableKey as string | undefined) ??
  '';

const anonKeyFromEnv = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? (extra.supabaseAnonKey as string | undefined) ?? '';

export const supabasePublishableKey = publishableKeyFromEnv || anonKeyFromEnv;

export const hasSupabaseCredentials = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
