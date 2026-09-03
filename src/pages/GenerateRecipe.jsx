import { useState } from 'react';
import { Button, Card, Input, Select, Badge } from '../components/ui';
import { Loader } from 'lucide-react';

const CUISINES = [
  { label: 'Mediterranean', value: 'Mediterranean' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Asian', value: 'Asian' },
  { label: 'Mexican', value: 'Mexican' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Thai', value: 'Thai' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'French', value: 'French' },
  { label: 'Middle Eastern', value: 'Middle Eastern' }
];

const DIETARY = [
  'Vegan',
  'Vegetarian',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'High-Protein',
  'Low-Carb',
  'Paleo'
];

export default function GenerateRecipe() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('Mediterranean');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [mealType, setMealType] = useState('dinner');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const toggleDietary = (diet) => {
    setSelectedDietary(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      alert('Please enter at least one ingredient');
      return;
    }

    setLoading(true);
    // TODO: Call API to generate recipe
    setTimeout(() => {
      setLoading(false);
      setRecipe({
        title: 'AI Generated Recipe',
        description: 'Recipe generation coming soon!'
      });
    }, 2000);
  };

  return (
    <div className="py-8">
      <h1 className="text-5xl font-bold font-header text-electric-orange mb-2">
        Generate Recipe
      </h1>
      <p className="text-gray-600 font-body mb-8">
        Tell the AI what ingredients you have, and it will create a delicious recipe for you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              {/* Ingredients Input */}
              <div>
                <label className="block font-bold text-dark-bg mb-2 font-header">
                  Ingredients
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter ingredients separated by commas (e.g., chicken, garlic, olive oil, lemon)"
                  className="w-full px-3 py-2.5 border-3 border-dark-bg rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  rows={4}
                  disabled={loading}
                />
              </div>

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
                options={[
                  { label: 'Breakfast', value: 'breakfast' },
                  { label: 'Lunch', value: 'lunch' },
                  { label: 'Dinner', value: 'dinner' },
                  { label: 'Dessert', value: 'dessert' },
                  { label: 'Snack', value: 'snack' }
                ]}
                disabled={loading}
              />

              {/* Dietary Preferences */}
              <div>
                <label className="block font-bold text-dark-bg mb-3 font-header">
                  Dietary Preferences (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY.map((diet) => (
                    <Badge
                      key={diet}
                      variant="dietary"
                      selected={selectedDietary.includes(diet)}
                      onClick={() => toggleDietary(diet)}
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
                className="w-full"
                loading={loading}
                disabled={loading}
                onClick={handleGenerate}
              >
                {loading ? 'Generating...' : '✨ Generate Recipe'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Recipe Preview */}
        <div>
          <Card className="sticky top-8">
            {recipe ? (
              <div>
                <h2 className="font-bold font-header text-xl mb-4 text-electric-orange">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 font-body mb-4">
                  {recipe.description}
                </p>
                <div className="space-y-2">
                  <Button variant="secondary" size="md" className="w-full">
                    Save Recipe
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    Regenerate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="font-body">👇</p>
                <p className="font-body">Generate a recipe to see the preview</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
