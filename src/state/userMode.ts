import { createContext, type Dispatch, type SetStateAction } from 'react';

export type UserMode = 'business' | 'technical';
export const USER_MODE_STORAGE_KEY = 'cyberhivex-user-mode';

export interface UserModeContextValue {
  mode: UserMode | null;
  setMode: (mode: UserMode) => void;
}

export const UserModeContext = createContext<UserModeContextValue | null>(null);

export function readStoredMode(): UserMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(USER_MODE_STORAGE_KEY);
    return value === 'business' || value === 'technical' ? value : null;
  } catch {
    return null;
  }
}

export type UserModeStateSetter = Dispatch<SetStateAction<UserMode | null>>;
