# Anipex BuildTech Website

A modern, futuristic static website for Anipex BuildTech, a leading construction company in Hyderabad, India.

## About

This website showcases the services, projects, and contact information for Anipex BuildTech, owned by ANIL RAJU ANIPE.

**Tagline:** Building Tomorrow, Today

**Contact:** +91 9100320063

## Features

- Responsive design with futuristic UI
- SEO optimized with meta tags
- Sections for Home, Services, Projects, About, and Contact
- Contact form that sends messages via WhatsApp
- Sticky navigation and smooth scrolling
- Futuristic SVG logo

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Google Fonts (Orbitron and Poppins)

## Getting Started

### Prerequisites

- A web browser

### Running Locally

1. Open `index.html` in your web browser.

Or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Then open http://localhost:8000
```

## Logo

The logo is a custom SVG featuring a stylized skyscraper with cyan-to-blue gradient.

## Deployment

The production-ready files are in the `dist` folder. Upload `dist/index.html` and `dist/assets/` to your hosting provider.

For local testing of production build:
```bash
npm run preview
```

Or serve the dist folder:
```bash
npx serve dist
```
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
