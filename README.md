# Md Mahmudul Islam — Cyber Portfolio

Next.js 14 (App Router) + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Customize

| What | Where |
|------|-------|
| Name, contact, skills, projects, experience | `lib/data.js` |
| Profile photo | put your image at `public/profile.jpg` |
| Real looping video background (optional) | put an mp4 at `public/videos/bg.mp4` — it blends under the matrix rain automatically. If the file is missing, the animated matrix/RGB background is used |
| Colors / animations | `tailwind.config.js`, `app/globals.css` |

## Effects included

- Matrix code-rain canvas + RGB aurora + perspective grid + scanlines + scan beam
- Glitch name, typewriter roles, terminal boot lines
- Scroll progress bar, scroll-reveal sections, animated timeline fill, animated counters & skill bars
- RGB animated-border cards with hover lift/glow, 3D tilt on skill cards, cursor spotlight
- Fully responsive, respects `prefers-reduced-motion`

## Deploy

Push to GitHub and import into Vercel (zero config).
