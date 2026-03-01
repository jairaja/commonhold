import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

type AppState = {
  isLoadingSession: boolean;
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setIsLoadingSession: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isLoadingSession: true,
  session: null,
  user: null,
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setIsLoadingSession: (value) => set({ isLoadingSession: value }),
}));
