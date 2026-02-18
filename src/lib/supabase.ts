import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const extra = Constants.expoConfig?.extra ?? {};

export const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? (extra.supabaseUrl as string | undefined) ?? '';
export const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? (extra.supabaseAnonKey as string | undefined) ?? '';

export const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
