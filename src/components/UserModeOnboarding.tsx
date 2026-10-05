import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, BriefcaseBusiness, Code2, X } from 'lucide-react';
import type { UserMode } from '../state/userMode';
import './user-mode.css';

interface UserModeOnboardingProps {
  onSelect: (mode: UserMode) => void;
  onFinish: () => void;
  onDismiss: () => void;
}

const options = [
  {
    mode: 'business' as const,
    number: '01',
    title: 'Business',
    subtitle: 'For business leaders, founders, decision-makers and organizations evaluating cybersecurity solutions.',
    points: ['Understand your organization’s security exposure', 'Explore cybersecurity solutions', 'Discover Rakshak AI', 'Evaluate security services', 'Request a security assessment'],
    action: 'Enter business mode',
    icon: BriefcaseBusiness,
  },
  {
    mode: 'technical' as const,
    number: '02',
    title: 'Developer / Security Engineer',
    subtitle: 'For cybersecurity professionals, developers, engineers, researchers and technical teams.',
    points: ['Explore security intelligence', 'Understand Rakshak AI', 'View technical capabilities', 'Explore security architecture', 'Analyze security workflows', 'Explore technical demonstrations'],
    action: 'Enter technical mode',
    icon: Code2,
  },
];

export default function UserModeOnboarding({ onSelect, onFinish, onDismiss }: UserModeOnboardingProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [selected, setSelected] = useState<UserMode | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => firstOptionRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, []);

  const choose = (mode: UserMode) => {
    if (selected) return;
    setSelected(mode);
    onSelect(mode);
    timerRef.current = window.setTimeout(onFinish, 420);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onDismiss();
  };

  return createPortal(
    <dialog ref={dialogRef} className={`mode-onboarding ${selected ? `is-selecting is-${selected}` : ''}`} aria-labelledby="mode-onboarding-title" onCancel={(event) => { event.preventDefault(); onDismiss(); }} onClick={handleBackdropClick}>
      <div className="mode-onboarding__frame">
        <header className="mode-onboarding__header">
          <div className="mode-onboarding__brand" aria-label="CyberHiveX Technologies">
            <span className="mode-onboarding__mark">X</span>
            <span><strong>CyberHiveX</strong><small>TECHNOLOGIES</small></span>
          </div>
          <button type="button" className="mode-onboarding__close" aria-label="Continue without selecting a mode" onClick={onDismiss}><X size={18} aria-hidden="true" /></button>
        </header>
        <div className="mode-onboarding__content">
          <div className="mode-onboarding__intro"><span className="mode-onboarding__eyebrow">Personalize your experience / 00</span><h1 id="mode-onboarding-title">How will you use CyberHiveX?</h1><p>Choose the experience that best matches your role. You can change this preference anytime.</p></div>
          <div className="mode-options" aria-label="Choose a CyberHiveX experience">
            {options.map(({ mode, number, title, subtitle, points, action, icon: Icon }, index) => (
              <button type="button" ref={index === 0 ? firstOptionRef : undefined} className={`mode-card mode-card--${mode}`} key={mode} onClick={() => choose(mode)} aria-describedby={`mode-${mode}-description`}>
                <span className="mode-card__topline"><span>{number} / EXPERIENCE</span><Icon size={20} aria-hidden="true" /></span>
                <span className="mode-card__title">{title}</span>
                <span className="mode-card__subtitle" id={`mode-${mode}-description`}>{subtitle}</span>
                <span className="mode-card__points">{points.map(point => <span key={point}><i aria-hidden="true" />{point}</span>)}</span>
                <span className="mode-card__action">{action}<ArrowRight size={16} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </div>
        <footer className="mode-onboarding__footer"><span>CyberHiveX Technologies</span><span>You can change your experience anytime from Preferences.</span><button type="button" onClick={onDismiss}>Continue without selecting</button></footer>
      </div>
    </dialog>, document.body,
  );
}
