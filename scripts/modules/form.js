// Form success storage key
import { getTranslation, onLanguageChange } from './i18n.js';

// Configuration pour fallback mobile
const FALLBACK_EMAIL = 'issa@fulldevgear.com';

// Fonction de fallback mailto pour mobile
function createMailtoFallback(name, email, message) {
  const subject = encodeURIComponent('New message from FullDevGear');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;

  return mailtoUrl;
}

const FORM_SUCCESS_KEY = 'fdg_contact_submitted';
const COOLDOWN_HOURS = 24;

// Confetti animation function
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';
  confettiContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
  `;

  document.body.appendChild(confettiContainer);

  // Create confetti pieces
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      top: -10px;
      left: ${Math.random() * 100}%;
      animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.remove();
  }, 5000);
}

// Check if cooldown period has passed
function isCooldownExpired(timestamp) {
  const now = Date.now();
  const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000; // 24h in milliseconds
  return (now - timestamp) >= cooldownMs;
}

// Format time remaining
function formatTimeRemaining(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Create success banner with modern UI style
function createSuccessBanner(submissionData = null) {
  const banner = document.createElement('div');
  banner.className = 'form-success-banner';

  let canResend = false;
  let timeRemainingMs = 0;

  if (submissionData && submissionData.timestamp) {
    canResend = isCooldownExpired(submissionData.timestamp);
    if (!canResend) {
      const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
      timeRemainingMs = cooldownMs - (Date.now() - submissionData.timestamp);
    }
  }

  banner.innerHTML = `
    <div class="success-scene">
      <!-- Main content -->
      <div class="success-main-content">
        <div class="success-icon-modern">🤝</div>
        <h3>${getTranslation('success_title')}</h3>
        <p>${getTranslation('success_message')}</p>
        
        <div class="success-actions">
          <button type="button" class="success-button-primary" id="portfolio-btn">
            <span>${getTranslation('success_btn_portfolio')}</span>
          </button>
          <button type="button" class="success-button-secondary" id="about-btn">
            <span>${getTranslation('success_btn_home')}</span>
          </button>
        </div>
      </div>
        
      ${!canResend ? `
        <div class="cooldown-card">
          <div class="cooldown-header">
            <span class="cooldown-emoji">⏱️</span>
            <span class="cooldown-title">${getTranslation('cooldown_title')}</span>
          </div>
          <div class="cooldown-timer">
            <span class="time-remaining" data-remaining="${timeRemainingMs}">${formatTimeRemaining(timeRemainingMs)}</span>
          </div>
          <div class="cooldown-subtitle">${getTranslation('cooldown_subtitle')}</div>
        </div>
      ` : `
        <div class="resend-card">
          <div class="resend-header">
            <span class="resend-emoji">💡</span>
            <span class="resend-title">${getTranslation('resend_title')}</span>
          </div>
          <button type="button" class="resend-button-modern" id="resend-form-btn">
            <span class="resend-button-icon">📝</span>
            <span class="resend-button-text">${getTranslation('resend_btn')}</span>
          </button>
        </div>
      `}
    </div>
  `;

  return banner;
}

// Function to reset form and show it again
function resetToForm() {
  localStorage.removeItem(FORM_SUCCESS_KEY);
  location.reload(); // Refresh to show the original form
}

// Start countdown timer
function startCountdown(element) {
  const updateTimer = () => {
    const remaining = parseInt(element.dataset.remaining);
    const newRemaining = remaining - 60000; // Subtract 1 minute

    if (newRemaining <= 0) {
      // Cooldown expired, refresh the page to show resend button
      location.reload();
      return;
    }

    element.dataset.remaining = newRemaining;
    element.textContent = formatTimeRemaining(newRemaining);
  };

  // Update every minute
  setInterval(updateTimer, 60000);
}

// Fonction pour mettre à jour une bannière existante lors du changement de langue
function updateExistingBanner() {
  const existingBanner = document.querySelector('.form-success-banner');
  if (!existingBanner) {
    return;
  }

  // Récupérer les données de soumission si disponibles
  let submissionData = null;
  try {
    const data = localStorage.getItem(FORM_SUCCESS_KEY);
    if (data) {
      submissionData = JSON.parse(data);
    }
  } catch (e) {
    // Ignore les erreurs de parsing
  }

  // Créer une nouvelle bannière avec les traductions à jour
  const newBanner = createSuccessBanner(submissionData);
  const article = existingBanner.closest('article');

  if (article) {
    // Remplacer l'ancienne bannière par la nouvelle
    article.innerHTML = '';
    article.appendChild(newBanner);

    // Reconfigurer les événements
    const resendBtn = newBanner.querySelector('#resend-form-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', resetToForm);
    }

    const portfolioBtn = newBanner.querySelector('#portfolio-btn');
    const aboutBtn = newBanner.querySelector('#about-btn');

    if (portfolioBtn) {
      portfolioBtn.addEventListener('click', () => {
        window.location.hash = '#/';
        requestAnimationFrame(() => {
          const gallery = document.getElementById('build-gallery');
          if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            gallery.focus({ preventScroll: true });
          }
        });
      });
    }

    if (aboutBtn) {
      aboutBtn.addEventListener('click', () => {
        window.location.hash = '#/';
      });
    }

    const timeRemaining = newBanner.querySelector('.time-remaining');
    if (timeRemaining) {
      startCountdown(timeRemaining);
    }
  }
}

export function setupContactForm() {
  const form = document.querySelector('form[data-form-submit="contact"]');
  if (!form) { return; }

  // Écouter les changements de langue pour mettre à jour les bannières
  onLanguageChange(() => {
    updateExistingBanner();
  });

  // Check if form was already submitted
  const submissionData = localStorage.getItem(FORM_SUCCESS_KEY);
  if (submissionData) {
    try {
      const data = JSON.parse(submissionData);
      const article = form.closest('article');
      if (article) {
        const banner = createSuccessBanner(data);
        article.innerHTML = '';
        article.appendChild(banner);

        // Set up resend button if available
        const resendBtn = banner.querySelector('#resend-form-btn');
        if (resendBtn) {
          resendBtn.addEventListener('click', resetToForm);
        }

        // Configurer les boutons d'action
        const portfolioBtn = banner.querySelector('#portfolio-btn');
        const aboutBtn = banner.querySelector('#about-btn');

        if (portfolioBtn) {
          portfolioBtn.addEventListener('click', () => {
            // Naviguer vers la galerie de projets
            window.location.hash = '#/';
            requestAnimationFrame(() => {
              const gallery = document.getElementById('build-gallery');
              if (gallery) { gallery.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
          });
        }

        if (aboutBtn) {
          aboutBtn.addEventListener('click', () => {
            // Retourner à l'accueil
            window.location.hash = '#/';
          });
        }

        // Set up countdown timer if in cooldown
        const timeRemaining = banner.querySelector('.time-remaining');
        if (timeRemaining) {
          startCountdown(timeRemaining);
        }

        return;
      }
    } catch (e) {
      // Invalid data, remove it
      localStorage.removeItem(FORM_SUCCESS_KEY);
    }
  }

  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');
  const status = form.querySelector('[data-form-status]');
  const errName = form.querySelector('#error-name');
  const errEmail = form.querySelector('#error-email');
  const errMessage = form.querySelector('#error-message');

  const setError = (el, errEl, message) => {
    if (errEl) { errEl.textContent = message || ''; }
    if (message) { el.setAttribute('aria-invalid', 'true'); }
    else { el.removeAttribute('aria-invalid'); }
  };

  const validateName = () => {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      setError(nameInput, errName, 'Please enter at least 2 characters.');
      return false;
    }
    setError(nameInput, errName, '');
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      setError(emailInput, errEmail, 'Please enter a valid email address.');
      return false;
    }
    setError(emailInput, errEmail, '');
    return true;
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();
    if (value.length < 10) {
      setError(messageInput, errMessage, 'Please enter at least 10 characters.');
      return false;
    }
    setError(messageInput, errMessage, '');
    return true;
  };

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) { return; }
    if (!ok) { return; }

    const submitBtn = form.querySelector('button[type="submit"]');
    const prevLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    let timeoutId;
    try {
      const formData = new FormData(form);

      // Options améliorées pour compatibility mobile
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout

      const fetchOptions = {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
        signal: controller.signal,
        // Spécifique pour FormSubmit et mobile
        mode: 'cors',
        credentials: 'omit'
      };

      // Fonction de retry pour les connexions mobiles instables
      const makeRequest = async (retries = 2) => {
        try {
          return await fetch(form.action, fetchOptions);
        } catch (error) {
          console.log('Fetch error details:', error.message, error.name, error);

          // Détecter les erreurs DNS spécifiquement
          const isDNSError = error.message.includes('DNS') ||
            error.message.includes('resolve') ||
            error.message.includes('ENOTFOUND') ||
            error.message.includes('getaddrinfo') ||
            (error.name === 'TypeError' && error.message.includes('Failed to fetch'));

          if (isDNSError) {
            console.log('DNS error detected, will use mailto fallback');
            throw new Error('DNS_ERROR_FALLBACK_NEEDED');
          }

          if (retries > 0 && (error.name === 'TypeError' || error.name === 'NetworkError')) {
            console.log(`Retrying request... ${retries} attempts left`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
            return makeRequest(retries - 1);
          }

          // Si fetch échoue complètement sur mobile, utiliser soumission classique
          console.log('Fetch failed, falling back to mailto');
          throw new Error('FALLBACK_NEEDED');
        }
      };

      const res = await makeRequest();
      clearTimeout(timeoutId); // Nettoyer le timeout si la requête réussit

      if (res.ok) {
        // Store success in localStorage
        const submissionData = {
          timestamp: Date.now(),
          name: nameInput.value.trim(),
          email: emailInput.value.trim()
        };
        localStorage.setItem(FORM_SUCCESS_KEY, JSON.stringify(submissionData));

        // Trigger confetti animation
        createConfetti();

        // Replace form with success banner after short delay
        setTimeout(() => {
          const article = form.closest('article');
          if (article) {
            const banner = createSuccessBanner(submissionData);
            article.style.opacity = '0';
            article.style.transform = 'translateY(-10px)';
            article.style.transition = 'all 0.5s ease';

            setTimeout(() => {
              article.innerHTML = '';
              article.appendChild(banner);

              // Configurer les boutons d'action
              const portfolioBtn = banner.querySelector('#portfolio-btn');
              const aboutBtn = banner.querySelector('#about-btn');

              if (portfolioBtn) {
                portfolioBtn.addEventListener('click', () => {
                  // Naviguer vers la galerie de projets
                  window.location.hash = '#/';
                  requestAnimationFrame(() => {
                    const gallery = document.getElementById('build-gallery');
                    if (gallery) { gallery.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
                  });
                });
              }

              if (aboutBtn) {
                aboutBtn.addEventListener('click', () => {
                  // Retourner à l'accueil
                  window.location.hash = '#/';
                });
              }

              // Démarrer le timer de cooldown si nécessaire
              const timeRemaining = banner.querySelector('.time-remaining');
              if (timeRemaining) {
                startCountdown(timeRemaining);
              }

              article.style.opacity = '1';
              article.style.transform = 'translateY(0)';
            }, 500);
          }
        }, 1000);

      } else {
        // Essayer de récupérer plus d'informations sur l'erreur
        let errorMessage = 'An error occurred. Please try again later.';
        try {
          const errorData = await res.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignorer les erreurs de parsing JSON
        }
        status.textContent = errorMessage;
        console.error('Form submission failed:', res.status, res.statusText);
      }
    } catch (err) {
      clearTimeout(timeoutId); // Nettoyer le timeout en cas d'erreur
      console.error('Form submission error:', err);

      // Fallback pour problèmes DNS ou réseau mobile
      if (err.message === 'FALLBACK_NEEDED' ||
        err.message === 'DNS_ERROR_FALLBACK_NEEDED' ||
        err.message.includes('DNS') ||
        err.message.includes('fetch')) {
        console.log('Network/DNS issue detected, offering mailto fallback');

        // Créer le lien mailto
        const mailtoUrl = createMailtoFallback(
          nameInput.value.trim(),
          emailInput.value.trim(),
          messageInput.value.trim()
        );

        // Afficher un message explicatif et proposer le fallback
        const currentLang = localStorage.getItem('fdg_lang') || 'en';
        const messages = {
          en: {
            title: 'Connection issue detected',
            text: 'Unable to send via our form service. You can send your message directly via email:',
            button: '📧 Send via Email App'
          },
          fr: {
            title: 'Problème de connexion détecté',
            text: 'Impossible d\'envoyer via notre formulaire. Vous pouvez envoyer votre message directement par email :',
            button: '📧 Envoyer via Email'
          }
        };

        const msg = messages[currentLang] || messages.en;

        status.innerHTML = `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
            <p style="margin: 0 0 0.5rem 0; color: #856404;"><strong>${msg.title}</strong></p>
            <p style="margin: 0 0 1rem 0; color: #856404; font-size: 0.9rem;">
              ${msg.text}
            </p>
            <a href="${mailtoUrl}" 
               style="display: inline-block; background: #007bff; color: white; padding: 0.5rem 1rem; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              ${msg.button}
            </a>
          </div>
        `;

        // Sauvegarder dans localStorage quand même pour le cooldown
        const submissionData = {
          timestamp: Date.now(),
          name: nameInput.value.trim(),
          email: emailInput.value.trim()
        };
        localStorage.setItem(FORM_SUCCESS_KEY, JSON.stringify(submissionData));

        return;
      }

      // Messages d'erreur plus spécifiques
      let errorMessage = 'Network error. Please try again later.';
      if (err.name === 'AbortError') {
        errorMessage = 'Request timeout. Please check your connection and try again.';
      } else if (err.name === 'TypeError') {
        errorMessage = 'Connection failed. Please check your internet connection.';
      }

      status.textContent = errorMessage;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = prevLabel;
    }
  });
}

