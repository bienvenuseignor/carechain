import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Users, Shield, Award, CheckCircle, XCircle, HeartPulse, FileText, Calendar, DollarSign, Search, Sparkles, Filter, Trash, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPage: React.FC = () => {
  const { users, emergencyCampaigns, approveKyc, rejectKyc, adminSetCampaignStatus, user: activeUser } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState<'all' | 'verifie' | 'en_cours' | 'non_verifie'>('all');
  const [activeTab, setActiveTab] = useState<'users' | 'campaigns'>('users');

  // Filter users based on search and kycStatus
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.phone && u.phone.includes(searchTerm));
    const matchesFilter = kycFilter === 'all' || u.kycStatus === kycFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalUsersCount = users.length;
  const pendingKycCount = users.filter(u => u.kycStatus === 'en_cours').length;
  const verifiedKycCount = users.filter(u => u.kycStatus === 'verifie').length;
  
  const pendingCampaigns = emergencyCampaigns.filter(c => c.status === 'en_attente' || !c.status);
  const approvedCampaigns = emergencyCampaigns.filter(c => c.status === 'approuve');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
          <Shield size={14} className="text-orange-500" />
          <span>Espace d'Administration Sécurisé</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Portail de Contrôle & Conformité</h1>
        <p className="text-xs text-slate-400 pt-0.5">
          Validation des identités (KYC), modération des collectes d'urgence médicale et suivi de la conformité réglementaire de CareChain AI.
        </p>
      </div>

      {/* Admin Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard hoverEffect={false} className="p-5 flex items-center justify-between border-slate-850">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Membres Inscrits</span>
            <p className="text-2xl font-black text-white">{totalUsersCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users size={20} />
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false} className="p-5 flex items-center justify-between border-slate-850">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KYC en Attente</span>
            <p className="text-2xl font-black text-orange-400 flex items-center gap-2">
              {pendingKycCount}
              {pendingKycCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              )}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Shield size={20} />
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false} className="p-5 flex items-center justify-between border-slate-850">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identités Vérifiées</span>
            <p className="text-2xl font-black text-emerald-400">{verifiedKycCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award size={20} />
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false} className="p-5 flex items-center justify-between border-slate-850">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campagnes d'Aide Actives</span>
            <p className="text-2xl font-black text-white">{emergencyCampaigns.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <HeartPulse size={20} />
          </div>
        </GlassCard>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-900 gap-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'users' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Gestion des Membres ({filteredUsers.length})
          {activeTab === 'users' && (
            <motion.div layoutId="activeAdminTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'campaigns' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Collectes Médicales & Moderation ({emergencyCampaigns.length})
          {activeTab === 'campaigns' && (
            <motion.div layoutId="activeAdminTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500" />
          )}
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-900">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3.5 text-slate-500" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par nom, email, téléphone..."
                className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <Filter size={14} className="text-slate-500 shrink-0" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-2">Filtrer par KYC:</span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'verifie', label: 'Vérifiés' },
                { id: 'en_cours', label: 'En attente' },
                { id: 'non_verifie', label: 'Non vérifiés' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setKycFilter(opt.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition ${
                    kycFilter === opt.id
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-slate-950 border border-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Users List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500 text-xs">
                Aucun utilisateur ne correspond aux critères de recherche actuels.
              </div>
            ) : (
              filteredUsers.map((u) => (
                <GlassCard key={u.id} hoverEffect={true} className="p-5 border-slate-850 flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'}
                        alt={u.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white leading-tight">{u.name}</h4>
                          {u.isAdmin && (
                            <span className="text-[8px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">{u.email}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{u.phone || 'Pas de téléphone'}</p>
                      </div>
                    </div>

                    {/* KYC Badge */}
                    <span className={`text-[9px] font-black uppercase tracking-wider font-mono px-2 py-0.5 rounded-md border ${
                      u.kycStatus === 'verifie' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      u.kycStatus === 'en_cours' ? 'bg-orange-500/10 text-orange-400 border-orange-500/25 animate-pulse' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {u.kycStatus === 'verifie' ? 'Vérifié' :
                       u.kycStatus === 'en_cours' ? 'En cours' : 'Non Vérifié'}
                    </span>
                  </div>

                  {/* Document metadata if submitted */}
                  {u.kycStatus === 'en_cours' || u.kycDocumentType ? (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><FileText size={12} className="text-orange-400" /> Document Soumis :</span>
                        <span className="text-slate-500">{u.kycSubmittedAt || 'Date inconnue'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <span className="text-[8px] uppercase font-bold text-slate-500 block">Type</span>
                          <span className="text-[11px] font-semibold text-white">{u.kycDocumentType || "Carte d'identité"}</span>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase font-bold text-slate-500 block">Numéro de Pièce</span>
                          <span className="text-[11px] font-mono text-white truncate block">{u.kycDocumentNumber || "N/A"}</span>
                        </div>
                      </div>

                      {/* Doc Attachment Simulator */}
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-orange-400/90 flex items-center gap-1">
                          <UploadCloud size={10} /> {u.kycDocumentUrl || 'identite_scan.png'}
                        </span>
                        <button
                          onClick={() => alert(`Visualisation du fichier d'identité simulé : ${u.kycDocumentUrl || 'identite_scan.png'}`)}
                          className="text-[9px] font-bold text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Visualiser la pièce
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500 italic bg-slate-950/20 p-2.5 rounded-xl border border-slate-900/30 text-center font-normal">
                      Aucun justificatif officiel d'identité soumis.
                    </div>
                  )}

                  {/* KYC Approval Action Buttons */}
                  {u.kycStatus === 'en_cours' && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          approveKyc(u.id);
                          alert(`Compte de ${u.name} approuvé avec succès !`);
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black py-2 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={13} /> Approver
                      </button>
                      <button
                        onClick={() => {
                          rejectKyc(u.id);
                          alert(`Demande KYC de ${u.name} rejetée.`);
                        }}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-red-400 text-xs font-black py-2 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <XCircle size={13} /> Rejeter
                      </button>
                    </div>
                  )}

                  {u.kycStatus === 'verifie' && u.id !== activeUser?.id && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          rejectKyc(u.id);
                          alert(`Certification révoquée pour ${u.name}.`);
                        }}
                        className="text-[10px] text-slate-500 hover:text-red-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        Révoquer la certification
                      </button>
                    </div>
                  )}
                </GlassCard>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Campaigns Moderation Tab */}
          <div className="grid grid-cols-1 gap-4">
            {emergencyCampaigns.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Aucune campagne médicale soumise.
              </div>
            ) : (
              emergencyCampaigns.map((camp) => {
                const isApproved = camp.status === 'approuve';
                const isRejected = camp.status === 'rejete';
                const isPending = !camp.status || camp.status === 'en_attente';

                return (
                  <GlassCard key={camp.id} hoverEffect={false} className="p-6 border-slate-850 space-y-5">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={camp.userAvatar}
                          alt={camp.userName}
                          className="w-10 h-10 rounded-full object-cover border border-orange-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{camp.userName}</h4>
                            <span className="text-[9px] font-mono text-slate-500">Posté le {camp.createdAt}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Collecte d'aide d'urgence médicale</p>
                        </div>
                      </div>

                      {/* Campaign Status Badge */}
                      <span className={`self-start sm:self-auto text-[9px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-md border ${
                        isApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        isRejected ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-orange-500/10 text-orange-400 border-orange-500/25 animate-pulse'
                      }`}>
                        {isApproved ? 'Approuvée & Publique' :
                         isRejected ? 'Refusée / Modérée' : 'En attente de validation'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white leading-tight">{camp.title}</h3>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">{camp.story}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-900">
                      <div>
                        <span className="text-[8px] uppercase font-bold text-slate-500 block">Hôpital Demandeur</span>
                        <span className="text-xs font-semibold text-white">{camp.hospitalName}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-slate-500 block">Objectif Financier</span>
                        <span className="text-xs font-mono font-bold text-orange-400">{camp.targetAmount.toLocaleString()} FCFA</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-slate-500 block">Justificatif d'admission</span>
                        <span className="text-xs font-mono font-bold text-blue-400 truncate block">{camp.documentName}</span>
                      </div>
                    </div>

                    {/* Moderation Actions */}
                    <div className="flex gap-2 pt-2 border-t border-slate-900/40">
                      {isPending && (
                        <>
                          <button
                            onClick={() => {
                              adminSetCampaignStatus(camp.id, 'approuve');
                              alert('Campagne médicale officiellement approuvée et publiée !');
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                          >
                            <CheckCircle size={14} /> Approuver la campagne
                          </button>
                          <button
                            onClick={() => {
                              adminSetCampaignStatus(camp.id, 'rejete');
                              alert('Campagne médicale rejetée / archivée.');
                            }}
                            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-red-400 text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                          >
                            <XCircle size={14} /> Refuser
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <button
                          onClick={() => {
                            adminSetCampaignStatus(camp.id, 'rejete');
                            alert('La campagne a été retirée du fil public.');
                          }}
                          className="text-[10px] text-slate-500 hover:text-red-400 hover:underline flex items-center gap-1 font-bold ml-auto"
                        >
                          Désactiver & Archiver la campagne
                        </button>
                      )}

                      {isRejected && (
                        <button
                          onClick={() => {
                            adminSetCampaignStatus(camp.id, 'approuve');
                            alert('La campagne a été rétablie.');
                          }}
                          className="text-[10px] text-slate-500 hover:text-emerald-400 hover:underline flex items-center gap-1 font-bold ml-auto"
                        >
                          Rétablir / Ré-approuver
                        </button>
                      )}
                    </div>
                  </GlassCard>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
