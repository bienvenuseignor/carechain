import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Send, Sparkles, BrainCircuit, ShieldAlert, HeartPulse, Stethoscope, ChevronRight } from 'lucide-react';

export const AIChatPage: React.FC = () => {
  const { chatHistory, sendChatMessage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: "Quels sont les symptômes et remèdes du paludisme ?", icon: Stethoscope },
    { text: "Comment épargner efficacement en Bitcoin ?", icon: BrainCircuit },
    { text: "Quels conseils de nutrition pour l'hypertension ?", icon: HeartPulse },
    { text: "Quelles sont les épidémies courantes en saison des pluies ?", icon: ShieldAlert },
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    sendChatMessage(text);
    setInputText('');
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Title */}
      <div className="shrink-0">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
          Assistant de Santé IA CareChain
          <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">Beta Clinique</span>
        </h1>
        <p className="text-xs text-slate-400 pt-0.5">
          Obtenez des réponses cliniques préliminaires, configurez des rappels d'ordonnance et gérez vos budgets de soins.
        </p>
      </div>

      {/* Main Grid: Chat body + sidebar */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chat Body (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/30 border border-slate-900 rounded-3xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {chatHistory.map((msg) => {
              const isBot = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                      <BrainCircuit size={16} />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[85%]">
                    <div className={`rounded-2xl px-4 py-3.5 text-xs leading-relaxed font-normal ${
                      isBot
                        ? 'bg-slate-900 border border-slate-850 text-slate-200'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-lg shadow-orange-500/10'
                    }`}>
                      {/* Parse bold headers or bullet points in markdown simply for display */}
                      {msg.content.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-1.5 last:mb-0">
                          {line.startsWith('**') ? (
                            <span className="font-extrabold text-white block pb-1">{line.replace(/\*\*/g, '')}</span>
                          ) : line.startsWith('-') ? (
                            <span className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-orange-400">{line.substring(1).trim()}</span>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                    <span className={`text-[9px] text-slate-500 block ${!isBot ? 'text-right' : ''}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick suggestions if history is small */}
          {chatHistory.length <= 1 && (
            <div className="px-6 pb-4 pt-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Prompts recommandés :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestedPrompts.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.text)}
                      className="bg-slate-950 border border-slate-850 hover:border-orange-500/20 text-slate-300 text-left p-3 rounded-xl transition hover:bg-slate-900 flex items-center justify-between text-xs font-semibold group"
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={14} className="text-orange-400 shrink-0" />
                        <span className="line-clamp-1">{p.text}</span>
                      </span>
                      <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-1 transition" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input control box */}
          <div className="p-4 border-t border-slate-900/60 bg-slate-950/40 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2.5"
            >
              <input
                type="text"
                placeholder="Posez une question sur le paludisme, les ordonnances ou l'épargne..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 outline-none transition"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 rounded-xl transition-all duration-200"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Insights & Disclaimers (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard glowColor="orange" className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-orange-400" />
              Intelligence Médicale
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Notre moteur d'IA clinique est optimisé pour les pathologies récurrentes d'Afrique subsaharienne. Il prend en compte :
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold shrink-0">•</span>
                <span>Climats saisonniers (Saison des pluies vs Harmattan)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold shrink-0">•</span>
                <span>Analyse d'ordonnance et de tarification médicale</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold shrink-0">•</span>
                <span>Calcul des tendances budgétaires de soins familiaux</span>
              </li>
            </ul>
          </GlassCard>

          <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
              <span>⚠️ Avertissement d'Usage Clinique</span>
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              L'Assistant de Santé IA CareChain AI fournit des conseils de premier niveau basés sur des protocoles médicaux simulés. Il ne se substitue pas à une consultation clinique, à un diagnostic ou à une prescription rédigée par un médecin agréé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
