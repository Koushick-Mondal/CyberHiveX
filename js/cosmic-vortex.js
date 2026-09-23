/**
 * CYBERHIVEX TECHNOLOGY — Cosmic Vortex & Rotating Singularity Engine
 * Renders the hypnotic rotating electric-blue vortex ring, glowing accretion disk,
 * and spiraling cosmic particles inspired by deep space singularities.
 */

export function initCosmicVortex() {
  const canvas = document.getElementById('cosmic-vortex-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;

  // Mouse parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Accretion disk tilt angle (-24 degrees in radians) matching cyber-vortex-bg.jpg
  const ACCRETION_TILT = -0.42;
  const ACCRETION_ASPECT = 0.42; // minor/major ellipse axis ratio

  // Particle vortex system
  const particleCount = 220;
  const particles = [];

  // Concentric orbital rings fitted precisely to the black hole's geometry
  const rings = [
    {
      radiusX: 195,
      radiusY: 195 * ACCRETION_ASPECT,
      streamSpeed: 280,
      orbitSpeed: 0.014,
      dashPattern: [70, 140, 35, 180],
      baseColor: 'rgba(0, 243, 255, 0.22)',
      streamColor: 'rgba(255, 255, 255, 0.95)',
      glowColor: '#00F3FF',
      width: 2.2,
      blur: 16,
      beacons: [0, Math.PI * 0.66, Math.PI * 1.33],
      beaconColor: '#FFFFFF',
      beaconSize: 3.2
    },
    {
      radiusX: 275,
      radiusY: 275 * ACCRETION_ASPECT,
      streamSpeed: 210,
      orbitSpeed: 0.009,
      dashPattern: [120, 80, 50, 160],
      baseColor: 'rgba(0, 220, 255, 0.20)',
      streamColor: 'rgba(0, 243, 255, 0.85)',
      glowColor: '#00D4FF',
      width: 2.0,
      blur: 20,
      beacons: [0.3, 1.8, 3.4, 4.9],
      beaconColor: '#80F8FF',
      beaconSize: 2.8
    },
    {
      radiusX: 375,
      radiusY: 375 * ACCRETION_ASPECT,
      streamSpeed: 160,
      orbitSpeed: 0.006,
      dashPattern: [180, 110, 70, 220],
      baseColor: 'rgba(0, 170, 255, 0.16)',
      streamColor: 'rgba(51, 246, 255, 0.75)',
      glowColor: '#0099FF',
      width: 1.8,
      blur: 24,
      beacons: [0.7, 2.3, 3.9, 5.4],
      beaconColor: '#00F3FF',
      beaconSize: 2.4
    },
    {
      radiusX: 485,
      radiusY: 485 * ACCRETION_ASPECT,
      streamSpeed: 120,
      orbitSpeed: 0.004,
      dashPattern: [240, 180, 90, 280],
      baseColor: 'rgba(0, 140, 255, 0.12)',
      streamColor: 'rgba(0, 243, 255, 0.60)',
      glowColor: '#0077FF',
      width: 1.4,
      blur: 28,
      beacons: [1.1, 3.2, 5.1],
      beaconColor: '#33F6FF',
      beaconSize: 2.2
    }
  ];

  let rotationAngle = 0;

  class VortexParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Orbit parameters: tilted accretion ellipse
      this.angle = initial ? Math.random() * Math.PI * 2 : 0;
      this.orbitDist = 140 + Math.random() * 370;
      // Keplerian motion: faster near event horizon
      this.speed = (0.004 + (520 - this.orbitDist) * 0.000035);
      this.size = 0.8 + Math.random() * 2.2;
      this.opacity = 0.25 + Math.random() * 0.70;
      this.eccentricity = ACCRETION_ASPECT + (Math.random() - 0.5) * 0.04;
      this.tilt = ACCRETION_TILT;
      this.color = Math.random() > 0.35 ? '#00F3FF' : (Math.random() > 0.5 ? '#33F6FF' : '#70C8FF');
      this.life = 0;
      this.maxLife = 220 + Math.random() * 320;
    }

    update() {
      this.angle += this.speed;
      this.life++;
      if (this.life > this.maxLife) {
        this.reset();
      }
    }

    draw(ctx, cx, cy) {
      // Elliptical coordinate calculation with tilt
      const cosA = Math.cos(this.angle);
      const sinA = Math.sin(this.angle);

      // Raw unrotated coords on accretion plane
      const rx = cosA * this.orbitDist;
      const ry = sinA * this.orbitDist * this.eccentricity;

      // Apply tilt matrix
      const tiltCos = Math.cos(this.tilt);
      const tiltSin = Math.sin(this.tilt);
      const x = cx + (rx * tiltCos - ry * tiltSin);
      const y = cy + (rx * tiltSin + ry * tiltCos);

      // Relativistic Doppler beaming & depth
      // In a tilted disk, sinA > 0 is the foreground / bottom-near edge
      const depth = (sinA + 1) * 0.5; // 0 (far/behind) to 1 (near/front)
      const currentOpacity = this.opacity * (0.3 + depth * 0.7);
      const currentSize = this.size * (0.7 + depth * 0.6);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = currentOpacity;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = depth > 0.6 ? 7 : 2;
      ctx.fill();
      ctx.restore();
    }
  }

  function updateCenterPosition() {
    // Dynamically lock center to the black hole behind the main title
    const titleEl = document.querySelector('.cosmic-main-title') || document.querySelector('.cosmic-title-group');
    if (titleEl && canvas) {
      const tRect = titleEl.getBoundingClientRect();
      const cRect = canvas.getBoundingClientRect();
      centerX = width / 2;
      // Black hole center sits directly behind the middle of the main heading
      centerY = Math.round((tRect.top + tRect.height * 0.46) - cRect.top);
    } else {
      centerX = width / 2;
      centerY = Math.floor(height * 0.42);
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.floor(rect.width);
    height = Math.floor(rect.height);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    updateCenterPosition();
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new VortexParticle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const currentCenterX = centerX + mouseX * 22;
    const currentCenterY = centerY + mouseY * 14;

    rotationAngle += 0.004;

    // 1. Draw glowing background radial haze centered on the black hole
    const bgGlow = ctx.createRadialGradient(
      currentCenterX, currentCenterY, 30,
      currentCenterX, currentCenterY, 460
    );
    bgGlow.addColorStop(0, 'rgba(0, 243, 255, 0.18)');
    bgGlow.addColorStop(0.28, 'rgba(0, 163, 255, 0.09)');
    bgGlow.addColorStop(0.60, 'rgba(11, 18, 32, 0.04)');
    bgGlow.addColorStop(1, 'transparent');

    ctx.save();
    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(currentCenterX, currentCenterY, 460, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Draw rings orbiting precisely along the black hole's accretion plane
    ctx.save();
    ctx.translate(currentCenterX, currentCenterY);
    ctx.rotate(ACCRETION_TILT); // Fixed lock to accretion disk plane

    rings.forEach((ring) => {
      // 2a. Base subtle orbital guide ring
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = ring.baseColor;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // 2b. Moving dashed energy stream orbiting around the circumference
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = ring.streamColor;
      ctx.lineWidth = ring.width;
      ctx.setLineDash(ring.dashPattern);
      // Continuous circulation around the black hole
      ctx.lineDashOffset = -rotationAngle * ring.streamSpeed;
      ctx.shadowColor = ring.glowColor;
      ctx.shadowBlur = ring.blur;
      ctx.stroke();
      ctx.restore();

      // 2c. Orbiting photon beads with relativistic motion trails
      ring.beacons.forEach((baseAngle) => {
        const theta = (baseAngle + rotationAngle * ring.orbitSpeed * 32) % (Math.PI * 2);
        const bx = Math.cos(theta) * ring.radiusX;
        const by = Math.sin(theta) * ring.radiusY;

        // Depth perception: foreground (sin > 0) is brighter
        const depth = (Math.sin(theta) + 1) * 0.5;
        const alpha = 0.45 + depth * 0.55;

        // Glowing photon head
        ctx.save();
        ctx.beginPath();
        ctx.arc(bx, by, ring.beaconSize * (0.8 + depth * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = ring.beaconColor;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = '#00F3FF';
        ctx.shadowBlur = 12 + depth * 8;
        ctx.fill();

        // Trailing motion spark behind each orbiting bead
        const trailSteps = 4;
        for (let t = 1; t <= trailSteps; t++) {
          const tTheta = theta - (t * 0.04);
          const tx = Math.cos(tTheta) * ring.radiusX;
          const ty = Math.sin(tTheta) * ring.radiusY;
          ctx.beginPath();
          ctx.arc(tx, ty, ring.beaconSize * (1 - t * 0.2), 0, Math.PI * 2);
          ctx.fillStyle = ring.glowColor;
          ctx.globalAlpha = alpha * (1 - t * 0.22);
          ctx.fill();
        }
        ctx.restore();
      });
    });

    ctx.restore(); // restore translate & ACCRETION_TILT

    // 3. Draw orbiting cosmic dust & plasma particles around the black hole
    particles.forEach(p => {
      p.update();
      p.draw(ctx, currentCenterX, currentCenterY);
    });

    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  window.addEventListener('resize', resize);
  resize();
  render();

  // Initialize interactive letter-by-letter text pop effect
  initCyberTextPop();

  // Initialize smooth scroll-driven zoom and shrink effect
  initScrollZoomEffect();

  // Smooth glide transition to deep-dive architecture
  const scrollBtn = document.getElementById('cosmic-scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('hero-deepdive');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}

/**
 * Smooth Scroll-Driven Zoom and Shrink Animation
 * Dynamically scales and floats the landing page heading on scroll
 */
export function initScrollZoomEffect() {
  const titleGroup = document.querySelector('.cosmic-title-group');
  const badge = document.querySelector('.cosmic-badge');
  const subtitle = document.querySelector('.cosmic-subtitle');
  const ctaRow = document.querySelector('.cosmic-cta-row');
  const vortexCanvas = document.getElementById('cosmic-vortex-canvas');
  if (!titleGroup) return;

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let isTicking = false;

  function onScrollFrame() {
    currentScroll += (targetScroll - currentScroll) * 0.14; // smooth lerp interpolation

    const viewportH = window.innerHeight || 800;
    // Normalized scroll progress from 0 (top) to 1.0 (past first viewport)
    const progress = Math.min(Math.max(currentScroll / (viewportH * 0.7), 0), 1);

    if (progress > 0.003 || currentScroll > 2) {
      // Zoom and shrink heading effect during active scroll
      if (titleGroup) {
        const scale = 1.0 - progress * 0.28; // shrinks from 1.0 down to 0.72
        const translateY = -progress * 70; // lifts smoothly upward
        const opacity = Math.max(1.0 - progress * 0.7, 0.15); // gentle fade
        titleGroup.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        titleGroup.style.opacity = opacity.toFixed(3);
      }

      // Badge and subtitle subtle shrink & float
      if (badge) {
        const bScale = 1.0 - progress * 0.15;
        const bTranslateY = -progress * 40;
        badge.style.transform = `translate3d(0, ${bTranslateY.toFixed(2)}px, 0) scale(${bScale.toFixed(3)})`;
      }

      if (subtitle) {
        const sTranslateY = -progress * 50;
        const sScale = 1.0 - progress * 0.12;
        subtitle.style.transform = `translate3d(0, ${sTranslateY.toFixed(2)}px, 0) scale(${sScale.toFixed(3)})`;
      }

      if (ctaRow) {
        const cTranslateY = -progress * 35;
        ctaRow.style.transform = `translate3d(0, ${cTranslateY.toFixed(2)}px, 0)`;
      }

      // Cosmic vortex canvas expands subtly in depth on scroll down
      if (vortexCanvas) {
        const cScale = 1.0 + progress * 0.15;
        vortexCanvas.style.transform = `scale(${cScale.toFixed(3)})`;
      }
    } else {
      // At the top of viewport: clear inline overrides so CSS animations remain pure
      if (titleGroup && titleGroup.style.transform) {
        titleGroup.style.transform = '';
        titleGroup.style.opacity = '';
      }
      if (badge && badge.style.transform) badge.style.transform = '';
      if (subtitle && subtitle.style.transform) subtitle.style.transform = '';
      if (ctaRow && ctaRow.style.transform) ctaRow.style.transform = '';
    }

    if (Math.abs(targetScroll - currentScroll) > 0.4 || progress > 0.01) {
      requestAnimationFrame(onScrollFrame);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
    if (!isTicking && targetScroll < (window.innerHeight * 1.6)) {
      isTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  // Initial calculation
  onScrollFrame();
}

/**
 * Letter-by-letter Cyber Pop-Out Effect
 * Wraps text in interactive cyber-char spans that react to mouse hover
 */
export function initCyberTextPop() {
  const targets = document.querySelectorAll('.cyber-pop-text');
  targets.forEach((target) => {
    if (target.dataset.popInitialized) return;
    target.dataset.popInitialized = 'true';

    const childNodes = Array.from(target.childNodes);
    const fragment = document.createDocumentFragment();

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (/^\s+$/.test(token)) {
            fragment.appendChild(document.createTextNode(token));
          } else if (token.length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'cyber-word';
            for (let i = 0; i < token.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.className = 'cyber-char';
              charSpan.textContent = token[i];
              wordSpan.appendChild(charSpan);
            }
            fragment.appendChild(wordSpan);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const isHighlight = node.classList.contains('gradient-text') || node.classList.contains('highlight');
        const elementWrapper = document.createElement('span');
        elementWrapper.className = node.className;
        const text = node.textContent;
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (/^\s+$/.test(token)) {
            elementWrapper.appendChild(document.createTextNode(token));
          } else if (token.length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'cyber-word';
            for (let i = 0; i < token.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.className = 'cyber-char' + (isHighlight ? ' highlight' : '');
              charSpan.textContent = token[i];
              wordSpan.appendChild(charSpan);
            }
            elementWrapper.appendChild(wordSpan);
          }
        });
        fragment.appendChild(elementWrapper);
      }
    });

    target.innerHTML = '';
    target.appendChild(fragment);
  });
}

