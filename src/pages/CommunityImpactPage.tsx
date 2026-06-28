import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Globe, Heart, ShieldCheck, Activity, Users, Award, HeartHandshake } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CommunityImpactPage: React.FC = () => {
  // Animated counters state simulation
  const [livesSaved, setLivesSaved] = useState(45100);
  const [totalRaised, setTotalRaised] = useState(180400000);

  useEffect(() => {
    const livesInterval = setInterval(() => {
      setLivesSaved(prev => prev + Math.floor(Math.random() * 2));
    }, 4500);

    const fundsInterval = setInterval(() => {
      setTotalRaised(prev => prev + Math.floor(Math.random() * 5000));
    }, 3000);

    return () => {
      clearInterval(livesInterval);
      clearInterval(fundsInterval);
    };
  }, []);

  const monthlyImpactData = [
    { month: 'Jan', Fonds: 15000000, Vies: 340 },
    { month: 'Fév', Fonds: 22000000, Vies: 420 },
    { month: 'Mar', Fonds: 31000000, Vies: 510 },
    { month: 'Avr', Fonds: 38000000, Vies: 590 },
    { month: 'Mai', Fonds: 49000000, Vies: 780 },
    { month: 'Juin', Fonds: 65000000, Vies: 950 },
  ];

  return (
    <div className="space-y-8">      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
          Tableau d'Impact Communautaire
          <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">Temps Réel</span>
        </h1>
        <p className="text-xs text-slate-400 pt-0.5">
          Visualisez la force de l'entraide décentralisée à travers le continent africain.
        </p>
      </div>

      {/* Grid counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lives Saved Counter */}
        <GlassCard glowColor="orange" className="p-6 relative overflow-hidden text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto text-orange-400">
            <Heart size={22} className="animate-pulse" />
          </div>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Vies Impactées & Aidées</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">
            {livesSaved.toLocaleString()}
          </h2>
          <p className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">Mise à jour en direct (+1 toutes les 4s)</p>
        </GlassCard>

        {/* Total Funds Raised */}
        <GlassCard glowColor="orange" className="p-6 relative overflow-hidden text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto text-orange-400">
            <HeartHandshake size={22} />
          </div>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Total Fonds Levés (FCFA)</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">
            {totalRaised.toLocaleString()}
          </h2>
          <p className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">Micro-contributions en Bitcoin Lightning</p>
        </GlassCard>

        {/* Global verified partnerships count */}
        <GlassCard glowColor="amber" className="p-6 relative overflow-hidden text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto text-amber-400">
            <Globe size={22} />
          </div>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Hôpitaux & Cliniques Partenaires</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">
            42
          </h2>
          <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Répartis sur 8 pays d'Afrique subsaharienne</p>
        </GlassCard>
      </div>

      {/* Main Grid: Graph + Stats breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900/60">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Solidarité Mensuelle Réunie</h3>
                <p className="text-xs text-slate-500">Croissance des fonds de micro-solidarité cumulés (FCFA)</p>
              </div>
              <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md font-bold">2026</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyImpactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Bar name="Fonds Solidaires Reçus" dataKey="Fonds" fill="#F7931A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Stats metrics list (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-4 mb-4 border-b border-slate-900/60">Distribution Clinique d'Impact</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Paludisme & Pédiatrie</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[45%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Chirurgies d'Urgence</span>
                  <span className="text-white">30%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[30%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Soins Dentaires & Optiques</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[15%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Suivi Maternité & Accouchements</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[10%]" />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Verification ethics banner */}
          <div className="p-5 bg-slate-900 border border-slate-850 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
              <Award size={14} />
              <span>Transparence & Traçabilité Blockchain</span>
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Toutes les collectes de fonds d'urgence CareChain AI sont directement traçables sur la blockchain Bitcoin. 100% des dons collectés sont alloués aux cliniques de soin partenaires, sans aucun frais d'administration ou prélèvements tiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
