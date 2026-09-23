/**
 * CYBERHIVEX TECHNOLOGY — Cyber Threat Visualizer Engine (Section 11)
 * Interactive Enterprise Network Attack Simulator & Autonomous Defense Containment.
 * Supports clicking ANY node to attack it, with dynamic real-time CyberHiveX AI solutions!
 */
import { cyberAudio } from './audio.js';

export function initThreatVisualizer() {
  const canvas = document.getElementById('threat-sim-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;

  // Stages definition
  const STAGES = [
    { key: 'normal', name: 'NORMAL ACTIVITY', desc: 'All telemetry within baseline parameters' },
    { key: 'anomaly', name: 'ANOMALOUS ACTIVITY', desc: 'Adversary incursion probe detected at DMZ perimeter' },
    { key: 'detected', name: 'THREAT DETECTED', desc: 'Active lateral movement signature recognized' },
    { key: 'correlation', name: 'AI CORRELATION', desc: 'Autonomous neural engine tracing attack graph' },
    { key: 'contained', name: 'THREAT CONTAINED', desc: 'Breach vector severed; zero asset compromise' }
  ];

  let currentStageIndex = 0;
  let stageTimer = 0;
  const STAGE_DURATION = 160; // frames per stage

  // Simulated Enterprise Network Topology with node-specific attacks & autonomous solutions
  const networkTopology = [
    {
      id: 0,
      label: 'PUBLIC GATEWAY',
      type: 'perimeter',
      xR: 0.12,
      yR: 0.5,
      attackDesc: 'Volumetric Edge DDoS & SYN Flood Recon Infiltration',
      solutionDesc: 'Edge Anomaly Scrubbing Activated. Malicious ASN Traffic Sinkholed in 2.8ms.'
    },
    {
      id: 1,
      label: 'AUTH BROKER',
      type: 'identity',
      xR: 0.28,
      yR: 0.3,
      attackDesc: 'Kerberos Ticket Forgery / Golden Ticket Privilege Escalation Attempt',
      solutionDesc: 'Session Tokens Revoked. Hardware TPM Attestation Enforced. Identity Hash Re-Keyed in 4.2ms.'
    },
    {
      id: 2,
      label: 'WEB APP CLUSTER',
      type: 'app',
      xR: 0.28,
      yR: 0.7,
      attackDesc: 'Zero-Day Remote Code Execution (RCE) & SSRF Incursion Attempt',
      solutionDesc: 'RASP Dynamic AST Sanitizer deployed. Malicious payload neutralized in memory in 5.6ms.'
    },
    {
      id: 3,
      label: 'API SERVICE MESH',
      type: 'mesh',
      xR: 0.48,
      yR: 0.5,
      attackDesc: 'Broken Object Level Auth (BOLA) & API Scraping Flood',
      solutionDesc: 'Behavioral Anomaly Gate Enforced. Rogue Bearer Tokens Purged in 6.1ms.'
    },
    {
      id: 4,
      label: 'KUBERNETES PODS',
      type: 'cloud',
      xR: 0.65,
      yR: 0.25,
      attackDesc: 'Container Escape & Pod Cluster Privilege Escalation Attempt',
      solutionDesc: 'Pod Micro-Quarantine Engaged. Ingress rules revoked. Kernel memory snapshot isolated in 8.4ms.'
    },
    {
      id: 5,
      label: 'ENTERPRISE DB',
      type: 'data',
      xR: 0.68,
      yR: 0.75,
      attackDesc: 'Direct SQL Data Exfiltration & Ransomware Encryption Probe',
      solutionDesc: 'DB Egress Channel Severed. Immutable Read-Only Failover Enabled. Zero Data Loss.'
    },
    {
      id: 6,
      label: 'CORE BACKBONE',
      type: 'core',
      xR: 0.88,
      yR: 0.5,
      attackDesc: 'BGP Hijack & Lateral Transit Snooping Attempt',
      solutionDesc: 'Software-Defined Perimeter (SDP) re-routed. Micro-tunnels re-encrypted in 9.2ms.'
    }
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]
  ];

  // Active target node & calculated attack path
  let activeTargetNode = networkTopology[5]; // Default to DB
  let attackPath = [0, 2, 3, 5];
  let incursionProgress = 0;
  let containmentSweep = 0;
  let hoveredNode = null;
  let incursionShockwaves = [];

  // Path computation to any target node from entry point
  function computeAttackPath(targetId) {
    if (targetId === 0) return [0];
    if (targetId === 1) return [0, 1];
    if (targetId === 2) return [0, 2];
    if (targetId === 3) return [0, 2, 3];
    if (targetId === 4) return [0, 2, 3, 4];
    if (targetId === 5) return [0, 2, 3, 5];
    if (targetId === 6) return [0, 2, 3, 4, 6];
    return [0, 2, 3, 5];
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
  }

  // Update HUD text & toolbar stage indicators
  function updateHUD() {
    const stage = STAGES[currentStageIndex];
    const steps = document.querySelectorAll('.threat-stage-step');
    steps.forEach((step, idx) => {
      step.classList.remove('active', 'threat-mode');
      if (idx === currentStageIndex) {
        if (stage.key === 'anomaly' || stage.key === 'detected') {
          step.classList.add('threat-mode');
        } else {
          step.classList.add('active');
        }
      }
    });

    const hudOverlay = document.getElementById('threat-hud-desc');
    if (hudOverlay) {
      hudOverlay.textContent = `[STATE: ${stage.name}] — ${stage.desc}`;
    }

    // Update Live Solution Drawer
    updateSolutionDrawer();
  }

  function updateSolutionDrawer() {
    const drawer = document.getElementById('threat-solution-drawer');
    const badge = document.getElementById('solution-threat-badge');
    const targetName = document.getElementById('solution-target-name');
    const attackDesc = document.getElementById('solution-attack-vector');
    const solutionDesc = document.getElementById('solution-defense-action');
    const responseTime = document.getElementById('solution-response-time');

    if (!drawer || !activeTargetNode) return;

    targetName.textContent = activeTargetNode.label;
    attackDesc.textContent = activeTargetNode.attackDesc;

    if (currentStageIndex === 0) {
      // Normal state
      drawer.className = 'threat-solution-drawer';
      badge.textContent = 'SYSTEM NOMINAL';
      badge.className = 'badge-tech';
      solutionDesc.textContent = 'Continuous behavioral baseline monitoring active. No active anomalous vectors.';
      responseTime.textContent = 'LATENCY: 0.8ms';
    } else if (currentStageIndex === 1 || currentStageIndex === 2) {
      // Threat incursion
      drawer.className = 'threat-solution-drawer threat-active';
      badge.textContent = 'TARGET BREACH PROBE';
      badge.className = 'badge-threat';
      solutionDesc.textContent = 'CyberHiveX Hunter Neural Engine correlating threat graph...';
      responseTime.textContent = 'ATTACK ACTIVE';
    } else if (currentStageIndex === 3) {
      // Correlation
      drawer.className = 'threat-solution-drawer threat-active';
      badge.textContent = 'AI CORRELATING';
      badge.className = 'badge-threat';
      solutionDesc.textContent = 'Autonomous playbooks staging containment boundary...';
      responseTime.textContent = 'TRACE: 99.4%';
    } else if (currentStageIndex === 4) {
      // Contained!
      drawer.className = 'threat-solution-drawer contained-active';
      badge.textContent = 'THREAT CONTAINED';
      badge.className = 'badge-tech';
      badge.style.color = '#00FFAA';
      badge.style.borderColor = '#00FFAA';
      solutionDesc.textContent = activeTargetNode.solutionDesc;
      responseTime.textContent = 'RESPONSE: <10ms';
    }
  }

  function advanceStage(newIndex) {
    currentStageIndex = (newIndex !== undefined) ? newIndex : (currentStageIndex + 1) % STAGES.length;
    stageTimer = 0;

    if (currentStageIndex === 1 || currentStageIndex === 2) {
      cyberAudio.playAlert();
    } else if (currentStageIndex === 4) {
      cyberAudio.playIntercept();
    }

    updateHUD();
  }

  // Attack a specific node selected by user mouse click
  function attackSpecificNode(node) {
    if (!node) return;
    activeTargetNode = node;
    attackPath = computeAttackPath(node.id);
    containmentSweep = 0;
    incursionProgress = 0;

    // Trigger visual shockwave at the attacked node
    incursionShockwaves.push({
      x: node.xR * width,
      y: node.yR * height,
      radius: 10,
      maxRadius: 50,
      alpha: 1,
      color: '#FF3366'
    });

    advanceStage(1); // Jump straight to Anomalous Incursion on this target
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // Auto-advance stage timer
    stageTimer++;
    if (stageTimer > STAGE_DURATION) {
      advanceStage();
    }

    const currentStage = STAGES[currentStageIndex].key;

    // 1. Draw Network Connections
    connections.forEach(([sId, tId]) => {
      const s = networkTopology[sId];
      const t = networkTopology[tId];
      const sx = s.xR * width;
      const sy = s.yR * height;
      const tx = t.xR * width;
      const ty = t.yR * height;

      // Base connection line
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.14)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Normal benign traffic packets
      if (currentStage === 'normal' || currentStage === 'contained') {
        const pProgress = ((time * 0.001) + (sId * 0.2)) % 1;
        const px = sx + (tx - sx) * pProgress;
        const py = sy + (ty - sy) * pProgress;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00F3FF';
        ctx.fill();
      }
    });

    // 2. Animate Malicious Attack Path Incursion along calculated attackPath
    if (currentStage === 'anomaly' || currentStage === 'detected' || currentStage === 'correlation') {
      incursionProgress = (incursionProgress + 0.014) % 1;

      for (let i = 0; i < attackPath.length - 1; i++) {
        const s = networkTopology[attackPath[i]];
        const t = networkTopology[attackPath[i + 1]];
        const sx = s.xR * width;
        const sy = s.yR * height;
        const tx = t.xR * width;
        const ty = t.yR * height;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = currentStage === 'correlation' ? 'rgba(255, 153, 0, 0.85)' : 'rgba(255, 51, 102, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#FF3366';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // 3. Draw Dynamic Expanding Incursion Shockwaves
    for (let k = incursionShockwaves.length - 1; k >= 0; k--) {
      const sw = incursionShockwaves[k];
      sw.radius += 1.8;
      sw.alpha -= 0.025;

      if (sw.alpha <= 0) {
        incursionShockwaves.splice(k, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = sw.alpha;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // 4. Animate Autonomous AI Containment Grid around targeted node
    if (currentStage === 'correlation' || currentStage === 'contained') {
      containmentSweep = Math.min(containmentSweep + 0.02, 1);
      const cx = activeTargetNode.xR * width;
      const cy = activeTargetNode.yR * height;

      // Draw Rotating Hunter Hexagonal Quarantine Bubble
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.001);

      ctx.beginPath();
      ctx.arc(0, 0, 58, 0, Math.PI * 2);
      ctx.strokeStyle = '#00FFAA';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([10, 6]);
      ctx.shadowColor = '#00FFAA';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.font = '800 9.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FFAA';
      ctx.textAlign = 'center';
      ctx.fillText('CYBERHIVEX ISOLATION SHIELD', cx, cy - 68);
    } else {
      containmentSweep = 0;
    }

    // 5. Draw Network Topology Nodes
    networkTopology.forEach(node => {
      const nx = node.xR * width;
      const ny = node.yR * height;

      const isTarget = node.id === activeTargetNode.id;
      const isBreachPath = attackPath.includes(node.id);

      let nodeColor = '#00F3FF';
      if (isBreachPath && (currentStage === 'detected' || currentStage === 'anomaly')) {
        nodeColor = '#FF3366';
      } else if (isTarget && currentStage === 'contained') {
        nodeColor = '#00FFAA';
      } else if (isTarget && currentStage === 'correlation') {
        nodeColor = '#FF9900';
      }

      // Hover Target Lock Bracket
      if (hoveredNode && hoveredNode.id === node.id) {
        ctx.beginPath();
        ctx.arc(nx, ny, 26, 0, Math.PI * 2);
        ctx.strokeStyle = '#FF3366';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '700 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FF3366';
        ctx.textAlign = 'center';
        ctx.fillText('[ CLICK TO ATTACK ]', nx, ny - 32);
      }

      // Outer Node Ring
      ctx.beginPath();
      ctx.arc(nx, ny, 16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(11, 18, 32, 0.9)';
      ctx.strokeStyle = nodeColor;
      ctx.lineWidth = isTarget ? 2.5 : 1.8;
      ctx.shadowColor = nodeColor;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Core Dot
      ctx.beginPath();
      ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Node Label
      ctx.font = '700 10px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, nx, ny + 30);
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // Interactive Mouse Move: Detect node hover for crosshair target locking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let nearest = null;
    let minDist = 45;

    networkTopology.forEach(node => {
      const nx = node.xR * width;
      const ny = node.yR * height;
      const dist = Math.hypot(nx - mx, ny - my);
      if (dist < minDist) {
        minDist = dist;
        nearest = node;
      }
    });

    hoveredNode = nearest;
    canvas.style.cursor = nearest ? 'crosshair' : 'default';
  });

  // Interactive Click on Canvas: User clicks ANY node to launch targeted attack on it!
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let nearest = null;
    let minDist = 60;

    networkTopology.forEach(node => {
      const nx = node.xR * width;
      const ny = node.yR * height;
      const dist = Math.hypot(nx - clickX, ny - clickY);
      if (dist < minDist) {
        minDist = dist;
        nearest = node;
      }
    });

    if (nearest) {
      attackSpecificNode(nearest);
    }
  });

  // Toolbar Button Controls
  const attackBtn = document.getElementById('trigger-apt-sim-btn');
  if (attackBtn) {
    attackBtn.addEventListener('click', () => {
      // Pick a random target node or DB
      const randomNode = networkTopology[Math.floor(Math.random() * (networkTopology.length - 1)) + 1];
      attackSpecificNode(randomNode);
    });
  }

  const resetBtn = document.getElementById('reset-sim-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      advanceStage(0); // Reset to normal
    });
  }

  const stepElements = document.querySelectorAll('.threat-stage-step');
  stepElements.forEach((el, idx) => {
    el.addEventListener('click', () => {
      advanceStage(idx);
    });
  });

  let resizeTimer = null;
  function debouncedResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(resize);
  }
  window.addEventListener('resize', debouncedResize);
  resize();
  updateHUD();

  // Bulletproof Observer
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
