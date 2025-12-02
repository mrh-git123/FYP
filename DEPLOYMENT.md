# Vercel Deployment Guide

This guide explains how to deploy the Frontend and Admin applications separately on Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed (optional): `npm i -g vercel`
- Backend API deployed and accessible

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Deploy Frontend

1. Go to https://vercel.com/new
2. Import your GitHub repository: `mrh-git123/FYP`
3. Configure the project:
   - **Project Name**: `stellar-frontend` (or any name you prefer)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `your-backend-api-url` (e.g., `https://your-api.com/api`)

5. Click "Deploy"

### Deploy Admin

1. Go to https://vercel.com/new again
2. Import the SAME GitHub repository: `mrh-git123/FYP`
3. Configure the project:
   - **Project Name**: `stellar-admin` (or any name you prefer)
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `your-backend-api-url` (e.g., `https://your-api.com/api`)

5. Click "Deploy"

## Method 2: Deploy via Vercel CLI

### Deploy Frontend

```bash
cd frontend
vercel --prod
# Follow the prompts:
# - Set project name
# - Confirm build settings
# - Add environment variables when prompted
```

### Deploy Admin

```bash
cd admin
vercel --prod
# Follow the prompts:
# - Set project name
# - Confirm build settings
# - Add environment variables when prompted
```

## Important Notes

### Environment Variables

After deployment, you need to set the `VITE_API_URL` environment variable for both projects:

1. Go to your project settings in Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add `VITE_API_URL` with your backend API URL
4. Redeploy the project

### Backend API URL

Make sure your backend API is deployed and CORS is configured to allow requests from your Vercel domains:

```javascript
// In backend/src/app.js
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://your-frontend.vercel.app',
  'https://your-admin.vercel.app'
];
```

### Domain Configuration

After deployment, Vercel will provide URLs like:
- Frontend: `https://stellar-frontend.vercel.app`
- Admin: `https://stellar-admin.vercel.app`

You can add custom domains in the project settings.

## Automatic Deployments

Once set up, Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: For every pull request or branch push

## Troubleshooting

### Build Failures

If builds fail, check:
1. All dependencies are in `package.json`
2. Build command is correct
3. Environment variables are set
4. No TypeScript errors

### API Connection Issues

If the app can't connect to the API:
1. Verify `VITE_API_URL` is set correctly
2. Check backend CORS configuration
3. Ensure backend API is accessible from the internet

### Routing Issues

If routes don't work (404 errors):
- The `vercel.json` files handle client-side routing
- Make sure they exist in both `frontend/` and `admin/` directories

## Production Checklist

- [ ] Backend API deployed and accessible
- [ ] Backend CORS configured for Vercel domains
- [ ] Frontend `VITE_API_URL` environment variable set
- [ ] Admin `VITE_API_URL` environment variable set
- [ ] Test all features after deployment
- [ ] Set up custom domains (optional)
- [ ] Enable Vercel Analytics (optional)
