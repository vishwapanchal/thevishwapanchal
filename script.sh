#!/bin/bash

# Ensure we are in the project root
if [ ! -d "frontend" ]; then
  echo "❌ Error: Please run this script from the 'portfolio' project root."
  exit 1
fi

echo "🚀 Deploying updates to Cloudflare (Project: vishwapanchal)..."

# 1. Build the React Application
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

# 2. Deploy to Cloudflare Pages
# This uploads the 'frontend/build' folder to the 'vishwapanchal' project
echo "☁️  Pushing to Cloudflare..."

npx wrangler pages deploy frontend/build --project-name vishwapanchal --commit-dirty=true

echo "✅ Deployment complete! Your site updates are live."