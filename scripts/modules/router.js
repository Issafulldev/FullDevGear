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

  const showSection = (sectionId, useTransition = true, isReverse = false) => {
    if (isTransitioning && useTransition) {
      if (DEBUG) { console.warn('Transition in progress.'); }
      return;
    }
    if (useTransition) { isTransitioning = true; }

    // Stocker la position de scroll actuelle pour navigation reverse
    const currentScrollY = window.scrollY;
    let hasScrollBeenForced = false;

    // Pour navigation reverse, empêcher le scroll automatique pendant l'animation
    let scrollHandler = null;
    if (isReverse && useTransition) {
      scrollHandler = () => {
        if (!hasScrollBeenForced) {
          window.scrollTo(0, currentScrollY);
        }
      };
      window.addEventListener('scroll', scrollHandler, { passive: false });
    }

    const allSections = document.querySelectorAll('.main-content-area');
    const sectionToShow = document.getElementById(sectionId);
    let sectionToHide = null;
    if (!sectionToShow) {
      console.error(`Section with ID '${sectionId}' not found.`);
      if (useTransition) { isTransitioning = false; }
      return;
    }
    allSections.forEach((sec) => {
      if (!sec.hidden && sec.id !== sectionId) { sectionToHide = sec; }
    });

    const applyPageStyles = (targetSectionId) => {
      if (targetSectionId === 'cv-content') { document.body.classList.add('cv-dark-mode'); }
      else { document.body.classList.remove('cv-dark-mode'); }
    };

    const setSectionVisibility = (section, isVisible) => {
      section.hidden = !isVisible;
      section.setAttribute('aria-hidden', String(!isVisible));
      if (!isVisible) { section.setAttribute('inert', ''); }
      else { section.removeAttribute('inert'); }
    };

    if (!useTransition) {
      allSections.forEach((sec) => {
        setSectionVisibility(sec, false);
        sec.classList.remove('fade-in', 'fade-out');
      });
      setSectionVisibility(sectionToShow, true);
      applyPageStyles(sectionId);

      // Nettoyer le gestionnaire de scroll si pas de transition
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }

      if (sectionId === 'cv-content') { setTimeout(() => window.setupCVScrollActivation && window.setupCVScrollActivation(), 50); }
      return;
    }

    waveElement.style.display = 'block';
    // Nettoyer toutes les classes d'animation précédentes
    waveElement.classList.remove('wave-transition-sweep-out', 'wave-transition-sweep-out-reverse');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const inClass = isReverse ? 'wave-transition-sweep-in-reverse' : 'wave-transition-sweep-in';

    if (isMobile) {
      void waveElement.offsetHeight;
      requestAnimationFrame(() => waveElement.classList.add(inClass));
    } else {
      waveElement.classList.add(inClass);
    }

    waveElement.onanimationend = (event) => {
      const expectedInAnimation = isReverse ? 'wave-sweep-in-reverse' : 'wave-sweep-in';
      const outClass = isReverse ? 'wave-transition-sweep-out-reverse' : 'wave-transition-sweep-out';
      const expectedOutAnimation = isReverse ? 'wave-sweep-out-reverse' : 'wave-sweep-out';

      if (event.animationName === expectedInAnimation) {
        waveElement.onanimationend = null;
        if (sectionToHide) {
          setSectionVisibility(sectionToHide, false);
          sectionToHide.classList.remove('fade-in', 'fade-out');
        }
        setSectionVisibility(sectionToShow, true);
        sectionToShow.classList.remove('fade-in', 'fade-out');

        // Scroll pour navigation normale (Home → CV) ou navigation reverse après animation
        if (!isReverse) {
          window.scrollTo(0, 0);
        } else {
          // Pour navigation reverse, scroll maintenant que la vague couvre l'écran
          hasScrollBeenForced = true;
          window.scrollTo(0, 0);
        }

        applyPageStyles(sectionId);
        waveElement.classList.remove(inClass);
        waveElement.classList.add(outClass);
        waveElement.onanimationend = (e2) => {
          if (e2.animationName === expectedOutAnimation) {
            waveElement.onanimationend = null;
            waveElement.style.display = 'none';
            waveElement.classList.remove(outClass);

            // Nettoyer le gestionnaire de scroll pour navigation reverse
            if (scrollHandler) {
              window.removeEventListener('scroll', scrollHandler);
            }

            isTransitioning = false;
            setTimeout(() => window.forceRepaintSafari && window.forceRepaintSafari(), 50);
            if (sectionId === 'cv-content') { setTimeout(() => window.setupCVScrollActivation && window.setupCVScrollActivation(), 100); }
          }
        };
      }
    };
  };

  const updateNavActive = (currentPath) => {
    const navLinks = document.querySelectorAll('nav[aria-label="Main navigation"] a');
    const navUl = document.querySelector('nav[aria-label="Main navigation"] ul');
    let activeLink = null;

    navLinks.forEach((link) => {
      const sectionId = link.getAttribute('data-section-toggle');
      const linkPath = Object.keys(ROUTES).find((key) => ROUTES[key] === sectionId) || '/';
      if (linkPath === currentPath) {
        link.classList.add('nav-active');
        activeLink = link;
      }
      else {
        link.classList.remove('nav-active');
      }
    });

    // Animer la capsule liquid glass
    if (activeLink && navUl) {
      navUl.classList.add('nav-has-active');

      // Fonction pour calculer et positionner la capsule
      const positionCapsule = () => {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navUl.getBoundingClientRect();

        // Vérifier que les éléments ont des dimensions valides
        if (linkRect.width > 0 && navRect.width > 0) {
          const relativeLeft = linkRect.left - navRect.left;
          const linkWidth = linkRect.width;

          // Positionner la capsule avec un padding pour l'effet liquid
          navUl.style.setProperty('--capsule-left', `${relativeLeft}px`);
          navUl.style.setProperty('--capsule-width', `${linkWidth}px`);
        } else {
          // Si les dimensions ne sont pas encore disponibles, réessayer
          setTimeout(positionCapsule, 50);
        }
      };

      // Double délai pour s'assurer du rendu complet
      requestAnimationFrame(() => {
        requestAnimationFrame(positionCapsule);
      });
    } else if (navUl) {
      navUl.classList.remove('nav-has-active');
    }
  };

  const navigateTo = (path, push = true, useTransition = true) => {
    const sectionId = ROUTES[path];
    if (!sectionId) {
      if (DEBUG) { console.warn(`Route not found for path: ${path}. Defaulting to freelance-content.`); }
      path = '/';
    }

    // Détecter le sens de navigation
    const currentPath = getPathFromHash();
    const isGoingBackToHome = currentPath === '/cv' && path === '/';

    showSection(ROUTES[path], useTransition, isGoingBackToHome);
    updateNavActive(path);
    if (push) {
      const hash = `#${path === '/' ? '' : path.replace(/^\//, '')}`;
      if (window.location.hash !== hash) { window.location.hash = hash; }
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
      if (href === '#freelance') { path = '/'; }
      else if (href === '#cv') { path = '/cv'; }
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
  if (mainContent) { mainContent.style.opacity = '1'; }

  // Repositionner la navbar après le rendu initial complet
  setTimeout(() => {
    updateNavActive(initialPath);
  }, 100);

  // Recalculer la position de la capsule lors du redimensionnement
  window.addEventListener('resize', () => {
    const currentPath = getPathFromHash();
    setTimeout(() => updateNavActive(currentPath), 100);
  });

  return { navigateTo, updateNavActive };
}


