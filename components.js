/*
  KESMO Pricing Calculator
  Version: 1.0.0

  Shared page components for KESMO web tools.
*/

"use strict";

/*
  Central project configuration.

  Update kesmoHomeUrl when the central KESMO Home site
  is available.
*/
const KESMO_CONFIG = Object.freeze({
  repositoryName: "pricing-calculator",
  projectName: "KESMO Pricing Calculator",
  version: "1.0.0",

  brandName: "KESMO",
  tagline: "Precision made simple.",

  toolHomeUrl: "index.html",
  kesmoHomeUrl: "https://kesmoworks.github.io/",

  supportEmail: "kesmo.support@gmail.com",

  logoPath: "assets/branding/logo.svg"
});

/**
 * Returns the filename for the current page.
 *
 * GitHub Pages may serve the homepage with either an empty final
 * path segment or index.html, so both are normalized to index.html.
 *
 * @returns {string}
 */
function getCurrentPageName() {
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  return lastSegment || "index.html";
}

/**
 * Determines whether a navigation link represents the current page.
 *
 * @param {string} pageName
 * @returns {boolean}
 */
function isCurrentPage(pageName) {
  return getCurrentPageName() === pageName;
}

/**
 * Returns aria-current markup for the active navigation link.
 *
 * @param {string} pageName
 * @returns {string}
 */
function getAriaCurrent(pageName) {
  return isCurrentPage(pageName)
    ? ' aria-current="page"'
    : "";
}

/**
 * Escapes text before inserting it into generated HTML.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  const temporaryElement = document.createElement("div");

  temporaryElement.textContent = value;

  return temporaryElement.innerHTML;
}

/**
 * Creates the shared KESMO site header.
 *
 * @returns {string}
 */
function createSiteHeader() {
  return `
    <a class="skip-link" href="#main-content">
      Skip to main content
    </a>

    <header class="site-header">
      <div class="page-container">
        <a
          class="site-name"
          href="${KESMO_CONFIG.kesmoHomeUrl}"
          aria-label="KESMO home"
        >
          <img
            class="site-logo"
            src="${KESMO_CONFIG.logoPath}"
            alt=""
            width="42"
            height="42"
            aria-hidden="true"
          >

          <span>${KESMO_CONFIG.brandName}</span>
        </a>

        <nav
          class="site-navigation"
          aria-label="Main navigation"
        >
          <a
            href="index.html"${getAriaCurrent("index.html")}
          >
            Pricing Calculator
          </a>

          <a
            href="about.html"${getAriaCurrent("about.html")}
          >
            About
          </a>

          <a
            href="privacy.html"${getAriaCurrent("privacy.html")}
          >
            Privacy
          </a>
        </nav>
      </div>
    </header>
  `;
}

/**
 * Creates a consistent KESMO page hero from a placeholder's
 * data attributes.
 *
 * Supported attributes:
 *
 * data-eyebrow
 * data-title
 * data-description
 * data-note
 *
 * @param {HTMLElement} element
 * @returns {string}
 */
function createPageHero(element) {
  const eyebrow =
    element.dataset.eyebrow || KESMO_CONFIG.tagline;

  const title =
    element.dataset.title || KESMO_CONFIG.projectName;

  const description =
    element.dataset.description || "";

  const note =
    element.dataset.note || "";

  const descriptionMarkup = description
    ? `
        <p class="hero-description">
          ${escapeHtml(description)}
        </p>
      `
    : "";

  const noteMarkup = note
    ? `
        <p class="privacy-note">
          ${escapeHtml(note)}
        </p>
      `
    : "";

  return `
    <section
      class="hero-section"
      aria-labelledby="page-heading"
    >
      <div class="page-container hero-container">
        <p class="eyebrow">
          ${escapeHtml(eyebrow)}
        </p>

        <h1 id="page-heading">
          ${escapeHtml(title)}
        </h1>

        ${descriptionMarkup}

        ${noteMarkup}
      </div>
    </section>
  `;
}

/**
 * Creates the shared KESMO site footer.
 *
 * @returns {string}
 */
function createSiteFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="page-container footer-container">
        <div class="footer-brand">
          <a
            class="footer-site-brand"
            href="${KESMO_CONFIG.kesmoHomeUrl}"
            aria-label="KESMO home"
          >
            <img
              class="footer-logo"
              src="${KESMO_CONFIG.logoPath}"
              alt=""
              width="36"
              height="36"
              aria-hidden="true"
            >

            <span>${KESMO_CONFIG.brandName}</span>
          </a>

          <p>
            ${KESMO_CONFIG.tagline}
          </p>

          <p>
            Questions or suggestions?
            <a href="mailto:${KESMO_CONFIG.supportEmail}">Email KESMO</a>.
          </p>
        </div>

        <nav
          class="footer-navigation"
          aria-label="Footer navigation"
        >
          <a href="index.html">
            Pricing Calculator
          </a>

          <a href="about.html">
            About
          </a>

          <a href="privacy.html">
            Privacy
          </a>

          <a href="${KESMO_CONFIG.kesmoHomeUrl}">
            All KESMO Tools
          </a>
        </nav>

        <p class="copyright">
          &copy; ${currentYear}
          ${KESMO_CONFIG.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  `;
}

/**
 * Inserts generated markup into an existing page placeholder.
 *
 * @param {string} elementId
 * @param {string} markup
 */
function renderComponent(elementId, markup) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  element.innerHTML = markup;
}

/**
 * Renders the shared hero when the page contains its placeholder.
 */
function renderPageHero() {
  const heroElement = document.getElementById("page-hero");

  if (!heroElement) {
    return;
  }

  heroElement.innerHTML = createPageHero(heroElement);
}

/**
 * Initializes all shared KESMO components.
 */
function initializeComponents() {
  renderComponent("site-header", createSiteHeader());
  renderPageHero();
  renderComponent("site-footer", createSiteFooter());
}

initializeComponents();