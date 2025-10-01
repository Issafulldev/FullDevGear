import { initI18n as initI18nModule } from './modules/i18n.js';
import { initializeTechWave as initializeTechWaveModule } from './modules/tech-wave.js';
import { setupContactForm as setupContactFormModule } from './modules/form.js';
import { createRouter as createRouterModule } from './modules/router.js';
import { setupCVScrollActivation } from './modules/cv.js';
import { setupContactPopup as setupContactPopupModule } from './modules/contact-popup.js';

// Make CV activation available for router module hooks
window.setupCVScrollActivation = setupCVScrollActivation;

document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = false;



  // --- Constantes globales pour la configuration ---
  // Tech wave constants moved to tech-wave module



  // Tech wave data moved to module
  // Initialize tech wave module
  initializeTechWaveModule();

  // Initialize i18n after initial DOM is ready
  initI18nModule();

  // --- Contact CTA Popup Logic ---
  try { setupContactPopupModule(); } catch (_) { /* Ignore errors */ }

  // --- Navigation Dynamic Color Logic ---
  // --- Navigation Simple Color Logic (Ultra-optimisé) ---
  // Navigation color management removed - using fixed color like contact button

  // --- Header Scroll Effect ---
  const setupHeaderScrollEffect = () => {
    const header = document.querySelector('.header-container-logo-cta');
    if (!header) { return; }

    let isScrolled = false;
    const scrollThreshold = 50; // Pixels de scroll avant d'activer l'effet

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold && !isScrolled) {
        header.classList.add('scrolled');
        isScrolled = true;
      } else if (scrollTop <= scrollThreshold && isScrolled) {
        header.classList.remove('scrolled');
        isScrolled = false;
      }
    };

    // Throttle pour optimiser les performances
    let scrollTimeout;
    const throttledHandleScroll = () => {
      if (scrollTimeout) { return; }
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Vérifier l'état initial
    handleScroll();
  };

  setupHeaderScrollEffect();

  // Routing handled via module

  // Initialize modular router (non-breaking; it uses same DOM hooks)
  try { createRouterModule(); } catch (_) { /* Ignore errors */ }

  // CV scroll activation handled by module/router hooks

  // --- Performance Optimization: Pause animations during scroll ---
  let scrollTimeout;
  let isScrolling = false;

  const handleScrollStart = () => {
    if (!isScrolling) {
      document.body.classList.add('scrolling');
      isScrolling = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
      isScrolling = false;
    }, 150); // Resume animations 150ms after scroll stops
  };

  // Throttled scroll listener for better performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScrollStart();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Contact form handled by module - no duplication needed
  setupContactFormModule();

  // --- PWA Service Worker registration ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? '/sw.js'
        : '/sw.js';

      fetch(swUrl, { method: 'HEAD', cache: 'no-store' })
        .then((response) => {
          if (response.ok) {
            navigator.serviceWorker.register(swUrl).catch((error) => {
              if (DEBUG) { console.warn('Service worker registration failed:', error); }
            });
          } else if (DEBUG) {
            console.warn(`Service worker skipped: ${swUrl} responded with ${response.status}`);
          }
        })
        .catch((error) => {
          if (DEBUG) { console.warn('Service worker skipped: sw.js not reachable.', error); }
        });
    });
  }
});
