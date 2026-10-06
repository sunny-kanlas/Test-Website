// Bihar Studio test site: sends Meta pixel events and lists them in the "Pixel events" panel.
// The base code in each page's <head> already sent PageView.
(function () {
  'use strict';

  var LEAD_KEY = 'pixel-test-lead';
  var logList = document.querySelector('.pixel-log-list');
  var logCount = document.querySelector('.pixel-log-count');
  var logToggle = document.querySelector('.pixel-log-toggle');
  var count = 0;

  function log(text, kind) {
    if (!logList) return;
    var item = document.createElement('li');
    if (kind) item.className = kind;
    var time = new Date().toLocaleTimeString();
    item.textContent = time + '  ' + text;
    logList.appendChild(item);
    if (kind !== 'info') {
      count += 1;
      logCount.textContent = String(count);
    }
  }

  /** Sends a standard event (fbq track) or a custom one (fbq trackCustom). */
  function track(eventName, params, custom) {
    if (typeof window.fbq !== 'function') {
      log(eventName + ' not sent: the pixel code is missing', 'error');
      return;
    }
    window.fbq(custom ? 'trackCustom' : 'track', eventName, params || {});
    log(eventName + (params ? ' ' + JSON.stringify(params) : ''));
  }

  function storage(action, value) {
    try {
      if (action === 'set') sessionStorage.setItem(LEAD_KEY, value);
      if (action === 'get') return sessionStorage.getItem(LEAD_KEY);
      if (action === 'remove') sessionStorage.removeItem(LEAD_KEY);
    } catch (e) {
      // Private mode or blocked storage: the Lead event just won't be deduplicated
    }
    return null;
  }

  // --- Log panel --------------------------------------------------------------------------

  if (logToggle) {
    logToggle.addEventListener('click', function () {
      var open = logList.hidden;
      logList.hidden = !open;
      logToggle.setAttribute('aria-expanded', String(open));
    });
  }
  log('PageView (base code)');

  // After the page loads, tell whether Meta's library actually loaded (ad blockers stop it)
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loaded = window.fbq && window.fbq.instance;
      log(loaded ? 'Pixel library loaded ✓' : 'Pixel library blocked: turn off your ad blocker to test', loaded ? 'info' : 'error');
    }, 1500);
  });

  // --- Events -----------------------------------------------------------------------------

  // Links/buttons with data-pixel-event, e.g. "Call us" → Contact
  document.querySelectorAll('[data-pixel-event]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-pixel-event'));
    });
  });

  // Services page: ViewContent on open, Schedule on "Book a visit"
  var bookButtons = document.querySelectorAll('[data-book]');
  if (bookButtons.length) {
    track('ViewContent', { content_name: 'Services' });
    bookButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        track('Schedule', { content_name: btn.getAttribute('data-book') });
        btn.textContent = 'Visit requested ✓';
        btn.disabled = true;
      });
    });
  }

  // Contact form: validate, remember the lead, then open the thank-you page
  var form = document.getElementById('lead-form');
  if (form) {
    var error = document.getElementById('form-error');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // form.elements, not form.name: a form's own `name` property hides the "name" input
      var fields = form.elements;
      var name = fields.namedItem('name').value.trim();
      var email = fields.namedItem('email').value.trim();
      var phone = fields.namedItem('phone').value.trim();
      var problem = !name
        ? 'Enter your name.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? 'Enter a valid email.'
          : phone.replace(/\D/g, '').length < 10
            ? 'Enter a phone number with at least 10 digits.'
            : '';
      if (problem) {
        error.textContent = problem;
        error.hidden = false;
        return;
      }
      error.hidden = true;
      storage('set', fields.namedItem('service').value);
      window.location.href = 'thank-you.html';
    });
  }

  // Thank-you page: Lead only after a real form submit (not on refresh or a direct visit)
  var leadNote = document.querySelector('[data-lead-note]');
  if (leadNote) {
    var service = storage('get');
    if (service) {
      storage('remove');
      track('Lead', { content_name: service });
      leadNote.textContent = 'Lead event sent for "' + service + '".';
    } else {
      leadNote.textContent = 'No Lead event: this page was opened directly, not from the form.';
    }
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
