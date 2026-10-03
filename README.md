# Harsh Tyagi — portfolio

A single-page portfolio built with React and Vite, styled with hand-written CSS. Deploys to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev
```

## Where the content lives

Everything on the page — the hero copy, both jobs, projects, skills, education — comes from
`src/content/profile.js`. Edit that file and the page updates; you never need to open a component
to change wording.

Lines marked `REPLACE` still hold placeholder values:

| What | Where |
| --- | --- |
| GitHub and LinkedIn URLs | `links` in `src/content/profile.js` |
| Project demo and repo links | `url` and `repo` on each project |
| Site URL for SEO and social previews | the four URLs near the top of `index.html` |

Those URLs currently read `https://harshtyagi.github.io/`. Change the username if your repository
is named something else.

A project's buttons only appear once its `url` or `repo` has a value, so empty placeholders don't
produce dead links.

The résumé PDF served by the "Download résumé" button is `public/Harsh-Tyagi-Resume.pdf`. Replace
that file to publish a new version.

## Deploy to GitHub Pages

1. Create a repository on GitHub named `<your-username>.github.io` and push this folder to `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it
   to `https://<your-username>.github.io`.

The Vite `base` is `./`, so the same build also works unchanged from a project repo served at
`username.github.io/repo-name`.

## Notes on the build

- No CSS framework. Design tokens are at the top of `src/styles.css`; change a colour there and it
  propagates through light and dark mode.
- Dark mode follows the system setting on first visit, then remembers the toggle. The theme is
  applied by a small inline script in `index.html` so the page never flashes the wrong colours.
- **3D effects**: Subtle depth animations using pure CSS transforms and a lightweight canvas particle
  field—no Three.js needed. See [3D_EFFECTS.md](./3D_EFFECTS.md) for details and customization.
  Bundle increase: **~1.1 KB gzipped**.
- The typing test in the Projects section is a live, playable build of Fast Fingers
  (`src/components/TypingTest.jsx`).
- Contact is handled by direct email, phone and profile links rather than a form, because GitHub
  Pages serves static files and has no server to receive a submission.
