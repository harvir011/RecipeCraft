const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecipeFromAI = async ({ ingredients, cuisine, dietary, mealType }) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const dietaryStr = dietary && dietary.length > 0 ? dietary.join(', ') : 'no specific dietary restrictions';
    const cuisineStr = cuisine || 'any cuisine';
    const mealStr = mealType || 'any meal type';

    const prompt = `You are an expert chef AI. Generate a creative recipe based on the following requirements:

Ingredients to use: ${ingredients.join(', ')}
Cuisine type: ${cuisineStr}
Dietary preferences: ${dietaryStr}
Meal type: ${mealStr}

IMPORTANT: Return ONLY a valid JSON object with NO additional text, no markdown formatting, and no code blocks. The JSON must be parseable.

Return the response in this exact JSON format:
{
  "title": "Recipe name",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "instructions": ["step 1", "step 2", "step 3"],
  "prepTime": "15 minutes",
  "cookTime": "30 minutes",
  "servings": 4,
  "estimatedCalories": 350,
  "macros": {
    "protein": 25,
    "carbs": 45,
    "fat": 12
  },
  "cookingTips": ["tip 1", "tip 2"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let recipe;
    try {
      recipe = JSON.parse(responseText);
    } catch (parseError) {
      // Try to extract JSON from response if wrapped in markdown
      const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
                       responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        recipe = JSON.parse(jsonStr);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    return {
      success: true,
      recipe
    };
  } catch (error) {
    // Handle rate limit errors
    if (error.message && error.message.includes('429')) {
      return {
        success: false,
        error: 'API rate limit exceeded. Please try again in a moment.',
        statusCode: 429
      };
    }

    return {
      success: false,
      error: error.message || 'Failed to generate recipe from AI',
      statusCode: 500
    };
  }
};

module.exports = {
  generateRecipeFromAI
};
