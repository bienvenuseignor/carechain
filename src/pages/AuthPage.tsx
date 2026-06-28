import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Navbar } from '../components/Navbar';
import { GlassCard } from '../components/GlassCard';
import { Mail, Lock, User, ArrowRight, ShieldCheck, HelpCircle, CheckCircle, Fingerprint, FileCheck, Camera, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthPage: React.FC<{ initialMode?: 'login' | 'signup' | 'forgot' }> = ({ initialMode = 'login' }) => {
  const { login, signup, signupWithKyc } = useAppStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Integrated KYC Step states for registration
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [kycDocType, setKycDocType] = useState('cni');
  const [kycDocNumber, setKycDocNumber] = useState('');
  const [kycFileName, setKycFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Veuillez renseigner votre adresse e-mail.');
      return;
    }

    if (mode !== 'forgot' && !password) {
      setError('Veuillez saisir votre mot de passe.');
      return;
    }

    if (mode === 'signup' && !name) {
      setError('Veuillez indiquer votre nom complet.');
      return;
    }

    // Direct multi-step KYC integration
    if (mode === 'signup' && signupStep === 1) {
      setSignupStep(2);
      return;
    }

    if (mode === 'signup' && signupStep === 2) {
      if (!kycDocNumber) {
        setError('Veuillez saisir le numéro de votre pièce d\'identité.');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (mode === 'login') {
        const isAdmin = email.toLowerCase() === 'admin@carechain.ai';
        login(email);
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else if (mode === 'signup') {
        signupWithKyc(email, name, kycDocType, kycDocNumber, kycFileName || 'justificatif_identite.png');
        navigate('/dashboard');
      } else {
        setSuccess('Un e-mail de réinitialisation de mot de passe de simulation a été envoyé à votre adresse.');
      }
      setIsSubmitting(false);
    }, 1200);
  };

  const handleGoogleSimulate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login('bienvenuessegnon01@gmail.com', 'Bienvenue Segnon');
      navigate('/dashboard');
      setIsSubmitting(false);
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setKycFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKycFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-center relative overflow-hidden">
      <Navbar />

      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 pt-24 pb-12">
        <GlassCard hoverEffect={false} glowColor="orange" className="p-8">
          {/* Form Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 mx-auto">
              <span className="font-extrabold text-white text-xl">C</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {mode === 'login' && 'Bon retour sur CareChain AI'}
              {mode === 'signup' && (signupStep === 1 ? 'Créez votre compte santé' : 'Sûreté d\'Identité (KYC)')}
              {mode === 'forgot' && 'Mot de passe oublié ?'}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === 'login' && 'Épargnez pour votre santé et payez en Bitcoin'}
              {mode === 'signup' && (signupStep === 1 ? 'Rejoignez la révolution de l\'écosystème de santé solidaire' : 'Complétez vos détails officiels d\'identité')}
              {mode === 'forgot' && 'Saisissez votre e-mail pour recevoir les instructions'}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
              ⚠ {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
              ✓ {success}
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && signupStep === 1 && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Kofi Mensah"
                    className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && signupStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                {/* KYC step progress bar */}
                <div className="flex justify-between items-center text-[10px] font-bold text-orange-400 uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-xl">
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> Sûreté requise à l'inscription</span>
                  <span>Étape 2 / 2</span>
                </div>

                {/* Doc Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type de document d'identité</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cni', label: 'CNI / Vote' },
                      { id: 'passport', label: 'Passeport' },
                      { id: 'health', label: 'Carte Santé' }
                    ].map(doc => (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setKycDocType(doc.id)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition ${
                          kycDocType === doc.id
                            ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-sm'
                            : 'bg-slate-900 border-slate-850 text-slate-400'
                        }`}
                      >
                        {doc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Doc Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Numéro du document</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                    <input
                      type="text"
                      required
                      value={kycDocNumber}
                      onChange={(e) => setKycDocNumber(e.target.value)}
                      placeholder="Ex: GHA-723019842"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition"
                    />
                  </div>
                </div>

                {/* File Upload Simulation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scan ou photo de la pièce</label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[90px] ${
                      dragOver ? 'border-orange-500 bg-orange-500/5' : 'border-slate-850 hover:border-slate-800 bg-slate-900'
                    }`}
                  >
                    <input
                      type="file"
                      id="signup-doc-upload"
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="signup-doc-upload" className="cursor-pointer space-y-1 flex flex-col items-center w-full">
                      {kycFileName ? (
                        <>
                          <CheckCircle className="text-orange-400" size={16} />
                          <p className="text-[11px] font-bold text-slate-200 truncate max-w-[200px]">{kycFileName}</p>
                          <p className="text-[9px] text-slate-500">Document enregistré</p>
                        </>
                      ) : (
                        <>
                          <Upload className="text-slate-500" size={16} />
                          <p className="text-[11px] font-semibold text-slate-300">Glissez ou sélectionnez un fichier</p>
                          <p className="text-[9px] text-slate-500">JPG, PNG ou PDF (Max 10 Mo)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Account Credentials Step 1 */}
            {mode !== 'signup' || signupStep === 1 ? (
              <>
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adresse e-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mot de passe</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-xs text-orange-400 hover:underline animate-pulse"
                        >
                          Oublié ?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : null}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black py-3 rounded-xl hover:scale-[1.02] active:scale-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span>Vérification...</span>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Se connecter'}
                    {mode === 'signup' && (signupStep === 1 ? 'Suivant (KYC)' : 'Créer mon compte certifié')}
                    {mode === 'forgot' && 'Réinitialiser le mot de passe'}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demonstration Credentials Alert Box */}
          {mode === 'login' && (
            <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/25 rounded-2xl flex gap-3 animate-fadeIn">
              <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={16} />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-orange-400">Accès Administrateur Démo</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                  Connectez-vous avec <span className="text-white font-mono bg-slate-900 px-1 py-0.5 rounded font-bold">admin@carechain.ai</span> (n'importe quel mot de passe) pour tester le portail de validation et gestion de KYC.
                </p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-slate-900" />
            <span className="relative z-10 bg-slate-950/70 backdrop-blur px-3 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Ou continuer avec</span>
          </div>

          {/* Google Simulation */}
          <button
            onClick={handleGoogleSimulate}
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2"
          >
            {/* Simple Google SVG icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.92 5.92 0 0 1 8 12.5a5.92 5.92 0 0 1 5.991-6.014c1.55 0 2.902.59 3.927 1.545l3.14-3.14C19.126 3.01 16.741 2 13.991 2 8.47 2 4 6.47 4 12s4.47 10 9.991 10c5.783 0 9.68-4.062 9.68-9.832 0-.616-.055-1.21-.157-1.883H12.24Z"
              />
            </svg>
            <span>Simuler la connexion Google</span>
          </button>

          {/* Bottom toggle link */}
          <div className="text-center mt-6 text-xs text-slate-500">
            {mode === 'login' && (
              <p>
                Nouveau sur CareChain AI ?{' '}
                <button onClick={() => { setMode('signup'); setSignupStep(1); }} className="text-orange-400 hover:underline font-bold">
                  Créer un compte
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Vous avez déjà un compte ?{' '}
                <button onClick={() => setMode('login')} className="text-orange-400 hover:underline font-bold">
                  Se connecter
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Retourner à la{' '}
                <button onClick={() => setMode('login')} className="text-orange-400 hover:underline font-bold">
                  Connexion
                </button>
              </p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
