import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Users, AlertTriangle, ShieldCheck, HeartHandshake, BellRing, Plus, Sparkles, Send, Share2 } from 'lucide-react';
import { FamilyMember } from '../types';
import { ShareModal } from '../components/ShareModal';

export const FamilyCirclePage: React.FC = () => {
  const { familyMembers, addFamilyMember, sendFamilySupport, triggerFamilyAlert, resolveFamilyAlert } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [selectedShareMember, setSelectedShareMember] = useState<FamilyMember | null>(null);

  // New family member form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FamilyMember['relationship']>('Conjoint(e)');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120');
  const [healthSavingsTarget, setHealthSavingsTarget] = useState('300000');
  const [permissionLevel, setPermissionLevel] = useState<FamilyMember['permissionLevel']>('Lecture');

  // Support money state
  const [supportAmount, setSupportAmount] = useState('50000');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Veuillez indiquer un nom.');
      return;
    }

    addFamilyMember({
      name,
      relationship,
      avatar,
      healthSavingsTarget: Number(healthSavingsTarget),
      permissionLevel,
    });

    // Reset and close
    setName('');
    setRelationship('Conjoint(e)');
    setHealthSavingsTarget('300000');
    setPermissionLevel('Lecture');
    setShowAddModal(false);

    alert('Membre de famille connecté avec succès !');
  };

  const handleSendSupport = () => {
    if (!selectedMember || !supportAmount) return;

    sendFamilySupport(selectedMember.id, Number(supportAmount));
    setShowSupportModal(false);
    alert(`Aide de ${Number(supportAmount).toLocaleString()} FCFA envoyée à ${selectedMember.name} !`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            Cercle de Santé Familiale
          </h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Coordonnez l'épargne santé de vos proches, configurez des alertes d'urgence et envoyez du soutien en un éclair.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2 shadow-lg shadow-orange-500/10"
        >
          <Plus size={15} />
          Ajouter un Proche
        </button>
      </div>

      {/* Emergency Alerts Section (Active alerts banner if any exist) */}
      {familyMembers.some(f => f.status === 'Alerte') && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 animate-bounce">
              <BellRing size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-400">Alerte Médicale Familiale Active !</h4>
              <p className="text-xs text-slate-400 font-normal">
                {familyMembers.find(f => f.status === 'Alerte')?.name} a déclenché une urgence :{' '}
                <span className="text-white italic">"{familyMembers.find(f => f.status === 'Alerte')?.lastUrgencyAlert}"</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const alerted = familyMembers.find(f => f.status === 'Alerte');
                if (alerted) {
                  setSelectedMember(alerted);
                  setShowSupportModal(true);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
            >
              Envoyer Secours (BTC)
            </button>
            <button
              onClick={() => {
                const alerted = familyMembers.find(f => f.status === 'Alerte');
                if (alerted) {
                  resolveFamilyAlert(alerted.id);
                  alert('L\'alerte a été marquée comme résolue.');
                }
              }}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-850 transition"
            >
              Marquer Résolue
            </button>
          </div>
        </div>
      )}

      {/* Grid: Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => {
          const progressPercent = Math.min(Math.round((member.healthSavings / member.healthSavingsTarget) * 100), 100);
          const isAlerted = member.status === 'Alerte';

          return (
            <GlassCard
              key={member.id}
              glowColor={isAlerted ? 'orange' : 'amber'}
              className={`p-6 border-slate-850 flex flex-col justify-between h-full relative ${
                isAlerted ? 'ring-2 ring-red-500/30' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Header (Avatar & Relationship) */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{member.name}</h3>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">{member.relationship}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isAlerted ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {member.status}
                  </span>
                </div>

                {/* Savings monitoring bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Épargne santé individuelle</span>
                    <span className="text-white font-mono">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isAlerted ? 'bg-red-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{member.healthSavings.toLocaleString()} FCFA</span>
                    <span>Cible : {member.healthSavingsTarget.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Permission level indicators */}
                <div className="p-3 bg-slate-950/40 rounded-xl space-y-1 text-[10px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Droit d'accès :</span>
                    <span className="text-orange-400 font-semibold">{member.permissionLevel}</span>
                  </div>
                </div>

                {/* Alert message if alerted */}
                {isAlerted && member.lastUrgencyAlert && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-normal">
                    ⚠ {member.lastUrgencyAlert}
                  </div>
                )}
              </div>

              {/* Bottom control row */}
              <div className="flex gap-2 pt-4 mt-4 border-t border-slate-900/40">
                <button
                  onClick={() => {
                    setSelectedMember(member);
                    setShowSupportModal(true);
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-orange-500/20 text-xs font-bold py-2 px-1 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Send size={12} className="text-orange-400" />
                  Soutenir
                </button>

                <button
                  onClick={() => {
                    setSelectedShareMember(member);
                  }}
                  className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition"
                  title="Partager le QR / Lien"
                >
                  <Share2 size={13} />
                </button>

                {!isAlerted ? (
                  <button
                    onClick={() => {
                      triggerFamilyAlert(member.id, "Alerte de santé - Ridge Hospital, Accra");
                      alert(`Alerte d'urgence déclenchée simulée pour ${member.name} !`);
                    }}
                    className="flex-1 bg-red-600/10 text-red-400 border border-red-500/20 text-xs font-bold py-2 px-1 rounded-xl hover:bg-red-600/20 transition text-center"
                  >
                    Alerte
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      resolveFamilyAlert(member.id);
                      alert(`L'alerte d'urgence pour ${member.name} a été résolue.`);
                    }}
                    className="flex-1 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold py-2 px-1 rounded-xl hover:bg-emerald-600/20 transition text-center"
                  >
                    Résoudre
                  </button>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Connecter un membre de la famille</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Nom complet</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Kwame Mensah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Lien de parenté</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as FamilyMember['relationship'])}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="Conjoint(e)">Conjoint(e)</option>
                    <option value="Enfant">Enfant</option>
                    <option value="Parent">Parent</option>
                    <option value="Frère/Sœur">Frère/Sœur</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Droit d'accès</label>
                  <select
                    value={permissionLevel}
                    onChange={(e) => setPermissionLevel(e.target.value as FamilyMember['permissionLevel'])}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="Lecture">Lecture seule</option>
                    <option value="Administration">Administration</option>
                    <option value="Alerte Uniquement">Alerte uniquement</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Cible d'Épargne Santé (FCFA)</label>
                <input
                  type="number"
                  placeholder="Ex: 300000"
                  value={healthSavingsTarget}
                  onChange={(e) => setHealthSavingsTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              {/* Simple avatar options */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Choisir une icône / photo</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      onClick={() => setAvatar(url)}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 ${
                        avatar === url ? 'border-orange-400 ring-2 ring-orange-500/30' : 'border-transparent hover:border-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black py-3 rounded-xl hover:scale-105 transition shadow-lg shadow-orange-500/10"
              >
                Valider la connexion
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUPPORT FUNDS MODAL */}
      {showSupportModal && selectedMember && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Soutenir financièrement</h3>
              <button onClick={() => setShowSupportModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-3">
                <img src={selectedMember.avatar} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedMember.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{selectedMember.relationship}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Montant du soutien (FCFA)</label>
                <input
                  type="number"
                  value={supportAmount}
                  onChange={(e) => setSupportAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-[11px] text-orange-400 font-bold">✓ Transfert instantané sans intermédiaire</p>
                <p className="text-[9px] text-slate-500 pt-0.5">
                  Les fonds d'épargne de votre proche seront crédités dans la seconde en Bitcoin.
                </p>
              </div>
            </div>

            <button
              onClick={handleSendSupport}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl transition hover:scale-105"
            >
              Envoyer l'aide santé
            </button>
          </div>
        </div>
      )}

      {/* Share Contribution Modal */}
      <ShareModal
        isOpen={selectedShareMember !== null}
        onClose={() => setSelectedShareMember(null)}
        title={selectedShareMember ? `Cagnotte Santé de ${selectedShareMember.name}` : ''}
        subtitle={selectedShareMember ? `Lien de cotisation de parenté : ${selectedShareMember.relationship}` : ''}
        type="cotisation"
        targetAmount={selectedShareMember?.healthSavingsTarget || 0}
      />
    </div>
  );
};
