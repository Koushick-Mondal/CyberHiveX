import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { UserModeContext, USER_MODE_STORAGE_KEY, readStoredMode, type UserMode } from './userMode';

export default function UserModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<UserMode | null>(readStoredMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode ?? 'business';
  }, [mode]);

  const setMode = useCallback((nextMode: UserMode) => {
    setModeState(nextMode);
    try { window.localStorage.setItem(USER_MODE_STORAGE_KEY, nextMode); } catch { /* Storage may be unavailable; the session still works. */ }
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);
  return <UserModeContext.Provider value={value}>{children}</UserModeContext.Provider>;
}
