import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  ChevronUp,
  ChevronDown,
  Compass,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  timestamp: string;
}

interface OdysseyCoachBarProps {
  externalContext?: any;
}

export const OdysseyCoachBar: React.FC<OdysseyCoachBarProps> = ({ externalContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your **Odyssey Coach**. I am here to help you think through business model innovation rather than just give you pre-packaged answers.

You can ask me to:
- Challenge a proposed business model and stress-test its assumptions.
- Compare classroom cases (e.g. Blinkit vs Zomato, or Zipcar vs BMW Rent-A-Car).
- Explore how changing a Value Proposition triggers ripples in the Profit Equation.
- Test frugal innovation or access-over-ownership principles.

What business challenge or case are you exploring today?`,
      source: 'odyssey-coach',
      timestamp: 'Now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: externalContext,
        }),
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || 'I could not generate an answer. Please try again.',
        source: data.source,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Coach API call failed:', err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I encountered a momentary connection issue. Let's think through this together:

In the Odyssey 3.14 framework, remember that every change to the **Value Proposition** (who buys and at what price) requires corresponding support in the **Value Architecture** (activities, competencies, partners) and must be tested in the **Profit Equation** (revenues, costs, capital employed).

What specific direction or scenario were you looking to examine?`,
        source: 'local-fallback',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const suggestionPills = [
    'How could a repair shop rethink its business model?',
    'What did we learn from Blinkit dark stores?',
    'Explain how Frugal Innovation alters ROCE',
    'Compare Zipcar vs BMW DriveNow mobility models',
  ];

  return (
    <>
      {/* EXPANDED CHAT PANEL */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-8 z-50 w-[94vw] sm:w-[460px] h-[520px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Top Panel Bar */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white px-4 py-3 flex items-center justify-between shrink-0 border-b border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs shadow-xs">
                Ω
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold leading-none text-white">
                  Odyssey Coach
                </h3>
                <span className="text-[10px] text-amber-300 font-mono font-medium">
                  Socratic Business Model Mentor
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome',
                      role: 'assistant',
                      content: 'Conversation reset. What strategic challenge shall we tackle next?',
                      timestamp: 'Now',
                    },
                  ])
                }
                title="Reset conversation"
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Banner if active */}
          {externalContext?.business && (
            <div className="bg-emerald-50 px-4 py-1.5 border-b border-emerald-100 text-[11px] text-emerald-950 font-mono flex items-center justify-between">
              <span>Active context: <strong>{externalContext.business}</strong></span>
              <span className="text-[10px] text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">{externalContext.levers?.length ? `${externalContext.levers.length} Levers` : 'Business Model Focus'}</span>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-amber-100 border border-amber-400/30 rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <div className="prose prose-xs max-w-none text-xs leading-relaxed">
                    {m.content.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                  {m.role === 'assistant' && m.source ? `${m.source} · ` : ''}
                  {m.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-white p-3 rounded-xl border border-emerald-200 w-fit shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>Odyssey Coach is evaluating strategic trade-offs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestionPills.map((pill, i) => (
              <button
                key={i}
                onClick={() => handleSend(pill)}
                className="text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Odyssey Coach..."
              className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-800 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 hover:from-emerald-600 hover:to-slate-800 disabled:opacity-40 text-amber-200 border border-amber-400/40 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PERSISTENT BOTTOM-ANCHORED SEARCH / CHAT BAR (Green & Gold) */}
      <aside aria-label="Odyssey Coach Assistant" className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none no-print">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-amber-500/30 flex items-center justify-between gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2.5 pl-2 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold leading-none text-white">
                  Ask Odyssey Coach
                </span>
                <span className="text-[10px] text-amber-200/80 font-mono mt-0.5 hidden sm:inline">
                  Try "How could a repair shop rethink its business model?"
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 rounded-xl transition-all cursor-pointer"
              >
                <span>{isOpen ? 'Minimize' : 'Open Coach'}</span>
                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-amber-300" /> : <ChevronUp className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
