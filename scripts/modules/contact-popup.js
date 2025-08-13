export function setupContactPopup() {
  const contactCtaBtn = document.getElementById('contact-cta-btn');
  const contactPopup = document.getElementById('contact-cta-links');
  if (!contactCtaBtn || !contactPopup) {
    console.warn('Contact CTA button or popup not found!');
    return;
  }
  let isAnimating = false;
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocusedBeforeOpen = null;

  const trapFocus = (e) => {
    const focusable = contactPopup.querySelectorAll(focusableSelector);
    if (focusable.length === 0) { return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const showPopup = () => {
    if (isAnimating) { return; }
    isAnimating = true;
    contactCtaBtn.setAttribute('aria-expanded', 'true');
    contactCtaBtn.classList.add('active');
    contactPopup.hidden = false;
    contactPopup.offsetHeight;
    contactPopup.classList.add('show');
    lastFocusedBeforeOpen = document.activeElement;
    const firstFocusable = contactPopup.querySelector(focusableSelector);
    if (firstFocusable) { firstFocusable.focus(); }
    document.addEventListener('keydown', trapFocus);
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  };

  const hidePopup = () => {
    if (isAnimating) { return; }
    isAnimating = true;
    contactCtaBtn.setAttribute('aria-expanded', 'false');
    contactCtaBtn.classList.remove('active');
    contactPopup.classList.remove('show');
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedBeforeOpen) {
      try {
        lastFocusedBeforeOpen.focus();
      } catch (_) { /* Ignore focus errors */ }
    }
    setTimeout(() => {
      contactPopup.hidden = true;
      isAnimating = false;
    }, 500);
  };

  const togglePopup = () => {
    const isExpanded = contactCtaBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) { hidePopup(); }
    else { showPopup(); }
  };

  contactCtaBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    togglePopup();
  });
  document.addEventListener('click', (event) => {
    const isExpanded = contactCtaBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded && !contactCtaBtn.contains(event.target) && !contactPopup.contains(event.target)) { hidePopup(); }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactCtaBtn.getAttribute('aria-expanded') === 'true') {
      hidePopup();
      contactCtaBtn.focus();
    }
  });
}


