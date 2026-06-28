import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Sidebar } from './Sidebar';
import { Bell, HelpCircle, HeartPulse, Search, Coins, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated, user, btcPriceUsd } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Calculate generic total balances for display
  const savingsSum = 320000 + 120000 + 85000; // sum of mock goals

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 md:pl-72 flex flex-col min-h-screen">
        {/* Top Header Glass Bar */}
        <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 px-6 py-4 flex items-center justify-between">
          {/* Left: Quick search simulation */}
          <div className="relative hidden sm:block max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Rechercher soins, aides..."
              className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 outline-none transition"
            />
          </div>

          <div className="sm:hidden flex items-center gap-1">
            <span className="font-extrabold text-sm text-orange-400">CareChain AI</span>
          </div>

          {/* Right: User indicators */}
          <div className="flex items-center gap-4">
            {/* BTC Price Tick */}
            <div className="hidden lg:flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-orange-400">
              <Coins size={12} className="text-orange-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>BTC: ${btcPriceUsd.toLocaleString()}</span>
              <ArrowUpRight size={10} className="text-emerald-400" />
            </div>

            {/* KYC Status Header Badge */}
            <button
              onClick={() => navigate('/kyc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider transition ${
                user.kycStatus === 'verifie'
                  ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse'
              }`}
            >
              {user.kycStatus === 'verifie' ? (
                <>
                  <ShieldCheck size={13} className="text-orange-400 animate-bounce" />
                  <span className="hidden sm:inline uppercase">Sûreté OK</span>
                </>
              ) : (
                <>
                  <ShieldAlert size={13} className="text-red-400" />
                  <span className="hidden sm:inline uppercase">KYC Requis</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <button className="p-2 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-white transition relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
            </button>

            {/* Help Quick Link */}
            <button
              onClick={() => navigate('/ai-assistant')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-300 font-bold transition border border-slate-850"
            >
              <HelpCircle size={14} className="text-orange-400" />
              <span>Demander à l'IA</span>
            </button>

            {/* Mini User Profile Bubble */}
            <div 
              onClick={() => navigate('/profile')} 
              className="flex items-center gap-2 pl-2 border-l border-slate-900 cursor-pointer group"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all"
              />
              <span className="text-xs font-semibold hidden md:block text-slate-300 group-hover:text-white transition">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic View Body */}
        <main className="flex-1 p-6 space-y-8 max-w-7xl w-full mx-auto pb-16">
          {children}
        </main>
      </div>
    </div>
  );
};
