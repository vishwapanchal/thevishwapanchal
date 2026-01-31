#!/bin/bash

# Ensure we are in the project root
if [ ! -d "frontend" ]; then
  echo "❌ Error: Please run this script from the 'portfolio' project root."
  exit 1
fi

echo "🚀 Starting PRODUCTION Deployment for 'vishwapanchal'..."

# 1. Build the Project
# We rebuild to ensure the latest code is what gets uploaded
echo "🛠️  Building the frontend..."
cd frontend
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
  echo "❌ Build failed. Directory 'frontend/build' not found."
  exit 1
fi

# Go back to root
cd ..

# 2. Deploy to Cloudflare Pages (PRODUCTION)
# The critical flag here is '--branch main'. 
# This tells Cloudflare to treat this upload as the production version.
echo "☁️  Pushing to Cloudflare Production..."

npx wrangler pages deploy frontend/build --project-name vishwapanchal --branch main --commit-dirty=true

echo "--------------------------------------------------------"
echo "✅ PRODUCTION DEPLOYMENT COMPLETE"
echo "🌐 Your live site should now be updated."
echo "--------------------------------------------------------"