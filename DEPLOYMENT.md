# 🚀 RecipeCraft Deployment Guide

Complete guide to deploy RecipeCraft to production.

---

## 📋 Deployment Checklist

- [ ] Backend environment variables configured
- [ ] Frontend environment variables configured
- [ ] MongoDB Atlas cluster created and connection string ready
- [ ] Gemini API key obtained
- [ ] SSL certificates installed (HTTPS)
- [ ] CORS origins configured
- [ ] Database backups configured
- [ ] Monitoring and logging set up
- [ ] Rate limiting configured
- [ ] Error tracking (Sentry) configured

---

## 🔷 Frontend Deployment

### Option 1: Vercel (Recommended)

**Step 1: Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/RecipeCraft.git
git push -u origin master
```

**Step 2: Create Vercel Account**
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Import RecipeCraft repository

**Step 3: Configure Environment**
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://api.recipecraft.com
```

**Step 4: Deploy**
- Vercel automatically deploys on every push to master
- Customizable deployment preview URLs

### Option 2: Netlify

**Step 1: Build Production**
```bash
cd client
npm run build
```

**Step 2: Deploy**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Step 3: Configure Environment**
In Netlify Dashboard → Site settings → Build & deploy:
```
VITE_API_URL=https://api.recipecraft.com
```

### Option 3: Docker

**Create Dockerfile**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run**
```bash
docker build -t recipecraft-client .
docker run -p 3000:3000 recipecraft-client
```

---

## 🔶 Backend Deployment

### Option 1: Heroku

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

**Step 2: Create Heroku App**
```bash
cd server
heroku create recipecraft-api
```

**Step 3: Set Environment Variables**
```bash
heroku config:set MONGODB_URI=<your_atlas_uri>
heroku config:set JWT_SECRET=<random_key>
heroku config:set GEMINI_API_KEY=<your_key>
heroku config:set CORS_ORIGIN=https://recipecraft.vercel.app
heroku config:set NODE_ENV=production
```

**Step 4: Deploy**
```bash
git push heroku main
```

### Option 2: Railway

**Step 1: Sign up at [railway.app](https://railway.app)**

**Step 2: Connect GitHub**
- Import RecipeCraft repository
- Select `server` directory

**Step 3: Configure Variables**
In Railway Dashboard → Variables:
```
MONGODB_URI=<your_atlas_uri>
JWT_SECRET=<random_key>
GEMINI_API_KEY=<your_key>
CORS_ORIGIN=https://recipecraft.vercel.app
NODE_ENV=production
```

**Step 4: Deploy**
- Railway auto-deploys on push

### Option 3: DigitalOcean App Platform

**Step 1: Create DigitalOcean Account**

**Step 2: Create App**
- Connect GitHub repository
- Select `server` directory
- Choose Node.js build

**Step 3: Configure Environment**
Add environment variables in App spec

**Step 4: Deploy**
- DigitalOcean handles build and deployment

### Option 4: Docker (Self-hosted)

**Create Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Build and run**
```bash
docker build -t recipecraft-api .
docker run -p 5000:5000 \
  -e MONGODB_URI=<uri> \
  -e JWT_SECRET=<key> \
  -e GEMINI_API_KEY=<key> \
  -e CORS_ORIGIN=https://recipecraft.vercel.app \
  recipecraft-api
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

**Step 1: Create Account**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for free tier

**Step 2: Create Cluster**
- Choose free shared cluster
- Select region close to your users
- Name it `recipecraft`

**Step 3: Create Database User**
- Go to Database Access
- Add new database user
- Save username and password

**Step 4: Get Connection String**
- Go to Clusters → Connect
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with your database user password

**Step 5: Whitelist IPs**
- Go to Network Access
- Add your deployment server's IP
- Or allow all IPs (less secure)

### Example Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/recipecraft?retryWrites=true&w=majority
```

---

## 🔑 Environment Variables

### Production Backend (.env)

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/recipecraft

# JWT
JWT_SECRET=generate-a-random-64-character-string-for-production

# Gemini AI
GEMINI_API_KEY=your-google-api-key

# Server
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN=https://yourdomain.com

# Optional - Add more security
LOG_LEVEL=info
SESSION_TIMEOUT=86400
```

### Production Frontend (.env)

```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🔐 Security Best Practices

### 1. HTTPS/SSL
```bash
# Use Let's Encrypt for free SSL
# Heroku, Railway, Vercel auto-enable HTTPS

# Self-hosted with Nginx:
# Use Certbot to get free SSL certificates
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.yourdomain.com
```

### 2. Environment Variables
- Never commit `.env` files
- Use `.env.example` template
- Rotate secrets regularly
- Use strong random strings for JWT_SECRET

### 3. Rate Limiting
```javascript
// Add to server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### 4. Input Validation
- All inputs validated on both client and server
- Use mongoose schema validation
- Sanitize user inputs

### 5. Authentication
- JWT tokens signed with strong secret
- CORS properly configured
- HTTPS enforced

---

## 🔍 Monitoring & Logging

### Option 1: Sentry (Error Tracking)

```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://...@sentry.io/...",
  environment: "production",
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
```

### Option 2: LogRocket (User Session Replay)

```bash
npm install logrocket
```

```javascript
import LogRocket from 'logrocket';

LogRocket.init('your-app-id');
```

### Option 3: Cloud Logging

**AWS CloudWatch:**
```bash
npm install winston winston-cloudwatch
```

**Google Cloud Logging:**
```bash
npm install @google-cloud/logging
```

---

## 📊 Performance Optimization

### Frontend

```bash
# Enable gzip compression
npm run build

# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
```

### Backend

```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Cache control
app.use(express.static('public', {
  maxAge: '1d'
}));
```

---

## 🧪 Pre-deployment Testing

```bash
# Test backend
cd server
npm test
npm run lint

# Test frontend
cd ../client
npm test
npm run build
npm run preview

# Test production build
npm run build
npm run preview
```

---

## 📈 Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Backend
echo "📦 Building backend..."
cd server
npm install
npm test
npm run lint

# Frontend
echo "📦 Building frontend..."
cd ../client
npm install
npm test
npm run build

echo "✅ Deployment successful!"
echo "🎉 Application is ready for production"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check environment variables
echo $MONGODB_URI
echo $JWT_SECRET

# Check MongoDB connection
npm install -g mongosh
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/recipecraft"

# Check logs
heroku logs --tail
# or
railway logs
```

### Frontend won't build
```bash
# Clear cache
rm -rf node_modules dist
npm install

# Check build
npm run build

# Check for errors
npm run lint
```

### CORS errors
```javascript
// Check CORS origin in .env
console.log(process.env.CORS_ORIGIN);

// Verify frontend URL matches
```

---

## ✅ Post-deployment

- [ ] Test all user flows
- [ ] Check performance with [GTmetrix](https://gtmetrix.com)
- [ ] Monitor error tracking
- [ ] Setup database backups
- [ ] Configure monitoring alerts
- [ ] Document deployment process
- [ ] Setup CI/CD pipeline
- [ ] Create runbooks for common issues

---

## 📞 Support

For deployment issues:
- Check provider documentation (Vercel, Railway, Heroku)
- Review logs in deployment dashboard
- Test locally first with production config
- Enable detailed error logging
- Contact cloud provider support

---

**Happy Deploying! 🎉**
