#!/usr/bin/env bash
# Deploy the static SPA to Vercel.
#
# Why this script exists:
# The TanStack Start Nitro plugin auto-generates a Vercel Build Output config
# (.vercel/output/config.json) that routes every request to an SSR function.
# In SPA mode (spa.enabled: true) that function renders nothing, so every route
# 404s. This app is a pure frontend prototype, so we override the generated
# config with a static-SPA routing table that serves _shell.html for all routes
# and let the client-side router take over.
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Building Vercel output..."
vercel build --prod --yes

echo "==> Overwriting generated config with static-SPA routing..."
cat > .vercel/output/config.json <<'JSON'
{
  "version": 3,
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "public, max-age=31536000, immutable" },
      "continue": true
    },
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/_shell.html" }
  ],
  "overrides": {}
}
JSON

echo "==> Deploying prebuilt output to production..."
vercel deploy --prebuilt --prod --yes

echo "==> Done. Live at https://speed-to-lead-v2.vercel.app"
