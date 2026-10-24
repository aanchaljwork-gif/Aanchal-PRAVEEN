import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Award,
  Layers,
  Cpu,
  Coins,
  RefreshCw,
} from 'lucide-react';
import {
  DIRECTIONS,
  WORDLE_WORDS,
  SPIN_CHALLENGES,
  SYNERGY_TRIOS,
  WordleWord,
  SpinChallenge,
  SynergyTrio,
} from '../data/odysseyData';
import {
  playClick,
  playTick,
  playSuccessChime,
  playErrorTone,
  toggleSound,
  isSoundEnabled,
} from '../utils/soundEffects';

interface InnovationArcadeProps {
  onNavigateToCase?: (caseId: string) => void;
  onNavigateToRemix?: () => void;
}

export const InnovationArcade: React.FC<InnovationArcadeProps> = ({
  onNavigateToCase,
  onNavigateToRemix,
}) => {
  const [activeGame, setActiveGame] = useState<'wheel' | 'wordle' | 'synergy'>('wheel');
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [strategicXp, setStrategicXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Load XP from localStorage
  useEffect(() => {
    try {
      const savedXp = localStorage.getItem('odyssey_strategic_xp');
      const savedStreak = localStorage.getItem('odyssey_strategic_streak');
      if (savedXp) setStrategicXp(parseInt(savedXp, 10));
      if (savedStreak) setStreak(parseInt(savedStreak, 10));
    } catch (e) {
      // Ignore
    }
  }, []);

  const addXp = (amount: number) => {
    setStrategicXp((prev) => {
      const updated = prev + amount;
      try {
        localStorage.setItem('odyssey_strategic_xp', updated.toString());
      } catch (e) {
        // Ignore
      }
      return updated;
    });
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem('odyssey_strategic_streak', updated.toString());
      } catch (e) {
        // Ignore
      }
      return updated;
    });
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const getRank = (xp: number) => {
    if (xp >= 600) return { title: 'Master Odyssey Architect', color: 'text-amber-400' };
    if (xp >= 250) return { title: 'Business Model Disruptor', color: 'text-emerald-400' };
    return { title: 'Apprentice Strategist', color: 'text-indigo-300' };
  };

  const currentRank = getRank(strategicXp);

  return (
    <div className="space-y-10 pb-24">
      {/* Top Arcade Status Bar (Creative Green & Gold) */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Strategy Playground</span>
            <span className="text-emerald-700">·</span>
            <span>Active Learning Arcade</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Innovation Arcade
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Gamify your understanding of the 14 directions, three pillars, and classroom cases through active strategic challenges.
          </p>
        </div>

        {/* Score & Streak Island */}
        <div className="flex items-center gap-4 bg-black/50 border border-amber-500/30 px-5 py-3 rounded-2xl shrink-0 self-start md:self-auto shadow-inner relative z-10">
          <div className="text-center px-2">
            <span className="text-[10px] font-mono uppercase text-amber-300 block font-bold">Strategic XP</span>
            <span className="font-mono text-2xl font-extrabold text-amber-400">{strategicXp}</span>
          </div>
          <div className="h-8 w-px bg-emerald-800/60" />
          <div className="text-center px-2">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-rose-400 font-bold">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Streak</span>
            </div>
            <span className="font-mono text-2xl font-extrabold text-white">{streak}</span>
          </div>
          <div className="h-8 w-px bg-emerald-800/60" />
          <div className="text-left px-2">
            <span className="text-[10px] font-mono uppercase text-emerald-300 block font-bold">Rank</span>
            <span className={`text-xs font-sans font-extrabold ${currentRank.color}`}>{currentRank.title}</span>
          </div>
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="ml-2 p-2 hover:bg-white/10 rounded-xl text-amber-200 hover:text-white transition-colors cursor-pointer border border-amber-400/20"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-3 border-b border-slate-200 pb-4 overflow-x-auto text-sm font-medium">
        <button
          onClick={() => {
            playClick();
            setActiveGame('wheel');
          }}
          className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeGame === 'wheel'
              ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-200 border border-amber-400/50 font-bold shadow-md shadow-emerald-950/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 shadow-xs'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Spin the Wheel of Disruption</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveGame('wordle');
          }}
          className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeGame === 'wordle'
              ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-200 border border-amber-400/50 font-bold shadow-md shadow-emerald-950/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 shadow-xs'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Termle: Business Model Wordle</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveGame('synergy');
          }}
          className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeGame === 'synergy'
              ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-200 border border-amber-400/50 font-bold shadow-md shadow-emerald-950/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 shadow-xs'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>3-Pillar Synergy Match</span>
        </button>
      </div>

      {/* GAME 1: SPIN THE WHEEL OF DISRUPTION */}
      {activeGame === 'wheel' && (
        <WheelOfDisruptionGame onAddXp={addXp} onIncrementStreak={incrementStreak} />
      )}

      {/* GAME 2: TERMLE (WORDLE) */}
      {activeGame === 'wordle' && (
        <WordleInnovationGame onAddXp={addXp} onIncrementStreak={incrementStreak} />
      )}

      {/* GAME 3: 3-PILLAR SYNERGY CARD MATCH */}
      {activeGame === 'synergy' && (
        <SynergyCardMatchGame onAddXp={addXp} onIncrementStreak={incrementStreak} />
      )}
    </div>
  );
};

// ==========================================
// SUB-GAME 1: SPIN THE WHEEL OF DISRUPTION
// ==========================================
interface SubGameProps {
  onAddXp: (amount: number) => void;
  onIncrementStreak: () => void;
}

const WheelOfDisruptionGame: React.FC<SubGameProps> = ({ onAddXp, onIncrementStreak }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<SpinChallenge | null>(null);
  const [userSelectedOptionId, setUserSelectedOptionId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // 14 Directions labels for wheel segments
  const directionsList = DIRECTIONS;
  const numSegments = directionsList.length;
  const segmentAngle = 360 / numSegments;

  const spinWheel = () => {
    if (isSpinning) return;
    playClick();
    setIsSpinning(true);
    setUserSelectedOptionId(null);
    setShowResult(false);
    setSelectedChallenge(null);

    // Pick random challenge
    const challengeIndex = Math.floor(Math.random() * SPIN_CHALLENGES.length);
    const targetChallenge = SPIN_CHALLENGES[challengeIndex];
    const targetDirectionId = targetChallenge.directionId;

    // Find target angle
    const targetSliceIndex = directionsList.findIndex((d) => d.id === targetDirectionId);
    const targetSliceCenter = targetSliceIndex * segmentAngle + segmentAngle / 2;

    // Extra spins (4 to 6 full rotations)
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 2));
    const finalRotation = rotation + extraSpins + (360 - (targetSliceCenter % 360));

    // Audio tick interval
    let tickCount = 0;
    const interval = setInterval(() => {
      playTick();
      tickCount++;
      if (tickCount > 25) clearInterval(interval);
    }, 120);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedChallenge(targetChallenge);
      playSuccessChime();
    }, 3200);
  };

  const handleSelectOption = (optId: string) => {
    if (showResult) return;
    setUserSelectedOptionId(optId);
    setShowResult(true);

    const opt = selectedChallenge?.options.find((o) => o.id === optId);
    if (opt?.isOptimal) {
      playSuccessChime();
      onAddXp(opt.xp);
      onIncrementStreak();
    } else {
      playErrorTone();
      onAddXp(opt?.xp || 10);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      {/* Left: The Wheel Visualizer */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
          {/* Wheel Pointer Pin */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-lg filter" />

          {/* SVG Rotating Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-slate-900 shadow-2xl overflow-hidden transition-transform duration-[3200ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {directionsList.map((dir, idx) => {
                const startAngle = idx * segmentAngle;
                const endAngle = (idx + 1) * segmentAngle;

                const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                const festiveColors = [
                  '#4F46E5', // Indigo
                  '#0284C7', // Sky
                  '#059669', // Emerald
                  '#D97706', // Amber
                  '#E11D48', // Rose
                  '#7C3AED', // Violet
                  '#0D9488', // Teal
                  '#2563EB', // Blue
                  '#EA580C', // Orange
                  '#C026D3', // Fuchsia
                  '#65A30D', // Lime
                  '#9333EA', // Purple
                  '#0891B2', // Cyan
                  '#DB2777', // Pink
                ];

                const fillColor = festiveColors[idx % festiveColors.length];

                const midAngle = startAngle + segmentAngle / 2;
                const tx = 50 + 34 * Math.cos((Math.PI * (midAngle - 90)) / 180);
                const ty = 50 + 34 * Math.sin((Math.PI * (midAngle - 90)) / 180);

                return (
                  <g key={dir.id}>
                    <path d={pathData} fill={fillColor} stroke="#FFFFFF" strokeWidth="0.6" />
                    <text
                      x={tx}
                      y={ty}
                      fill="#FFFFFF"
                      fontSize="3.8"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${tx}, ${ty})`}
                    >
                      D{dir.id}
                    </text>
                  </g>
                );
              })}
              {/* Center Hub */}
              <circle cx="50" cy="50" r="11" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x="50"
                y="50"
                fill="#FBBF24"
                fontSize="5.5"
                fontFamily="Playfair Display"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Ω
              </text>
            </svg>
          </div>
        </div>

        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Wheel Spinning...' : 'Spin the Wheel of Disruption'}</span>
        </button>
      </div>

      {/* Right: Challenge Dilemma Card */}
      <div className="lg:col-span-7">
        {!selectedChallenge ? (
          <div className="p-8 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-center space-y-3">
            <Compass className="w-10 h-10 text-indigo-600 mx-auto opacity-80 animate-pulse" />
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Awaiting Your Next Strategic Challenge
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Click the spin button to land on one of the 14 directions. You will be challenged to resolve a real-world business model dilemma under authentic economic constraints.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200/80">
                {selectedChallenge.directionName}
              </span>
              <span className="text-[11px] font-mono text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                +150 Max XP
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-500 uppercase font-mono block">Baseline Dilemma</span>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                {selectedChallenge.businessScenario}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedChallenge.prompt}
              </p>
            </div>

            {/* Options list */}
            <div className="space-y-3 pt-2">
              {selectedChallenge.options.map((opt) => {
                const isSelected = userSelectedOptionId === opt.id;
                let cardStyle = 'bg-slate-50/70 border-slate-200/80 hover:border-indigo-400 hover:bg-white text-slate-800 shadow-xs';

                if (showResult) {
                  if (opt.isOptimal) {
                    cardStyle = 'bg-emerald-50/90 border-emerald-400 text-emerald-950 ring-2 ring-emerald-200 shadow-sm';
                  } else if (isSelected && !opt.isOptimal) {
                    cardStyle = 'bg-rose-50/90 border-rose-400 text-rose-950 ring-2 ring-rose-200 shadow-sm';
                  } else {
                    cardStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-500';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold">{opt.label}</span>
                      {showResult && opt.isOptimal && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {showResult && isSelected && !opt.isOptimal && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{opt.actionDescription}</p>

                    {showResult && isSelected && (
                      <div className="pt-2 text-xs border-t border-current/20 space-y-1">
                        <p className="font-semibold">{opt.feedback}</p>
                        <div className="font-mono text-[11px] font-bold text-indigo-700">ROCE Impact: {opt.roceImpact}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {showResult && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={spinWheel}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
                >
                  Spin Again for Another Direction →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// SUB-GAME 2: TERMLE (BUSINESS MODEL WORDLE)
// ==========================================
const WordleInnovationGame: React.FC<SubGameProps> = ({ onAddXp, onIncrementStreak }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const currentWordObj = WORDLE_WORDS[targetIndex];
  const targetWord = currentWordObj.word;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const maxAttempts = 6;

  const handleKeyPress = (letter: string) => {
    if (isGameOver) return;
    if (letter === 'ENTER') {
      if (currentGuess.length === 5) {
        submitGuess();
      } else {
        playErrorTone();
      }
      return;
    }
    if (letter === 'BACKSPACE') {
      playClick();
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (currentGuess.length < 5) {
      playClick();
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const submitGuess = () => {
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setIsWon(true);
      setIsGameOver(true);
      playSuccessChime();
      onAddXp(200);
      onIncrementStreak();
    } else if (newGuesses.length >= maxAttempts) {
      setIsGameOver(true);
      playErrorTone();
      onAddXp(20);
    } else {
      playClick();
    }
    setCurrentGuess('');
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        handleKeyPress('ENTER');
      } else if (key === 'BACKSPACE') {
        handleKeyPress('BACKSPACE');
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver, guesses]);

  const nextWord = () => {
    playClick();
    setTargetIndex((prev) => (prev + 1) % WORDLE_WORDS.length);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setIsWon(false);
    setHintShown(false);
  };

  // Compute key letter statuses
  const getLetterStatus = (letter: string) => {
    let status = 'default';
    guesses.forEach((g) => {
      for (let i = 0; i < 5; i++) {
        if (g[i] === letter) {
          if (targetWord[i] === letter) {
            status = 'correct';
          } else if (targetWord.includes(letter) && status !== 'correct') {
            status = 'present';
          } else if (status === 'default') {
            status = 'absent';
          }
        }
      }
    });
    return status;
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8 max-w-xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono uppercase text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
            Word {targetIndex + 1} of {WORDLE_WORDS.length}
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">Termle: Strategic Wordle</h2>
        </div>
        <button
          onClick={() => setHintShown(!hintShown)}
          className="text-xs font-mono text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 cursor-pointer transition-colors"
        >
          {hintShown ? 'Hide Hint' : 'Reveal Hint'}
        </button>
      </div>

      {hintShown && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
          <strong>Strategic Hint:</strong> {currentWordObj.hint}
        </div>
      )}

      {/* Wordle Grid (6 rows x 5 letters) */}
      <div className="grid grid-rows-6 gap-2 max-w-[280px] mx-auto">
        {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length;

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((__, colIndex) => {
                let letter = '';
                let tileClass = 'bg-white border-slate-200 text-slate-800';

                if (guess) {
                  letter = guess[colIndex] || '';
                  if (targetWord[colIndex] === letter) {
                    tileClass = 'bg-emerald-500 border-emerald-600 text-white shadow-sm shadow-emerald-500/20';
                  } else if (targetWord.includes(letter)) {
                    tileClass = 'bg-amber-500 border-amber-600 text-white shadow-sm shadow-amber-500/20';
                  } else {
                    tileClass = 'bg-slate-400 border-slate-500 text-white';
                  }
                } else if (isCurrentRow) {
                  letter = currentGuess[colIndex] || '';
                  if (letter) {
                    tileClass = 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-200 text-indigo-950 font-bold';
                  }
                }

                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-lg select-none transition-all ${tileClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Won / Game Over Insight Card */}
      {isGameOver && (
        <div
          className={`p-5 rounded-xl border text-xs space-y-2 animate-in fade-in duration-300 ${
            isWon ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span className="text-sm">{isWon ? 'Strategic Mastermind! Word Decoded.' : `Word was: ${targetWord}`}</span>
            <span className="bg-white/80 px-2 py-0.5 rounded font-mono font-bold">{isWon ? '+200 XP' : '+20 XP'}</span>
          </div>
          <p className="leading-relaxed text-slate-700">
            <strong className="text-slate-900">Odyssey 3.14 Lesson:</strong> {currentWordObj.strategicMeaning}
          </p>
          <p className="text-[11px] text-indigo-700 pt-1 font-semibold">
            <strong>Framework Reference:</strong> {currentWordObj.relatedCaseOrDirection}
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={nextWord}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-xs font-semibold hover:from-indigo-500 hover:to-violet-500 shadow-xs cursor-pointer"
            >
              Play Next Strategic Word →
            </button>
          </div>
        </div>
      )}

      {/* On-screen Virtual Keyboard */}
      <div className="space-y-1.5 pt-2">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5">
            {row.map((k) => {
              const status = getLetterStatus(k);
              let btnClass = 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs';

              if (status === 'correct') {
                btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-sm shadow-emerald-500/20';
              } else if (status === 'present') {
                btnClass = 'bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-500/20';
              } else if (status === 'absent') {
                btnClass = 'bg-slate-300 text-slate-500 border-slate-300 opacity-60';
              }

              return (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className={`h-10 px-2 sm:px-3 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${btnClass} ${
                    k === 'ENTER' || k === 'BACKSPACE' ? 'text-[10px] px-2.5 font-sans font-bold' : ''
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// SUB-GAME 3: 3-PILLAR SYNERGY CARD MATCH
// ==========================================
const SynergyCardMatchGame: React.FC<SubGameProps> = ({ onAddXp, onIncrementStreak }) => {
  const [selectedVp, setSelectedVp] = useState<string | null>(null);
  const [selectedVa, setSelectedVa] = useState<string | null>(null);
  const [selectedPe, setSelectedPe] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<{ isMatch: boolean; text: string } | null>(null);

  const trios = SYNERGY_TRIOS;

  const handleSelectVp = (id: string) => {
    if (matchedIds.includes(id)) return;
    playClick();
    setSelectedVp(id);
    checkMatch(id, selectedVa, selectedPe);
  };

  const handleSelectVa = (id: string) => {
    if (matchedIds.includes(id)) return;
    playClick();
    setSelectedVa(id);
    checkMatch(selectedVp, id, selectedPe);
  };

  const handleSelectPe = (id: string) => {
    if (matchedIds.includes(id)) return;
    playClick();
    setSelectedPe(id);
    checkMatch(selectedVp, selectedVa, id);
  };

  const checkMatch = (vp: string | null, va: string | null, pe: string | null) => {
    if (vp && va && pe) {
      if (vp === va && va === pe) {
        // Correct synergy trio!
        playSuccessChime();
        setMatchedIds((prev) => [...prev, vp]);
        const matchedTrio = trios.find((t) => t.id === vp);
        setFeedbackMsg({
          isMatch: true,
          text: `Architectural Synergy Achieved! ${matchedTrio?.takeaway}`,
        });
        onAddXp(180);
        onIncrementStreak();
        setSelectedVp(null);
        setSelectedVa(null);
        setSelectedPe(null);
      } else {
        // Incompatible mismatch
        playErrorTone();
        setFeedbackMsg({
          isMatch: false,
          text: 'Systemic Breakdown! This combination fails because the operational Value Architecture cannot support the Value Proposition promise, causing margin collapse.',
        });
        setTimeout(() => {
          setSelectedVp(null);
          setSelectedVa(null);
          setSelectedPe(null);
        }, 1200);
      }
    }
  };

  const resetSynergies = () => {
    playClick();
    setMatchedIds([]);
    setSelectedVp(null);
    setSelectedVa(null);
    setSelectedPe(null);
    setFeedbackMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-mono uppercase text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded">Systemic Architecture Puzzle</span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">3-Pillar Synergy Match</h2>
          <p className="text-xs text-slate-600 mt-1">
            Select 1 card from each pillar to assemble a viable, coherent business model architecture.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 font-bold text-indigo-800">
            Synergies Locked: {matchedIds.length} / {trios.length}
          </span>
          <button
            onClick={resetSynergies}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 border border-slate-200 cursor-pointer transition-colors"
            title="Reset Game"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-xs space-y-1 animate-in fade-in duration-200 ${
            feedbackMsg.isMatch ? 'bg-emerald-50 border border-emerald-300 text-emerald-950' : 'bg-rose-50 border border-rose-300 text-rose-950'
          }`}
        >
          <strong className="block font-bold text-sm">{feedbackMsg.isMatch ? '✓ Perfect Architectural Fit (+180 XP)' : '✕ Incompatible Architecture'}</strong>
          <p className="leading-relaxed">{feedbackMsg.text}</p>
        </div>
      )}

      {/* 3 Pillars Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Column 1: Value Proposition */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
            <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-sm font-bold text-indigo-950">1. Value Proposition</h3>
          </div>
          <div className="space-y-2.5">
            {trios.map((t) => {
              const isMatched = matchedIds.includes(t.id);
              const isSelected = selectedVp === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectVp(t.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isMatched
                      ? 'bg-slate-100 border-slate-200 opacity-40 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-indigo-50/40 text-slate-800 border-indigo-100 hover:border-indigo-300 hover:bg-white shadow-xs'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase font-bold block ${isSelected ? 'text-indigo-200' : 'text-indigo-600'}`}>{t.theme}</span>
                  <p className="leading-relaxed">{t.vpCard.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Value Architecture */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-sky-100">
            <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-sm font-bold text-sky-950">2. Value Architecture</h3>
          </div>
          <div className="space-y-2.5">
            {[trios[1], trios[2], trios[0]].map((t) => {
              const isMatched = matchedIds.includes(t.id);
              const isSelected = selectedVa === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectVa(t.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isMatched
                      ? 'bg-slate-100 border-slate-200 opacity-40 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-br from-sky-600 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-500/20'
                      : 'bg-sky-50/40 text-slate-800 border-sky-100 hover:border-sky-300 hover:bg-white shadow-xs'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase font-bold block ${isSelected ? 'text-sky-200' : 'text-sky-600'}`}>{t.theme}</span>
                  <p className="leading-relaxed">{t.vaCard.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Profit Equation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
            <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-sm font-bold text-emerald-950">3. Profit Equation</h3>
          </div>
          <div className="space-y-2.5">
            {[trios[2], trios[0], trios[1]].map((t) => {
              const isMatched = matchedIds.includes(t.id);
              const isSelected = selectedPe === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectPe(t.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isMatched
                      ? 'bg-slate-100 border-slate-200 opacity-40 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-50/40 text-slate-800 border-emerald-100 hover:border-emerald-300 hover:bg-white shadow-xs'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase font-bold block ${isSelected ? 'text-emerald-200' : 'text-emerald-600'}`}>{t.theme}</span>
                  <p className="leading-relaxed">{t.peCard.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
