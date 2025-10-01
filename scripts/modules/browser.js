export function applyBrowserClasses() {
  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) && /apple/i.test(vendor) && !window.chrome;
  const isChrome = /chrome/i.test(userAgent) && /google/i.test(vendor) && !!window.chrome;
  const isFirefox = /firefox/i.test(userAgent);
  const isEdge = /edg/i.test(userAgent);
  const bodyElement = document.body;
  if (isSafari) {
    bodyElement.classList.add('browser-safari');
  } else if (isChrome) {
    bodyElement.classList.add('browser-chrome');
  } else if (isFirefox) {
    bodyElement.classList.add('browser-firefox');
  } else if (isEdge) {
    bodyElement.classList.add('browser-edge');
  } else {
    bodyElement.classList.add('browser-other');
  }
}