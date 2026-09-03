import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components/ui';
import { FloatingDecorations, MealShowcase, TestimonialShowcase, StatsShowcase } from '../components';
import { ChefHat, Zap, BookOpen, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: 'AI-Powered Recipes',
      description: 'Generate creative, personalized recipes using advanced AI technology'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create recipes in seconds with your dietary preferences'
    },
    {
      icon: BookOpen,
      title: 'Save & Organize',
      description: 'Build your personal recipe collection and manage favorites'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating Decorations */}
      <FloatingDecorations />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center">
        {/* Premium Gradient Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-gradient-to-l from-accent/15 to-transparent rounded-l-[200px] -z-10 hidden lg:block blur-3xl"></div>
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[35%] aspect-square bg-terra/10 rounded-full blur-3xl -z-10 hidden lg:block"></div>
        <div className="absolute left-0 bottom-0 w-[30%] aspect-square bg-accent/8 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start animate-slideUp">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cream to-cream-dark border border-border rounded-full mb-6 text-terra font-bold text-xs uppercase tracking-widest shadow-terra-glow">
                <Sparkles size={14} />
                Premium AI Kitchen Assistant
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-header text-charcoal mb-6 leading-tight select-none gradient-text">
                Craft Your Next Culinary Masterpiece
              </h1>

              <p className="text-lg md:text-xl text-charcoal mb-10 max-w-xl font-medium">
                Experience AI-generated gourmet recipes with premium styling, detailed instructions, and nutritional insights
              </p>

              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/generate')}
                  className="inline-flex items-center gap-2 group text-lg premium-shadow"
                >
                  <ChefHat size={20} />
                  GENERATE RECIPE
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="inline-flex items-center gap-2 text-lg"
                  >
                    <Sparkles size={18} />
                    GET STARTED FREE
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    SIGN IN
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Premium Visual */}
            <div className="lg:col-span-5 flex justify-center items-center relative animate-float">
              {/* Circular Backdrop with Gradient */}
              <div className="absolute w-[110%] aspect-square bg-gradient-to-br from-cream-dark via-cream to-muted rounded-full -z-10 scale-95 border-4 border-white shadow-2xl"></div>

              {/* Main Food Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl group hover:shadow-amber-600/20 transition-all duration-500 animate-scaleIn">
                <div className="w-full h-full bg-gradient-to-br from-cream-dark to-muted flex items-center justify-center text-8xl">
                  🍽️
                </div>
              </div>

              {/* Floating Premium Badges */}
              <div className="absolute -left-4 top-[20%] bg-white py-4 px-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-border animate-bounce premium-shadow" style={{ animationDuration: '4s' }}>
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="text-[10px] text-terra font-bold uppercase leading-none tracking-wider">Premium</p>
                  <p className="text-sm font-extrabold text-charcoal">AI Recipes</p>
                </div>
              </div>

              <div className="absolute -right-4 bottom-[20%] bg-white py-4 px-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-border animate-bounce premium-shadow" style={{ animationDuration: '5s' }}>
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="text-[10px] text-accent font-bold uppercase leading-none tracking-wider">Instant</p>
                  <p className="text-sm font-extrabold text-charcoal">Generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-transparent -z-10"></div>

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal mb-4">
              Why Choose <span className="gradient-text">RecipeCraft Premium?</span>
            </h2>
            <p className="text-charcoal-light font-medium text-lg">
              Everything you need to discover, create, and master gourmet recipes in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="flex flex-col items-center text-center !bg-white border border-border hover:-translate-y-4 !p-8 group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6 p-4 bg-gradient-to-br from-cream to-cream-dark rounded-2xl group-hover:shadow-terra-glow transition-all duration-300">
                    <Icon size={36} className="text-terra group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold font-header text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Meal Showcase Section */}
      <section className="py-24 bg-gradient-to-b from-white to-cream relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal mb-4">
              Browse <span className="gradient-text">Premium Meal Collections</span>
            </h2>
            <p className="text-charcoal font-medium text-lg">
              Explore our curated selection of AI-generated recipes with stunning visuals and detailed nutrition information
            </p>
          </div>
          <MealShowcase />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terra/5 via-transparent to-accent/5 -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal mb-4">
              Trusted by <span className="gradient-text">Food Enthusiasts</span>
            </h2>
            <p className="text-charcoal font-medium text-lg">
              Join our growing community of cooks discovering premium recipes every day
            </p>
          </div>
          <StatsShowcase />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-accent" size={28} />
              <h2 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal">
                <span className="gradient-text">Love from Our Community</span>
              </h2>
            </div>
            <p className="text-charcoal font-medium text-lg">
              See what our users are saying about their RecipeCraft experience
            </p>
          </div>
          <TestimonialShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-terra/10 via-accent/5 to-cream border border-border text-center rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-terra/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

            <h2 className="text-4xl md:text-5xl font-extrabold font-header text-charcoal mb-4 relative z-10">
              Ready to Cook Like a Pro?
            </h2>
            <p className="text-charcoal font-medium text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of food enthusiasts discovering premium AI-generated recipes every day
            </p>
            {!isAuthenticated && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                className="relative z-10 inline-flex items-center gap-2 text-lg premium-shadow"
              >
                <Sparkles size={20} />
                Start Your Culinary Journey
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 border-t border-border text-center bg-white">
        <p className="text-charcoal-light text-xs font-bold uppercase tracking-widest">
          ✓ No credit card required • ✓ Instant recipe generation • ✓ Premium cuisine experience
        </p>
      </section>
    </div>
  );
}
