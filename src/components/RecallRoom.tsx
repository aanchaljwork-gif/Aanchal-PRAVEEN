import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Lightbulb,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/odysseyData';

export const RecallRoom: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('odyssey_recall_answers');
      const savedScore = localStorage.getItem('odyssey_recall_score');
      if (savedAnswers) {
        setUserAnswers(JSON.parse(savedAnswers));
      }
      if (savedScore) {
        setScore(parseInt(savedScore, 10));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
  const selectedOptionId = userAnswers[currentQ?.id];

  const handleSelectOption = (optionId: string) => {
    if (showFeedback || quizCompleted) return;
    const updated = { ...userAnswers, [currentQ.id]: optionId };
    setUserAnswers(updated);
    setShowFeedback(true);

    const isCorrect = currentQ.options.find((o) => o.id === optionId)?.isCorrect;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    try {
      localStorage.setItem('odyssey_recall_answers', JSON.stringify(updated));
      localStorage.setItem('odyssey_recall_score', newScore.toString());
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setShowFeedback(Boolean(userAnswers[QUIZ_QUESTIONS[currentQuestionIdx + 1]?.id]));
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
      setShowFeedback(Boolean(userAnswers[QUIZ_QUESTIONS[currentQuestionIdx - 1]?.id]));
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setScore(0);
    setCurrentQuestionIdx(0);
    setShowFeedback(false);
    setQuizCompleted(false);
    try {
      localStorage.removeItem('odyssey_recall_answers');
      localStorage.removeItem('odyssey_recall_score');
    } catch (e) {
      console.warn('Could not clear localStorage', e);
    }
  };

  return (
    <div className="space-y-10 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-700">Active Retrieval Practice</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-emerald-900 font-bold bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded">The Recall Room</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Test Your Strategic Acumen
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mt-1 leading-relaxed">
            Questions evaluating systemic business model trade-offs rather than passive memorization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 shadow-xs font-semibold">
            Score: <strong className="font-extrabold text-emerald-700">{score}</strong> / {QUIZ_QUESTIONS.length}
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-xs hover:border-emerald-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-semibold">
          <span>Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="text-emerald-700 font-bold">{Math.round(((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-amber-400 to-teal-600 rounded-full transition-all duration-300 shadow-xs"
            style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {!quizCompleted ? (
        /* Active Question Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              {currentQ.relatedPillar}
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-semibold">
              Format: {currentQ.type.toUpperCase()}
            </span>
          </div>

          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const hasAnswered = Boolean(selectedOptionId);

              let optionStyle =
                'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30';
              if (hasAnswered) {
                if (opt.isCorrect) {
                  optionStyle = 'bg-emerald-50/80 text-emerald-950 border-emerald-400 font-semibold shadow-xs';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle = 'bg-rose-50/80 text-rose-950 border-rose-300 shadow-xs';
                } else {
                  optionStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-50';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-600 text-white border-indigo-600 shadow-sm';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl text-left border transition-all text-xs sm:text-sm flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 border ${
                    isSelected && !hasAnswered
                      ? 'bg-white text-indigo-700 border-transparent'
                      : 'bg-white text-slate-700 border-slate-200 shadow-xs'
                  }`}>
                    {opt.id.toUpperCase()}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="leading-relaxed font-medium">{opt.text}</p>
                    {hasAnswered && isSelected && (
                      <p
                        className={`text-xs pt-1 font-sans font-medium ${
                          opt.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {opt.explanation}
                      </p>
                    )}
                  </div>
                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Deep Explanatory Feedback Box */}
          {showFeedback && (
            <div className="bg-indigo-50/70 rounded-xl border border-indigo-200 p-5 space-y-2 mt-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-900 font-bold">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Pedagogical Takeaway</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                {currentQ.pedagogicalTakeaway}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 disabled:opacity-30 cursor-pointer transition-colors"
            >
              ← Previous Question
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOptionId}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 hover:from-emerald-700 hover:to-slate-800 text-amber-200 border border-amber-400/40 text-xs font-bold rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-sm"
            >
              <span>{currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Completion Summary Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center mx-auto shadow-md border border-amber-300">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
              Assessment Complete
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-slate-900">
              Your Strategic Literacy Score: {score} / {QUIZ_QUESTIONS.length}
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {score >= 4
                ? 'Excellent grasp of systemic business model trade-offs and the Odyssey 3.14 pillars.'
                : 'Good start. Review the 14 Directions Explorer to deepen your understanding of cross-pillar ripple effects.'}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 hover:from-emerald-700 hover:to-slate-800 text-amber-200 border border-amber-400/40 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Retake Active Recall Quiz
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pt-4 border-t border-slate-200">
            *Progress and spaced scores are stored in your browser's local memory.
          </div>
        </div>
      )}
    </div>
  );
};
