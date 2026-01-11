# Investverse City

## Overview
Investverse City is a Web3-flavored, game-based learning platform focused on Topic 2 of the case
competition: enhancing financial knowledge in investment and insurance. The prototype blends
timed Q&A, skill-tree progression, city-building, and tokenized rewards to make concepts like
diversification, risk management, and insurance coverage feel intuitive and engaging.

## Product Vision (Prototype Scope)
- **Personalized learning paths** with a visible skill tree and milestone unlocks.
- **Daily practice + challenges** to reinforce investment and insurance fundamentals.
- **Knowledge gap radar** to surface misconceptions from quiz/simulation data.
- **Community question submissions** with AI moderation and GT rewards.
- **Simulation sandbox** for portfolios (stocks, bonds, crypto, commodities) with volatility
  events and risk-adjusted outcomes.
- **Risk profile checkpoint** to align suitability before advanced simulations unlock.
- **Coverage gap simulator** to explain deductibles, limits, and out-of-pocket exposure.
- **AI coach + scenario forge** via OpenRouter for personalized briefs and fresh market events.
- **Policy decoder** that translates insurance clauses into plain-language guidance.
- **Integrity monitor** for fair-play alerts (screenshot detection, idle penalties).
- **AI question generator** to draft multiple-choice quizzes for moderation.
- **Moderation desk** to approve AI drafts into the official question bank.
- **ESG + insurance mechanics** that illustrate protection and long-term resilience.
- **Club wars** for collaborative learning and strategy allocation.
- **In-app token economy (GT)**: non-transferable rewards used for upgrades, cosmetics, and
  simulated assets.

## Web3 Direction (Planned)
- **Chain**: Polygon PoS (Ethereum L2) for low fees and ESG-friendly consensus.
- **Token standards**: ERC-20 (GT, non-transferable), ERC-1155 (game items), ERC-721 (unique drops).
- Smart contract prototypes live in `contracts/` with a Hardhat deploy script and mainnet addresses.

## Current Prototype Routes
- `/` Dashboard overview with core feature previews.
- `/learn` Learning hub, skill tree, contract challenges, question bank.
- `/simulations` Market scenarios, hedging power-ups, compounding vaults.
- `/club-war` Club war prep, strategy board, governance.
- `/economy` Tokenomics and marketplace.
- `/leaderboard` Rankings and reward tiers.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- React Router + TanStack Query

## Local Development
Requirements: Node.js + npm.

```sh
npm install
npm run dev
```

AI coach runs via Vercel Serverless Functions at `/api/insights`.
For local development you can either run `vercel dev` or use the optional local server:

```sh
npm run ai
```
Set `VITE_AI_ENDPOINT=http://localhost:8787/api/insights` in `.env.local` if you use the local server.

Other useful commands:

```sh
npm run build        # production bundle to dist/
npm run build:dev    # dev-mode build
npm run preview      # preview dist/ locally
npm run lint         # ESLint checks
npm run ai           # local AI coach server (OpenRouter)
```

## Configuration
Supabase keys are read from `.env.local`:

```sh
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
DIRECT_URL=...
DATABASE_URL=...
VITE_GT_CONTRACT_ADDRESS=...
VITE_ITEMS_CONTRACT_ADDRESS=...
VITE_RARE_CONTRACT_ADDRESS=...
POLYGON_MAINNET_RPC_URL=...
POLYGON_AMOY_RPC_URL=...
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=... (optional, defaults to openai/gpt-4o-mini)
AI_SERVER_PORT=... (optional, defaults to 8787)
AI_SERVER_REFERER=... (optional, defaults to https://investverse-city.vercel.app)
VITE_AI_ENDPOINT=... (optional, defaults to /api/insights)
```
When deploying to Vercel, set `OPENROUTER_API_KEY` (and optional `OPENROUTER_MODEL`) in the
project Environment Variables so the serverless `/api/insights` endpoint can call OpenRouter.

## Prototype Data & Backend Status
- Supabase schema + demo seed live in `supabase/schema.sql` and `supabase/seed.sql`.
- The UI reads Supabase data via React Query in `src/lib/supabaseQueries.ts`.
- Smart contracts are deployed but the UI does not yet execute on-chain actions.
- AI coaching runs via a lightweight local server in `server/index.js` and proxies through `/api`.

### Supabase Setup (Manual)
```sh
psql "$DIRECT_URL" -f supabase/schema.sql
psql "$DIRECT_URL" -f supabase/seed.sql
```
For the demo, keep RLS disabled (default) or create read policies for the tables above.

## Deployment
Run `npm run build` and deploy `dist/` to your preferred hosting platform.
Vercel deploys use `vercel.json` to rewrite client-side routes to `/` while keeping `/api/*` serverless functions intact.
