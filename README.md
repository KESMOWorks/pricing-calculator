# KESMO Pricing Calculator

**Version 1.1.0**

Estimate profitable selling prices with confidence.

> Precision made simple.

## Overview

The KESMO Pricing Calculator is a free browser-based web tool that helps estimate selling prices based on product costs, marketplace fees, fixed transaction fees, and desired profit margins.

It performs all calculations locally in the browser and does not require an account or installation.

The Pricing Calculator is the first completed KESMO product and serves as the reference implementation for the shared KESMO Starter Kit architecture.

## Live Website

```text
https://kesmoworks.github.io/pricing-calculator/
```

## Features

* Suggested selling price
* Target profit margin
* Percentage transaction fees
* Fixed transaction fees
* Break-even price
* Estimated profit
* Markup calculation
* Maximum discount before loss
* Copy Results button
* Mobile-first responsive layout
* Accessible interface
* No account required
* Local browser-based calculations

## Why This Tool Exists

Pricing products accurately becomes increasingly difficult once marketplace commissions, payment processing fees, shipping costs, and desired profit margins are considered together.

The KESMO Pricing Calculator simplifies those calculations while remaining transparent and easy to understand.

## Privacy

The calculator performs calculations locally in your browser.

Calculator values are not transmitted to KESMO.

See the included Privacy Policy for complete information.

## Technology

The Pricing Calculator uses:

* HTML5
* CSS3
* Vanilla JavaScript
* GitHub Pages

It does not require:

* A framework
* A package manager
* A build process
* Third-party runtime dependencies

## Shared Architecture

The Pricing Calculator uses the shared KESMO page architecture provided by the KESMO Starter Kit.

Shared components include:

* Header
* Hero
* Footer

Standard supporting pages include:

* Home
* About
* Privacy
* Custom 404 page

The KESMO logo in the shared Header and Footer returns visitors to KESMO Home.

The All KESMO Tools link returns visitors to KESMO Home.

The shared Footer includes a link to the official KESMO YouTube channel.

## Shared Development Workflow

Shared improvements should remain aligned with the KESMO Starter Kit.

When an improvement benefits more than one KESMO project:

1. Improve or update the KESMO Starter Kit.
2. Verify the improvement.
3. Apply it to existing KESMO projects where appropriate.
4. Use the updated Starter Kit for future tools.

If an improvement is first proven in the Pricing Calculator, copy it back into the Starter Kit before treating it as a shared KESMO standard.

### Local Development

Pricing Calculator development is performed locally in Visual Studio Code.

The local repository is the active development workspace. The GitHub repository remains the source of truth for the latest published version, and this README is the development source of truth for the project.

Do not assume that a local change is published until it has been committed, pushed to GitHub, and the GitHub Pages deployment has been verified.

For normal development:

1. Clone the repository from GitHub, or pull the latest changes if it has already been cloned.
2. Open the local repository in Visual Studio Code.
3. Make changes locally.
4. Preview the site with the Microsoft Live Preview extension for Visual Studio Code.
5. Test the complete change locally before publishing.
6. Run `git status` and review the modified files.
7. Stage the completed changes with `git add .`.
8. Commit the completed work with a clear message using `git commit -m "Relevant update"`.
9. Push the commit with `git push origin main`.
10. Run `git status` again and confirm that the working tree is clean.
11. Verify the GitHub Pages deployment when it becomes available.
12. Update the README, CHANGELOG, version, release, or tag when appropriate.

The standard Git publishing sequence is:

```bash
git status
git add .
git commit -m "Relevant update"
git push origin main
git status
```

The Pricing Calculator uses plain HTML, CSS, and JavaScript. Normal local preview does not require npm, Python, a package manager, a framework, or a build process.

Avoid adding development dependencies solely to preview the site when Visual Studio Code Live Preview provides the required local testing environment.

### Source of Truth

Use the following distinction during development:

* **Local repository:** active development workspace.
* **GitHub `main` branch:** latest published source of truth after changes have been pushed.
* **README.md:** development source of truth for architecture, standards, workflow, goals, and project status.
* **GitHub Pages:** public deployed version.

Repository contents and the current README take precedence over previous notes or chat history.

If local files and GitHub differ because work has not yet been pushed, treat the local files as unfinished development work rather than as the published version.

## Relationship to Other KESMO Projects

### KESMO Home

The official KESMO website and public tool directory:

```text
https://kesmoworks.github.io/
```

### KESMO Starter Kit

The reusable template and shared source of truth used to build KESMO tools.

### KESMO YouTube

The official KESMO YouTube channel:

```text
https://www.youtube.com/@KESMOWorks
```

## Version Information

### Version 1.1.0

Changes include:

* Adopted the shared Header, Hero, and Footer architecture.
* Standardized supporting pages.
* Improved accessibility.
* Improved SEO and social metadata.
* Updated shared legal page styling.
* Aligned with the KESMO Starter Kit.

### Version 1.0.0

Initial public release.

## Roadmap

Future improvements may include:

* Additional pricing presets
* Saved calculation presets
* Expanded fee calculations
* Additional marketplace support

The KESMO Pricing Calculator will continue to adopt shared improvements from the KESMO Starter Kit whenever they benefit multiple KESMO tools.

---

Created by **KESMO**

**Precision made simple.**