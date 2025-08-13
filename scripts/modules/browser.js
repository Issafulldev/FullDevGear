export function applyBrowserClasses() {
  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) && /apple/i.test(vendor) && !window.chrome;
  const isChrome = /chrome/i.test(userAgent) && /google/i.test(vendor) && !!window.chrome;
  const isFirefox = /firefox/i.test(userAgent);
  const isEdge = /edg/i.test(userAgent);
  const bodyElement = document.body;
  if (isSafari) {bodyElement.classList.add('browser-safari');}
  else if (isChrome) {bodyElement.classList.add('browser-chrome');}
  else if (isFirefox) {bodyElement.classList.add('browser-firefox');}
  else if (isEdge) {bodyElement.classList.add('browser-edge');}
  else {bodyElement.classList.add('browser-other');}

  window.forceRepaintSafari = () => {
    if (!isSafari) {return;}
    const mainContent = document.querySelector('main#main-content');
    if (mainContent) {
      const computedStyle = window.getComputedStyle(mainContent);
      void computedStyle.getPropertyValue('transform');
      void mainContent.offsetHeight;
      void mainContent.scrollTop;
    }
    document.body.style.transform = 'translateZ(0)';
    setTimeout(() => {
      document.body.style.transform = '';
    }, 10);
    const currentScrollY = window.scrollY;
    window.scrollTo(0, currentScrollY + 1);
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollY);
    });
    const sections = document.querySelectorAll('.main-content-area:not([hidden])');
    sections.forEach((section) => {
      const animatedElements = section.querySelectorAll('[data-animation-item]');
      animatedElements.forEach((el) => {
        void el.offsetHeight;
        el.style.transform = 'translateZ(0.01px)';
        requestAnimationFrame(() => {
          el.style.transform = '';
        });
      });
    });
  };
}


