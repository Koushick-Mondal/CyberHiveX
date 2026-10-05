import { useContext } from 'react';
import { UserModeContext, type UserMode, type UserModeContextValue } from './userMode';

export type { UserMode };

const serverFallback: UserModeContextValue = { mode: null, setMode: () => {} };

export default function useUserMode(): UserModeContextValue {
  const value = useContext(UserModeContext);
  return value ?? serverFallback;
}
