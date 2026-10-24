import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Layers,
  Cpu,
  Coins,
  Lightbulb,
  BookOpen,
  Sparkles,
  Award,
  Flame,
} from 'lucide-react';
import { PILLARS, BASELINE_SCENARIOS, DIRECTIONS } from '../data/odysseyData';

interface HomeSectionProps {
  onEnterLab: (scenarioId?: string) => void;
  onExploreCases: () => void;
  onExploreDirections: () => void;
  onEnterArcade: () => void;
  onOpenReflection: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onEnterLab,
  onExploreCases,
  onExploreDirections,
  onEnterArcade,
  onOpenReflection,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('value-proposition');
  const activePillar = PILLARS.find((p) => p.id === selectedPillarId) || PILLARS[0];

  const previewScenario = BASELINE_SCENARIOS[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="pt-6 sm:pt-12 relative">
        {/* Ambient atmospheric background glows */}
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
              <span className="font-mono uppercase tracking-wider text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-md font-bold">
                HEC Paris Odyssey 3.14
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="bg-amber-100/80 text-amber-950 border border-amber-300/80 px-2.5 py-0.5 rounded-md font-bold">My Course Synthesis</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                The Odyssey Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              What if the business did not need a better product, but a <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">better business model</span>?
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              My hands-on strategic synthesis of HEC Paris's Odyssey 3.14 approach: exploring how companies like Blinkit, Zomato, Yulu, and Zipcar challenge industry orthodoxies to create, deliver, and capture defensible value.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onEnterLab()}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-amber-200 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 hover:from-emerald-700 hover:to-slate-800 border border-amber-400/40 rounded-xl transition-all shadow-lg shadow-emerald-950/25 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Enter The Odyssey Studio</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onEnterArcade}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl transition-all shadow-md shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.99] cursor-pointer border border-amber-300"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Play Innovation Arcade</span>
              </button>

              <button
                onClick={onExploreDirections}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-xl hover:bg-emerald-50/30 transition-all shadow-xs cursor-pointer"
              >
                <span>The 14 Directions →</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-semibold text-slate-800">3 Interconnected Pillars</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="font-semibold text-slate-800">14 Innovation Directions</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">8 Classroom Case Studies</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_odyssey_compass_1792595059945.jpg"
                alt="Odyssey 3.14 Strategic Compass"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                  The Strategic Compass
                </span>
                <p className="font-serif text-lg font-bold mt-1 text-white">
                  Rethink the Business. Redesign the Value.
                </p>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  My interactive translation of Laurence Lehmann-Ortega and Helene Musikas's framework at HEC Paris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GAMIFIED ARCADE TEASER BANNER (Creative Green & Gold) */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Feature: The Odyssey Studio Arcade</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Test Your Intuition in the Innovation Arcade
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ready to test your business model muscle memory? Spin the Wheel of Disruption to tackle randomized corporate dilemmas, crack the 5-letter business model Wordle (Termle), and assemble matching 3-pillar architectures.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-emerald-200">
            <span className="bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-lg text-emerald-200 font-semibold">• Spin the Wheel (14 Directions)</span>
            <span className="bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-lg text-emerald-200 font-semibold">• Termle (Wordle Mode)</span>
            <span className="bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-lg text-emerald-200 font-semibold">• 3-Pillar Synergy Match</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto relative z-10">
          <button
            onClick={onEnterArcade}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer text-center border border-amber-300"
          >
            Launch Innovation Arcade →
          </button>
        </div>
      </section>

      {/* 3. MEANINGFUL INTRODUCTION TO ODYSSEY 3.14: FROM STRATEGY TO BUSINESS MODELS */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            My Course Synthesis
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 text-balance">
            From Strategy to Business Models: What I Learned at HEC Paris
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            One of the most foundational lessons in our course was distinguishing between strategy levels. A firm is not simply a single entity; it is a <strong className="text-slate-900 font-semibold">collection of business models</strong>. While corporate strategy manages portfolio scope and business strategy pursues competitive advantage, the business model describes the operational reality: who we serve, what we promise, how we architect the engine, and how much economic return (ROCE) is captured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100">
          <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              A Firm as a Collection of Business Models
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              As we examined, large organisations manage multiple distinct business models simultaneously. Existing business units do not necessarily equal business models; true diagnosis requires separating each distinct value logic.
            </p>
          </div>

          <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Competitive Advantage & Willingness to Pay
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Competitive advantage expands the wedge between customer willingness to pay and firm cost. Business model innovation moves beyond product features to widen this wedge by reimagining how value is created and captured.
            </p>
          </div>

          <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              14 Directions as Cognitive Provocations
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rather than waiting for random creative inspiration, the 14 directions provide systematic cognitive lenses to challenge industry orthodoxies across the Value Proposition (1 to 7) and Value Architecture (8 to 14).
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE THREE-PILLAR FRAMEWORK (INTERACTIVE) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md">
              Core Framework Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              The Three Pillars of Odyssey 3.14
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Click on each pillar to inspect how I structured its components and review canonical cases we studied in class.
          </p>
        </div>

        {/* 3 Pillar Tabs with distinct vibrant themes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p) => {
            const isSelected = p.id === selectedPillarId;
            const Icon =
              p.id === 'value-proposition'
                ? Layers
                : p.id === 'value-architecture'
                ? Cpu
                : Coins;

            const pillarThemes = {
              'value-proposition': {
                active: 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-lg shadow-indigo-500/20',
                inactive: 'bg-white text-slate-900 border-slate-200/90 hover:border-indigo-300 hover:shadow-sm',
                iconActive: 'bg-white/20 text-white',
                iconInactive: 'bg-indigo-50 text-indigo-600',
                badgeActive: 'bg-white/20 text-indigo-100',
                badgeInactive: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
              },
              'value-architecture': {
                active: 'bg-gradient-to-br from-sky-600 to-blue-700 text-white border-sky-600 shadow-lg shadow-sky-500/20',
                inactive: 'bg-white text-slate-900 border-slate-200/90 hover:border-sky-300 hover:shadow-sm',
                iconActive: 'bg-white/20 text-white',
                iconInactive: 'bg-sky-50 text-sky-600',
                badgeActive: 'bg-white/20 text-sky-100',
                badgeInactive: 'bg-sky-50 text-sky-700 border border-sky-200/60',
              },
              'profit-equation': {
                active: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-lg shadow-emerald-500/20',
                inactive: 'bg-white text-slate-900 border-slate-200/90 hover:border-emerald-300 hover:shadow-sm',
                iconActive: 'bg-white/20 text-white',
                iconInactive: 'bg-emerald-50 text-emerald-600',
                badgeActive: 'bg-white/20 text-emerald-100',
                badgeInactive: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
              },
            };

            const theme = pillarThemes[p.id as keyof typeof pillarThemes] || pillarThemes['value-proposition'];

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillarId(p.id)}
                className={`p-6 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected ? theme.active : theme.inactive
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? theme.iconActive : theme.iconInactive
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-md font-medium ${
                      isSelected ? theme.badgeActive : theme.badgeInactive
                    }`}
                  >
                    {p.id === 'value-proposition'
                      ? 'Directions 1 to 7'
                      : p.id === 'value-architecture'
                      ? 'Directions 8 to 14'
                      : 'Revenue, Cost & ROCE'}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                <p
                  className={`text-xs mt-2 line-clamp-2 ${
                    isSelected ? 'text-white/90' : 'text-slate-600'
                  }`}
                >
                  {p.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Inspector Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded">
                Pillar Deep Dive
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                {activePillar.name}
              </h3>
              <p className="text-sm text-slate-600 max-w-2xl">
                {activePillar.description}
              </p>
            </div>
            <button
              onClick={onExploreDirections}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start lg:self-auto cursor-pointer"
            >
              <span>Inspect connected directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Core Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePillar.components.map((comp, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/70 space-y-2 hover:border-indigo-200 transition-colors">
                <span className="text-xs font-mono text-indigo-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200/60 inline-block">
                  0{idx + 1}. Element
                </span>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  {comp.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {comp.description}
                </p>
                <div className="pt-2 text-[11px] text-slate-700 font-medium border-t border-slate-200/80">
                  <strong className="text-indigo-700">Diagnostic prompt:</strong> {comp.diagnosticFocus}
                </div>
              </div>
            ))}
          </div>

          {/* Canonical Case Example */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                    Class Case Reference
                  </span>
                  <span className="text-xs text-slate-600 font-medium">· {activePillar.canonicalExample.business}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 pt-0.5">
                  {activePillar.canonicalExample.transformation}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {activePillar.canonicalExample.insight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED INTERACTIVE EXAMPLE */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 border border-indigo-500/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-md">
              Featured Baseline Scenario
            </span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-white">
              {previewScenario.name}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {previewScenario.oneLiner}
            </p>
          </div>
          <button
            onClick={() => onEnterLab(previewScenario.id)}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <span>Launch this Scenario in Remix Lab</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Baseline Card */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                Baseline Model (Traditional)
              </span>
              <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded">Illustrative</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="text-white block font-sans">Target Clients:</strong>
                <span className="text-slate-300">{previewScenario.baseline.targetCustomers}</span>
              </div>
              <div>
                <strong className="text-white block font-sans">Offering:</strong>
                <span className="text-slate-300">{previewScenario.baseline.productOrService}</span>
              </div>
              <div>
                <strong className="text-white block font-sans">Revenue Model:</strong>
                <span className="text-slate-300">{previewScenario.baseline.pricingAndRevenueModel}</span>
              </div>
              <div>
                <strong className="text-white block font-sans">Strategic Vulnerability:</strong>
                <span className="text-rose-300">
                  Lumpy, reactive cash flow dependent on emergency breakdowns; zero recurring income.
                </span>
              </div>
            </div>
          </div>

          {/* Remixed Vision Preview */}
          <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 rounded-2xl p-6 border border-indigo-500/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                Remixed Model (Directions 7 + 12: Subscription & Ecosystem)
              </span>
              <span className="text-[11px] text-emerald-300 font-mono bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">Reinvented</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="text-white block font-sans">Reinvented Offering:</strong>
                <span className="text-indigo-100">
                  HomeCare Plus: Monthly home maintenance subscription with loaner appliances & landlord network.
                </span>
              </div>
              <div>
                <strong className="text-white block font-sans">Value Architecture:</strong>
                <span className="text-indigo-100">
                  Preventive off-peak visits, property manager partnerships, and automated digital dispatch.
                </span>
              </div>
              <div>
                <strong className="text-white block font-sans">Profit Equation Shift:</strong>
                <span className="text-indigo-100">
                  80% predictable monthly recurring revenue with negative working capital from upfront subscriptions.
                </span>
              </div>
              <div>
                <strong className="text-white block font-sans">Strategic Insight:</strong>
                <span className="text-emerald-300 font-medium">
                  Transforms an anxious walk-in shop into an indispensable local facility manager.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLEAR LEARNING PROMISE */}
      <section className="text-center py-6 border-t border-slate-200/80 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-slate-900">
          My Learning Promise
        </h3>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          By testing real trade-offs in Odyssey Lab, students will leave with a fortified ability to spot hidden innovation opportunities, compare strategic options, articulate the ripple effects across all three pillars, and defend business model choices before any board or investor.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onEnterLab()}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-lg hover:from-indigo-500 hover:to-violet-500 transition-all shadow-sm hover:shadow cursor-pointer"
          >
            Start Experimenting Now
          </button>
          <button
            onClick={onOpenReflection}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Read 200-Word Pedagogical Reflection
          </button>
        </div>
      </section>
    </div>
  );
};
