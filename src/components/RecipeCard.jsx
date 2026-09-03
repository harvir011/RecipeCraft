import { Clock, Utensils, ChefHat, Flame } from 'lucide-react';

export default function RecipeCard({ recipe, onClick }) {
  const displayImage = recipe.image || '🥗';
  const isImageUrl = typeof displayImage === 'string' && (displayImage.startsWith('http') || displayImage.startsWith('/'));

  return (
    <div className="recipe-card h-full flex flex-col">
      {/* Image Section with Overlay */}
      <div className="recipe-card-image group/image">
        {isImageUrl ? (
          <img
            src={displayImage}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-cream-dark to-muted select-none">
            {displayImage}
          </div>
        )}

        {/* Overlay with Cook Button */}
        <recipe-overlay className="recipe-overlay">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="cook-btn animate-slideUp flex items-center gap-2"
          >
            <ChefHat size={16} />
            <span>Cook Now</span>
          </button>
        </recipe-overlay>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Top Info */}
        <div>
          {recipe.cuisine && (
            <div className="flex items-center gap-1 mb-2">
              <Flame size={12} className="text-terra" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-terra">
                {recipe.cuisine}
              </span>
            </div>
          )}

          <h3 className="font-header font-bold text-lg text-charcoal mb-1 leading-snug line-clamp-2 hover:text-terra transition-colors">
            {recipe.title}
          </h3>
        </div>

        {/* Metrics Row */}
        <div className="flex flex-wrap gap-2 items-center text-xs text-charcoal-light mt-3">
          <div className="flex items-center gap-1 bg-cream px-2.5 py-1.5 rounded-lg border border-border transition-colors hover:bg-cream-dark">
            <Clock size={12} className="text-terra" />
            <span className="font-medium text-charcoal">{recipe.prepTime || recipe.cookTime || '20 min'}</span>
          </div>

          <div className="flex items-center gap-1 bg-cream px-2.5 py-1.5 rounded-lg border border-border transition-colors hover:bg-cream-dark">
            <Utensils size={12} className="text-terra" />
            <span className="font-medium text-charcoal">{recipe.servings}s</span>
          </div>

          <div className="ml-auto">
            <span className="font-bold text-terra text-sm">{recipe.calories}</span>
            <span className="text-[9px] text-charcoal-light ml-1">kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
