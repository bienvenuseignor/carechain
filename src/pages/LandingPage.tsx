import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlassCard } from '../components/GlassCard';
import {
  ShieldCheck,
  Zap,
  Activity,
  Coins,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  Users,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Play,
  HeartPulse,
  BrainCircuit,
  QrCode
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showVideoDemo, setShowVideoDemo] = useState(false);

  const partners = [
    { name: 'Ridge Hospital Accra', logo: '🏥 Ridge Hospital' },
    { name: 'Dakar Health Clinic', logo: '🩺 Dakar Health' },
    { name: 'Lightning Labs Africa', logo: '⚡ Lightning Network' },
    { name: 'Cote d\'Ivoire Mutuals', logo: '🤝 Mutuelle Civ' },
    { name: 'Bitcoin Africa Association', logo: '🧡 Bitcoin Africa' },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Épargne Santé Anti-Inflation',
      description: 'Protégez votre pouvoir d\'achat médical en épargnant en Bitcoin. Vos fonds de soins ne perdent pas de valeur face aux fluctuations monétaires locales.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: BrainCircuit,
      title: 'IA Assistante Santé Clinique',
      description: 'Bénéficiez d\'un premier diagnostic gratuit, de recommandations d\'habitudes de vie saines et d\'alertes prédictives sur vos dépenses à venir.',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: Zap,
      title: 'Paiements Lightning Ultra-Rapides',
      description: 'Réglez vos consultations et ordonnances instantanément en scannant un simple QR Code dans nos cliniques et pharmacies partenaires.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: HeartHandshake,
      title: 'Financement Participatif d\'Urgence',
      description: 'Lancez des campagnes de collecte médicales transparentes. La communauté contribue mondialement via Lightning pour un impact immédiat.',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Users,
      title: 'Cercle de Solidarité Familiale',
      description: 'Suivez la santé de vos proches à distance, envoyez-leur des fonds médicaux en une seconde et recevez des alertes d\'urgence instantanées.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Activity,
      title: 'Prédictions Budgétaires Précises',
      description: 'L\'IA analyse votre profil, l\'historique des maladies de votre zone géographique et la météo pour estimer vos dépenses futures de santé.',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const stats = [
    { value: '45,200+', label: 'Vies Impactées', suffix: 'vies' },
    { value: '180,500,000+', label: 'Fonds d\'Urgence Levés', suffix: 'FCFA' },
    { value: '1.4 s', label: 'Temps Moyen de Transaction', suffix: 'Lightning' },
    { value: '98.6%', label: 'Précision des Recommandations IA', suffix: 'santé' },
  ];

  const testimonials = [
    {
      quote: "Grâce à la campagne d'urgence CareChain AI, nous avons réuni les fonds en Bitcoin en moins de 12 heures pour la césarienne d'urgence de ma sœur. C'est un miracle de technologie et de solidarité humaine.",
      author: "Ibrahim Sanogo",
      role: "Maraîcher, Bouaké",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
    },
    {
      quote: "Épargner en Bitcoin pour la pédiatrie de mon fils Kwame m'a sauvée de la dévaluation de l'année passée. Et l'assistant IA m'a prévenue du paludisme à la rentrée des pluies !",
      author: "Ama Mensah",
      role: "Commerçante, Accra",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120",
    },
    {
      quote: "En tant que médecin partenaire, l'intégration des paiements QR de CareChain AI réduit drastiquement les délais de soins. Plus de dossiers papier compliqués ni d'attente d'assurance.",
      author: "Dr. Rachel Koffi",
      role: "Directrice de Clinique, Yamoussoukro",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120",
    },
  ];

  const faqs = [
    {
      q: "Comment fonctionne l'épargne en Bitcoin pour la santé ?",
      a: "Sur CareChain AI, vous déposez des fonds en monnaie locale ou en Bitcoin. Vos économies sont stockées de façon sécurisée en Bitcoin, ce qui vous protège contre l'inflation et la dévaluation des monnaies locales en Afrique. En cas de besoin médical, vous pouvez reconvertir vos fonds ou régler directement en BTC via le réseau Lightning.",
    },
    {
      q: "Qu'est-ce que le réseau Bitcoin Lightning ?",
      a: "C'est une technologie de seconde couche bâtie sur Bitcoin qui permet de réaliser des transactions instantanées (en quelques millisecondes) avec des frais quasi nuls. C'est parfait pour payer une consultation médicale ou acheter des médicaments en pharmacie.",
    },
    {
      q: "Comment l'Assistant IA aide-t-il les utilisateurs ?",
      a: "Notre IA analyse vos habitudes de vie, vos antécédents et les risques sanitaires de votre région. Elle vous alerte sur les épidémies saisonnières, suggère un rythme d'épargne adapté et fournit des conseils d'orientation clinique préliminaires sans remplacer un vrai médecin.",
    },
    {
      q: "Les documents médicaux des campagnes d'urgence sont-ils vérifiés ?",
      a: "Oui, à 100%. Notre équipe collabore avec les hôpitaux locaux pour certifier chaque dossier d'urgence (rapports d'admission, devis opératoires, identité des patients). Le label 'Hôpital Vérifié' s'affiche sur la campagne pour garantir une transparence absolue aux donateurs.",
    },
    {
      q: "Mon argent est-il bloqué en cas d'imprévu non médical ?",
      a: "Non. Bien que la plateforme soit conçue pour encourager et automatiser votre épargne santé communautaire, vos fonds vous appartiennent. Vous pouvez effectuer un retrait d'urgence vers votre portefeuille Bitcoin personnel à tout moment.",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-orange-500 selection:text-slate-950 overflow-x-hidden">
      <Navbar />

      {/* Decorative gradient blur backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[1200px] left-1/3 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full"
            >
              <HeartPulse size={14} className="text-orange-400 animate-pulse" />
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Fintech & Santé Africaine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent"
            >
              Sécurité sanitaire pour tous.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Épargnez, financez et payez vos soins de santé plus intelligemment grâce à l'IA et à la technologie Bitcoin. Protégez votre famille contre l'inflation et soutenez votre communauté.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Tableau de Bord
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Démarrer Gratuitement
                  <ArrowRight size={18} />
                </Link>
              )}
              <button
                onClick={() => setShowVideoDemo(true)}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Play size={16} className="text-orange-400 fill-orange-400/20" />
                Regarder la Démo
              </button>
            </motion.div>

            {/* Micro proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-slate-500 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-orange-500" />
                <span>Pas de frais mensuels cachés</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-orange-500" />
                <span>Compatible Lightning Network</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-orange-500" />
                <span>Assistance IA disponible 24h/7</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Health Dashboard Preview Right */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative z-10"
            >
              {/* Floating Widget 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-slate-900/90 border border-orange-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Activity className="text-orange-400" size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Paludisme Saison</p>
                  <p className="text-xs font-bold text-orange-400">Risque Moyen (35%)</p>
                </div>
              </motion.div>

              {/* Floating Widget 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-slate-900/90 border border-orange-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Coins className="text-orange-500" size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Solde Bitcoin</p>
                  <p className="text-xs font-extrabold text-orange-500">0.02458 BTC</p>
                </div>
              </motion.div>

              {/* Main Preview Glass Card */}
              <GlassCard hoverEffect={false} glowColor="orange" className="p-6">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Épargne Santé Active</span>
                  </div>
                  <span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-md font-bold">Portefeuille Sécurisé</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-slate-500">Objectif : Maternité Ama</span>
                    <div className="flex justify-between items-end mt-1 mb-1.5">
                      <span className="text-xl font-bold text-white">320 000 / 500 000 FCFA</span>
                      <span className="text-xs font-semibold text-orange-400">64%</span>
                    </div>
                    {/* Custom progress bar */}
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '64%' }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-orange-950/20 border border-orange-500/10 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                      <BrainCircuit size={14} />
                      <span>Conseil IA d'Épargne :</span>
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      "Votre rythme actuel est stable. Épargnez 12% supplémentaires ce week-end pour compenser la hausse des prix pharmaceutiques de juillet."
                    </p>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button className="flex-1 bg-slate-900 hover:bg-slate-850 text-xs font-bold py-3 px-2 rounded-xl text-slate-300 border border-slate-800 transition">
                      Simuler Dépôt
                    </button>
                    <button className="flex-1 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 text-xs font-bold py-3 px-2 rounded-xl border border-orange-500/20 transition">
                      Payer par QR Code
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="border-y border-slate-900 bg-slate-900/10 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6">Partenaires Technologiques & Sanitaires de Confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <span key={index} className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="stats">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-orange-400">CareChain AI En Chiffres</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">Un impact réel sur la santé des communautés africaines</p>
          <p className="text-slate-400 text-sm">
            Notre plateforme allie la puissance globale de la blockchain Bitcoin aux opportunités d'inclusion locale pour soigner rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 text-center space-y-2 hover:border-slate-800 transition">
              <span className="text-[10px] uppercase font-mono font-bold text-orange-500 tracking-wider bg-orange-500/10 px-2 py-0.5 rounded-md">{stat.suffix}</span>
              <h3 className="text-3xl font-black text-white pt-2">{stat.value}</h3>
              <p className="text-sm font-semibold text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-900/20 border-t border-slate-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">Écosystème Intelligent</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Fonctionnalités clés conçues pour l'Afrique</h2>
            <p className="text-slate-400 text-sm">
              CareChain AI répond à trois défis majeurs : la dévaluation monétaire, le manque de couverture d'assurance médicale et l'absence d'outils d'orientation clinique.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div variants={itemVariants} key={idx}>
                  <GlassCard glowColor="orange" className="h-full p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                        <Icon size={22} className={feature.color} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-normal">{feature.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="testimonials">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">Témoignages Clients</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ceux qui nous font confiance pour leur santé</h2>
          <p className="text-slate-400 text-sm">Découvrez l'impact de l'épargne santé de solidarité à travers nos témoignages d'Afrique de l'Ouest et de l'Est.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <GlassCard key={idx} glowColor="amber" hoverEffect={true} className="p-6 flex flex-col justify-between h-full">
              <p className="text-sm text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-900/40">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-orange-500/20" />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-900/10 border-t border-slate-900" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">Aide & Support</span>
            <h2 className="text-3xl font-black text-white">Foire aux questions</h2>
            <p className="text-slate-400 text-sm">Tout ce que vous devez savoir pour démarrer et sécuriser la santé de votre foyer.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/30 border border-slate-900 rounded-xl overflow-hidden transition-colors hover:border-slate-800"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center text-white focus:outline-none"
                >
                  <span className="text-sm font-bold flex items-center gap-2">
                    <HelpCircle size={16} className="text-orange-500" />
                    {faq.q}
                  </span>
                  {activeFaq === idx ? <ChevronUp size={16} className="text-orange-400" /> : <ChevronDown size={16} className="text-orange-400" />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900/30 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-3xl blur-xl" />
        <div className="relative bg-slate-900 border border-orange-500/10 rounded-3xl p-8 sm:p-12 text-center space-y-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            Prêt à révolutionner l'épargne et le financement de votre santé ?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Rejoignez des milliers de familles africaines qui utilisent déjà CareChain AI pour se protéger contre l'inflation et assurer la prise en charge de leurs urgences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm px-8 py-3.5 rounded-xl hover:scale-105 transition shadow-lg shadow-orange-500/10"
              >
                Aller au Tableau de Bord
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm px-8 py-3.5 rounded-xl hover:scale-105 transition shadow-lg shadow-orange-500/10"
              >
                Créer Mon Compte Gratuit
              </Link>
            )}
            <Link
              to="/community"
              className="bg-slate-950 border border-slate-800 text-slate-300 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-slate-900 transition"
            >
              Voir les Campagnes Solidaires
            </Link>
          </div>
        </div>
      </section>

      {/* Video Demo Modal */}
      {showVideoDemo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowVideoDemo(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              Fermer ✕
            </button>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Play size={16} className="text-orange-400 animate-pulse" />
                Démo Vidéo : Comment fonctionne CareChain AI ?
              </h3>
              <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Play size={24} className="ml-1" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Démonstration Interactive de CareChain AI</p>
                  <p className="text-xs text-slate-500 max-w-sm pt-1">
                    Découvrez dans ce clip de 2 minutes le fonctionnement de l'épargne Bitcoin anti-inflation, le scan de QR Code en clinique et l'intégration de l'IA.
                  </p>
                </div>
                <button
                  onClick={() => {
                    alert('Lancement de la simulation vidéo de l\'application...');
                    setShowVideoDemo(false);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition hover:scale-105"
                >
                  Démarrer le Lecteur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
