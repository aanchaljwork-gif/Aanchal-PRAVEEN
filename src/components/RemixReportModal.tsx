import React from 'react';
import { X, Printer, Copy, Check, Download } from 'lucide-react';
import { StrategicLever, BusinessScenario } from '../data/odysseyData';

interface RemixReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: BusinessScenario;
  selectedLevers: StrategicLever[];
  diagnosticProblem: string;
  customReflections: {
    assumptionChanged: string;
    rationale: string;
    pillarInteractions: string;
    testingProtocol: string;
  };
}

export const RemixReportModal: React.FC<RemixReportModalProps> = ({
  isOpen,
  onClose,
  scenario,
  selectedLevers,
  diagnosticProblem,
  customReflections,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    return `# ODYSSEY 3.14: BUSINESS MODEL REMIX REPORT
Generated via Odyssey Lab (HEC Paris Business Model Innovation Studio)
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

## 1. BASELINE BUSINESS CONTEXT
- **Business Focus:** ${scenario.name} (${scenario.sector})
- **Core Baseline Model:** ${scenario.oneLiner}
- **Identified Strategic Bottleneck:** ${diagnosticProblem || 'Unaddressed transactional fragility'}

### Baseline 3-Pillar Architecture:
- **Value Proposition:** ${scenario.baseline.productOrService} for ${scenario.baseline.targetCustomers}
- **Pricing & Revenue:** ${scenario.baseline.pricingAndRevenueModel}
- **Value Architecture:** ${scenario.baseline.mainActivitiesAndPartners} | Resources: ${scenario.baseline.keyResources}
- **Profit Equation Baseline:** Fixed costs: ${scenario.baseline.mainCosts} | Capital: ${scenario.baseline.capitalRequirements}

---

## 2. STRATEGIC LEVERS APPLIED (${selectedLevers.length} levers)
${selectedLevers
  .map(
    (l) =>
      `### ${l.name} (${l.pillar})
- **Strategic Mechanism:** ${l.summary}
- **Systemic Impact:** ${l.impactOnModel}
- **Class Reference:** ${l.relatedCaseExample}`
  )
  .join('\n\n')}

---

## 3. PROPOSED REINVENTED BUSINESS MODEL
- **Proposed Concept Name:** ${scenario.curatedRemix.name}
- **Who Benefits:** ${scenario.curatedRemix.whoBenefits}
- **What Radically Changes:** ${scenario.curatedRemix.whatChanges}
- **Value Creation Logic:** ${scenario.curatedRemix.valueCreationLogic}

### Systemic Impact Across Pillars:
1. **Value Proposition:**
   - Clients: ${scenario.curatedRemix.proposedModel.valueProposition.clients}
   - Offering: ${scenario.curatedRemix.proposedModel.valueProposition.offering}
   - Pricing Structure: ${scenario.curatedRemix.proposedModel.valueProposition.price}

2. **Value Architecture:**
   - Value Chain & Workflows: ${scenario.curatedRemix.proposedModel.valueArchitecture.valueChain}
   - Ecosystem Partners: ${scenario.curatedRemix.proposedModel.valueArchitecture.partners}
   - Key Resources & Capabilities: ${scenario.curatedRemix.proposedModel.valueArchitecture.resources}

3. **Profit Equation (Economic & Capital Realities):**
   - Revenue Dynamics: ${scenario.curatedRemix.proposedModel.profitEquation.revenueDynamics}
   - Cost Structure: ${scenario.curatedRemix.proposedModel.profitEquation.costStructure}
   - Capital Employed: ${scenario.curatedRemix.proposedModel.profitEquation.capitalEmployed}

---

## 4. REALITY CHECK & STRESS TEST
- **Customer Value Rating:** ${scenario.curatedRemix.realityCheck.customerValueScore} / 10
- **Operational Feasibility:** ${scenario.curatedRemix.realityCheck.operationalFeasibilityScore} / 10
- **Economic Viability:** ${scenario.curatedRemix.realityCheck.economicViabilityScore} / 10
- **Strategic Assessment:** ${scenario.curatedRemix.realityCheck.verdict}

### Critical Stress Questions:
${scenario.curatedRemix.realityCheck.stressQuestions.map((q) => `- ${q}`).join('\n')}

---

## 5. STUDENT STRATEGIC REFLECTION
- **Assumption Challenged:** ${customReflections.assumptionChanged || 'Identified in session'}
- **Strategic Lever Rationale:** ${customReflections.rationale || 'Selected based on diagnostic'}
- **Pillar Interactions:** ${customReflections.pillarInteractions || 'Systemic interdependencies evaluated'}
- **Testing Protocol Prior to Rollout:** ${customReflections.testingProtocol || 'Field interview and pilot prototype'}

---
*Disclaimer: Odyssey Lab is an independent pedagogical learning environment for HEC Paris students based on the Odyssey 3.14 framework by Laurence Lehmann-Ortega and Helene Musikas.*
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdownReport()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `Odyssey-Remix-Report-${scenario.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-10 my-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              Ω
            </div>
            <div>
              <h2 className="font-sans text-xl font-bold text-slate-900 tracking-tight">
                Business Model Remix Report
              </h2>
              <span className="text-xs font-mono text-indigo-600 font-semibold">
                Odyssey 3.14 · Pedagogical Output
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="mt-8 space-y-8 font-sans text-sm">
          {/* Title Area */}
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              HEC Paris · Odyssey 3.14 Strategy Case
            </span>
            <h1 className="font-sans text-3xl font-extrabold text-slate-900 tracking-tight">
              {scenario.name}: Strategic Model Remix
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Section 1: Baseline Context */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              1. Baseline Business Context & Diagnostic
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-slate-900 block font-semibold">Baseline Value Proposition:</strong>
                <p className="text-slate-600">{scenario.baseline.productOrService} for {scenario.baseline.targetCustomers}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Revenue & Pricing Model:</strong>
                <p className="text-slate-600">{scenario.baseline.pricingAndRevenueModel}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Value Architecture (Activities & Assets):</strong>
                <p className="text-slate-600">{scenario.baseline.mainActivitiesAndPartners}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Profit Equation Vulnerability:</strong>
                <p className="text-rose-600 font-medium">{diagnosticProblem || 'Vulnerable to lumpy transactional volume and high fixed overhead.'}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Strategic Levers Applied */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              2. Selected Strategic Levers ({selectedLevers.length} levers applied)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedLevers.map((lever) => (
                <div key={lever.id} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      {lever.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-semibold">{lever.pillar}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{lever.summary}</p>
                  <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                    <strong>Model Impact:</strong> {lever.impactOnModel}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <strong>Class Reference:</strong> {lever.relatedCaseExample}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Remixed Architecture */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-sans text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              3. Proposed Business Model Remake: {scenario.curatedRemix.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <span className="font-mono font-bold text-indigo-950 uppercase tracking-wider block">
                  Value Proposition
                </span>
                <p><strong>Clients:</strong> {scenario.curatedRemix.proposedModel.valueProposition.clients}</p>
                <p><strong>Offering:</strong> {scenario.curatedRemix.proposedModel.valueProposition.offering}</p>
                <p><strong>Pricing:</strong> {scenario.curatedRemix.proposedModel.valueProposition.price}</p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                <span className="font-mono font-bold text-sky-950 uppercase tracking-wider block">
                  Value Architecture
                </span>
                <p><strong>Value Chain:</strong> {scenario.curatedRemix.proposedModel.valueArchitecture.valueChain}</p>
                <p><strong>Partners:</strong> {scenario.curatedRemix.proposedModel.valueArchitecture.partners}</p>
                <p><strong>Resources:</strong> {scenario.curatedRemix.proposedModel.valueArchitecture.resources}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-mono font-bold text-emerald-950 uppercase tracking-wider block">
                  Profit Equation
                </span>
                <p><strong>Revenue:</strong> {scenario.curatedRemix.proposedModel.profitEquation.revenueDynamics}</p>
                <p><strong>Costs:</strong> {scenario.curatedRemix.proposedModel.profitEquation.costStructure}</p>
                <p><strong>Capital:</strong> {scenario.curatedRemix.proposedModel.profitEquation.capitalEmployed}</p>
              </div>
            </div>

            <div className="pt-2 text-xs space-y-1 text-slate-700">
              <p><strong>Who Benefits:</strong> {scenario.curatedRemix.whoBenefits}</p>
              <p><strong>Why Value is Created:</strong> {scenario.curatedRemix.valueCreationLogic}</p>
            </div>
          </div>

          {/* Section 4: Reality Check */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              4. Stress-Test Reality Check
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                <span className="text-xs text-indigo-700 font-semibold block">Customer Value</span>
                <span className="font-mono text-xl font-extrabold text-indigo-950">
                  {scenario.curatedRemix.realityCheck.customerValueScore} / 10
                </span>
              </div>
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl">
                <span className="text-xs text-sky-700 font-semibold block">Operational Feasibility</span>
                <span className="font-mono text-xl font-extrabold text-sky-950">
                  {scenario.curatedRemix.realityCheck.operationalFeasibilityScore} / 10
                </span>
              </div>
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-xs text-emerald-700 font-semibold block">Economic Viability</span>
                <span className="font-mono text-xl font-extrabold text-emerald-950">
                  {scenario.curatedRemix.realityCheck.economicViabilityScore} / 10
                </span>
              </div>
            </div>
            <div className="text-xs space-y-1 pt-2">
              <strong className="text-slate-900 block font-semibold">Unanswered Stress Questions:</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                {scenario.curatedRemix.realityCheck.stressQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Student Guided Reflections */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              5. Student Reflection & Testing Hypothesis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-slate-900 block font-semibold">Which assumption changed?</strong>
                <p className="text-slate-600 leading-relaxed">{customReflections.assumptionChanged || 'Shifted from believing customers only care about repair cost to valuing guaranteed uptime and zero emergency hassle.'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Why this strategic lever was chosen:</strong>
                <p className="text-slate-600 leading-relaxed">{customReflections.rationale || 'Subscription provides recurring cash flow; Ecosystem alliances provide access to existing tenant portfolios.'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Pillar interaction observed:</strong>
                <p className="text-slate-600 leading-relaxed">{customReflections.pillarInteractions || 'Offering a recurring subscription required software dispatch in Value Architecture and created negative working capital in Profit Equation.'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Testing protocol before rollout:</strong>
                <p className="text-slate-600 leading-relaxed">{customReflections.testingProtocol || 'Interview 20 property managers and offer a 60-day pilot to 30 households to measure breakdown frequency.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center text-xs text-slate-400 border-t border-slate-200 mt-8">
          Odyssey Lab · Independent Academic Student Project · HEC Paris Odyssey 3.14 Framework
        </div>
      </div>
    </div>
  );
};
