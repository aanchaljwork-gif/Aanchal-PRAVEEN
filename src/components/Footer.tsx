import React from 'react';
import { BookOpen, GraduationCap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-12 px-4 sm:px-6 lg:px-8 mt-20 no-print">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs shadow-xs">
                Ω
              </div>
              <span className="font-sans text-base font-extrabold tracking-tight text-slate-900">
                ODYSSEY LAB
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A pedagogical strategic playground for active learning, retrieval practice, and business model reinvention.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-2">
              Lab Navigation
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  The Big Idea (Framework & 3 Pillars)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('directions')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  The Strategic Compass (14 Directions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cases')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Classroom Case Library (8 Cases)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-emerald-700 font-semibold text-emerald-900 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>The Odyssey Studio (Remix, Arcade & Recall)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reflection')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Pedagogical Reflection (200 Words)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Foundations */}
          <div className="space-y-2 text-xs md:col-span-2">
            <span className="font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-2">
              Academic Attribution & Methodology
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on the Odyssey 3.14 approach developed by <strong>Laurence Lehmann-Ortega</strong>, <strong>Hélène Musikas</strong>, and <strong>Jean-Marc Schoettl</strong> (HEC Paris Strategy & Business Policy Department; published by <em>Dunod</em>).
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              Odyssey 3.14 structures business model reinvention through three core pillars (Value Proposition, Value Architecture, and Profit Equation) evaluated through real market architectures.
            </p>
          </div>
        </div>

        {/* Central Educational Disclaimer as mandated by Prompt Section 10 */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Academic Independence & Educational Scope</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            <strong>Disclaimer:</strong> Odyssey Lab is an independent student academic learning project developed for Option 2 of the HEC Paris Business Model Innovation course. It is not an official HEC Paris product or endorsed service. The platform is designed to complement, rather than replace, official course literature, faculty lectures, and peer classroom debates. All business scenarios (repair shop, food producer, edtech) and numerical projections are illustrative pedagogical devices designed for learning evaluation.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <span>Odyssey Lab · Built for HEC Paris Odyssey 3.14 Learning Experience</span>
          <span>Version 1.0 · Single-Page Full-Stack React & Node Environment</span>
        </div>
      </div>
    </footer>
  );
};
