import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui';
import { Menu, X, LogOut, Search, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleNavClick = (path, elementId = null) => {
    navigate(path);
    setMenuOpen(false);

    if (elementId && (path === '/' || location.pathname === '/')) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-40 premium-shadow">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300 animate-float">🍳</span>
            <div className="group-hover:animate-slideIn">
              <h1 className="text-2xl font-extrabold font-header text-charcoal tracking-tight">
                Recipe<span className="bg-gradient-to-r from-terra to-accent bg-clip-text text-transparent">Craft</span>
              </h1>
              <span className="text-[9px] uppercase tracking-widest text-terra font-bold">Premium Cooking</span>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              onClick={() => handleNavClick('/')}
              isActive={isActive('/')}
              label="Home"
            />
            <NavLink
              onClick={() => handleNavClick('/recipes')}
              isActive={isActive('/recipes')}
              label="Recipes"
            />
            <NavLink
              onClick={() => handleNavClick('/recipes')}
              isActive={isActive('/saved')}
              label="Saved"
            />
            <NavLink
              onClick={() => handleNavClick('/', 'features-section')}
              isActive={false}
              label="About"
            />
          </div>

          {/* Right: Search, Auth & Profile */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('/recipes')}
              className="p-2.5 bg-cream hover:bg-cream-dark text-terra hover:text-accent rounded-full transition-all duration-300 hover:scale-110 border border-border flex items-center justify-center hover:shadow-terra-glow"
              title="Search Recipes"
            >
              <Search size={18} />
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l border-border pl-4 ml-2">
                <div className="text-right">
                  <p className="text-sm font-bold text-charcoal leading-none">{user?.name}</p>
                  <p className="text-[10px] text-charcoal-light mt-0.5">{user?.email}</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleNavClick('/generate')}
                  className="!py-2 !px-4 text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <Sparkles size={14} />
                  Generate
                </Button>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full hover:bg-red-50 text-charcoal-light hover:text-red-500 transition-colors border border-transparent hover:border-red-100"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavClick('/login')}
                  className="!py-2 !px-4 text-xs font-bold"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleNavClick('/register')}
                  className="!py-2 !px-4 text-xs font-bold flex items-center gap-1"
                >
                  <Sparkles size={14} />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('/recipes')}
              className="p-2.5 bg-cream text-terra rounded-full border border-border hover:bg-cream-dark transition-all"
            >
              <Search size={18} />
            </button>

            <button
              className="p-2.5 rounded-full hover:bg-cream-dark transition-colors border border-border"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} className="text-charcoal" /> : <Menu size={20} className="text-charcoal" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2 animate-slideDown">
            {isAuthenticated && (
              <div className="mb-4 p-4 bg-cream rounded-xl border border-border">
                <p className="text-sm font-bold text-charcoal">{user?.name}</p>
                <p className="text-xs text-charcoal-light">{user?.email}</p>
              </div>
            )}

            <MobileNavLink onClick={() => handleNavClick('/')} label="Home" />
            <MobileNavLink onClick={() => handleNavClick('/recipes')} label="Recipes" />
            <MobileNavLink onClick={() => handleNavClick('/recipes')} label="Saved" />
            <MobileNavLink onClick={() => handleNavClick('/', 'features-section')} label="About" />

            {isAuthenticated ? (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleNavClick('/generate')}
                >
                  <Sparkles size={16} />
                  Generate Recipe
                </Button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left font-semibold text-red-600 py-2.5 px-4 hover:bg-red-50 rounded-xl mt-2 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => handleNavClick('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => handleNavClick('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ onClick, isActive, label }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold text-sm transition-all duration-300 relative group ${
        isActive
          ? 'text-terra'
          : 'text-charcoal-light hover:text-terra'
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-terra to-accent transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></span>
    </button>
  );
}

function MobileNavLink({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left font-semibold text-charcoal py-2.5 px-4 hover:bg-cream hover:text-terra rounded-xl transition-all"
    >
      {label}
    </button>
  );
}
