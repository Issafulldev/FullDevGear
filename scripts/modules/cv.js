let cvSectionObserver = null;

export function setupCVScrollActivation() {
  const isTouchDevice =
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    window.matchMedia('(max-width: 1024px)').matches;
  if (!isTouchDevice) return;
  if (cvSectionObserver) {
    cvSectionObserver.disconnect();
    cvSectionObserver = null;
  }
  const cvSections = document.querySelectorAll('#cv-content .cv-section');
  if (cvSections.length === 0) return;
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: [0.2, 0.5],
  };
  const activeSections = new Set();
  cvSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      if (isVisible && !activeSections.has(section)) {
        section.classList.add('cv-section-active');
        activeSections.add(section);
        if (navigator.vibrate && window.DeviceMotionEvent) navigator.vibrate(50);
      } else if (!isVisible && activeSections.has(section)) {
        section.classList.remove('cv-section-active');
        activeSections.delete(section);
      }
    });
  }, observerOptions);
  cvSections.forEach((section) => cvSectionObserver.observe(section));
  const cleanupCVSections = () => {
    const isCvPage = document.body.classList.contains('cv-dark-mode');
    if (!isCvPage) {
      activeSections.clear();
      cvSections.forEach((section) => section.classList.remove('cv-section-active'));
    }
  };
  document.addEventListener('DOMContentLoaded', cleanupCVSections);
  window.addEventListener('hashchange', cleanupCVSections);
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cvSections.forEach((section) => {
        if (cvSectionObserver) {
          cvSectionObserver.unobserve(section);
          cvSectionObserver.observe(section);
        }
      });
    }, 250);
  });
}


