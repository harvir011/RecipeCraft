import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <h3 className="text-xl font-bold font-header text-charcoal">RecipeCraft</h3>
            </div>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Create amazing recipes with the power of AI. Generate, customize, and save your favorite dishes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-header text-charcoal mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-charcoal-light hover:text-fresh-green transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generate" className="text-charcoal-light hover:text-fresh-green transition-colors font-medium">
                  Generate Recipe
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-charcoal-light hover:text-fresh-green transition-colors font-medium">
                  My Recipes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-light hover:text-fresh-green transition-colors font-medium">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold font-header text-charcoal mb-4">Get In Touch</h4>
            <p className="text-charcoal-light text-sm mb-2">
              Have feedback or ideas?
            </p>
            <a
              href="mailto:hello@recipecraft.com"
              className="text-fresh-green hover:text-fresh-green-dark transition-colors font-semibold"
            >
              hello@recipecraft.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-charcoal-light">
            © {currentYear} RecipeCraft. Built with ❤️ and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
