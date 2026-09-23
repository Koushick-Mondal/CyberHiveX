/**
 * CYBERHIVEX TECHNOLOGY — India Digital Defense Matrix Canvas (Section 14)
 * High-tech glowing node network representing India's expanding digital ecosystem.
 */
export function initIndiaMatrix() {
  const canvas = document.getElementById('india-matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isPaused = false;

  let width = 0;
  let height = 0;

  // Key Strategic Hubs mapped normalized to India's geography (x: 0..1, y: 0..1)
  const hubs = [
    { label: 'DELHI NCR (ENTERPRISE / GOV)', x: 0.42, y: 0.28, type: 'core' },
    { label: 'MUMBAI (FINANCIAL RAILS)', x: 0.32, y: 0.58, type: 'finance' },
    { label: 'BENGALURU (TECH / R&D)', x: 0.44, y: 0.78, type: 'tech' },
    { label: 'HYDERABAD (CLOUD CLUSTERS)', x: 0.48, y: 0.62, type: 'cloud' },
    { label: 'CHENNAI (DATA INFRASTRUCTURE)', x: 0.52, y: 0.82, type: 'data' },
    { label: 'PUNE (MANUFACTURING / AUTO)', x: 0.36, y: 0.62, type: 'industry' },
    { label: 'AHMEDABAD (INDUSTRIAL CORRIDOR)', x: 0.28, y: 0.46, type: 'industry' },
    { label: 'KOLKATA (EASTERN GATEWAY)', x: 0.74, y: 0.46, type: 'regional' }
  ];

  // Interconnecting Digital Defense Network Corridors
  const corridors = [
    [0, 1], [0, 6], [0, 7], [1, 5], [1, 3], [5, 2], [3, 2], [2, 4], [3, 4], [6, 1], [7, 4]
  ];

  // Stylized boundary coordinates forming India's geographic contour
  const outlinePoints = [
    { x: 0.38, y: 0.12 }, // Kashmir North
    { x: 0.48, y: 0.15 },
    { x: 0.56, y: 0.24 }, // Northeast link
    { x: 0.88, y: 0.28 }, // Assam / Northeast
    { x: 0.84, y: 0.40 },
    { x: 0.76, y: 0.48 }, // Bengal
    { x: 0.62, y: 0.62 }, // Odisha coast
    { x: 0.54, y: 0.82 }, // Coromandel coast
    { x: 0.46, y: 0.94 }, // Kanyakumari South
    { x: 0.38, y: 0.82 }, // Malabar coast
    { x: 0.30, y: 0.65 }, // Konkan
    { x: 0.22, y: 0.50 }, // Gujarat coast
    { x: 0.18, y: 0.42 }, // Rann of Kutch
    { x: 0.26, y: 0.30 }, // Rajasthan
    { x: 0.34, y: 0.20 }
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
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Stylized Geometric Border Outline
    ctx.beginPath();
    outlinePoints.forEach((pt, i) => {
      const px = pt.x * width;
      const py = pt.y * height;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Fill subtle gradient inside territory
    ctx.fillStyle = 'rgba(0, 243, 255, 0.015)';
    ctx.fill();

    // 2. Draw Digital Defense Corridors
    corridors.forEach(([fromIdx, toIdx]) => {
      const from = hubs[fromIdx];
      const to = hubs[toIdx];

      const fx = from.x * width;
      const fy = from.y * height;
      const tx = to.x * width;
      const ty = to.y * height;

      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.16)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Traveling encrypted pulse packet
      const packetT = ((time * 0.0006) + (fromIdx * 0.18)) % 1;
      const px = fx + (tx - fx) * packetT;
      const py = fy + (ty - fy) * packetT;

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00F3FF';
      ctx.shadowColor = '#00F3FF';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 3. Draw Strategic Hub Nodes
    hubs.forEach(hub => {
      const hx = hub.x * width;
      const hy = hub.y * height;

      // Pulse ring
      const pulse = Math.sin(time * 0.003 + hub.x * 10) * 3;
      ctx.beginPath();
      ctx.arc(hx, hy, 8 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 243, 255, 0.12)';
      ctx.fill();

      // Node Body
      ctx.beginPath();
      ctx.arc(hx, hy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00FFAA';
      ctx.shadowColor = '#00FFAA';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(226, 241, 255, 0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(hub.label, hx + 10, hy + 3);
    });

    animationFrameId = requestAnimationFrame(render);
  }

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
