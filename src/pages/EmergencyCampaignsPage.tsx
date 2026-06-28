import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { HeartPulse, CheckCircle, Share2, UploadCloud, Plus, Send, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EmergencyCampaign } from '../types';
import { ShareModal } from '../components/ShareModal';

export const EmergencyCampaignsPage: React.FC = () => {
  const { emergencyCampaigns, createCampaign, donateToCampaign } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState<EmergencyCampaign | null>(null);
  const [selectedShareCamp, setSelectedShareCamp] = useState<EmergencyCampaign | null>(null);

  // New campaign form states
  const [title, setTitle] = useState('');
  const [illnessDescription, setIllnessDescription] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<EmergencyCampaign['urgencyLevel']>('Élevé');
  const [targetAmount, setTargetAmount] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalVerified, setHospitalVerified] = useState(true);
  const [documentName, setDocumentName] = useState('rapport_admission_verifie.pdf');
  const [story, setStory] = useState('');

  // Donation form state
  const [donationAmount, setDonationAmount] = useState('20000');
  const [showImpactAnimation, setShowImpactAnimation] = useState(false);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !illnessDescription || !targetAmount || !hospitalName) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    createCampaign({
      title,
      illnessDescription,
      urgencyLevel,
      targetAmount: Number(targetAmount),
      hospitalName,
      hospitalVerified,
      documentName,
      story,
    });

    // Reset forms & close
    setTitle('');
    setIllnessDescription('');
    setUrgencyLevel('Élevé');
    setTargetAmount('');
    setHospitalName('');
    setStory('');
    setShowCreateModal(false);

    alert('Votre campagne d\'urgence de solidarité a été créée avec succès et soumise à la vérification d\'hôpital !');
  };

  const handleDonate = () => {
    if (!selectedCamp || !donationAmount) return;

    donateToCampaign(selectedCamp.id, Number(donationAmount));
    setShowDonateModal(false);

    // Trigger beautiful impact animation
    setShowImpactAnimation(true);
    setTimeout(() => {
      setShowImpactAnimation(false);
    }, 3500);
  };

  return (
    <div className="space-y-8 relative">
      {/* Dynamic Impact Animation Overlay */}
      <AnimatePresence>
        {showImpactAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 15 }}
              className="text-center space-y-6 max-w-sm"
            >
              <div className="w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500 flex items-center justify-center mx-auto text-orange-400">
                <HeartPulse size={48} className="animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Merci pour votre Don !</h3>
                <p className="text-sm text-slate-400">
                  Votre contribution en Bitcoin Lightning a été transmise instantanément à la clinique pour couvrir les soins du patient.
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
                    Transaction ID • Reussi
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Financement d'Urgence Solidaire</h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Collectes médicales d'urgence sécurisées, transparentes et alimentées mondialement par Bitcoin.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2 shadow-lg shadow-orange-500/10"
        >
          <Plus size={15} />
          Créer une Campagne
        </button>
      </div>

      {/* Campaigns list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {emergencyCampaigns.map((camp) => {
          const progressPercent = Math.min(Math.round((camp.currentAmount / camp.targetAmount) * 100), 100);

          return (
            <GlassCard key={camp.id} hoverEffect={true} className="p-6 border-slate-850 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Creator Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={camp.userAvatar}
                      alt={camp.userName}
                      className="w-9 h-9 rounded-full object-cover border border-orange-500/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{camp.userName}</h4>
                      <span className="text-[9px] text-slate-500">Posté le {camp.createdAt}</span>
                    </div>
                  </div>

                  {/* Urgency Level Badge */}
                  <span className={`text-[9px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-md ${
                    camp.urgencyLevel === 'Critique' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    camp.urgencyLevel === 'Élevé' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {camp.urgencyLevel}
                  </span>
                </div>

                {/* Campaign Body */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white leading-tight hover:text-orange-400 transition cursor-pointer">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{camp.story}</p>
                </div>

                {/* Verification Meta */}
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg">
                    <HeartPulse size={12} className="text-orange-400" />
                    <span className="text-slate-300">{camp.hospitalName}</span>
                    {camp.hospitalVerified && <CheckCircle size={10} className="text-orange-400 fill-orange-500/10 ml-0.5" />}
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg">
                    <UploadCloud size={12} className="text-amber-400" />
                    <span className="text-slate-300 font-mono truncate max-w-[120px]">{camp.documentName}</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Financement</span>
                    <span className="text-orange-400 font-mono">{progressPercent}%</span>
                  </div>
                  {/* Visual Progress bar */}
                  <div className="w-full h-2.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-orange-500 to-amber-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{camp.currentAmount.toLocaleString()} FCFA</span>
                    <span className="text-slate-500">Cible: {camp.targetAmount.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              {/* Donation & Share Actions Footer */}
              <div className="flex gap-3 pt-5 mt-5 border-t border-slate-900/40">
                <button
                  onClick={() => {
                    setSelectedCamp(camp);
                    setShowDonateModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black py-2.5 rounded-xl hover:scale-105 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
                >
                  <Send size={13} />
                  Soutenir (Bitcoin)
                </button>

                <button
                  onClick={() => {
                    setSelectedShareCamp(camp);
                  }}
                  className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition"
                  title="Partager"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* CREATE EMERGENCY CAMPAIGN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Lancer une campagne d'aide d'urgence</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Titre de la campagne</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Chirurgie d'urgence appendicite Chinedu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Description de la maladie</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Appendicite aiguë"
                    value={illnessDescription}
                    onChange={(e) => setIllnessDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Niveau d'urgence</label>
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value as EmergencyCampaign['urgencyLevel'])}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="Critique">Critique</option>
                    <option value="Élevé">Élevé</option>
                    <option value="Moyen">Moyen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Hôpital de prise en charge</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ridge Hospital, Accra"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Montant cible (FCFA)</label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 800000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              {/* Simulated File Upload component */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Rapports & Devis Médicaux (PDF/Image)</label>
                <div className="border border-dashed border-slate-800 hover:border-orange-500/30 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition">
                  <UploadCloud size={24} className="text-orange-400 mx-auto animate-bounce" style={{ animationDuration: '3s' }} />
                  <p className="text-xs text-slate-300 font-bold">Glissez-déposez le rapport médical</p>
                  <p className="text-[10px] text-slate-500">Formats autorisés: PDF, PNG, JPG (Max 5Mo)</p>
                  <span className="inline-block text-[9px] font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-md">
                    {documentName} (Simulation pré-chargée)
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Histoire de la campagne (Histoire patient)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Expliquez brièvement la situation et pourquoi la communauté doit vous soutenir..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black py-3 rounded-xl hover:scale-105 transition"
              >
                Soumettre la campagne
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DONATE MODAL */}
      {showDonateModal && selectedCamp && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Contribuer à l'urgence</h3>
              <button onClick={() => setShowDonateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-center">
                <span className="text-[9px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded uppercase font-bold">
                  Destinataire
                </span>
                <p className="text-xs font-bold text-white mt-1.5 line-clamp-1">{selectedCamp.title}</p>
                <p className="text-[10px] text-slate-500">Soigné à : {selectedCamp.hospitalName}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Montant du Don (FCFA)</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-1">
                <p className="text-[11px] text-orange-400 font-bold flex items-center gap-1">
                  ⚡ Paiement Bitcoin Lightning direct
                </p>
                <p className="text-[9px] text-slate-400">
                  Votre don de monnaie locale est instantanément réglé en Bitcoin pour le patient sans intermédiaire d'assurance.
                </p>
              </div>
            </div>

            <button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl transition hover:scale-105"
            >
              Faire mon don solidaire
            </button>
          </div>
        </div>
      )}

      {/* Share Contribution Modal */}
      <ShareModal
        isOpen={selectedShareCamp !== null}
        onClose={() => setSelectedShareCamp(null)}
        title={selectedShareCamp?.title || ''}
        subtitle={`Soutien à l'Hôpital : ${selectedShareCamp?.hospitalName || ''}`}
        type="campagne"
        targetAmount={selectedShareCamp?.targetAmount || 0}
      />
    </div>
  );
};
