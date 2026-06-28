import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Coins,
  Wallet,
  Activity,
  HeartPulse,
  PlusCircle,
  QrCode,
  Share2,
  Users,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user, savingGoals, emergencyCampaigns, familyMembers, transactions, btcPriceUsd } = useAppStore();
  const navigate = useNavigate();

  const [showQRModal, setShowQRModal] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);

  // Math totals
  const totalSavingsLocal = savingGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalSavingsBTC = Number((totalSavingsLocal / (btcPriceUsd * 600)).toFixed(6));

  const totalBtcWallet = 0.02458; // simulated wallet balance
  const totalBtcWalletLocal = Math.round(totalBtcWallet * btcPriceUsd * 600);

  const activeCampaignsCount = emergencyCampaigns.length;

  // Recharts Data
  const savingsHistoryData = [
    { name: 'Jan', Epargne: 150000 },
    { name: 'Fév', Epargne: 220000 },
    { name: 'Mar', Epargne: 280000 },
    { name: 'Avr', Epargne: 350000 },
    { name: 'Mai', Epargne: 420000 },
    { name: 'Juin', Epargne: totalSavingsLocal },
  ];

  const trendsData = [
    { name: 'Consultations', Dépenses: 35000 },
    { name: 'Pharmacie', Dépenses: 62000 },
    { name: 'Dentaire', Dépenses: 15000 },
    { name: 'Urgences', Dépenses: 120000 },
    { name: 'Pédiatrie', Dépenses: 45000 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            Tableau de Bord
            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">Actif</span>
          </h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Bienvenue, <span className="text-white font-bold">{user?.name}</span>. Suivi intelligent de votre santé et de vos finances en Bitcoin.
          </p>
        </div>

        {/* Quick Date Display */}
        <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-850 px-3.5 py-1.5 rounded-xl">
          En direct • 25 Juin 2026
        </span>
      </div>

      {/* KYC Alert Banner */}
      {(!user?.kycStatus || user.kycStatus === 'non_verifie') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg shadow-orange-500/5"
        >
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
              <ShieldAlert size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-orange-400">Vérification de Sûreté Requise (KYC)</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-0.5 font-normal">
                Veuillez faire certifier votre identité légale. Un profil validé KYC est obligatoire pour garantir la sécurité absolue et la traçabilité des financements d'urgence.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/kyc')}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black px-4.5 py-2.5 rounded-xl transition hover:scale-105 shrink-0"
          >
            Passer le KYC
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* BALANCES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Health Savings Balance */}
        <GlassCard glowColor="orange" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px]" />
          <div className="flex justify-between items-start pb-4">
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Épargne Santé Totale</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalSavingsLocal.toLocaleString()} <span className="text-orange-400 text-lg">FCFA</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 pt-0.5 flex items-center gap-1">
                <Coins size={12} className="text-orange-500" />
                {totalSavingsBTC} BTC
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Wallet size={18} className="text-orange-400" />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-900/40 flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <TrendingUp size={12} />
              +14.2% ce mois
            </span>
            <span>3 objectifs actifs</span>
          </div>
        </GlassCard>

        {/* Card 2: Bitcoin Wallet Balance */}
        <GlassCard glowColor="orange" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px]" />
          <div className="flex justify-between items-start pb-4">
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Portefeuille Bitcoin</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalBtcWallet} <span className="text-orange-500 text-lg">BTC</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 pt-0.5 flex items-center gap-1">
                ~ {totalBtcWalletLocal.toLocaleString()} FCFA
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Coins size={18} className="text-orange-500" />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-900/40 flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              Réseau Lightning Actif
            </span>
            <span className="font-mono text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Frais ≈ 0 sat</span>
          </div>
        </GlassCard>

        {/* Card 3: Emergency Fund Status */}
        <GlassCard glowColor="orange" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px]" />
          <div className="flex justify-between items-start pb-4">
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Fonds d'Urgence Levés</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                3,640,000 <span className="text-amber-400 text-lg">FCFA</span>
              </h2>
              <p className="text-xs text-slate-400 pt-0.5">
                Sur {activeCampaignsCount} campagnes d'urgences actives
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <HeartPulse size={18} className="text-amber-400" />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-900/40 flex justify-between items-center text-xs text-slate-500">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Users size={12} />
              225 donateurs globaux
            </span>
            <span className="text-emerald-400">92% complété</span>
          </div>
        </GlassCard>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setShowAddFundsModal(true)}
          className="flex flex-col items-center justify-center p-5 bg-slate-900 border border-slate-850 hover:border-orange-500/30 rounded-2xl transition hover:scale-105 space-y-2 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
            <PlusCircle size={20} />
          </div>
          <span className="text-xs font-bold text-slate-200">Ajouter fonds</span>
        </button>

        <button
          onClick={() => navigate('/family')}
          className="flex flex-col items-center justify-center p-5 bg-slate-900 border border-slate-850 hover:border-emerald-500/30 rounded-2xl transition hover:scale-105 space-y-2 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Users size={20} />
          </div>
          <span className="text-xs font-bold text-slate-200">Aider un proche</span>
        </button>

        <button
          onClick={() => setShowQRModal(true)}
          className="flex flex-col items-center justify-center p-5 bg-slate-900 border border-slate-850 hover:border-orange-500/30 rounded-2xl transition hover:scale-105 space-y-2 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <QrCode size={20} />
          </div>
          <span className="text-xs font-bold text-slate-200">Scanner QR Code</span>
        </button>

        <button
          onClick={() => navigate('/emergency')}
          className="flex flex-col items-center justify-center p-5 bg-slate-900 border border-red-500/20 hover:border-red-500/30 rounded-2xl transition hover:scale-105 space-y-2 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
            <HeartPulse size={20} />
          </div>
          <span className="text-xs font-bold text-slate-200">Demander d'aide</span>
        </button>
      </div>

      {/* MAIN DATA GRID (CHARTS & INSIGHTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Charts (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900/60">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Évolution de l'Épargne Santé</h3>
                <p className="text-xs text-slate-500">Micro-versements et croissance du portefeuille global</p>
              </div>
              <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md font-bold">FCFA</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="Epargne" stroke="#F7931A" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900/60">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tendances d'Utilisation des Soins</h3>
                <p className="text-xs text-slate-500">Distribution de vos dépenses de santé par catégorie</p>
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-md font-mono">Annuel</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="Dépenses" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: AI Insights & Activities (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Health Insights Card */}
          <GlassCard glowColor="orange" className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[20px]" />
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-4">
              <BrainCircuit className="text-orange-400" size={18} />
              Analyses & Conseils IA
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-orange-950/20 border border-orange-500/10 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold bg-orange-500/20 px-2 py-0.5 rounded-md uppercase">Climatique</span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  "La saison des pluies d'Accra démarre en juillet. Statistiquement, les infections de paludisme de votre entourage augmentent de **42%**. Nous conseillons de garnir votre objectif **'Vaccins Kwame'** de 25 000 FCFA additionnels."
                </p>
              </div>

              <div className="p-4 bg-orange-950/10 border border-orange-500/10 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold bg-orange-500/20 px-2 py-0.5 rounded-md uppercase">Alerte Bitcoin</span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  "Le Bitcoin s'échange au-dessus de $65,000. C'est le moment idéal pour transférer 5% de vos gains en portefeuille d'épargne santé afin de figer vos bénéfices."
                </p>
              </div>

              <button
                onClick={() => navigate('/predictions')}
                className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs font-bold py-3 px-4 rounded-xl text-slate-300 transition text-center"
              >
                Voir toutes les prédictions
              </button>
            </div>
          </GlassCard>

          {/* Recent Activities */}
          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-extrabold text-white mb-4">Activités Récentes</h3>
            <div className="space-y-4">
              {transactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="flex justify-between items-start text-xs border-b border-slate-900/60 pb-3 last:border-0 last:pb-0">
                  <div className="flex gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'depot' ? 'bg-orange-500/10 text-orange-400' :
                      tx.type === 'don' ? 'bg-red-500/10 text-red-400' :
                      tx.type === 'paiement' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {tx.type === 'depot' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 truncate max-w-[140px]">{tx.description}</p>
                      <p className="text-[10px] text-slate-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'depot' || tx.type === 'reception_btc' ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {tx.type === 'depot' || tx.type === 'reception_btc' ? '+' : '-'} {tx.amount.toLocaleString()} FCFA
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">{tx.amountBTC} BTC</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* QR MODAL SIMULATION */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Scanner / Payer par QR Code</h3>
              <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 inline-block">
              <div className="w-48 h-48 bg-white rounded-xl p-3 mx-auto flex items-center justify-center">
                {/* Simulated high-quality QR Code graphic with orange and amber central dot */}
                <div className="relative w-full h-full bg-slate-950 rounded-lg flex flex-col items-center justify-center p-1 overflow-hidden">
                  <div className="grid grid-cols-4 gap-2 w-full h-full opacity-80">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`rounded ${i % 3 === 0 ? 'bg-orange-500' : i % 5 === 0 ? 'bg-amber-500' : 'bg-slate-800'}`} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-black text-orange-400">CC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-300 font-semibold">Présentez ce QR Code dans les cliniques partenaires</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Le scan de ce code déduit instantanément les frais médicaux de votre portefeuille d'épargne sans aucune intervention manuelle.
              </p>
            </div>

            <button
              onClick={() => {
                alert('Paiement d\'urgence de 45 000 FCFA simulé avec succès chez Pharmacie Ridge Accra !');
                setShowQRModal(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl transition hover:scale-105"
            >
              Simuler le scan du pharmacien
            </button>
          </div>
        </div>
      )}

      {/* ADD FUNDS MODAL */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Alimenter votre épargne santé</h3>
              <button onClick={() => setShowAddFundsModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Choisir l'objectif d'épargne</label>
                <select className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none">
                  {savingGoals.map(g => (
                    <option key={g.id} value={g.id}>{g.title} (Actuel: {g.currentAmount.toLocaleString()} FCFA)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Montant du dépôt (FCFA)</label>
                <input
                  type="number"
                  placeholder="Ex: 50000"
                  defaultValue="25000"
                  id="fund-amount-input"
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                  <Coins size={14} />
                  <span>Conversion en Bitcoin Lightning intégrée</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Votre dépôt de monnaie locale est automatiquement converti et sécurisé en satoshis à l'aide de notre partenaire de passerelle Lightning.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const val = (document.getElementById('fund-amount-input') as HTMLInputElement)?.value;
                const amt = Number(val) || 25000;
                // Add first goal as default
                const firstGoalId = savingGoals[0]?.id;
                if (firstGoalId) {
                  useAppStore.getState().addFundsToGoal(firstGoalId, amt);
                  alert(`Dépôt de ${amt.toLocaleString()} FCFA simulé et converti en Bitcoin avec succès !`);
                }
                setShowAddFundsModal(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black py-3 rounded-xl hover:scale-105 transition"
            >
              Valider le versement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
