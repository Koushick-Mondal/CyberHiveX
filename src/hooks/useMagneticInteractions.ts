import { useEffect, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';

const TARGETS = '.ch-hero-actions .btn-cyber-primary, .ch-hero-actions .btn-cyber-outline, .ch-assessment-layout .btn-cyber-primary, .rk-product-actions .btn-cyber-primary, .sc-node';

/** Delegated fine-pointer interaction, bounded to 3.5px. No React frame updates or moving touch targets. */
export function useMagneticInteractions(rootRef: RefObject<HTMLElement | null>, routeKey: string) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !fine || reduced) return;
    let active: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let frame = 0;
    const touched = new Set<HTMLElement>();
    const reset = () => {
      cancelAnimationFrame(frame);
      if (active) { active.style.setProperty('--motion-mx', '0px'); active.style.setProperty('--motion-my', '0px'); delete active.dataset.magneticActive; }
      active = null; bounds = null;
    };
    const enter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      const target = event.target.closest(TARGETS);
      if (!(target instanceof HTMLElement) || !root.contains(target) || target.matches(':disabled, [aria-disabled="true"]') || active === target) return;
      reset(); active = target; bounds = target.getBoundingClientRect(); touched.add(target);
      target.dataset.magnetic = 'true'; target.dataset.magneticActive = 'true';
    };
    const move = (event: PointerEvent) => {
      if (!active || !bounds || event.buttons || event.pointerType !== 'mouse') return;
      const element = active;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      const amount = element.classList.contains('sc-node') ? 2.5 : 3.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { element.style.setProperty('--motion-mx', `${x * amount}px`); element.style.setProperty('--motion-my', `${y * amount}px`); });
    };
    const leave = (event: PointerEvent) => { if (active && (!(event.relatedTarget instanceof Node) || !active.contains(event.relatedTarget))) reset(); };
    const key = () => reset();
    root.addEventListener('pointerover', enter); root.addEventListener('pointermove', move); root.addEventListener('pointerout', leave); root.addEventListener('keydown', key);
    window.addEventListener('scroll', reset, { passive: true }); window.addEventListener('resize', reset); document.addEventListener('visibilitychange', reset);
    return () => {
      reset(); root.removeEventListener('pointerover', enter); root.removeEventListener('pointermove', move); root.removeEventListener('pointerout', leave); root.removeEventListener('keydown', key);
      window.removeEventListener('scroll', reset); window.removeEventListener('resize', reset); document.removeEventListener('visibilitychange', reset);
      for (const element of touched) { element.style.removeProperty('--motion-mx'); element.style.removeProperty('--motion-my'); delete element.dataset.magnetic; delete element.dataset.magneticActive; }
    };
  }, [rootRef, routeKey, fine, reduced]);
}
