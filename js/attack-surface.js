/**
 * CYBERHIVEX TECHNOLOGY — Attack Surface Interactive Network Map (Section 5)
 * Visualizes surface vulnerability discovery & autonomous CyberHiveX defense containment.
 */
import { cyberAudio } from './audio.js';

export function initAttackSurface() {
  const canvas = document.getElementById('attack-surface-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;

  const surfaceEntities = [
    { id: 0, label: 'CLOUD VPC', category: 'Infrastructure', xRatio: 0.22, yRatio: 0.3 },
    { id: 1, label: 'USER IDENTITY', category: 'Access', xRatio: 0.38, yRatio: 0.22 },
    { id: 2, label: 'SaaS APPS', category: 'Applications', xRatio: 0.58, yRatio: 0.25 },
    { id: 3, label: 'REST APIS', category: 'Interface', xRatio: 0.78, yRatio: 0.35 },
    { id: 4, label: 'EMPLOYEE LAPTOPS', category: 'Endpoints', xRatio: 0.28, yRatio: 0.65 },
    { id: 5, label: 'CUSTOMER DATA', category: 'Data Layer', xRatio: 0.5, yRatio: 0.75 },
    { id: 6, label: 'MOBILE DEVICES', category: 'Mobile', xRatio: 0.72, yRatio: 0.68 },
    { id: 7, label: 'CI/CD PIPELINES', category: 'DevSecOps', xRatio: 0.82, yRatio: 0.5 },
    { id: 8, label: 'LEGACY SERVERS', category: 'Core Systems', xRatio: 0.15, yRatio: 0.52 },
    { id: 9, label: 'IoT HARDWARE', category: 'Perimeter', xRatio: 0.44, yRatio: 0.46 }
  ];

  let nodes = [];
  let links = [];
  let incursionLasers = [];
  let shockwaves = [];
  let simulationActive = false;

  function buildGraph() {
    nodes = surfaceEntities.map(e => ({
      ...e,
      x: e.xRatio * width,
      y: e.yRatio * height,
      baseRadius: 8,
      status: 'SECURE', // 'SECURE', 'COMPROMISED', 'HUNTING', 'CONTAINED'
      timer: 0,
      pulsePhase: Math.random() * Math.PI
    }));

    // Interconnect nodes
    links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < width * 0.4) {
          links.push({ source: nodes[i], target: nodes[j] });
        }
      }
    }
  }

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

    // Keep existing node statuses if already built
    if (nodes.length === 0) {
      buildGraph();
    } else {
      nodes.forEach(n => {
        n.x = n.xRatio * width;
        n.y = n.yRatio * height;
      });
    }
  }

  function updateHUDStatus(message, type = 'normal') {
    const hudEl = document.getElementById('surface-hud-banner');
    if (hudEl) {
      hudEl.textContent = message;
      hudEl.className = `surface-hud-banner ${type}`;
    }
  }

  // Trigger attack lifecycle on a specific node
  function infectNode(node) {
    if (!node) return;
    node.status = 'COMPROMISED';
    node.timer = 0;

    // Incoming laser attack path
    incursionLasers.push({
      targetX: node.x,
      targetY: node.y,
      startX: node.x < width / 2 ? 0 : width,
      startY: Math.random() * height,
      progress: 0,
      alpha: 1
    });

    // Threat shockwave ripple
    shockwaves.push({
      x: node.x,
      y: node.y,
      radius: 8,
      maxRadius: 40,
      color: '#FF3366',
      alpha: 1
    });

    cyberAudio.playAlert();
  }

  // Multi-node attack simulation triggered by button
  function triggerMultiNodeAttack() {
    simulationActive = true;
    const triggerBtn = document.getElementById('trigger-surface-attack-btn');
    if (triggerBtn) {
      triggerBtn.innerHTML = '<span>[1/3] ⚠️ THREAT ACTIVE (DETECTING...)</span>';
      triggerBtn.classList.add('active-threat-btn');
    }

    updateHUDStatus('[STAGE 1/3] ⚠️ ADVERSARY INTRUSION: 3 SURFACES ATTACKED // INITIATING DEFENSE', 'threat');

    // Instantly infect target nodes: CLOUD VPC (0), REST APIS (3), CUSTOMER DATA (5)
    [0, 3, 5].forEach((id, idx) => {
      const node = nodes.find(n => n.id === id);
      if (node) {
        setTimeout(() => {
          infectNode(node);
        }, idx * 160);
      }
    });

    // Stage 2: Autonomous AI Hunting & Quarantine (~2.8s later)
    setTimeout(() => {
      if (triggerBtn) {
        triggerBtn.innerHTML = '<span>[2/3] 🛡️ AI QUARANTINE IN PROGRESS...</span>';
      }
      updateHUDStatus('[STAGE 2/3] 🛡️ AUTONOMOUS AI HUNTING: ISOLATING LATERAL VECTORS...', 'hunting');
      cyberAudio.playIntercept();
    }, 2800);

    // Stage 3: Neutralized & Contained (~5.6s later)
    setTimeout(() => {
      if (triggerBtn) {
        triggerBtn.innerHTML = '<span>[3/3] ✓ CONTAINED & RE-ENCRYPTED</span>';
      }
      updateHUDStatus('[STAGE 3/3] ✓ THREAT CONTAINED IN 14ms // ATTACK SURFACE FORTIFIED', 'normal');
      cyberAudio.playIntercept();
    }, 5600);

    // Reset back to ready (~8s later)
    setTimeout(() => {
      simulationActive = false;
      if (triggerBtn) {
        triggerBtn.innerHTML = '<span>✓ COMPLETED // CLICK TO SIMULATE AGAIN</span>';
        triggerBtn.classList.remove('active-threat-btn');
      }
      updateHUDStatus('DEFENSE GRID: NOMINAL // ALL 10 SURFACES SECURED', 'normal');
    }, 8000);
  }

  // Update node state machine on every animation frame
  function updateNodeStates() {
    nodes.forEach(node => {
      if (node.status === 'COMPROMISED') {
        node.timer++;
        // After ~2.8 seconds (170 frames), CyberHiveX hunting quarantines the node
        if (node.timer > 170) {
          node.status = 'HUNTING';
          node.timer = 0;
          shockwaves.push({
            x: node.x,
            y: node.y,
            radius: 8,
            maxRadius: 45,
            color: '#FF9900',
            alpha: 1
          });
        }
      } else if (node.status === 'HUNTING') {
        node.timer++;
        // After ~2.8 seconds (170 frames), threat is completely neutralized
        if (node.timer > 170) {
          node.status = 'CONTAINED';
          node.timer = 0;
          shockwaves.push({
            x: node.x,
            y: node.y,
            radius: 8,
            maxRadius: 55,
            color: '#00FFAA',
            alpha: 1
          });
        }
      } else if (node.status === 'CONTAINED') {
        node.timer++;
        // Flash green for ~2.4 seconds (145 frames), then restore to normal secure
        if (node.timer > 145) {
          node.status = 'SECURE';
          node.timer = 0;
        }
      }
    });
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);
    updateNodeStates();

    // 1. Draw Network Connections
    links.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);

      const hasThreat = link.source.status === 'COMPROMISED' || link.target.status === 'COMPROMISED';
      const hasHunting = link.source.status === 'HUNTING' || link.target.status === 'HUNTING';

      if (hasThreat) {
        ctx.strokeStyle = 'rgba(255, 51, 102, 0.75)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
      } else if (hasHunting) {
        ctx.strokeStyle = 'rgba(255, 153, 0, 0.65)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.14)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 2. Draw Incursion Laser Lines
    for (let i = incursionLasers.length - 1; i >= 0; i--) {
      const laser = incursionLasers[i];
      laser.progress += 0.05;
      laser.alpha -= 0.02;

      if (laser.alpha <= 0 || laser.progress >= 1) {
        incursionLasers.splice(i, 1);
        continue;
      }

      const curX = laser.startX + (laser.targetX - laser.startX) * Math.min(laser.progress, 1);
      const curY = laser.startY + (laser.targetY - laser.startY) * Math.min(laser.progress, 1);

      ctx.beginPath();
      ctx.moveTo(laser.startX, laser.startY);
      ctx.lineTo(curX, curY);
      ctx.strokeStyle = `rgba(255, 51, 102, ${laser.alpha})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#FF3366';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 3. Draw Expanding Shockwave Rings
    for (let j = shockwaves.length - 1; j >= 0; j--) {
      const sw = shockwaves[j];
      sw.radius += 1.6;
      sw.alpha -= 0.025;

      if (sw.alpha <= 0) {
        shockwaves.splice(j, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = sw.alpha;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // 4. Draw Nodes with Dynamic Holographic Badges
    nodes.forEach(node => {
      node.pulsePhase += 0.05;
      const pulse = Math.sin(node.pulsePhase);

      let nodeColor = '#00F3FF';
      let haloColor = 'rgba(0, 243, 255, 0.2)';
      let statusText = 'SECURED';

      if (node.status === 'COMPROMISED') {
        nodeColor = '#FF3366';
        haloColor = 'rgba(255, 51, 102, 0.45)';
        statusText = '⚠️ PROBE INJECTED [BREACHING]';
      } else if (node.status === 'HUNTING') {
        nodeColor = '#FF9900';
        haloColor = 'rgba(255, 153, 0, 0.45)';
        statusText = '🛡️ AI ISOLATING & QUARANTINING';
      } else if (node.status === 'CONTAINED') {
        nodeColor = '#00FFAA';
        haloColor = 'rgba(0, 255, 170, 0.45)';
        statusText = '✓ CONTAINED & RE-ENCRYPTED';
      }

      // Outer Pulsing Glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.baseRadius + 8 + pulse * 4, 0, Math.PI * 2);
      ctx.fillStyle = haloColor;
      ctx.fill();

      // Threat / Quarantine Rotating Hex Shield
      if (node.status === 'COMPROMISED' || node.status === 'HUNTING') {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius + 18 + (node.timer % 30), 0, Math.PI * 2);
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Node Body
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#05070A';
      ctx.strokeStyle = nodeColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = nodeColor;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Core Dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Node Label
      ctx.font = '700 11px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(node.label, node.x + 16, node.y - 3);

      // Status Pill Text
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = nodeColor;
      ctx.fillText(statusText, node.x + 16, node.y + 12);
    });

    // Schedule next frame
    animationFrameId = requestAnimationFrame(render);
  }

  // Interactive Click on Canvas: Click any node to manually trigger the full lifecycle on it
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let nearest = null;
    let minDist = 45;

    nodes.forEach(n => {
      const dist = Math.hypot(n.x - clickX, n.y - clickY);
      if (dist < minDist) {
        minDist = dist;
        nearest = n;
      }
    });

    if (nearest) {
      infectNode(nearest);
      updateHUDStatus(`⚠️ MANUAL PROBE INJECTED AT [${nearest.label}] // AUTONOMOUS HUNTING ENGAGED`, 'threat');
    }
  });

  // Cursor pointer indicator on node hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const isOverNode = nodes.some(n => Math.hypot(n.x - mx, n.y - my) < 35);
    canvas.style.cursor = isOverNode ? 'pointer' : 'crosshair';
  });

  // Manual Trigger Button
  const triggerBtn = document.getElementById('trigger-surface-attack-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerMultiNodeAttack();
    });
  }

  // Responsive resize
  let resizeTimer = null;
  function debouncedResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(resize);
  }
  window.addEventListener('resize', debouncedResize);
  resize();

  // Bulletproof rendering loop management: never gets stuck or leaks frames
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
