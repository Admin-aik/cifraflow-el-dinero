import { CharacterArchetype, StarterRelic } from '../types';
import streamerImg from '../assets/images/teen_streamer_gaming_1787494304798.jpg';
import coderImg from '../assets/images/teen_coder_gaming_1787494317270.jpg';
import designerImg from '../assets/images/teen_designer_gaming_1787494329065.jpg';
import baristaImg from '../assets/images/teen_barista_gaming_1787494350744.jpg';
import cifraflowLogoImg from '../assets/images/cifraflow_infinity_logo_1787494363682.jpg';
import teamBannerImg from '../assets/images/cifraflow_team_banner_1789388401447.jpg';
import jorgeAvatarImg from '../assets/images/avatar_jorge_teen_1789388420816.jpg';
import ircarAvatarImg from '../assets/images/avatar_ircar_teen_1789388437008.jpg';
import ivanAvatarImg from '../assets/images/avatar_ivan_teen_1789388450607.jpg';
import carlosAvatarImg from '../assets/images/avatar_carlos_teen_1789388475451.jpg';

export const CIFRAFLOW_LOGO = cifraflowLogoImg;
export const CIFRAFLOW_TEAM_BANNER = teamBannerImg;

export const PLAYER_TITLES = [
  'Cyber-Cadete CifraFlow',
  'Operador Táctico de Nómina',
  'Especialista Cloud & Anti-Gastos',
  'Auditor Forense de Contratos',
  'Estratega de Portafolios 50/30/20',
  'Viajero del Tiempo Cuántico'
];

export const STARTER_RELICS: StarterRelic[] = [
  {
    id: 'cencerro_cabra',
    name: 'Cencerro de la Cabra Ancestral',
    icon: '🐐',
    era: 'era_trueque',
    bonusTitle: 'Facilitador del Trueque',
    bonusDescription: '+1 Cabra Lechera inicial y +$100 de liquidez de arranque.',
    bonusStat: '+100 Cash / +1 Cabra'
  },
  {
    id: 'frasco_sal',
    name: 'Saquito de Sal Marina Pura',
    icon: '🧂',
    era: 'era_sal_cauri',
    bonusTitle: 'Primer Salario Portátil',
    bonusDescription: '+5 Saquitos de Sal procesada y +10 Conchas de Cauri negociables.',
    bonusStat: '+5 Sal / +10 Cauri'
  },
  {
    id: 'sello_leon',
    name: 'Matriz Real del León de Lidia',
    icon: '🦁',
    era: 'era_forja_lidia',
    bonusTitle: 'Garantía Real de Confianza',
    bonusDescription: '+2 Monedas de Electro acuñadas y +100 Puntos de Prestigio.',
    bonusStat: '+2 Monedas / +100 Prestigio'
  },
  {
    id: 'chip_cuantico',
    name: 'Chip Cuántico Descentralizado',
    icon: '⚡',
    era: 'era_bit_digital',
    bonusTitle: 'Información en Tiempo Real',
    bonusDescription: '+4 Bits Digitales minados y +$15/tick de flujo pasivo constante.',
    bonusStat: '+4 Bits / +$15 Flujo'
  }
];

export const ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'jorge',
    name: 'Jorge (Adolescente)',
    role: 'Operador Táctico de Accesos & Nómina',
    age: '16 años',
    image: jorgeAvatarImg,
    description: 'Joven estudiante adolescente con cabello castaño oscuro, chaqueta cyber-cadete con circuitos luminosos y una interfaz táctica de pulso de alta precisión.',
    passiveBonusTitle: '+15% Efectividad Finanzas & Blindaje FIDO2',
    passiveBonusDescription: 'Bonificación del +15% de efectividad en depósitos bancarios, control de nómina y resistencia máxima contra intentos de suplantación de identidad.',
    primaryColor: '#00f3ff',
    accentColor: '#0284c7',
    stats: {
      flujo: 90,
      innovacion: 88,
      resiliencia: 92,
    }
  },
  {
    id: 'ircar',
    name: 'Ircar (Adolescente)',
    role: 'Especialista Cloud & Optimización Financiera',
    age: '16 años',
    image: ircarAvatarImg,
    description: 'Joven femenina estudiante adolescente muy glamorosa con lentes sobre la cabeza, sudadera tecnológica con glow fucsia y visor holográfico de microfinanzas.',
    passiveBonusTitle: 'Radar Anti-Gastos & Escudo Cloud',
    passiveBonusDescription: 'Detecta de forma instantánea suscripciones hormiga y gastos fantasmas, reduciendo los costos fijos un 20% y blindando fondos en la nube.',
    primaryColor: '#ff007f',
    accentColor: '#d946ef',
    stats: {
      flujo: 92,
      innovacion: 95,
      resiliencia: 89,
    }
  },
  {
    id: 'ivan',
    name: 'Iván (Adolescente)',
    role: 'Auditor Forense Digital & Detective de Contratos',
    age: '17 años',
    image: ivanAvatarImg,
    description: 'Joven estudiante adolescente con visor de realidad virtual y monóculo scanner de código que descompone términos y condiciones bancarias en milisegundos.',
    passiveBonusTitle: 'Monóculo Scanner de Cláusulas Abusivas',
    passiveBonusDescription: 'Evita penalizaciones por letra chica en contratos bancarios, desarmando fraudes y triplicando puntos en lectura crítica.',
    primaryColor: '#34d399',
    accentColor: '#059669',
    stats: {
      flujo: 85,
      innovacion: 96,
      resiliencia: 94,
    }
  },
  {
    id: 'carlos',
    name: 'Carlos (Adolescente)',
    role: 'Estratega Presupuestario & Emprendimiento',
    age: '17 años',
    image: carlosAvatarImg,
    description: 'Joven estudiante adolescente de brazos cruzados con chaqueta con líneas luminosas doradas, proyectando tablets holográficas de portafolios de inversión.',
    passiveBonusTitle: 'Reactor 50/30/20 & Portafolios de Inversión',
    passiveBonusDescription: 'Optimiza la distribución de capital (50% necesidades, 30% deseos, 20% inversión), incrementando dividendos en la Bolsa de Caracas (BVC).',
    primaryColor: '#fbbf24',
    accentColor: '#d97706',
    stats: {
      flujo: 94,
      innovacion: 89,
      resiliencia: 95,
    }
  }
];
