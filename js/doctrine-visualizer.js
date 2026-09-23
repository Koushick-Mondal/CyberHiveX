/**
 * CYBERHIVEX TECHNOLOGY — Tactical Doctrine Simulator (Section 7)
 * Renders interactive canvas animations for DETECT, UNDERSTAND, RESPOND.
 */
import { cyberAudio } from './audio.js';

const DOCTRINE_MODES = [
  {
    step: '01',
    title: 'DETECT',
    subtitle: 'MATHEMATICAL BASELINE DEVIATION',
    desc: 'Unsupervised autoencoders flag abnormal thread variance the instant it deviates, before signatures exist.',
    metric: 'DETECTION LATENCY: 0.84ms | HEURISTIC ACCURACY: 99.94%',
    color: '#00F3FF'
  },
  {
    step: '02',
    title: 'UNDERSTAND',
    subtitle: 'CONTEXTUAL ATTACK GRAPH REASONING',
    desc: 'Cross-correlates multi-domain signals across cloud, host & identity to map full adversary intent.',
    metric: 'GRAPH HOPS MAPPED: 4 STAGES | ATTACKER INTENT: PRIVILEGE ESCALATION',
    color: '#FFAA00'
  },
  {
    step: '03',
    title: 'RESPOND',
    subtitle: 'AUTONOMOUS MILLISECOND CONTAINMENT',
    desc: 'Automated quarantine severed compromised execution thread while benign services operate uninterrupted.',
    metric: 'CONTAINMENT SPEED: 11.4ms | INFRASTRUCTURE DISRUPTION: 0.00%',
    color: '#00FFAA'
  }
];

export function initDoctrineVisualizer() {
  const canvas = document.getElementById('doctrine-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;
  let activeMode = 0;

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

    const mode = DOCTRINE_MODES[activeMode];
    const centerX = width / 2;
    const centerY = (height - 75) / 2;

    // Background Matrix grid
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

    if (activeMode === 0) {
      // 01 DETECT: Mathematical Baseline vs Abnormal Probe
      // Normal baseline wave
      ctx.strokeStyle = '#00F3FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 20; x < width - 20; x += 3) {
        const y = centerY + Math.sin(time * 0.006 + x * 0.03) * 22;
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Abnormal Incursion Spike
      const spikeX = width * 0.62;
      const spikeY = centerY - 55 + Math.sin(time * 0.015) * 12;

      ctx.strokeStyle = '#FF3366';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#FF3366';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(spikeX, spikeY, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Rotating Target Brackets
      ctx.save();
      ctx.translate(spikeX, spikeY);
      ctx.rotate(time * 0.003);
      ctx.strokeStyle = '#FF3366';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-24, -24, 48, 48);
      ctx.restore();

      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FF3366';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ ANOMALY DETECTED // ZERO-DAY PROBE INTERCEPTED', spikeX, spikeY - 36);

    } else if (activeMode === 1) {
      // 02 UNDERSTAND: Attack Graph Reasoning
      const nodes = [
        { label: 'INGRESS_PROBE', x: width * 0.18, y: centerY - 25, isThreat: false },
        { label: 'COMPROMISED_SVC', x: width * 0.42, y: centerY + 28, isThreat: true },
        { label: 'PRIV_ESCALATION', x: width * 0.65, y: centerY - 32, isThreat: true },
        { label: 'TARGET_DATASTORE', x: width * 0.88, y: centerY + 18, isThreat: true }
      ];

      // Correlation lines with travelling pulses
      ctx.strokeStyle = '#FFAA00';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      nodes.forEach((n, idx) => {
        if (idx === 0) ctx.moveTo(n.x, n.y);
        else ctx.lineTo(n.x, n.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling signal packet
      const packetProgress = (time * 0.0012) % 3;
      const seg = Math.floor(packetProgress);
      const segT = packetProgress - seg;
      if (seg < 3) {
        const p1 = nodes[seg];
        const p2 = nodes[seg + 1];
        const px = p1.x + (p2.x - p1.x) * segT;
        const py = p1.y + (p2.y - p1.y) * segT;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFAA00';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      nodes.forEach((n, idx) => {
        ctx.fillStyle = '#05070A';
        ctx.strokeStyle = idx === 0 ? '#00F3FF' : '#FFAA00';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = idx === 0 ? '#00F3FF' : '#FFAA00';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '700 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 26);
      });

    } else {
      // 03 RESPOND: Precision Autonomous Containment
      const rPulse = Math.sin(time * 0.004) * 6;
      ctx.strokeStyle = '#00FFAA';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00FFAA';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 58 + rPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 170, 0.12)';
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Trapped threat icon inside
      ctx.fillStyle = '#FF3366';
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MALICIOUS SOCKET', centerX, centerY - 6);
      ctx.fillStyle = '#00FFAA';
      ctx.fillText('[MICRO-QUARANTINE ENFORCED: 11.4ms]', centerX, centerY + 12);
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
    ctx.fillText(`DOCTRINE ${mode.step} // ${mode.title} — ${mode.subtitle}`, hudX + 28, hudY + 20);

    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(mode.desc, hudX + 16, hudY + 38);

    ctx.fillStyle = mode.color;
    ctx.fillText(`● ${mode.metric}`, hudX + 16, hudY + 52);

    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  // Bind Stage Cards
  const stageCards = document.querySelectorAll('.stage-card');

  function selectMode(index) {
    if (index < 0 || index >= DOCTRINE_MODES.length) return;
    activeMode = index;

    stageCards.forEach((card, idx) => {
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

  stageCards.forEach((card, idx) => {
    card.addEventListener('click', () => selectMode(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectMode(idx);
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
