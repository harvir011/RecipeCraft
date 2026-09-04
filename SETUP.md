# RecipeCraft - Setup Guide

## Prerequisites

You need to have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** (comes with Node.js)

## Installation Complete ✅

### Environment Files
✅ `/server/.env` - Created with default configuration
✅ `/client/.env` - Created with API URL

### Dependencies
- Server dependencies: Installing...
- Client dependencies: Installing...

## Next Steps

### 1. Verify MongoDB is Running

**Option A: Local MongoDB**
```bash
# Start MongoDB locally (if you have it installed)
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGODB_URI` in `/server/.env` with your Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/recipecraft`

### 2. Update Environment Variables (Optional)

**Server** (`/server/.env`):
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Change to a strong secret key for production
- `GOOGLE_API_KEY`: Add your Google Generative AI key later

**Client** (`/client/.env`):
- `VITE_API_URL`: API endpoint (default is fine for local development)

### 3. Start Development Servers

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```
Server will run on: http://localhost:5000

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
Client will run on: http://localhost:5173

### 4. Test the APIs

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Profile (use token from login response):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update `MONGODB_URI` with your cloud connection string
- Check the connection string format is correct

### Port Already in Use
- Server uses port 5000 (change with `PORT=3000 npm run dev`)
- Client uses port 5173 (Vite auto-picks alternative if unavailable)

### Dependencies Not Installed
- Run `npm install` in both `/server` and `/client` directories manually

### Token Expired
- JWT tokens expire in 30 days
- Login again to get a new token

## File Structure

```
RecipeCraft/
├── server/
│   ├── config/db.js              ✅ MongoDB connection
│   ├── models/
│   │   ├── User.js              ✅ User schema with password hashing
│   │   └── Recipe.js            ✅ Recipe schema
│   ├── controllers/
│   │   └── authController.js    ✅ Auth logic (register, login, me)
│   ├── routes/
│   │   └── authRoutes.js        ✅ Auth endpoints
│   ├── middleware/
│   │   └── authMiddleware.js    ✅ JWT verification
│   ├── server.js                 ✅ Express setup
│   ├── .env                      ✅ Environment variables
│   └── package.json              ✅ Dependencies
│
└── client/
    ├── src/
    │   ├── App.jsx              ✅ Root component
    │   ├── main.jsx             ✅ Entry point
    │   ├── index.css            ✅ Tailwind + custom styles
    │   ├── components/          📁 Reusable components
    │   ├── pages/               📁 Page components
    │   ├── api/                 📁 API integration
    │   ├── context/             📁 Context API
    │   └── hooks/               📁 Custom hooks
    ├── vite.config.js           ✅ Vite configuration
    ├── tailwind.config.js       ✅ Tailwind setup
    ├── index.html               ✅ HTML template
    ├── .env                     ✅ Environment variables
    └── package.json             ✅ Dependencies
```

## Ready to Code! 🚀

Once both npm installs complete, you're ready to:
1. Start the development servers
2. Test the authentication endpoints
3. Build your recipe generation features
