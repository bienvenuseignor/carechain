export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  preferredHospital: string;
  currency: string;
  notificationsEnabled: boolean;
  privacyEnabled: boolean;
  kycStatus: 'non_verifie' | 'en_cours' | 'verifie';
  kycDocumentType?: string;
  kycDocumentNumber?: string;
  kycSubmittedAt?: string;
  kycDocumentUrl?: string;
  isAdmin?: boolean;
}

export interface SavingGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'Consultation' | 'Chirurgie' | 'Maternité' | 'Médicaments' | 'Dentaire' | 'Urgence';
  aiRecommendation?: string;
}

export interface EmergencyCampaign {
  id: string;
  title: string;
  userName: string;
  userAvatar: string;
  illnessDescription: string;
  urgencyLevel: 'Critique' | 'Élevé' | 'Moyen';
  targetAmount: number;
  currentAmount: number;
  hospitalName: string;
  hospitalVerified: boolean;
  documentName: string;
  backersCount: number;
  createdAt: string;
  story: string;
  status?: 'en_attente' | 'approuve' | 'rejete';
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Conjoint(e)' | 'Enfant' | 'Parent' | 'Frère/Sœur';
  avatar: string;
  healthSavings: number;
  healthSavingsTarget: number;
  lastUrgencyAlert?: string;
  status: 'Actif' | 'Alerte' | 'En attente';
  permissionLevel: 'Lecture' | 'Administration' | 'Alerte Uniquement';
}

export interface Transaction {
  id: string;
  type: 'depot' | 'retrait' | 'don' | 'paiement' | 'reception_btc';
  amount: number;
  amountBTC: number;
  description: string;
  date: string;
  status: 'Reussi' | 'En_cours' | 'Echoue';
  network: 'Lightning' | 'On-Chain' | 'CareChain-Internal';
  txHash?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PredictionData {
  month: string;
  estimatedExpense: number;
  savingsRecommended: number;
  riskScore: number;
  details: string;
}

export interface AppState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  users: UserProfile[];
  savingGoals: SavingGoal[];
  emergencyCampaigns: EmergencyCampaign[];
  familyMembers: FamilyMember[];
  transactions: Transaction[];
  chatHistory: ChatMessage[];
  predictions: PredictionData[];
  btcPriceUsd: number;
  theme: 'light' | 'dark';
}
