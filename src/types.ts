export type MoneyEra = 
  | 'era_trueque'      // Era 1: Trueque & Doble Coincidencia (Cabras, Trigo, Cobre)
  | 'era_sal_cauri'    // Era 2: Conchas de Cauri & Saquitos de Sal (Primer Salario, Portabilidad)
  | 'era_forja_lidia'  // Era 3: Forja de Lidia & Monedas de Electro (Sello del León, Peso Garantizado)
  | 'era_bit_digital'; // Era 4: Ciberespacio, Blockchain & Bits (Pura Información y Confianza)

export type FinancialTier = 'Mercado del Trueque' | 'Rutas de la Sal y Cauri' | 'Reino de Lidia' | 'Ciberespacio del Bit';

export interface EraWisdom {
  id: string;
  era: MoneyEra;
  title: string;
  subtitle: string;
  characters: string;
  icon: string;
  quoteFromBook: string;
  coreConcept: string;
  riddleChallenge: string;
  riddleAnswer: string;
  lessonText: string;
  unlocked: boolean;
  color: string;
}

export interface BarterItem {
  id: string;
  name: string;
  type: 'cabra' | 'trigo' | 'cobre' | 'leche' | 'cesta' | 'herramienta';
  icon: string;
  description: string;
  count: number;
  tradeValueUnits: number;
  era: MoneyEra;
}

export interface StockAsset {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  previousPrice: number;
  dividendYield: number;
  sharesOwned: number;
  description: string;
  history: number[];
}

export interface BankAccount {
  id: 'bdv' | 'banco_plaza' | 'banco_tesoro';
  name: string;
  fullName: string;
  slogan: string;
  color: string;
  accentColor: string;
  badge: string;
  balance: number;
  interestRateAnnual: number;
  perks: string[];
  opened: boolean;
  creditAvailable: number;
  debt: number;
}

export interface TangibleProduct {
  id: string;
  name: string;
  type: 'trueque' | 'sal_cauri' | 'moneda' | 'digital';
  costToMake: number;
  marketValue: number;
  productionTimeSec: number;
  craftedCount: number;
  soldCount: number;
  description: string;
  icon: string;
}

export interface AssetRecord {
  id: string;
  name: string;
  category: 'Trueque & Insumos' | 'Depósito de Sal' | 'Forja de Lidia' | 'Nodos Blockchain' | 'Activos Reales';
  purchaseCost: number;
  monthlyPassiveIncome: number;
  quantity: number;
  icon: string;
  educationalWhy: string;
}

export interface LiabilityRecord {
  id: string;
  name: string;
  category: 'Gasto Fijo Hormiga' | 'Fricción de Trueque' | 'Pérdida por Inflación' | 'Trampa de Deuda';
  monthlyCost: number;
  totalDebt: number;
  icon: string;
  educationalWhy: string;
  canCancelOrPayoff: boolean;
}

export interface Quest {
  id: string;
  title: string;
  era: MoneyEra;
  locationName: string;
  locationId: string;
  riddle: string;
  hint: string;
  goalDescription: string;
  completed: boolean;
  targetType: 'barter_solve' | 'salt_measure' | 'mint_coin' | 'mine_bit' | 'craft' | 'bank_open' | 'buy_stock' | 'unlock_wisdom' | 'balance_sheet' | 'reach_cashflow';
  targetValue: number;
  currentValue: number;
  rewardPrestige: number;
  rewardCash: number;
}

export interface VillainThreat {
  id: string;
  name: string;
  title: string;
  category: 'Monstruo de Gasto Fijo' | 'Fricción del Trueque' | 'Falsificador de Moneda' | 'Ataque Cuántico';
  drainRatePerSec: number;
  health: number;
  maxHealth: number;
  weakness: string;
  description: string;
  active: boolean;
  defeated: boolean;
}

export interface BalanceSheetItem {
  id: string;
  label: string;
  amount: number;
  type: 'activo' | 'pasivo' | 'patrimonio';
  placedInSlot: 'activos_circulantes' | 'activos_fijos' | 'pasivos_corto' | 'pasivos_largo' | 'capital_social' | null;
}

export type ArchetypeId = 'streamer' | 'coder' | 'designer' | 'barista';

export interface CharacterArchetype {
  id: ArchetypeId;
  name: string;
  role: string;
  age: string;
  image: string;
  description: string;
  passiveBonusTitle: string;
  passiveBonusDescription: string;
  primaryColor: string;
  accentColor: string;
  stats: {
    flujo: number;
    innovacion: number;
    resiliencia: number;
  };
}

