import { Star, Clock, Flame } from 'lucide-react';

export default function MealShowcase() {
  const meals = [
    {
      name: 'Mediterranean Grilled Chicken',
      emoji: '🍗',
      rating: 4.8,
      time: '25 min',
      calories: '320 kcal',
      badge: 'Premium',
      color: 'from-orange-100 to-yellow-50'
    },
    {
      name: 'Vegan Buddha Bowl',
      emoji: '🥗',
      rating: 4.9,
      time: '15 min',
      calories: '280 kcal',
      badge: 'Healthy',
      color: 'from-green-100 to-emerald-50'
    },
    {
      name: 'Thai Green Curry',
      emoji: '🍛',
      rating: 4.7,
      time: '30 min',
      calories: '380 kcal',
      badge: 'Exotic',
      color: 'from-teal-100 to-cyan-50'
    },
    {
      name: 'Italian Pasta',
      emoji: '🍝',
      rating: 4.8,
      time: '20 min',
      calories: '520 kcal',
      badge: 'Classic',
      color: 'from-red-100 to-pink-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {meals.map((meal, idx) => (
        <div
          key={idx}
          className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
          style={{ animation: `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s forwards`, opacity: 0 }}
        >
          {/* Card Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${meal.color} group-hover:scale-110 transition-transform duration-500`}></div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 z-10">
            {/* Top Section: Badge */}
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-terra font-bold text-xs rounded-full uppercase tracking-wider">
                {meal.badge}
              </span>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-charcoal">{meal.rating}</span>
              </div>
            </div>

            {/* Middle Section: Large Emoji */}
            <div className="flex justify-center items-center flex-1">
              <div className="text-7xl group-hover:scale-125 transition-transform duration-300 animate-float">
                {meal.emoji}
              </div>
            </div>

            {/* Bottom Section: Info */}
            <div className="space-y-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/50 group-hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-header font-bold text-sm text-charcoal line-clamp-2">
                {meal.name}
              </h3>
              <div className="flex justify-between items-center text-xs text-charcoal-light font-medium">
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-terra" />
                  <span>{meal.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-accent" />
                  <span>{meal.calories}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-terra/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-6">
            <button className="px-6 py-2 bg-white font-bold text-terra rounded-full shadow-lg hover:shadow-xl transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
