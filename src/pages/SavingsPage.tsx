import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Plus, Goal, Calendar, CheckCircle2, AlertTriangle, Sparkles, PlusCircle } from 'lucide-react';
import { SavingGoal } from '../types';

export const SavingsPage: React.FC = () => {
  const { savingGoals, addSavingGoal, addFundsToGoal } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  // New goal form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState<SavingGoal['category']>('Consultation');

  const [fundAmount, setFundAmount] = useState('25000');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount || !deadline) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    addSavingGoal({
      title,
      description,
      targetAmount: Number(targetAmount),
      deadline,
      category,
    });

    // Reset form & close modal
    setTitle('');
    setDescription('');
    setTargetAmount('');
    setDeadline('');
    setCategory('Consultation');
    setShowCreateModal(false);
    alert('Objectif d\'épargne créé avec succès ! Notre IA l\'analysera sous peu.');
  };

  const handleAddFunds = () => {
    if (!selectedGoalId || !fundAmount) {
      alert('Sélectionnez un objectif et indiquez un montant valide.');
      return;
    }

    addFundsToGoal(selectedGoalId, Number(fundAmount));
    setShowAddModal(false);
    alert(`Versement de ${Number(fundAmount).toLocaleString()} FCFA converti et affecté avec succès !`);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            Portefeuille d'Épargne Santé
          </h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Épargnez à votre rythme à l'abri de l'inflation grâce au Bitcoin et planifiez vos interventions médicales.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (savingGoals.length > 0) {
                setSelectedGoalId(savingGoals[0].id);
                setShowAddModal(true);
              } else {
                alert('Veuillez d\'abord créer un objectif d\'épargne.');
              }
            }}
            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-orange-400 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <PlusCircle size={15} />
            Alimenter
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2 shadow-lg shadow-orange-500/10"
          >
            <Plus size={15} />
            Nouvel Objectif
          </button>
        </div>
      </div>

      {/* Grid: Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingGoals.map((goal) => {
          const progressPercent = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
          const isCompleted = progressPercent >= 100;

          return (
            <GlassCard
              key={goal.id}
              glowColor={isCompleted ? 'orange' : 'none'}
              className="p-6 flex flex-col justify-between h-full border-slate-850"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider font-bold">
                      {goal.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2 leading-tight">{goal.title}</h3>
                  </div>
                  {isCompleted ? (
                    <div className="text-orange-400 bg-orange-500/10 p-1.5 rounded-lg shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                  ) : (
                    <div className="text-slate-500 bg-slate-900 p-1.5 rounded-lg shrink-0">
                      <Goal size={18} />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{goal.description}</p>

                {/* Progress Stats */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Progression</span>
                    <span className={isCompleted ? 'text-orange-400' : 'text-white'}>{progressPercent}%</span>
                  </div>
                  {/* Progress Bar container */}
                  <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{goal.currentAmount.toLocaleString()} FCFA</span>
                    <span>Cible: {goal.targetAmount.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Smart Recommendation */}
                {goal.aiRecommendation && (
                  <div className="p-3 bg-orange-950/20 border border-orange-500/5 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400 uppercase tracking-wide">
                      <Sparkles size={12} />
                      <span>Recommandation Santé IA</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      "{goal.aiRecommendation}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Metadata & Quick Action */}
              <div className="pt-4 mt-4 border-t border-slate-900/40 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Calendar size={12} />
                  <span>Échéance : {goal.deadline}</span>
                </div>

                {!isCompleted && (
                  <button
                    onClick={() => {
                      setSelectedGoalId(goal.id);
                      setShowAddModal(true);
                    }}
                    className="text-[10px] bg-orange-600/10 text-orange-400 hover:bg-orange-600/25 px-2.5 py-1.5 rounded-lg border border-orange-500/20 transition-all font-bold"
                  >
                    + Verser
                  </button>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* CREATE NEW GOAL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Créer un objectif d'épargne santé</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Titre de l'objectif</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Opération des yeux de maman"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                <textarea
                  placeholder="Détaillez le besoin médical ou les examens prévus..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Montant visé (FCFA)</label>
                  <input
                    type="number"
                    required
                    placeholder="Montant total"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SavingGoal['category'])}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Chirurgie">Chirurgie</option>
                    <option value="Maternité">Maternité</option>
                    <option value="Médicaments">Médicaments</option>
                    <option value="Dentaire">Dentaire</option>
                    <option value="Urgence">Urgence</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Date butoir</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black py-3 rounded-xl hover:scale-105 transition"
              >
                Créer l'objectif
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DEPOSIT FUNDS MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Alimenter l'objectif</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Objectif sélectionné</p>
                <p className="text-xs font-bold text-white mt-1">
                  {savingGoals.find(g => g.id === selectedGoalId)?.title}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Montant du versement (FCFA)</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Ex: 25000"
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-[10px] text-orange-400 font-bold">✓ Transaction Bitcoin Lightning instantanée</p>
                <p className="text-[9px] text-slate-500 pt-0.5">
                  Aucun frais de dépôt. Le solde de cet objectif est réévalué en temps réel.
                </p>
              </div>
            </div>

            <button
              onClick={handleAddFunds}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl transition hover:scale-105"
            >
              Procéder au versement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
