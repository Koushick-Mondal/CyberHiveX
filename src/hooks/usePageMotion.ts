import { useEffect, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';

const GROUPS = [
  '.ch-home-section .ch-section-heading', '.ch-product-intro', '.ch-evidence-layout > div',
  '.ch-operations', '.ch-pipeline-detail', '.ch-stage-detail', '.ch-audience-explorer', '.ch-assessment-layout',
  '.pg-section > .section-header', '.pg-flow', '.pg-methodology', '.rk-product-section .section-header',
  '.rk-module-content', '.rk-posture', '.rk-overview-cards', '.rk-subpanel', '.rk-timeline > li', '.rk-bar',
].join(',');

/** One-shot, transform-only group entrances. Content is visible without JavaScript or observers. */
export function usePageMotion(rootRef: RefObject<HTMLElement | null>, routeKey: string) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || typeof IntersectionObserver === 'undefined') return;
    const seen = new WeakSet<Element>();
    const registered = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    const finish = (element: HTMLElement) => { animations.get(element)?.cancel(); animations.delete(element); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        const element = entry.target;
        observer.unobserve(element);
        if (seen.has(element)) continue;
        seen.add(element);
        element.dataset.motionSeen = 'true';
        if (document.hidden || element.contains(document.activeElement)) continue;
        const bar = element.classList.contains('rk-bar');
        const timeline = element.parentElement?.classList.contains('rk-timeline');
        const index = timeline && element.parentElement ? [...element.parentElement.children].indexOf(element) : 0;
        if (bar) element.style.transformOrigin = 'left center';
        const animation = element.animate(bar ? [{ transform: 'scaleX(.02)' }, { transform: 'scaleX(1)' }] : [{ opacity: .75, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], {
          duration: bar ? 640 : 520, delay: timeline ? Math.min(index * 55, 220) : 0, easing: 'cubic-bezier(.2,.7,.2,1)',
        });
        animations.set(element, animation);
        animation.onfinish = () => { animations.delete(element); animation.cancel(); };
      }
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    const register = (element: Element) => {
      if (!(element instanceof HTMLElement) || registered.has(element)) return;
      // Product intro is a single meaningful group, rather than two nested reveals.
      if (element.classList.contains('ch-section-heading') && element.closest('.ch-product-intro, .ch-evidence-layout')) return;
      registered.add(element); observer.observe(element);
    };
    const discover = (element: Element) => { if (element.matches(GROUPS)) register(element); element.querySelectorAll(GROUPS).forEach(register); };
    const forget = (element: Element) => {
      if (!(element instanceof HTMLElement)) return;
      observer.unobserve(element); registered.delete(element); finish(element);
    };
    discover(root);
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (node instanceof Element) { forget(node); node.querySelectorAll(GROUPS).forEach(forget); }
        for (const node of record.addedNodes) if (node instanceof Element) discover(node);
      }
    });
    mutations.observe(root, { childList: true, subtree: true });
    const focus = (event: FocusEvent) => { if (!(event.target instanceof Element)) return; for (const element of animations.keys()) if (element.contains(event.target)) finish(element); };
    const visibility = () => { if (document.hidden) for (const element of animations.keys()) finish(element); };
    root.addEventListener('focusin', focus);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect(); mutations.disconnect(); root.removeEventListener('focusin', focus); document.removeEventListener('visibilitychange', visibility);
      for (const element of animations.keys()) finish(element);
      for (const element of registered) { delete element.dataset.motionSeen; if (element.classList.contains('rk-bar')) element.style.removeProperty('transform-origin'); }
    };
  }, [rootRef, routeKey, reduced]);
}
