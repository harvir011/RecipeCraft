# RecipeCraft API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## 🔑 Authentication

### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}

Response: 201
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id", "name", "email", "createdAt" }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@test.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id", "name", "email", "createdAt" }
}
```

### Get Profile
```
GET /auth/me
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": { "id", "name", "email", "createdAt" }
}
```

---

## 🍳 Recipe Endpoints

### Generate Recipe (AI)
```
POST /recipes/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "ingredients": ["chicken", "garlic"],
  "cuisine": "Mediterranean",
  "dietary": ["High-Protein"],
  "mealType": "dinner"
}

Response: 200
{
  "success": true,
  "recipe": {
    "title": "...",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": "...",
    "cookTime": "...",
    "servings": 2,
    "estimatedCalories": 320,
    "macros": { "protein", "carbs", "fat" },
    "cookingTips": [...]
  }
}
```

### Save Recipe
```
POST /recipes/save
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1"],
  "instructions": ["step 1"],
  "prepTime": "15 minutes",
  "cookTime": "25 minutes",
  "servings": 2,
  "calories": 320,
  "macros": { "protein": 35, "carbs": 5, "fat": 14 },
  "cuisine": "Mediterranean",
  "dietaryCategory": ["High-Protein"],
  "cookingTips": ["tip 1"]
}

Response: 201
{
  "success": true,
  "message": "Recipe saved successfully",
  "recipe": { "all fields + _id", "user", "savedAt" }
}
```

### Get User Recipes
```
GET /recipes
GET /recipes?search=chicken
GET /recipes?cuisine=Mediterranean
GET /recipes?dietary=Vegan
GET /recipes?search=garlic&cuisine=Italian&dietary=Vegan
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 5,
  "recipes": [
    { "all recipe fields" }
  ]
}
```

### Get Recipe by ID
```
GET /recipes/recipe_id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "recipe": { "all recipe fields" }
}
```

### Update Recipe
```
PUT /recipes/recipe_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "servings": 4
}

Response: 200
{
  "success": true,
  "message": "Recipe updated successfully",
  "recipe": { "all recipe fields" }
}
```

### Delete Recipe
```
DELETE /recipes/recipe_id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

---

## Error Responses

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

### 429 Rate Limited
```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again in a moment."
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Failed to generate recipe"
}
```

---

## 🔐 Cuisine Options
- Italian
- Asian
- Mexican
- Indian
- Mediterranean
- American
- French
- Middle Eastern
- Thai
- Japanese
- Other

## 🥗 Dietary Categories
- Vegan
- Vegetarian
- Gluten-Free
- Dairy-Free
- Keto
- High-Protein
- Low-Carb
- Paleo
- Kosher
- Halal

---

## cURL Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

### Get Token
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}' | jq -r '.token')
```

### Generate Recipe
```bash
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["chicken", "garlic"],
    "cuisine": "Mediterranean",
    "dietary": ["High-Protein"]
  }'
```

### Save Recipe
```bash
curl -X POST http://localhost:5000/api/recipes/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Recipe",
    "ingredients": ["ingredient 1"],
    "instructions": ["step 1"],
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2
  }'
```

### Get Recipes
```bash
curl -X GET "http://localhost:5000/api/recipes?search=chicken" \
  -H "Authorization: Bearer $TOKEN"
```

### Update Recipe
```bash
curl -X PUT http://localhost:5000/api/recipes/recipe_id \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Delete Recipe
```bash
curl -X DELETE http://localhost:5000/api/recipes/recipe_id \
  -H "Authorization: Bearer $TOKEN"
```

---

## Response Field Reference

### User Object
```json
{
  "id": "mongodb_id",
  "name": "John Doe",
  "email": "john@test.com",
  "profilePicture": null,
  "createdAt": "2026-08-08T12:00:00.000Z"
}
```

### Recipe Object
```json
{
  "_id": "mongodb_id",
  "user": { "user_object" },
  "title": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "prepTime": "15 minutes",
  "cookTime": "25 minutes",
  "servings": 2,
  "calories": 320,
  "macros": {
    "protein": 35,
    "carbs": 5,
    "fat": 14
  },
  "cuisine": "Mediterranean",
  "dietaryCategory": ["High-Protein"],
  "cookingTips": ["tip 1", "tip 2"],
  "savedAt": "2026-08-08T14:30:00.000Z"
}
```

---

## Quick Tips

1. **Save Token:** After login, store the token for authenticated requests
2. **Token in Header:** `Authorization: Bearer <your_token>`
3. **No Save on Generate:** Use POST /recipes/generate to preview first
4. **Own Recipes Only:** Users can only access/modify their own recipes
5. **Search Case-Insensitive:** Search works with any case
6. **Multiple Diets:** `?dietary=Vegan,Gluten-Free` filters by both
7. **JSON Responses:** All responses are JSON with `success` field
8. **Errors:** Check `success: false` and `message` field for details

---

## Environment Variables Required

```bash
# /server/.env
MONGODB_URI=mongodb://localhost:27017/recipecraft
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Get `GEMINI_API_KEY` from: https://ai.google.dev/

---

## Status: ✅ Production Ready

All endpoints tested and documented.
See API_DOCUMENTATION.md and TESTING_GUIDE.md for full details.
