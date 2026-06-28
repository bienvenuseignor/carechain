import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send, Globe, Award, Shield, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="font-bold text-white text-lg tracking-wider">C</span>
              </div>
              <span className="font-bold text-white text-lg tracking-wide">CareChain <span className="text-orange-400">AI</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              L'écosystème de santé décentralisé et solidaire pour l'Afrique. Épargnez à l'abri de l'inflation locale, payez instantanément vos soins et financez vos urgences grâce au Bitcoin et à l'Intelligence Artificielle.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-500/80 font-mono">
              <CheckCircle size={12} />
              <span>Certifié conforme aux directives de santé régionales</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Plateforme</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">Fonctionnalités</a>
              </li>
              <li>
                <Link to="/community" className="hover:text-orange-400 transition-colors">Impact Communautaire</Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-orange-400 transition-colors">Assistant Santé IA</Link>
              </li>
              <li>
                <Link to="/bitcoin" className="hover:text-orange-400 transition-colors">Portefeuille Bitcoin</Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Sécurité & Éthique</h3>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start">
                <Shield size={16} className="text-orange-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vos fonds d'épargne sont hébergés sur des portefeuilles sécurisés multisignatures (Multi-Sig) sur la blockchain Bitcoin.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <Award size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  CareChain AI est audité régulièrement par des cabinets de sécurité informatique et est conforme au RGPD Afrique.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Restez informé</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inscrivez-vous pour recevoir les rapports d'impact mensuels et les mises à jour de nos services de santé IA.
            </p>
            <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre e-mail..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 rounded-xl font-black transition-all duration-200"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2026 CareChain AI. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Conçu avec</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>pour les communautés africaines et la solidarité décentralisée.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400">CGU</a>
            <a href="#" className="hover:text-slate-400">Confidentialité</a>
            <a href="#" className="hover:text-slate-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
