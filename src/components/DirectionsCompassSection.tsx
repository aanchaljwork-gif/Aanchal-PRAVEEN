import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { DIRECTIONS, Direction } from '../data/odysseyData';
import { playClick } from '../utils/soundEffects';

interface DirectionsCompassSectionProps {
  onSelectDirectionForRemix: (directionId: number) => void;
  onAskCoachAboutDirection: (direction: Direction) => void;
}

export const DirectionsCompassSection: React.FC<DirectionsCompassSectionProps> = ({
  onSelectDirectionForRemix,
  onAskCoachAboutDirection,
}) => {
  const [filterPillar, setFilterPillar] = useState<'All' | 'Value Proposition' | 'Value Architecture'>('All');
  const [activeDirectionId, setActiveDirectionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDirections = DIRECTIONS.filter((d) => {
    const matchesPillar = filterPillar === 'All' || d.pillar === filterPillar;
    const matchesSearch =
      searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.plainEnglishExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.canonicalCaseExample.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  const activeDirection = DIRECTIONS.find((d) => d.id === activeDirectionId) || DIRECTIONS[0];

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-slate-800">HEC Paris Odyssey 3.14 Framework</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-900 font-bold bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded">14 Strategic Directions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            The Strategic Compass
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            Rather than waiting for random creative inspiration, the 14 directions provide systematic cognitive lenses to challenge industry dogmas across the Value Proposition and Value Architecture.
          </p>
        </div>

        {/* Pillar Segmented Selector */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl self-start md:self-auto shrink-0 border border-slate-200/80">
          {(['All', 'Value Proposition', 'Value Architecture'] as const).map((pillar) => (
            <button
              key={pillar}
              onClick={() => {
                playClick();
                setFilterPillar(pillar);
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                filterPillar === pillar
                  ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-800 hover:bg-white'
              }`}
            >
              {pillar === 'All' ? 'All 14 Directions' : pillar === 'Value Proposition' ? 'Value Proposition (1-7)' : 'Value Architecture (8-14)'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Compass Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direction Cards List */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
            <span>Showing {filteredDirections.length} of 14 directions</span>
            <span>Click any direction to inspect systemic trade-offs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredDirections.map((dir) => {
              const isSelected = dir.id === activeDirectionId;
              const isValueProp = dir.pillar === 'Value Proposition';

              const activeBg = isValueProp
                ? 'bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-amber-100 border-amber-400/50 shadow-md ring-2 ring-emerald-500'
                : 'bg-gradient-to-br from-amber-700 via-amber-800 to-yellow-950 text-amber-100 border-amber-400/50 shadow-md ring-2 ring-amber-400';

              return (
                <div
                  key={dir.id}
                  onClick={() => {
                    playClick();
                    setActiveDirectionId(dir.id);
                  }}
                  className={`p-4 rounded-xl border transition-all text-left cursor-pointer space-y-2.5 relative group ${
                    isSelected
                      ? activeBg
                      : 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-black/40 text-amber-300 border border-amber-400/30'
                          : isValueProp
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                          : 'bg-amber-50 text-amber-900 border border-amber-200/70'
                      }`}
                    >
                      Direction {dir.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isSelected ? 'text-amber-200/90' : isValueProp ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {isValueProp ? 'Proposition' : 'Architecture'}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold leading-snug">
                    {dir.name}
                  </h3>

                  <p
                    className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-white/90' : 'text-slate-600'
                    }`}
                  >
                    {dir.plainEnglishExplanation}
                  </p>

                  <div
                    className={`pt-2 text-[11px] font-mono flex items-center justify-between border-t ${
                      isSelected ? 'border-white/20 text-white/90' : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <span className="truncate">{dir.canonicalCaseExample.company}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-amber-300' : 'group-hover:translate-x-0.5 text-emerald-700'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Inspector Panel */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm ${
                  activeDirection.pillar === 'Value Proposition' ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-gradient-to-br from-sky-500 to-blue-600'
                }`}>
                  {activeDirection.id}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                    {activeDirection.pillar}
                  </span>
                  <h2 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                    {activeDirection.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Strategic Mechanism */}
            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-indigo-600 uppercase font-bold block">Strategic Mechanism</span>
              <p className="text-slate-700 leading-relaxed text-sm">
                {activeDirection.strategicMechanism}
              </p>
            </div>

            {/* Diagnostic Provocation */}
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Diagnostic Provocation Question:</span>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "{activeDirection.diagnosticQuestion}"
              </p>
            </div>

            {/* Cross-Pillar Ripples */}
            <div className="space-y-2 text-xs">
              <span className="font-mono text-slate-500 uppercase font-semibold block">Cross-Pillar Ripples</span>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                <div>
                  <strong className="text-slate-900 block font-sans">Profit Equation Economic Ripple:</strong>
                  <p className="text-slate-600">{activeDirection.crossPillarImplications.profitEquation}</p>
                </div>
                {activeDirection.crossPillarImplications.valueArchitecture && (
                  <div className="pt-2 border-t border-slate-200">
                    <strong className="text-slate-900 block font-sans">Value Architecture Operational Ripple:</strong>
                    <p className="text-slate-600">{activeDirection.crossPillarImplications.valueArchitecture}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Canonical Class Case */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                <span>Class Case Reference: {activeDirection.canonicalCaseExample.company}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeDirection.canonicalCaseExample.howApplied}
              </p>
              <div className="pt-1.5 text-[11px] text-emerald-800 font-semibold border-t border-emerald-200/60">
                <strong>Economic Outcome:</strong> {activeDirection.canonicalCaseExample.impact}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  playClick();
                  onSelectDirectionForRemix(activeDirection.id);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 hover:from-emerald-700 hover:to-slate-800 text-amber-200 border border-amber-400/40 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>Apply Direction in The Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
              <button
                onClick={() => {
                  playClick();
                  onAskCoachAboutDirection(activeDirection);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-emerald-50/40 text-slate-700 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ask Coach</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
