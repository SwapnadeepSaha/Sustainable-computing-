# GreenCode — Sustainable Coding Assistant

**Write Smarter. Compute Less. Code Sustainably.**

GreenCode is a learning-focused web application for comparing algorithmic approaches, observing execution-time differences, and understanding why algorithm selection matters for computational efficiency.

## Features
- Compare repeated addition vs. a formula, linear vs. binary search, and nested loops vs. Set lookup.
- Run warm-up iterations and repeated browser timing measurements.
- View average, best, and worst observed execution time.
- Learn time-complexity differences and sustainable coding practices.
- Responsive dark interface designed for desktop and mobile.

## Live deployment
This repository is configured for GitHub Pages through GitHub Actions. After pushing to the `main` branch:
1. Open **Settings → Pages** in the repository.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for the deployment workflow to succeed.
4. The site should be available at `https://SwapnadeepSaha.github.io/Sustainable-computing/`.

## Run locally
Requires Node.js 20 or newer:
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
```

## Backend
A FastAPI starter is in `backend/`. GitHub Pages cannot host Python servers. Deploy the backend separately to a Python hosting service if required. Do not execute arbitrary submitted source code in an ordinary web server.

## Methodology and limitations
- Browser benchmarks are affected by device, browser, background load, thermal state, and timer precision.
- Results are observations, not universal guarantees. Repeat tests under consistent conditions.
- Big-O labels describe expected growth, not exact execution time.
- The relative efficiency score is a simplified comparison indicator, not a validated universal metric.
- This project does **not** measure electricity use, carbon emissions, or actual energy consumption. It must not be presented as a measured carbon-footprint tool.

## Security
The frontend benchmarks only predefined trusted functions. The API starter accepts source text for safe metadata analysis and never executes it. Any future arbitrary-code execution feature would require a properly isolated sandbox with strict CPU, memory, and time limits.

## Tech stack
React, Vite, Tailwind CSS, Recharts, Lucide React, FastAPI, Pydantic, GitHub Actions.

## License
MIT — see `LICENSE`.
