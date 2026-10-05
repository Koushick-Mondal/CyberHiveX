import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/** Only the decorative number interpolates; assistive technology receives the actual fixture count. */
export default function AnimatedMetric({ value }: { value: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const displayed = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;
    let frame = 0;
    let started = false;
    const setValue = (next: number) => { displayed.current = next; if (span.textContent !== String(next)) span.textContent = String(next); };
    if (reduced || typeof IntersectionObserver === 'undefined') { setValue(value); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) { if (started) { cancelAnimationFrame(frame); setValue(value); observer.disconnect(); } return; }
      if (started) return;
      started = true;
      const from = displayed.current;
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min(1, (now - start) / 650);
        if (document.hidden) { setValue(value); observer.disconnect(); return; }
        setValue(Math.round(from + (value - from) * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(update);
        else observer.disconnect();
      };
      frame = requestAnimationFrame(update);
    }, { threshold: .5 });
    observer.observe(span);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); setValue(value); };
  }, [value, reduced]);
  return <strong className="rk-animated-metric"><span ref={spanRef} aria-hidden="true">{value}</span><span className="rk-sr-only">{value}</span></strong>;
}
