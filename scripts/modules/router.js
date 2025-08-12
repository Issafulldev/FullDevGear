const DEBUG = false;

export function createRouter() {
  const ROUTES = {
    '/': 'freelance-content',
    '/cv': 'cv-content',
  };

  const waveElement = document.getElementById('page-transition-wave');
  if (!waveElement) {
    console.error('Page transition wave element (#page-transition-wave) not found.');
    return { navigateTo: () => { }, updateNavActive: () => { } };
  }

  let isTransitioning = false;

  const showSection = (sectionId, useTransition = true) => {
    if (isTransitioning && useTransition) {
      if (DEBUG) console.warn('Transition in progress.');
      return;
    }
    if (useTransition) isTransitioning = true;

    const allSections = document.querySelectorAll('.main-content-area');
    const sectionToShow = document.getElementById(sectionId);
    let sectionToHide = null;
    if (!sectionToShow) {
      console.error(`Section with ID '${sectionId}' not found.`);
      if (useTransition) isTransitioning = false;
      return;
    }
    allSections.forEach((sec) => {
      if (!sec.hidden && sec.id !== sectionId) sectionToHide = sec;
    });

    const applyPageStyles = (targetSectionId) => {
      if (targetSectionId === 'cv-content') document.body.classList.add('cv-dark-mode');
      else document.body.classList.remove('cv-dark-mode');
    };

    if (!useTransition) {
      allSections.forEach((sec) => {
        sec.hidden = true;
        sec.classList.remove('fade-in', 'fade-out');
      });
      sectionToShow.hidden = false;
      applyPageStyles(sectionId);
      if (sectionId === 'cv-content') setTimeout(() => window.setupCVScrollActivation && window.setupCVScrollActivation(), 50);
      return;
    }

    waveElement.style.display = 'block';
    waveElement.classList.remove('wave-transition-sweep-out');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      void waveElement.offsetHeight;
      requestAnimationFrame(() => waveElement.classList.add('wave-transition-sweep-in'));
    } else waveElement.classList.add('wave-transition-sweep-in');

    waveElement.onanimationend = (event) => {
      if (event.animationName === 'wave-sweep-in') {
        waveElement.onanimationend = null;
        if (sectionToHide) {
          sectionToHide.hidden = true;
          sectionToHide.classList.remove('fade-in', 'fade-out');
        }
        sectionToShow.hidden = false;
        sectionToShow.classList.remove('fade-in', 'fade-out');
        window.scrollTo(0, 0);
        applyPageStyles(sectionId);
        waveElement.classList.remove('wave-transition-sweep-in');
        waveElement.classList.add('wave-transition-sweep-out');
        waveElement.onanimationend = (e2) => {
          if (e2.animationName === 'wave-sweep-out') {
            waveElement.onanimationend = null;
            waveElement.style.display = 'none';
            waveElement.classList.remove('wave-transition-sweep-out');
            isTransitioning = false;
            setTimeout(() => window.forceRepaintSafari && window.forceRepaintSafari(), 50);
            if (sectionId === 'cv-content') setTimeout(() => window.setupCVScrollActivation && window.setupCVScrollActivation(), 100);
          }
        };
      }
    };
  };

  const updateNavActive = (currentPath) => {
    const navLinks = document.querySelectorAll('nav[aria-label="Main navigation"] a');
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute('data-section-toggle');
      const linkPath = Object.keys(ROUTES).find((key) => ROUTES[key] === sectionId) || '/';
      if (linkPath === currentPath) link.classList.add('nav-active');
      else link.classList.remove('nav-active');
    });
  };

  const navigateTo = (path, push = true, useTransition = true) => {
    const sectionId = ROUTES[path];
    if (!sectionId) {
      if (DEBUG) console.warn(`Route not found for path: ${path}. Defaulting to freelance-content.`);
      path = '/';
    }
    showSection(ROUTES[path], useTransition);
    updateNavActive(path);
    if (push) {
      const hash = `#${path === '/' ? '' : path.replace(/^\//, '')}`;
      if (window.location.hash !== hash) window.location.hash = hash;
    }
  };

  const getPathFromHash = () => {
    const raw = window.location.hash.replace(/^#/, '');
    return raw ? `/${raw}` : '/';
  };

  document.querySelectorAll('nav[aria-label="Main navigation"] a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const sectionId = link.getAttribute('data-section-toggle');
      const path = Object.keys(ROUTES).find((key) => ROUTES[key] === sectionId) || '/';
      const currentPath = window.location.hash.replace(/^#/, '') ? `/${window.location.hash.replace(/^#/, '')}` : '/';
      if (currentPath !== path) {
        e.preventDefault();
        navigateTo(path, true, true);
      }
    });
  });

  document.querySelectorAll('footer nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      let path = null;
      if (href === '#freelance') path = '/';
      else if (href === '#cv') path = '/cv';
      const currentPath = window.location.hash.replace(/^#/, '') ? `/${window.location.hash.replace(/^#/, '')}` : '/';
      if (path && currentPath !== path) {
        e.preventDefault();
        navigateTo(path, true, true);
      }
    });
  });

  window.addEventListener('hashchange', () => {
    const path = getPathFromHash();
    navigateTo(path, false, true);
  });

  const initialPath = getPathFromHash();
  navigateTo(initialPath, false, false);

  const mainContent = document.querySelector('main#main-content');
  if (mainContent) mainContent.style.opacity = '1';

  return { navigateTo, updateNavActive };
}


