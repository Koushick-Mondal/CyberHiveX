import { useEffect, useRef, useState } from 'react';
import { Check, SlidersHorizontal } from 'lucide-react';
import useUserMode, { type UserMode } from '../state/useUserMode';
import './user-mode.css';

export default function UserModeControl() {
  const { mode, setMode } = useUserMode();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDetailsElement>(null);
  const label = mode === 'technical' ? 'Technical mode' : 'Business mode';
  useEffect(() => {
    const close = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  const choose = (nextMode: UserMode) => { setMode(nextMode); setOpen(false); if (rootRef.current) rootRef.current.open = false; };
  return <details ref={rootRef} className="mode-control" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary><SlidersHorizontal size={14} aria-hidden="true" /><span>{label}</span></summary>
    <div className="mode-control__menu" role="group" aria-label="Change experience mode">
      <p>Change your experience</p>
      <button type="button" className={mode === 'business' ? 'is-active' : ''} onClick={() => choose('business')}><span><strong>Business mode</strong><small>Light, outcome-focused experience</small></span>{mode === 'business' && <Check size={15} aria-hidden="true" />}</button>
      <button type="button" className={mode === 'technical' ? 'is-active' : ''} onClick={() => choose('technical')}><span><strong>Developer / Security Engineer</strong><small>Dark, technical experience</small></span>{mode === 'technical' && <Check size={15} aria-hidden="true" />}</button>
    </div>
  </details>;
}
