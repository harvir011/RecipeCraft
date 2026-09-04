# 🍳 RecipeCraft - AI-Powered Recipe Generator

> **Create Amazing Recipes with AI Magic**  
> A full-stack web application that generates creative recipes using Google's Gemini AI, with user authentication, recipe management, and a delightfully brutalist design.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5-13AA52?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=flat-square&logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 **Authentication System**
- User registration with validation
- Secure JWT-based login
- Password hashing with bcryptjs
- Protected routes
- Persistent sessions with localStorage

### 🤖 **AI Recipe Generation**
- Generate recipes from ingredients
- Cuisine type selection (9 options)
- Meal type selection (5 options)
- Dietary preference filtering (8 categories)
- Structured JSON response with:
  - Title, ingredients, instructions
  - Prep/cook times, servings
  - Nutritional info (calories, macros)
  - Cooking tips

### 💾 **Recipe Management**
- Save generated recipes
- View saved recipes
- Search by title/ingredient
- Filter by cuisine and dietary preference
- Edit recipe details
- Delete recipes with confirmation
- Quick-view modal

### 📱 **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Optimized layouts

### 🎨 **Neo-Brutalism Design**
- Bold 3px-4px dark borders
- Hard offset box shadows
- Vibrant color palette
- Sketchy hand-drawn fonts
- Interactive hover effects
- Accessibility features

### 🎉 **User Experience**
- Toast notifications
- Loading states
- Form validation
- Confetti animations
- Modal dialogs
- Error handling

---

## 🛠 Tech Stack

### **Frontend**
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Canvas Confetti** - Celebration animations
- **Google Fonts** - Custom typography

### **Backend**
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI recipe generation
- **CORS** - Cross-origin handling
- **dotenv** - Environment variables

---

## 📂 Project Structure

```
RecipeCraft/
├── server/                          # Node.js/Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Recipe.js               # Recipe schema
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   └── recipeController.js     # Recipe CRUD
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── recipeRoutes.js         # Recipe endpoints
│   ├── services/
│   │   └── aiService.js            # Gemini AI integration
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification
│   ├── .env.example                # Environment template
│   ├── server.js                   # Entry point
│   └── package.json                # Dependencies
│
├── client/                          # React/Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Navbar.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Footer
│   │   │   ├── Toast.jsx           # Notifications
│   │   │   ├── Modal.jsx           # Dialogs
│   │   │   ├── TagInput.jsx        # Ingredient input
│   │   │   └── ProtectedRoute.jsx  # Auth guard
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Generator.jsx       # Recipe generator
│   │   │   └── Dashboard.jsx       # Recipe management
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state
│   │   ├── api/
│   │   │   └── axios.js            # API client
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── .env.example                # Environment template
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind setup
│   ├── postcss.config.js           # PostCSS setup
│   ├── index.html                  # HTML template
│   └── package.json                # Dependencies
│
├── .gitignore                      # Git ignore rules
├── README.md                       # This file
└── documentation/                 # Additional guides
    ├── DESIGN_SYSTEM.md
    ├── API_DOCUMENTATION.md
    └── DEPLOYMENT.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))
- **Gemini API Key** ([Get it](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/RecipeCraft.git
   cd RecipeCraft
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Edit .env if needed
   ```

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/recipecraft
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipecraft

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Google Gemini AI
GEMINI_API_KEY=your_google_api_key_from_ai_google_dev

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables (`.env`)

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

### Getting Required Keys

**Gemini API Key:**
1. Visit [ai.google.dev](https://ai.google.dev/)
2. Click "Get API Key"
3. Create new API key
4. Add to `.env`

**MongoDB Connection String:**
- **Local**: `mongodb://localhost:27017/recipecraft`
- **Atlas Cloud**: [Create free cluster](https://www.mongodb.com/cloud/atlas)

---

## 🏃 Development

### Start Everything Locally

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

### Available Scripts

**Server:**
```bash
npm start        # Start production server
npm run dev      # Start with auto-reload (nodemon)
```

**Client:**
```bash
npm run dev      # Start dev server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**Register User**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 201
{
  "success": true,
  "token": "jwt_token",
  "user": { "id", "name", "email" }
}
```

**Login User**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200
{
  "success": true,
  "token": "jwt_token",
  "user": { "id", "name", "email" }
}
```

**Get User Profile** (Protected)
```http
GET /auth/me
Authorization: Bearer {token}

Response: 200
{
  "success": true,
  "user": { "id", "name", "email", "createdAt" }
}
```

### Recipe Endpoints (All Protected)

**Generate Recipe**
```http
POST /recipes/generate
Authorization: Bearer {token}

{
  "ingredients": ["chicken", "garlic"],
  "cuisine": "Mediterranean",
  "dietary": ["High-Protein"],
  "mealType": "dinner"
}

Response: 200
{
  "success": true,
  "recipe": { "title", "ingredients", "instructions", ... }
}
```

**Save Recipe**
```http
POST /recipes/save
Authorization: Bearer {token}

{
  "title": "Recipe Name",
  "ingredients": [...],
  "instructions": [...],
  ...
}

Response: 201
{
  "success": true,
  "recipe": { saved recipe with _id }
}
```

**Get User Recipes**
```http
GET /recipes?search=chicken&cuisine=Mediterranean&dietary=Vegan
Authorization: Bearer {token}

Response: 200
{
  "success": true,
  "count": 5,
  "recipes": [...]
}
```

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🎨 Design System

### Colors
- **Electric Orange** `#FF5A36` - Primary actions
- **Vibrant Yellow** `#FFC700` - Secondary actions
- **Deep Mint** `#00D084` - Success/tertiary
- **Dark Charcoal** `#1A1A1E` - Text/borders

### Typography
- **Headers**: Chicle, Fredoka (bold/chunky)
- **Body**: Plus Jakarta Sans (readable)
- **Accents**: Architects Daughter (sketchy)

### Components
- **Button**: 4 variants × 3 sizes
- **Card**: With optional accent decoration
- **Input/Select**: Thick 3px borders
- **Badge**: Hand-drawn style pills
- **Toast**: Auto-dismissing notifications
- **Modal**: 4 size options

For detailed design guidelines, see [DESIGN_SYSTEM.md](./client/DESIGN_SYSTEM.md)

---

## 📦 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build for production**
   ```bash
   cd client
   npm run build
   # Creates optimized dist/ folder
   ```

2. **Deploy with Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

   Or connect GitHub repo to Vercel dashboard

3. **Set environment variables** in Vercel dashboard
   ```
   VITE_API_URL=https://api.example.com
   ```

### Backend Deployment (Heroku/Railway)

1. **Set environment variables** on hosting platform
   ```
   MONGODB_URI=<your_atlas_uri>
   JWT_SECRET=<strong_random_key>
   GEMINI_API_KEY=<your_key>
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Deploy**
   ```bash
   git push heroku main
   # Or use Railway, Render, etc.
   ```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Navigate to generator
- [ ] Add ingredients via tag input
- [ ] Generate recipe
- [ ] Verify confetti animation
- [ ] Save recipe
- [ ] View on dashboard
- [ ] Search/filter recipes
- [ ] Edit recipe
- [ ] Delete recipe
- [ ] Test responsive design
- [ ] Test on mobile device

### Running Tests

```bash
# Backend
cd server
npm test

# Frontend
cd client
npm test
```

---

## 🔒 Security Considerations

✅ **Passwords**: Hashed with bcryptjs (10 salt rounds)
✅ **Authentication**: JWT with 30-day expiration
✅ **CORS**: Configured for frontend origin
✅ **Input Validation**: On all endpoints
✅ **Error Messages**: Don't leak sensitive info
✅ **HTTPS**: Use in production
✅ **Rate Limiting**: Implement in production
✅ **API Keys**: Never commit to git

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB University](https://university.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/RecipeCraft/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/RecipeCraft/discussions)
- **Email**: support@recipecraft.dev

---

## 🎉 Acknowledgments

Built with ❤️ using modern web technologies. Inspired by the joy of cooking and the power of AI.

---

**Made with 🍳 by RecipeCraft Team**

*Last updated: August 2026*
