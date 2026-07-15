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
assets/         Images (painting scans, etc.)
```

## Local preview

No build needed — open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (later)

Intended for GitHub Pages at the repo root (`https://ashah-aanya.github.io`).
Publishing a **private** repo via Pages requires making it public or a paid plan.
