import { useState } from 'react';
import { Button, Card, Input, Badge } from '../components/ui';
import { Search, Trash2, Edit2, Clock, Users } from 'lucide-react';

// Placeholder recipes for demo
const DEMO_RECIPES = [
  {
    id: 1,
    title: 'Mediterranean Grilled Chicken',
    cuisine: 'Mediterranean',
    dietary: ['High-Protein'],
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 2,
    calories: 320
  },
  {
    id: 2,
    title: 'Vegan Buddha Bowl',
    cuisine: 'Asian',
    dietary: ['Vegan', 'Gluten-Free'],
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 1,
    calories: 280
  },
  {
    id: 3,
    title: 'Keto Bacon & Eggs',
    cuisine: 'American',
    dietary: ['Keto', 'High-Protein'],
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 1,
    calories: 450
  }
];

const CUISINES = ['Mediterranean', 'Italian', 'Asian', 'Mexican', 'Indian', 'American'];
const DIETARY_OPTIONS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Keto', 'High-Protein'];

export default function MyRecipes() {
  const [recipes] = useState(DEMO_RECIPES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
    const matchesDietary = selectedDietary.length === 0 ||
      selectedDietary.some(diet => recipe.dietary.includes(diet));

    return matchesSearch && matchesCuisine && matchesDietary;
  });

  const toggleDietary = (diet) => {
    setSelectedDietary(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  return (
    <div className="py-8">
      <h1 className="text-5xl font-bold font-header text-deep-mint mb-8">
        My Recipes
      </h1>

      {/* Filters */}
      <Card className="mb-8">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Cuisine Filter */}
          <div>
            <p className="font-bold text-dark-bg mb-2 font-header">Cuisine</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="cuisine"
                selected={!selectedCuisine}
                onClick={() => setSelectedCuisine('')}
              >
                All
              </Badge>
              {CUISINES.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant="cuisine"
                  selected={selectedCuisine === cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dietary Filter */}
          <div>
            <p className="font-bold text-dark-bg mb-2 font-header">Dietary</p>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map((diet) => (
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
        </div>
      </Card>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} accent>
              <div className="flex flex-col h-full">
                {/* Header */}
                <h2 className="text-xl font-bold font-header text-electric-orange mb-2">
                  {recipe.title}
                </h2>

                {/* Info */}
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex flex-wrap gap-1">
                    {recipe.dietary.map((diet) => (
                      <Badge key={diet} variant="dietary">
                        {diet}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="font-body">{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="font-body">{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="font-body">Serves {recipe.servings}</span>
                    </div>
                    <div className="font-body">
                      {recipe.calories} cal
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 font-body">
                    {recipe.cuisine} Cuisine
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-500 font-body mb-4">
            No recipes found matching your filters.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('');
              setSelectedDietary([]);
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {recipes.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 font-body mb-4">
            You haven't saved any recipes yet.
          </p>
          <Button variant="primary" size="md">
            Generate Your First Recipe
          </Button>
        </Card>
      )}
    </div>
  );
}
