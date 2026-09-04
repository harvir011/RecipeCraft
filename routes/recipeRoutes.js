const express = require('express');
const {
  generateRecipe,
  saveRecipe,
  getUserRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Generate recipe from AI (no save)
router.post('/generate', generateRecipe);

// Save a generated recipe
router.post('/save', saveRecipe);

// Get all user's recipes with optional search and filters
router.get('/', getUserRecipes);

// Get single recipe by ID
router.get('/:id', getRecipeById);

// Update recipe
router.put('/:id', updateRecipe);

// Delete recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
