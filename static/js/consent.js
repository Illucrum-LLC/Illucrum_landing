/* Analytics banner for illucrum.com.
 *
 * Analytics is on for everyone from the start. The consent default is set
 * inline in <head> before Tag Manager loads, so a saved "off" applies from the
 * very first tag. This file runs the banner: it shows on every page until the
 * visitor chooses, saves the choice, sends the consent update and, when
 * analytics is turned off, deletes the Google Analytics cookies already set.
 *
 * Reopen it with any element carrying data-consent-open, or with
 * window.ic_consent.open().
 */
(function () {
  "use strict";

  var STORAGE_KEY = "ic_consent_v1"; // also read in $structure/00-head.html

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function saved() {
    try {
      var choice = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return choice && typeof choice.analytics === "boolean" ? choice : null;
    } catch (e) {
      return null;
    }
  }

  function deleteAnalyticsCookies() {
    var root = location.hostname.split(".").slice(-2).join(".");
    document.cookie.split(";").forEach(function (cookie) {
      var name = cookie.split("=")[0].trim();
      if (name.indexOf("_ga") !== 0) return;
      ["", "; domain=" + location.hostname, "; domain=." + root].forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; path=/" + domain;
      });
    });
  }

  function save(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, ts: Date.now(), analytics: analytics }));
    } catch (e) {
      /* storage blocked: the choice still applies to this page */
    }
    gtag("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
    window.dataLayer.push({ event: "consent_updated", consent_analytics: analytics ? "granted" : "denied" });
    if (!analytics) deleteAnalyticsCookies();
  }

  function banner() {
    return document.querySelector("[data-consent-banner]");
  }

  function show(focus) {
    var el = banner();
    if (!el) return;
    el.hidden = false;
    if (focus) {
      var first = el.querySelector("button");
      if (first) first.focus();
    }
  }

  function hide() {
    var el = banner();
    if (el) el.hidden = true;
  }

  function init() {
    var el = banner();
    if (!el) return;

    el.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent-accept], [data-consent-reject]");
      if (!button) return;
      save(button.hasAttribute("data-consent-accept"));
      hide();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !el.hidden) hide();
    });

    document.querySelectorAll("[data-consent-open]").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        show(true);
      });
    });

    // First visit, or no choice made yet: show the banner without moving focus.
    if (!saved()) show(false);
  }

  window.ic_consent = {
    open: function () { show(true); },
    allow: function () { save(true); hide(); },
    deny: function () { save(false); hide(); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
