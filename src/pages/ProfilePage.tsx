import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { User, Bell, Shield, HeartPulse, Hospital, Settings, Plus, X, Check, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAppStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bloodType, setBloodType] = useState(user?.bloodType || 'O+');
  const [allergies, setAllergies] = useState<string[]>(user?.allergies || []);
  const [newAllergy, setNewAllergy] = useState('');
  const [chronicConditions, setChronicConditions] = useState<string[]>(user?.chronicConditions || []);
  const [newCondition, setNewCondition] = useState('');
  const [preferredHospital, setPreferredHospital] = useState(user?.preferredHospital || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.notificationsEnabled ?? true);
  const [privacyEnabled, setPrivacyEnabled] = useState(user?.privacyEnabled ?? false);

  const [isSaving, setIsSaving] = useState(false);

  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    setAllergies([...allergies, newAllergy.trim()]);
    setNewAllergy('');
  };

  const handleRemoveAllergy = (idx: number) => {
    setAllergies(allergies.filter((_, i) => i !== idx));
  };

  const handleAddCondition = () => {
    if (!newCondition.trim()) return;
    setChronicConditions([...chronicConditions, newCondition.trim()]);
    setNewCondition('');
  };

  const handleRemoveCondition = (idx: number) => {
    setChronicConditions(chronicConditions.filter((_, i) => i !== idx));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateProfile({
        name,
        email,
        phone,
        bloodType,
        allergies,
        chronicConditions,
        preferredHospital,
        notificationsEnabled,
        privacyEnabled,
      });
      setIsSaving(false);
      alert('Profil médical et préférences de sécurité mis à jour avec succès !');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
          Profil & Paramètres Médicaux
        </h1>
        <p className="text-xs text-slate-400 pt-0.5">
          Gérez votre fiche de santé sécurisée, vos préférences de notifications et votre confidentialité blockchain.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: General Profile Card (7 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard hoverEffect={false} className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-900/60">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-500/20"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center text-slate-950 font-bold text-xs shadow-md ${
                  user?.kycStatus === 'verifie' ? 'bg-orange-500' : 'bg-red-500 text-white'
                }`}>
                  {user?.kycStatus === 'verifie' ? '✓' : '!'}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">{user?.name}</h3>
                <p className="text-xs text-slate-400">
                  {user?.kycStatus === 'verifie' ? 'Compte Sécurisé KYC • Accrédité' : 'Compte en Attente KYC • Non Vérifié'}
                </p>
                <div className="flex gap-2 pt-2 justify-center sm:justify-start">
                  <span className="text-[9px] font-mono font-bold bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded border border-orange-500/20">
                    Fiche Clinique Sécurisée
                  </span>
                  {user?.kycStatus === 'verifie' && (
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      Identité Confirmée OK
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Fiche details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Adresse e-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Numéro de téléphone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Hôpital de référence préféré</label>
                <input
                  type="text"
                  value={preferredHospital}
                  onChange={(e) => setPreferredHospital(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>
          </GlassCard>

          {/* Health profile details: Allergies, Chronic diseases */}
          <GlassCard hoverEffect={false} className="p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-900/60">Informations Vitales de Santé</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Blood Type & Allergies */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <HeartPulse className="text-red-500" size={14} />
                    Groupe Sanguin
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+ (Donneur Universel)</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Allergies connues</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Arachide"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddAllergy}
                      className="px-3 bg-orange-600/15 text-orange-400 border border-orange-500/20 hover:bg-orange-600/25 rounded-xl text-xs font-bold transition"
                    >
                      +
                    </button>
                  </div>
                  {/* Allergies list tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {allergies.map((all, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-850 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                        {all}
                        <button type="button" onClick={() => handleRemoveAllergy(i)} className="text-red-400 hover:text-red-500">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chronic conditions */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Pathologies chroniques suivies</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Asthme"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCondition}
                      className="px-3 bg-orange-600/15 text-orange-400 border border-orange-500/20 hover:bg-orange-600/25 rounded-xl text-xs font-bold transition"
                    >
                      +
                    </button>
                  </div>
                  {/* Conditions list tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {chronicConditions.map((cond, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-850 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                        {cond}
                        <button type="button" onClick={() => handleRemoveCondition(i)} className="text-red-400 hover:text-red-500">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Toggles settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false} className="p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-900/60">Préférences de Sécurité</h3>

            {/* Notification setting */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bell size={14} className="text-orange-400" />
                    Alertes de Solidarité
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                    Recevoir les alertes d'urgences de santé de la communauté d'Afrique de l'Ouest.
                  </p>
                </div>
                {/* Simulated Custom CSS Toggle */}
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 border border-slate-800 ${
                    notificationsEnabled ? 'bg-orange-500' : 'bg-slate-950'
                  }`}
                >
                  <div className={`w-4 border border-slate-900/20 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Privacy block setting */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Shield size={14} className="text-amber-400" />
                    Confidentialité Blockchain
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                    Masquer mon nom complet et mon avatar de la blockchain publique lors des dons d'urgence.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPrivacyEnabled(!privacyEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 border border-slate-800 ${
                    privacyEnabled ? 'bg-orange-500' : 'bg-slate-950'
                  }`}
                >
                  <div className={`w-4 border border-slate-900/20 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    privacyEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl hover:scale-105 active:scale-100 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{isSaving ? 'Mise à jour...' : 'Sauvegarder les Fiches'}</span>
            </button>
          </GlassCard>
        </div>
      </form>
    </div>
  );
};
