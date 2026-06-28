import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Sparkles, BrainCircuit, ShieldAlert, ShieldCheck, Activity, TrendingUp, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PredictionsPage: React.FC = () => {
  const { predictions } = useAppStore();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const activePrediction = predictions[selectedMonthIndex];

  // Map risk levels to visual designs
  const getRiskColor = (score: number) => {
    if (score >= 70) return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', label: 'Critique' };
    if (score >= 40) return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', label: 'Modéré' };
    return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: 'Faible' };
  };

  const riskMeta = getRiskColor(activePrediction.riskScore);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
          Prédictions Budgétaires Santé IA
        </h1>
        <p className="text-xs text-slate-400 pt-0.5">
          Notre modèle prédictif analyse les conditions météorologiques locales, l'indice d'épidémie communautaire et vos antécédents familiaux.
        </p>
      </div>

      {/* Main Grid: Graph + Predictions selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph on left (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900/60">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Prévision Dépenses vs Épargne Conseillée</h3>
                <p className="text-xs text-slate-500">Projection intelligente des 6 prochains mois (FCFA)</p>
              </div>
              <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md font-bold">Modèle IA V2</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSavingsRec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Area name="Dépenses Estimées" type="monotone" dataKey="estimatedExpense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                  <Area name="Épargne Recommandée" type="monotone" dataKey="savingsRecommended" stroke="#F7931A" strokeWidth={2} fillOpacity={1} fill="url(#colorSavingsRec)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Selected Month Details right (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monthly Insights Card */}
          <GlassCard glowColor="orange" className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[20px]" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400">Détails de Prédiction</span>
                <select
                  value={selectedMonthIndex}
                  onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none"
                >
                  {predictions.map((p, idx) => (
                    <option key={idx} value={idx}>{p.month}</option>
                  ))}
                </select>
              </div>

              <div className="pb-4 border-b border-slate-900/60">
                <h3 className="text-xl font-black text-white">{activePrediction.month} 2026</h3>
                <p className="text-xs text-slate-400 pt-0.5">Synthèse des risques et recommandations budgétaires</p>
              </div>

              {/* Risk Gauge Indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${riskMeta.border} ${riskMeta.bg} space-y-1`}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Indice de Risque IA</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-2xl font-black ${riskMeta.text}`}>{activePrediction.riskScore}%</span>
                    <span className="text-[10px] text-slate-400">({riskMeta.label})</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Conseil Épargne</p>
                  <p className="text-xs font-extrabold text-white">
                    + {activePrediction.savingsRecommended.toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              {/* Text details */}
              <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold">
                  <BrainCircuit size={14} />
                  <span>Analyse Clinique IA :</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {activePrediction.details}
                </p>
              </div>

              {/* Quick Adjustment button */}
              <button
                onClick={() => {
                  alert(`Automatisation d'épargne d'urgence ajustée à ${activePrediction.savingsRecommended.toLocaleString()} FCFA pour le mois de ${activePrediction.month} !`);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl hover:scale-105 transition"
              >
                Ajuster mon prélèvement automatique d'épargne
              </button>
            </div>
          </GlassCard>

          {/* Environmental Health Risk Card */}
          <div className="p-5 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Activity size={14} className="text-orange-400" />
              Facteurs d'Analyses pris en compte
            </h4>
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block">Indice Pluvial</span>
                <span className="text-white font-semibold">Fort (Août-Oct)</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block">Moyenne Palu</span>
                <span className="text-white font-semibold">Zone 4 (Accra)</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block">Tension Artérielle</span>
                <span className="text-white font-semibold">Stable (12/8)</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block">Âge des Enfants</span>
                <span className="text-white font-semibold">Kwame (3 ans)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
