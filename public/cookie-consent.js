(function () {
  const KEY = 'maria-cookie-consent';
  const VERSION = '1';
  let injected = false;

  function readConsent() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.version === VERSION ? parsed : null;
    } catch {
      return null;
    }
  }

  function writeConsent(analytics, marketing) {
    try {
      const payload = {
        version: VERSION,
        timestamp: new Date().toISOString(),
        analytics: !!analytics,
        marketing: !!marketing,
      };
      localStorage.setItem(KEY, JSON.stringify(payload));
      applyConsentState(payload);
      window.dispatchEvent(new CustomEvent('maria:cookieConsentChanged', { detail: payload }));
    } catch {}
  }

  function applyConsentState(consent) {
    const root = document.documentElement;
    root.dataset.analyticsConsent = consent && consent.analytics ? 'granted' : 'denied';
    root.dataset.marketingConsent = consent && consent.marketing ? 'granted' : 'denied';
    root.dataset.cookieConsentState = consent ? 'set' : 'unset';
  }

  function setToggle(id, checked) {
    const node = document.getElementById(id);
    if (node) node.setAttribute('aria-checked', checked ? 'true' : 'false');
  }

  function getToggle(id) {
    const node = document.getElementById(id);
    return node ? node.getAttribute('aria-checked') === 'true' : false;
  }

  function showBanner() {
    const banner = document.getElementById('mcc-banner');
    if (banner) banner.classList.add('mcc-visible');
  }

  function hideBanner() {
    const banner = document.getElementById('mcc-banner');
    if (banner) banner.classList.remove('mcc-visible');
  }

  function showModal() {
    ensureMarkup();
    syncModalFromStoredConsent();
    hideBanner();
    const overlay = document.getElementById('mcc-overlay');
    if (!overlay) return;
    overlay.classList.add('mcc-visible');
    overlay.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  }

  function hideModal() {
    const overlay = document.getElementById('mcc-overlay');
    if (!overlay) return;
    overlay.style.opacity = '0';
    setTimeout(() => overlay.classList.remove('mcc-visible'), 180);
    overlay.setAttribute('aria-hidden', 'true');
  }

  function syncModalFromStoredConsent() {
    const consent = readConsent();
    setToggle('mcc-toggle-analytics', !!(consent && consent.analytics));
    setToggle('mcc-toggle-marketing', !!(consent && consent.marketing));
  }

  function saveFromModal() {
    writeConsent(getToggle('mcc-toggle-analytics'), getToggle('mcc-toggle-marketing'));
    hideBanner();
    hideModal();
  }

  function acceptAll() {
    writeConsent(true, true);
    hideBanner();
    hideModal();
  }

  function rejectAll() {
    writeConsent(false, false);
    hideBanner();
    hideModal();
  }

  function bindEvents() {
    const bindings = [
      ['mcc-accept-all', acceptAll],
      ['mcc-reject', rejectAll],
      ['mcc-manage', showModal],
      ['mcc-modal-accept', acceptAll],
      ['mcc-modal-reject', rejectAll],
      ['mcc-modal-save', saveFromModal],
      ['mcc-close', () => {
        hideModal();
        if (!readConsent()) showBanner();
      }],
    ];

    bindings.forEach(([id, handler]) => {
      const node = document.getElementById(id);
      if (node) node.addEventListener('click', handler);
    });

    const overlay = document.getElementById('mcc-overlay');
    if (overlay) {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          hideModal();
          if (!readConsent()) showBanner();
        }
      });
    }

    ['mcc-toggle-analytics', 'mcc-toggle-marketing'].forEach((id) => {
      const node = document.getElementById(id);
      if (!node) return;
      node.addEventListener('click', () => {
        setToggle(id, !getToggle(id));
      });
    });
  }

  function ensureMarkup() {
    if (injected) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div id="mcc-banner" class="mcc-banner" aria-live="polite" aria-label="Cookie consent">
        <div class="mcc-banner-inner">
          <div class="mcc-banner-copy">
            <p class="mcc-banner-text">
              This site can store essential preference data and, if you choose, optional analytics or marketing consent settings.
              <a href="/cookies" class="mcc-link">Cookie Policy</a>
              <button class="mcc-manage-link" id="mcc-manage" type="button">Manage Preferences</button>
            </p>
          </div>
          <div class="mcc-banner-actions">
            <button class="mcc-btn mcc-btn-ghost" id="mcc-reject" type="button">Reject</button>
            <button class="mcc-btn mcc-btn-primary" id="mcc-accept-all" type="button">Accept All</button>
          </div>
        </div>
      </div>

      <div id="mcc-overlay" class="mcc-overlay" aria-hidden="true">
        <div class="mcc-modal" role="dialog" aria-modal="true" aria-labelledby="mcc-title">
          <div class="mcc-modal-header">
            <h2 class="mcc-modal-title" id="mcc-title">Cookie Preferences</h2>
            <button class="mcc-close" id="mcc-close" type="button" aria-label="Close cookie preferences">
              <span></span>
              <span></span>
            </button>
          </div>

          <div class="mcc-modal-body">
            <div class="mcc-category">
              <div class="mcc-category-head">
                <span class="mcc-category-title">Essential storage</span>
                <span class="mcc-badge">Always active</span>
              </div>
              <p class="mcc-category-text">
                Stores your theme and consent preferences so the site remembers them on this device.
              </p>
            </div>

            <div class="mcc-category">
              <div class="mcc-category-head">
                <span class="mcc-category-title">Analytics</span>
                <button class="mcc-toggle" id="mcc-toggle-analytics" type="button" role="switch" aria-checked="false" aria-label="Enable analytics cookies">
                  <span class="mcc-toggle-thumb"></span>
                </button>
              </div>
              <p class="mcc-category-text">
                Allows optional analytics tools to load only after consent is granted.
              </p>
              <p class="mcc-category-note">Disabled by default until you connect an analytics provider.</p>
            </div>

            <div class="mcc-category">
              <div class="mcc-category-head">
                <span class="mcc-category-title">Marketing</span>
                <button class="mcc-toggle" id="mcc-toggle-marketing" type="button" role="switch" aria-checked="false" aria-label="Enable marketing cookies">
                  <span class="mcc-toggle-thumb"></span>
                </button>
              </div>
              <p class="mcc-category-text">
                Allows optional advertising or conversion scripts to load only after consent is granted.
              </p>
              <p class="mcc-category-note">Disabled by default until you connect marketing scripts.</p>
            </div>

            <p class="mcc-modal-note">
              Preferences are saved in your browser's local storage and apply only to this site and browser.
              You can reopen this panel anytime from the footer.
            </p>
          </div>

          <div class="mcc-modal-actions">
            <button class="mcc-btn mcc-btn-ghost" id="mcc-modal-reject" type="button">Reject All</button>
            <button class="mcc-btn mcc-btn-ghost" id="mcc-modal-save" type="button">Save Preferences</button>
            <button class="mcc-btn mcc-btn-primary" id="mcc-modal-accept" type="button">Accept All</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    injected = true;
    bindEvents();
  }

  function init() {
    ensureMarkup();
    const existingConsent = readConsent();
    applyConsentState(existingConsent);
    if (!existingConsent) {
      setTimeout(showBanner, 320);
    }
  }

  const api = {
    getConsent: readConsent,
    hasConsent: () => !!readConsent(),
    canUse: (category) => {
      const consent = readConsent();
      if (!consent) return false;
      return category === 'analytics'
        ? !!consent.analytics
        : category === 'marketing'
          ? !!consent.marketing
          : false;
    },
    openPreferences: showModal,
  };

  window.mariaCookieConsent = api;
  window.addEventListener('maria:openCookieConsent', showModal);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
