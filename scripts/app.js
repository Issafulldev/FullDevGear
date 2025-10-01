let initI18nModule;
let initializeTechWaveModule;
let setupContactFormModule;
let createRouterModule;
let setupCVScrollActivation;
let setupContactPopupModule;

const loadModule = async (importer, property) => {
  const module = await importer();
  return module[property];
};

loadModule(() => import('./modules/cv.js'), 'setupCVScrollActivation')
  .then((fn) => {
    setupCVScrollActivation = fn;
    window.setupCVScrollActivation = setupCVScrollActivation;
  })
  .catch(() => { /* ignore */ });

document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = false;

  const scheduleIdle = (callback, timeout = 1200) => {
    if (typeof callback !== 'function') { return; }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout });
    } else {
      setTimeout(callback, 0);
    }
  };

  const scheduleAfterLoad = (callback, timeout = 1200) => {
    if (typeof callback !== 'function') { return; }
    if (document.readyState === 'complete') {
      scheduleIdle(callback, timeout);
    } else {
      window.addEventListener('load', () => scheduleIdle(callback, timeout), { once: true });
    }
  };



  // --- Constantes globales pour la configuration ---
  // Tech wave constants moved to tech-wave module



  // Tech wave data moved to module
  // Initialize tech wave module
  const techWaveLayer = document.querySelector('.tech-wave-container');
  if (techWaveLayer) {
    scheduleAfterLoad(async () => {
      if (!initializeTechWaveModule) {
        initializeTechWaveModule = await loadModule(() => import('./modules/tech-wave.js'), 'initializeTechWave');
      }
      initializeTechWaveModule();
    }, 2400);
  }

  // Initialize i18n after initial DOM is ready
  (async () => {
    if (!initI18nModule) {
      initI18nModule = await loadModule(() => import('./modules/i18n.js'), 'initI18n');
    }
    initI18nModule();
  })();

  // --- Contact CTA Popup Logic ---
  scheduleIdle(async () => {
    if (!setupContactPopupModule) {
      setupContactPopupModule = await loadModule(() => import('./modules/contact-popup.js'), 'setupContactPopup');
    }
    try { setupContactPopupModule(); } catch (_) { /* Ignore errors */ }
  });

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
  (async () => {
    if (!createRouterModule) {
      createRouterModule = await loadModule(() => import('./modules/router.js'), 'createRouter');
    }
    try { createRouterModule(); } catch (_) { /* Ignore errors */ }
  })();

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
  scheduleAfterLoad(async () => {
    if (!setupContactFormModule) {
      setupContactFormModule = await loadModule(() => import('./modules/form.js'), 'setupContactForm');
    }
    try { setupContactFormModule(); } catch (_) { /* Ignore errors */ }
  }, 1800);

  // --- PWA Service Worker registration ---
  if ('serviceWorker' in navigator) {
    scheduleAfterLoad(() => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        if (DEBUG) { console.info('Service worker registration skipped on localhost.'); }
        return;
      }

      const swUrl = '/sw.js';
      navigator.serviceWorker.register(swUrl).catch((error) => {
        if (DEBUG) { console.warn('Service worker registration failed:', error); }
      });
    });
  }
});
