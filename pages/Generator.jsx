import { useState } from 'react';
import { Button, Card, Select, Badge } from '../components';
import TagInput from '../components/TagInput';
import Toast from '../components/Toast';
import { Sparkles, Save, RotateCcw, Clock, Users, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const CUISINES = [
  { label: 'Mediterranean', value: 'Mediterranean' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Asian', value: 'Asian' },
  { label: 'Mexican', value: 'Mexican' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Thai', value: 'Thai' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'French', value: 'French' },
  { label: 'American', value: 'American' }
];

const MEAL_TYPES = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Snack', value: 'snack' }
];

const DIETARY = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Keto', 'High-Protein', 'Low-Carb', 'Paleo'];

export default function Generator() {
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState('Mediterranean');
  const [mealType, setMealType] = useState('dinner');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [toast, setToast] = useState(null);

  const toggleDietary = (diet) => {
    setSelectedDietary(prev =>
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setToast({ type: 'error', message: 'Please add at least one ingredient!' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      setRecipe({
        title: `${cuisine} ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
        prepTime: '15 minutes',
        cookTime: '30 minutes',
        servings: 4,
        calories: 420,
        macros: { protein: 32, carbs: 45, fat: 14 },
        ingredients: ingredients.map(ing => ({ name: ing, checked: false })),
        instructions: [
          'Preheat oven to 375°F',
          'Prepare all ingredients by washing and cutting',
          'Mix ingredients in a large bowl',
          'Transfer to baking dish',
          'Bake for 30 minutes until golden brown',
          'Let cool for 5 minutes before serving'
        ],
        cookingTips: [
          'Use fresh ingredients for best flavor',
          'Don\'t skip the marinating step',
          'Serve immediately while hot'
        ]
      });
      setToast({ type: 'success', message: 'Recipe generated! ✨' });
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to generate recipe. Try again!' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setToast({ type: 'success', message: 'Recipe saved to your dashboard! 🎉' });
    setTimeout(() => {
      setRecipe(null);
      setIngredients([]);
    }, 2000);
  };

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal mb-3">
            AI Recipe Generator
          </h1>
          <p className="text-charcoal-light font-medium max-w-xl">
            Input the ingredients you have on hand, choose your cuisine, and let AI craft a gourmet culinary recipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-100/50 shadow-md">
              <div className="space-y-8">
                {/* Ingredients Tag Input */}
                <TagInput
                  label="Your Ingredients"
                  tags={ingredients}
                  onChange={setIngredients}
                  placeholder="E.g., chicken, garlic, olive oil..."
                />

                {/* Cuisine Selection */}
                <Select
                  label="Cuisine Type"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  options={CUISINES}
                  disabled={loading}
                />

                {/* Meal Type */}
                <Select
                  label="Meal Type"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  options={MEAL_TYPES}
                  disabled={loading}
                />

                {/* Dietary Preferences */}
                <div>
                  <label className="block font-bold text-charcoal text-sm uppercase tracking-wider mb-4">
                    Dietary Preferences (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {DIETARY.map((diet) => (
                      <Badge
                        key={diet}
                        variant="dietary"
                        selected={selectedDietary.includes(diet)}
                        onClick={() => toggleDietary(diet)}
                        className="!py-2 !px-4 hover:scale-105 transition-all text-xs font-semibold cursor-pointer"
                      >
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                  loading={loading}
                  disabled={loading || ingredients.length === 0}
                  onClick={handleGenerate}
                >
                  {!loading && <Sparkles size={20} />}
                  {loading ? 'Creating Magic...' : 'Generate Recipe'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Recipe Quick Preview Card */}
          <div>
            <Card className="sticky top-24 border border-gray-100/50 shadow-md">
              {recipe ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-fresh-green-dark mb-1.5 block">
                      Generated culinary preview
                    </span>
                    <h2 className="font-extrabold font-header text-2xl text-charcoal mb-4">
                      {recipe.title}
                    </h2>

                    {/* Quick Stats list */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-cream-dark p-3.5 rounded-xl border border-gray-100">
                        <Clock size={18} className="text-fresh-green flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-charcoal-light uppercase">Prep Time</p>
                          <p className="font-extrabold text-charcoal text-sm leading-tight mt-0.5">{recipe.prepTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-cream-dark p-3.5 rounded-xl border border-gray-100">
                        <Flame size={18} className="text-fresh-green flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-charcoal-light uppercase">Cook Time</p>
                          <p className="font-extrabold text-charcoal text-sm leading-tight mt-0.5">{recipe.cookTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-cream-dark p-3.5 rounded-xl border border-gray-100">
                        <Users size={18} className="text-fresh-green flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-charcoal-light uppercase">Servings</p>
                          <p className="font-extrabold text-charcoal text-sm leading-tight mt-0.5">{recipe.servings} people</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-cream-dark p-3.5 rounded-xl border border-gray-100">
                        <span className="text-xl">🥗</span>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-charcoal-light uppercase">Calories</p>
                          <p className="font-extrabold text-fresh-green-dark text-sm leading-tight mt-0.5">{recipe.calories} kcal</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-gray-150">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
                      onClick={handleSaveRecipe}
                    >
                      <Save size={18} />
                      Save Recipe
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setRecipe(null)}
                    >
                      <RotateCcw size={18} />
                      Discard Recipe
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4 select-none">🍲</p>
                  <p className="font-bold text-charcoal text-lg mb-1">Recipe Preview</p>
                  <p className="text-charcoal-light text-sm font-medium">
                    Your generated recipe metrics will appear here
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

      {/* Full Recipe Details View */}
      {recipe && (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients card */}
          <Card className="border border-gray-100/50 shadow-md">
            <h3 className="text-2xl font-extrabold font-header text-charcoal mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span>📝</span> Ingredients
            </h3>
            <div className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <label key={index} className="flex items-center gap-3 p-3 hover:bg-cream rounded-xl cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-100">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border-2 border-gray-200 cursor-pointer accent-fresh-green focus:ring-fresh-green transition-all"
                  />
                  <span className="font-body text-charcoal font-medium text-sm group-hover:text-charcoal-light transition-colors">{ingredient.name}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Instructions card */}
          <Card className="border border-gray-100/50 shadow-md">
            <h3 className="text-2xl font-extrabold font-header text-charcoal mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span>👨‍🍳</span> Cooking Instructions
            </h3>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="bg-fresh-green text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-extrabold text-xs shadow-md shadow-green-500/10">
                    {index + 1}
                  </div>
                  <p className="font-body text-charcoal text-sm leading-relaxed font-medium pt-1.5">{instruction}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Nutritional Info card */}
          <Card className="border border-gray-100/50 shadow-md">
            <h3 className="text-2xl font-extrabold font-header text-charcoal mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span>📊</span> Nutrition per Serving
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-4 bg-red-50/40 rounded-2xl border border-red-100/50">
                <span className="font-bold text-sm text-charcoal">Protein</span>
                <span className="font-extrabold text-lg text-red-600">{recipe.macros.protein}g</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-amber-50/40 rounded-2xl border border-amber-100/50">
                <span className="font-bold text-sm text-charcoal">Carbs</span>
                <span className="font-extrabold text-lg text-amber-600">{recipe.macros.carbs}g</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50/40 rounded-2xl border border-orange-100/50">
                <span className="font-bold text-sm text-charcoal">Fat</span>
                <span className="font-extrabold text-lg text-orange-600">{recipe.macros.fat}g</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-fresh-green-light/40 rounded-2xl border border-fresh-green/10">
                <span className="font-bold text-sm text-charcoal">Calories</span>
                <span className="font-extrabold text-lg text-fresh-green-dark">{recipe.calories} kcal</span>
              </div>
            </div>
          </Card>

          {/* Chef's Tips card */}
          <Card className="border border-gray-100/50 shadow-md">
            <h3 className="text-2xl font-extrabold font-header text-charcoal mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span>💡</span> Chef's Cooking Tips
            </h3>
            <div className="space-y-3">
              {recipe.cookingTips.map((tip, index) => (
                <div key={index} className="p-4 bg-fresh-green-light/30 rounded-2xl border border-fresh-green/10 font-body text-charcoal text-sm leading-relaxed font-semibold flex items-start gap-2.5">
                  <span className="text-fresh-green-dark">✦</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
