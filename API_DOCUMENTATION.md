# RecipeCraft API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a Bearer token. Include it in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": null,
    "createdAt": "2026-08-08T12:00:00.000Z"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": null,
    "createdAt": "2026-08-08T12:00:00.000Z"
  }
}
```

---

### Get Current User Profile
**GET** `/auth/me` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": null,
    "createdAt": "2026-08-08T12:00:00.000Z"
  }
}
```

---

## Recipe Endpoints

### Generate Recipe from AI
**POST** `/recipes/generate` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "ingredients": ["chicken breast", "garlic", "olive oil", "lemon"],
  "cuisine": "Mediterranean",
  "dietary": ["High-Protein", "Gluten-Free"],
  "mealType": "dinner"
}
```

**Response (200):**
```json
{
  "success": true,
  "recipe": {
    "title": "Garlic Herb Grilled Chicken with Lemon",
    "ingredients": [
      "2 chicken breasts",
      "3 cloves garlic, minced",
      "2 tablespoons olive oil",
      "2 lemons"
    ],
    "instructions": [
      "Preheat grill to medium-high heat",
      "Mix olive oil with minced garlic",
      "Season chicken with salt and pepper"
    ],
    "prepTime": "15 minutes",
    "cookTime": "25 minutes",
    "servings": 2,
    "estimatedCalories": 320,
    "macros": {
      "protein": 42,
      "carbs": 5,
      "fat": 14
    },
    "cookingTips": [
      "Don't move the chicken around on the grill",
      "Use a meat thermometer to ensure 165°F internal temperature"
    ]
  }
}
```

**Error Response (429 - Rate Limited):**
```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again in a moment."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide at least one ingredient"
}
```

---

### Save Generated Recipe
**POST** `/recipes/save` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Garlic Herb Grilled Chicken with Lemon",
  "ingredients": [
    "2 chicken breasts",
    "3 cloves garlic, minced",
    "2 tablespoons olive oil",
    "2 lemons"
  ],
  "instructions": [
    "Preheat grill to medium-high heat",
    "Mix olive oil with minced garlic",
    "Season chicken with salt and pepper",
    "Grill for 10-12 minutes per side"
  ],
  "prepTime": "15 minutes",
  "cookTime": "25 minutes",
  "servings": 2,
  "calories": 320,
  "macros": {
    "protein": 42,
    "carbs": 5,
    "fat": 14
  },
  "cuisine": "Mediterranean",
  "dietaryCategory": ["High-Protein", "Gluten-Free"],
  "cookingTips": ["Don't move the chicken", "Use meat thermometer"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recipe saved successfully",
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "Garlic Herb Grilled Chicken with Lemon",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": "15 minutes",
    "cookTime": "25 minutes",
    "servings": 2,
    "calories": 320,
    "macros": {
      "protein": 42,
      "carbs": 5,
      "fat": 14
    },
    "cuisine": "Mediterranean",
    "dietaryCategory": ["High-Protein", "Gluten-Free"],
    "cookingTips": ["Don't move the chicken", "Use meat thermometer"],
    "savedAt": "2026-08-08T12:30:00.000Z"
  }
}
```

---

### Get User's Recipes
**GET** `/recipes` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Query Parameters (all optional):**
- `search` - Search by title or ingredient (string)
- `cuisine` - Filter by cuisine type (string)
- `dietary` - Filter by dietary category (string or comma-separated)

**Examples:**
```
GET /recipes
GET /recipes?search=chicken
GET /recipes?cuisine=Mediterranean
GET /recipes?dietary=Vegan
GET /recipes?dietary=Vegan,Gluten-Free
GET /recipes?search=garlic&cuisine=Mediterranean
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "recipes": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "title": "Garlic Herb Grilled Chicken with Lemon",
      "ingredients": [...],
      "instructions": [...],
      "prepTime": "15 minutes",
      "cookTime": "25 minutes",
      "servings": 2,
      "calories": 320,
      "macros": {
        "protein": 42,
        "carbs": 5,
        "fat": 14
      },
      "cuisine": "Mediterranean",
      "dietaryCategory": ["High-Protein"],
      "cookingTips": [...],
      "savedAt": "2026-08-08T12:30:00.000Z"
    }
  ]
}
```

---

### Get Single Recipe by ID
**GET** `/recipes/:id` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Example:**
```
GET /recipes/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "Garlic Herb Grilled Chicken with Lemon",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": "15 minutes",
    "cookTime": "25 minutes",
    "servings": 2,
    "calories": 320,
    "macros": {
      "protein": 42,
      "carbs": 5,
      "fat": 14
    },
    "cuisine": "Mediterranean",
    "dietaryCategory": ["High-Protein"],
    "cookingTips": [...],
    "savedAt": "2026-08-08T12:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

**Error Response (403 - Unauthorized Access):**
```json
{
  "success": false,
  "message": "Not authorized to access this recipe"
}
```

---

### Update Recipe
**PUT** `/recipes/:id` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Body (all fields optional):**
```json
{
  "title": "Updated Recipe Title",
  "ingredients": ["new ingredient 1", "new ingredient 2"],
  "instructions": ["new step 1", "new step 2"],
  "prepTime": "20 minutes",
  "cookTime": "30 minutes",
  "servings": 4,
  "calories": 400,
  "macros": {
    "protein": 50,
    "carbs": 40,
    "fat": 15
  },
  "cuisine": "Italian",
  "dietaryCategory": ["Vegan"],
  "cookingTips": ["new tip 1"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "Updated Recipe Title",
    "ingredients": ["new ingredient 1", "new ingredient 2"],
    "instructions": ["new step 1", "new step 2"],
    "prepTime": "20 minutes",
    "cookTime": "30 minutes",
    "servings": 4,
    "calories": 400,
    "macros": {
      "protein": 50,
      "carbs": 40,
      "fat": 15
    },
    "cuisine": "Italian",
    "dietaryCategory": ["Vegan"],
    "cookingTips": ["new tip 1"],
    "savedAt": "2026-08-08T12:30:00.000Z"
  }
}
```

---

### Delete Recipe
**DELETE** `/recipes/:id` *(Protected)*

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Example:**
```
DELETE /recipes/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

**Error Response (403 - Unauthorized):**
```json
{
  "success": false,
  "message": "Not authorized to delete this recipe"
}
```

---

## Error Handling

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide at least one ingredient"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to access this recipe"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

### 429 Rate Limited (Gemini API)
```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again in a moment."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to generate recipe"
}
```

---

## Testing with cURL

### 1. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

### 2. Login (save the token)
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }' | jq -r '.token')
```

### 3. Generate Recipe
```bash
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["chicken", "garlic", "olive oil"],
    "cuisine": "Mediterranean",
    "dietary": ["High-Protein"]
  }'
```

### 4. Save Recipe
```bash
curl -X POST http://localhost:5000/api/recipes/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Garlic Chicken",
    "ingredients": ["2 chicken breasts", "3 garlic cloves"],
    "instructions": ["Cook it", "Serve hot"],
    "prepTime": "15 minutes",
    "cookTime": "25 minutes",
    "servings": 2,
    "calories": 320
  }'
```

### 5. Get User's Recipes
```bash
curl -X GET "http://localhost:5000/api/recipes?search=chicken" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Gemini API Configuration

The application uses Google's Gemini 1.5 Flash model for recipe generation.

**Required Environment Variable:**
```
GEMINI_API_KEY=your_api_key_here
```

Get your API key:
1. Go to https://ai.google.dev/
2. Create a new API key
3. Add it to `/server/.env`

**Rate Limits:**
- Free tier: 60 requests per minute
- The application handles rate limiting gracefully with 429 responses

**Response Format:**
- Gemini returns structured JSON with recipe details
- The service parses the response and handles markdown-wrapped JSON
- If parsing fails, returns a descriptive error message

---

## Feature Overview

✅ **AI Recipe Generation** - Uses Google Gemini to generate recipes from ingredients
✅ **Save to Database** - Store generated recipes to MongoDB
✅ **Search & Filter** - Find recipes by title, ingredient, cuisine, or dietary preference
✅ **CRUD Operations** - Full create, read, update, delete functionality
✅ **User Authentication** - JWT-based authentication with password hashing
✅ **Authorization** - Users can only access their own recipes
✅ **Error Handling** - Comprehensive error responses for all scenarios
✅ **Rate Limiting** - Graceful handling of API rate limits
