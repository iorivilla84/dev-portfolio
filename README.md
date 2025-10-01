# Developer Portfolio

A lightweight, responsive developer portfolio that showcases my skills, projects, experience, and contact information. All content is powered by JSON for easy management and modular updates.

The portfolio is built with semantic HTML5, Bootstrap 5 for responsive layout, SCSS for styling, Font Awesome icons, and ES6+ JavaScript with a modular structure for reusable components.

## Features

- Responsive layout using Bootstrap 5
- Modular, component-based architecture with reusable rendering functions
- All content managed via JSON files for sections like About Me, Portfolio, Contact, and Footer
- Smooth scrolling and interactive elements for project cards and navigation
- Contact section includes email link and social icons for quick connections
- Easy to clone and customize: simply update the JSON content

## Tech Stack
- **HTML5** – Semantic, accessible markup
- **CSS / SASS structure** – Bootstrap utilities and custom styling
- **Bootstrap 5** – Responsive grid, buttons, and layout utilities
- **Font Awesome** – Social icons and UI elements
- **JavaScript (ES6+)** – Modular, reusable functions for rendering components
- **JSON** – Dynamic management and centralized data for all content, easy to update
- **Git / .gitignore** – Source control with files excluded from commits for cleaner repository
- **GitHub** – Source control and integration with Netlify
- **Netlify** – Auto-deployment from GitHub

## Project Structure
<pre lang="markdown"> dev-portfolio/
├── index.html
├── css/
│   ├── main.css
│   └── components/
│       ├── _accordion.scss
│       ├── _buttons.scss
│       ├── _footer.scss
│       ├── _mainNav.scss
│       └── _portfolio.scss
├── js/
│   ├── components/
│   │   ├── display-about-me-list.js
│   │   ├── display-background.js
│   │   ├── display-contact-info.js
│   │   ├── display-experience.js
│   │   ├── display-hero-banner.js
│   │   ├── display-main-nav.js
│   │   ├── display-portfolio.js
│   │   ├── display-skills.js
│   │   ├── footer.js
│   │   ├── renderers.js
│   │   └── site.js
│   ├── controllers/
│   │   ├── about-me-model.js
│   │   ├── accordion-event-handler.js
│   │   ├── background-model.js
│   │   ├── contact-model.js
│   │   ├── dev-skills-list-model.js
│   │   ├── experience-list-model.js
│   │   ├── filtering-projects-event.js
│   │   ├── footer-model.js
│   │   ├── hero-banner-model.js
│   │   ├── nav-event-handlers.js
│   │   ├── navigation-model.js
│   │   ├── portfolio-list-model.js
│   │   └── site.js
│   ├── helpers/
│   │   ├── dom-helper.js
│   │   └── formatter.js
│   └── main.js
├── portfolio-model/
│   ├── about-me.json
│   ├── background-list.json
│   ├── contact.json
│   ├── experience-list.json
│   ├── footer-content.json
│   ├── hero-banner.json
│   ├── navigation-list.json
│   ├── portfolio-list.json
│   ├── site.json
│   └── skills.json
├── node_modules/
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
 </pre>

## Deployment
You can host this portfolio on Netlify, GitHub Pages, or any static site server. Just push your files and ensure your JSON files are included.

## Future Improvements
Next enhancements to expand functionality and improve user experience include:
- **Enhanced performance:** Optimize JSON parsing and DOM rendering
- **Dynamic theme support:** Light/Dark modes
- **Additional reusable components:** Expand renderers.js for other elements
- **Code optimizations:** Modular improvements for maintainability

## Getting Started
### Running Locally
Since ES6 modules and fetch() are used, you must run the app from a local or remote server.
You can use Live Server (VSCode extension) or run:
`npx live-server`
Open your browser at http://127.0.0.1:5500` (or as specified by Live Server).

# Clone the repository
git clone git@github.com:iorivilla84/dev-portfolio.git
cd dev-portfolio

# Install Sass if you want to compile SCSS to CSS
npm install --save-dev sass

# Optional: compile SCSS to CSS
### Replace 'css/main.css' with your output file if different
npx sass css/components/main.scss css/main.css
