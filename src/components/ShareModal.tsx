import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, Send, Mail, Phone, QrCode, X, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  type: 'campagne' | 'cotisation' | 'epargne';
  targetAmount: number;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, subtitle, type, targetAmount }) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `https://carechain.ai/contribute/${type}_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareChannels = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20', action: () => alert('Lien envoyé sur WhatsApp (Simulation)') },
    { name: 'Telegram', icon: Send, color: 'bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20', action: () => alert('Lien envoyé sur Telegram (Simulation)') },
    { name: 'Email', icon: Mail, color: 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20', action: () => alert('Lien de cotisation envoyé par E-mail (Simulation)') },
    { name: 'SMS', icon: Phone, color: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20', action: () => alert('Lien de cotisation envoyé par SMS (Simulation)') }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient gold glow decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 px-2.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20">
                  Partager la Cotisation
                </span>
                <h3 className="text-base font-black text-white pt-2 leading-tight">Envoyer un lien de paiement</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-950/60 text-slate-400 hover:text-white rounded-xl hover:bg-slate-950 transition"
              >
                <X size={15} />
              </button>
            </div>

            {/* Target Card Info Preview */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex flex-col items-center text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase">{type === 'campagne' ? "Campagne d'urgence" : type === 'cotisation' ? "Cercle Familial" : "Cagnotte Épargne"}</span>
              <p className="text-xs font-bold text-slate-200 truncate w-full max-w-[240px]">{title}</p>
              <p className="text-[10px] text-slate-400">{subtitle}</p>
              <div className="pt-2 flex items-center gap-1">
                <span className="text-[11px] font-bold text-slate-400">Objectif:</span>
                <span className="text-xs font-mono font-extrabold text-orange-400">{targetAmount.toLocaleString()} FCFA</span>
              </div>
            </div>

            {/* QR Code Graphic Generator (Prism Vector design) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center relative group">
                {/* Simulated high-fidelity vector QR Code using pure SVG paths for authenticity */}
                <svg className="w-40 h-40" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="#ffffff" />
                  
                  {/* Position detection outer boxes */}
                  {/* Top-Left */}
                  <rect x="5" y="5" width="25" height="25" fill="#090d16" />
                  <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
                  <rect x="12" y="12" width="11" height="11" fill="#090d16" />
                  
                  {/* Top-Right */}
                  <rect x="70" y="5" width="25" height="25" fill="#090d16" />
                  <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
                  <rect x="77" y="12" width="11" height="11" fill="#090d16" />
                  
                  {/* Bottom-Left */}
                  <rect x="5" y="70" width="25" height="25" fill="#090d16" />
                  <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
                  <rect x="12" y="77" width="11" height="11" fill="#090d16" />
                  
                  {/* Small alignment block bottom-right */}
                  <rect x="75" y="75" width="10" height="10" fill="#090d16" />
                  <rect x="78" y="78" width="4" height="4" fill="#ffffff" />
                  <rect x="79" y="79" width="2" height="2" fill="#090d16" />

                  {/* Dynamic mock patterns simulating a Bitcoin Lightning / invoice QR */}
                  <rect x="35" y="5" width="5" height="15" fill="#090d16" />
                  <rect x="35" y="25" width="10" height="5" fill="#090d16" />
                  <rect x="45" y="10" width="5" height="10" fill="#090d16" />
                  <rect x="55" y="5" width="10" height="5" fill="#090d16" />
                  <rect x="60" y="15" width="5" height="15" fill="#090d16" />
                  
                  <rect x="5" y="35" width="15" height="5" fill="#090d16" />
                  <rect x="25" y="35" width="5" height="10" fill="#090d16" />
                  <rect x="15" y="45" width="10" height="5" fill="#090d16" />
                  
                  <rect x="35" y="40" width="20" height="5" fill="#090d16" />
                  <rect x="40" y="50" width="5" height="15" fill="#090d16" />
                  <rect x="30" y="60" width="15" height="5" fill="#090d16" />
                  
                  <rect x="50" y="45" width="5" height="20" fill="#090d16" />
                  <rect x="60" y="40" width="15" height="5" fill="#090d16" />
                  <rect x="65" y="50" width="5" height="10" fill="#090d16" />
                  
                  <rect x="75" y="35" width="15" height="5" fill="#090d16" />
                  <rect x="80" y="45" width="10" height="10" fill="#090d16" />
                  <rect x="90" y="60" width="5" height="15" fill="#090d16" />
                  
                  <rect x="5" y="60" width="10" height="5" fill="#090d16" />
                  <rect x="20" y="55" width="5" height="10" fill="#090d16" />
                  
                  <rect x="35" y="70" width="5" height="15" fill="#090d16" />
                  <rect x="45" y="75" width="15" height="5" fill="#090d16" />
                  <rect x="50" y="85" width="10" height="10" fill="#090d16" />
                  <rect x="65" y="70" width="5" height="15" fill="#090d16" />
                  <rect x="65" y="90" width="15" height="5" fill="#090d16" />
                  
                  {/* Tiny Orange Heart Logo in Center for CareChain branding */}
                  <rect x="44" y="44" width="12" height="12" fill="#ffffff" rx="2" />
                  <path d="M50 46.5 C 49 45, 46 45, 46 48 C 46 51, 50 53, 50 53 C 50 53, 54 51, 54 48 C 54 45, 51 45, 50 46.5 Z" fill="#f97316" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                <QrCode size={11} className="text-orange-400" /> Scannez avec l'app pour verser en Bitcoin Lightning
              </span>
            </div>

            {/* Input Link Copying Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lien web public</label>
              <div className="relative flex items-center bg-slate-950 border border-slate-850 rounded-xl p-1 pl-3.5">
                <Globe size={14} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-transparent border-none text-[10px] text-slate-300 outline-none select-all px-2 font-mono"
                />
                <button
                  onClick={handleCopy}
                  className={`p-2.5 rounded-lg transition duration-200 shrink-0 ${
                    copied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500 text-slate-950 hover:bg-orange-400 font-bold'
                  }`}
                  title="Copier le lien"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Share channels */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Partager instantanément</span>
              <div className="grid grid-cols-4 gap-2">
                {shareChannels.map((channel, i) => (
                  <button
                    key={i}
                    onClick={channel.action}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition text-center ${channel.color}`}
                  >
                    <channel.icon size={15} />
                    <span className="text-[9px] font-bold">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
