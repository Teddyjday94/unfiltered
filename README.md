# Unfiltered Studio — custom 3D fan concept

A custom Next.js + React Three Fiber fan-site concept inspired by **Zane and Heath: Unfiltered**. This version is independent of Lovable and is designed for Vercel deployment.

## Features

- Interactive 3D studio hero built from local geometry (no remote 3D assets)
- Responsive pointer-based camera motion
- Motion/reduced-motion controls
- Episode spotlight and searchable fan archive
- Cast portrait slots ready for approved local photography
- Physical desk / polaroid-inspired moments section
- Web Audio soundboard with original procedural effects
- Interactive mixer controls and VU meters
- REC-light and coffee-cup easter eggs
- Mobile-specific layout and performance reductions
- No external image hotlinks

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

For Vercel, import this repository/project and use the default Next.js settings.

## Media replacement points

The first build intentionally uses stylized local placeholders instead of unlicensed remote photos. Replace those with approved photos/art inside the `latest-art`, `cast-portrait`, and `photo-placeholder` areas. The Spotify, YouTube, Patreon, and Instagram buttons are intentionally inactive until official destination URLs are supplied.

## Disclaimer

Unofficial fan-made concept. Not affiliated with Zane & Heath or their team.
