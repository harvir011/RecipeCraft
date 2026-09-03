import { Star } from 'lucide-react';

export default function TestimonialShowcase() {
  const testimonials = [
    {
      name: 'Sarah Chef',
      role: 'Home Cook',
      avatar: '👩‍🍳',
      quote: 'RecipeCraft transformed my cooking! The AI recipes are creative and easy to follow.',
      rating: 5,
      color: 'from-pink-50 to-rose-50'
    },
    {
      name: 'Marcus Fitness',
      role: 'Fitness Enthusiast',
      avatar: '💪',
      quote: 'Perfect for my meal prep routine. The nutritional info is always accurate and helpful.',
      rating: 5,
      color: 'from-green-50 to-emerald-50'
    },
    {
      name: 'Elena Vegan',
      role: 'Plant-Based Chef',
      avatar: '🌱',
      quote: 'Amazing vegan recipes! Finally, an AI that understands dietary preferences perfectly.',
      rating: 5,
      color: 'from-emerald-50 to-teal-50'
    },
    {
      name: 'David Professional',
      role: 'Professional Chef',
      avatar: '👨‍🍳',
      quote: 'Impressive AI-generated recipes with professional-grade presentations and techniques.',
      rating: 5,
      color: 'from-amber-50 to-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${testimonial.color} border border-border rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group`}
          style={{ animation: `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.12}s forwards`, opacity: 0 }}
        >
          {/* Rating Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-charcoal font-medium text-sm mb-6 leading-relaxed italic">
            "{testimonial.quote}"
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-md group-hover:shadow-lg transition-shadow">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-bold text-charcoal text-sm">{testimonial.name}</p>
              <p className="text-charcoal-light text-xs font-medium">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
