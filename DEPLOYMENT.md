# Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub repository
2. Visit https://vercel.com
3. Click "New Project" → "Import Git Repository"
4. Select your repository
5. Add Environment Variable: `GEMINI_API_KEY` (your Gemini API key)
6. Click "Deploy"
7. Copy the deployed URL

### Option 2: Railway
1. Visit https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add Environment Variable: `GEMINI_API_KEY`
5. Click "Deploy"
6. Copy the deployed URL

### Option 3: Render
1. Visit https://render.com
2. Click "New Web Service" → "Build and deploy from a Git repository"
3. Select your repository
4. Runtime: Node
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add Environment Variable: `GEMINI_API_KEY`
8. Click "Create Web Service"
9. Copy the deployed URL

## Environment Variables Required
- `GEMINI_API_KEY`: Your Google Gemini API key from https://aistudio.google.com

## Testing Your Deployed API
Replace `YOUR_DEPLOYED_URL` with your actual deployed URL:

```bash
# Health check
curl YOUR_DEPLOYED_URL/health

# Test fibonacci
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Test prime
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'

# Test LCM
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12,18,24]}'

# Test HCF
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24,36,60]}'

# Test AI (requires GEMINI_API_KEY)
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'
```

## GitHub Repository Setup
1. Create a new repository on GitHub
2. Make it public
3. Push your code:
```bash
git init
git add .
git commit -m "Initial commit - BFHL APIs"
git branch -M main
git remote add origin https://github.com/yourusername/bfhl-api.git
git push -u origin main
```

## Final Checklist
- [ ] Repository is public on GitHub
- [ ] All source code is committed
- [ ] GEMINI_API_KEY is set as environment variable in deployment
- [ ] APIs are accessible and responding correctly
- [ ] Error handling is working for edge cases
- [ ] Security measures are in place (rate limiting, validation)

## Share Your Work
Once deployed, share:
1. GitHub repository URL
2. Deployed API URL
3. Brief description of your implementation
