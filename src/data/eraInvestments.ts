import { EraInvestmentAsset } from '../types';

export const INITIAL_ERA_INVESTMENTS: EraInvestmentAsset[] = [
  // ERA 1: TRUEQUE
  {
    id: 'inv_t1_cobre',
    era: 'era_trueque',
    title: 'Herramientas de Cobre Forjado',
    icon: '🪓',
    costPoints: 50,
    passivePointsYield: 15,
    cashBonus: 40,
    description: 'Forja hachas y cinceles de cobre para intercambiar con el agricultor y superar la fricción del trueque.',
    purchasedCount: 0
  },
  {
    id: 'inv_t2_grano',
    era: 'era_trueque',
    title: 'Granero Comunitario de Trigo',
    icon: '🌾',
    costPoints: 100,
    passivePointsYield: 25,
    cashBonus: 80,
    description: 'Almacén seco para conservar granos sin que se dañen, garantizando reserva de valor para la tribu.',
    purchasedCount: 0
  },
  {
    id: 'inv_t3_pastoreo',
    era: 'era_trueque',
    title: 'Red de Pastoreo de Cabras Lecheras',
    icon: '🐐',
    costPoints: 150,
    passivePointsYield: 40,
    cashBonus: 120,
    description: 'Producción continua de leche y queso fresco para abastecer y dinamizar las ferias de intercambio.',
    purchasedCount: 0
  },

  // ERA 2: SAL & CAURI
  {
    id: 'inv_s1_caravana',
    era: 'era_sal_cauri',
    title: 'Caravana de Sal Marina Divisible',
    icon: '🧂',
    costPoints: 60,
    passivePointsYield: 20,
    cashBonus: 50,
    description: 'Rutas seguras para distribuir saquitos de sal pura y pagar salarios exactos a trabajadores y legionarios.',
    purchasedCount: 0
  },
  {
    id: 'inv_s2_deposito_cauri',
    era: 'era_sal_cauri',
    title: 'Depósito de Conchas de Cauri Pulidas',
    icon: '🐚',
    costPoints: 120,
    passivePointsYield: 30,
    cashBonus: 90,
    description: 'Reserva de conchas exóticas y duraderas que todos aceptan gracias a su portabilidad y belleza universal.',
    purchasedCount: 0
  },
  {
    id: 'inv_s3_balanza',
    era: 'era_sal_cauri',
    title: 'Taller de Fraccionamiento Salarial',
    icon: '⚖️',
    costPoints: 180,
    passivePointsYield: 45,
    cashBonus: 140,
    description: 'División de terrones de sal en unidades exactas que facilitan compras menores sin desperdicio.',
    purchasedCount: 0
  },

  // ERA 3: MONEDA ACUÑADA & LIDIA
  {
    id: 'inv_l1_horno',
    era: 'era_forja_lidia',
    title: 'Horno de Fundición de Electro Real',
    icon: '🔥',
    costPoints: 80,
    passivePointsYield: 25,
    cashBonus: 70,
    description: 'Aleación controlada de oro y plata para abastecer de cospeles limpios al taller de acuñación.',
    purchasedCount: 0
  },
  {
    id: 'inv_l2_troquel',
    era: 'era_forja_lidia',
    title: 'Troquel con el Sello del León Oficial',
    icon: '🦁',
    costPoints: 160,
    passivePointsYield: 45,
    cashBonus: 130,
    description: 'Garantía del rey que certifica peso y pureza. Elimina la necesidad de balanzas y acelera el comercio.',
    purchasedCount: 0
  },
  {
    id: 'inv_l3_flota',
    era: 'era_forja_lidia',
    title: 'Flota Comercial Marítima del Egeo',
    icon: '⛵',
    costPoints: 240,
    passivePointsYield: 60,
    cashBonus: 200,
    description: 'Exportación de monedas acuñadas hacia puertos lejanos, cobrando rendimientos y aranceles comerciales.',
    purchasedCount: 0
  },

  // ERA 4: RED DIGITAL & BLOCKCHAIN
  {
    id: 'inv_d1_nodo',
    era: 'era_bit_digital',
    title: 'Nodo Validador Descentralizado',
    icon: '💻',
    costPoints: 100,
    passivePointsYield: 30,
    cashBonus: 90,
    description: 'Verifica bloques y transacciones en la red global distribuida, recibiendo recompensas criptográficas.',
    purchasedCount: 0
  },
  {
    id: 'inv_d2_smartcontract',
    era: 'era_bit_digital',
    title: 'Contrato Inteligente de Rendimiento Automático',
    icon: '📜',
    costPoints: 200,
    passivePointsYield: 55,
    cashBonus: 170,
    description: 'Protocolo de código abierto que autogestiona dividendos y liquidez 24/7 sin intermediarios bancarios.',
    purchasedCount: 0
  },
  {
    id: 'inv_d3_boveda',
    era: 'era_bit_digital',
    title: 'Bóveda Criptográfica en Frío con Multi-Firma',
    icon: '🔐',
    costPoints: 300,
    passivePointsYield: 80,
    cashBonus: 260,
    description: 'Blindaje digital absoluto que protege el patrimonio acumulado contra ciberataques y fugas de datos.',
    purchasedCount: 0
  }
];
