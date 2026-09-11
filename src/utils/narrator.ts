import { soundFx } from './audio';

// Audio Narrator Engine with Web Speech API (Humanized Natural Cadence, Neural Voice Prioritization & Human Phrasing)
export interface NarrationTrack {
  id: string;
  title: string;
  eraName: string;
  icon: string;
  color: string;
  text: string;
  durationEstimateSeconds: number;
}

export const NARRATION_STORIES: Record<string, NarrationTrack> = {
  login_intro: {
    id: 'login_intro',
    title: 'Portal Temporal: Identificación del Viajero',
    eraName: 'Nexo Cuántico CifraFlow',
    icon: '🌌',
    color: '#00f3ff',
    durationEstimateSeconds: 20,
    text: `¡Épa, viajero! Bienvenido al Nexo Temporal de CifraFlow. Estás a punto de cruzar las cuatro grandes eras del dinero y las finanzas. Identifícate con tu nombre o alias para registrar tu huella en el libro del tiempo, personalizar tu arquetipo y comenzar este viaje del valor junto a Kai y Lia. ¡Échale pichón y toma el control de tu futuro financiero!`
  },
  creacion_personaje: {
    id: 'creacion_personaje',
    title: 'Cámara de Forja: Creación de tu Identidad',
    eraName: 'Personalización de Arquetipo',
    icon: '⚡',
    color: '#d946ef',
    durationEstimateSeconds: 26,
    text: `¡Fíjate bien, mi gente! Has ingresado a la Cámara de Forja Temporal. Elige tu arquetipo generacional: Kai Streamer con su viralidad digital, Lia Coder con su optimización algorítmica, Maya Diseñadora con su valor de marca, o Leo Barista con su flujo de caja diario. Selecciona tu reliquia ancestral para recibir bonificaciones de arranque y prepararte para el gran salto al mapa de las eras.`
  },
  portada: {
    id: 'portada',
    title: 'Portada: El Viaje del Valor: De la Sal al Bit',
    eraName: 'Obra Original de ircar rojas',
    icon: '📘',
    color: '#00f3ff',
    durationEstimateSeconds: 25,
    text: `¡Qué tal, caminantes del tiempo! El Viaje del Valor: De la Sal al Bit, una obra original de ircar rojas. Acompaña a Kai y Lia en una travesía épica a través del tiempo para desvelar el secreto más poderoso de la civilización: ¿qué es realmente el dinero y cómo ha evolucionado desde el antiguo mercado del trueque hasta la frontera cuántica de los bits? El dinero no es un simple objeto material, es una tecnología de confianza y coordinación social. ¡Descubre las leyes eternas del valor!`
  },
  introduccion: {
    id: 'introduccion',
    title: 'Introducción: El Secreto del Dinero & Los Mentores Kai y Lia',
    eraName: 'Prólogo Histórico',
    icon: '✨',
    color: '#38bdf8',
    durationEstimateSeconds: 32,
    text: `¡Épa! Bienvenidos a CifraFlow y a la crónica de El Viaje del Valor. A lo largo de los siglos, la humanidad ha buscado maneras de intercambiar su esfuerzo, sus cosechas y su talento. Quien no conoce el origen del dinero es esclavo de la deuda y la inflación; pero quien comprende su evolución se convierte en arquitecto de su libertad financiera. Junto a Kai, con su visor cuántico, y Lia, guardiana del valor, recorrerás cuatro grandes eras históricas. Prepárate para dominar los activos, superar los acertijos y forjar tu propio imperio de flujo de caja.`
  },
  era_trueque: {
    id: 'era_trueque',
    title: 'Era 1: El Mercado del Trueque & La Doble Coincidencia',
    eraName: 'Era 1: Trueque Ancestral',
    icon: '🐐',
    color: '#f59e0b',
    durationEstimateSeconds: 36,
    text: `¡Miren esta escena en el mercado ancestral! Era uno: El Mercado del Trueque. En el bullicio de una plaza de hace miles de años, Kai y Lia se enfrentan a un problema logístico agotador. Kai va tirando de una cabra inquieta que no se queda quieta, mientras Lia carga cestas vacías, buscando a alguien que necesite leche a cambio del trigo que les hace falta. Pero el mercader de grano ya tiene tres cabras en su corral y solo busca herramientas de cobre para arar su tierra. Es la famosa doble coincidencia de necesidades: el trueque es un rompecabezas donde las piezas casi nunca encajan. Los animales se cansan, comen forraje y no pueden dividirse a la mitad. La humanidad necesitaba urgentemente una mejor tecnología de valor.`
  },
  era_sal_cauri: {
    id: 'era_sal_cauri',
    title: 'Era 2: Las Conchas de Cauri & El Primer Salario',
    eraName: 'Era 2: Dinero Mercancía',
    icon: '🧂',
    color: '#06b6d4',
    durationEstimateSeconds: 35,
    text: `¡Pura candela financiera! Llegamos a la Era dos: El Dinero Mercancía, la Costa de Cauri y el Almacén de Sal. El mundo cambia por completo cuando Kai y Lia descubren que ya no hace falta cargar con pesados animales para comerciar. Aprenden que ciertos bienes tienen valor universal porque todos los aceptan. Lia sostiene un puñado de brillantes conchas de cauri, ligeras y hermosas, mientras Kai guarda con celo un saquito de sal marina pura. La sal no solo preserva los alimentos, sino que se convierte en el origen de la palabra salario. Ahora, el valor de una cabra cabe en la palma de tu mano. El dinero se vuelve portátil, duradero y sobre todo divisible.`
  },
  era_forja_lidia: {
    id: 'era_forja_lidia',
    title: 'Era 3: La Forja de Lidia & El Sello del León',
    eraName: 'Era 3: La Moneda Acuñada',
    icon: '🦁',
    color: '#eab308',
    durationEstimateSeconds: 35,
    text: `¡Escuchen ese martilleo en la fragua! Era tres: La Moneda Acuñada en el Reino de Lidia. En el taller real, Kai observa con asombro cómo el artesano Darío levanta su pesado martillo sobre un trozo de electro, esa mezcla natural de oro y plata. Con un golpe seco y certero, Darío estampa el sello real del león sobre el metal caliente, garantizando su peso y pureza ante el mundo entero. Ya no hace falta llevar pesadas balanzas a cada trato. La confianza ahora tiene la forma de un disco reluciente. Las monedas nacen para que el comercio navegue mares y conecte pueblos lejanos.`
  },
  era_red_digital: {
    id: 'era_red_digital',
    title: 'Era 4: La Red Invisible & Del Papel al Bit',
    eraName: 'Era 4: El Ciberespacio & Blockchain',
    icon: '⚡',
    color: '#d946ef',
    durationEstimateSeconds: 37,
    text: `¡A la velocidad de la luz, mi gente! Era cuatro: La Frontera Digital y la Red Invisible. En el presente, Kai y Lia ya no tocan monedas físicas, pero su impacto es más global que nunca. Rodeados de pantallas holográficas y flujos de datos, observan cómo los números bailan en tiempo real. El dinero se ha transformado en código criptográfico, en impulsos de fibra óptica y en redes descentralizadas de blockchain. Ya no es sal, ni oro, ni billetes de papel: es pura información y confianza compartida en una red global. El viaje del valor ha llegado a la era digital, donde tu mejor activo es tu conocimiento financiero.`
  },
  bancos: {
    id: 'bancos',
    title: 'Distrito Bancario: Bóvedas, Depósitos & Apalancamiento',
    eraName: 'Sistema Financiero Moderno',
    icon: '🏛️',
    color: '#3b82f6',
    durationEstimateSeconds: 28,
    text: `¡Mi gente, bienvenidos al Distrito Bancario de CifraFlow! Aquí aprendes a jugar con las reglas del dinero institucional. Deposita tus ganancias para generar intereses pasivos, solicita créditos para adquirir activos productivos y mantén bajo control el costo del apalancamiento para no caer en trampas de deuda.`
  },
  bolsa: {
    id: 'bolsa',
    title: 'Bolsa de Valores de Caracas: Piso de Remates & Acciones',
    eraName: 'Inversión en Renta Variable',
    icon: '📈',
    color: '#10b981',
    durationEstimateSeconds: 30,
    text: `¡Atención al piso de remates de la Bolsa de Valores de Caracas! Aquí compras participaciones reales de empresas productivas: Ron Santa Teresa, Banco Provincial, Mercantil y CANTV. Cobra dividendos mensuales y haz que el interés compuesto trabaje para ti mientras duermes.`
  },
  defensa: {
    id: 'defensa',
    title: 'Ciberdefensa Financiera: Escudo contra Fraudes y Deuda Fantasma',
    eraName: 'Protección de Patrimonio',
    icon: '🛡️',
    color: '#f43f5e',
    durationEstimateSeconds: 26,
    text: `¡Alerta máxima de seguridad! Los villanos financieros como la Deuda Fantasma y el Monstruo de la Inflación intentan drenar tu liquidez. Utiliza tu escudo de autenticación en dos pasos, auditoría de balance y visión de flujo para derrotarlos y blindar tu patrimonio.`
  },
  carpinteria: {
    id: 'carpinteria',
    title: 'Taller de Carpintería de Mateo: Creación de Activos Físicos',
    eraName: 'Emprendimiento & Manufactura',
    icon: '🪵',
    color: '#f97316',
    durationEstimateSeconds: 25,
    text: `¡Manos a la obra en el taller de carpintería de Mateo! Aquí transformamos madera, engranajes y trabajo en bienes de alto valor agregado. Vende tus productos terminados para conseguir tu capital semilla y empezar a construir tu flujo de caja.`
  },
  vivero: {
    id: 'vivero',
    title: 'Vivero de Ideas & Hoja de Balance Contable',
    eraName: 'Educación Financiera Kai y Lia',
    icon: '🌱',
    color: '#10b981',
    durationEstimateSeconds: 28,
    text: `¡Bienvenidos al Vivero de Ideas Financieras de Kai y Lia! La regla de oro del dinero es sencilla: la riqueza no se mide por lo que gastas, sino por los activos que pones en tu columna izquierda. Organiza tus activos para que tus ingresos pasivos superen a tus pasivos y gastos.`
  },
  historia_completa: {
    id: 'historia_completa',
    title: 'Audiolibro Completo: El Viaje del Valor: De la Sal al Bit',
    eraName: 'Narración Integral • ircar rojas',
    icon: '🎧',
    color: '#10b981',
    durationEstimateSeconds: 150,
    text: `El Viaje del Valor: De la Sal al Bit. Por ircar rojas. Capítulo uno: El Mercado del Trueque. Hace miles de años, el comercio dependía de que dos personas quisieran exactamente lo que la otra ofrecía. Kai jalaba una cabra y Lia buscaba trigo, pero la doble coincidencia hacía del trueque un rompecabezas sin fin. Capítulo dos: La Sal y el Cauri. Para solucionar la carga, nacieron las conchas de cauri y los saquitos de sal pura, el primer salario que permitió llevar el valor de una cabra en la palma de la mano. Capítulo tres: La Moneda de Lidia. En la forja real, Darío estampó el sello del león sobre el electro de oro y plata, creando la moneda estandarizada que eliminó las balanzas y unió los puertos del mundo. Capítulo cuatro: El Ciberespacio y el Bit. Hoy, el dinero ha evolucionado hacia la información pura: bits, claves criptográficas y redes de blockchain que transmiten valor a la velocidad de la luz. El secreto final que Kai y Lia aprendieron es este: el valor nunca estuvo en el objeto físico, sino en la confianza humana y en la sabiduría de construir activos productivos para tu futuro.`
  }
};

type Listener = () => void;

/**
 * Preprocesses text into clean, phonetic, human-sounding Spanish
 */
function humanizeSpeechText(rawText: string): string {
  return rawText
    .replace(/CifraFlow/g, 'Cifra Flou')
    .replace(/\bBDV\b/g, 'Banco de Venezuela')
    .replace(/\bBVC\b/g, 'Bolsa de Valores de Caracas')
    .replace(/\bCANTV\b/g, 'Cantv')
    .replace(/\b2FA\b/g, 'doble factor de autenticación')
    .replace(/\bGen-Z\b/g, 'Generación Zeta')
    .replace(/\b3D\b/g, 'tres D')
    .replace(/\bBlockchain\b/gi, 'bloqchein')
    .replace(/\$([0-9]+)/g, '$1 dólares')
    .replace(/->/g, ' hacia ')
    .replace(/•/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits paragraph into natural human phrases/sentences with natural breath intervals
 */
function splitIntoHumanPhrases(text: string): string[] {
  // Split on sentence terminators (. ! ?) while keeping reasonable phrase lengths
  const regex = /([^.!?]+[.!?]+)/g;
  const rawMatches = text.match(regex);

  if (!rawMatches || rawMatches.length === 0) {
    return [text.trim()];
  }

  const phrases: string[] = [];
  for (const raw of rawMatches) {
    const trimmed = raw.trim();
    if (trimmed.length > 0) {
      phrases.push(trimmed);
    }
  }

  return phrases.length > 0 ? phrases : [text.trim()];
}

class NarratorEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = true;
  private isAllAudioPaused: boolean = true; // Paused by default as requested
  private currentTrack: NarrationTrack | null = null;
  private speechRate: number = 0.96; // Golden ratio for clear, human audiobook narration
  private speechPitch: number = 1.0; // Natural conversational warm human pitch
  private listeners: Set<Listener> = new Set();
  private audioCtx: AudioContext | null = null;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isAmbientPlaying: boolean = false;
  private progressPercent: number = 0;
  private availableSpanishVoices: SpeechSynthesisVoice[] = [];

  // Human phrasing state
  private phraseQueue: string[] = [];
  private currentPhraseIndex: number = 0;
  private phraseTimeout: number | null = null;
  private keepAliveInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoices();
        }
      }
    }
  }

  /**
   * Evaluates voice naturalness and human quality
   */
  private rankVoice(v: SpeechSynthesisVoice): number {
    let score = 0;
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();

    // Must be Spanish
    if (!lang.startsWith('es') && !name.includes('spanish') && !name.includes('español')) {
      return -1000;
    }

    // High priority for Natural / Neural / Online voices (Edge, Azure, Google Neural, Apple)
    if (name.includes('natural') || name.includes('neural') || name.includes('online') || name.includes('premium')) {
      score += 1500;
    }

    // Latin American / Venezuelan preference
    if (lang === 'es-ve' || name.includes('venezuela') || name.includes('venezolano')) score += 800;
    else if (lang === 'es-419' || name.includes('latin')) score += 650;
    else if (lang === 'es-mx' || name.includes('mexic') || name.includes('paulina') || name.includes('dalia') || name.includes('jorge')) score += 600;
    else if (lang === 'es-co' || name.includes('colombia') || name.includes('salome')) score += 550;
    else if (lang === 'es-us' || name.includes('united states') || name.includes('gonzalo')) score += 500;
    else if (lang === 'es-ar' || lang === 'es-cl' || lang === 'es-pe') score += 400;
    else if (lang.startsWith('es')) score += 200;

    // Reputable quality personas
    if (name.includes('google')) score += 350;
    if (name.includes('sabina') || name.includes('helena') || name.includes('monica') || name.includes('luciana') || name.includes('raul')) score += 280;

    // Penalize legacy robotic synthesizers
    if (name.includes('espeak') || name.includes('compact') || name.includes('desktop')) score -= 200;

    return score;
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter Spanish voices
    const spanish = voices.filter(v => 
      v.lang.toLowerCase().startsWith('es') || 
      v.name.toLowerCase().includes('spanish') ||
      v.name.toLowerCase().includes('español')
    );

    if (spanish.length === 0) {
      this.availableSpanishVoices = voices;
      this.selectedVoice = voices[0] || null;
      return;
    }

    // Sort by natural human score descending
    this.availableSpanishVoices = spanish.sort((a, b) => this.rankVoice(b) - this.rankVoice(a));
    this.selectedVoice = this.availableSpanishVoices[0];
    this.notify();
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.availableSpanishVoices;
  }

  public selectVoice(voiceURI: string) {
    const found = this.availableSpanishVoices.find(v => v.voiceURI === voiceURI);
    if (found) {
      this.selectedVoice = found;
      if (this.isSpeaking && this.currentTrack) {
        const trk = this.currentTrack;
        this.stop();
        this.play(trk.id);
      } else {
        this.notify();
      }
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public getState() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      isAllAudioPaused: this.isAllAudioPaused,
      currentTrack: this.currentTrack,
      speechRate: this.speechRate,
      speechPitch: this.speechPitch,
      selectedVoiceName: this.selectedVoice ? `${this.selectedVoice.name} (${this.selectedVoice.lang})` : 'Voz Humana Latina',
      selectedVoiceLang: this.selectedVoice?.lang || 'es-419',
      progressPercent: this.progressPercent,
      isAmbientPlaying: this.isAmbientPlaying,
      currentPhraseIndex: this.currentPhraseIndex,
      totalPhrases: this.phraseQueue.length
    };
  }

  public setSpeechRate(rate: number) {
    this.speechRate = Math.max(0.75, Math.min(1.3, rate));
    if (this.isSpeaking && this.currentTrack) {
      const current = this.currentTrack;
      this.stop();
      this.play(current.id);
    } else {
      this.notify();
    }
  }

  /**
   * Immediately pause all audios, narrations, background drones and sounds
   */
  public pauseAll() {
    this.isAllAudioPaused = true;
    if (this.phraseTimeout) {
      clearTimeout(this.phraseTimeout);
      this.phraseTimeout = null;
    }
    this.stopKeepAlive();
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = true;
    this.stopAmbientSoundscape();
    soundFx.pauseAll();
    this.notify();
  }

  /**
   * Resume/unpause all audios
   */
  public resumeAll() {
    this.isAllAudioPaused = false;
    soundFx.setMuted(false);
    if (this.currentTrack) {
      this.play(this.currentTrack.id, true);
    }
    this.notify();
  }

  public togglePauseAll() {
    if (this.isAllAudioPaused || (!this.isSpeaking && this.isPaused)) {
      this.resumeAll();
    } else {
      this.pauseAll();
    }
  }

  public isAllPaused(): boolean {
    return this.isAllAudioPaused;
  }

  /**
   * Play narration with human pacing, natural breath breaks, and neural voice
   */
  public play(trackKey: string, forcePlay: boolean = true) {
    const track = NARRATION_STORIES[trackKey];
    if (!track) return;

    this.stop();

    this.currentTrack = track;
    this.isAllAudioPaused = false;
    this.isSpeaking = true;
    this.isPaused = false;
    this.progressPercent = 0;

    // Start subtle atmospheric background
    this.startAmbientSoundscape(track.id);

    // Prepare human phrases
    const smoothedText = humanizeSpeechText(track.text);
    this.phraseQueue = splitIntoHumanPhrases(smoothedText);
    this.currentPhraseIndex = 0;

    this.startKeepAlive();
    this.speakNextPhrase();
    this.notify();
  }

  /**
   * Speaks one phrase at a time with a human breath pause
   */
  private speakNextPhrase() {
    if (!this.synth || !this.isSpeaking) return;

    if (this.currentPhraseIndex >= this.phraseQueue.length) {
      // Completed full track
      this.isSpeaking = false;
      this.isPaused = false;
      this.progressPercent = 100;
      this.stopAmbientSoundscape();
      this.stopKeepAlive();
      this.notify();
      return;
    }

    const rawPhrase = this.phraseQueue[this.currentPhraseIndex];
    const phrase = rawPhrase.trim();

    if (!phrase) {
      this.currentPhraseIndex++;
      this.speakNextPhrase();
      return;
    }

    // Calculate approximate progress
    const pct = Math.min(99, Math.round((this.currentPhraseIndex / this.phraseQueue.length) * 100));
    this.progressPercent = pct;
    this.notify();

    try {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch;
      utterance.volume = 1.0;
      utterance.lang = this.selectedVoice?.lang || 'es-419';

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onend = () => {
        if (!this.isSpeaking || this.isPaused) return;
        this.currentPhraseIndex++;

        // Natural breath pause between sentences (180ms to 240ms)
        this.phraseTimeout = window.setTimeout(() => {
          this.speakNextPhrase();
        }, 200);
      };

      utterance.onerror = (e) => {
        console.warn('Speech sentence notice:', e);
        if (this.isSpeaking && !this.isPaused) {
          this.currentPhraseIndex++;
          this.speakNextPhrase();
        }
      };

      this.synth.speak(utterance);
    } catch {
      this.currentPhraseIndex++;
      this.speakNextPhrase();
    }
  }

  public pause() {
    if (!this.isSpeaking) return;
    if (this.phraseTimeout) {
      clearTimeout(this.phraseTimeout);
      this.phraseTimeout = null;
    }
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
    this.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.isSpeaking) return;
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    } else {
      this.speakNextPhrase();
    }
    this.isPaused = false;
    this.notify();
  }

  public stop() {
    if (this.phraseTimeout) {
      clearTimeout(this.phraseTimeout);
      this.phraseTimeout = null;
    }
    this.stopKeepAlive();
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentTrack = null;
    this.phraseQueue = [];
    this.currentPhraseIndex = 0;
    this.stopAmbientSoundscape();
    this.progressPercent = 0;
    this.notify();
  }

  public togglePlayPause(trackKey?: string) {
    if (this.isSpeaking) {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
    } else if (trackKey) {
      this.play(trackKey);
    } else if (this.currentTrack) {
      this.play(this.currentTrack.id);
    } else {
      this.play('portada');
    }
  }

  /**
   * Browser keep-alive to avoid speech synthesis sleeping on long narrations
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveInterval = window.setInterval(() => {
      if (this.synth && this.isSpeaking && !this.isPaused) {
        if (this.synth.paused) {
          this.synth.resume();
        }
      }
    }, 5000);
  }

  private stopKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  /**
   * Subtle, whisper-soft harmonic drone in background (<0.008 gain)
   */
  private startAmbientSoundscape(trackId: string) {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopAmbientSoundscape();

      let freqs = [220, 329.63]; // Warm soft drone
      if (trackId.includes('trueque')) {
        freqs = [196, 261.63];
      } else if (trackId.includes('sal')) {
        freqs = [261.63, 329.63];
      } else if (trackId.includes('lidia')) {
        freqs = [220, 277.18];
      } else if (trackId.includes('digital') || trackId.includes('bit')) {
        freqs = [220, 440];
      }

      const now = this.audioCtx.currentTime;
      this.ambientOscillators = freqs.map((f, i) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        // Very soft acoustic bed so voice is crystal clear
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.006 / (i + 1), now + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(now);
        return { osc, gain };
      });

      this.isAmbientPlaying = true;
    } catch {
      // Graceful fallback
    }
  }

  private stopAmbientSoundscape() {
    if (this.ambientOscillators.length > 0 && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.ambientOscillators.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
          osc.stop(now + 0.45);
        } catch {
          // ignore
        }
      });
      this.ambientOscillators = [];
    }
    this.isAmbientPlaying = false;
  }
}

export const narratorEngine = new NarratorEngine();
narratorEngine.pauseAll();

