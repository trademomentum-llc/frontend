# frontend
Client facing website frontend written in typescript using react and tailwind css

## Deployment strategy (recommended)
Use **Vercel** for CI/preview/production deploys of the React/Vite app, and use a separate GitHub Actions workflow to publish the built static files to **cPanel**.

Why: Vercel does not natively "push" your build artifacts to cPanel hosting, so keeping cPanel publishing as its own workflow is the most reliable approach.

## Vercel configuration
This repository includes `/home/runner/work/frontend/frontend/vercel.json` with Vite defaults:
- build command: `npm run build`
- output directory: `dist`

Connect this repository in Vercel and set project env vars there if needed.

## cPanel publish workflow
This repository includes `/home/runner/work/frontend/frontend/.github/workflows/deploy-cpanel.yml`.

On pushes to `main` (or manual dispatch), it:
1. Installs dependencies (`npm ci`)
2. Builds (`npm run build`)
3. Uploads `dist/` to cPanel via FTP

Set these GitHub repository secrets before enabling the workflow:
- `CPANEL_FTP_HOST`
- `CPANEL_FTP_USERNAME`
- `CPANEL_FTP_PASSWORD`
- `CPANEL_FTP_TARGET_DIR` (example: `/public_html/`)

## Notes
- If your host supports SFTP/SSH, switch to an SFTP deploy action for better security.
- Keep Vercel and cPanel as independent deployment targets fed from the same source branch.
