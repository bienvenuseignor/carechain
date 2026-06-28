import { create } from 'zustand';
import { AppState, UserProfile, SavingGoal, EmergencyCampaign, FamilyMember, Transaction, ChatMessage, PredictionData } from '../types';

interface AppActions {
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  signupWithKyc: (email: string, name: string, kycDocType: string, kycDocNumber: string, kycDocumentUrl: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addSavingGoal: (goal: Omit<SavingGoal, 'id' | 'currentAmount'>) => void;
  addFundsToGoal: (id: string, amount: number) => void;
  createCampaign: (campaign: Omit<EmergencyCampaign, 'id' | 'currentAmount' | 'backersCount' | 'createdAt' | 'userName' | 'userAvatar'>) => void;
  donateToCampaign: (id: string, amount: number) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'healthSavings' | 'status'>) => void;
  sendFamilySupport: (id: string, amount: number) => void;
  triggerFamilyAlert: (id: string, alertMessage: string) => void;
  resolveFamilyAlert: (id: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date' | 'txHash'>) => void;
  sendChatMessage: (content: string) => void;
  toggleTheme: () => void;
  approveKyc: (userId: string) => void;
  rejectKyc: (userId: string) => void;
  adminSetCampaignStatus: (id: string, status: 'approuve' | 'rejete') => void;
}

const mockPredictions: PredictionData[] = [
  { month: 'Juillet', estimatedExpense: 45000, savingsRecommended: 50000, riskScore: 35, details: 'Saison des pluies - Risque accru de paludisme. Prévoyez des fonds pour les moustiquaires et antipaludiques.' },
  { month: 'Août', estimatedExpense: 30000, savingsRecommended: 35000, riskScore: 20, details: 'Risque faible. Recommandé de maximiser l\'épargne pour le trimestre à venir.' },
  { month: 'Septembre', estimatedExpense: 65000, savingsRecommended: 70000, riskScore: 65, details: 'Rentrée scolaire et consultations de routine. Dépenses d\'orthodontie prévues pour les enfants.' },
  { month: 'Octobre', estimatedExpense: 40000, savingsRecommended: 45000, riskScore: 40, details: 'Période de transition climatique. Hydratation et vitamines recommandées.' },
  { month: 'Novembre', estimatedExpense: 55000, savingsRecommended: 60000, riskScore: 50, details: 'Poussière d\'Harmattan - Risques respiratoires accrus. Épargnez pour les inhalateurs et traitements.' },
  { month: 'Décembre', estimatedExpense: 80000, savingsRecommended: 90000, riskScore: 75, details: 'Fêtes de fin d\'année - Voyages et excès alimentaires. Augmentation statistique des admissions d\'urgence.' },
];

const initialUser: UserProfile = {
  id: 'user-1',
  name: 'Kofi Mensah',
  email: 'kofi.mensah@carechain.ai',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  phone: '+233 24 123 4567',
  bloodType: 'O+',
  allergies: ['Pénicilline', 'Pollen'],
  chronicConditions: ['Hypertension légère'],
  preferredHospital: 'Ridge Hospital, Accra',
  currency: 'FCFA',
  notificationsEnabled: true,
  privacyEnabled: false,
  kycStatus: 'non_verifie',
};

const initialGoals: SavingGoal[] = [
  {
    id: 'goal-1',
    title: 'Maternité & Accouchement Ama',
    description: 'Fonds réservé pour les examens prénatals et l\'accouchement de mon épouse prévu en Octobre.',
    targetAmount: 500000,
    currentAmount: 320000,
    deadline: '2026-09-15',
    category: 'Maternité',
    aiRecommendation: 'Excellent rythme ! Vous atteindrez votre objectif 3 semaines avant l\'échéance avec votre versement mensuel actuel.'
  },
  {
    id: 'goal-2',
    title: 'Vaccins & Pédiatrie Kwame',
    description: 'Suivi vaccinal complet pour Kwame.',
    targetAmount: 150000,
    currentAmount: 120000,
    deadline: '2026-08-01',
    category: 'Consultation',
    aiRecommendation: 'Presque atteint. Un versement unique complémentaire de 30 000 FCFA est conseillé ce mois-ci.'
  },
  {
    id: 'goal-3',
    title: 'Fonds d\'Urgence Dentaire',
    description: 'Soins dentaires imprévus pour toute la famille.',
    targetAmount: 300000,
    currentAmount: 85000,
    deadline: '2026-12-31',
    category: 'Dentaire',
    aiRecommendation: 'Rythme d\'épargne trop lent. Essayez d\'automatiser un virement de 10% de vos gains hebdomadaires en Bitcoin.'
  }
];

const initialCampaigns: EmergencyCampaign[] = [
  {
    id: 'camp-1',
    title: 'Urgence : Chirurgie Cardiaque Amina (5 ans)',
    userName: 'Fatoumata Diallo',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    illnessDescription: 'Malformation cardiaque congénitale nécessitant une intervention chirurgicale immédiate.',
    urgencyLevel: 'Critique',
    targetAmount: 3500000,
    currentAmount: 2800000,
    hospitalName: 'Hôpital Général de Dakar, Sénégal',
    hospitalVerified: true,
    documentName: 'rapport_medical_amina.pdf',
    backersCount: 142,
    createdAt: '2026-06-20',
    story: 'Amina est une fillette joyeuse de 5 ans diagnostiquée avec une anomalie du septum auriculaire. Les médecins recommandent une opération d\'ici la fin du mois pour lui donner une vie normale. En raison de nos faibles revenus familiaux, chaque don en Bitcoin (On-chain ou Lightning) nous rapproche de son salut. Merci infiniment !'
  },
  {
    id: 'camp-2',
    title: 'Traitement de Paludisme Sévère & Hospitalisation',
    userName: 'Chinedu Okafor',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
    illnessDescription: 'Paludisme neurologique sévère complété d\'une déshydratation aiguë chez un jeune agriculteur.',
    urgencyLevel: 'Élevé',
    targetAmount: 450000,
    currentAmount: 390000,
    hospitalName: 'Lagos University Teaching Hospital, Nigeria',
    hospitalVerified: true,
    documentName: 'fiche_admission_luth.pdf',
    backersCount: 54,
    createdAt: '2026-06-23',
    story: 'Chinedu a été admis d\'urgence après avoir perdu connaissance dans son champ. Le paludisme a atteint un stade critique. Ses parents ont déjà épuisé leurs économies pour les premiers soins. Nous sollicitons l\'aide de la communauté CareChain pour couvrir les frais de réanimation et les médicaments restants.'
  },
  {
    id: 'camp-3',
    title: 'Césarienne compliquée & Soins Néonataux',
    userName: 'Zainab Touré',
    userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=120',
    illnessDescription: 'Césarienne d\'urgence suite à une pré-éclampsie sévère, suivie d\'une mise en couveuse du prématuré.',
    urgencyLevel: 'Critique',
    targetAmount: 1200000,
    currentAmount: 450000,
    hospitalName: 'CHU de Cocody, Abidjan, Côte d\'Ivoire',
    hospitalVerified: true,
    documentName: 'dossier_maternite_toure.pdf',
    backersCount: 29,
    createdAt: '2026-06-24',
    story: 'Zainab a dû accoucher prématurément à 32 semaines en raison d\'une poussée de tension artérielle mortelle. Le bébé est actuellement en soins intensifs de néonatologie. Les frais journaliers de la couveuse et des soins de soutien sont extrêmement élevés pour notre famille de maraîchers.'
  }
];

const initialFamily: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Ama Mensah',
    relationship: 'Conjoint(e)',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120',
    healthSavings: 450000,
    healthSavingsTarget: 500000,
    status: 'Actif',
    permissionLevel: 'Administration'
  },
  {
    id: 'fam-2',
    name: 'Kwame Mensah',
    relationship: 'Enfant',
    avatar: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=120',
    healthSavings: 80000,
    healthSavingsTarget: 150000,
    status: 'Actif',
    permissionLevel: 'Lecture'
  },
  {
    id: 'fam-3',
    name: 'Mami Sowah',
    relationship: 'Parent',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
    healthSavings: 15000,
    healthSavingsTarget: 300000,
    status: 'Alerte',
    lastUrgencyAlert: 'Pic d\'hypertension - Ridge Hospital, Accra',
    permissionLevel: 'Alerte Uniquement'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'depot',
    amount: 150000,
    amountBTC: 0.0035,
    description: 'Dépôt d\'épargne mensuel via Bitcoin Lightning',
    date: '2026-06-24 14:32',
    status: 'Reussi',
    network: 'Lightning',
    txHash: 'cc59b8...1da0'
  },
  {
    id: 'tx-2',
    type: 'don',
    amount: 50000,
    amountBTC: 0.0012,
    description: 'Don d\'urgence pour la chirurgie d\'Amina',
    date: '2026-06-22 09:15',
    status: 'Reussi',
    network: 'Lightning',
    txHash: 'e3f01b...99a1'
  },
  {
    id: 'tx-3',
    type: 'paiement',
    amount: 25000,
    amountBTC: 0.0006,
    description: 'Paiement pharmacie - Ordonnance Kwame',
    date: '2026-06-18 11:05',
    status: 'Reussi',
    network: 'Lightning',
    txHash: '88db82...44f2'
  },
  {
    id: 'tx-4',
    type: 'reception_btc',
    amount: 80000,
    amountBTC: 0.0019,
    description: 'Soutien reçu de l\'oncle de Kwame',
    date: '2026-06-15 16:40',
    status: 'Reussi',
    network: 'On-Chain',
    txHash: '001a4e...cb73'
  }
];

const initialChatHistory: ChatMessage[] = [
  {
    id: 'chat-1',
    sender: 'assistant',
    content: 'Bonjour ! Je suis l\'Assistant Santé de CareChain AI. Je suis là pour répondre à vos questions médicales de premier niveau, vous aider à suivre vos traitements ou vous conseiller sur la gestion de votre budget santé communautaire. Que puis-je faire pour vous aujourd\'hui ?',
    timestamp: '2026-06-25 19:30'
  }
];

const initialUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@carechain.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '+233 24 123 4567',
    bloodType: 'O+',
    allergies: ['Pénicilline', 'Pollen'],
    chronicConditions: ['Hypertension légère'],
    preferredHospital: 'Ridge Hospital, Accra',
    currency: 'FCFA',
    notificationsEnabled: true,
    privacyEnabled: false,
    kycStatus: 'verifie',
    kycDocumentType: "Carte Nationale d'Identité",
    kycDocumentNumber: "CNI-GHA-12345",
    kycSubmittedAt: "2026-06-20",
    kycDocumentUrl: "cni_kofi_mensah.png"
  },
  {
    id: 'user-2',
    name: 'Fatoumata Diallo',
    email: 'fatoumata.diallo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    phone: '+221 77 654 3210',
    bloodType: 'A-',
    allergies: [],
    chronicConditions: [],
    preferredHospital: 'Hôpital Général de Dakar',
    currency: 'FCFA',
    notificationsEnabled: true,
    privacyEnabled: true,
    kycStatus: 'en_cours',
    kycDocumentType: "Passeport International",
    kycDocumentNumber: "PAS-SEN-98765",
    kycSubmittedAt: "2026-06-25",
    kycDocumentUrl: "passport_diallo.png"
  },
  {
    id: 'user-3',
    name: 'Yao Kouassi',
    email: 'yao.kouassi@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
    phone: '+225 05 987 6543',
    bloodType: 'O-',
    allergies: [],
    chronicConditions: ['Diabète Type 2'],
    preferredHospital: 'CHU de Cocody',
    currency: 'FCFA',
    notificationsEnabled: false,
    privacyEnabled: false,
    kycStatus: 'non_verifie'
  }
];

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  isAuthenticated: true, // Started as authenticated for direct UX engagement in dashboard
  user: initialUser,
  users: initialUsers,
  savingGoals: initialGoals,
  emergencyCampaigns: initialCampaigns.map(c => ({ ...c, status: 'approuve' as const })),
  familyMembers: initialFamily,
  transactions: initialTransactions,
  chatHistory: initialChatHistory,
  predictions: mockPredictions,
  btcPriceUsd: 65420,
  theme: 'dark', // Modern tech-first sleek look, we will support toggle

  login: (email, name) => {
    const isAdmin = email.toLowerCase() === 'admin@carechain.ai';
    const activeUser: UserProfile = {
      ...initialUser,
      id: isAdmin ? 'admin-1' : 'user-1',
      email,
      name: isAdmin ? 'CareChain Administrator' : (name || email.split('@')[0]),
      isAdmin,
      kycStatus: isAdmin ? 'verifie' : 'non_verifie',
      avatar: isAdmin ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' : initialUser.avatar,
    };
    set((state) => ({
      isAuthenticated: true,
      user: activeUser,
      // If the logged in user is not in the list, add them
      users: state.users.some(u => u.email.toLowerCase() === email.toLowerCase())
        ? state.users
        : [...state.users, activeUser]
    }));
  },

  signup: (email, name) => {
    const isAdmin = email.toLowerCase() === 'admin@carechain.ai';
    const newUser: UserProfile = {
      ...initialUser,
      id: `user-${Date.now()}`,
      email,
      name,
      isAdmin,
      kycStatus: 'non_verifie',
    };
    set((state) => ({
      isAuthenticated: true,
      user: newUser,
      users: [...state.users, newUser],
    }));
  },

  signupWithKyc: (email, name, kycDocType, kycDocNumber, kycDocumentUrl) => {
    const isAdmin = email.toLowerCase() === 'admin@carechain.ai';
    const newUser: UserProfile = {
      ...initialUser,
      id: `user-${Date.now()}`,
      email,
      name,
      isAdmin,
      kycStatus: 'en_cours',
      kycDocumentType: kycDocType === 'cni' ? "Carte Nationale d'Identité" : kycDocType === 'passport' ? "Passeport International" : "Carte CEDEAO",
      kycDocumentNumber: kycDocNumber,
      kycDocumentUrl,
      kycSubmittedAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      isAuthenticated: true,
      user: newUser,
      users: [...state.users, newUser],
    }));
  },

  logout: () => set({
    isAuthenticated: false,
    user: null,
  }),

  approveKyc: (userId) => set((state) => {
    const updatedUsers = state.users.map((u) => {
      if (u.id === userId) {
        return { ...u, kycStatus: 'verifie' as const };
      }
      return u;
    });

    const updatedActiveUser = state.user && state.user.id === userId
      ? { ...state.user, kycStatus: 'verifie' as const }
      : state.user;

    return {
      users: updatedUsers,
      user: updatedActiveUser
    };
  }),

  rejectKyc: (userId) => set((state) => {
    const updatedUsers = state.users.map((u) => {
      if (u.id === userId) {
        return { 
          ...u, 
          kycStatus: 'non_verifie' as const, 
          kycDocumentNumber: undefined, 
          kycDocumentType: undefined, 
          kycSubmittedAt: undefined, 
          kycDocumentUrl: undefined 
        };
      }
      return u;
    });

    const updatedActiveUser = state.user && state.user.id === userId
      ? { 
          ...state.user, 
          kycStatus: 'non_verifie' as const, 
          kycDocumentNumber: undefined, 
          kycDocumentType: undefined, 
          kycSubmittedAt: undefined, 
          kycDocumentUrl: undefined 
        }
      : state.user;

    return {
      users: updatedUsers,
      user: updatedActiveUser
    };
  }),

  adminSetCampaignStatus: (id, status) => set((state) => {
    const updatedCampaigns = state.emergencyCampaigns.map((c) => {
      if (c.id === id) {
        return { ...c, status };
      }
      return c;
    });
    return { emergencyCampaigns: updatedCampaigns };
  }),

  updateProfile: (profile) => set((state) => ({
    user: state.user ? { ...state.user, ...profile } : null
  })),

  addSavingGoal: (goal) => set((state) => {
    const newGoal: SavingGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
      aiRecommendation: 'Objectif configuré avec succès. Vos dépôts réguliers assureront la réussite d\'ici l\'échéance !'
    };
    return { savingGoals: [...state.savingGoals, newGoal] };
  }),

  addFundsToGoal: (id, amount) => set((state) => {
    const updatedGoals = state.savingGoals.map((g) => {
      if (g.id === id) {
        const nextAmount = g.currentAmount + amount;
        let rec = g.aiRecommendation;
        if (nextAmount >= g.targetAmount) {
          rec = 'Félicitations ! Objectif d\'épargne santé de 100% atteint. Votre capital est sécurisé.';
        } else if (nextAmount / g.targetAmount > 0.75) {
          rec = 'Excellent ! Plus de 75% complétés. Vous approchez rapidement du but.';
        }
        return { ...g, currentAmount: Math.min(nextAmount, g.targetAmount), aiRecommendation: rec };
      }
      return g;
    });

    // Create a transaction for it
    const updatedUser = state.user;
    const amountBTC = Number((amount / (state.btcPriceUsd * 600)).toFixed(6)); // simulated exchange rate 1 BTC = ~600 * price of BTC in local currency roughly
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'depot',
      amount,
      amountBTC,
      description: `Alimentation objectif : ${state.savingGoals.find(g => g.id === id)?.title || ''}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Reussi',
      network: 'Lightning',
      txHash: `bc1q${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };

    return {
      savingGoals: updatedGoals,
      transactions: [newTx, ...state.transactions]
    };
  }),

  createCampaign: (campaign) => set((state) => {
    const newCampaign: EmergencyCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      currentAmount: 0,
      backersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      userName: state.user?.name || 'Anonyme',
      userAvatar: state.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
    };
    return { emergencyCampaigns: [newCampaign, ...state.emergencyCampaigns] };
  }),

  donateToCampaign: (id, amount) => set((state) => {
    const updatedCampaigns = state.emergencyCampaigns.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          currentAmount: Math.min(c.currentAmount + amount, c.targetAmount),
          backersCount: c.backersCount + 1
        };
      }
      return c;
    });

    const targetCampaign = state.emergencyCampaigns.find((c) => c.id === id);
    const amountBTC = Number((amount / (state.btcPriceUsd * 600)).toFixed(6));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'don',
      amount,
      amountBTC,
      description: `Don d'urgence : ${targetCampaign?.title || 'Soutien'}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Reussi',
      network: 'Lightning',
      txHash: `bc1q${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };

    return {
      emergencyCampaigns: updatedCampaigns,
      transactions: [newTx, ...state.transactions]
    };
  }),

  addFamilyMember: (member) => set((state) => {
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`,
      healthSavings: 0,
      status: 'Actif'
    };
    return { familyMembers: [...state.familyMembers, newMember] };
  }),

  sendFamilySupport: (id, amount) => set((state) => {
    const updatedFamily = state.familyMembers.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          healthSavings: f.healthSavings + amount,
          status: f.status === 'Alerte' ? 'Actif' : f.status
        };
      }
      return f;
    });

    const targetFamily = state.familyMembers.find((f) => f.id === id);
    const amountBTC = Number((amount / (state.btcPriceUsd * 600)).toFixed(6));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'paiement',
      amount,
      amountBTC,
      description: `Aide familiale envoyée à : ${targetFamily?.name || 'Famille'}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Reussi',
      network: 'Lightning',
      txHash: `bc1q${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };

    return {
      familyMembers: updatedFamily,
      transactions: [newTx, ...state.transactions]
    };
  }),

  triggerFamilyAlert: (id, alertMessage) => set((state) => ({
    familyMembers: state.familyMembers.map((f) =>
      f.id === id ? { ...f, status: 'Alerte', lastUrgencyAlert: alertMessage } : f
    )
  })),

  resolveFamilyAlert: (id) => set((state) => ({
    familyMembers: state.familyMembers.map((f) =>
      f.id === id ? { ...f, status: 'Actif', lastUrgencyAlert: undefined } : f
    )
  })),

  addTransaction: (tx) => set((state) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      txHash: `bc1q${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    return { transactions: [newTx, ...state.transactions] };
  }),

  sendChatMessage: (content) => set((state) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date().toISOString().replace('T', ' ').substring(11, 16)
    };

    // Simulated medical responses in French
    let reply = "Je comprends votre question. Pouvez-vous me donner plus de détails sur vos antécédents médicaux ?";
    const textLower = content.toLowerCase();

    if (textLower.includes('palu') || textLower.includes('fièvre') || textLower.includes('moustique')) {
      reply = `**Alerte paludisme détectée :** Vos symptômes évoquent un risque d'infection palustre. \n\n**Recommandations immédiates :**\n1. Effectuez un test de diagnostic rapide (TDR) en pharmacie ou clinique.\n2. Ne pratiquez pas l'automédication sans diagnostic.\n3. Reposez-vous et buvez beaucoup d'eau saline.\n\n*Rappel : Vos économies "Suivi Kwame" ou "Fonds de secours" peuvent être transférées instantanément vers l'un de nos hôpitaux partenaires en Bitcoin.*`;
    } else if (textLower.includes('tension') || textLower.includes('cardiaque') || textLower.includes('coeur')) {
      reply = `**Suivi Cardio & Hypertension :**\n\nPour une tension stable, nous vous recommandons :\n- De limiter le sel et l'huile de palme dans vos repas.\n- D'effectuer 30 minutes de marche modérée.\n- De surveiller votre tension tous les matins à jeun.\n\nVotre profil indique : *Hypertension légère*. Votre médecin traitant au **Ridge Hospital, Accra** peut consulter vos données d'épargne d'urgence si vous l'y autorisez dans vos paramètres de confidentialité.`;
    } else if (textLower.includes('bitcoin') || textLower.includes('wallet') || textLower.includes('epargne') || textLower.includes('lightning')) {
      reply = `**Assistance Épargne & Lightning :**\n\nSur CareChain AI, vous épargnez en Bitcoin pour vous prémunir de l'inflation locale. Vos fonds bénéficient :\n- D'une liquidité instantanée via le réseau **Lightning**.\n- D'une protection multi-signature sécurisée.\n- De rendements intelligents basés sur des micro-contributions de la communauté.\n\nSouhaitez-vous créer un nouvel objectif pour votre cercle familial ?`;
    } else if (textLower.includes('remède') || textLower.includes('plante') || textLower.includes('médicament')) {
      reply = `**Conseils d'usage des médicaments :**\n- Suivez scrupuleusement les prescriptions des médecins certifiés sur CareChain.\n- N'achetez jamais de médicaments de rue.\n- Nos pharmacies partenaires scannent le QR Code de l'application pour valider vos ordonnances et déduire les frais en temps réel.`;
    } else if (textLower.includes('enceinte') || textLower.includes('bébé') || textLower.includes('grossesse') || textLower.includes('maternité')) {
      reply = `**Suivi Maternité Intégré :**\n\nFélicitations pour cet heureux événement à venir ! Pour l'objectif **"Maternité & Accouchement Ama"** :\n- Prévoyez vos visites prénatales de contrôle tous les mois.\n- Votre progression actuelle est excellente (64% atteints).\n- Vous pouvez automatiser des micro-dons de votre entourage en partageant votre QR Code familial de solidarité.`;
    }

    const botMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      content: reply,
      timestamp: new Date().toISOString().replace('T', ' ').substring(11, 16)
    };

    return {
      chatHistory: [...state.chatHistory, userMsg, botMsg]
    };
  }),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
}));
