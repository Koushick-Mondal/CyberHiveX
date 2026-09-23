/**
 * CYBERHIVEX TECHNOLOGY — Digital Trust Perimeter Visualizer (Section 9)
 * Renders glowing trust layer surrounding Users, Devices, Apps, Cloud, Data, Business Systems.
 * Interactive interrogation question controls with animated on-canvas telemetry HUD.
 */
import { cyberAudio } from './audio.js';

const TRUST_QUESTIONS = [
  {
    q: 'WHO ARE YOU?',
    resolution: 'CRYPTOGRAPHIC ATTESTATION',
    targetIndices: [0, 1], // USERS & ROLES, CONNECTED DEVICES
    telemetry: 'HARDWARE ROOT: TPM 2.0 ENCLAVE LEVEL 4',
    badge: 'VERIFIED MUTUAL TLS 1.3',
    color: '#00FFAA'
  },
  {
    q: 'WHAT ARE YOU ALLOWED TO ACCESS?',
    resolution: 'LEAST-PRIVILEGE ENFORCED',
    targetIndices: [2, 3], // APPLICATIONS & APIS, HYBRID CLOUD
    telemetry: 'RBAC/ABAC: EPHEMERAL JIT TOKEN (0% STANDING)',
    badge: 'ZERO-TRUST GATE',
    color: '#00F3FF'
  },
  {
    q: 'IS THIS ACTIVITY TRUSTED?',
    resolution: 'BEHAVIORAL AI ASSESSED',
    targetIndices: [5], // BUSINESS WORKFLOWS
    telemetry: 'ANOMALY ENTROPY: 0.0014 (BENIGN EXECUTION)',
    badge: 'REAL-TIME HEURISTIC',
    color: '#00FFAA'
  },
  {
    q: 'WHAT HAPPENED BEFORE?',
    resolution: 'IMMUTABLE AUDIT TRAIL',
    targetIndices: [4], // ENTERPRISE DATA
    telemetry: 'CRYPTO LEDGER: MERKLE ROOT PROOF SEALED',
    badge: 'NON-REPUDIATION PROVEN',
    color: '#33F6FF'
  }
];

export function initDigitalTrust() {
  const canvas = document.getElementById('trust-perimeter-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;

  let activeQuestionIndex = 0;

  const entities = [
    { label: 'USERS & ROLES', icon: '👤', angle: 0 },
    { label: 'CONNECTED DEVICES', icon: '💻', angle: Math.PI / 3 },
    { label: 'APPLICATIONS & APIS', icon: '⚡', angle: (2 * Math.PI) / 3 },
    { label: 'HYBRID CLOUD', icon: '☁️', angle: Math.PI },
    { label: 'ENTERPRISE DATA', icon: '🔒', angle: (4 * Math.PI) / 3 },
    { label: 'BUSINESS WORKFLOWS', icon: '🔄', angle: (5 * Math.PI) / 3 }
  ];

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

    centerX = width / 2;
    centerY = height / 2;
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width, height) * 0.35;
    const pulse = Math.sin(time * 0.002) * 5;

    const currentQ = TRUST_QUESTIONS[activeQuestionIndex];

    // 1. Draw Glowing Trust Perimeter Boundary
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 25 + pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([14, 8]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 255, 170, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.stroke();

    // 2. Mutual Interrogation Mesh Between Entities
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const e1 = entities[i];
        const e2 = entities[j];

        const x1 = centerX + Math.cos(e1.angle + time * 0.0002) * radius;
        const y1 = centerY + Math.sin(e1.angle + time * 0.0002) * radius;
        const x2 = centerX + Math.cos(e2.angle + time * 0.0002) * radius;
        const y2 = centerY + Math.sin(e2.angle + time * 0.0002) * radius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // 3. Central Trust Root Hub
    const corePulse = Math.sin(time * 0.004) * 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38 + corePulse, 0, Math.PI * 2);
    ctx.fillStyle = '#05070A';
    ctx.strokeStyle = currentQ.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = currentQ.color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = '700 8.5px "JetBrains Mono", monospace';
    ctx.fillStyle = currentQ.color;
    ctx.textAlign = 'center';
    ctx.fillText('DIGITAL TRUST', centerX, centerY - 2);
    ctx.fillText('ROOT', centerX, centerY + 10);

    // 4. Orbiting Entities & Dynamic Interrogation Lasers
    entities.forEach((entity, idx) => {
      const curAngle = entity.angle + time * 0.0002;
      const ex = centerX + Math.cos(curAngle) * radius;
      const ey = centerY + Math.sin(curAngle) * radius;

      const isTarget = currentQ.targetIndices.includes(idx);

      // Verification link to center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(ex, ey);
      if (isTarget) {
        ctx.strokeStyle = currentQ.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = currentQ.color;
        ctx.shadowBlur = 12;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = 'rgba(0, 255, 170, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);

      // Entity Circle
      ctx.beginPath();
      ctx.arc(ex, ey, isTarget ? 24 : 20, 0, Math.PI * 2);
      ctx.fillStyle = isTarget ? 'rgba(0, 243, 255, 0.22)' : 'rgba(11, 18, 32, 0.9)';
      ctx.strokeStyle = isTarget ? currentQ.color : '#00F3FF';
      ctx.lineWidth = isTarget ? 2.5 : 1.6;
      if (isTarget) {
        ctx.shadowColor = currentQ.color;
        ctx.shadowBlur = 15;
      }
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Icon & Label
      ctx.font = '14px sans-serif';
      ctx.fillText(entity.icon, ex, ey + 4);

      ctx.font = isTarget ? '700 9px "JetBrains Mono", monospace' : '700 8px "JetBrains Mono", monospace';
      ctx.fillStyle = isTarget ? '#FFFFFF' : '#94A3B8';
      ctx.fillText(entity.label, ex, ey + 34);
    });

    // 5. Dynamic On-Canvas Interrogation HUD (Bottom Overlay)
    const hudW = Math.min(width - 24, 430);
    const hudH = 74;
    const hudX = (width - hudW) / 2;
    const hudY = height - hudH - 12;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 10, 0.92)';
    ctx.strokeStyle = currentQ.color;
    ctx.lineWidth = 1.2;
    ctx.shadowColor = 'rgba(0, 243, 255, 0.25)';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.roundRect(hudX, hudY, hudW, hudH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Glowing active beacon
    const blink = Math.sin(time * 0.006) > 0;
    ctx.fillStyle = blink ? currentQ.color : '#FFFFFF';
    ctx.shadowColor = currentQ.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(hudX + 16, hudY + 18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Question Title on Canvas
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`${currentQ.q} // ${currentQ.resolution}`, hudX + 28, hudY + 22);

    // Status / Telemetry
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = currentQ.color;
    ctx.fillText(`● STATUS: ${currentQ.badge}`, hudX + 16, hudY + 41);

    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`● ${currentQ.telemetry}`, hudX + 16, hudY + 57);

    // Dynamic mini widget in right corner
    const gx = hudX + hudW - 55;
    const gy = hudY + 22;

    if (activeQuestionIndex === 0) {
      // Key Handshake Ring
      ctx.strokeStyle = '#00FFAA';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(gx + 20, gy + 4, 11, time * 0.004, time * 0.004 + Math.PI * 1.6);
      ctx.stroke();
    } else if (activeQuestionIndex === 1) {
      // Boundary Gate
      ctx.strokeStyle = '#00F3FF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(gx + 6, gy - 6, 28, 20);
      ctx.fillStyle = '#00F3FF';
      ctx.fillRect(gx + 12, gy + 1, 16, 6);
    } else if (activeQuestionIndex === 2) {
      // Anomaly Wave
      ctx.strokeStyle = '#00FFAA';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < 36; x += 2) {
        const y = Math.sin(time * 0.01 + x * 0.3) * 7;
        if (x === 0) ctx.moveTo(gx + x, gy + 4 + y);
        else ctx.lineTo(gx + x, gy + 4 + y);
      }
      ctx.stroke();
    } else {
      // Blockchain blocks
      ctx.strokeStyle = '#33F6FF';
      ctx.lineWidth = 1;
      for (let b = 0; b < 3; b++) {
        ctx.strokeRect(gx + b * 12, gy - 4, 8, 16);
      }
    }

    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  // --- Wire Interrogation Question Cards ---
  const questionCards = document.querySelectorAll('.interrogation-question-card');

  function selectQuestion(index) {
    if (index < 0 || index >= TRUST_QUESTIONS.length) return;
    activeQuestionIndex = index;

    questionCards.forEach((card, idx) => {
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

  questionCards.forEach((card, idx) => {
    card.addEventListener('click', () => selectQuestion(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectQuestion(idx);
      }
    });
  });

  // Canvas entity click binding
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const radius = Math.min(width, height) * 0.35;

    entities.forEach((entity, idx) => {
      const curAngle = entity.angle + (performance.now() * 0.0002);
      const ex = centerX + Math.cos(curAngle) * radius;
      const ey = centerY + Math.sin(curAngle) * radius;
      if (Math.hypot(clickX - ex, clickY - ey) < 30) {
        // Map entity to relevant question
        if (idx === 0 || idx === 1) selectQuestion(0);
        else if (idx === 2 || idx === 3) selectQuestion(1);
        else if (idx === 5) selectQuestion(2);
        else if (idx === 4) selectQuestion(3);
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
