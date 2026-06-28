import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import {
  LayoutDashboard,
  Wallet,
  HeartPulse,
  Users,
  MessageSquare,
  Sparkles,
  Coins,
  Globe,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Sidebar: React.FC = () => {
  const { user, logout, theme, toggleTheme } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    ...(user?.isAdmin ? [{ name: 'Portail Admin 🛡', path: '/admin', icon: ShieldCheck, color: 'text-orange-400' }] : []),
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard, color: 'text-orange-500' },
    { name: 'Sûreté & KYC', path: '/kyc', icon: ShieldCheck, color: 'text-amber-500' },
    { name: 'Épargne Santé', path: '/wallet', icon: Wallet, color: 'text-amber-500' },
    { name: 'Financement d\'Urgence', path: '/emergency', icon: HeartPulse, color: 'text-red-500' },
    { name: 'Cercle Familial', path: '/family', icon: Users, color: 'text-emerald-500' },
    { name: 'Assistant Santé IA', path: '/ai-assistant', icon: MessageSquare, color: 'text-indigo-500' },
    { name: 'Prédictions Santé', path: '/predictions', icon: Sparkles, color: 'text-yellow-500' },
    { name: 'Paiements Bitcoin', path: '/bitcoin', icon: Coins, color: 'text-orange-500' },
    { name: 'Impact Communal', path: '/community', icon: Globe, color: 'text-blue-500' },
    { name: 'Profil & Paramètres', path: '/profile', icon: User, color: 'text-purple-500' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg text-slate-800 dark:text-slate-200 hover:scale-105 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen fixed top-0 left-0 bg-slate-950 border-r border-slate-900 text-slate-300 z-40">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="font-bold text-white text-lg tracking-wider">C</span>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight tracking-wide">CareChain <span className="text-orange-400">AI</span></h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Santé & Financement</p>
          </div>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-5 border-b border-slate-900 flex items-center gap-3 bg-slate-900/20">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-orange-500/30"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-white truncate">{user.name}</h2>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive
                    ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-400 border border-orange-500/20 shadow-sm shadow-orange-500/5'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent'
                  }
                `}
              >
                <Icon size={18} className={`transition-transform duration-200 group-hover:scale-110 ${item.color}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-900 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} className="text-indigo-400" />}
              <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md uppercase font-mono">{theme}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={15} />
            <span>Se Déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay & Panel) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Slide-out Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-80 h-screen bg-slate-950 text-slate-300 border-r border-slate-900 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center">
                    <span className="font-bold text-white text-lg">C</span>
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-lg tracking-wide">CareChain <span className="text-orange-400">AI</span></h1>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Santé & Financement</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {user && (
                <div className="p-5 border-b border-slate-900 flex items-center gap-3 bg-slate-900/20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-orange-500/30"
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-white">{user.name}</h2>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-400 border border-orange-500/20'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                        }
                      `}
                    >
                      <Icon size={18} className={item.color} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-900 space-y-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition"
                >
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} className="text-indigo-400" />}
                    <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Se Déconnecter</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
