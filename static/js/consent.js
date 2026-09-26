(function () {
  "use strict";

  var STORAGE_KEY = "ic_consent_v1";
  var STORAGE_VERSION = 1;
  // Re-prompt after this many days, even if the user previously chose.
  var REVALIDATE_DAYS = 365;

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function readStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== STORAGE_VERSION) return null;
      if (typeof parsed.ts !== "number") return null;
      var ageMs = Date.now() - parsed.ts;
      if (ageMs > REVALIDATE_DAYS * 24 * 60 * 60 * 1000) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeStored(prefs) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          v: STORAGE_VERSION,
          ts: Date.now(),
          analytics: !!prefs.analytics,
          ads: !!prefs.ads
        })
      );
    } catch (e) {
      /* storage disabled — choice still applies in-page */
    }
  }

  function applyConsent(prefs) {
    gtag("consent", "update", {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.ads ? "granted" : "denied",
      ad_user_data: prefs.ads ? "granted" : "denied",
      ad_personalization: prefs.ads ? "granted" : "denied"
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_updated",
      consent_analytics: prefs.analytics ? "granted" : "denied",
      consent_ads: prefs.ads ? "granted" : "denied"
    });

    if (typeof window.rdt === "function") {
      if (prefs.ads) {
        window.rdt("track", "PageVisit");
      }
    }
  }

  function showBanner(el) {
    if (!el) return;
    el.hidden = false;
    el.setAttribute("aria-hidden", "false");
  }

  function hideBanner(el) {
    if (!el) return;
    el.hidden = true;
    el.setAttribute("aria-hidden", "true");
  }

  function togglePrefs(panel, force) {
    var prefs = panel.querySelector("[data-consent-prefs]");
    if (!prefs) return;
    var open = typeof force === "boolean" ? force : prefs.hasAttribute("hidden");
    if (open) {
      prefs.removeAttribute("hidden");
    } else {
      prefs.setAttribute("hidden", "");
    }
  }

  function readToggles(panel) {
    var analytics = panel.querySelector("[data-consent-toggle='analytics']");
    var ads = panel.querySelector("[data-consent-toggle='ads']");
    return {
      analytics: analytics ? analytics.checked : false,
      ads: ads ? ads.checked : false
    };
  }

  function setToggles(panel, prefs) {
    var analytics = panel.querySelector("[data-consent-toggle='analytics']");
    var ads = panel.querySelector("[data-consent-toggle='ads']");
    if (analytics) analytics.checked = !!prefs.analytics;
    if (ads) ads.checked = !!prefs.ads;
  }

  function bind(el) {
    if (!el || el.dataset.bound === "1") return;
    el.dataset.bound = "1";

    var panel = el.querySelector(".ic-consent__panel") || el;

    var btnAccept = panel.querySelector("[data-consent-accept]");
    var btnReject = panel.querySelector("[data-consent-reject]");
    var btnPrefs = panel.querySelector("[data-consent-prefs-toggle]");
    var btnSave = panel.querySelector("[data-consent-save]");

    if (btnAccept) {
      btnAccept.addEventListener("click", function () {
        var prefs = { analytics: true, ads: true };
        writeStored(prefs);
        applyConsent(prefs);
        hideBanner(el);
      });
    }

    if (btnReject) {
      btnReject.addEventListener("click", function () {
        var prefs = { analytics: false, ads: false };
        writeStored(prefs);
        applyConsent(prefs);
        hideBanner(el);
      });
    }

    if (btnPrefs) {
      btnPrefs.addEventListener("click", function () {
        togglePrefs(panel);
      });
    }

    if (btnSave) {
      btnSave.addEventListener("click", function () {
        var prefs = readToggles(panel);
        writeStored(prefs);
        applyConsent(prefs);
        hideBanner(el);
      });
    }
  }

  function open() {
    var el = document.querySelector("[data-consent-banner]");
    if (!el) return;
    var stored = readStored();
    if (stored) {
      setToggles(el, stored);
    }
    bind(el);
    showBanner(el);
  }

  function init() {
    var el = document.querySelector("[data-consent-banner]");
    if (!el) return;
    bind(el);
    var stored = readStored();
    if (stored) {
      applyConsent(stored);
      setToggles(el, stored);
      hideBanner(el);
    } else {
      showBanner(el);
    }

    var triggers = document.querySelectorAll("[data-consent-open]");
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function (event) {
        event.preventDefault();
        open();
      });
    }
  }

  window.ic_consent = {
    open: open,
    acceptAll: function () {
      var prefs = { analytics: true, ads: true };
      writeStored(prefs);
      applyConsent(prefs);
      hideBanner(document.querySelector("[data-consent-banner]"));
    },
    rejectAll: function () {
      var prefs = { analytics: false, ads: false };
      writeStored(prefs);
      applyConsent(prefs);
      hideBanner(document.querySelector("[data-consent-banner]"));
    },
    save: function (prefs) {
      writeStored(prefs);
      applyConsent(prefs);
      hideBanner(document.querySelector("[data-consent-banner]"));
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
