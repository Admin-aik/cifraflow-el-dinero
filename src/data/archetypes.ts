import { CharacterArchetype } from '../types';
import streamerImg from '../assets/images/teen_streamer_gaming_1787494304798.jpg';
import coderImg from '../assets/images/teen_coder_gaming_1787494317270.jpg';
import designerImg from '../assets/images/teen_designer_gaming_1787494329065.jpg';
import baristaImg from '../assets/images/teen_barista_gaming_1787494350744.jpg';
import cifraflowLogoImg from '../assets/images/cifraflow_infinity_logo_1787494363682.jpg';

export const CIFRAFLOW_LOGO = cifraflowLogoImg;

export const ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'streamer',
    name: 'Kai Streamer',
    role: 'Creador de Contenido & Streamer Gen-Z',
    age: '19 años',
    image: streamerImg,
    description: 'Equipado con audífonos gamer con acentos neón, sudadera streetwear y setup dual-monitor RGB con paneles acústicos.',
    passiveBonusTitle: 'Audiencia Digital & Viralidad',
    passiveBonusDescription: '+20% de bonificación en recompensas por misiones y monetización acelerada de activos.',
    primaryColor: '#00f2fe',
    accentColor: '#d946ef',
    stats: {
      flujo: 85,
      innovacion: 90,
      resiliencia: 80,
    }
  },
  {
    id: 'coder',
    name: 'Lia Coder',
    role: 'Desarrolladora Junior Full-Stack',
    age: '20 años',
    image: coderImg,
    description: 'Lentes con reflejos de líneas de código en cian, sudadera minimalista, teclado mecánico y monitor curvo ultrawide.',
    passiveBonusTitle: 'Optimización de Algoritmos',
    passiveBonusDescription: '+25% de velocidad en minado de bits blockchain y automatización de procesos contables.',
    primaryColor: '#00f2fe',
    accentColor: '#06b6d4',
    stats: {
      flujo: 80,
      innovacion: 98,
      resiliencia: 88,
    }
  },
  {
    id: 'designer',
    name: 'Maya UI/UX',
    role: 'Diseñadora Gráfica & Artista Digital',
    age: '21 años',
    image: designerImg,
    description: 'Stylus digital iluminado, tableta gráfica con paletas de color neón, moño desenfadado y chaqueta oversize moderna.',
    passiveBonusTitle: 'Valor Agregado de Marca',
    passiveBonusDescription: '+20% de margen de ganancia al forjar y vender productos tangibles en todas las eras.',
    primaryColor: '#d946ef',
    accentColor: '#ec4899',
    stats: {
      flujo: 90,
      innovacion: 92,
      resiliencia: 82,
    }
  },
  {
    id: 'barista',
    name: 'Leo Barista',
    role: 'Barista de Especialidad & Cloud Kitchen',
    age: '22 años',
    image: baristaImg,
    description: 'Delantal de mezclilla con pines esmaltados, arte latte recién elaborado y máquina de espresso con vapor holográfico.',
    passiveBonusTitle: 'Flujo de Caja Recurrente',
    passiveBonusDescription: '+15% de flujo pasivo constante por tick derivado de alta rotación diaria y fidelidad de clientes.',
    primaryColor: '#f59e0b',
    accentColor: '#00f2fe',
    stats: {
      flujo: 95,
      innovacion: 80,
      resiliencia: 92,
    }
  }
];
