# AAR InfraTech Website

A static HTML/CSS/JavaScript website for AAR InfraTech, built from the latest production ZIP design.

## About

This project is now replaced with the provided ZIP content and uses the current AAR InfraTech design. The site is a static landing page for a premium construction business in Hyderabad.

## Project Contents

- `index.html` — main landing page
- `assets/css/main.css` — design styles
- `assets/js/main.js` — page interactions and slideshow controls
- `assets/images/` — placeholder image folder for production assets
- `netlify.toml` — Netlify configuration to publish the repository root
- `README.txt` — ZIP archive instructions from the provided package

## Running Locally

### Prerequisites

- A web browser

### Serve the site

```bash
npx http-server . -p 8000
```

Then open:

```bash
http://127.0.0.1:8000
```

## Deployment

This is a static site and can be deployed to services like Netlify, Vercel, or Cloudflare Pages.

Because the site is now served from the repository root, the `netlify.toml` file ensures Netlify publishes the current `index.html`.

## Notes

- If you want to replace the placeholder images, place your production images in `assets/images/` and update the image URLs.
- The project no longer requires Node.js dependencies for deployment.
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
