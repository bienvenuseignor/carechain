import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Upload, 
  FileText, 
  User, 
  CheckCircle, 
  ArrowRight, 
  Loader2, 
  AlertTriangle,
  Camera,
  FileCheck,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const KycPage: React.FC = () => {
  const { user, updateProfile } = useAppStore();
  const navigate = useNavigate();

  // Local form states
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('cni');
  const [fullName, setFullName] = useState(user?.name || '');
  const [docNumber, setDocNumber] = useState('');
  const [birthDate, setBirthDate] = useState('1992-05-14');
  const [phone, setPhone] = useState(user?.phone || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSelfie, setSelectedSelfie] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifLogs, setVerifLogs] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Auto-fill values if already submitted/verified
  useEffect(() => {
    if (user?.kycStatus === 'verifie' && user.kycDocumentNumber) {
      setDocNumber(user.kycDocumentNumber);
      if (user.kycDocumentType) setDocType(user.kycDocumentType);
    }
  }, [user]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'doc' | 'selfie') => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (type === 'doc') {
        setSelectedFile(e.dataTransfer.files[0]);
      } else {
        setSelectedSelfie(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'doc' | 'selfie') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'doc') {
        setSelectedFile(e.target.files[0]);
      } else {
        setSelectedSelfie(e.target.files[0]);
      }
    }
  };

  const startSimulation = () => {
    if (!fullName || !docNumber) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setStep(4);
    setIsSubmitting(true);
    setVerifLogs([]);

    const logs = [
      "Initialisation de la session sécurisée CareChain...",
      "Traitement de l'image de la pièce d'identité via OCR intelligent...",
      "Extraction du nom complet, de la date de naissance et du numéro de document...",
      "Analyse de détection de fraude et vérification des filigranes gouvernementaux...",
      "Comparaison biométrique faciale (Pièce d'identité vs. Selfie)...",
      "Authenticité du faciès validée avec un taux de confiance de 99.4%...",
      "Calcul de la signature cryptographique SHA-256 de l'identité numérique...",
      "Enregistrement de la clé publique d'identité sur le réseau CareChain (ZKP)...",
      "Génération du certificat de sûreté médicale et financière...",
    ];

    logs.forEach((logText, idx) => {
      setTimeout(() => {
        setVerifLogs(prev => [...prev, logText]);
        if (idx === logs.length - 1) {
          setIsSubmitting(false);
          // Update profile in store
          updateProfile({
            kycStatus: 'verifie',
            kycDocumentType: docType === 'cni' ? "Carte Nationale d'Identité" : docType === 'passport' ? "Passeport International" : "Carte d'Assurance Santé",
            kycDocumentNumber: docNumber,
            kycSubmittedAt: new Date().toISOString().split('T')[0]
          });
        }
      }, (idx + 1) * 650);
    });
  };

  const resetKyc = () => {
    updateProfile({
      kycStatus: 'non_verifie',
      kycDocumentType: undefined,
      kycDocumentNumber: undefined,
      kycSubmittedAt: undefined
    });
    setStep(1);
    setDocNumber('');
    setSelectedFile(null);
    setSelectedSelfie(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            Sûreté & Vérification KYC
            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">Identité Blockchain</span>
          </h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Sécurisez votre profil CareChain pour débloquer le financement participatif, le cercle familial de sûreté, et les micro-paiements Bitcoin sans limite.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Dynamic Flow (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {/* 1. VERIFIED STATE */}
            {user?.kycStatus === 'verifie' && (
              <motion.div
                key="verified-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GlassCard glowColor="orange" className="p-8 relative overflow-hidden border-orange-500/20">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-[45px]" />
                  <div className="text-center space-y-6 max-w-md mx-auto py-4">
                    <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-3xl flex items-center justify-center mx-auto text-orange-400 shadow-xl shadow-orange-500/5">
                      <ShieldCheck size={44} className="animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-bold">
                        Vérifié et Sécurisé
                      </span>
                      <h2 className="text-xl font-black text-white">Sûreté d'Identité Active</h2>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Votre identité légale a été validée avec succès sur le protocole CareChain. Vous bénéficiez désormais d'une couverture de sûreté absolue et de plafonds d'épargne illimités.
                      </p>
                    </div>

                    {/* Metadata Box */}
                    <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl text-left font-mono text-[11px] text-slate-400 space-y-2.5">
                      <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                        <span>Titulaire légal</span>
                        <span className="font-semibold text-slate-200">{user.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                        <span>Document d'identité</span>
                        <span className="text-orange-400 font-bold">{user.kycDocumentType}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                        <span>Numéro du document</span>
                        <span className="text-slate-200">{user.kycDocumentNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                        <span>Date de vérification</span>
                        <span className="text-slate-200">{user.kycSubmittedAt}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 text-[10px] text-emerald-400">
                        <span className="flex items-center gap-1">
                          <Fingerprint size={12} /> Preuve ZKP Enregistrée
                        </span>
                        <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">Actif</span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs py-3 rounded-xl transition"
                      >
                        Retour au Tableau de Bord
                      </button>
                      <button
                        onClick={resetKyc}
                        className="px-4 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold rounded-xl transition"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* 2. FORM FLOW */}
            {(!user?.kycStatus || user.kycStatus === 'non_verifie') && (
              <motion.div
                key="form-steps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Steps Header Indicator */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="space-y-1.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${
                        step >= s ? 'bg-orange-500' : 'bg-slate-900 border border-slate-850'
                      }`} />
                      <span className={`text-[10px] font-bold block ${step === s ? 'text-orange-400' : 'text-slate-500'}`}>
                        Étape {s}
                      </span>
                    </div>
                  ))}
                </div>

                <GlassCard hoverEffect={false} className="p-6">
                  {/* STEP 1: SELECT DOCUMENT TYPE */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                          <FileText size={18} className="text-orange-400" />
                          1. Type de document officiel
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Sélectionnez la pièce officielle émise par l'État ou l'agence de santé de la CEDEAO.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {[
                          { id: 'cni', label: "Carte d'Identité", desc: "CNI, Carte d'Électeur ou d'Assurance", icon: FileCheck },
                          { id: 'passport', label: "Passeport", desc: "Passeport International valide", icon: ShieldCheck },
                          { id: 'health', label: "Carte CEDEAO", desc: "Carte Santé Nationale Unifiée", icon: Fingerprint },
                        ].map((doc) => {
                          const Icon = doc.icon;
                          return (
                            <button
                              key={doc.id}
                              onClick={() => setDocType(doc.id)}
                              className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                                docType === doc.id
                                  ? 'bg-orange-500/5 border-orange-500 text-white shadow-lg shadow-orange-500/5'
                                  : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                docType === doc.id ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-950 text-slate-500'
                              }`}>
                                <Icon size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-200">{doc.label}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{doc.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-4 border-t border-slate-900/40">
                        <button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition"
                        >
                          Continuer
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: FILL INFORMATION */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                          <User size={18} className="text-orange-400" />
                          2. Informations d'identité légale
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Saisissez les informations telles qu'elles apparaissent sur votre document officiel.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase">Nom complet légal</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ex: Kofi Mensah"
                            className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase">Numéro du Document d'Identité</label>
                          <input
                            type="text"
                            value={docNumber}
                            onChange={(e) => setDocNumber(e.target.value)}
                            placeholder="Ex: GHA-723019842"
                            className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase">Date de naissance</label>
                          <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase">Téléphone certifié</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+233 24 123 4567"
                            className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-900/40">
                        <button
                          onClick={() => setStep(1)}
                          className="px-5 py-3 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition"
                        >
                          Retour
                        </button>
                        <button
                          onClick={() => {
                            if (!fullName || !docNumber) {
                              alert("Veuillez remplir le nom et le numéro de document.");
                              return;
                            }
                            setStep(3);
                          }}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition"
                        >
                          Continuer
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: UPLOAD MEDIA */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                          <Camera size={18} className="text-orange-400" />
                          3. Téléchargement sécurisé & Preuve de vie
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Téléchargez un scan lisible du document ainsi qu'un selfie photo de contrôle facial.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        {/* Box 1: Document Upload */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">Photo du Document</span>
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'doc')}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
                              dragOver ? 'border-orange-500 bg-orange-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                            }`}
                          >
                            <input
                              type="file"
                              id="doc-upload"
                              className="hidden"
                              accept="image/*,application/pdf"
                              onChange={(e) => handleFileChange(e, 'doc')}
                            />
                            <label htmlFor="doc-upload" className="cursor-pointer space-y-2.5 flex flex-col items-center">
                              {selectedFile ? (
                                <>
                                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                                    <CheckCircle size={18} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-200 truncate max-w-[180px]">{selectedFile.name}</p>
                                    <p className="text-[10px] text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} Mo • Modifier</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center">
                                    <Upload size={18} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-slate-300">Glissez ou parcourez</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Fichier PNG, JPG ou PDF (max. 10 Mo)</p>
                                  </div>
                                </>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* Box 2: Selfie Upload */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">Selfie de sûreté</span>
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'selfie')}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
                              dragOver ? 'border-orange-500 bg-orange-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                            }`}
                          >
                            <input
                              type="file"
                              id="selfie-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'selfie')}
                            />
                            <label htmlFor="selfie-upload" className="cursor-pointer space-y-2.5 flex flex-col items-center">
                              {selectedSelfie ? (
                                <>
                                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                                    <CheckCircle size={18} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-200 truncate max-w-[180px]">{selectedSelfie.name}</p>
                                    <p className="text-[10px] text-slate-500">{(selectedSelfie.size / 1024 / 1024).toFixed(2)} Mo • Modifier</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center">
                                    <Camera size={18} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-slate-300">Prendre / Envoyer un selfie</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Assurez-vous que votre visage est bien éclairé</p>
                                  </div>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3">
                        <AlertTriangle className="text-orange-400 shrink-0 mt-0.5" size={16} />
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-orange-400">Pourquoi cette validation ?</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                            CareChain AI met en œuvre des mécanismes de chiffrement à divulgation nulle de connaissance (Zero-Knowledge Proofs). Vos documents officiels restent confidentiels et hors chaîne, servant uniquement à valider votre intégrité auprès de nos hôpitaux partenaires.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-900/40">
                        <button
                          onClick={() => setStep(2)}
                          className="px-5 py-3 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition"
                        >
                          Retour
                        </button>
                        <button
                          onClick={startSimulation}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition"
                        >
                          Lancer la vérification
                          <ShieldCheck size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SIMULATED DÉROULEMENT TELEMETRY */}
                  {step === 4 && (
                    <div className="space-y-6 py-4">
                      <div className="text-center space-y-4">
                        {isSubmitting ? (
                          <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto text-orange-400 animate-spin">
                            <Loader2 size={24} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                            <CheckCircle size={24} className="animate-bounce" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                            {isSubmitting ? "Analyse cryptographique de sûreté..." : "Identité Validée avec succès !"}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {isSubmitting ? "Nous indexons vos données cryptographiquement sans dévoiler vos données brutes." : "Votre profil est certifié sûr et intègre."}
                          </p>
                        </div>
                      </div>

                      {/* Log Console */}
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 font-mono text-[10px] space-y-2 text-slate-400 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {verifLogs.map((log, i) => (
                          <div key={i} className="flex gap-2 items-start leading-relaxed">
                            <span className="text-slate-600 select-none">[{i+1}]</span>
                            <span className={i === verifLogs.length - 1 && !isSubmitting ? "text-emerald-400 font-bold" : "text-slate-300"}>
                              {log}
                            </span>
                          </div>
                        ))}
                      </div>

                      {!isSubmitting && (
                        <div className="flex gap-4 pt-2">
                          <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs py-3 rounded-xl transition"
                          >
                            Voir mon tableau de bord certifié
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Security Context / Rules Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard glowColor="orange" className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-[20px]" />
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-4">
              <ShieldCheck className="text-orange-400" size={18} />
              Garanties de Sûreté
            </h3>

            <div className="space-y-4">
              <div className="space-y-2 border-b border-slate-900/40 pb-4">
                <h4 className="text-xs font-bold text-slate-300">Conformité Médicale</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  CareChain respecte rigoureusement la norme de sécurité sanitaire de la CEDEAO et le règlement HIPAA. Vos dossiers médicaux et informations d'identification sont isolés et protégés contre toute divulgation tierce.
                </p>
              </div>

              <div className="space-y-2 border-b border-slate-900/40 pb-4">
                <h4 className="text-xs font-bold text-slate-300">Protection Anti-Fraude</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  Toutes les campagnes de crowdfunding et cercles de solidarité subissent une validation d'identité préalable. Cela éradique les détournements de fonds et assure que chaque satoshi épargné ou donné atterrit chez de vrais patients.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Portabilité de l'Identité</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  Votre identité certifiée vous permet d'effectuer des retraits d'assurance-maladie directement auprès de n'importe quel dispensaire ou pharmacie membre du réseau transfrontalier CareChain.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Verification Indicators */}
          <div className="p-5 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldAlert size={15} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-300">Action recommandée</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Prenez en photo votre pièce d'identité originale sous une bonne luminosité. Les reflets lumineux peuvent ralentir le temps de validation automatique par l'intelligence artificielle de CareChain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
