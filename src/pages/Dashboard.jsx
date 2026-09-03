import { useState } from 'react';
import { Button, Card, Badge, RecipeCard } from '../components';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { Search, Sparkles, Filter } from 'lucide-react';

// Demo recipes
const DEMO_RECIPES = [
  {
    id: 1,
    title: 'Mediterranean Grilled Chicken',
    cuisine: 'Mediterranean',
    dietary: ['High-Protein'],
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 2,
    calories: 320,
    image: '🍗'
  },
  {
    id: 2,
    title: 'Vegan Buddha Bowl',
    cuisine: 'Asian',
    dietary: ['Vegan', 'Gluten-Free'],
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 1,
    calories: 280,
    image: '🥗'
  },
  {
    id: 3,
    title: 'Keto Bacon & Eggs',
    cuisine: 'American',
    dietary: ['Keto', 'High-Protein'],
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 1,
    calories: 450,
    image: '🥚'
  },
  {
    id: 4,
    title: 'Thai Green Curry',
    cuisine: 'Thai',
    dietary: ['Vegetarian'],
    prepTime: '20 min',
    cookTime: '20 min',
    servings: 4,
    calories: 380,
    image: '🍛'
  },
  {
    id: 5,
    title: 'Italian Pasta Carbonara',
    cuisine: 'Italian',
    dietary: [],
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 2,
    calories: 520,
    image: '🍝'
  },
  {
    id: 6,
    title: 'Quinoa Salad',
    cuisine: 'Mediterranean',
    dietary: ['Vegan', 'High-Protein'],
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 3,
    calories: 320,
    image: '🥙'
  }
];

const CATEGORIES = [
  { label: 'All Recipes', value: 'all' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'High-Protein', value: 'High-Protein' },
  { label: 'Keto', value: 'Keto' },
  { label: 'Gluten-Free', value: 'Gluten-Free' }
];

export default function Dashboard() {
  const [recipes, setRecipes] = useState(DEMO_RECIPES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      recipe.dietary.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setDeleteConfirm(null);
    setSelectedRecipe(null);
    setToast({ type: 'success', message: 'Recipe deleted!' });
  };

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-terra" size={28} />
            <h1 className="text-4xl md:text-5xl font-extrabold font-header gradient-text">
              Premium Recipe Collection
            </h1>
          </div>
          <p className="text-charcoal font-medium max-w-2xl text-lg">
            Curate your personal collection of culinary masterpieces. Explore, filter, and cook custom dishes with premium styling.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-10 !p-8 border border-border premium-shadow">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-4 text-terra" size={20} />
              <input
                type="text"
                placeholder="Search recipes by cuisine, ingredients, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-border font-body text-charcoal placeholder-charcoal-light focus:outline-none focus:border-terra focus:ring-2 focus:ring-terra/20 transition-all duration-300"
              />
            </div>

            {/* Category Tabs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter size={16} className="text-terra" />
                <p className="font-bold text-sm text-charcoal uppercase tracking-widest">Filter by Category</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-2 ${
                      selectedCategory === cat.value
                        ? 'bg-terra text-white border-terra shadow-terra-glow'
                        : 'bg-white text-terra border-border hover:border-terra hover:shadow-terra-glow'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, idx) => (
              <div key={recipe.id} style={{ animation: `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s forwards`, opacity: 0 }} className="animate-slideUp">
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-24 border border-border premium-shadow">
            <p className="text-6xl mb-6 select-none animate-float">🍳</p>
            <p className="text-charcoal font-bold text-2xl mb-3">
              {searchQuery ? 'No recipes found' : 'Your Recipe Collection'}
            </p>
            <p className="text-charcoal font-medium mb-10 max-w-md mx-auto text-lg">
              {searchQuery ? 'Try a different search or filter to discover recipes' : 'Start by generating your first premium AI-powered recipe'}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/generate'}
              className="inline-flex items-center gap-2 text-lg premium-shadow"
            >
              <Sparkles size={18} />
              Generate Recipe
            </Button>
          </Card>
        )}

      {/* Recipe Detail Modal */}
      <Modal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        title={selectedRecipe?.title}
        size="lg"
      >
        {selectedRecipe && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cream to-muted rounded-full flex items-center justify-center text-6xl mx-auto mb-6 shadow-2xl border-4 border-white">
                {selectedRecipe.image}
              </div>
              <h2 className="text-3xl font-extrabold font-header gradient-text mb-3">
                {selectedRecipe.title}
              </h2>
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-white px-4 py-2 bg-gradient-to-r from-terra to-accent rounded-full mb-8">
                {selectedRecipe.cuisine} Cuisine
              </span>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-gradient-to-br from-cream to-cream-dark p-4 rounded-2xl border border-border text-center hover:shadow-terra-glow transition-all">
                  <p className="text-[10px] uppercase font-bold text-terra mb-2 tracking-wider">Prep Time</p>
                  <p className="font-extrabold text-charcoal text-lg">{selectedRecipe.prepTime}</p>
                </div>
                <div className="bg-gradient-to-br from-cream to-cream-dark p-4 rounded-2xl border border-border text-center hover:shadow-terra-glow transition-all">
                  <p className="text-[10px] uppercase font-bold text-terra mb-2 tracking-wider">Cook Time</p>
                  <p className="font-extrabold text-charcoal text-lg">{selectedRecipe.cookTime}</p>
                </div>
                <div className="bg-gradient-to-br from-cream to-cream-dark p-4 rounded-2xl border border-border text-center hover:shadow-accent-glow transition-all">
                  <p className="text-[10px] uppercase font-bold text-accent mb-2 tracking-wider">Servings</p>
                  <p className="font-extrabold text-charcoal text-lg">{selectedRecipe.servings}p</p>
                </div>
                <div className="bg-gradient-to-br from-cream to-cream-dark p-4 rounded-2xl border border-border text-center hover:shadow-accent-glow transition-all">
                  <p className="text-[10px] uppercase font-bold text-accent mb-2 tracking-wider">Calories</p>
                  <p className="font-extrabold text-charcoal text-lg">{selectedRecipe.calories} kcal</p>
                </div>
              </div>

              {/* Dietary Badges */}
              {selectedRecipe.dietary.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedRecipe.dietary.map((diet) => (
                    <span
                      key={diet}
                      className="bg-gradient-to-r from-terra/10 to-accent/10 text-terra border border-terra/20 text-xs font-semibold px-4 py-2 rounded-full hover:shadow-terra-glow transition-all"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="md"
                className="flex-1 !rounded-xl"
                onClick={() => setSelectedRecipe(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1 !rounded-xl flex items-center justify-center gap-2"
                onClick={() => setSelectedRecipe(null)}
              >
                <Sparkles size={16} />
                Cook Now
              </Button>
              <button
                onClick={() => setDeleteConfirm(selectedRecipe.id)}
                className="px-4 py-2.5 rounded-xl font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:shadow-lg transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Recipe?"
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-charcoal-light text-sm font-medium leading-relaxed">
            Are you sure you want to delete this recipe? This action cannot be undone and it will be permanently removed from your dashboard.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1 !rounded-xl"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 !rounded-xl !bg-red-500 hover:!bg-red-600 shadow-lg shadow-red-500/10 border-none"
              onClick={() => handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      </div>
    </div>
  );
}
