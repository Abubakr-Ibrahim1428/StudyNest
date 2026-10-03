# StudyNest

A neumorphic student notes + checklist app, built with Vite + React.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
```

## Notes

- All data (notes & tasks) is stored in your browser's localStorage — nothing leaves your machine.
- Dock placement (left/right) is set in the Settings page.
- Fonts (Space Grotesk + Inter) load from Google Fonts via the `<link>` tags in `index.html` — you'll need an internet connection the first time a font loads.

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys automatically on every push to `main`.

One-time setup after pushing to GitHub:
1. Go to your repo → **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Push to `main` (or re-run the workflow from the **Actions** tab)
4. Your app will be live at `https://<your-username>.github.io/studynest/`

If you rename the repo to something other than `studynest`, update the `base` value in `vite.config.js` to match (`/your-repo-name/`).
