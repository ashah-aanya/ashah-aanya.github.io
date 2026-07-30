# ashah-aanya.github.io

Personal website — Aanya Shah. A project-forward portfolio for a CS / AI-ML audience,
with a separate page for studio (oil painting) work.

Static site, no build step. Plain HTML/CSS/JS so it stays easy to keep current.

## Structure

```
index.html      Main page — hero, now, selected work, about, contact
art.html        Studio page — paintings, exhibitions, awards
css/            Styles (shared design system)
js/             Scripts (t-SNE hero field, small helpers)
fonts/          Self-hosted webfonts (Fraunces, IBM Plex Sans/Mono)
assets/         Images (painting scans, social share cards, favicons)
```

## Dormant (kept on purpose, not linked)

- `js/studio.js` + `assets/turing/*.jpg` — the interactive "Human or AI?" Turing
  Test (real oil painting vs. its DALL·E replica, from the Credo.ai *Agents of
  Trust* exhibit). Removed from the live pages but kept in the repo so it can be
  revived on a page later. Not referenced by any HTML today.

## Local preview

No build needed — open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (later)

Intended for GitHub Pages at the repo root (`https://ashah-aanya.github.io`).
Publishing a **private** repo via Pages requires making it public or a paid plan.
