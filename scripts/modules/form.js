export function setupContactForm() {
  const form = document.querySelector('form[data-form-submit="contact"]');
  if (!form) return;
  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');
  const status = form.querySelector('[data-form-status]');
  const errName = form.querySelector('#error-name');
  const errEmail = form.querySelector('#error-email');
  const errMessage = form.querySelector('#error-message');

  const setError = (el, errEl, message) => {
    if (errEl) errEl.textContent = message || '';
    if (message) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
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
    if (honey && honey.value) return;
    if (!ok) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const prevLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        status.textContent = 'Message sent. Thank you!';
      } else {
        status.textContent = 'An error occurred. Please try again later.';
      }
    } catch (err) {
      status.textContent = 'Network error. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = prevLabel;
    }
  });
}


