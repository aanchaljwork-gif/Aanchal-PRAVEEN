import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Gamepad2, Brain, Flame, Layers } from 'lucide-react';
import { RemixLabSection } from './RemixLabSection';
import { InnovationArcade } from './InnovationArcade';
import { RecallRoom } from './RecallRoom';

export type StudioSubMode = 'remix' | 'arcade' | 'recall';

interface OdysseyStudioSectionProps {
  subMode?: StudioSubMode;
  onSubModeChange?: (mode: StudioSubMode) => void;
  initialScenarioId?: string;
  onAskCoachAboutRemix: (context: any) => void;
  onNavigateToCase: (caseId: string) => void;
}

export const OdysseyStudioSection: React.FC<OdysseyStudioSectionProps> = ({
  subMode = 'remix',
  onSubModeChange,
  initialScenarioId,
  onAskCoachAboutRemix,
  onNavigateToCase,
}) => {
  const [currentMode, setCurrentMode] = useState<StudioSubMode>(subMode);

  useEffect(() => {
    if (subMode) {
      setCurrentMode(subMode);
    }
  }, [subMode]);

  const handleSelectMode = (mode: StudioSubMode) => {
    setCurrentMode(mode);
    if (onSubModeChange) {
      onSubModeChange(mode);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* CREATIVE STUDIO CONTROL HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-amber-500/30 p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Strategic Innovation Suite
              </span>
              <span className="text-emerald-300 text-xs font-mono font-medium hidden sm:inline">
                Odyssey 3.14 Interactive Environment
              </span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              The Odyssey Studio
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              My consolidated creative studio for business model innovation: remix baseline enterprises across the 3 pillars, master market mechanisms in the gamified arcade, and reinforce core strategic concepts through active retrieval.
            </p>
          </div>

          {/* Studio Mode Badges / Quick Status */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-emerald-500/20">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-900/50 border border-emerald-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block">Focus</span>
              <span className="text-xs font-bold text-white capitalize">{currentMode} Mode</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-amber-300 block">Theme</span>
              <span className="text-xs font-bold text-amber-200">Green & Gold</span>
            </div>
          </div>
        </div>

        {/* 3-WAY STUDIO MODE SELECTOR */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-emerald-800/40">
          {/* Studio Sub-tab 1: Remix Lab */}
          <button
            onClick={() => handleSelectMode('remix')}
            className={`group flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
              currentMode === 'remix'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-amber-400/60 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-amber-400/50'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 shrink-0 ${
                currentMode === 'remix'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/30'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm font-bold block truncate">
                  Remix Lab
                </span>
                {currentMode === 'remix' && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] text-slate-300 line-clamp-1 block">
                5-step business model redesign
              </span>
            </div>
          </button>

          {/* Studio Sub-tab 2: Innovation Arcade */}
          <button
            onClick={() => handleSelectMode('arcade')}
            className={`group flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
              currentMode === 'arcade'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-amber-400/60 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-amber-400/50'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 shrink-0 ${
                currentMode === 'arcade'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/30'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm font-bold block truncate">
                  Innovation Arcade
                </span>
                {currentMode === 'arcade' && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] text-slate-300 line-clamp-1 block">
                Wheel of Disruption, Termle, Synergy
              </span>
            </div>
          </button>

          {/* Studio Sub-tab 3: Active Recall */}
          <button
            onClick={() => handleSelectMode('recall')}
            className={`group flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
              currentMode === 'recall'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-amber-400/60 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-amber-400/50'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 shrink-0 ${
                currentMode === 'recall'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/30'
              }`}
            >
              <Brain className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm font-bold block truncate">
                  Active Recall
                </span>
                {currentMode === 'recall' && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] text-slate-300 line-clamp-1 block">
                Strategic retrieval & quizzes
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ACTIVE STUDIO WORKSPACE */}
      <div className="transition-opacity duration-200">
        {currentMode === 'remix' && (
          <RemixLabSection
            initialScenarioId={initialScenarioId}
            onAskCoachAboutRemix={onAskCoachAboutRemix}
          />
        )}

        {currentMode === 'arcade' && (
          <InnovationArcade
            onNavigateToCase={onNavigateToCase}
            onNavigateToRemix={() => handleSelectMode('remix')}
          />
        )}

        {currentMode === 'recall' && <RecallRoom />}
      </div>
    </div>
  );
};
