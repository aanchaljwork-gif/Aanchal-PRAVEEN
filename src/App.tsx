/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { DirectionsCompassSection } from './components/DirectionsCompassSection';
import { CaseLibrarySection } from './components/CaseLibrarySection';
import { OdysseyStudioSection, StudioSubMode } from './components/OdysseyStudioSection';
import { ReflectionSection } from './components/ReflectionSection';
import { OdysseyCoachBar } from './components/OdysseyCoachBar';
import { Footer } from './components/Footer';
import { BusinessCase, Direction } from './data/odysseyData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [studioSubMode, setStudioSubMode] = useState<StudioSubMode>('remix');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('repair-shop');
  const [coachContext, setCoachContext] = useState<any>({
    business: 'Neighbourhood Repair Shop',
    levers: ['recurring-subscription', 'ecosystem-partnerships'],
    issue: 'Lumpy transactional cash flow',
  });

  const handleEnterLab = (scenarioId?: string) => {
    if (scenarioId) {
      setSelectedScenarioId(scenarioId);
    }
    setStudioSubMode('remix');
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreDirections = () => {
    setActiveTab('directions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCases = () => {
    setActiveTab('cases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterArcade = () => {
    setStudioSubMode('arcade');
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReflection = () => {
    setActiveTab('reflection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseForRemix = (caseId: string) => {
    setStudioSubMode('remix');
    setActiveTab('studio');
    setCoachContext({
      business: caseId,
      issue: `Remixing business architecture inspired by ${caseId}`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDirectionForRemix = (directionId: number) => {
    setStudioSubMode('remix');
    setActiveTab('studio');
    setCoachContext({
      business: `Exploration of Direction ${directionId}`,
      issue: `Applying Direction ${directionId} across the 3 pillars`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskCoachAboutCase = (caseItem: BusinessCase) => {
    setCoachContext({
      business: caseItem.name,
      issue: `${caseItem.sector}: ${caseItem.keyInnovationMechanism}`,
      caseSummary: caseItem.summary,
    });
  };

  const handleAskCoachAboutDirection = (direction: Direction) => {
    setCoachContext({
      business: `Direction ${direction.id}: ${direction.name}`,
      issue: `Strategic mechanism: ${direction.strategicMechanism}`,
    });
  };

  const handleAskCoachAboutRemix = (context: any) => {
    setCoachContext(context);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF8] text-slate-900 font-sans antialiased selection:bg-amber-300 selection:text-emerald-950">
      {/* 3-Zone Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeSection
            onEnterLab={handleEnterLab}
            onExploreCases={handleExploreCases}
            onExploreDirections={handleExploreDirections}
            onEnterArcade={handleEnterArcade}
            onOpenReflection={handleOpenReflection}
          />
        )}

        {activeTab === 'directions' && (
          <DirectionsCompassSection
            onSelectDirectionForRemix={handleSelectDirectionForRemix}
            onAskCoachAboutDirection={handleAskCoachAboutDirection}
          />
        )}

        {activeTab === 'cases' && (
          <CaseLibrarySection
            onSelectCaseForRemix={handleSelectCaseForRemix}
            onAskCoachAboutCase={handleAskCoachAboutCase}
          />
        )}

        {(activeTab === 'studio' || activeTab === 'remix-lab' || activeTab === 'arcade' || activeTab === 'recall') && (
          <OdysseyStudioSection
            subMode={
              activeTab === 'arcade'
                ? 'arcade'
                : activeTab === 'recall'
                ? 'recall'
                : studioSubMode
            }
            onSubModeChange={(mode) => {
              setStudioSubMode(mode);
              setActiveTab('studio');
            }}
            initialScenarioId={selectedScenarioId}
            onAskCoachAboutRemix={handleAskCoachAboutRemix}
            onNavigateToCase={(caseId) => {
              setActiveTab('cases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'reflection' && <ReflectionSection />}
      </main>

      {/* Consolidated Footer */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'arcade' || tab === 'remix-lab' || tab === 'recall') {
            setActiveTab('studio');
            setStudioSubMode(tab === 'arcade' ? 'arcade' : tab === 'recall' ? 'recall' : 'remix');
          } else {
            setActiveTab(tab);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Persistent Bottom-Anchored Odyssey Coach Bar */}
      <OdysseyCoachBar externalContext={coachContext} />
    </div>
  );
}
