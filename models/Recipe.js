const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipe must belong to a user']
  },
  title: {
    type: String,
    required: [true, 'Please provide a recipe title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please provide ingredients'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'Recipe must have at least one ingredient'
    }
  },
  instructions: {
    type: [String],
    required: [true, 'Please provide cooking instructions'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'Recipe must have at least one instruction'
    }
  },
  prepTime: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Please provide prep time']
  },
  cookTime: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Please provide cook time']
  },
  servings: {
    type: Number,
    required: [true, 'Please provide number of servings'],
    min: [1, 'Servings must be at least 1']
  },
  calories: {
    type: Number,
    default: null
  },
  macros: {
    protein: {
      type: Number,
      default: null
    },
    carbs: {
      type: Number,
      default: null
    },
    fat: {
      type: Number,
      default: null
    }
  },
  cuisine: {
    type: String,
    enum: [
      'Italian',
      'Asian',
      'Mexican',
      'Indian',
      'Mediterranean',
      'American',
      'French',
      'Middle Eastern',
      'Thai',
      'Japanese',
      'Other'
    ],
    default: 'Other'
  },
  dietaryCategory: {
    type: [String],
    enum: [
      'Vegan',
      'Vegetarian',
      'Gluten-Free',
      'Dairy-Free',
      'Keto',
      'High-Protein',
      'Low-Carb',
      'Paleo',
      'Kosher',
      'Halal'
    ],
    default: []
  },
  cookingTips: {
    type: [String],
    default: []
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
