import { TrendingUp } from 'lucide-react';

export default function StatsShowcase() {
  const stats = [
    {
      icon: '🍳',
      number: '10,000+',
      label: 'Premium Recipes',
      subtext: 'AI-generated and curated'
    },
    {
      icon: '👨‍🍳',
      number: '50,000+',
      label: 'Happy Cooks',
      subtext: 'Around the world'
    },
    {
      icon: '⭐',
      number: '4.9/5',
      label: 'User Rating',
      subtext: 'Based on reviews'
    },
    {
      icon: '⚡',
      number: '2 sec',
      label: 'Recipe Generation',
      subtext: 'Instant AI creation'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="text-center group cursor-pointer"
          style={{ animation: `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s forwards`, opacity: 0 }}
        >
          {/* Icon */}
          <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">
            {stat.icon}
          </div>

          {/* Number with Trending */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-3xl md:text-4xl font-extrabold font-header gradient-text">
              {stat.number}
            </h3>
            <TrendingUp size={20} className="text-accent animate-float" style={{ animationDuration: '2s' }} />
          </div>

          {/* Label */}
          <p className="text-charcoal font-bold text-base mb-1">
            {stat.label}
          </p>

          {/* Subtext */}
          <p className="text-charcoal-light text-sm font-medium">
            {stat.subtext}
          </p>

          {/* Animated Border */}
          <div className="h-1 bg-gradient-to-r from-terra via-accent to-terra rounded-full mt-4 w-0 group-hover:w-full transition-all duration-500"></div>
        </div>
      ))}
    </div>
  );
}
