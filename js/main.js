/**
 * CYBERHIVEX TECHNOLOGY — Master Application Orchestrator
 */
import { cyberAudio } from './audio.js';
import { initHeroCore } from './hero-core.js';
import { initAttackSurface } from './attack-surface.js';
import { initApproachDiagram } from './approach-diagram.js';
import { initDigitalTrust } from './digital-trust.js';
import { initThreatVisualizer } from './threat-visualizer.js';
import { initCommandCenter } from './command-center.js';
import { initIndiaMatrix } from './india-matrix.js';
import { initPipelineVisualizer } from './pipeline-visualizer.js';
import { initDoctrineVisualizer } from './doctrine-visualizer.js';
import { initWhyVisualizer } from './why-visualizer.js';
import { initRakshakInteractive } from './rakshak-interactive.js';
import { initCosmicVortex } from './cosmic-vortex.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Visualizers
  initCosmicVortex();
  initHeroCore();
  initAttackSurface();
  initApproachDiagram();
  initDoctrineVisualizer();
  initPipelineVisualizer();
  initDigitalTrust();
  initThreatVisualizer();
  initCommandCenter();
  initIndiaMatrix();
  initWhyVisualizer();
  initRakshakInteractive();

  // 2. Cursor Spotlight Tracking
  const spotlight = document.getElementById('cursor-spotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  // 3. Audio Toggle
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-toggle-label');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isEnabled = cyberAudio.toggle();
      if (isEnabled) {
        soundBtn.classList.add('sound-on');
        if (soundLabel) soundLabel.textContent = 'AUDIO: ON';
        cyberAudio.playIntercept();
      } else {
        soundBtn.classList.remove('sound-on');
        if (soundLabel) soundLabel.textContent = 'AUDIO: OFF';
      }
    });
  }

  // 4. Header Scroll State
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 5. Mobile Drawer Toggle & Control
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileBackdrop?.classList.add('open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    cyberAudio.playClick();
  }

  function closeMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileNav();
      cyberAudio.playClick();
    });

    mobileBackdrop?.addEventListener('click', () => {
      closeMobileNav();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // 6. Insights Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      cyberAudio.playClick();

      articleCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Modal Windows (Contact & Defense Console)
  const contactModal = document.getElementById('contact-modal');
  const openModalBtns = document.querySelectorAll('.trigger-contact-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal?.classList.add('active');
      cyberAudio.playIntercept();
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      contactModal?.classList.remove('active');
      cyberAudio.playClick();
    });
  });

  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
      cyberAudio.playClick();
    }
  });

  // 8. Interactive Form Submission
  const contactForm = document.getElementById('defense-inquiry-form');
  const formSuccess = document.getElementById('form-success-box');
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      cyberAudio.playIntercept();
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';

      // Generate simulated Zero-Trust Session Token
      const tokenEl = document.getElementById('session-crypto-token');
      if (tokenEl) {
        const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        tokenEl.textContent = `CHX-TOKEN::${randomHex.toUpperCase()}`;
      }
    });
  }

  // 9. Interactive Audio for all Primary buttons
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      cyberAudio.playClick();
    });
  });

  console.log('%c CYBERHIVEX TECHNOLOGY %c DEFENSE MATRIX ONLINE', 
    'background: #00F3FF; color: #05070A; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
    'background: #05070A; color: #00F3FF; border: 1px solid #00F3FF; padding: 4px 8px; border-radius: 2px;');
});
