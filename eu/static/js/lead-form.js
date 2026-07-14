(function () {
  "use strict";

  /* ============================================================
     ILLUCRUM — Lead popup form
     ────────────────────────────────────────────────────────────
     Drop-in, reusable contact popup. The entire form is built in
     JavaScript at runtime, so crawlers (which don't execute this
     or submit forms) never see the contact fields in the markup.

     USAGE
       1. Include this script on any page:
            <script src="/static/js/lead-form.js" defer></script>
       2. Add a trigger button anywhere:
            <button type="button" data-lead-open>Get in touch</button>

     Optional attributes on the trigger:
       data-lead-source="pricing-hero"   → forwarded to GTM + payload
       data-lead-title="Let's talk"       → custom modal heading
       data-lead-subtitle="..."           → custom modal sub-copy

     On a successful submit the API returns 204 and we push a
     `new_lead` event to the GTM dataLayer for tracking.
     ============================================================ */

  var ENDPOINT = "https://api.illucrum.com/lead";

  var DEFAULTS = {
    title: "Get in touch",
    subtitle: "Tell us a little about you and we'll be in touch shortly.",
    button: "Send message"
  };

  // Fields rendered in order. `required` drives client-side validation.
  var FIELDS = [
    { name: "name",    label: "Name",        type: "text",  required: true,  autocomplete: "name" },
    { name: "company", label: "Company",     type: "text",  required: true, autocomplete: "organization" },
    { name: "website", label: "Website",     type: "text",   required: true, autocomplete: "url", placeholder: "https://" },
    { name: "phone",   label: "Phone",       type: "tel",   required: false, autocomplete: "tel" },
    { name: "email",   label: "Email",       type: "email", required: true,  autocomplete: "email" }
  ];

  var lastFocused = null; // restore focus on close
  var overlayEl = null;   // single live overlay at a time

  /* ---- small style helpers (everything stays inline) ---------- */

  function css(el, styles) {
    for (var k in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        el.style.setProperty(k, styles[k]);
      }
    }
    return el;
  }

  function el(tag, styles, text) {
    var node = document.createElement(tag);
    if (styles) css(node, styles);
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---- payload + network -------------------------------------- */

  function normalizeWebsite(value) {
    var v = (value || "").trim();
    if (!v) return "";
    if (!/^https?:\/\//i.test(v)) v = "https://" + v;
    return v;
  }

  function pushLeadEvent(payload, source) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "new_lead",
      lead_source: source || "",
      lead_company: payload.company || "",
      lead_website: payload.website || ""
    });
  }

  function submitLead(payload) {
    return fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      mode: "cors"
    });
  }

  /* ---- open / close ------------------------------------------- */

  function close() {
    if (!overlayEl) return;
    document.removeEventListener("keydown", onKeydown);
    if (overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
    overlayEl = null;
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      event.preventDefault();
      close();
    }
  }

  function open(opts) {
    if (overlayEl) close();
    opts = opts || {};
    lastFocused = document.activeElement;

    var source = opts.source || "";

    /* Dim, blurred backdrop. */
    var overlay = el("div", {
      position: "fixed",
      inset: "0",
      "z-index": "2000",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      padding: "1.25rem",
      background: "rgba(0, 0, 0, 0.55)",
      "-webkit-backdrop-filter": "blur(6px)",
      "backdrop-filter": "blur(6px)",
      animation: "none"
    });
    overlay.setAttribute("role", "presentation");
    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) close();
    });

    /* Modal panel — pulls colours from the site's CSS variables. */
    var panel = el("div", {
      position: "relative",
      width: "100%",
      "max-width": "440px",
      "max-height": "90vh",
      "overflow-y": "auto",
      background: "var(--surface, #ffffff)",
      color: "var(--text, #111111)",
      border: "1px solid var(--border, rgba(0,0,0,0.08))",
      "border-radius": "var(--radius, 12px)",
      "box-shadow": "var(--shadow-lg, 0 16px 48px rgba(0,0,0,0.1))",
      "font-family": "var(--font, 'Dubai', system-ui, sans-serif)",
      padding: "clamp(1.5rem, 4vw, 2rem)"
    });
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", opts.title || DEFAULTS.title);

    /* Close (×) button. */
    var closeBtn = el("button", {
      position: "absolute",
      top: "0.85rem",
      right: "0.85rem",
      width: "32px",
      height: "32px",
      padding: "0",
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      background: "transparent",
      border: "1px solid var(--border, rgba(0,0,0,0.08))",
      "border-radius": "8px",
      color: "var(--text-muted, #555)",
      "font-size": "1.1rem",
      "line-height": "1",
      cursor: "pointer"
    }, "✕");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.addEventListener("click", close);
    closeBtn.addEventListener("mouseenter", function () {
      css(closeBtn, { "border-color": "var(--green, #00c96b)", color: "var(--green, #00c96b)" });
    });
    closeBtn.addEventListener("mouseleave", function () {
      css(closeBtn, { "border-color": "var(--border, rgba(0,0,0,0.08))", color: "var(--text-muted, #555)" });
    });

    /* Eyebrow + title + subtitle. */
    var eyebrow = el("span", {
      display: "inline-block",
      "font-size": "0.72rem",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.12em",
      color: "var(--green, #00c96b)",
      "margin-bottom": "0.5rem"
    }, "Contact");

    var title = el("h2", {
      margin: "0 0 0.4rem",
      "font-size": "1.5rem",
      "font-weight": "700",
      "letter-spacing": "-0.02em",
      "line-height": "1.2",
      color: "var(--text, #111111)"
    }, opts.title || DEFAULTS.title);

    var subtitle = el("p", {
      margin: "0 0 1.5rem",
      "font-size": "0.92rem",
      "line-height": "1.6",
      color: "var(--text-muted, #555)"
    }, opts.subtitle || DEFAULTS.subtitle);

    /* Form. */
    var form = el("form");
    form.setAttribute("novalidate", "");

    var inputs = {};

    FIELDS.forEach(function (field) {
      var wrap = el("label", {
        display: "block",
        "margin-bottom": "0.85rem"
      });

      var labelText = el("span", {
        display: "block",
        "font-size": "0.8rem",
        "font-weight": "600",
        "margin-bottom": "0.35rem",
        color: "var(--text, #111111)"
      }, field.label + (field.required ? " *" : ""));

      var input = el("input", {
        width: "100%",
        padding: "0.7rem 0.85rem",
        "font-family": "inherit",
        "font-size": "0.95rem",
        color: "var(--text, #111111)",
        background: "var(--surface2, #f0f0eb)",
        border: "1px solid var(--border, rgba(0,0,0,0.08))",
        "border-radius": "var(--radius-sm, 8px)",
        outline: "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease"
      });
      input.type = field.type;
      input.name = field.name;
      input.autocomplete = field.autocomplete || "off";
      if (field.required) input.required = true;
      if (field.placeholder) input.placeholder = field.placeholder;

      // Inline focus ring (no stylesheet needed).
      input.addEventListener("focus", function () {
        css(input, {
          "border-color": "var(--green, #00c96b)",
          "box-shadow": "0 0 0 3px var(--green-glow, rgba(0,201,107,0.15))"
        });
      });
      input.addEventListener("blur", function () {
        css(input, {
          "border-color": "var(--border, rgba(0,0,0,0.08))",
          "box-shadow": "none"
        });
      });

      inputs[field.name] = input;
      wrap.appendChild(labelText);
      wrap.appendChild(input);
      form.appendChild(wrap);
    });

    /* Status line (errors / success). */
    var status = el("p", {
      margin: "0.25rem 0 0",
      "min-height": "1.2rem",
      "font-size": "0.85rem",
      "line-height": "1.5"
    });
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    function setStatus(msg, kind) {
      status.textContent = msg || "";
      css(status, {
        color: kind === "error"
          ? "#e05252"
          : kind === "success"
            ? "var(--green, #00c96b)"
            : "var(--text-muted, #555)"
      });
    }

    /* Submit button (matches the site's primary green button). */
    var submitBtn = el("button", {
      width: "100%",
      "margin-top": "1rem",
      padding: "0.85rem 1.75rem",
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      gap: "0.5rem",
      "font-family": "inherit",
      "font-size": "0.95rem",
      "font-weight": "700",
      "line-height": "1",
      color: "#000",
      background: "var(--green, #00c96b)",
      border: "1px solid var(--green, #00c96b)",
      "border-radius": "var(--radius, 12px)",
      cursor: "pointer",
      transition: "background 0.25s ease, border-color 0.25s ease"
    }, opts.button || DEFAULTS.button);
    submitBtn.type = "submit";
    submitBtn.addEventListener("mouseenter", function () {
      if (submitBtn.disabled) return;
      css(submitBtn, { background: "var(--green-dim, #00a356)", "border-color": "var(--green-dim, #00a356)" });
    });
    submitBtn.addEventListener("mouseleave", function () {
      if (submitBtn.disabled) return;
      css(submitBtn, { background: "var(--green, #00c96b)", "border-color": "var(--green, #00c96b)" });
    });

    function setLoading(loading) {
      submitBtn.disabled = loading;
      css(submitBtn, { opacity: loading ? "0.7" : "1", cursor: loading ? "default" : "pointer" });
      submitBtn.textContent = loading ? "Sending…" : (opts.button || DEFAULTS.button);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Basic validation.
      var firstInvalid = null;
      FIELDS.forEach(function (field) {
        var input = inputs[field.name];
        var valid = input.checkValidity() && (!field.required || input.value.trim() !== "");
        if (!valid && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        setStatus("Please check the highlighted fields.", "error");
        firstInvalid.focus();
        return;
      }

      var payload = {
        name: inputs.name.value.trim(),
        company: inputs.company.value.trim(),
        website: normalizeWebsite(inputs.website.value),
        phone: inputs.phone.value.trim(),
        email: inputs.email.value.trim()
      };

      setLoading(true);
      setStatus("");

      submitLead(payload)
        .then(function (res) {
          if (res.status === 204 || res.ok) {
            pushLeadEvent(payload, source);
            showSuccess();
          } else {
            setLoading(false);
            setStatus("Something went wrong (" + res.status + "). Please try again.", "error");
          }
        })
        .catch(function () {
          setLoading(false);
          setStatus("Network error. Please try again, or email us directly.", "error");
        });
    });

    function showSuccess() {
      form.style.display = "none";
      status.textContent = "";
      eyebrow.textContent = "Thank you";
      title.textContent = "Message sent";
      subtitle.textContent = "We've received your details and will be in touch shortly.";
      var doneBtn = el("button", {
        "margin-top": "0.5rem",
        padding: "0.85rem 1.75rem",
        "font-family": "inherit",
        "font-size": "0.95rem",
        "font-weight": "700",
        color: "#000",
        background: "var(--green, #00c96b)",
        border: "1px solid var(--green, #00c96b)",
        "border-radius": "var(--radius, 12px)",
        cursor: "pointer"
      }, "Close");
      doneBtn.type = "button";
      doneBtn.addEventListener("click", close);
      panel.appendChild(doneBtn);
      doneBtn.focus();
    }

    form.appendChild(status);
    form.appendChild(submitBtn);

    panel.appendChild(closeBtn);
    panel.appendChild(eyebrow);
    panel.appendChild(title);
    panel.appendChild(subtitle);
    panel.appendChild(form);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlayEl = overlay;
    document.addEventListener("keydown", onKeydown);
    inputs.name.focus();
  }

  /* ---- wire up triggers --------------------------------------- */

  function onTriggerClick(event) {
    var trigger = event.currentTarget;
    event.preventDefault();
    open({
      source: trigger.getAttribute("data-lead-source") || "",
      title: trigger.getAttribute("data-lead-title") || "",
      subtitle: trigger.getAttribute("data-lead-subtitle") || ""
    });
  }

  function init() {
    var triggers = document.querySelectorAll("[data-lead-open]");
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].dataset.leadBound === "1") continue;
      triggers[i].dataset.leadBound = "1";
      triggers[i].addEventListener("click", onTriggerClick);
    }
  }

  // Public API for programmatic opening, e.g. window.ic_lead.open().
  window.ic_lead = { open: open, close: close };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
