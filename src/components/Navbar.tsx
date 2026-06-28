import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Menu, X, Globe, Heart, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, toggleTheme, theme } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="font-bold text-white text-base tracking-wider">C</span>
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-wide">
                CareChain <span className="text-orange-400">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
              Fonctionnalités
            </a>
            <a href="#community-impact" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
              Impact Communal
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
              FAQ
            </a>
            <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
              Témoignages
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-white transition"
              title="Changer de thème"
            >
              <Globe size={18} />
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-sm font-black px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-200"
              >
                Aller au Tableau de Bord
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors px-3 py-2 flex items-center gap-2"
                >
                  <LogIn size={16} />
                  Se connecter
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-sm font-black px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-105 transition-all duration-200"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-900 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-900 px-4 py-4 space-y-4"
          >
            <div className="flex flex-col gap-3.5">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-300 hover:text-orange-400 py-2 border-b border-slate-900"
              >
                Fonctionnalités
              </a>
              <a
                href="#community-impact"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-300 hover:text-orange-400 py-2 border-b border-slate-900"
              >
                Impact Communal
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-300 hover:text-orange-400 py-2 border-b border-slate-900"
              >
                FAQ
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-300 hover:text-orange-400 py-2 border-b border-slate-900"
              >
                Témoignages
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-center font-black py-3 rounded-xl"
                >
                  Aller au Tableau de Bord
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center font-bold text-slate-300 py-3 hover:text-orange-400 transition"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-center font-black py-3 rounded-xl"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
