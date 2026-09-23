/**
 * CYBERHIVEX TECHNOLOGY — Why CyberHiveX Capability Simulator (Section 15)
 * Renders interactive canvas animations for PROACTIVE, INTELLIGENT, CONTINUOUS, TRUSTED.
 */
import { cyberAudio } from './audio.js';

const WHY_MODES = [
  {
    key: 'PROACTIVE',
    title: 'PROACTIVE THREAT HUNTING',
    desc: 'Deep perimeter forward-sweep actively probing and eliminating zero-day exposures before adversaries advance.',
    metric: 'PRE-EMPTION SPEED: SUB-SECOND | EXPOSURE REDUCTION: 99.8%',
    color: '#00F3FF'
  },
  {
    key: 'INTELLIGENT',
    title: 'PROPRIETARY NEURAL COGNITION',
    desc: 'Self-optimizing graph neural networks deciphering multi-stage adversary tactics across massive datasets.',
    metric: 'NEURAL CLUSTERS: 42,000 MODELS | HEURISTIC REASONING: ACTIVE',
    color: '#00FFAA'
  },
  {
    key: 'CONTINUOUS',
    title: 'UNBROKEN 24/7/365 SURVEILLANCE',
    desc: 'Continuous real-time risk re-evaluation and uninterrupted defensive updates without downtime.',
    metric: 'TELEMETRY UPTIME: 100.00% | CONTINUOUS EVALUATION: 1.8M EPS',
    color: '#33F6FF'
  },
  {
    key: 'TRUSTED',
    title: 'MATHEMATICAL & CRYPTOGRAPHIC ASSURANCE',
    desc: 'Hardware TPM attestation and immutable audit ledgers creating verifiable trust across every transaction.',
    metric: 'INTEGRITY STANDARD: KYBER PQC READY | NON-REPUDIATION: 100%',
    color: '#00F3FF'
  }
];

export function initWhyVisualizer() {
  const canvas = document.getElementById('why-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;
  let activeIndex = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const newWidth = Math.floor(rect.width);
    const newHeight = Math.floor(rect.height);

    if (newWidth === width && newHeight === height && width > 0) return;
    width = newWidth;
    height = newHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    const mode = WHY_MODES[activeIndex];
    const centerX = width / 2;
    const centerY = (height - 75) / 2;

    // Background Matrix Grid
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, height - 70);
      ctx.stroke();
    }
    for (let y = 0; y < height - 70; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (activeIndex === 0) {
      // 1. PROACTIVE: Forward-Sweeping Tactical Radar
      const rAngle = time * 0.0035;
      const maxR = Math.min(width, height - 80) * 0.42;

      // Radar boundary rings
      [maxR * 0.35, maxR * 0.7, maxR].forEach(r => {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Rotating radar beam
      const sweepGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxR);
      sweepGrad.addColorStop(0, 'rgba(0, 243, 255, 0.4)');
      sweepGrad.addColorStop(1, 'transparent');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxR, rAngle - 0.4, rAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#00F3FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(rAngle) * maxR, centerY + Math.sin(rAngle) * maxR);
      ctx.stroke();

      // Intercepted threat blip being neutralized
      const bx = centerX + Math.cos(rAngle - 0.3) * (maxR * 0.65);
      const by = centerY + Math.sin(rAngle - 0.3) * (maxR * 0.65);
      ctx.fillStyle = '#FF3366';
      ctx.shadowColor = '#FF3366';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00F3FF';
      ctx.textAlign = 'center';
      ctx.fillText('PROACTIVE RECON // THREAT NEUTRALIZED BEFORE WEAPONIZATION', centerX, centerY - maxR - 8);

    } else if (activeIndex === 1) {
      // 2. INTELLIGENT: Multilayer Neural Synapse Graph
      const numNodes = 8;
      const step = width / (numNodes + 1);

      ctx.strokeStyle = 'rgba(0, 255, 170, 0.3)';
      ctx.lineWidth = 1.2;

      for (let i = 0; i < numNodes; i++) {
        const nx = step * (i + 1);
        const ny = centerY + Math.sin(time * 0.004 + i) * 35;

        if (i < numNodes - 1) {
          const nextX = step * (i + 2);
          const nextY = centerY + Math.sin(time * 0.004 + i + 1) * 35;
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();

          // Cross links
          const crossY = centerY - Math.sin(time * 0.004 + i + 1) * 35;
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(nextX, crossY);
          ctx.stroke();
        }

        ctx.fillStyle = '#05070A';
        ctx.strokeStyle = '#00FFAA';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FFAA';
      ctx.textAlign = 'center';
      ctx.fillText('NEURAL HEURISTIC MESH // ADVERSARY BEHAVIOR DECODED', centerX, centerY - 55);

    } else if (activeIndex === 2) {
      // 3. CONTINUOUS: Perpetually Orbiting Loop
      const r = Math.min(width, height - 80) * 0.34;

      ctx.strokeStyle = 'rgba(51, 246, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting pulse satellites
      for (let i = 0; i < 4; i++) {
        const a = time * 0.002 + (i * Math.PI) / 2;
        const ox = centerX + Math.cos(a) * r;
        const oy = centerY + Math.sin(a) * r;

        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#33F6FF';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(ox, oy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#33F6FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ox, oy, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#33F6FF';
      ctx.textAlign = 'center';
      ctx.fillText('24/7/365 UNBROKEN DEFENSE', centerX, centerY - 4);
      ctx.font = '8.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('DYNAMIC TRUST ENGINE // 0ms BLIND SPOTS', centerX, centerY + 12);

    } else {
      // 4. TRUSTED: Cryptographic Quantum Vault
      const hexR = Math.min(width, height - 80) * 0.36;
      const sPulse = Math.sin(time * 0.004) * 4;

      ctx.strokeStyle = '#00F3FF';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00F3FF';
      ctx.shadowBlur = 15;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = centerX + Math.cos(a) * (hexR + sPulse);
        const hy = centerY + Math.sin(a) * (hexR + sPulse);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Key Lock
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔒', centerX, centerY + 2);

      ctx.font = '700 9.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00F3FF';
      ctx.fillText('POST-QUANTUM CRYPTOGRAPHY VERIFIED', centerX, centerY + 26);
    }

    // --- BOTTOM TELEMETRY HUD ON CANVAS ---
    const hudW = Math.min(width - 24, 600);
    const hudH = 64;
    const hudX = (width - hudW) / 2;
    const hudY = height - hudH - 8;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 10, 0.94)';
    ctx.strokeStyle = mode.color;
    ctx.lineWidth = 1.2;
    ctx.shadowColor = mode.color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.roundRect(hudX, hudY, hudW, hudH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Beacon
    ctx.fillStyle = mode.color;
    ctx.beginPath();
    ctx.arc(hudX + 16, hudY + 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`${mode.key} // ${mode.title}`, hudX + 28, hudY + 20);

    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(mode.desc, hudX + 16, hudY + 38);

    ctx.fillStyle = mode.color;
    ctx.fillText(`● ${mode.metric}`, hudX + 16, hudY + 52);

    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  // Bind Why Cards
  const whyCards = document.querySelectorAll('.why-card');

  function selectWhy(index) {
    if (index < 0 || index >= WHY_MODES.length) return;
    activeIndex = index;

    whyCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('active');
        card.setAttribute('aria-expanded', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-expanded', 'false');
      }
    });

    cyberAudio.playIntercept();
  }

  whyCards.forEach((card, idx) => {
    card.addEventListener('click', () => selectWhy(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectWhy(idx);
      }
    });
  });

  let resizeTimer = null;
  function debouncedResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(resize);
  }
  window.addEventListener('resize', debouncedResize);
  resize();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(canvas);
}
