import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/GlassCard';
import { Coins, Zap, ArrowUpRight, ArrowDownLeft, QrCode, Clipboard, Check, Send, Sparkles } from 'lucide-react';
import { Transaction } from '../types';

export const BitcoinPaymentPage: React.FC = () => {
  const { transactions, btcPriceUsd, addTransaction } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  // Send BTC form states
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmountFCFA, setSendAmountFCFA] = useState('');
  const [useLightning, setUseLightning] = useState(true);

  // Receive BTC invoice generator state
  const [receiveAmountFCFA, setReceiveAmountFCFA] = useState('25000');
  const [generatedInvoice, setGeneratedInvoice] = useState('');

  const totalBtc = 0.02458;
  const totalFCFA = Math.round(totalBtc * btcPriceUsd * 600);

  const handleCopyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendBTC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientAddress || !sendAmountFCFA) {
      alert('Veuillez remplir les informations de transaction.');
      return;
    }

    const amt = Number(sendAmountFCFA);
    const amtBTC = Number((amt / (btcPriceUsd * 600)).toFixed(6));

    addTransaction({
      type: 'retrait',
      amount: amt,
      amountBTC: amtBTC,
      description: `Envoi BTC (${useLightning ? 'Lightning' : 'On-Chain'}) vers ${recipientAddress.substring(0, 8)}...`,
      status: 'Reussi',
      network: useLightning ? 'Lightning' : 'On-Chain',
    });

    setShowSendModal(false);
    setRecipientAddress('');
    setSendAmountFCFA('');

    alert(`Fonds de ${amt.toLocaleString()} FCFA (${amtBTC} BTC) envoyés instantanément via le réseau ${useLightning ? 'Lightning' : 'On-Chain'} !`);
  };

  const handleGenerateInvoice = () => {
    const amt = Number(receiveAmountFCFA) || 25000;
    const btcVal = (amt / (btcPriceUsd * 600)).toFixed(6);
    setGeneratedInvoice(`lnbcrt${Math.random().toString(36).substring(2, 15)}...amount=${btcVal}btc`);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            Centre de Paiements Bitcoin
            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">LN Actif</span>
          </h1>
          <p className="text-xs text-slate-400 pt-0.5">
            Épargnez, réglez vos factures de santé et soutenez votre entourage à l'abri de l'inflation locale.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowReceiveModal(true)}
            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-orange-400 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <ArrowDownLeft size={15} />
            Recevoir
          </button>

          <button
            onClick={() => setShowSendModal(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2"
          >
            <ArrowUpRight size={15} />
            Envoyer
          </button>
        </div>
      </div>

      {/* Grid: Metallic Wallet + Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wallet Display left (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="orange" className="p-6 relative overflow-hidden bg-slate-950/60 border-orange-500/10">
            {/* Ambient orange aura background */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/5 rounded-full blur-[60px]" />

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Portefeuille Multisig Intégré</span>
                </div>
                <span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded font-bold uppercase">Bitcoin Network</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Solde Total Disponible</p>
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-3xl sm:text-4xl font-black text-white">{totalBtc} BTC</h2>
                  <span className="text-xs text-orange-400 font-mono">≈ {totalFCFA.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Network statistics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-900/60 text-xs">
                <div className="p-3 bg-slate-900/40 rounded-xl space-y-0.5">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Frais Moyen LN</span>
                  <span className="text-emerald-400 font-bold">1 sat (0.02 FCFA)</span>
                </div>
                <div className="p-3 bg-slate-900/40 rounded-xl space-y-0.5">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Vitesse</span>
                  <span className="text-white font-bold">Instantané</span>
                </div>
                <div className="p-3 bg-slate-900/40 rounded-xl space-y-0.5">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Protection</span>
                  <span className="text-orange-400 font-bold">Multi-Sig 2/3</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Lightning explanation card right (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glowColor="orange" className="p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Zap className="text-orange-500 animate-bounce" size={16} />
                Avantages du Réseau Lightning
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                CareChain AI privilégie les transactions de seconde couche **Lightning Network** pour les soins journaliers :
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2.5 items-start">
                  <span className="text-orange-500 font-bold shrink-0">✓</span>
                  <span><strong>Zéro attente :</strong> Idéal pour régler les gardes d'urgence ou acheter des antibiotiques.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-orange-500 font-bold shrink-0">✓</span>
                  <span><strong>Frais négligeables :</strong> Envoyez aussi peu que 10 FCFA d'aide sans frais de virement bancaire.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-orange-500 font-bold shrink-0">✓</span>
                  <span><strong>Inclusion totale :</strong> Fonctionne avec n'importe quel portefeuille externe Lightning standard (Phoenix, Breeze, Wallet of Satoshi).</span>
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Transaction History Logs */}
      <GlassCard hoverEffect={false} className="p-6">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900/60">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Historique de Transactions</h3>
          <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-md font-mono">Mises à jour instantanées</span>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3 border-b border-slate-900/40 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  tx.type === 'depot' ? 'bg-orange-500/10 text-orange-400' :
                  tx.type === 'don' ? 'bg-red-500/10 text-red-400' :
                  tx.type === 'paiement' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-orange-500/10 text-orange-400'
                }`}>
                  {tx.type === 'depot' || tx.type === 'reception_btc' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">{tx.description}</h4>
                  <div className="flex gap-2 items-center text-[10px] text-slate-500 pt-0.5">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-slate-400 font-bold">{tx.network}</span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className={`font-bold ${tx.type === 'depot' || tx.type === 'reception_btc' ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {tx.type === 'depot' || tx.type === 'reception_btc' ? '+' : '-'} {tx.amount.toLocaleString()} FCFA
                </p>
                <p className="text-[10px] text-slate-500 font-mono">{tx.amountBTC} BTC</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* SEND BTC MODAL */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold text-white">Transférer du Bitcoin (BTC)</h3>
              <button onClick={() => setShowSendModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSendBTC} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Adresse Bitcoin ou Invoice Lightning</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: lnbc1q... ou bc1q..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Montant équivalent (FCFA)</label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 50000"
                  value={sendAmountFCFA}
                  onChange={(e) => setSendAmountFCFA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Mode de transfert</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUseLightning(true)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      useLightning ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    <Zap size={14} />
                    Lightning (Instant)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUseLightning(false)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      !useLightning ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    <Coins size={14} />
                    On-Chain (10 min)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-bold py-3 rounded-xl hover:scale-105 transition"
              >
                Valider la transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RECEIVE BTC MODAL */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6 text-center">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 text-left">
              <h3 className="text-sm font-bold text-white">Recevoir du Bitcoin</h3>
              <button onClick={() => { setShowReceiveModal(false); setGeneratedInvoice(''); }} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {!generatedInvoice ? (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Montant désiré (FCFA)</label>
                  <input
                    type="number"
                    value={receiveAmountFCFA}
                    onChange={(e) => setReceiveAmountFCFA(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <button
                  onClick={handleGenerateInvoice}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-bold py-3 rounded-xl hover:scale-105 transition"
                >
                  Générer facture Lightning
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-2xl border inline-block">
                  {/* Mock invoice QR code */}
                  <div className="w-40 h-40 bg-slate-950 rounded flex flex-col items-center justify-center p-2 opacity-90">
                    <QrCode size={120} className="text-orange-500" />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-slate-400 uppercase">Facture Lightning (Invoice)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedInvoice}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-[10px] text-slate-400 font-mono outline-none"
                    />
                    <button
                      onClick={handleCopyAddress}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition shrink-0"
                    >
                      {copied ? <Check size={14} className="text-orange-400" /> : <Clipboard size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert('Simulation : Paiement de la facture Lightning détecté ! Solde réévalué.');
                    setShowReceiveModal(false);
                    setGeneratedInvoice('');
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black py-3 rounded-xl transition hover:scale-105"
                >
                  Simuler règlement facture
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
