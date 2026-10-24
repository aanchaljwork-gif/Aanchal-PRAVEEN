import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  AlertTriangle,
  Layers,
  Cpu,
  Coins,
  Sparkles,
  FileText,
  RotateCcw,
  Check,
  Plus,
} from 'lucide-react';
import {
  BASELINE_SCENARIOS,
  STRATEGIC_LEVERS,
  BusinessScenario,
  StrategicLever,
} from '../data/odysseyData';
import { RemixReportModal } from './RemixReportModal';

interface RemixLabSectionProps {
  initialScenarioId?: string;
  onAskCoachAboutRemix: (context: any) => void;
}

export const RemixLabSection: React.FC<RemixLabSectionProps> = ({
  initialScenarioId,
  onAskCoachAboutRemix,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || BASELINE_SCENARIOS[0].id
  );

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom scenario state
  const [customScenario, setCustomScenario] = useState<BusinessScenario>({
    id: 'custom-business',
    name: 'Custom Venture / Project',
    sector: 'Enter Sector',
    oneLiner: 'Describe your baseline business in a single sentence.',
    baseline: {
      targetCustomers: 'Primary target audience or clients',
      customerNeed: 'The fundamental unresolved problem or desire',
      productOrService: 'The primary product or service sold',
      pricingAndRevenueModel: 'Unit price and billing structure',
      mainActivitiesAndPartners: 'Key production, marketing, and channel partners',
      keyResources: 'Core tangible, technological, or brand assets',
      mainCosts: 'Dominant fixed and variable expenses',
      capitalRequirements: 'Equipment, inventory, or cash reserves needed',
    },
    diagnosticPrompts: [
      {
        id: 'c1',
        title: 'High Customer Acquisition Friction',
        description: 'CAC is unsustainably high compared to customer lifetime value.',
        suggestedLevers: ['recurring-subscription', 'access-over-ownership'],
      },
      {
        id: 'c2',
        title: 'Intermediary Margin Erosion',
        description: 'Middlemen take a large cut of margins without adding customer intimacy.',
        suggestedLevers: ['platform-disintermediation', 'ecosystem-partnerships'],
      },
    ],
    defaultLevers: ['recurring-subscription', 'ecosystem-partnerships'],
    curatedRemix: {
      name: 'Custom Remixed Model',
      leversUsed: ['recurring-subscription', 'ecosystem-partnerships'],
      diagnosticRationale: 'User customized rationale.',
      proposedModel: {
        valueProposition: {
          clients: 'Expanded target segments',
          offering: 'Reinvented offering bundle',
          price: 'Realigned pricing mechanism',
        },
        valueArchitecture: {
          valueChain: 'Automated or reconfigured workflows',
          partners: 'New ecosystem alliances',
          resources: 'Proprietary digital or community assets',
        },
        profitEquation: {
          revenueDynamics: 'Recurring, diversified, or usage-linked revenue',
          costStructure: 'Lower variable delivery costs and scaled efficiency',
          capitalEmployed: 'Asset-light operational infrastructure',
        },
      },
      whoBenefits: 'Customers receive higher value; firm captures sustainable margins.',
      whatChanges: 'Shifts from traditional delivery to an integrated value model.',
      valueCreationLogic: 'Eliminating friction unlocks latent willingness to pay.',
      risksAndAssumptions: [
        'Assumption: Target segment perceives sufficient value in the new mechanism.',
        'Risk: Operational complexity in transitioning legacy customers.',
      ],
      realityCheck: {
        customerValueScore: 8.0,
        operationalFeasibilityScore: 7.5,
        economicViabilityScore: 8.2,
        verdict: 'Conceptually Sound with High Discovery Potential',
        stressQuestions: [
          'What is the payback period for acquiring early adopters in this new model?',
          'Will existing competitors easily match this change?',
        ],
      },
    },
  });

  // Current scenario object
  const currentScenario = isCustomMode
    ? customScenario
    : BASELINE_SCENARIOS.find((s) => s.id === selectedScenarioId) || BASELINE_SCENARIOS[0];

  // Selected strategic levers state
  const [selectedLeverIds, setSelectedLeverIds] = useState<string[]>(
    currentScenario.defaultLevers
  );

  // Diagnostic state
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState<string>(
    currentScenario.diagnosticPrompts[0]?.id || ''
  );
  const [customDiagnosticText, setCustomDiagnosticText] = useState<string>('');

  // Reflections state
  const [customReflections, setCustomReflections] = useState({
    assumptionChanged: '',
    rationale: '',
    pillarInteractions: '',
    testingProtocol: '',
  });

  // Report modal state
  const [isReportOpen, setIsReportOpen] = useState(false);

  // When scenario changes, sync default levers and diagnostics
  useEffect(() => {
    if (!isCustomMode) {
      const s = BASELINE_SCENARIOS.find((item) => item.id === selectedScenarioId);
      if (s) {
        setSelectedLeverIds(s.defaultLevers);
        setSelectedDiagnosticId(s.diagnosticPrompts[0]?.id || '');
        setCustomDiagnosticText('');
      }
    }
  }, [selectedScenarioId, isCustomMode]);

  const toggleLever = (id: string) => {
    setSelectedLeverIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedLeversObjects = STRATEGIC_LEVERS.filter((l) =>
    selectedLeverIds.includes(l.id)
  );

  const currentDiagnosticProblem =
    customDiagnosticText ||
    currentScenario.diagnosticPrompts.find((p) => p.id === selectedDiagnosticId)?.title ||
    'High transactional volatility';

  return (
    <div className="space-y-12 pb-24">
      {/* HEADER & SCENARIO SELECTOR */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold">
              <span>Signature Feature</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-900 font-bold">Interactive Strategic Playground</span>
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Business Model Remix Lab
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
              My hands-on innovation laboratory: select an illustrative business, diagnose baseline weaknesses, apply strategic levers across the 3 pillars, and evaluate systemic ripple effects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedLeverIds(currentScenario.defaultLevers);
                setCustomDiagnosticText('');
                setActiveStep(1);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-xs hover:border-indigo-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Lab</span>
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Remix Report</span>
            </button>
          </div>
        </div>

        {/* Business Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BASELINE_SCENARIOS.map((sc) => {
            const isSelected = !isCustomMode && selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setIsCustomMode(false);
                  setSelectedScenarioId(sc.id);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                    isSelected ? 'text-indigo-200' : 'text-indigo-600'
                  }`}
                >
                  {sc.sector}
                </span>
                <h3 className="font-serif text-base font-bold mt-1">{sc.name}</h3>
                <p
                  className={`text-xs mt-1.5 line-clamp-2 ${
                    isSelected ? 'text-white/90' : 'text-slate-600'
                  }`}
                >
                  {sc.oneLiner}
                </p>
              </button>
            );
          })}

          {/* Custom Business Option */}
          <button
            onClick={() => setIsCustomMode(true)}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              isCustomMode
                ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                  isCustomMode ? 'text-indigo-200' : 'text-indigo-600'
                }`}
              >
                Custom Venture
              </span>
              <Plus className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-base font-bold mt-1">Design Custom Venture</h3>
            <p
              className={`text-xs mt-1.5 ${
                isCustomMode ? 'text-white/90' : 'text-slate-600'
              }`}
            >
              Input your own startup, SME, or enterprise challenge.
            </p>
          </button>
        </div>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { num: 1, label: '1. Diagnose' },
            { num: 2, label: '2. Strategic Levers' },
            { num: 3, label: '3. Remix Model' },
            { num: 4, label: '4. Reality Check' },
            { num: 5, label: '5. Reflect & Export' },
          ].map((st) => {
            const isCurrent = activeStep === st.num;
            const isCompleted = activeStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`py-2 px-1 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm shadow-indigo-500/20'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="truncate">{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BASELINE DISPLAY CARD (ALWAYS ACCESSIBLE FOR CONTEXT) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded">
                Baseline Business Model
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                · Illustrative educational scenario
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-slate-900 mt-1">
              {currentScenario.name}
            </h2>
          </div>
          <span className="text-xs text-slate-500 italic">
            Reference point prior to strategic reinvention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Target Customers:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.targetCustomers}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Core Offering:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.productOrService}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Pricing & Revenue:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.pricingAndRevenueModel}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Key Activities & Partners:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.mainActivitiesAndPartners}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Key Resources:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.keyResources}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1">
            <strong className="text-slate-900 block font-sans">Cost Structure:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.mainCosts}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1 md:col-span-2">
            <strong className="text-slate-900 block font-sans">Capital Requirements & Balance Sheet:</strong>
            <p className="text-slate-600 leading-relaxed">{currentScenario.baseline.capitalRequirements}</p>
          </div>
        </div>
      </div>

      {/* STEP 1: DIAGNOSE */}
      {activeStep === 1 && (
        <section className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded">
              Step 01: Strategic Diagnosis
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Identify a Baseline Limitation, Vulnerability, or Assumption
            </h2>
            <p className="text-sm text-slate-600">
              Reinvention starts by pinpointing what makes the traditional model fragile, expensive, or friction-heavy for customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentScenario.diagnosticPrompts.map((p) => {
              const isSelected = selectedDiagnosticId === p.id && !customDiagnosticText;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedDiagnosticId(p.id);
                    setCustomDiagnosticText('');
                    if (p.suggestedLevers.length > 0) {
                      setSelectedLeverIds(p.suggestedLevers);
                    }
                  }}
                  className={`p-5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-50/80 text-slate-900 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold">{p.title}</h3>
                    {isSelected && <Check className="w-4 h-4 text-indigo-200" />}
                  </div>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      isSelected ? 'text-white/90' : 'text-slate-600'
                    }`}
                  >
                    {p.description}
                  </p>
                  <div
                    className={`mt-3 text-[11px] font-mono pt-2 border-t ${
                      isSelected ? 'border-white/20 text-indigo-200' : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    Suggested levers: {p.suggestedLevers.join(', ')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Diagnostic Input */}
          <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Or write your own original diagnostic challenge:
            </label>
            <input
              type="text"
              value={customDiagnosticText}
              onChange={(e) => setCustomDiagnosticText(e.target.value)}
              placeholder="e.g. Reliance on seasonal peak traffic causes 4 months of heavy operational losses..."
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
            />
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <div className="text-xs text-slate-600">
              Selected diagnostic: <strong className="text-indigo-700">{currentDiagnosticProblem}</strong>
            </div>
            <button
              onClick={() => setActiveStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-lg hover:from-indigo-500 hover:to-violet-500 transition-all shadow-sm cursor-pointer"
            >
              <span>Proceed to Step 2: Explore Levers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: EXPLORE & COMBINE STRATEGIC LEVERS */}
      {activeStep === 2 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
                Step 02: Strategic Innovation Levers
              </span>
              <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
                Select Strategic Levers across the 3 Pillars
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Ground your reinvention in real strategies synthesized from our course cases (Blinkit, Zomato, Yulu, Pinduoduo, Zipcar, BMW, Frugal Innovation). Combine 2 to 3 levers to remix the baseline.
              </p>
            </div>
            <div className="text-xs font-mono bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-xl text-indigo-900 font-semibold shrink-0 shadow-xs">
              Selected: <strong className="text-indigo-600 font-bold">{selectedLeverIds.length}</strong> levers active
            </div>
          </div>

          {/* Group 1: Value Proposition Levers */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
              <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-indigo-950">
                Value Proposition Levers (Offering, Clients & Pricing)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIC_LEVERS.filter((l) => l.pillar === 'Value Proposition').map((lever) => {
                const isChecked = selectedLeverIds.includes(lever.id);
                return (
                  <div
                    key={lever.id}
                    onClick={() => toggleLever(lever.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-indigo-50/30 text-slate-900 border-indigo-100 hover:border-indigo-300 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isChecked ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {lever.name}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-white text-indigo-600 border-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isChecked ? 'text-white/90' : 'text-slate-600'
                      }`}
                    >
                      {lever.summary}
                    </p>

                    <div
                      className={`mt-3 pt-2 text-[11px] border-t ${
                        isChecked ? 'border-white/20 text-indigo-200' : 'border-indigo-100/80 text-indigo-700'
                      }`}
                    >
                      <strong>Systemic Impact:</strong> {lever.impactOnModel}
                    </div>

                    <div
                      className={`mt-1 text-[10px] ${
                        isChecked ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      <strong>Class Example:</strong> {lever.relatedCaseExample}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 2: Value Architecture Levers */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-sky-100 pb-2">
              <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-sky-950">
                Value Architecture Levers (Chain, Network & Capabilities)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIC_LEVERS.filter((l) => l.pillar === 'Value Architecture').map((lever) => {
                const isChecked = selectedLeverIds.includes(lever.id);
                return (
                  <div
                    key={lever.id}
                    onClick={() => toggleLever(lever.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gradient-to-br from-sky-600 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-500/20'
                        : 'bg-sky-50/30 text-slate-900 border-sky-100 hover:border-sky-300 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isChecked ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {lever.name}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-white text-sky-600 border-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isChecked ? 'text-white/90' : 'text-slate-600'
                      }`}
                    >
                      {lever.summary}
                    </p>

                    <div
                      className={`mt-3 pt-2 text-[11px] border-t ${
                        isChecked ? 'border-white/20 text-sky-200' : 'border-sky-100/80 text-sky-700'
                      }`}
                    >
                      <strong>Systemic Impact:</strong> {lever.impactOnModel}
                    </div>

                    <div
                      className={`mt-1 text-[10px] ${
                        isChecked ? 'text-sky-200' : 'text-slate-500'
                      }`}
                    >
                      <strong>Class Example:</strong> {lever.relatedCaseExample}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 3: Profit Equation Levers */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950">
                Profit Equation Levers (Revenue Dynamics & Capital Employed)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIC_LEVERS.filter((l) => l.pillar === 'Profit Equation').map((lever) => {
                const isChecked = selectedLeverIds.includes(lever.id);
                return (
                  <div
                    key={lever.id}
                    onClick={() => toggleLever(lever.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                        : 'bg-emerald-50/30 text-slate-900 border-emerald-100 hover:border-emerald-300 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isChecked ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {lever.name}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-white text-emerald-600 border-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isChecked ? 'text-white/90' : 'text-slate-600'
                      }`}
                    >
                      {lever.summary}
                    </p>

                    <div
                      className={`mt-3 pt-2 text-[11px] border-t ${
                        isChecked ? 'border-white/20 text-emerald-200' : 'border-emerald-100/80 text-emerald-700'
                      }`}
                    >
                      <strong>Systemic Impact:</strong> {lever.impactOnModel}
                    </div>

                    <div
                      className={`mt-1 text-[10px] ${
                        isChecked ? 'text-emerald-200' : 'text-slate-500'
                      }`}
                    >
                      <strong>Class Example:</strong> {lever.relatedCaseExample}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <button
              onClick={() => setActiveStep(1)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
            >
              Back to Step 1: Diagnose
            </button>
            <button
              onClick={() => setActiveStep(3)}
              disabled={selectedLeverIds.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg hover:from-indigo-500 hover:to-violet-500 transition-all shadow-sm cursor-pointer"
            >
              <span>Proceed to Step 3: Remix Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: REMIX (BEFORE-AND-AFTER STRUCTURED COMPARISON) */}
      {activeStep === 3 && (
        <section className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded">
                Step 03: Strategic Synthesis
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Structured Before-and-After Comparison
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Observing how the selected strategic levers transform the Value Proposition, Value Architecture, and Profit Equation.
              </p>
            </div>
            <button
              onClick={() =>
                onAskCoachAboutRemix({
                  business: currentScenario.name,
                  levers: selectedLeverIds,
                  issue: currentDiagnosticProblem,
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask Odyssey Coach to Critique This</span>
            </button>
          </div>

          {/* Synthesis Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Baseline Column */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono text-xs uppercase tracking-wider text-rose-700 font-bold">
                  Current Baseline Business Model
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Legacy Setup</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-slate-900 block font-sans mb-0.5">Value Proposition:</strong>
                  <p className="text-slate-600 leading-relaxed">
                    {currentScenario.baseline.productOrService} sold to {currentScenario.baseline.targetCustomers} on an ad-hoc basis.
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900 block font-sans mb-0.5">Value Architecture:</strong>
                  <p className="text-slate-600 leading-relaxed">
                    {currentScenario.baseline.mainActivitiesAndPartners}. Relies on {currentScenario.baseline.keyResources}.
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900 block font-sans mb-0.5">Profit Equation (Baseline Economics):</strong>
                  <p className="text-slate-600 leading-relaxed">
                    {currentScenario.baseline.pricingAndRevenueModel}. Fixed costs: {currentScenario.baseline.mainCosts}. Capital: {currentScenario.baseline.capitalRequirements}.
                  </p>
                </div>
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950">
                  <strong className="text-rose-900">Core Vulnerability:</strong> {currentDiagnosticProblem}
                </div>
              </div>
            </div>

            {/* Proposed Remixed Model Column */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-teal-50/50 to-sky-50/70 border border-emerald-300 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-950 font-bold">
                  Proposed Remixed Business Model
                </span>
                <span className="text-[10px] font-mono bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  {selectedLeverIds.length} Levers Integrated
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-emerald-950 block font-sans mb-0.5">Proposed Concept Name:</strong>
                  <p className="font-serif text-lg font-bold text-slate-900">
                    {currentScenario.curatedRemix.name}
                  </p>
                </div>
                <div>
                  <strong className="text-emerald-950 block font-sans mb-0.5">Reinvented Value Proposition:</strong>
                  <p className="text-slate-700 leading-relaxed">
                    {currentScenario.curatedRemix.proposedModel.valueProposition.offering} at {currentScenario.curatedRemix.proposedModel.valueProposition.price}.
                  </p>
                </div>
                <div>
                  <strong className="text-emerald-950 block font-sans mb-0.5">New Value Architecture:</strong>
                  <p className="text-slate-700 leading-relaxed">
                    {currentScenario.curatedRemix.proposedModel.valueArchitecture.valueChain} with partners: {currentScenario.curatedRemix.proposedModel.valueArchitecture.partners}.
                  </p>
                </div>
                <div>
                  <strong className="text-emerald-950 block font-sans mb-0.5">Profit Equation Dynamics:</strong>
                  <p className="text-slate-700 leading-relaxed">
                    {currentScenario.curatedRemix.proposedModel.profitEquation.revenueDynamics}. Cost dynamics: {currentScenario.curatedRemix.proposedModel.profitEquation.costStructure}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Strategic Consequences Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
              <h4 className="font-sans text-sm font-bold text-indigo-950">
                Who Benefits & Why Value is Created
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentScenario.curatedRemix.whoBenefits}
              </p>
              <div className="pt-2 text-[11px] text-indigo-700 font-semibold border-t border-indigo-200/70">
                <strong>Logic:</strong> {currentScenario.curatedRemix.valueCreationLogic}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-2">
              <h4 className="font-sans text-sm font-bold text-sky-950">
                What Radically Changes
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentScenario.curatedRemix.whatChanges}
              </p>
              <div className="pt-2 text-[11px] text-sky-700 font-medium border-t border-sky-200/70">
                *Illustrative directional estimation for academic analysis.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <h4 className="font-sans text-sm font-bold text-rose-950">
                Critical Risks & Assumptions
              </h4>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                {currentScenario.curatedRemix.risksAndAssumptions.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-200">
            <button
              onClick={() => setActiveStep(2)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
            >
              Back to Step 2: Levers
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-sm transition-all cursor-pointer"
            >
              <span>Proceed to Step 4: Stress-Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: STRESS-TEST ("THE REALITY CHECK") */}
      {activeStep === 4 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              Step 04: Rigorous Reality Check
            </span>
            <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
              The Reality Check: Stress-Testing the Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A creative idea must withstand operational friction and economic reality. Evaluate your model across customer value, operational feasibility, and economic viability.
            </p>
          </div>

          {/* Qualitative Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold">
                Customer Value
              </span>
              <div className="font-sans text-3xl font-extrabold text-indigo-950">
                {currentScenario.curatedRemix.realityCheck.customerValueScore}
                <span className="text-sm font-normal text-indigo-500">/10</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Do clients genuinely prefer this over their existing habit or makeshift alternative?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-200 text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold">
                Operational Feasibility
              </span>
              <div className="font-sans text-3xl font-extrabold text-sky-950">
                {currentScenario.curatedRemix.realityCheck.operationalFeasibilityScore}
                <span className="text-sm font-normal text-sky-500">/10</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Can the value architecture deliver this reliably without bottlenecking or execution chaos?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                Economic Viability
              </span>
              <div className="font-sans text-3xl font-extrabold text-emerald-950">
                {currentScenario.curatedRemix.realityCheck.economicViabilityScore}
                <span className="text-sm font-normal text-emerald-500">/10</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Does the profit equation generate positive contribution margin and manageable capital intensity?
              </p>
            </div>
          </div>

          {/* Stress-Test Provocations */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-sans text-lg font-bold text-slate-900">
                Critical Reality Check Questions
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Before proposing this model to decision makers, answer these uncomfortable questions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {currentScenario.curatedRemix.realityCheck.stressQuestions.map((q, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs text-xs space-y-1">
                  <span className="font-mono text-indigo-600 font-bold">Stress Inquiry 0{idx + 1}</span>
                  <p className="font-semibold text-slate-800">{q}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-200">
            <button
              onClick={() => setActiveStep(3)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
            >
              Back to Step 3: Remix
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-sm transition-all cursor-pointer"
            >
              <span>Proceed to Step 5: Guided Reflection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: GUIDED REFLECTION & EXPORT REPORT */}
      {activeStep === 5 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
                Step 05: Student Reflection & Export
              </span>
              <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
                Document Your Strategic Rationale
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Articulate your reasoning across the three pillars to solidify your learning and prepare your downloadable Remix Report.
              </p>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Business Model Remix Report</span>
            </button>
          </div>

          {/* 4 Reflection Prompt Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                1. Which foundational assumption did you challenge or change?
              </label>
              <textarea
                rows={3}
                value={customReflections.assumptionChanged}
                onChange={(e) =>
                  setCustomReflections({ ...customReflections, assumptionChanged: e.target.value })
                }
                placeholder="e.g. Challenged the belief that customers only call when an appliance is already broken..."
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                2. Why did you select these specific strategic levers?
              </label>
              <textarea
                rows={3}
                value={customReflections.rationale}
                onChange={(e) =>
                  setCustomReflections({ ...customReflections, rationale: e.target.value })
                }
                placeholder="e.g. Subscription converts lumpy revenue into predictable MRR, while ecosystem alliances partner with landlords..."
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                3. How do the three pillars interact in your proposed model?
              </label>
              <textarea
                rows={3}
                value={customReflections.pillarInteractions}
                onChange={(e) =>
                  setCustomReflections({ ...customReflections, pillarInteractions: e.target.value })
                }
                placeholder="e.g. The monthly subscription in the Value Proposition required digital dispatch in Value Architecture and produced negative working capital in the Profit Equation..."
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                4. What critical hypothesis would you test before implementation?
              </label>
              <textarea
                rows={3}
                value={customReflections.testingProtocol}
                onChange={(e) =>
                  setCustomReflections({ ...customReflections, testingProtocol: e.target.value })
                }
                placeholder="e.g. Run a 30-day landing page pilot targeting 50 local landlords to test willingness to pay EUR 19/month..."
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h4 className="font-sans text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Ready to review and share your work?
              </h4>
              <p className="text-xs text-slate-300">
                Your report compiles your baseline diagnostic, strategic levers, remixed 3-pillar model, reality check ratings, and personal reflections.
              </p>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold rounded-xl hover:from-indigo-400 hover:to-violet-500 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Export / Print Remix Report</span>
            </button>
          </div>
        </section>
      )}

      {/* REPORT MODAL */}
      <RemixReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        scenario={currentScenario}
        selectedLevers={selectedLeversObjects}
        diagnosticProblem={currentDiagnosticProblem}
        customReflections={customReflections}
      />
    </div>
  );
};
