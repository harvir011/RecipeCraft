const Recipe = require('../models/Recipe');
const { generateRecipeFromAI } = require('../services/aiService');

exports.generateRecipe = async (req, res) => {
  try {
    const { ingredients, cuisine, dietary, mealType } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one ingredient'
      });
    }

    const result = await generateRecipeFromAI({
      ingredients,
      cuisine,
      dietary,
      mealType
    });

    if (!result.success) {
      return res.status(result.statusCode || 500).json({
        success: false,
        message: result.error
      });
    }

    res.status(200).json({
      success: true,
      recipe: result.recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate recipe'
    });
  }
};

exports.saveRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, prepTime, cookTime, servings, calories, macros, cuisine, dietaryCategory, cookingTips } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, ingredients, and instructions'
      });
    }

    const recipe = await Recipe.create({
      user: req.user._id,
      title,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      calories,
      macros,
      cuisine,
      dietaryCategory,
      cookingTips,
      savedAt: new Date()
    });

    await recipe.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Recipe saved successfully',
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save recipe'
    });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const { search, cuisine, dietary } = req.query;
    let query = { user: req.user._id };

    // Search by title or ingredient
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = cuisine;
    }

    // Filter by dietary category
    if (dietary) {
      query.dietaryCategory = { $in: Array.isArray(dietary) ? dietary : [dietary] };
    }

    const recipes = await Recipe.find(query)
      .populate('user', 'name email')
      .sort({ savedAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch recipes'
    });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'name email');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user owns the recipe
    if (recipe.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this recipe'
      });
    }

    res.status(200).json({
      success: true,
      recipe
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch recipe'
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    // Update fields
    const { title, ingredients, instructions, prepTime, cookTime, servings, calories, macros, cuisine, dietaryCategory, cookingTips } = req.body;

    if (title) recipe.title = title;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (prepTime) recipe.prepTime = prepTime;
    if (cookTime) recipe.cookTime = cookTime;
    if (servings) recipe.servings = servings;
    if (calories !== undefined) recipe.calories = calories;
    if (macros) recipe.macros = macros;
    if (cuisine) recipe.cuisine = cuisine;
    if (dietaryCategory) recipe.dietaryCategory = dietaryCategory;
    if (cookingTips) recipe.cookingTips = cookingTips;

    recipe = await recipe.save();
    await recipe.populate('user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      recipe
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update recipe'
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete recipe'
    });
  }
};
