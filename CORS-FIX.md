# CORS Configuration Fix

## Issue
Your Vercel deployments are blocked by CORS because the backend doesn't allow requests from Vercel domains.

## Solution Applied

1. **Updated `backend/src/app.js`** to automatically allow all Vercel preview URLs using regex pattern:
   - Pattern: `/https:\/\/.*\.vercel\.app$/`
   - This allows all `*.vercel.app` domains

2. **The backend now accepts:**
   - All Vercel preview deployments (automatic)
   - Localhost development URLs
   - Production URLs set in environment variables

## Important: Update Backend Environment Variables on Render

You need to add your production Vercel URLs to your Render backend:

### Step 1: Get Your Vercel URLs

After deploying on Vercel, you'll get URLs like:
- Frontend: `https://fyp-frontend-xxxxx.vercel.app`
- Admin: `https://fyp-admin-xxxxx.vercel.app`

### Step 2: Update Render Environment Variables

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service (fyp-wogy)
3. Go to "Environment" tab
4. Add/Update these variables:
   ```
   CLIENT_URL=https://your-frontend-production-url.vercel.app
   ADMIN_URL=https://your-admin-production-url.vercel.app
   ```
5. Click "Save Changes"
6. Render will automatically redeploy your backend

## Testing

After updating:
1. Your Vercel preview deployments should work immediately (regex pattern)
2. Your production deployments will work after setting environment variables
3. Localhost will continue to work

## Alternative: Simpler CORS (Less Secure)

If you want to allow ALL origins temporarily for testing:

```javascript
app.use(
  cors({
    origin: '*',
    credentials: false,  // Must be false when using '*'
  })
);
```

**Note:** This is NOT recommended for production as it allows any website to access your API.
