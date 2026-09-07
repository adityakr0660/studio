import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/api';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    try { await supabase.auth.signOut(); } catch (e) {}
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="navbar-glass rounded-full px-5 py-3 flex items-center justify-between h-16"
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/65 backdrop-blur-md border border-white/80 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <img
                src="/images/logo.png"
                alt="Hariom Studio"
                className="h-7 w-7 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-stone-900 tracking-tight leading-none group-hover:text-gold-700 transition-colors duration-200">
                Hariom Studio
              </span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-mono mt-0.5">
                Est. 2000
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Central Floating Glass Capsule */}
          <div className="hidden md:flex items-center gap-1.5 navbar-pill-track p-1.5 px-2 rounded-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-stone-950 font-semibold' : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 navbar-pill-active rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {userInfo ? (
              <button
                onClick={handleLogout}
                className="text-xs text-stone-500 hover:text-stone-900 px-3 py-1.5 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            ) : null}
            <Link
              to="/booking"
              className="btn-gold text-xs uppercase tracking-wider py-2 px-5 whitespace-nowrap shadow-sm"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none transition-colors duration-200"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 navbar-glass rounded-2xl p-3.5 space-y-3"
            >
              <div className="navbar-pill-track p-1.5 rounded-xl space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive ? 'navbar-pill-active text-stone-950 font-semibold' : 'text-stone-700 hover:text-stone-950 hover:bg-white/40'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-white/60 flex flex-col gap-2">
                <Link
                  to="/booking"
                  className="btn-gold text-center text-xs uppercase tracking-wider py-2.5 shadow-sm"
                >
                  Book a Session
                </Link>
                {userInfo && (
                  <button
                    onClick={handleLogout}
                    className="text-center text-xs text-stone-500 py-2 hover:text-stone-900 font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

