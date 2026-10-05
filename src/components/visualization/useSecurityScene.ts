import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SCENE_STAGES } from './securitySceneFixtures';

export function useSecurityScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const started = useRef(false);
  const enabled = inView && pageVisible && !reducedMotion;

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  useEffect(() => {
    if (!enabled || started.current) return;
    const timer = window.setTimeout(() => { started.current = true; setPlaying(true); }, 800);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    if (!playing || !enabled) return;
    const timer = window.setTimeout(() => {
      if (stageIndex === SCENE_STAGES.length - 1) { setStageIndex(1); setPlaying(false); setFinished(true); }
      else setStageIndex(current => current + 1);
    }, SCENE_STAGES[stageIndex].duration);
    return () => window.clearTimeout(timer);
  }, [playing, enabled, stageIndex]);

  // Pointer/scroll depth writes transform-only CSS variables, never per-frame React state.
  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    let frame = 0;
    let bounds: DOMRect | null = null;
    const reset = () => { element.style.setProperty('--scene-x', '0px'); element.style.setProperty('--scene-y', '0px'); };
    reset();
    element.style.setProperty('--scene-scroll', '0');
    if (!enabled || !finePointer) return;
    const enter = () => { bounds = element.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      if (!bounds) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { element.style.setProperty('--scene-x', `${x * 6}px`); element.style.setProperty('--scene-y', `${y * 4}px`); });
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        bounds = element.getBoundingClientRect();
        element.style.setProperty('--scene-scroll', String(Math.max(0, Math.min(1, -bounds.top / bounds.height))));
      });
    };
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); reset(); element.removeEventListener('pointerenter', enter); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); window.removeEventListener('scroll', scroll); };
  }, [enabled, finePointer]);

  const pause = () => { started.current = true; setPlaying(false); };
  const togglePlayback = () => {
    started.current = true;
    if (finished) { setStageIndex(0); setFinished(false); }
    setPlaying(current => !current);
  };
  const next = () => {
    started.current = true; setPlaying(false); setFinished(false);
    if (stageIndex === SCENE_STAGES.length - 1) { setStageIndex(1); setFinished(true); }
    else setStageIndex(current => current + 1);
  };
  const reset = () => { started.current = true; setPlaying(false); setStageIndex(0); setFinished(false); };
  return { sceneRef, reducedMotion, stageIndex, stage: SCENE_STAGES[stageIndex], playing, animated: playing && enabled, finished, togglePlayback, next, reset, pause };
}
