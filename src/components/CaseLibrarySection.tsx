import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Cpu,
  Coins,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Lightbulb,
  Building2,
  Filter,
} from 'lucide-react';
import { BUSINESS_CASES, BusinessCase } from '../data/odysseyData';

interface CaseLibrarySectionProps {
  onSelectCaseForRemix: (caseId: string) => void;
  onAskCoachAboutCase: (caseItem: BusinessCase) => void;
}

export const CaseLibrarySection: React.FC<CaseLibrarySectionProps> = ({
  onSelectCaseForRemix,
  onAskCoachAboutCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  const categories = [
    'All',
    'Platform & Ecosystem',
    'Access & Mobility',
    'Quick Commerce',
    'Social Commerce',
    'Niche Craft',
    'Frugal Strategy',
  ];

  const filteredCases = BUSINESS_CASES.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyInnovationMechanism.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCaseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500">
            <span>Course Case Repository</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-emerald-900 font-bold bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded">Classroom Case Library</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Business Model Cases Discussed in Class
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
            My curated library of the business models we explored and debated in our HEC Paris sessions: examining how each transformed its Value Proposition, Value Architecture, and Profit Equation.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Blinkit, Zomato, Yulu..."
              className="text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 w-full sm:w-64 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-200 border border-amber-400/40 shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 shadow-xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCases.map((cs) => {
          const isExpanded = expandedCaseId === cs.id;

          return (
            <div
              key={cs.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                    {cs.sector}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {cs.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {cs.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600">
                    {cs.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cs.summary}
                </p>

                {/* Key Innovation Mechanism */}
                <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold block">
                    Key Business Model Innovation
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {cs.keyInnovationMechanism}
                  </p>
                </div>

                {/* Course Takeaway */}
                <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/80 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Classroom Discussion Takeaway</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {cs.courseTakeaway}
                  </p>
                </div>

                {/* Expandable 3-Pillar Deep Dive */}
                {isExpanded && (
                  <div className="pt-4 mt-2 border-t border-slate-100 space-y-3.5 text-xs animate-in fade-in duration-200">
                    <div className="p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        <span>1. Value Proposition (Who & What)</span>
                      </div>
                      <p className="text-slate-700"><strong>Clients:</strong> {cs.valueProposition.clients}</p>
                      <p className="text-slate-700"><strong>Offering:</strong> {cs.valueProposition.offering}</p>
                      <p className="text-slate-700"><strong>Pricing Mechanism:</strong> {cs.valueProposition.pricing}</p>
                    </div>

                    <div className="p-3.5 bg-sky-50/40 rounded-xl border border-sky-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-sky-900 font-bold">
                        <Cpu className="w-3.5 h-3.5 text-sky-600" />
                        <span>2. Value Architecture (How & With Whom)</span>
                      </div>
                      <p className="text-slate-700"><strong>Value Chain:</strong> {cs.valueArchitecture.valueChain}</p>
                      <p className="text-slate-700"><strong>Partners:</strong> {cs.valueArchitecture.partners}</p>
                      <p className="text-slate-700"><strong>Key Resources:</strong> {cs.valueArchitecture.resources}</p>
                    </div>

                    <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                        <Coins className="w-3.5 h-3.5 text-emerald-600" />
                        <span>3. Profit Equation (How Much & ROCE)</span>
                      </div>
                      <p className="text-slate-700"><strong>Revenue Drivers:</strong> {cs.profitEquation.revenueDrivers}</p>
                      <p className="text-slate-700"><strong>Cost Structure:</strong> {cs.profitEquation.costStructure}</p>
                      <p className="text-slate-700"><strong>Capital Employed:</strong> {cs.profitEquation.capitalEmployed}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleExpand(cs.id)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide 3-Pillar Details' : 'Inspect 3-Pillar Architecture'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onAskCoachAboutCase(cs)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200/90 rounded-xl transition-all shadow-xs cursor-pointer hover:border-emerald-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Discuss with Coach</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
