# WordForge AI (Next.js + Vercel)

This is a deployable Next.js app with a server-side API route that calls Anthropic securely (your API key stays on the server).

## Run locally

1) Install Node.js (with npm) if you don't have it.

2) Create `.env.local` in the project root:

```bash
ANTHROPIC_API_KEY=YOUR_KEY_HERE
```

3) Install + start:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Vercel

1) Push this folder to a GitHub repo.
2) In Vercel: **New Project** → import the repo.
3) Set Environment Variables:
   - `ANTHROPIC_API_KEY` = your Anthropic key
4) Deploy.

Vercel will auto-detect Next.js. No special build settings needed.

## Notes

- The UI calls `POST /api/generate`.
- The server route is `app/api/generate/route.js`.

