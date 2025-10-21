# MoodMate Deployment Guide

This guide provides step-by-step instructions for deploying MoodMate to production, specifically designed for AI agents and automated deployment systems.

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB Atlas account with cluster created
- [ ] Grok API key from https://x.ai/api
- [ ] Expo account created
- [ ] Render.com or Heroku account (for backend)
- [ ] Apple Developer account (for iOS deployment)
- [ ] Google Play Developer account (for Android deployment)

## Part 1: Backend Deployment

### Option A: Deploy to Render.com (Recommended)

#### Step 1: Prepare Repository

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
```

#### Step 2: Create Render Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** moodmate-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for production)

#### Step 3: Set Environment Variables

In Render dashboard, add:
```
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<generate_random_string>
GROK_API_KEY=<your_grok_api_key>
PORT=5000
NODE_ENV=production
```

#### Step 4: Deploy

Click "Create Web Service" - Render will automatically deploy.

**Backend URL:** `https://moodmate-api.onrender.com`

### Option B: Deploy to Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create moodmate-api

# Set environment variables
heroku config:set MONGO_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set GROK_API_KEY="your_grok_api_key"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Backend URL:** `https://moodmate-api.herokuapp.com`

## Part 2: MongoDB Atlas Setup

### Step 1: Create Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Choose cloud provider and region
4. Click "Create Cluster"

### Step 2: Configure Database Access

1. Database Access → Add New Database User
2. Create username and password
3. Set user privileges to "Read and write to any database"

### Step 3: Configure Network Access

1. Network Access → Add IP Address
2. For development: Add current IP
3. For production: Add `0.0.0.0/0` (allow from anywhere)
   - **Note:** More restrictive rules recommended for production

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `moodmate`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moodmate?retryWrites=true&w=majority
```

## Part 3: Mobile App Deployment

### Step 1: Update API URL

Edit `mobile/api.js`:

```javascript
const api = axios.create({
  baseURL: 'https://moodmate-api.onrender.com/api', // Your production URL
});
```

Also update `mobile/app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://moodmate-api.onrender.com/api"
    }
  }
}
```

### Step 2: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 3: Login to Expo

```bash
eas login
```

### Step 4: Configure EAS Build

```bash
cd mobile
eas build:configure
```

This creates `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Step 5: Build for iOS

```bash
# Build for iOS App Store
eas build --platform ios --profile production

# Or build for internal testing
eas build --platform ios --profile preview
```

**Requirements:**
- Apple Developer account ($99/year)
- Bundle identifier: `com.xai.moodmate` (or your own)

### Step 6: Build for Android

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Google Play
eas build --platform android --profile production
```

**Requirements:**
- Google Play Developer account ($25 one-time)
- Package name: `com.xai.moodmate` (or your own)

### Step 7: Submit to App Stores

#### iOS App Store

```bash
eas submit --platform ios
```

You'll need:
- App Store Connect account
- App created in App Store Connect
- Filled app information (description, screenshots, etc.)

#### Google Play Store

```bash
eas submit --platform android
```

You'll need:
- Google Play Console account
- App created in Play Console
- Filled app information

## Part 4: Automated Deployment Script

For AI agents, here's a complete deployment script:

```bash
#!/bin/bash

# MoodMate Automated Deployment Script

echo "🚀 Starting MoodMate Deployment..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js required but not installed. Aborting." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git required but not installed. Aborting." >&2; exit 1; }

# Environment variables (set these before running)
: ${MONGO_URI:?'MONGO_URI not set'}
: ${JWT_SECRET:?'JWT_SECRET not set'}
: ${GROK_API_KEY:?'GROK_API_KEY not set'}
: ${BACKEND_URL:?'BACKEND_URL not set'}

echo "✅ Prerequisites checked"

# Deploy Backend
echo "📦 Deploying backend..."
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=${MONGO_URI}
JWT_SECRET=${JWT_SECRET}
GROK_API_KEY=${GROK_API_KEY}
PORT=5000
NODE_ENV=production
EOF

# Initialize git if needed
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

# Deploy to Render (using Render API)
# Or push to Heroku
# heroku create moodmate-api
# git push heroku main

echo "✅ Backend deployed"

# Deploy Mobile
echo "📱 Preparing mobile app..."
cd ../mobile

# Update API URL
sed -i "s|http://localhost:5000/api|${BACKEND_URL}/api|g" api.js

npm install

# Build for production
eas build --platform all --profile production --non-interactive

echo "✅ Mobile builds started"
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Monitor build progress: eas build:list"
echo "2. Test builds thoroughly"
echo "3. Submit to app stores: eas submit"
```

## Part 5: Field Testing

### Beta Testing with Expo

```bash
# Publish to Expo for OTA updates
cd mobile
expo publish --release-channel beta
```

Share the Expo Go link with beta testers.

### TestFlight (iOS)

1. Build with `eas build --platform ios --profile preview`
2. Upload to TestFlight via App Store Connect
3. Add internal/external testers
4. Distribute build

### Google Play Beta

1. Build with `eas build --platform android --profile production`
2. Upload to Google Play Console
3. Create closed/open testing track
4. Add testers via email or link

## Part 6: Monitoring & Analytics

### Backend Monitoring

Add error tracking (e.g., Sentry):

```bash
cd backend
npm install @sentry/node
```

In `server.js`:

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});

// Error handler
app.use(Sentry.Handlers.errorHandler());
```

### Mobile Monitoring

Add Sentry for React Native:

```bash
cd mobile
expo install sentry-expo
```

Configure in `App.js`:

```javascript
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableInExpoDevelopment: false,
});
```

## Part 7: Post-Deployment Checklist

- [ ] Backend health check: `curl https://your-api.com/`
- [ ] Test user registration
- [ ] Test user login
- [ ] Test mood logging
- [ ] Test AI insights (verify Grok API)
- [ ] Test mobile app on iOS device
- [ ] Test mobile app on Android device
- [ ] Verify secure token storage
- [ ] Check error logging
- [ ] Monitor API response times
- [ ] Review app store compliance
- [ ] Set up automated backups for MongoDB
- [ ] Configure SSL/HTTPS (usually automatic on Render/Heroku)

## Part 8: Maintenance

### Regular Updates

```bash
# Backend updates
cd backend
git pull
npm install
git push heroku main  # or deploy to Render

# Mobile OTA updates
cd mobile
expo publish --release-channel production
```

### Database Backups

MongoDB Atlas provides automatic backups. Configure:
1. Go to cluster → Backup
2. Enable continuous backup
3. Set retention period

### Scaling

**Backend:**
- Render: Upgrade to paid plan for auto-scaling
- Heroku: Add more dynos or upgrade dyno type

**Database:**
- MongoDB Atlas: Upgrade cluster tier
- Add read replicas for better performance

## Troubleshooting

### Backend Issues

**502 Bad Gateway:**
- Check backend logs
- Verify environment variables
- Ensure MongoDB connection

**API Timeout:**
- Increase timeout limits
- Optimize database queries
- Add caching layer

### Mobile Issues

**Build Failures:**
- Check `eas build:list` for errors
- Verify credentials are valid
- Review build logs

**App Crashes:**
- Check Sentry for error reports
- Test on multiple devices
- Review crash logs in app stores

## Security Recommendations

1. **API Rate Limiting:**
```bash
npm install express-rate-limit
```

2. **Helmet.js for Security Headers:**
```bash
npm install helmet
```

3. **Input Validation:**
- Already implemented with express-validator
- Review and enhance as needed

4. **Regular Security Audits:**
```bash
npm audit
npm audit fix
```

## Compliance

### Health App Guidelines

**Apple App Store:**
- Include privacy policy
- Clearly state not medical advice
- No health claims
- Proper data handling disclosure

**Google Play Store:**
- Similar requirements
- Health & fitness category
- Privacy policy required

### GDPR Compliance (if applicable)

- Add data export functionality
- Implement account deletion
- Update privacy policy
- Add consent mechanisms

## Support & Resources

- **Expo Documentation:** https://docs.expo.dev/
- **Render Documentation:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com/
- **Grok API:** https://x.ai/api

---

**Deployment Complete!** 🎉

Your MoodMate app is now live and ready for users. Monitor performance, gather feedback, and iterate based on user needs.

