/**
 * CYBERHIVEX TECHNOLOGY — AI Defense Pipeline Real-Time Simulator (Section 8)
 * Renders interactive canvas animations for the 6-stage autonomous hunting pipeline.
 */
import { cyberAudio } from './audio.js';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'RAW DATA INGESTION',
    desc: 'High-velocity multi-source streaming from endpoints, cloud APIs & bare-metal workloads.',
    metric: 'THROUGHPUT: 1,842,910 EPS | BUFFER: 0ms LOSS',
    color: '#00F3FF'
  },
  {
    step: '02',
    title: 'AI NEURAL CLUSTERING',
    desc: 'Deep neural tensor classification mapping unstructured syscalls into high-dimensional vector embeddings.',
    metric: 'EMBEDDING DIM: 768-D | INFERENCE: 6.2ms',
    color: '#00D4FF'
  },
  {
    step: '03',
    title: 'BEHAVIORAL ANOMALY DETECTION',
    desc: 'Entropy autoencoder compares runtime operations against learned mathematical baselines.',
    metric: 'BASELINE DRIFT: 0.0018 VARIANCE | THREAT: FLAGGED',
    color: '#FF3366'
  },
  {
    step: '04',
    title: 'THREAT GRAPH CORRELATION',
    desc: 'Graph neural network reconstructs attacker lineage, lateral pivot paths, and objective intent.',
    metric: 'MITRE TTP: T1059.001 | CONFIDENCE: 99.4%',
    color: '#FFAA00'
  },
  {
    step: '05',
    title: 'RISK & BLAST RADIUS SCOPING',
    desc: 'Calculates asset criticality, privilege exposure, and affected network segmentation zones.',
    metric: 'ASSET IMPACT: TIER-1 SECURED | BLAST RADIUS: CONTAINED',
    color: '#00F3FF'
  },
  {
    step: '06',
    title: 'AUTONOMOUS AUTO RESPONSE',
    desc: 'Fires precision micro-isolation playbooks, null-routes malicious sockets, and revokes tokens.',
    metric: 'RESPONSE TIME: 11.8ms | SYSTEM INTEGRITY: 100%',
    color: '#00FFAA'
  }
];

export function initPipelineVisualizer() {
  const canvas = document.getElementById('pipeline-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;
  let activeStep = 0;
  let particles = [];

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

    // Initialize particles
    particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height - 80),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1.5
      });
    }
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    const stage = PIPELINE_STAGES[activeStep];
    const centerX = width / 2;
    const centerY = (height - 80) / 2;

    // Background Cyber Grid lines
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height - 70);
      ctx.stroke();
    }
    for (let y = 0; y < height - 70; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // --- STAGE-SPECIFIC ANIMATED VISUALIZATION ---
    if (activeStep === 0) {
      // Stage 01: Raw Data Streaming
      for (let i = 0; i < 35; i++) {
        const streamX = ((time * 0.2 + i * 28) % width);
        const streamY = 30 + (i % 6) * 26 + Math.sin(time * 0.003 + i) * 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = stage.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(streamX, streamY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Packet tail
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(streamX, streamY);
        ctx.lineTo(streamX - 25, streamY);
        ctx.stroke();
      }

      // Buffer Ingestion Gateway in center
      ctx.strokeStyle = stage.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 45, centerY - 45, 90, 90);
      ctx.fillStyle = 'rgba(0, 243, 255, 0.1)';
      ctx.fillRect(centerX - 45, centerY - 45, 90, 90);
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('INGESTION QUEUE', centerX, centerY - 4);
      ctx.fillStyle = stage.color;
      ctx.fillText('1.8M EPS', centerX, centerY + 12);

    } else if (activeStep === 1) {
      // Stage 02: Neural Tensor Clustering
      const numNodes = 7;
      const layerSpacing = width / (numNodes + 1);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
      ctx.lineWidth = 1;

      for (let i = 0; i < numNodes; i++) {
        const nx = layerSpacing * (i + 1);
        const ny1 = centerY - 35 + Math.sin(time * 0.004 + i) * 15;
        const ny2 = centerY + 35 + Math.cos(time * 0.004 + i) * 15;

        // Draw connections to next layer
        if (i < numNodes - 1) {
          const nextX = layerSpacing * (i + 2);
          const nextY1 = centerY - 35 + Math.sin(time * 0.004 + i + 1) * 15;
          const nextY2 = centerY + 35 + Math.cos(time * 0.004 + i + 1) * 15;
          ctx.beginPath();
          ctx.moveTo(nx, ny1); ctx.lineTo(nextX, nextY1);
          ctx.moveTo(nx, ny1); ctx.lineTo(nextX, nextY2);
          ctx.moveTo(nx, ny2); ctx.lineTo(nextX, nextY1);
          ctx.moveTo(nx, ny2); ctx.lineTo(nextX, nextY2);
          ctx.stroke();
        }

        // Draw neural nodes
        [ny1, ny2].forEach(ny => {
          ctx.fillStyle = '#05070A';
          ctx.strokeStyle = stage.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(nx, ny, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

    } else if (activeStep === 2) {
      // Stage 03: Behavioral Anomaly Detection Wave
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const anomalyPos = width * 0.65;
      for (let x = 20; x < width - 20; x += 3) {
        let y = centerY + Math.sin(time * 0.005 + x * 0.03) * 20;
        // Anomaly deviation spike
        const distFromAnomaly = Math.abs(x - anomalyPos);
        if (distFromAnomaly < 50) {
          y -= (50 - distFromAnomaly) * 1.8 * Math.sin(time * 0.015);
        }
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Threat Deviation Flare
      ctx.strokeStyle = '#FF3366';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#FF3366';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(anomalyPos, centerY - 45, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FF3366';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ ANOMALOUS SYSCALL DRIFT', anomalyPos, centerY - 72);

    } else if (activeStep === 3) {
      // Stage 04: Threat Correlation Graph
      const hops = [
        { label: 'DMZ GATE', x: width * 0.2, y: centerY - 25 },
        { label: 'AUTH SRV', x: width * 0.45, y: centerY + 30 },
        { label: 'PIVOT RPC', x: width * 0.65, y: centerY - 35 },
        { label: 'SQL CORE', x: width * 0.85, y: centerY + 15 }
      ];

      // Draw attack path
      ctx.strokeStyle = '#FFAA00';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      hops.forEach((h, idx) => {
        if (idx === 0) ctx.moveTo(h.x, h.y);
        else ctx.lineTo(h.x, h.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      hops.forEach((h, idx) => {
        ctx.fillStyle = idx === hops.length - 1 ? '#FF3366' : '#FFAA00';
        ctx.beginPath();
        ctx.arc(h.x, h.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '700 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(h.label, h.x, h.y + 22);
      });

    } else if (activeStep === 4) {
      // Stage 05: Risk & Blast Radius
      const rPulse = Math.sin(time * 0.004) * 8;
      [40, 75, 110].forEach((r, idx) => {
        ctx.strokeStyle = idx === 0 ? 'rgba(255, 51, 102, 0.8)' : 'rgba(0, 243, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r + rPulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = '#FF3366';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00F3FF';
      ctx.textAlign = 'center';
      ctx.fillText('CRITICAL ASSET // BLAST RADIUS SCOPING', centerX, centerY - 65);

    } else {
      // Stage 06: Auto Response Containment Shield
      const sPulse = Math.sin(time * 0.005) * 5;
      ctx.strokeStyle = '#00FFAA';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00FFAA';
      ctx.shadowBlur = 20;

      // Hexagonal Shield
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = centerX + Math.cos(a) * (65 + sPulse);
        const hy = centerY + Math.sin(a) * (65 + sPulse);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 255, 170, 0.12)';
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FFAA';
      ctx.textAlign = 'center';
      ctx.fillText('QUARANTINE ENFORCED', centerX, centerY - 6);
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('VECTOR SEVERED IN 11.8ms', centerX, centerY + 14);
    }

    // --- BOTTOM TELEMETRY HUD ON CANVAS ---
    const hudW = Math.min(width - 24, 600);
    const hudH = 64;
    const hudX = (width - hudW) / 2;
    const hudY = height - hudH - 8;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 10, 0.94)';
    ctx.strokeStyle = stage.color;
    ctx.lineWidth = 1.2;
    ctx.shadowColor = stage.color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.roundRect(hudX, hudY, hudW, hudH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Beacon
    ctx.fillStyle = stage.color;
    ctx.beginPath();
    ctx.arc(hudX + 16, hudY + 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Stage Name & Metric
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`STAGE ${stage.step} // ${stage.title}`, hudX + 28, hudY + 20);

    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(stage.desc, hudX + 16, hudY + 38);

    ctx.fillStyle = stage.color;
    ctx.fillText(`● ${stage.metric}`, hudX + 16, hudY + 52);

    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  // --- Interaction & Step Selection ---
  const pipelineNodes = document.querySelectorAll('.pipeline-node');

  function selectStep(index) {
    if (index < 0 || index >= PIPELINE_STAGES.length) return;
    activeStep = index;

    pipelineNodes.forEach((node, idx) => {
      if (idx === index) {
        node.classList.add('active');
        node.setAttribute('aria-expanded', 'true');
      } else {
        node.classList.remove('active');
        node.setAttribute('aria-expanded', 'false');
      }
    });

    cyberAudio.playIntercept();
  }

  pipelineNodes.forEach((node, idx) => {
    node.addEventListener('click', () => selectStep(idx));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectStep(idx);
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
