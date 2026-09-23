/**
 * CYBERHIVEX TECHNOLOGY — Hero Digital Security Core & Threat Deflector Canvas
 */
import { cyberAudio } from './audio.js';

export function initHeroCore() {
  const canvas = document.getElementById('hero-core-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const statusTicker = document.getElementById('hero-status-ticker');
  let animationFrameId = null;
  let isPaused = false;

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;

  // Orbiting Infrastructure Nodes
  const nodes = [
    { label: 'ENTERPRISE AI', orbit: 95, speed: 0.008, angle: 0, color: '#00F3FF' },
    { label: 'CLOUD CLUSTER', orbit: 135, speed: -0.006, angle: Math.PI / 3, color: '#00D4FF' },
    { label: 'IDENTITY VAULT', orbit: 175, speed: 0.005, angle: (2 * Math.PI) / 3, color: '#00FFAA' },
    { label: 'CRITICAL SERVERS', orbit: 115, speed: -0.009, angle: Math.PI, color: '#88B4E8' },
    { label: 'CONNECTED APIS', orbit: 155, speed: 0.007, angle: (4 * Math.PI) / 3, color: '#00F3FF' },
    { label: 'DATA REPOSITORY', orbit: 195, speed: -0.004, angle: (5 * Math.PI) / 3, color: '#33F6FF' }
  ];

  // Shield Radius
  const shieldRadius = 210;
  let shieldPulse = 0;

  // Threat particles attempting to penetrate
  const threats = [];
  const maxThreats = 14;

  // Shockwave rings upon interception
  const shockwaves = [];

  // Defense status cycle
  const statusStages = [
    { text: 'THREAT DETECTED', color: '#FF3366' },
    { text: 'IDENTITY VERIFIED', color: '#00F3FF' },
    { text: 'ACCESS ANALYZED', color: '#88B4E8' },
    { text: 'THREAT NEUTRALIZED', color: '#00FFAA' }
  ];
  let stageIndex = 0;
  let stageTimer = 0;

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

  function spawnThreat() {
    if (threats.length >= maxThreats) return;
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = Math.max(width, height) * 0.48;
    threats.push({
      x: centerX + Math.cos(angle) * spawnDist,
      y: centerY + Math.sin(angle) * spawnDist,
      vx: -Math.cos(angle) * (1.2 + Math.random() * 0.8),
      vy: -Math.sin(angle) * (1.2 + Math.random() * 0.8),
      radius: 2.5 + Math.random() * 2,
      opacity: 0.8 + Math.random() * 0.2,
      intercepted: false
    });
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // Dynamic rotation angles
    shieldPulse += 0.02;
    const corePulse = Math.sin(shieldPulse) * 4;

    // 1. Draw Defense Perimeter Rings (Zero-Trust Shield Boundary)
    ctx.save();
    ctx.translate(centerX, centerY);

    // Outer Reticle Ring
    ctx.beginPath();
    ctx.arc(0, 0, shieldRadius + corePulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([12, 10, 4, 10]);
    ctx.stroke();

    // Rotating Shield Segment
    ctx.rotate(time * 0.0003);
    ctx.beginPath();
    ctx.arc(0, 0, shieldRadius - 15, 0, Math.PI * 1.5);
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([40, 20]);
    ctx.stroke();
    ctx.restore();

    // 2. Draw Orbiting Infrastructure Nodes & Data Streams
    nodes.forEach(node => {
      node.angle += node.speed;
      const nx = centerX + Math.cos(node.angle) * node.orbit;
      const ny = centerY + Math.sin(node.angle) * node.orbit;

      // Data Stream line to center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbit Path
      ctx.beginPath();
      ctx.arc(centerX, centerY, node.orbit, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Node point
      ctx.beginPath();
      ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Mini text label
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(226, 241, 255, 0.55)';
      ctx.fillText(node.label, nx + 7, ny + 3);
    });

    // 3. Central Digital Security Core
    const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 50 + corePulse);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.2, '#00F3FF');
    grad.addColorStop(0.6, 'rgba(0, 163, 255, 0.4)');
    grad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 48 + corePulse, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Solid inner core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#05070A';
    ctx.strokeStyle = '#00F3FF';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00F3FF';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Update and Draw Threats (Red/Amber Particles)
    if (Math.random() < 0.08) {
      spawnThreat();
    }

    for (let i = threats.length - 1; i >= 0; i--) {
      const t = threats[i];
      t.x += t.vx;
      t.y += t.vy;

      const dist = Math.hypot(t.x - centerX, t.y - centerY);

      // Deflected by security shield!
      if (dist <= shieldRadius + 5 && !t.intercepted) {
        t.intercepted = true;
        shockwaves.push({
          x: t.x,
          y: t.y,
          radius: 4,
          maxRadius: 36,
          opacity: 1
        });
        cyberAudio.playIntercept();
        threats.splice(i, 1);
        continue;
      }

      // Draw Threat Particle & Trailing Incursion Line
      ctx.beginPath();
      ctx.moveTo(t.x - t.vx * 4, t.y - t.vy * 4);
      ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = 'rgba(255, 51, 102, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FF3366';
      ctx.shadowColor = '#FF3366';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 5. Draw Intercept Shockwaves (Defense Deflection Waves)
    for (let j = shockwaves.length - 1; j >= 0; j--) {
      const sw = shockwaves[j];
      sw.radius += 1.8;
      sw.opacity -= 0.04;

      if (sw.opacity <= 0) {
        shockwaves.splice(j, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 243, 255, ${sw.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 6. Update Status Ticker
    stageTimer++;
    if (stageTimer > 130) {
      stageTimer = 0;
      stageIndex = (stageIndex + 1) % statusStages.length;
      if (statusTicker) {
        statusTicker.textContent = statusStages[stageIndex].text;
        statusTicker.style.color = statusStages[stageIndex].color;
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  let resizeTimer = null;
  function debouncedResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(resize);
  }
  window.addEventListener('resize', debouncedResize);
  resize();
  animationFrameId = requestAnimationFrame(render);

  // Performance optimization using IntersectionObserver
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
