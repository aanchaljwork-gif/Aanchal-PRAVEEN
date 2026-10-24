import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'The Big Idea' },
    { id: 'directions', label: '14 Directions' },
    { id: 'cases', label: 'Case Library' },
    { id: 'studio', label: 'The Odyssey Studio' },
    { id: 'reflection', label: 'Pedagogical Reflection' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text wordmark with Green & Gold Omega */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-amber-300 border border-amber-400/40 flex items-center justify-center font-serif font-bold text-base shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
            Ω
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-emerald-700 transition-colors">
              ODYSSEY LAB
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono mt-0.5 font-bold flex items-center gap-1">
              Odyssey 3.14 · <span className="text-amber-600 font-semibold">HEC Paris</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 5 clean uncluttered nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'studio' && (activeTab === 'remix-lab' || activeTab === 'arcade' || activeTab === 'recall'));
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-emerald-800 font-bold'
                    : 'hover:text-emerald-700 text-slate-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-teal-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action button with Green & Gold Shimmer */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-100 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 hover:from-emerald-700 hover:to-slate-800 border border-amber-400/40 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-emerald-900/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Odyssey Studio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
