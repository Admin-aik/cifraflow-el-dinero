// Audio Narrator Engine with Web Speech API (Latin American / Venezuelan voice tuning) & Procedural Web Audio Ambient Soundscapes
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
    durationEstimateSeconds: 22,
    text: `¡Épa, viajero! Bienvenido al Nexo Temporal de CifraFlow. Estás a punto de cruzar las cuatro grandes eras del dinero y las finanzas. Identifícate con tu nombre o alias para registrar tu huella en el libro del tiempo, personalizar tu arquetipo y comenzar este viaje del valor junto a Kai y Lia. ¡Échale pichón y toma el control de tu futuro financiero!`
  },
  creacion_personaje: {
    id: 'creacion_personaje',
    title: 'Cámara de Forja: Creación de tu Identidad',
    eraName: 'Personalización de Arquetipo',
    icon: '⚡',
    color: '#d946ef',
    durationEstimateSeconds: 28,
    text: `¡Fíjate bien, mi gente! Has ingresado a la Cámara de Forja Temporal. Elige tu arquetipo generacional: Kai Streamer con su viralidad digital, Lia Coder con su optimización algorítmica, Maya Diseñadora con su valor de marca, o Leo Barista con su flujo de caja diario. Selecciona tu reliquia ancestral para recibir bonificaciones de arranque y prepararte para el gran salto al mapa de las eras.`
  },
  portada: {
    id: 'portada',
    title: 'Portada: El Viaje del Valor: De la Sal al Bit',
    eraName: 'Obra Original de ircar rojas',
    icon: '📘',
    color: '#00f3ff',
    durationEstimateSeconds: 26,
    text: `¡Qué tal, caminantes del tiempo! El Viaje del Valor: De la Sal al Bit, una obra original de ircar rojas. 
    Acompaña a Kai y Lia en una travesía épica a través del tiempo para desvelar el secreto más poderoso de la civilización: ¿qué es realmente el dinero y cómo ha evolucionado desde el antiguo mercado del trueque hasta la frontera cuántica de los bits?
    El dinero no es un simple objeto material: es una tecnología de confianza y coordinación social. ¡Descubre las leyes eternas del valor!`
  },
  introduccion: {
    id: 'introduccion',
    title: 'Introducción: El Secreto del Dinero & Los Mentores Kai y Lia',
    eraName: 'Prólogo Histórico',
    icon: '✨',
    color: '#38bdf8',
    durationEstimateSeconds: 34,
    text: `¡Épa! Bienvenidos a CifraFlow y a la crónica de El Viaje del Valor.
    A lo largo de los siglos, la humanidad ha buscado maneras de intercambiar su esfuerzo, sus cosechas y su talento. Quien no conoce el origen del dinero es esclavo de la deuda y la inflación; pero quien comprende su evolución se convierte en arquitecto de su libertad financiera.
    Junto a Kai, con su visor cuántico, y Lia, guardiana del valor, recorrerás cuatro grandes eras históricas. Prepárate para dominar los activos, superar los acertijos y forjar tu propio imperio de flujo de caja.`
  },
  era_trueque: {
    id: 'era_trueque',
    title: 'Era 1: El Mercado del Trueque & La Doble Coincidencia',
    eraName: 'Era 1: Trueque Ancestral',
    icon: '🐐',
    color: '#f59e0b',
    durationEstimateSeconds: 38,
    text: `¡Miren esta escena en el mercado ancestral! Era uno: El Mercado del Trueque.
    En el bullicio de una plaza de hace miles de años, Kai y Lia se enfrentan a un problema logístico agotador. Kai va tirando de una cabra inquieta que no se queda quieta, mientras Lia carga cestas vacías, buscando a alguien que necesite leche a cambio del trigo que les hace falta.
    Pero el mercader de grano ya tiene tres cabras en su corral y solo busca herramientas de cobre para arar su tierra.
    Es la famosa doble coincidencia de necesidades: el trueque es un rompecabezas donde las piezas casi nunca encajan. Los animales se cansan, comen forraje y no pueden dividirse a la mitad. La humanidad necesitaba urgentemente una mejor tecnología de valor.`
  },
  era_sal_cauri: {
    id: 'era_sal_cauri',
    title: 'Era 2: Las Conchas de Cauri & El Primer Salario',
    eraName: 'Era 2: Dinero Mercancía',
    icon: '🧂',
    color: '#06b6d4',
    durationEstimateSeconds: 36,
    text: `¡Pura candela financiera! Llegamos a la Era dos: El Dinero Mercancía, la Costa de Cauri y el Almacén de Sal.
    El mundo cambia por completo cuando Kai y Lia descubren que ya no hace falta cargar con pesados animales para comerciar. Aprenden que ciertos bienes tienen valor universal porque todos los aceptan.
    Lia sostiene un puñado de brillantes conchas de cauri, ligeras y hermosas, mientras Kai guarda con celo un saquito de sal marina pura.
    La sal no solo preserva los alimentos, sino que se convierte en el origen de la palabra salario.
    Ahora, el valor de una cabra cabe en la palma de tu mano. El dinero se vuelve portátil, duradero y sobre todo divisible.`
  },
  era_forja_lidia: {
    id: 'era_forja_lidia',
    title: 'Era 3: La Forja de Lidia & El Sello del León',
    eraName: 'Era 3: La Moneda Acuñada',
    icon: '🦁',
    color: '#eab308',
    durationEstimateSeconds: 36,
    text: `¡Escuchen ese martilleo en la fragua! Era tres: La Moneda Acuñada en el Reino de Lidia.
    En el taller real, Kai observa con asombro cómo el artesano Darío levanta su pesado martillo sobre un trozo de electro, esa mezcla natural de oro y plata.
    Con un golpe seco y certero, Darío estampa el sello real del león sobre el metal caliente, garantizando su peso y pureza ante el mundo entero.
    Ya no hace falta llevar pesadas balanzas a cada trato. La confianza ahora tiene la forma de un disco reluciente. Las monedas nacen para que el comercio navegue mares y conecte pueblos lejanos.`
  },
  era_red_digital: {
    id: 'era_red_digital',
    title: 'Era 4: La Red Invisible & Del Papel al Bit',
    eraName: 'Era 4: El Ciberespacio & Blockchain',
    icon: '⚡',
    color: '#d946ef',
    durationEstimateSeconds: 38,
    text: `¡A la velocidad de la luz, mi gente! Era cuatro: La Frontera Digital y la Red Invisible.
    En el presente, Kai y Lia ya no tocan monedas físicas, pero su impacto es más global que nunca.
    Rodeados de pantallas holográficas y flujos de datos, observan cómo los números bailan en tiempo real.
    El dinero se ha transformado en código criptográfico, en impulsos de fibra óptica y en redes descentralizadas de blockchain.
    Ya no es sal, ni oro, ni billetes de papel: es pura información y confianza compartida en una red global. El viaje del valor ha llegado a la era digital, donde tu mejor activo es tu conocimiento financiero.`
  },
  bancos: {
    id: 'bancos',
    title: 'Distrito Bancario: Bóvedas, Depósitos & Apalancamiento',
    eraName: 'Sistema Financiero Moderno',
    icon: '🏛️',
    color: '#3b82f6',
    durationEstimateSeconds: 30,
    text: `¡Mi gente, bienvenidos al Distrito Bancario de CifraFlow! Aquí aprendes a jugar con las reglas del dinero institucional. Deposita tus ganancias para generar intereses pasivos, solicita créditos para adquirir activos productivos y mantén bajo control el costo del apalancamiento para no caer en trampas de deuda.`
  },
  bolsa: {
    id: 'bolsa',
    title: 'Bolsa de Valores de Caracas: Piso de Remates & Acciones',
    eraName: 'Inversión en Renta Variable',
    icon: '📈',
    color: '#10b981',
    durationEstimateSeconds: 32,
    text: `¡Atención al piso de remates de la Bolsa de Valores de Caracas! Aquí compras participaciones reales de empresas productivas: Ron Santa Teresa, Banco Provincial, Mercantil y CANTV. Cobra dividendos mensuales y haz que el interés compuesto trabaje para ti mientras duermes.`
  },
  defensa: {
    id: 'defensa',
    title: 'Ciberdefensa Financiera: Escudo contra Fraudes y Deuda Fantasma',
    eraName: 'Protección de Patrimonio',
    icon: '🛡️',
    color: '#f43f5e',
    durationEstimateSeconds: 28,
    text: `¡Alerta máxima de seguridad! Los villanos financieros como la Deuda Fantasma y el Monstruo de la Inflación intentan drenar tu liquidez. Utiliza tu escudo de autenticación en dos pasos, auditoría de balance y visión de flujo para derrotarlos y blindar tu patrimonio.`
  },
  carpinteria: {
    id: 'carpinteria',
    title: 'Taller de Carpintería de Mateo: Creación de Activos Físicos',
    eraName: 'Emprendimiento & Manufactura',
    icon: '🪵',
    color: '#f97316',
    durationEstimateSeconds: 26,
    text: `¡Manos a la obra en el taller de carpintería de Mateo! Aquí transformamos madera, engranajes y trabajo en bienes de alto valor agregado. Vende tus productos terminados para conseguir tu capital semilla y empezar a construir tu flujo de caja.`
  },
  historia_completa: {
    id: 'historia_completa',
    title: 'Audiolibro Completo: El Viaje del Valor: De la Sal al Bit',
    eraName: 'Narración Integral • ircar rojas',
    icon: '🎧',
    color: '#10b981',
    durationEstimateSeconds: 155,
    text: `El Viaje del Valor: De la Sal al Bit. Por ircar rojas.
    Capítulo uno: El Mercado del Trueque. Hace miles de años, el comercio dependía de que dos personas quisieran exactamente lo que la otra ofrecía. Kai jalaba una cabra y Lia buscaba trigo, pero la doble coincidencia hacía del trueque un rompecabezas sin fin.
    Capítulo dos: La Sal y el Cauri. Para solucionar la carga, nacieron las conchas de cauri y los saquitos de sal pura, el primer salario que permitió llevar el valor de una cabra en la palma de la mano.
    Capítulo tres: La Moneda de Lidia. En la forja real, Darío estampó el sello del león sobre el electro de oro y plata, creando la moneda estandarizada que eliminó las balanzas y unió los puertos del mundo.
    Capítulo cuatro: El Ciberespacio y el Bit. Hoy, el dinero ha evolucionado hacia la información pura: bits, claves criptográficas y redes de blockchain que transmiten valor a la velocidad de la luz.
    El secreto final que Kai y Lia aprendieron es este: el valor nunca estuvo en el objeto físico, sino en la confianza humana y en la sabiduría de construir activos productivos para tu futuro.`
  }
};

type Listener = () => void;

class NarratorEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private currentTrack: NarrationTrack | null = null;
  private speechRate: number = 1.03; // Lively and natural Latin pace
  private speechPitch: number = 1.06; // Warm and melodic Latin American intonation
  private listeners: Set<Listener> = new Set();
  private audioCtx: AudioContext | null = null;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isAmbientPlaying: boolean = false;
  private progressPercent: number = 0;
  private progressInterval: number | null = null;
  private availableSpanishVoices: SpeechSynthesisVoice[] = [];

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

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter all Spanish voices
    this.availableSpanishVoices = voices.filter(v => 
      v.lang.toLowerCase().startsWith('es') || 
      v.lang.toLowerCase().includes('spanish')
    );

    // Prioritize Latin American & Venezuelan Voices:
    // 1. es-VE (Spanish - Venezuela)
    // 2. Latin America generic (es-419, es-US, es-MX, es-CO)
    // 3. Known warm Spanish Natural voices (Google, Paulina, Sabina, Raul, Helena, etc.)
    const venezuelanVoice = this.availableSpanishVoices.find(v => 
      v.lang.toLowerCase() === 'es-ve' || 
      v.name.toLowerCase().includes('venezuela') || 
      v.name.toLowerCase().includes('venezolano')
    );

    const latinAmericanVoice = this.availableSpanishVoices.find(v => 
      v.lang.toLowerCase() === 'es-419' || 
      v.lang.toLowerCase() === 'es-us' || 
      v.lang.toLowerCase() === 'es-mx' || 
      v.lang.toLowerCase() === 'es-co' ||
      v.name.toLowerCase().includes('latin') ||
      v.name.toLowerCase().includes('mexico') ||
      v.name.toLowerCase().includes('colombia') ||
      v.name.toLowerCase().includes('paulina') ||
      v.name.toLowerCase().includes('sabina') ||
      v.name.toLowerCase().includes('raul')
    );

    const naturalGoogleVoice = this.availableSpanishVoices.find(v =>
      v.name.toLowerCase().includes('google') ||
      v.name.toLowerCase().includes('natural')
    );

    this.selectedVoice = venezuelanVoice || latinAmericanVoice || naturalGoogleVoice || this.availableSpanishVoices[0] || voices[0];
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.availableSpanishVoices;
  }

  public selectVoice(voiceURI: string) {
    const found = this.availableSpanishVoices.find(v => v.voiceURI === voiceURI);
    if (found) {
      this.selectedVoice = found;
      this.notify();
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
      currentTrack: this.currentTrack,
      speechRate: this.speechRate,
      speechPitch: this.speechPitch,
      selectedVoiceName: this.selectedVoice?.name || 'Español Latino (Voz Cuántica)',
      selectedVoiceLang: this.selectedVoice?.lang || 'es-419',
      progressPercent: this.progressPercent,
      isAmbientPlaying: this.isAmbientPlaying
    };
  }

  public setSpeechRate(rate: number) {
    this.speechRate = Math.max(0.75, Math.min(1.4, rate));
    if (this.isSpeaking && this.currentTrack) {
      const current = this.currentTrack;
      this.stop();
      this.play(current.id);
    } else {
      this.notify();
    }
  }

  // Play a specific narration track with Latin American / Venezuelan entonation
  public play(trackKey: string) {
    const track = NARRATION_STORIES[trackKey];
    if (!track) return;

    this.stop();

    this.currentTrack = track;
    this.isSpeaking = true;
    this.isPaused = false;
    this.progressPercent = 0;

    // Start subtle ambient soundscape matching the era
    this.startAmbientSoundscape(track.id);

    if (this.synth) {
      // Clean up previous utterances
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(track.text);
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch; // Melodic intonation
      utterance.volume = 1.0;
      utterance.lang = this.selectedVoice?.lang || 'es-419';

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.isPaused = false;
        this.startProgressTracking(track.durationEstimateSeconds / this.speechRate);
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.progressPercent = 100;
        this.stopAmbientSoundscape();
        this.stopProgressTracking();
        this.notify();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notification:', e);
        this.isSpeaking = false;
        this.isPaused = false;
        this.stopAmbientSoundscape();
        this.stopProgressTracking();
        this.notify();
      };

      utterance.onpause = () => {
        this.isPaused = true;
        this.notify();
      };

      utterance.onresume = () => {
        this.isPaused = false;
        this.notify();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } else {
      // Fallback timer if speech synthesis is not supported in environment
      this.startProgressTracking(track.durationEstimateSeconds / this.speechRate);
    }

    this.notify();
  }

  public pause() {
    if (!this.isSpeaking) return;
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
    }
    this.isPaused = false;
    this.notify();
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.stopProgressTracking();
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

  private startProgressTracking(estimatedDurationSeconds: number) {
    this.stopProgressTracking();
    const startTime = Date.now();
    const totalMs = estimatedDurationSeconds * 1000;

    this.progressInterval = window.setInterval(() => {
      if (this.isPaused) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(99, Math.floor((elapsed / totalMs) * 100));
      this.progressPercent = pct;
      this.notify();
    }, 200);
  }

  private stopProgressTracking() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  // Web Audio Procedural Ambient Drone generator for each era
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

      let freqs = [220, 329.63, 440]; // Default warm A minor / major drone
      if (trackId.includes('trueque')) {
        freqs = [196, 261.63, 392]; // Earthy G - C - G
      } else if (trackId.includes('sal')) {
        freqs = [261.63, 329.63, 523.25]; // Crystalline C - E - C
      } else if (trackId.includes('lidia')) {
        freqs = [220, 277.18, 440]; // Radiant A - C# - A (Golden)
      } else if (trackId.includes('digital') || trackId.includes('bit')) {
        freqs = [146.83, 220, 440, 587.33]; // Cyber D - A - D - F#
      } else if (trackId.includes('bolsa') || trackId.includes('banco')) {
        freqs = [261.63, 329.63, 392, 523.25]; // Uplifting C Major
      }

      const now = this.audioCtx.currentTime;
      this.ambientOscillators = freqs.map((f, i) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        // Soft, relaxing background ambient volume (< 0.015)
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.015 / (i + 1), now + 1.5);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(now);
        return { osc, gain };
      });

      this.isAmbientPlaying = true;
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  private stopAmbientSoundscape() {
    if (this.ambientOscillators.length > 0 && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.ambientOscillators.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
          osc.stop(now + 0.65);
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
