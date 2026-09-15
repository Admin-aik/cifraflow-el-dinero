import { create } from 'zustand';
import { 
  MoneyEra,
  FinancialTier, 
  EraWisdom, 
  BankAccount, 
  StockAsset, 
  TangibleProduct, 
  AssetRecord, 
  LiabilityRecord, 
  Quest, 
  VillainThreat,
  BalanceSheetItem,
  BarterItem,
  ArchetypeId,
  GameFlowState,
  QuizQuestion,
  InvestmentLedger,
  InvestmentEvent,
  FloatingScoreEvent,
  TextScale,
  BcvRateInfo,
  EraInvestmentAsset
} from '../types';
import { soundFx } from '../utils/audio';
import { narratorEngine } from '../utils/narrator';
import { bcvService } from '../utils/bcvService';
import { INITIAL_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { INITIAL_ERA_INVESTMENTS } from '../data/eraInvestments';

export const INITIAL_INVESTMENT_LEDGER: InvestmentLedger = {
  investmentFund: 350,
  totalInvestmentPoints: 150,
  stats: {
    answers: {
      correctCount: 0,
      wrongCount: 0,
      pointsGained: 0,
      pointsLost: 0
    },
    attacks: {
      hitsCount: 0,
      villainsDefeatedCount: 0,
      pointsGained: 0,
      pointsLost: 0
    },
    construction: {
      craftedCount: 0,
      pointsGained: 0,
      pointsLost: 0
    },
    investments: {
      totalInvestedCash: 0,
      stocksBoughtCount: 0,
      projectsFundedCount: 0,
      passiveReturnGenerated: 0
    }
  },
  recentEvents: [
    {
      id: 'init_welcome_ledger',
      timestamp: Date.now(),
      type: 'invest_gain',
      category: 'inversion',
      title: 'Capital Semilla de Inversión Asignado',
      description: 'Kai y Lia te otorgan $350 y 150 Pts para comenzar tu portafolio de inversión.',
      deltaPoints: 150,
      deltaCash: 350
    }
  ]
};

export const INITIAL_ERAS: EraWisdom[] = [
  {
    id: 'era_1_trueque',
    era: 'era_trueque',
    title: 'Era 1: El Mercado del Trueque & La Cabra Inquieta',
    subtitle: 'La Doble Coincidencia de Necesidades',
    characters: 'Kai, Lia, La Cabra Marrón y el Mercader de Grano',
    icon: '🐐',
    quoteFromBook: 'Kai tira de la cuerda de una cabra inquieta, mientras Lia carga con cestas vacías, buscando desesperadamente a alguien que necesite leche a cambio de sacos de trigo. Pero el mercader ya tiene tres cabras y solo busca herramientas de cobre.',
    coreConcept: 'El trueque es un rompecabezas donde las piezas casi nunca encajan. La "doble coincidencia de necesidades" consume tiempo y energía valiosa.',
    riddleChallenge: 'Tengo cuatro patas y doy leche de primera, pero quien tiene el trigo que busco solo quiere cobre en su cantera. ¿Cómo rompemos este nudo sin perder la tarde entera?',
    riddleAnswer: 'Encontrando un intermediario de intercambio o fabricando la herramienta de cobre que el mercader desea.',
    lessonText: 'El dinero surgió para eliminar la fricción del trueque directo. Sin un medio común de cambio, el comercio queda paralizado.',
    unlocked: true,
    color: '#f59e0b'
  },
  {
    id: 'era_2_sal_cauri',
    era: 'era_sal_cauri',
    title: 'Era 2: Conchas de Cauri & Saquitos de Sal',
    subtitle: 'El Primer Salario: Portabilidad y Divisibilidad',
    characters: 'Lia sosteniendo conchas de cauri y Kai guardando sal pura',
    icon: '🧂',
    quoteFromBook: 'Lia sostiene un puñado de brillantes conchas de cauri, pequeñas y ligeras como tesoros, mientras Kai guarda con celo un saquito de sal pura. La sal no solo da sabor, sino que es el primer "salario". Ahora, el valor de una cabra cabe en la palma de su mano.',
    coreConcept: 'El dinero mercancía: El valor de una cabra ahora es portátil, duradero y, sobre todo, divisible en raciones exactas.',
    riddleChallenge: 'Blanca y cristalina en la cocina da sabor, pagó las legiones romanas con honor. ¿Qué tesoro mineral dio origen a la palabra "salario"?',
    riddleAnswer: 'La sal pura, el primer depósito divisible y duradero de valor humano.',
    lessonText: 'Un buen dinero debe ser divisible en partes pequeñas, fácil de transportar y resistente al paso del tiempo.',
    unlocked: false,
    color: '#06b6d4'
  },
  {
    id: 'era_3_forja_lidia',
    era: 'era_forja_lidia',
    title: 'Era 3: La Forja de Lidia & El Sello del León',
    subtitle: 'Acuñación de Monedas de Electro & Confianza Estandarizada',
    characters: 'El artesano Dario, el rey de Lidia y Kai fascinado ante el yunque',
    icon: '🦁',
    quoteFromBook: 'En el reino de Lidia, el artesano Dario golpea un trozo de electro —mezcla natural de oro y plata—. Con un golpe seco de martillo, estampa el sello de un león sobre el metal, garantizando su peso y pureza. La confianza ahora tiene forma de disco reluciente.',
    coreConcept: 'La moneda acuñada estandariza el peso y la pureza. Ya no hace falta llevar balanzas a cada trato: el sello del león garantiza la confianza.',
    riddleChallenge: 'En el yunque de Lidia un herrero golpeó, oro y plata en electro unió. Con la cara de un rey feroz selló... ¿qué animal garantiza su peso y valor?',
    riddleAnswer: 'El León de Lidia, símbolo de la primera moneda acuñada con peso y pureza oficial.',
    lessonText: 'La estandarización reduce los costos de transacción y permite que el comercio cruce fronteras y mares lejanos.',
    unlocked: false,
    color: '#eab308'
  },
  {
    id: 'era_4_bit_digital',
    era: 'era_bit_digital',
    title: 'Era 4: El Ciberespacio & La Red Invisible',
    subtitle: 'Del Papel al Bit: Dinero como Información y Blockchain',
    characters: 'Kai y Lia en el ciberespacio con pantallas holográficas y visores de neón',
    icon: '⚡',
    quoteFromBook: 'En el presente, Kai y Lia ya no tocan el dinero. Sentados en un entorno de luces de neón y flujos de datos, observan sus pantallas donde los números bailan en tiempo real. El dinero se ha transformado en código, en impulsos eléctricos y redes de blockchain.',
    coreConcept: 'El dinero moderno es pura información y confianza compartida en una red global invisible que conecta el mundo entero a la velocidad de la luz.',
    riddleChallenge: 'No tiene cuerpo que puedas tocar, ni óxido que lo pueda dañar. Viaja en impulsos de luz y código binario para conectar a millones... ¿qué soy?',
    riddleAnswer: 'El Bit y las redes descentralizadas de Blockchain.',
    lessonText: 'El valor no depende del material físico (ni sal, ni oro, ni papel), sino del consenso, la escasez verificable y la confianza de las personas.',
    unlocked: false,
    color: '#a855f7'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest_1_trueque',
    title: 'Acertijo 1: La Cabra y la Doble Coincidencia',
    era: 'era_trueque',
    locationName: 'Mercado Ancestral del Trueque',
    locationId: 'mercado_trueque',
    riddle: 'Kai tira de una cabra inquieta y Lia busca trigo, pero el mercader solo pide herramientas de cobre. ¿Cómo romperás la fricción del trueque?',
    hint: 'Dirígete al Mercado Ancestral y resuelve el intercambio de Cabra -> Cobre -> Trigo.',
    goalDescription: 'Resolver 1 intercambio de trueque en el Mercado',
    completed: false,
    targetType: 'barter_solve',
    targetValue: 1,
    currentValue: 0,
    rewardPrestige: 150,
    rewardCash: 100
  },
  {
    id: 'quest_2_cobre_tool',
    title: 'Acertijo 2: El Forjado de Herramientas',
    era: 'era_trueque',
    locationName: 'Puesto de Artesanía del Mercado',
    locationId: 'mercado_trueque',
    riddle: 'La materia prima cobra vida cuando el ingenio la transforma. Fabrica una herramienta de cobre para satisfacer la demanda del mercader.',
    hint: 'Fabrica herramientas de cobre en el taller del mercado.',
    goalDescription: 'Fabricar 2 Herramientas de Cobre',
    completed: false,
    targetType: 'craft',
    targetValue: 2,
    currentValue: 0,
    rewardPrestige: 200,
    rewardCash: 150
  },
  {
    id: 'quest_3_sal_cauri',
    title: 'Acertijo 3: El Salario de la Tierra y el Mar',
    era: 'era_sal_cauri',
    locationName: 'Costa de Cauri & Almacén de Sal',
    locationId: 'almacen_sal',
    riddle: 'El valor de una cabra entera ahora cabe en la palma de tu mano. Mide saquitos de sal pura y cuenta conchas de cauri para pagar la jornada.',
    hint: 'Entra al Almacén de Sal y procesa raciones de sal y conchas de cauri.',
    goalDescription: 'Medir y empaquetar 5 Saquitos de Sal Pura',
    completed: false,
    targetType: 'salt_measure',
    targetValue: 5,
    currentValue: 0,
    rewardPrestige: 250,
    rewardCash: 300
  },
  {
    id: 'quest_4_banco_custodia',
    title: 'Acertijo 4: La Bóveda de Custodia',
    era: 'era_sal_cauri',
    locationName: 'Cámaras de Depósito Bancario',
    locationId: 'bancos',
    riddle: 'Cargar sacos pesados atrae a los bandidos del camino. Deposita tus tesoros de sal y cauri en una bóveda segura para obtener certificados negociables.',
    hint: 'Abre tu primera cuenta de custodia en el distrito bancario.',
    goalDescription: 'Abrir 1 Cuenta Bancaria de Custodia',
    completed: false,
    targetType: 'bank_open',
    targetValue: 1,
    currentValue: 0,
    rewardPrestige: 300,
    rewardCash: 350
  },
  {
    id: 'quest_5_forja_lidia',
    title: 'Acertijo 5: El Golpe del León de Lidia',
    era: 'era_forja_lidia',
    locationName: 'La Forja Real de Lidia (Lydian Mint)',
    locationId: 'forja_lidia',
    riddle: 'Dario sostiene el martillo sobre el electro al rojo vivo. Golpea en el momento exacto para estampar la fiera que garantiza peso y pureza.',
    hint: 'Acuña monedas de electro con el sello del león en la forja de Lidia.',
    goalDescription: 'Acuñar 3 Monedas de Electro con Sello del León',
    completed: false,
    targetType: 'mint_coin',
    targetValue: 3,
    currentValue: 0,
    rewardPrestige: 400,
    rewardCash: 500
  },
  {
    id: 'quest_6_bolsa_dividendos',
    title: 'Acertijo 6: La Flota Comercial & Los Dividendos',
    era: 'era_forja_lidia',
    locationName: 'Bolsa de Valores & Comercio de Ultramar',
    locationId: 'bolsa',
    riddle: 'Con monedas estándar, los barcos cruzan los mares. Invierte en acciones de gremios productivos para recibir tributos y dividendos pasivos.',
    hint: 'Adquiere acciones de empresas productivas en la Bolsa de Valores.',
    goalDescription: 'Comprar 5 acciones en la Bolsa',
    completed: false,
    targetType: 'buy_stock',
    targetValue: 5,
    currentValue: 0,
    rewardPrestige: 450,
    rewardCash: 600
  },
  {
    id: 'quest_7_balance_sheet',
    title: 'Acertijo 7: El Templo de la Ecuación Contable',
    era: 'era_bit_digital',
    locationName: 'Vivero de Ideas & Hoja de Balance',
    locationId: 'vivero',
    riddle: 'Para dominar el dinero moderno, debes comprender la gran ley universal: Activos = Pasivos + Patrimonio. Ordena los bloques flotantes.',
    hint: 'Equilibra la Hoja de Balance 3D en el Vivero de Ideas.',
    goalDescription: 'Resolver la Hoja de Balance Contable',
    completed: false,
    targetType: 'balance_sheet',
    targetValue: 1,
    currentValue: 0,
    rewardPrestige: 500,
    rewardCash: 800
  },
  {
    id: 'quest_8_blockchain_bit',
    title: 'Acertijo 8: La Red Invisible de Datos',
    era: 'era_bit_digital',
    locationName: 'Torre Cuántica del Bit & Blockchain',
    locationId: 'red_digital',
    riddle: 'Kai y Lia observan números bailando en pantallas de neón. Conecta nodos descentralizados y mina bloques de información compartida.',
    hint: 'Valida bloques y mina bits en la Torre Cuántica de la Red Digital.',
    goalDescription: 'Minar y validar 10 Bits en la Red Blockchain',
    completed: false,
    targetType: 'mine_bit',
    targetValue: 10,
    currentValue: 0,
    rewardPrestige: 600,
    rewardCash: 1200
  },
  {
    id: 'quest_9_flujo_cosmico',
    title: 'Acertijo Supremo: La Libertad Financiera Universal',
    era: 'era_bit_digital',
    locationName: 'Metrópolis Cuántica del Valor',
    locationId: 'totems',
    riddle: 'Has viajado desde el trueque de una cabra hasta los impulsos de luz cuánticos. Alcanza un flujo de caja pasivo mayor a $400/tick.',
    hint: 'Construye un portafolio diversificado que genere más de $400 de flujo pasivo constante.',
    goalDescription: 'Generar Flujo Pasivo > $400/tick',
    completed: false,
    targetType: 'reach_cashflow',
    targetValue: 400,
    currentValue: 0,
    rewardPrestige: 1000,
    rewardCash: 5000
  }
];

export const INITIAL_TANGIBLES: TangibleProduct[] = [
  {
    id: 'cobre_tool',
    name: 'Herramienta de Cobre Forjado',
    type: 'trueque',
    costToMake: 25,
    marketValue: 80,
    productionTimeSec: 3,
    craftedCount: 0,
    soldCount: 0,
    description: 'Pieza clave de intercambio. El mercader de grano la busca con desesperación para labrar sus campos.',
    icon: '🪓'
  },
  {
    id: 'saco_sal_premium',
    name: 'Saquito de Sal Marina Pura ("Salario")',
    type: 'sal_cauri',
    costToMake: 45,
    marketValue: 140,
    productionTimeSec: 5,
    craftedCount: 0,
    soldCount: 0,
    description: 'La sal no solo da sabor, es el primer depósito de valor duradero y divisible que cabe en la mano.',
    icon: '🧂'
  },
  {
    id: 'moneda_leon_lidia',
    name: 'Moneda de Electro con Sello del León',
    type: 'moneda',
    costToMake: 110,
    marketValue: 350,
    productionTimeSec: 8,
    craftedCount: 0,
    soldCount: 0,
    description: 'Aleación natural de oro y plata acuñada a golpe de martillo con el sello del león de Dario.',
    icon: '🦁'
  },
  {
    id: 'smart_contract_node',
    name: 'Contrato Inteligente & Bloque Criptográfico',
    type: 'digital',
    costToMake: 250,
    marketValue: 850,
    productionTimeSec: 12,
    craftedCount: 0,
    soldCount: 0,
    description: 'Código descentralizado que transfiere valor automáticamente sin intermediarios ni fronteras.',
    icon: '⛓️'
  }
];

export const INITIAL_BANKS: BankAccount[] = [
  {
    id: 'bdv',
    name: 'Banco de Venezuela (BDV)',
    fullName: 'Banco de Venezuela - Red Digital & Cuenta Nómina',
    slogan: 'El mayor músculo de liquidez y banca digital del país',
    color: '#d61a29',
    accentColor: '#ffe600',
    badge: 'BDV',
    balance: 0,
    interestRateAnnual: 18.5,
    perks: ['Pago Móvil Interbancario Instantáneo', 'Microcrédito para Jóvenes Emprendedores', 'Custodia de Activos Digitales'],
    opened: false,
    creditAvailable: 1500,
    debt: 0
  },
  {
    id: 'banco_plaza',
    name: 'Banco Plaza',
    fullName: 'Banco Plaza - "Tú Cuentas"',
    slogan: 'Banca comercial ágil especializada en comercio y tesorería empresarial',
    color: '#008752',
    accentColor: '#c5e86c',
    badge: 'PLAZA',
    balance: 0,
    interestRateAnnual: 22.0,
    perks: ['Mesa de Dinero & Cambio de Divisas', 'Cuentas de Alto Rendimiento Empresarial', 'Financiamiento de Inventario'],
    opened: false,
    creditAvailable: 2200,
    debt: 0
  },
  {
    id: 'banco_tesoro',
    name: 'Banco del Tesoro',
    fullName: 'Banco del Tesoro - Ahorro e Inversión Productiva',
    slogan: 'Fortaleza financiera para proyectos de innovación y desarrollo soberano',
    color: '#e59500',
    accentColor: '#1a365d',
    badge: 'TESORO',
    balance: 0,
    interestRateAnnual: 19.8,
    perks: ['Certificados de Ahorro Programado', 'Tasa Bonificada para Emprendedores', 'Seguro Contra Fraudes Digitales'],
    opened: false,
    creditAvailable: 1800,
    debt: 0
  }
];

export const INITIAL_STOCKS: StockAsset[] = [
  {
    ticker: 'RST',
    name: 'Ron Santa Teresa BVC',
    sector: 'Agroindustria & Exportación Global',
    price: 45.5,
    previousPrice: 42.0,
    dividendYield: 8.4,
    sharesOwned: 0,
    description: 'Empresa bicentenaria cotizada en la Bolsa de Caracas con exportación a más de 80 países.',
    history: [40, 41.5, 39.8, 43.2, 45.5]
  },
  {
    ticker: 'BNC',
    name: 'Banco Nacional de Crédito',
    sector: 'Servicios Financieros & Pagos',
    price: 32.0,
    previousPrice: 33.2,
    dividendYield: 11.2,
    sharesOwned: 0,
    description: 'Institución financiera líder en intermediación de liquidez y plataformas de pago.',
    history: [29, 30.5, 31.8, 33.2, 32.0]
  },
  {
    ticker: 'FVI',
    name: 'Fondo Valores Inmobiliarios',
    sector: 'Bienes Raíces & Centros Comerciales',
    price: 68.0,
    previousPrice: 64.5,
    dividendYield: 9.6,
    sharesOwned: 0,
    description: 'Portafolio premium de torres corporativas que generan alquileres recurrentes.',
    history: [60, 62, 63.5, 64.5, 68.0]
  },
  {
    ticker: 'TDV',
    name: 'CANTV Clase D',
    sector: 'Telecomunicaciones & Red de Fibra',
    price: 18.2,
    previousPrice: 17.5,
    dividendYield: 7.1,
    sharesOwned: 0,
    description: 'Infraestructura de telecomunicaciones expandiendo el anillo nacional de fibra óptica.',
    history: [15.2, 16.0, 16.8, 17.5, 18.2]
  }
];

export const INITIAL_BALANCE_ITEMS: BalanceSheetItem[] = [
  { id: 'b_cash', label: 'Efectivo en Bóveda & Cuentas', amount: 800, type: 'activo', placedInSlot: null },
  { id: 'b_tools', label: 'Inventario de Sal y Cauri', amount: 450, type: 'activo', placedInSlot: null },
  { id: 'b_forge', label: 'Yunque & Forja de Lidia (Activo Fijo)', amount: 1200, type: 'activo', placedInSlot: null },
  { id: 'b_debt_short', label: 'Deuda con Mercader de Trigo (Corto Plazo)', amount: 350, type: 'pasivo', placedInSlot: null },
  { id: 'b_debt_long', label: 'Préstamo de la Forja Real (Largo Plazo)', amount: 600, type: 'pasivo', placedInSlot: null },
  { id: 'b_equity', label: 'Patrimonio de Kai & Lia (Capital Social)', amount: 1500, type: 'patrimonio', placedInSlot: null }
];

export const INITIAL_VILLAINS: VillainThreat[] = [
  {
    id: 'friccion_trueque',
    name: 'Fricción-Tron del Trueque',
    title: 'El Monstruo de la Doble Coincidencia',
    category: 'Fricción del Trueque',
    drainRatePerSec: 8,
    health: 80,
    maxHealth: 80,
    weakness: 'Adopción de sal pura y conchas de cauri divisibles',
    description: 'Un monstruo hecho de cadenas oxidadas y trueques fallidos que drena tu tiempo cuando nadie quiere lo que ofreces.',
    active: true,
    defeated: false
  },
  {
    id: 'falsificador_moneda',
    name: 'Falsificador de Electro',
    title: 'El Ladrón de Pureza Metálica',
    category: 'Falsificador de Moneda',
    drainRatePerSec: 14,
    health: 120,
    maxHealth: 120,
    weakness: 'Sello oficial del León de Lidia y verificación de densidad',
    description: 'Intenta mezclar metales viles sin el sello del león para devaluar la confianza del mercado.',
    active: true,
    defeated: false
  },
  {
    id: 'gasto_fantasma',
    name: 'GastoFijo-Phantom',
    title: 'Devorador de Liquidez Automática',
    category: 'Monstruo de Gasto Fijo',
    drainRatePerSec: 18,
    health: 100,
    maxHealth: 100,
    weakness: 'Presupuesto base cero y visión de flujo activa',
    description: 'Suscripciones y gastos invisibles que carcomen las utilidades antes de poder reinvertir.',
    active: true,
    defeated: false
  }
];

interface GameState {
  // Game Flow State: Login -> Character Creation -> Transition -> Map Gameplay
  gameFlowState: GameFlowState;
  isLoggedIn: boolean;
  playerName: string;
  playerEmail: string;
  playerTitle: string;
  selectedRelic: string;

  // Student Identification (Fase 0)
  studentName: string;
  studentCedula: string;
  studentSchool: string;
  setStudentData: (name: string, cedula: string, school: string) => void;

  // Text Accessibility Controller (A-, A 100%, A+ 115%, A++ 130%)
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;

  // BCV Live Rate Integration
  bcvRateInfo: BcvRateInfo;
  refreshBcvRate: (silent?: boolean) => Promise<void>;

  // Right-Side HUD Scores (Can be negative!)
  levelPoints: number;
  cumulativePoints: number;
  addScore: (deltaPoints: number, reason?: string) => void;
  deductScore: (deltaPoints: number, reason?: string) => void;

  // Navigation History
  phaseHistory: GameFlowState[];
  setGameFlowState: (phase: GameFlowState) => void;
  goBack: () => void;
  goToModules: () => void;

  // Challenges & Missions (Fases 4 & 5)
  currentChallengeIndex: number;
  lastChallengeFinished: { title: string; earnedPoints: number; cumulativePoints: number; isNegative: boolean } | null;
  finishCurrentChallenge: (title: string, earnedPoints: number) => void;
  continueNextChallenge: () => void;
  finishMission: () => void;

  // Correlative Eras Progression
  completedEras: MoneyEra[];
  completeEraAndAdvance: (era: MoneyEra) => void;
  setCorrelativeEra: (era: MoneyEra) => void;

  // Player stats
  cash: number;
  monthlyPassiveIncome: number;
  monthlyExpenses: number;
  prestigePoints: number;
  currentEra: MoneyEra;
  stage: FinancialTier;
  archetypeId: ArchetypeId;

  // Inventory of the Time Traveler
  goatsCount: number;
  wheatSacks: number;
  copperToolsCount: number;
  saltSacksCount: number;
  cowrieShellsCount: number;
  electrumCoinsCount: number;
  digitalBitsCount: number;

  // Flow Vision Mode
  flowVisionActive: boolean;

  // Modals & Navigation
  activeModal: string | null;
  selectedDynastyId: string | null;
  selectedBankId: 'bdv' | 'banco_plaza' | 'banco_tesoro';
  notification: { title: string; message: string; type: 'success' | 'info' | 'warning' | 'achievement' } | null;

  // Data Collections
  eras: EraWisdom[];
  quests: Quest[];
  tangibles: TangibleProduct[];
  banks: BankAccount[];
  stocks: StockAsset[];
  assets: AssetRecord[];
  liabilities: LiabilityRecord[];
  villains: VillainThreat[];
  balanceItems: BalanceSheetItem[];

  // Navigation & Flow Actions
  setLoginData: (name: string, email?: string) => void;
  completeCharacterCreation: (data: { archetypeId: ArchetypeId; playerName: string; playerTitle: string; selectedRelic: string }) => void;
  startMapGameplay: () => void;
  goToLogin: () => void;
  goToCharacterCreation: () => void;

  // In-Game Actions
  toggleFlowVision: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setSelectedDynasty: (id: string | null) => void;
  setSelectedBank: (id: 'bdv' | 'banco_plaza' | 'banco_tesoro') => void;
  setArchetype: (id: ArchetypeId) => void;
  setNotification: (notif: GameState['notification']) => void;
  clearNotification: () => void;

  // Era Mini-Games & Mechanics
  solveBarterPuzzle: () => void;
  processSaltAndCowrie: () => void;
  strikeLydianCoin: () => void;
  mineBlockchainBits: () => void;

  // General Crafting & Trading
  craftProduct: (productId: string) => void;
  sellProduct: (productId: string) => void;
  buyStock: (ticker: string, shares: number) => void;
  sellStock: (ticker: string, shares: number) => void;
  openBank: (bankId: 'bdv' | 'banco_plaza' | 'banco_tesoro') => void;
  depositBank: (bankId: 'bdv' | 'banco_plaza' | 'banco_tesoro', amount: number) => void;
  withdrawBank: (bankId: 'bdv' | 'banco_plaza' | 'banco_tesoro', amount: number) => void;
  takeCredit: (bankId: 'bdv' | 'banco_plaza' | 'banco_tesoro', amount: number) => void;
  payoffDebt: (bankId: 'bdv' | 'banco_plaza' | 'banco_tesoro', amount: number) => void;
  unlockEraWisdom: (eraId: string) => void;

  // Balance Sheet Game
  placeBalanceItem: (itemId: string, slot: BalanceSheetItem['placedInSlot']) => void;
  verifyBalanceSheet: () => boolean;

  // Anti-Fraud Combat
  attackVillain: (villainId: string, damage: number) => void;
  receiveVillainDrainPenalty: (villainId: string) => void;

  // Investment Ledger, Era Investments & Quizzes
  investmentLedger: InvestmentLedger;
  quizQuestions: QuizQuestion[];
  eraInvestments: EraInvestmentAsset[];
  floatingScoreEvent: FloatingScoreEvent | null;
  answerQuizQuestion: (questionId: string, choice: number | boolean | string) => void;
  investPointsInEraAsset: (assetId: string) => void;
  investFundInStock: (ticker: string, shares: number) => void;
  investInProductiveProject: (projectId: string, cost: number, monthlyReturn: number, name: string) => void;
  clearFloatingScore: () => void;

  // Clock Tick
  tick: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Flow State
  gameFlowState: 'login',
  isLoggedIn: false,
  playerName: 'Ircar Rojas',
  playerEmail: 'rojasircar@gmail.com',
  playerTitle: 'Cyber-Cadete CifraFlow',
  selectedRelic: 'cencerro_cabra',

  // Student Identification (Fase 0)
  studentName: 'Ircar Rojas',
  studentCedula: 'V-31.450.820',
  studentSchool: 'Liceo Nacional de Ciencias y Tecnología',

  // Text Accessibility Scale
  textScale: 'normal',

  // BCV Live Rate Integration
  bcvRateInfo: bcvService.getCurrentRate(),

  // Right-Side HUD Scores (Negative scores permitted!)
  levelPoints: 0,
  cumulativePoints: 0,

  // Navigation History
  phaseHistory: ['login'],

  // Challenge Progression (Fases 4 & 5)
  currentChallengeIndex: 1,
  lastChallengeFinished: null,

  // Correlative Eras Progression
  completedEras: [],

  cash: 250,
  monthlyPassiveIncome: 25,
  monthlyExpenses: 15,
  prestigePoints: 50,
  currentEra: 'era_trueque',
  stage: 'Mercado del Trueque',
  archetypeId: 'jorge',

  goatsCount: 1,
  wheatSacks: 0,
  copperToolsCount: 0,
  saltSacksCount: 0,
  cowrieShellsCount: 0,
  electrumCoinsCount: 0,
  digitalBitsCount: 0,

  flowVisionActive: false,
  activeModal: null,
  selectedDynastyId: null,
  selectedBankId: 'bdv',
  notification: {
    title: '¡Bienvenido al Viaje del Valor!',
    message: 'Acompaña a Kai y Lia en el mercado antiguo. Ayúdales a resolver el gran dilema de la cabra y el trigo.',
    type: 'info'
  },

  eras: INITIAL_ERAS,
  quests: INITIAL_QUESTS,
  tangibles: INITIAL_TANGIBLES,
  banks: INITIAL_BANKS,
  stocks: INITIAL_STOCKS,
  assets: [
    {
      id: 'asset_goat_milk',
      name: 'Cabra Lechera & Cestas de Lia',
      category: 'Trueque & Insumos',
      purchaseCost: 80,
      monthlyPassiveIncome: 12,
      quantity: 1,
      icon: '🐐',
      educationalWhy: 'Genera leche diaria que sirve como bien negociable en el mercado antiguo.'
    }
  ],
  liabilities: [
    {
      id: 'liab_forraje',
      name: 'Forraje y Cuerda de la Cabra',
      category: 'Fricción de Trueque',
      monthlyCost: 6,
      totalDebt: 0,
      icon: '🌾',
      educationalWhy: 'Costos de mantenimiento mientras buscas a alguien que acepte trueque.',
      canCancelOrPayoff: false
    }
  ],
  villains: INITIAL_VILLAINS,
  balanceItems: INITIAL_BALANCE_ITEMS,
  investmentLedger: INITIAL_INVESTMENT_LEDGER,
  quizQuestions: INITIAL_QUIZ_QUESTIONS,
  eraInvestments: INITIAL_ERA_INVESTMENTS,
  floatingScoreEvent: null,

  // --- FLOW TRANSITION ACTIONS ---
  setStudentData: (name: string, cedula: string, school: string) => {
    soundFx.playPowerUp();
    set(prev => {
      const trimmedName = name.trim() || prev.studentName;
      const trimmedCedula = cedula.trim() || prev.studentCedula;
      const trimmedSchool = school.trim() || prev.studentSchool;
      return {
        studentName: trimmedName,
        studentCedula: trimmedCedula,
        studentSchool: trimmedSchool,
        playerName: trimmedName,
        isLoggedIn: true,
        gameFlowState: 'character_creation',
        phaseHistory: [...prev.phaseHistory, 'character_creation'],
        notification: {
          title: '¡Registro de Cyber-Cadete Exitoso!',
          message: `${trimmedName} (${trimmedCedula}), tu credencial de ${trimmedSchool} ha sido verificada. Elige tu avatar.`,
          type: 'success'
        }
      };
    });
  },

  setTextScale: (scale: TextScale) => {
    soundFx.playClick();
    set({ textScale: scale });
  },

  refreshBcvRate: async (silent: boolean = false) => {
    if (!silent) {
      soundFx.playCoin();
    }
    const newRate = await bcvService.fetchLiveRate();
    set({ bcvRateInfo: newRate });
  },

  addScore: (deltaPoints: number, reason?: string) => {
    soundFx.playSuccess();
    set(prev => {
      const newLevel = prev.levelPoints + deltaPoints;
      const newCumulative = prev.cumulativePoints + deltaPoints;
      return {
        levelPoints: newLevel,
        cumulativePoints: newCumulative,
        floatingScoreEvent: {
          id: `score_${Date.now()}_${Math.random()}`,
          text: `+${deltaPoints} Pts • ${reason || 'Acierto'}`,
          deltaPoints,
          type: 'gain',
          category: 'respuestas'
        }
      };
    });
  },

  deductScore: (deltaPoints: number, reason?: string) => {
    soundFx.playError();
    set(prev => {
      const pointsToSubtract = Math.abs(deltaPoints);
      // Can result in negative numbers freely (e.g. -25, -50, etc.)
      const newLevel = prev.levelPoints - pointsToSubtract;
      const newCumulative = prev.cumulativePoints - pointsToSubtract;
      return {
        levelPoints: newLevel,
        cumulativePoints: newCumulative,
        floatingScoreEvent: {
          id: `score_loss_${Date.now()}_${Math.random()}`,
          text: `-${pointsToSubtract} Pts • ${reason || 'Penalización'}`,
          deltaPoints: -pointsToSubtract,
          type: 'loss',
          category: 'respuestas'
        }
      };
    });
  },

  setGameFlowState: (phase: GameFlowState) => {
    soundFx.playClick();
    set(prev => ({
      gameFlowState: phase,
      phaseHistory: [...prev.phaseHistory, phase]
    }));
  },

  goBack: () => {
    soundFx.playClick();
    set(prev => {
      // If an active modal is open on the map, goBack dismisses the modal first
      if (prev.activeModal) {
        return { activeModal: null };
      }
      if (prev.phaseHistory.length > 1) {
        const nextHistory = [...prev.phaseHistory];
        nextHistory.pop(); // remove current phase
        const targetPhase = nextHistory[nextHistory.length - 1] || 'character_creation';
        return {
          gameFlowState: targetPhase,
          phaseHistory: nextHistory
        };
      }
      // Intelligent fallback when history has 1 element
      let fallbackPhase: GameFlowState = 'login';
      if (prev.gameFlowState === 'map_gameplay') fallbackPhase = 'module_selection';
      else if (prev.gameFlowState === 'module_selection') fallbackPhase = 'character_creation';
      else if (prev.gameFlowState === 'character_creation') fallbackPhase = 'login';
      else if (prev.gameFlowState === 'transition') fallbackPhase = 'character_creation';
      else if (prev.gameFlowState === 'game_over_challenge') fallbackPhase = 'map_gameplay';
      else if (prev.gameFlowState === 'mission_complete') fallbackPhase = 'map_gameplay';
      else if (prev.gameFlowState === 'login') {
        fallbackPhase = prev.isLoggedIn ? 'character_creation' : 'login';
      }

      return {
        gameFlowState: fallbackPhase,
        phaseHistory: fallbackPhase === 'login' ? ['login'] : ['login', fallbackPhase]
      };
    });
  },

  goToModules: () => {
    soundFx.playClick();
    set(prev => ({
      gameFlowState: 'module_selection',
      phaseHistory: [...prev.phaseHistory, 'module_selection']
    }));
  },

  finishCurrentChallenge: (title: string, earnedPoints: number) => {
    soundFx.playVictory();
    narratorEngine.play('game_over_reto');
    set(prev => {
      const isNeg = earnedPoints < 0;
      return {
        lastChallengeFinished: {
          title,
          earnedPoints,
          cumulativePoints: prev.cumulativePoints,
          isNegative: isNeg
        },
        currentChallengeIndex: prev.currentChallengeIndex + 1,
        gameFlowState: 'game_over_challenge',
        phaseHistory: [...prev.phaseHistory, 'game_over_challenge']
      };
    });
  },

  continueNextChallenge: () => {
    soundFx.playPowerUp();
    set(prev => {
      // If reached challenge 6 or higher, finish mission
      if (prev.currentChallengeIndex > 5) {
        narratorEngine.play('fin_mision');
        return {
          gameFlowState: 'mission_complete',
          phaseHistory: [...prev.phaseHistory, 'mission_complete']
        };
      }
      return {
        gameFlowState: 'map_gameplay',
        phaseHistory: [...prev.phaseHistory, 'map_gameplay'],
        levelPoints: 0 // Reset level points for new challenge while keeping cumulativePoints
      };
    });
  },

  finishMission: () => {
    soundFx.playVictory();
    narratorEngine.play('fin_mision');
    set(prev => ({
      gameFlowState: 'mission_complete',
      phaseHistory: [...prev.phaseHistory, 'mission_complete']
    }));
  },

  completeEraAndAdvance: (era: MoneyEra) => {
    soundFx.playVictory();
    set(prev => {
      const alreadyCompleted = prev.completedEras.includes(era);
      const newCompleted = alreadyCompleted ? prev.completedEras : [...prev.completedEras, era];
      
      let nextEra: MoneyEra = 'era_sal_cauri';
      let nextStage: FinancialTier = 'Rutas de la Sal y Cauri';
      let modalToOpen: string | null = null;
      let rewardPts = 150;
      let eraTitle = '';

      if (era === 'era_trueque') {
        nextEra = 'era_sal_cauri';
        nextStage = 'Rutas de la Sal y Cauri';
        modalToOpen = 'almacen_sal';
        eraTitle = 'Era 1 (El Mercado del Trueque)';
      } else if (era === 'era_sal_cauri') {
        nextEra = 'era_forja_lidia';
        nextStage = 'Reino de Lidia';
        modalToOpen = 'forja_lidia';
        eraTitle = 'Era 2 (Sal y Cauri)';
      } else if (era === 'era_forja_lidia') {
        nextEra = 'era_bit_digital';
        nextStage = 'Ciberespacio del Bit';
        modalToOpen = 'red_digital';
        eraTitle = 'Era 3 (La Forja de Lidia)';
      } else if (era === 'era_bit_digital') {
        nextEra = 'era_bit_digital';
        nextStage = 'Ciberespacio del Bit';
        modalToOpen = null;
        rewardPts = 200;
        eraTitle = 'Era 4 (La Red Digital & Blockchain)';
      }

      // Unlock next era in eras collection
      const updatedEras = prev.eras.map(e => {
        if (e.era === era) {
          return { ...e, unlocked: true };
        }
        if (e.era === nextEra) {
          return { ...e, unlocked: true };
        }
        return e;
      });

      const nextLevelPts = prev.levelPoints + rewardPts;
      const nextCumPts = prev.cumulativePoints + rewardPts;

      return {
        completedEras: newCompleted,
        currentEra: nextEra,
        stage: nextStage,
        eras: updatedEras,
        levelPoints: nextLevelPts,
        cumulativePoints: nextCumPts,
        activeModal: prev.activeModal === 'cuadro_eras' ? 'cuadro_eras' : modalToOpen,
        notification: {
          title: `¡Misión de la ${eraTitle} Superada!`,
          message: era === 'era_bit_digital' 
            ? '¡Has completado las 4 Eras correlativamente! ¡Reclama tu Certificado de Competencias!'
            : `Avanzando correlativamente hacia la siguiente era: ${nextStage}. (+${rewardPts} Pts)`,
          type: 'achievement'
        }
      };
    });
  },

  setCorrelativeEra: (era: MoneyEra) => {
    soundFx.playClick();
    set(prev => {
      let stage: FinancialTier = 'Mercado del Trueque';
      if (era === 'era_sal_cauri') stage = 'Rutas de la Sal y Cauri';
      if (era === 'era_forja_lidia') stage = 'Reino de Lidia';
      if (era === 'era_bit_digital') stage = 'Ciberespacio del Bit';

      return {
        currentEra: era,
        stage
      };
    });
  },

  setLoginData: (name: string, email?: string) => {
    soundFx.playPowerUp();
    set({
      playerName: name.trim() || 'Viajero del Tiempo',
      playerEmail: email?.trim() || '',
      isLoggedIn: true,
      gameFlowState: 'character_creation',
      notification: {
        title: '¡Identificación Exitosa!',
        message: `Bienvenido a la Cámara Temporal, ${name || 'Viajero'}. Elige y forja tu personaje.`,
        type: 'success'
      }
    });
  },

  completeCharacterCreation: (data) => {
    soundFx.playSuccess();
    const { archetypeId, playerName, playerTitle, selectedRelic } = data;

    // Apply specific starter relic benefits
    let bonusCash = 0;
    let bonusGoats = 0;
    let bonusSalt = 0;
    let bonusCowrie = 0;
    let bonusElectrum = 0;
    let bonusBits = 0;
    let bonusPrestige = 0;
    let bonusPassive = 0;

    if (selectedRelic === 'cencerro_cabra') {
      bonusCash = 100;
      bonusGoats = 1;
    } else if (selectedRelic === 'frasco_sal') {
      bonusSalt = 5;
      bonusCowrie = 10;
    } else if (selectedRelic === 'sello_leon') {
      bonusElectrum = 2;
      bonusPrestige = 100;
    } else if (selectedRelic === 'chip_cuantico') {
      bonusBits = 4;
      bonusPassive = 15;
    }

    set(prev => ({
      archetypeId,
      playerName: playerName.trim() || prev.playerName,
      playerTitle: playerTitle.trim() || prev.playerTitle,
      selectedRelic,
      cash: prev.cash + bonusCash,
      goatsCount: prev.goatsCount + bonusGoats,
      saltSacksCount: prev.saltSacksCount + bonusSalt,
      cowrieShellsCount: prev.cowrieShellsCount + bonusCowrie,
      electrumCoinsCount: prev.electrumCoinsCount + bonusElectrum,
      digitalBitsCount: prev.digitalBitsCount + bonusBits,
      prestigePoints: prev.prestigePoints + bonusPrestige,
      monthlyPassiveIncome: prev.monthlyPassiveIncome + bonusPassive,
      gameFlowState: 'transition',
      phaseHistory: [...prev.phaseHistory, 'transition'],
      notification: {
        title: '¡Personaje Forjado!',
        message: `${playerName}, has forjado tu identidad como ${playerTitle}. ¡Iniciando salto al Mapa de las Eras!`,
        type: 'achievement'
      }
    }));
  },

  startMapGameplay: () => {
    soundFx.playPowerUp();
    set(prev => ({
      gameFlowState: 'map_gameplay',
      phaseHistory: [...prev.phaseHistory, 'map_gameplay'],
      activeModal: null
    }));
  },

  goToLogin: () => {
    soundFx.playClick();
    set(prev => ({
      gameFlowState: 'login',
      phaseHistory: [...prev.phaseHistory, 'login']
    }));
  },

  goToCharacterCreation: () => {
    soundFx.playClick();
    set(prev => ({
      gameFlowState: 'character_creation',
      phaseHistory: [...prev.phaseHistory, 'character_creation']
    }));
  },

  toggleFlowVision: () => {
    soundFx.playPowerUp();
    set(state => ({ flowVisionActive: !state.flowVisionActive }));
  },

  openModal: (modalId: string) => {
    soundFx.playClick();
    set({ activeModal: modalId });
  },

  closeModal: () => {
    soundFx.playClick();
    set({ activeModal: null });
  },

  setSelectedDynasty: (id: string | null) => {
    if (id) soundFx.playSuccess();
    set({ selectedDynastyId: id, activeModal: id ? 'dynasty' : null });
  },

  setSelectedBank: (id: 'bdv' | 'banco_plaza' | 'banco_tesoro') => {
    set({ selectedBankId: id });
  },

  setArchetype: (id: ArchetypeId) => {
    soundFx.playSuccess();
    set({ archetypeId: id });
  },

  setNotification: (notif) => {
    set({ notification: notif });
  },

  clearNotification: () => {
    set({ notification: null });
  },

  // --- ERA 1: TRUEQUE PUZZLE ---
  solveBarterPuzzle: () => {
    const state = get();
    soundFx.playSuccess();

    set(prev => {
      const newGoats = Math.max(0, prev.goatsCount - 1);
      const newWheat = prev.wheatSacks + 3;
      const newCopper = Math.max(0, prev.copperToolsCount - 1);
      const newPrestige = prev.prestigePoints + 60;
      const newCash = prev.cash + 45;

      // Update Quests
      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_1_trueque') {
          return { ...q, currentValue: q.currentValue + 1, completed: true };
        }
        return q;
      });

      return {
        goatsCount: newGoats,
        wheatSacks: newWheat,
        copperToolsCount: newCopper,
        prestigePoints: newPrestige,
        cash: newCash,
        quests: updatedQuests,
        currentEra: 'era_sal_cauri',
        stage: 'Rutas de la Sal y Cauri',
        notification: {
          title: '¡Doble Coincidencia Resuelta!',
          message: 'Kai y Lia intercambiaron la cabra y herramientas por trigo dorado. ¡Has desbloqueado la Era de la Sal y el Cauri!',
          type: 'achievement'
        }
      };
    });
  },

  // --- ERA 2: SAL & CAURI MEASURING ---
  processSaltAndCowrie: () => {
    soundFx.playCoin();
    set(prev => {
      const newSalt = prev.saltSacksCount + 1;
      const newCowrie = prev.cowrieShellsCount + 4;
      const newCash = prev.cash + 35;
      const newPrestige = prev.prestigePoints + 40;

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_3_sal_cauri') {
          const val = q.currentValue + 1;
          return { ...q, currentValue: val, completed: val >= q.targetValue };
        }
        return q;
      });

      return {
        saltSacksCount: newSalt,
        cowrieShellsCount: newCowrie,
        cash: newCash,
        prestigePoints: newPrestige,
        quests: updatedQuests,
        currentEra: 'era_forja_lidia',
        stage: 'Reino de Lidia',
        notification: {
          title: '¡Saquito de Sal Medido!',
          message: 'Has dividido el valor en porciones exactas de sal y conchas de cauri. ¡El primer salario portátil es tuyo!',
          type: 'success'
        }
      };
    });
  },

  // --- ERA 3: FORJA DE LIDIA & SELLO DEL LEÓN ---
  strikeLydianCoin: () => {
    soundFx.playPowerUp();
    set(prev => {
      const newCoins = prev.electrumCoinsCount + 1;
      const newCash = prev.cash + 120;
      const newPrestige = prev.prestigePoints + 90;
      const newPassive = prev.monthlyPassiveIncome + 15;

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_5_forja_lidia') {
          const val = q.currentValue + 1;
          return { ...q, currentValue: val, completed: val >= q.targetValue };
        }
        return q;
      });

      return {
        electrumCoinsCount: newCoins,
        cash: newCash,
        prestigePoints: newPrestige,
        monthlyPassiveIncome: newPassive,
        quests: updatedQuests,
        currentEra: 'era_bit_digital',
        stage: 'Ciberespacio del Bit',
        notification: {
          title: '¡Moneda de Electro Acuñada!',
          message: 'Dario estampó el León sobre el disco de oro y plata. ¡La confianza ahora tiene peso y pureza garantizados!',
          type: 'achievement'
        }
      };
    });
  },

  // --- ERA 4: BLOCKCHAIN & BITS ---
  mineBlockchainBits: () => {
    soundFx.playPowerUp();
    set(prev => {
      const newBits = prev.digitalBitsCount + 2;
      const newCash = prev.cash + 200;
      const newPassive = prev.monthlyPassiveIncome + 25;
      const newPrestige = prev.prestigePoints + 120;

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_8_blockchain_bit') {
          const val = q.currentValue + 2;
          return { ...q, currentValue: val, completed: val >= q.targetValue };
        }
        return q;
      });

      return {
        digitalBitsCount: newBits,
        cash: newCash,
        monthlyPassiveIncome: newPassive,
        prestigePoints: newPrestige,
        quests: updatedQuests,
        notification: {
          title: '¡Bloque Validado en la Red!',
          message: 'Kai y Lia transmitieron valor como impulsos de luz cuántica. ¡El dinero es pura información compartida!',
          type: 'success'
        }
      };
    });
  },

  // --- CRAFTING ---
  craftProduct: (productId: string) => {
    const state = get();
    const prod = state.tangibles.find(t => t.id === productId);
    if (!prod) return;

    if (state.cash < prod.costToMake) {
      soundFx.playError();
      set({
        notification: {
          title: 'Capital Insuficiente',
          message: `Necesitas $${prod.costToMake} para costear los insumos de ${prod.name}.`,
          type: 'warning'
        }
      });
      return;
    }

    soundFx.playHammer();
    set(prev => {
      const updatedTangibles = prev.tangibles.map(t => {
        if (t.id === productId) {
          return { ...t, craftedCount: t.craftedCount + 1 };
        }
        return t;
      });

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_2_cobre_tool' && productId === 'cobre_tool') {
          const nextVal = q.currentValue + 1;
          return { ...q, currentValue: nextVal, completed: nextVal >= q.targetValue };
        }
        return q;
      });

      const newCopper = productId === 'cobre_tool' ? prev.copperToolsCount + 1 : prev.copperToolsCount;
      const buildPoints = 75;
      const buildCashValue = 35;

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        investmentFund: prev.investmentLedger.investmentFund + buildCashValue,
        totalInvestmentPoints: prev.investmentLedger.totalInvestmentPoints + buildPoints,
        stats: {
          ...prev.investmentLedger.stats,
          construction: {
            ...prev.investmentLedger.stats.construction,
            craftedCount: prev.investmentLedger.stats.construction.craftedCount + 1,
            pointsGained: prev.investmentLedger.stats.construction.pointsGained + buildPoints
          }
        },
        recentEvents: [
          {
            id: `build_${Date.now()}`,
            timestamp: Date.now(),
            type: 'build_gain',
            category: 'construccion',
            title: `Construcción: ${prod.name}`,
            description: `Fabricaste 1 unidad. Agregó valor tangible y capital productivo.`,
            deltaPoints: buildPoints,
            deltaCash: buildCashValue
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        cash: prev.cash - prod.costToMake,
        copperToolsCount: newCopper,
        tangibles: updatedTangibles,
        quests: updatedQuests,
        prestigePoints: prev.prestigePoints + buildPoints,
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_${Date.now()}`,
          text: `+${buildPoints} Pts Inversión (Construcción)`,
          deltaPoints: buildPoints,
          deltaCash: buildCashValue,
          type: 'gain',
          category: 'construccion'
        },
        notification: {
          title: '¡Insumo Fabricado & Puntos Ganados!',
          message: `Has creado 1 unidad de ${prod.name}. Ganaste +${buildPoints} Puntos y +$${buildCashValue} para tu Fondo de Inversión.`,
          type: 'success'
        }
      };
    });
  },

  // --- SELLING ---
  sellProduct: (productId: string) => {
    const state = get();
    const prod = state.tangibles.find(t => t.id === productId);
    if (!prod || prod.craftedCount <= 0) {
      soundFx.playError();
      return;
    }

    soundFx.playCoin();
    set(prev => {
      const updatedTangibles = prev.tangibles.map(t => {
        if (t.id === productId) {
          return { ...t, craftedCount: t.craftedCount - 1, soldCount: t.soldCount + 1 };
        }
        return t;
      });

      return {
        cash: prev.cash + prod.marketValue,
        tangibles: updatedTangibles,
        prestigePoints: prev.prestigePoints + 30,
        notification: {
          title: '¡Venta Exitosa!',
          message: `Vendiste ${prod.name} por $${prod.marketValue}. Ganancia bruta: +$${prod.marketValue - prod.costToMake}.`,
          type: 'success'
        }
      };
    });
  },

  // --- STOCKS ---
  buyStock: (ticker: string, shares: number) => {
    const state = get();
    const stock = state.stocks.find(s => s.ticker === ticker);
    if (!stock) return;

    const totalCost = stock.price * shares;
    if (state.cash < totalCost) {
      soundFx.playError();
      set({
        notification: {
          title: 'Liquidez Insuficiente',
          message: `Requieres $${totalCost.toFixed(2)} para comprar ${shares} acciones de ${stock.ticker}.`,
          type: 'warning'
        }
      });
      return;
    }

    soundFx.playSuccess();
    set(prev => {
      const newPassive = prev.monthlyPassiveIncome + (totalCost * (stock.dividendYield / 100)) / 12;
      const updatedStocks = prev.stocks.map(s => {
        if (s.ticker === ticker) {
          return { ...s, sharesOwned: s.sharesOwned + shares };
        }
        return s;
      });

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_6_bolsa_dividendos') {
          const val = q.currentValue + shares;
          return { ...q, currentValue: val, completed: val >= q.targetValue };
        }
        return q;
      });

      return {
        cash: prev.cash - totalCost,
        monthlyPassiveIncome: Math.round(newPassive * 10) / 10,
        stocks: updatedStocks,
        quests: updatedQuests,
        prestigePoints: prev.prestigePoints + shares * 10,
        notification: {
          title: '¡Acciones Adquiridas!',
          message: `Compraste ${shares} acciones de ${stock.name}. Tu flujo de dividendos pasivos aumentó.`,
          type: 'achievement'
        }
      };
    });
  },

  sellStock: (ticker: string, shares: number) => {
    const state = get();
    const stock = state.stocks.find(s => s.ticker === ticker);
    if (!stock || stock.sharesOwned < shares) {
      soundFx.playError();
      return;
    }

    const totalRevenue = stock.price * shares;
    soundFx.playCoin();

    set(prev => {
      const lostPassive = (totalRevenue * (stock.dividendYield / 100)) / 12;
      const updatedStocks = prev.stocks.map(s => {
        if (s.ticker === ticker) {
          return { ...s, sharesOwned: s.sharesOwned - shares };
        }
        return s;
      });

      return {
        cash: prev.cash + totalRevenue,
        monthlyPassiveIncome: Math.max(0, Math.round((prev.monthlyPassiveIncome - lostPassive) * 10) / 10),
        stocks: updatedStocks,
        notification: {
          title: 'Venta de Acciones',
          message: `Vendiste ${shares} acciones de ${stock.ticker} por $${totalRevenue.toFixed(2)}.`,
          type: 'info'
        }
      };
    });
  },

  // --- BANKING ---
  openBank: (bankId) => {
    soundFx.playSuccess();
    set(prev => {
      const updatedBanks = prev.banks.map(b => {
        if (b.id === bankId) {
          return { ...b, opened: true };
        }
        return b;
      });

      const updatedQuests = prev.quests.map(q => {
        if (q.id === 'quest_4_banco_custodia') {
          return { ...q, currentValue: 1, completed: true };
        }
        return q;
      });

      return {
        banks: updatedBanks,
        quests: updatedQuests,
        prestigePoints: prev.prestigePoints + 50,
        notification: {
          title: '¡Bóveda Bancaria Abierta!',
          message: 'Tu cuenta de custodia y pagos digitales está activa.',
          type: 'success'
        }
      };
    });
  },

  depositBank: (bankId, amount) => {
    const state = get();
    if (state.cash < amount || amount <= 0) {
      soundFx.playError();
      return;
    }

    soundFx.playCoin();
    set(prev => {
      const updatedBanks = prev.banks.map(b => {
        if (b.id === bankId) {
          return { ...b, balance: b.balance + amount };
        }
        return b;
      });

      return {
        cash: prev.cash - amount,
        banks: updatedBanks,
        notification: {
          title: 'Depósito Realizado',
          message: `Depositaste $${amount} con rendimiento garantizado.`,
          type: 'info'
        }
      };
    });
  },

  withdrawBank: (bankId, amount) => {
    const state = get();
    const bank = state.banks.find(b => b.id === bankId);
    if (!bank || bank.balance < amount || amount <= 0) {
      soundFx.playError();
      return;
    }

    soundFx.playCoin();
    set(prev => {
      const updatedBanks = prev.banks.map(b => {
        if (b.id === bankId) {
          return { ...b, balance: b.balance - amount };
        }
        return b;
      });

      return {
        cash: prev.cash + amount,
        banks: updatedBanks,
        notification: {
          title: 'Retiro Realizado',
          message: `Retiraste $${amount} a tu caja operativa.`,
          type: 'info'
        }
      };
    });
  },

  takeCredit: (bankId, amount) => {
    const state = get();
    const bank = state.banks.find(b => b.id === bankId);
    if (!bank || bank.creditAvailable < amount || amount <= 0) {
      soundFx.playError();
      return;
    }

    soundFx.playPowerUp();
    set(prev => {
      const updatedBanks = prev.banks.map(b => {
        if (b.id === bankId) {
          return { 
            ...b, 
            debt: b.debt + amount, 
            creditAvailable: b.creditAvailable - amount 
          };
        }
        return b;
      });

      const additionalExpense = Math.round((amount * 0.05) * 10) / 10;

      return {
        cash: prev.cash + amount,
        monthlyExpenses: prev.monthlyExpenses + additionalExpense,
        banks: updatedBanks,
        notification: {
          title: 'Crédito Productivo Activado',
          message: `Recibiste $${amount} de capital. Cuota mensual de interés: +$${additionalExpense}/tick.`,
          type: 'warning'
        }
      };
    });
  },

  payoffDebt: (bankId, amount) => {
    const state = get();
    const bank = state.banks.find(b => b.id === bankId);
    if (!bank || bank.debt <= 0 || state.cash < amount || amount <= 0) {
      soundFx.playError();
      return;
    }

    const payAmount = Math.min(bank.debt, amount);
    soundFx.playCoin();

    set(prev => {
      const updatedBanks = prev.banks.map(b => {
        if (b.id === bankId) {
          return { 
            ...b, 
            debt: b.debt - payAmount, 
            creditAvailable: b.creditAvailable + payAmount 
          };
        }
        return b;
      });

      const reducedExpense = Math.round((payAmount * 0.05) * 10) / 10;

      return {
        cash: prev.cash - payAmount,
        monthlyExpenses: Math.max(10, prev.monthlyExpenses - reducedExpense),
        banks: updatedBanks,
        prestigePoints: prev.prestigePoints + 25,
        notification: {
          title: 'Deuda Amortizada',
          message: `Pagaste $${payAmount}. Tus gastos fijos por intereses disminuyeron.`,
          type: 'success'
        }
      };
    });
  },

  unlockEraWisdom: (eraId) => {
    soundFx.playSuccess();
    set(prev => {
      const updatedEras = prev.eras.map(e => {
        if (e.id === eraId) {
          return { ...e, unlocked: true };
        }
        return e;
      });

      return {
        eras: updatedEras,
        prestigePoints: prev.prestigePoints + 150,
        notification: {
          title: '¡Sabiduría Desbloqueada!',
          message: 'Has dominado una nueva lección del libro "El Viaje del Valor: De la Sal al Bit".',
          type: 'achievement'
        }
      };
    });
  },

  placeBalanceItem: (itemId, slot) => {
    soundFx.playClick();
    set(prev => ({
      balanceItems: prev.balanceItems.map(item => {
        if (item.id === itemId) {
          return { ...item, placedInSlot: slot };
        }
        return item;
      })
    }));
  },

  verifyBalanceSheet: () => {
    const state = get();
    const allPlaced = state.balanceItems.every(i => i.placedInSlot !== null);
    if (!allPlaced) {
      soundFx.playError();
      set({
        notification: {
          title: 'Hoja Incompleta',
          message: 'Arrastra todos los bloques de Activos, Pasivos y Patrimonio a sus cuadrantes correspondientes.',
          type: 'warning'
        }
      });
      return false;
    }

    const activos = state.balanceItems
      .filter(i => i.placedInSlot === 'activos_circulantes' || i.placedInSlot === 'activos_fijos')
      .reduce((sum, i) => sum + i.amount, 0);

    const pasivos = state.balanceItems
      .filter(i => i.placedInSlot === 'pasivos_corto' || i.placedInSlot === 'pasivos_largo')
      .reduce((sum, i) => sum + i.amount, 0);

    const patrimonio = state.balanceItems
      .filter(i => i.placedInSlot === 'capital_social')
      .reduce((sum, i) => sum + i.amount, 0);

    const isBalanced = activos === (pasivos + patrimonio);

    if (isBalanced) {
      soundFx.playPowerUp();
      set(prev => {
        const updatedQuests = prev.quests.map(q => {
          if (q.id === 'quest_7_balance_sheet') {
            return { ...q, currentValue: 1, completed: true };
          }
          return q;
        });

        return {
          prestigePoints: prev.prestigePoints + 300,
          cash: prev.cash + 500,
          quests: updatedQuests,
          notification: {
            title: '¡Ecuación Contable Perfecta!',
            message: `Activos ($${activos}) = Pasivos ($${pasivos}) + Patrimonio ($${patrimonio}). ¡El orden financiero reina!`,
            type: 'achievement'
          }
        };
      });
      return true;
    } else {
      soundFx.playError();
      set({
        notification: {
          title: 'Desbalance Contable',
          message: `Los Activos ($${activos}) no igualan a Pasivos + Patrimonio ($${pasivos + patrimonio}). Reubica los conceptos.`,
          type: 'warning'
        }
      });
      return false;
    }
  },

  attackVillain: (villainId, damage) => {
    soundFx.playLaser();
    set(prev => {
      const updatedVillains = prev.villains.map(v => {
        if (v.id === villainId) {
          const nextHealth = Math.max(0, v.health - damage);
          return {
            ...v,
            health: nextHealth,
            defeated: nextHealth === 0
          };
        }
        return v;
      });

      const wasDefeated = updatedVillains.find(v => v.id === villainId)?.defeated;
      const attackPoints = wasDefeated ? 250 : 60;
      const attackCash = wasDefeated ? 200 : 40;

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        investmentFund: prev.investmentLedger.investmentFund + attackCash,
        totalInvestmentPoints: prev.investmentLedger.totalInvestmentPoints + attackPoints,
        stats: {
          ...prev.investmentLedger.stats,
          attacks: {
            ...prev.investmentLedger.stats.attacks,
            hitsCount: prev.investmentLedger.stats.attacks.hitsCount + 1,
            villainsDefeatedCount: wasDefeated 
              ? prev.investmentLedger.stats.attacks.villainsDefeatedCount + 1 
              : prev.investmentLedger.stats.attacks.villainsDefeatedCount,
            pointsGained: prev.investmentLedger.stats.attacks.pointsGained + attackPoints
          }
        },
        recentEvents: [
          {
            id: `attack_${Date.now()}`,
            timestamp: Date.now(),
            type: 'attack_gain',
            category: 'ataque',
            title: wasDefeated ? '¡Monstruo de Fraude Derrotado!' : 'Ataque Certero a Amenaza',
            description: wasDefeated 
              ? 'Has neutralizado la amenaza financiera. +250 Pts y +$200 de recompensa.' 
              : `Golpeaste a la amenaza por ${damage} daño. +${attackPoints} Pts ganados.`,
            deltaPoints: attackPoints,
            deltaCash: attackCash
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        villains: updatedVillains,
        cash: prev.cash + attackCash,
        prestigePoints: prev.prestigePoints + attackPoints,
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_${Date.now()}`,
          text: wasDefeated ? `+${attackPoints} Pts Inversión (¡Monstruo Derrotado!)` : `+${attackPoints} Pts Inversión (Ataque Exitoso)`,
          deltaPoints: attackPoints,
          deltaCash: attackCash,
          type: 'gain',
          category: 'ataque'
        },
        notification: wasDefeated ? {
          title: '¡Monstruo de Gasto Neutralizado!',
          message: 'Has protegido tu flujo de caja de drenajes invisibles. +250 Puntos para Inversión.',
          type: 'achievement'
        } : null
      };
    });
  },

  receiveVillainDrainPenalty: (villainId) => {
    soundFx.playError();
    set(prev => {
      const villain = prev.villains.find(v => v.id === villainId);
      if (!villain || villain.defeated) return prev;

      const penaltyPoints = 25;
      const penaltyCash = Math.min(prev.cash, 15);

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        investmentFund: Math.max(0, prev.investmentLedger.investmentFund - penaltyCash),
        totalInvestmentPoints: Math.max(0, prev.investmentLedger.totalInvestmentPoints - penaltyPoints),
        stats: {
          ...prev.investmentLedger.stats,
          attacks: {
            ...prev.investmentLedger.stats.attacks,
            pointsLost: prev.investmentLedger.stats.attacks.pointsLost + penaltyPoints
          }
        },
        recentEvents: [
          {
            id: `drain_${Date.now()}`,
            timestamp: Date.now(),
            type: 'attack_loss',
            category: 'ataque',
            title: `Drenaje de ${villain.name}`,
            description: `No te defendiste a tiempo y sufriste drenaje de liquidez y reputación.`,
            deltaPoints: -penaltyPoints,
            deltaCash: -penaltyCash
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        cash: Math.max(0, prev.cash - penaltyCash),
        prestigePoints: Math.max(0, prev.prestigePoints - penaltyPoints),
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_${Date.now()}`,
          text: `-${penaltyPoints} Pts (Drenaje de Monstruo)`,
          deltaPoints: -penaltyPoints,
          deltaCash: -penaltyCash,
          type: 'loss',
          category: 'ataque'
        },
        notification: {
          title: '¡Drenaje de Capital Sufrido!',
          message: `El monstruo ${villain.name} drenó -$${penaltyCash} y perdiste -${penaltyPoints} Pts. ¡Activa tus defensas!`,
          type: 'warning'
        }
      };
    });
  },

  answerQuizQuestion: (questionId, choice) => {
    set(prev => {
      const q = prev.quizQuestions.find(item => item.id === questionId);
      if (!q) return prev;

      // Determine selected option from 3 options array or fallback
      let selectedOption: { id?: string; letter?: string; text: string; isCorrect: boolean; explanation: string };
      let selectedIndex = 0;

      if (typeof choice === 'number') {
        selectedIndex = Math.max(0, Math.min(choice, (q.options?.length || 1) - 1));
        selectedOption = q.options ? q.options[selectedIndex] : (selectedIndex === 0 ? q.affirmativeOption! : q.negativeOption!);
      } else if (typeof choice === 'string') {
        const foundIdx = q.options?.findIndex(o => o.id === choice || o.letter === choice);
        if (foundIdx !== undefined && foundIdx >= 0) {
          selectedIndex = foundIdx;
          selectedOption = q.options[foundIdx];
        } else {
          selectedOption = q.options ? q.options[0] : q.affirmativeOption!;
        }
      } else {
        // Boolean legacy fallback
        if (q.options && q.options.length > 0) {
          selectedIndex = choice ? 0 : 1;
          selectedOption = q.options[selectedIndex] || q.options[0];
        } else {
          selectedOption = choice ? q.affirmativeOption! : q.negativeOption!;
        }
      }

      const isCorrect = selectedOption.isCorrect;

      const updatedQuestions = prev.quizQuestions.map(item => {
        if (item.id === questionId) {
          return {
            ...item,
            answered: true,
            selectedOptionIndex: selectedIndex,
            selectedOptionId: selectedOption.id || `opt_${selectedIndex}`,
            wasCorrect: isCorrect
          };
        }
        return item;
      });

      if (isCorrect) {
        soundFx.playPowerUp();
        const pReward = q.pointsReward;
        const cReward = q.cashReward;

        const newLedger: InvestmentLedger = {
          ...prev.investmentLedger,
          investmentFund: prev.investmentLedger.investmentFund + cReward,
          totalInvestmentPoints: prev.investmentLedger.totalInvestmentPoints + pReward,
          stats: {
            ...prev.investmentLedger.stats,
            answers: {
              ...prev.investmentLedger.stats.answers,
              correctCount: prev.investmentLedger.stats.answers.correctCount + 1,
              pointsGained: prev.investmentLedger.stats.answers.pointsGained + pReward
            }
          },
          recentEvents: [
            {
              id: `ans_${Date.now()}`,
              timestamp: Date.now(),
              type: 'answer_gain',
              category: 'respuestas',
              title: `Respuesta Acertada: ${q.title} (${selectedOption.letter || 'Opción'})`,
              description: selectedOption.explanation,
              deltaPoints: pReward,
              deltaCash: cReward
            },
            ...prev.investmentLedger.recentEvents.slice(0, 19)
          ]
        };

        return {
          quizQuestions: updatedQuestions,
          cash: prev.cash + cReward,
          prestigePoints: prev.prestigePoints + pReward,
          levelPoints: prev.levelPoints + pReward,
          cumulativePoints: prev.cumulativePoints + pReward,
          investmentLedger: newLedger,
          floatingScoreEvent: {
            id: `float_${Date.now()}`,
            text: `+${pReward} Pts (¡Respuesta Acertada!)`,
            deltaPoints: pReward,
            deltaCash: cReward,
            type: 'gain',
            category: 'respuestas'
          },
          notification: {
            title: '¡Respuesta Acertada!',
            message: `Ganaste +${pReward} Puntos y +$${cReward} para tu Fondo de Inversión. ${selectedOption.explanation}`,
            type: 'achievement'
          }
        };
      } else {
        soundFx.playError();
        const pPenalty = q.pointsPenalty;
        const cPenalty = q.cashPenalty;

        const newLedger: InvestmentLedger = {
          ...prev.investmentLedger,
          investmentFund: Math.max(0, prev.investmentLedger.investmentFund - cPenalty),
          totalInvestmentPoints: prev.investmentLedger.totalInvestmentPoints - pPenalty,
          stats: {
            ...prev.investmentLedger.stats,
            answers: {
              ...prev.investmentLedger.stats.answers,
              wrongCount: prev.investmentLedger.stats.answers.wrongCount + 1,
              pointsLost: prev.investmentLedger.stats.answers.pointsLost + pPenalty
            }
          },
          recentEvents: [
            {
              id: `ans_${Date.now()}`,
              timestamp: Date.now(),
              type: 'answer_loss',
              category: 'respuestas',
              title: `Respuesta Errada: ${q.title} (${selectedOption.letter || 'Opción'})`,
              description: selectedOption.explanation || 'Respuesta incorrecta. Analiza los conceptos para deducir la alternativa acertada.',
              deltaPoints: -pPenalty,
              deltaCash: -cPenalty
            },
            ...prev.investmentLedger.recentEvents.slice(0, 19)
          ]
        };

        return {
          quizQuestions: updatedQuestions,
          cash: Math.max(0, prev.cash - cPenalty),
          prestigePoints: prev.prestigePoints - pPenalty,
          levelPoints: prev.levelPoints - pPenalty,
          cumulativePoints: prev.cumulativePoints - pPenalty,
          investmentLedger: newLedger,
          floatingScoreEvent: {
            id: `float_${Date.now()}`,
            text: `-${pPenalty} Pts (Penalización por Error)`,
            deltaPoints: -pPenalty,
            deltaCash: -cPenalty,
            type: 'loss',
            category: 'respuestas'
          },
          notification: {
            title: '¡Respuesta Errada!',
            message: `Perdiste -${pPenalty} Puntos en tu acumulado. ${selectedOption.explanation}`,
            type: 'warning'
          }
        };
      }
    });
  },

  investPointsInEraAsset: (assetId: string) => {
    const state = get();
    const asset = state.eraInvestments.find(a => a.id === assetId);
    if (!asset) return;

    const availablePoints = Math.max(state.investmentLedger.totalInvestmentPoints, state.levelPoints);

    if (availablePoints < asset.costPoints) {
      soundFx.playError();
      narratorEngine.playIconNarration('transaccion_error', {
        title: 'Puntos Insuficientes',
        eraName: 'Transacciones con Puntos',
        text: `No tienes suficientes puntos para realizar esta transacción. Requieres ${asset.costPoints} puntos. Responde el acertijo de la era para ganar más puntos de inversión.`
      });
      set({
        notification: {
          title: 'Puntos Insuficientes para Invertir',
          message: `Requieres ${asset.costPoints} puntos para adquirir ${asset.title}. Tienes ${availablePoints} puntos. Responde correctamente el acertijo de la era para acumular puntos.`,
          type: 'warning'
        }
      });
      return;
    }

    soundFx.playPowerUp();
    set(prev => {
      const updatedInvestments = prev.eraInvestments.map(a => {
        if (a.id === assetId) {
          return { ...a, purchasedCount: a.purchasedCount + 1 };
        }
        return a;
      });

      const deductPoints = asset.costPoints;
      const newTotalPoints = prev.investmentLedger.totalInvestmentPoints - deductPoints;
      const newMonthlyPassive = prev.monthlyPassiveIncome + Math.round(asset.passivePointsYield / 2);
      const newCash = prev.cash + asset.cashBonus;
      const pointGrowthBonus = Math.round(asset.costPoints * 0.2);

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        totalInvestmentPoints: newTotalPoints,
        stats: {
          ...prev.investmentLedger.stats,
          investments: {
            ...prev.investmentLedger.stats.investments,
            projectsFundedCount: prev.investmentLedger.stats.investments.projectsFundedCount + 1,
            passiveReturnGenerated: prev.investmentLedger.stats.investments.passiveReturnGenerated + asset.passivePointsYield
          }
        },
        recentEvents: [
          {
            id: `inv_era_${Date.now()}`,
            timestamp: Date.now(),
            type: 'invest_gain',
            category: 'inversion',
            title: `Inversión: ${asset.title}`,
            description: `Invertiste ${deductPoints} Pts en ${asset.title}. Genera +${asset.passivePointsYield} Pts pasivos y +$${asset.cashBonus} de liquidez.`,
            deltaPoints: -deductPoints,
            deltaCash: asset.cashBonus
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        eraInvestments: updatedInvestments,
        monthlyPassiveIncome: newMonthlyPassive,
        cash: newCash,
        levelPoints: prev.levelPoints + pointGrowthBonus,
        cumulativePoints: prev.cumulativePoints + pointGrowthBonus,
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_inv_${Date.now()}`,
          text: `Inversión: ${asset.title} (-${deductPoints} Pts, +$${asset.cashBonus})`,
          deltaPoints: -deductPoints,
          deltaCash: asset.cashBonus,
          type: 'gain',
          category: 'inversion'
        },
        notification: {
          title: '¡Transacción Exitosa con Puntos!',
          message: `Invertiste ${deductPoints} puntos en ${asset.title}. Tu flujo de ingresos pasivos aumentó a $${newMonthlyPassive}/tick.`,
          type: 'achievement'
        }
      };
    });

    narratorEngine.playIconNarration(`inv_${asset.id}`, {
      title: `Transacción: ${asset.title}`,
      eraName: 'Inversión de la Era',
      icon: asset.icon,
      text: `Has invertido exitosamente ${asset.costPoints} puntos en ${asset.title}. ${asset.description}. Tus retornos pasivos han aumentado.`
    });
  },

  investFundInStock: (ticker, shares) => {
    const state = get();
    const stock = state.stocks.find(s => s.ticker === ticker);
    if (!stock || shares <= 0) return;

    const totalCost = stock.price * shares;
    if (state.investmentLedger.investmentFund < totalCost && state.cash < totalCost) {
      soundFx.playError();
      set({
        notification: {
          title: 'Fondos de Inversión Insuficientes',
          message: `Requieres $${totalCost.toFixed(2)} para comprar ${shares} acciones de ${stock.name}. Acumula más puntos con respuestas, ataques y construcciones.`,
          type: 'warning'
        }
      });
      return;
    }

    soundFx.playCoin();
    set(prev => {
      const updatedStocks = prev.stocks.map(s => {
        if (s.ticker === ticker) {
          return { ...s, sharesOwned: s.sharesOwned + shares };
        }
        return s;
      });

      const deductFromFund = Math.min(prev.investmentLedger.investmentFund, totalCost);
      const remainingDeduct = totalCost - deductFromFund;

      const monthlyPassiveGain = (stock.price * shares * (stock.dividendYield / 100)) / 12;

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        investmentFund: prev.investmentLedger.investmentFund - deductFromFund,
        stats: {
          ...prev.investmentLedger.stats,
          investments: {
            ...prev.investmentLedger.stats.investments,
            totalInvestedCash: prev.investmentLedger.stats.investments.totalInvestedCash + totalCost,
            stocksBoughtCount: prev.investmentLedger.stats.investments.stocksBoughtCount + shares,
            passiveReturnGenerated: prev.investmentLedger.stats.investments.passiveReturnGenerated + monthlyPassiveGain
          }
        },
        recentEvents: [
          {
            id: `inv_${Date.now()}`,
            timestamp: Date.now(),
            type: 'invest_gain',
            category: 'inversion',
            title: `Inversión BVC: ${shares}x ${stock.ticker}`,
            description: `Adquiriste acciones de ${stock.name}. Dividendos estimados: +$${monthlyPassiveGain.toFixed(2)}/tick.`,
            deltaPoints: 50,
            deltaCash: -totalCost
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        stocks: updatedStocks,
        cash: Math.max(0, prev.cash - remainingDeduct),
        monthlyPassiveIncome: prev.monthlyPassiveIncome + monthlyPassiveGain,
        prestigePoints: prev.prestigePoints + 50,
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_${Date.now()}`,
          text: `+50 Pts Inversión (Acciones BVC Adquiridas)`,
          deltaPoints: 50,
          deltaCash: 0,
          type: 'gain',
          category: 'inversion'
        },
        notification: {
          title: '¡Inversión Bursátil Ejecutada!',
          message: `Compraste ${shares} acciones de ${stock.name} en la Bolsa de Caracas. Flujo pasivo: +$${monthlyPassiveGain.toFixed(2)}/tick.`,
          type: 'success'
        }
      };
    });
  },

  investInProductiveProject: (projectId, cost, monthlyReturn, name) => {
    const state = get();
    if (state.investmentLedger.investmentFund < cost && state.cash < cost) {
      soundFx.playError();
      set({
        notification: {
          title: 'Capital Insuficiente para Proyecto',
          message: `Requieres $${cost} en tu fondo para expandir ${name}. Acumula más puntos en el juego.`,
          type: 'warning'
        }
      });
      return;
    }

    soundFx.playPowerUp();
    set(prev => {
      const deductFromFund = Math.min(prev.investmentLedger.investmentFund, cost);
      const remainingDeduct = cost - deductFromFund;

      const newLedger: InvestmentLedger = {
        ...prev.investmentLedger,
        investmentFund: prev.investmentLedger.investmentFund - deductFromFund,
        totalInvestmentPoints: prev.investmentLedger.totalInvestmentPoints + 100,
        stats: {
          ...prev.investmentLedger.stats,
          investments: {
            ...prev.investmentLedger.stats.investments,
            totalInvestedCash: prev.investmentLedger.stats.investments.totalInvestedCash + cost,
            projectsFundedCount: prev.investmentLedger.stats.investments.projectsFundedCount + 1,
            passiveReturnGenerated: prev.investmentLedger.stats.investments.passiveReturnGenerated + monthlyReturn
          }
        },
        recentEvents: [
          {
            id: `proj_${Date.now()}`,
            timestamp: Date.now(),
            type: 'invest_gain',
            category: 'inversion',
            title: `Expansión de Proyecto: ${name}`,
            description: `Desplegaste $${cost} de capital. Retorno pasivo generado: +$${monthlyReturn}/tick.`,
            deltaPoints: 100,
            deltaCash: -cost
          },
          ...prev.investmentLedger.recentEvents.slice(0, 19)
        ]
      };

      return {
        cash: Math.max(0, prev.cash - remainingDeduct),
        monthlyPassiveIncome: prev.monthlyPassiveIncome + monthlyReturn,
        prestigePoints: prev.prestigePoints + 100,
        investmentLedger: newLedger,
        floatingScoreEvent: {
          id: `float_${Date.now()}`,
          text: `+100 Pts Inversión (Proyecto ${name})`,
          deltaPoints: 100,
          deltaCash: 0,
          type: 'gain',
          category: 'inversion'
        },
        notification: {
          title: '¡Proyecto Productivo Financiado!',
          message: `Invertiste $${cost} en ${name}. Tu flujo pasivo aumentó en +$${monthlyReturn}/tick.`,
          type: 'achievement'
        }
      };
    });
  },

  clearFloatingScore: () => {
    set({ floatingScoreEvent: null });
  },

  // --- GAME CLOCK TICK ---
  tick: () => {
    set(prev => {
      // Interest from bank deposits
      let bankInterest = 0;
      prev.banks.forEach(b => {
        if (b.balance > 0) {
          bankInterest += (b.balance * (b.interestRateAnnual / 100)) / 120;
        }
      });

      // Net cashflow per tick
      const netCashflow = prev.monthlyPassiveIncome - prev.monthlyExpenses + bankInterest;
      const nextCash = Math.max(0, Math.round((prev.cash + netCashflow) * 10) / 10);

      // Check cashflow quests
      const updatedQuests = prev.quests.map(q => {
        if (q.targetType === 'reach_cashflow') {
          return {
            ...q,
            currentValue: Math.round(netCashflow),
            completed: netCashflow >= q.targetValue
          };
        }
        return q;
      });

      return {
        cash: nextCash,
        quests: updatedQuests
      };
    });
  },

  resetGame: () => {
    set({
      gameFlowState: 'login',
      isLoggedIn: false,
      cash: 250,
      monthlyPassiveIncome: 25,
      monthlyExpenses: 15,
      prestigePoints: 50,
      currentEra: 'era_trueque',
      stage: 'Mercado del Trueque',
      goatsCount: 1,
      wheatSacks: 0,
      copperToolsCount: 0,
      saltSacksCount: 0,
      cowrieShellsCount: 0,
      electrumCoinsCount: 0,
      digitalBitsCount: 0,
      flowVisionActive: false,
      activeModal: null,
      selectedDynastyId: null,
      eras: INITIAL_ERAS,
      quests: INITIAL_QUESTS,
      tangibles: INITIAL_TANGIBLES,
      banks: INITIAL_BANKS,
      stocks: INITIAL_STOCKS,
      villains: INITIAL_VILLAINS,
      balanceItems: INITIAL_BALANCE_ITEMS,
      investmentLedger: INITIAL_INVESTMENT_LEDGER,
      quizQuestions: INITIAL_QUIZ_QUESTIONS,
      floatingScoreEvent: null,
      notification: {
        title: '¡Odisea Reiniciada!',
        message: 'Comienza de nuevo el viaje del valor junto a Kai y Lia.',
        type: 'info'
      }
    });
  }
}));
