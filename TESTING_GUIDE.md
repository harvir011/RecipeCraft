# RecipeCraft Testing Guide

This guide provides comprehensive testing procedures for all backend endpoints, including happy paths, edge cases, and error scenarios.

## Prerequisites

1. **Start MongoDB:**
   ```bash
   mongod
   ```

2. **Start the server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Install a testing tool** (choose one):
   - cURL (command line)
   - Postman (GUI - recommended)
   - REST Client VS Code extension
   - Thunder Client

---

## Test Suite 1: Authentication

### Test 1.1: Register New User (Happy Path)
**Endpoint:** `POST /api/auth/register`

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@test.com",
    "password": "securepass123"
  }'
```

**Expected Response:** 201 Created
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Alice Johnson",
    "email": "alice@test.com"
  }
}
```

**✅ Save the token for future requests**

---

### Test 1.2: Register with Duplicate Email
**Endpoint:** `POST /api/auth/register`

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson 2",
    "email": "alice@test.com",
    "password": "differentpass456"
  }'
```

**Expected Response:** 400 Bad Request
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Test 1.3: Register with Missing Fields
**Endpoint:** `POST /api/auth/register`

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Smith"
  }'
```

**Expected Response:** 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide name, email, and password"
}
```

---

### Test 1.4: Login with Valid Credentials
**Endpoint:** `POST /api/auth/login`

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@test.com",
    "password": "securepass123"
  }'
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Alice Johnson",
    "email": "alice@test.com"
  }
}
```

---

### Test 1.5: Login with Wrong Password
**Endpoint:** `POST /api/auth/login`

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@test.com",
    "password": "wrongpassword"
  }'
```

**Expected Response:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Test 1.6: Get Current User Profile (Protected)
**Endpoint:** `GET /api/auth/me`

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Alice Johnson",
    "email": "alice@test.com",
    "createdAt": "2026-08-08T12:00:00.000Z"
  }
}
```

---

### Test 1.7: Access Protected Route Without Token
**Endpoint:** `GET /api/auth/me`

```bash
curl -X GET http://localhost:5000/api/auth/me
```

**Expected Response:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

### Test 1.8: Access Protected Route with Invalid Token
**Endpoint:** `GET /api/auth/me`

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

## Test Suite 2: Recipe Generation (Gemini AI)

### Prerequisites
- Valid `GEMINI_API_KEY` in `/server/.env`
- Valid JWT token from authentication tests

### Test 2.1: Generate Recipe (Happy Path)
**Endpoint:** `POST /api/recipes/generate`

```bash
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["chicken breast", "garlic", "olive oil", "lemon", "thyme"],
    "cuisine": "Mediterranean",
    "dietary": ["High-Protein", "Gluten-Free"],
    "mealType": "dinner"
  }'
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "recipe": {
    "title": "...",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": "...",
    "cookTime": "...",
    "servings": 2,
    "estimatedCalories": 300,
    "macros": {
      "protein": 35,
      "carbs": 10,
      "fat": 15
    },
    "cookingTips": [...]
  }
}
```

**⚠️ Note:** Actual values depend on Gemini AI response

---

### Test 2.2: Generate Recipe with Single Ingredient
**Endpoint:** `POST /api/recipes/generate`

```bash
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["rice"],
    "mealType": "lunch"
  }'
```

**Expected Response:** 200 OK
- Should generate a recipe with rice as the base

---

### Test 2.3: Generate Recipe Without Ingredients
**Endpoint:** `POST /api/recipes/generate`

```bash
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "cuisine": "Italian",
    "dietary": ["Vegan"]
  }'
```

**Expected Response:** 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide at least one ingredient"
}
```

---

### Test 2.4: Rate Limit Handling
**Endpoint:** `POST /api/recipes/generate`

Send 61+ requests in 1 minute to exceed Gemini's free tier rate limit (60 req/min).

**Expected Response:** 429 Too Many Requests
```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again in a moment."
}
```

---

## Test Suite 3: Recipe CRUD Operations

### Test 3.1: Save Generated Recipe
**Endpoint:** `POST /api/recipes/save`

```bash
curl -X POST http://localhost:5000/api/recipes/save \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Grilled Lemon Garlic Chicken",
    "ingredients": [
      "2 chicken breasts",
      "4 cloves garlic, minced",
      "3 tbsp olive oil",
      "2 lemons",
      "2 tsp thyme"
    ],
    "instructions": [
      "Preheat grill to medium-high",
      "Mix olive oil with garlic and lemon juice",
      "Rub marinade on chicken",
      "Grill for 12-15 minutes per side",
      "Rest for 5 minutes before serving"
    ],
    "prepTime": "15 minutes",
    "cookTime": "30 minutes",
    "servings": 2,
    "calories": 320,
    "macros": {
      "protein": 35,
      "carbs": 5,
      "fat": 16
    },
    "cuisine": "Mediterranean",
    "dietaryCategory": ["High-Protein", "Gluten-Free"],
    "cookingTips": [
      "Don't move the chicken while grilling",
      "Use a meat thermometer (165°F internal temp)"
    ]
  }'
```

**Expected Response:** 201 Created
```json
{
  "success": true,
  "message": "Recipe saved successfully",
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "...",
      "name": "Alice Johnson",
      "email": "alice@test.com"
    },
    "title": "Grilled Lemon Garlic Chicken",
    "ingredients": [...],
    "instructions": [...],
    "savedAt": "2026-08-08T14:30:00.000Z"
  }
}
```

**✅ Save the recipe ID for future tests**

---

### Test 3.2: Save Recipe with Missing Fields
**Endpoint:** `POST /api/recipes/save`

```bash
curl -X POST http://localhost:5000/api/recipes/save \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Incomplete Recipe"
  }'
```

**Expected Response:** 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide title, ingredients, and instructions"
}
```

---

### Test 3.3: Get All User's Recipes
**Endpoint:** `GET /api/recipes`

```bash
curl -X GET http://localhost:5000/api/recipes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "count": 1,
  "recipes": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {...},
      "title": "Grilled Lemon Garlic Chicken",
      "ingredients": [...],
      "instructions": [...],
      "savedAt": "2026-08-08T14:30:00.000Z"
    }
  ]
}
```

---

### Test 3.4: Search Recipes by Title
**Endpoint:** `GET /api/recipes?search=lemon`

```bash
curl -X GET "http://localhost:5000/api/recipes?search=lemon" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
- Returns recipes with "lemon" in title or ingredients

---

### Test 3.5: Filter Recipes by Cuisine
**Endpoint:** `GET /api/recipes?cuisine=Mediterranean`

```bash
curl -X GET "http://localhost:5000/api/recipes?cuisine=Mediterranean" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
- Returns only Mediterranean recipes

---

### Test 3.6: Filter Recipes by Dietary Category
**Endpoint:** `GET /api/recipes?dietary=Vegan`

```bash
curl -X GET "http://localhost:5000/api/recipes?dietary=Vegan" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
- Returns only vegan recipes

---

### Test 3.7: Combined Search and Filters
**Endpoint:** `GET /api/recipes?search=garlic&cuisine=Mediterranean&dietary=High-Protein`

```bash
curl -X GET "http://localhost:5000/api/recipes?search=garlic&cuisine=Mediterranean&dietary=High-Protein" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
- Returns recipes matching all criteria

---

### Test 3.8: Get Recipe by ID
**Endpoint:** `GET /api/recipes/:id`

```bash
curl -X GET http://localhost:5000/api/recipes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {...},
    "title": "Grilled Lemon Garlic Chicken",
    "ingredients": [...],
    "instructions": [...],
    "savedAt": "2026-08-08T14:30:00.000Z"
  }
}
```

---

### Test 3.9: Get Non-existent Recipe
**Endpoint:** `GET /api/recipes/invalid_id`

```bash
curl -X GET http://localhost:5000/api/recipes/invalid_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 404 Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

---

### Test 3.10: Update Recipe
**Endpoint:** `PUT /api/recipes/:id`

```bash
curl -X PUT http://localhost:5000/api/recipes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated: Grilled Lemon Garlic Chicken",
    "cookTime": "35 minutes",
    "servings": 3,
    "cookingTips": [
      "Let meat rest 10 minutes",
      "Serve with fresh vegetables"
    ]
  }'
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "recipe": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated: Grilled Lemon Garlic Chicken",
    "cookTime": "35 minutes",
    "servings": 3,
    "cookingTips": [...],
    "savedAt": "2026-08-08T14:30:00.000Z"
  }
}
```

---

### Test 3.11: Update Non-existent Recipe
**Endpoint:** `PUT /api/recipes/invalid_id`

```bash
curl -X PUT http://localhost:5000/api/recipes/invalid_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

**Expected Response:** 404 Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

---

### Test 3.12: Delete Recipe
**Endpoint:** `DELETE /api/recipes/:id`

```bash
curl -X DELETE http://localhost:5000/api/recipes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

---

### Test 3.13: Verify Recipe is Deleted
**Endpoint:** `GET /api/recipes/:id`

```bash
curl -X GET http://localhost:5000/api/recipes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:** 404 Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

---

## Test Suite 4: Authorization & Security

### Test 4.1: Access Other User's Recipe
1. Create two users and recipes with each
2. Try to access User A's recipe with User B's token

**Expected Response:** 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to access this recipe"
}
```

---

### Test 4.2: Update Other User's Recipe
1. Create two users and recipes with each
2. Try to update User A's recipe with User B's token

**Expected Response:** 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to update this recipe"
}
```

---

### Test 4.3: Delete Other User's Recipe
1. Create two users and recipes with each
2. Try to delete User A's recipe with User B's token

**Expected Response:** 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to delete this recipe"
}
```

---

## Automated Test Script (Bash)

Save this as `test_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🧪 RecipeCraft API Testing"
echo "=========================="

# Test 1: Health Check
echo -e "\n${GREEN}Test 1: Health Check${NC}"
curl -s $BASE_URL/health | jq .

# Test 2: Register
echo -e "\n${GREEN}Test 2: Register${NC}"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test'$RANDOM'@test.com",
    "password": "testpass123"
  }')
echo $REGISTER_RESPONSE | jq .
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

# Test 3: Get User Profile
echo -e "\n${GREEN}Test 3: Get User Profile${NC}"
curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/auth/me | jq .

# Test 4: Generate Recipe
echo -e "\n${GREEN}Test 4: Generate Recipe${NC}"
GENERATE_RESPONSE=$(curl -s -X POST $BASE_URL/recipes/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["chicken", "garlic"],
    "cuisine": "Mediterranean"
  }')
echo $GENERATE_RESPONSE | jq .

# Test 5: Save Recipe
echo -e "\n${GREEN}Test 5: Save Recipe${NC}"
SAVE_RESPONSE=$(curl -s -X POST $BASE_URL/recipes/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Recipe",
    "ingredients": ["chicken"],
    "instructions": ["cook"],
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2
  }')
echo $SAVE_RESPONSE | jq .
RECIPE_ID=$(echo $SAVE_RESPONSE | jq -r '.recipe._id')
echo "Recipe ID: $RECIPE_ID"

# Test 6: Get Recipes
echo -e "\n${GREEN}Test 6: Get Recipes${NC}"
curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/recipes | jq .

# Test 7: Get Recipe by ID
echo -e "\n${GREEN}Test 7: Get Recipe by ID${NC}"
curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/recipes/$RECIPE_ID | jq .

# Test 8: Update Recipe
echo -e "\n${GREEN}Test 8: Update Recipe${NC}"
curl -s -X PUT $BASE_URL/recipes/$RECIPE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Recipe"}' | jq .

# Test 9: Delete Recipe
echo -e "\n${GREEN}Test 9: Delete Recipe${NC}"
curl -s -X DELETE $BASE_URL/recipes/$RECIPE_ID \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n${GREEN}✅ All tests completed!${NC}"
```

Run with:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## Summary Checklist

- [ ] Authentication endpoints work correctly
- [ ] JWT tokens are validated properly
- [ ] Recipe generation from AI works
- [ ] Recipes can be saved to database
- [ ] CRUD operations work for recipes
- [ ] Search and filtering work
- [ ] Authorization (users can only access own recipes)
- [ ] Error handling for missing/invalid data
- [ ] Rate limiting is handled gracefully
- [ ] All edge cases are handled
