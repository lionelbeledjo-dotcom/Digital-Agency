import { create } from "zustand";

export type Plan = "starter" | "club_ia" | "pro_creator";
export type DemoMode = "visitor" | "member" | "admin";

export interface Formation {
  id: string;
  slug: string;
  titre: string;
  description: string;
  categorie: string;
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  acces: Plan;
  modules: number;
  duree: string;
  emoji: string;
  couleur: string;
  inscrits: number;
  note: number;
  apprentissages: string[];
  programme: { titre: string; lecons: { titre: string; duree: string }[] }[];
}

export interface Membre {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  pays: string;
  plan: Plan;
  dateInscription: string;
  filleulsActifs: number;
  commissionsTotal: number;
  statut: "actif" | "suspendu";
}

export interface Commission {
  id: string;
  date: string;
  filleulEmail: string;
  plan: Plan;
  montant: number;
  statut: "en_attente" | "verse" | "annule";
}

export interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  whatsapp: string;
  pays: string;
  plan: Plan;
  lienAffilie: string;
  dateInscription: string;
  filleulsActifs: number;
  commissionsTotal: number;
  commissionsMois: number;
  formationsCompletes: string[];
  formationsEnCours: { id: string; progression: number }[];
}

const formationsData: Formation[] = [
  { id: "f1", slug: "chatgpt-debutants", titre: "ChatGPT pour débutants absolus", description: "Maîtrise l'IA conversationnelle et automatise tes tâches quotidiennes.", categorie: "IA", niveau: "Débutant", acces: "starter", modules: 8, duree: "1h45", emoji: "🤖", couleur: "from-cobalt to-sky", inscrits: 2840, note: 4.9, apprentissages: ["Comprendre ChatGPT", "Écrire des prompts efficaces", "Automatiser des tâches", "Créer du contenu", "Gagner du temps", "Cas d'usage business"], programme: [
    { titre: "Introduction à ChatGPT", lecons: [{ titre: "Qu'est-ce que l'IA", duree: "8min" }, { titre: "Créer son compte", duree: "5min" }, { titre: "Premier prompt", duree: "10min" }] },
    { titre: "Prompts efficaces", lecons: [{ titre: "Structure d'un bon prompt", duree: "12min" }, { titre: "Templates", duree: "15min" }] },
    { titre: "Cas pratiques", lecons: [{ titre: "Rédaction", duree: "18min" }, { titre: "Analyse", duree: "12min" }, { titre: "Automatisation", duree: "20min" }] },
  ]},
  { id: "f2", slug: "canva-pro", titre: "Canva Pro : Maîtriser le design en 7 jours", description: "Crée des visuels pro pour tes réseaux et tes clients.", categorie: "Design", niveau: "Débutant", acces: "starter", modules: 10, duree: "2h30", emoji: "🎨", couleur: "from-teal to-sky", inscrits: 1920, note: 4.8, apprentissages: ["Maîtriser l'interface", "Créer des posts", "Designs réseaux", "Templates pro", "Animations", "Export optimisé"], programme: [{ titre: "Bases", lecons: [{ titre: "Interface", duree: "10min" }] }] },
  { id: "f3", slug: "affiliation-debut", titre: "Affiliation : Gagner ses premières commissions", description: "De zéro à ta première commission en 7 jours.", categorie: "Affiliation", niveau: "Débutant", acces: "starter", modules: 6, duree: "1h30", emoji: "💸", couleur: "from-gold to-teal", inscrits: 3200, note: 5.0, apprentissages: ["Comprendre l'affiliation", "Partager ton lien", "Convaincre", "WhatsApp pro", "Suivre tes commissions", "Réinvestir"], programme: [{ titre: "Démarrage", lecons: [{ titre: "Ton lien", duree: "5min" }] }] },
  { id: "f4", slug: "capcut-pro", titre: "CapCut Pro : Montage vidéo viral", description: "Crée des vidéos virales pour TikTok et Reels.", categorie: "Vidéo", niveau: "Intermédiaire", acces: "club_ia", modules: 12, duree: "3h", emoji: "🎬", couleur: "from-cobalt to-teal", inscrits: 1450, note: 4.9, apprentissages: ["Interface CapCut", "Coupes dynamiques", "Sous-titres auto", "Effets viraux", "Musique", "Export TikTok"], programme: [{ titre: "Bases", lecons: [{ titre: "Setup", duree: "10min" }] }] },
  { id: "f5", slug: "chatgpt-avance", titre: "ChatGPT Avancé : Prompts & Automatisation", description: "Niveau pro : automatise ton business avec l'IA.", categorie: "IA", niveau: "Intermédiaire", acces: "club_ia", modules: 15, duree: "4h", emoji: "🧠", couleur: "from-sky to-cobalt", inscrits: 980, note: 4.9, apprentissages: ["Prompts avancés", "Chaînes de pensée", "API ChatGPT", "Custom GPTs", "Plugins", "Workflows IA"], programme: [{ titre: "Avancé", lecons: [{ titre: "API", duree: "20min" }] }] },
  { id: "f6", slug: "marketing-digital", titre: "Marketing Digital de A à Z", description: "Le programme complet pour vendre en ligne.", categorie: "Marketing", niveau: "Intermédiaire", acces: "club_ia", modules: 20, duree: "6h", emoji: "📈", couleur: "from-teal to-cobalt", inscrits: 1680, note: 4.8, apprentissages: ["Stratégie", "Funnel de vente", "Email marketing", "Ads", "Analytics", "Conversion"], programme: [{ titre: "Stratégie", lecons: [{ titre: "Plan", duree: "15min" }] }] },
  { id: "f7", slug: "tiktok-ia", titre: "Créer du contenu viral sur TikTok avec l'IA", description: "Système pour pondre du contenu viral chaque jour.", categorie: "Réseaux", niveau: "Débutant", acces: "club_ia", modules: 8, duree: "2h", emoji: "📱", couleur: "from-cobalt to-gold", inscrits: 2100, note: 4.7, apprentissages: ["Trends", "Hooks", "Script IA", "Montage", "Hashtags", "Croissance"], programme: [{ titre: "Bases", lecons: [{ titre: "Algorithme", duree: "12min" }] }] },
  { id: "f8", slug: "midjourney", titre: "Midjourney & Génération d'images IA", description: "Crée des visuels époustouflants en quelques mots.", categorie: "IA", niveau: "Intermédiaire", acces: "club_ia", modules: 10, duree: "3h", emoji: "🖼️", couleur: "from-sky to-teal", inscrits: 870, note: 4.9, apprentissages: ["Prompts visuels", "Paramètres", "Styles", "Upscale", "Variations", "Usage commercial"], programme: [{ titre: "Bases", lecons: [{ titre: "Discord", duree: "10min" }] }] },
  { id: "f9", slug: "elevenlabs", titre: "ElevenLabs : Voix off professionnelles", description: "Voix off IA en français pour tes vidéos.", categorie: "IA", niveau: "Intermédiaire", acces: "club_ia", modules: 8, duree: "2h", emoji: "🎙️", couleur: "from-teal to-sky", inscrits: 620, note: 4.8, apprentissages: ["Voix françaises", "Clonage", "Émotions", "Multilingue", "Export", "Intégration vidéo"], programme: [{ titre: "Bases", lecons: [{ titre: "Compte", duree: "5min" }] }] },
  { id: "f10", slug: "notion-ia", titre: "Notion IA : Organisation & Productivité", description: "Organise ta vie et ton business avec Notion + IA.", categorie: "IA", niveau: "Débutant", acces: "club_ia", modules: 8, duree: "2h", emoji: "📝", couleur: "from-cobalt to-sky", inscrits: 1340, note: 4.8, apprentissages: ["Bases Notion", "Templates", "IA intégrée", "Bases de données", "Workflows", "Partage"], programme: [{ titre: "Setup", lecons: [{ titre: "Compte", duree: "8min" }] }] },
  { id: "f11", slug: "business-100k", titre: "Business en ligne : 0 à 100K FCFA/mois", description: "La méthode pas à pas pour atteindre 100K FCFA/mois.", categorie: "Business", niveau: "Avancé", acces: "pro_creator", modules: 25, duree: "8h", emoji: "💼", couleur: "from-gold to-cobalt", inscrits: 540, note: 5.0, apprentissages: ["Niche", "Offre", "Pricing", "Trafic", "Vente", "Scale"], programme: [{ titre: "Fondations", lecons: [{ titre: "Niche", duree: "25min" }] }] },
  { id: "f12", slug: "automatisation-n8n", titre: "Automatisation avec n8n et Zapier", description: "Automatise tout ton business sans coder.", categorie: "Automatisation", niveau: "Avancé", acces: "pro_creator", modules: 18, duree: "5h", emoji: "⚡", couleur: "from-teal to-cobalt", inscrits: 380, note: 4.9, apprentissages: ["Bases automation", "n8n self-hosted", "Zapier", "Webhooks", "API", "Workflows complexes"], programme: [{ titre: "Bases", lecons: [{ titre: "Concepts", duree: "15min" }] }] },
  { id: "f13", slug: "personal-branding", titre: "Personal Branding & Revenus en ligne", description: "Construis ta marque personnelle qui rapporte.", categorie: "Business", niveau: "Avancé", acces: "pro_creator", modules: 15, duree: "4h30", emoji: "⭐", couleur: "from-sky to-gold", inscrits: 720, note: 4.8, apprentissages: ["Positionnement", "Contenu", "Audience", "Monétisation", "Offre premium", "Communauté"], programme: [{ titre: "Brand", lecons: [{ titre: "Identité", duree: "18min" }] }] },
  { id: "f14", slug: "facebook-ads-ia", titre: "Facebook Ads avec l'IA", description: "Crée des campagnes Facebook rentables avec l'IA.", categorie: "Marketing", niveau: "Avancé", acces: "pro_creator", modules: 20, duree: "6h", emoji: "📊", couleur: "from-cobalt to-teal", inscrits: 460, note: 4.9, apprentissages: ["Setup compte", "Audiences", "Creatives IA", "Pixel", "Scaling", "Optimisation"], programme: [{ titre: "Bases", lecons: [{ titre: "Account", duree: "12min" }] }] },
  { id: "f15", slug: "vendre-formations", titre: "Créer et vendre ses propres formations", description: "De l'idée à 1M FCFA de chiffre.", categorie: "Business", niveau: "Avancé", acces: "pro_creator", modules: 22, duree: "7h", emoji: "🎓", couleur: "from-gold to-sky", inscrits: 310, note: 5.0, apprentissages: ["Choisir le sujet", "Tourner", "Plateforme", "Pricing", "Vente", "Support"], programme: [{ titre: "Idée", lecons: [{ titre: "Niche", duree: "20min" }] }] },
];

const mockUser: User = {
  id: "user_001",
  prenom: "Aminata",
  nom: "Koné",
  email: "aminata@example.com",
  whatsapp: "+225 07 00 00 00",
  pays: "Côte d'Ivoire",
  plan: "club_ia",
  lienAffilie: "https://lbdigital.com/ref/AMINATA2025",
  dateInscription: "2025-01-15",
  filleulsActifs: 12,
  commissionsTotal: 87400,
  commissionsMois: 10500,
  formationsCompletes: ["f1", "f7"],
  formationsEnCours: [
    { id: "f2", progression: 65 },
    { id: "f4", progression: 30 },
  ],
};

const mockMembres: Membre[] = Array.from({ length: 50 }, (_, i) => {
  const plans: Plan[] = ["starter", "club_ia", "pro_creator"];
  const pays = ["Côte d'Ivoire", "Sénégal", "Cameroun", "Mali", "Bénin", "Togo", "Burkina Faso", "Niger", "Guinée", "Congo", "Gabon", "France"];
  return {
    id: `m_${String(i + 1).padStart(3, "0")}`,
    prenom: ["Aminata","Kofi","Moussa","Awa","Ibrahim","Fatou","Jean","Marie","Paul","Sophie"][i % 10],
    nom: ["Koné","Mensah","Diallo","Traoré","Cissé","Diop","Kouassi","Bamba","Ndiaye","Touré"][i % 10] + ` ${i + 1}`,
    email: `membre${i + 1}@example.com`,
    pays: pays[i % pays.length],
    plan: plans[i % 3],
    dateInscription: new Date(Date.now() - i * 86400000 * 3).toISOString().slice(0, 10),
    filleulsActifs: Math.floor(Math.random() * 25),
    commissionsTotal: Math.floor(Math.random() * 150000),
    statut: i % 11 === 0 ? "suspendu" : "actif",
  };
});

const mockCommissions: Commission[] = Array.from({ length: 36 }, (_, i) => {
  const plans: Plan[] = ["starter", "club_ia", "pro_creator"];
  const statuts: Commission["statut"][] = ["en_attente", "verse", "verse", "verse", "annule"];
  const montants = [350, 875, 3400, 2125];
  return {
    id: `c_${i + 1}`,
    date: new Date(Date.now() - i * 86400000 * 4).toISOString().slice(0, 10),
    filleulEmail: `f***@${["gmail.com","yahoo.fr","outlook.com"][i % 3]}`,
    plan: plans[i % 3],
    montant: montants[i % montants.length],
    statut: statuts[i % statuts.length],
  };
});

interface AppStore {
  // Demo mode
  demoMode: DemoMode;
  setDemoMode: (mode: DemoMode) => void;

  // User
  currentUser: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;

  // Settings
  settings: {
    general: {
      nomPlateforme: string;
      tagline: string;
      email: string;
      whatsapp: string;
      devise: string;
      maintenanceMode: boolean;
      inscriptionsOuvertes: boolean;
    };
    plans: {
      starter: { nom: string; prixMensuel: number; commission: number; features: string[]; populaire: boolean };
      club_ia: { nom: string; prixMensuel: number; prixAnnuel: number; commission: number; features: string[]; populaire: boolean };
      pro_creator: { nom: string; prixMensuel: number; prixAnnuel: number; commission: number; features: string[]; populaire: boolean };
    };
    paiements: {
      wero: { actif: boolean; pays: string[] };
      paypal: { actif: boolean };
      mtn: { actif: boolean; pays: string[] };
      orange: { actif: boolean; pays: string[] };
    };
    affiliation: { cookieDuree: number; jourVersement: string; seuilMin: number };
  };
  updateSetting: (path: string, value: unknown) => void;

  // Data
  formations: Formation[];
  membres: Membre[];
  commissions: Commission[];
  getFormation: (id: string) => Formation | undefined;
}

const computeMode = (mode: DemoMode) => ({
  currentUser: mode === "visitor" ? null : mockUser,
  isLoggedIn: mode !== "visitor",
  isAdmin: mode === "admin",
});

export const useAppStore = create<AppStore>((set, get) => ({
  demoMode: "visitor",
  ...computeMode("visitor"),

  setDemoMode: (mode) => set({ demoMode: mode, ...computeMode(mode) }),
  login: () => set({ demoMode: "member", ...computeMode("member") }),
  logout: () => set({ demoMode: "visitor", ...computeMode("visitor") }),

  settings: {
    general: {
      nomPlateforme: "LB Digital",
      tagline: "Apprends. Partage. Gagne.",
      email: "contact@lbdigital.com",
      whatsapp: "+225 07 00 00 00 00",
      devise: "FCFA",
      maintenanceMode: false,
      inscriptionsOuvertes: true,
    },
    plans: {
      starter: { nom: "Starter", prixMensuel: 0, commission: 10, populaire: false, features: ["3 formations gratuites", "Lien affilié", "Groupe Telegram", "Commission 10%"] },
      club_ia: { nom: "Club IA", prixMensuel: 3500, prixAnnuel: 33600, commission: 25, populaire: true, features: ["Toutes les formations", "Nouvelles formations chaque semaine", "WhatsApp VIP", "Coaching de groupe", "Commission 25%", "Certificats"] },
      pro_creator: { nom: "Pro Creator", prixMensuel: 8500, prixAnnuel: 81600, commission: 40, populaire: false, features: ["Tout Club IA inclus", "Coaching 1-on-1", "Badge certifié", "Retrait prioritaire", "Avant-première", "Commission 40%", "Support prioritaire"] },
    },
    paiements: {
      wero: { actif: true, pays: ["France", "Belgique", "Allemagne", "Espagne", "Portugal"] },
      paypal: { actif: true },
      mtn: { actif: true, pays: ["Cameroun", "Côte d'Ivoire", "Bénin", "Congo", "Ghana"] },
      orange: { actif: true, pays: ["Côte d'Ivoire", "Sénégal", "Cameroun", "Mali", "Guinée"] },
    },
    affiliation: { cookieDuree: 365, jourVersement: "Vendredi", seuilMin: 500 },
  },
  updateSetting: (path, value) => {
    set((state) => {
      const next = structuredClone(state.settings) as Record<string, unknown>;
      const keys = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>;
      }
      cur[keys[keys.length - 1]] = value;
      return { settings: next as AppStore["settings"] };
    });
    void get;
  },

  formations: formationsData,
  membres: mockMembres,
  commissions: mockCommissions,
  getFormation: (id) => get().formations.find((f) => f.id === id || f.slug === id),
}));

export const PAYS_LIST = [
  "Côte d'Ivoire","Sénégal","Cameroun","Mali","Bénin","Togo","Burkina Faso","Niger","Guinée","Congo","Gabon","Ghana","France","Belgique","Allemagne","Espagne","Portugal","Autre"
];
