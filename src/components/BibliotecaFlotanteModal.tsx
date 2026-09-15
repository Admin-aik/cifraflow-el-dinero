import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { narratorEngine, NARRATION_STORIES } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  BookOpen, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  Headphones, 
  Radio,
  Layers,
  FileText
} from 'lucide-react';

export interface BookPage {
  pageNumber: number;
  trackKey: string;
  title: string;
  eraBadge: string;
  characters: string;
  icon: string;
  image: string;
  paragraphs: string[];
  takeaways: string[];
  comicArtDescription: string;
  quote: string;
}

const BOOK_PAGES: BookPage[] = [
  {
    pageNumber: 1,
    trackKey: 'portada',
    title: 'Portada: El Viaje del Valor: De la Sal al Bit',
    eraBadge: 'Obra Original de ircar rojas',
    characters: 'Kai (Visor Cuántico) & Lia (Coleta Estelar)',
    icon: '📘',
    image: GAME_IMAGES.bookCover,
    paragraphs: [
      'Acompaña a Kai y Lia en una travesía épica a través del tiempo para desvelar el secreto más poderoso de la civilización humana: ¿qué es realmente el dinero y cómo ha evolucionado desde el antiguo mercado del trueque hasta la frontera cuántica de los bits?',
      'El dinero no es un simple objeto material, es una tecnología de confianza y coordinación social. Comprender cómo surgió te otorga superpoderes para dominar el ahorro, vencer a la inflación y construir tu patrimonio en el siglo XXI.'
    ],
    takeaways: [
      'El dinero no es un objeto material: es una tecnología de confianza y coordinación social.',
      'Aprender cómo surgió el dinero te da superpoderes para dominar el ahorro y la inversión moderna.',
      'Kai y Lia son los crononautas que descubren las leyes eternas del valor.'
    ],
    comicArtDescription: 'Kai con su visor cian brillante y reloj cuántico junto a Lia con su coleta estelar, parados entre las columnas de piedra de un mercado antiguo y la cuadrícula de neón del ciberespacio, bajo una gran moneda dorada con el feroz león de Lidia.',
    quote: '«El Viaje del Valor: De la Sal al Bit — Obra original de ircar rojas»'
  },
  {
    pageNumber: 2,
    trackKey: 'era_trueque',
    title: 'Página 1: El Mercado del Trueque & La Doble Coincidencia',
    eraBadge: 'Era 1: El Trueque Antiguo',
    characters: 'Kai, Lia, la cabra inquieta marrón y el mercader de grano',
    icon: '🐐',
    image: GAME_IMAGES.eras.trueque,
    paragraphs: [
      'En el bullicio de un mercado de hace miles de años, Kai y Lia se enfrentan a un problema logístico agotador. Kai tira de la cuerda de una cabra inquieta que no se está quieta, mientras Lia carga con cestas vacías, buscando desesperadamente a alguien que necesite leche a cambio de los sacos de trigo que tanto les hacen falta.',
      'Pero el mercader de grano ya tiene tres cabras en su corral y solo busca herramientas de cobre para arar su tierra. Es la famosa "doble coincidencia de necesidades": el trueque es un rompecabezas donde las piezas casi nunca encajan, y el tiempo se escapa entre regateos sin éxito.',
      'Los animales se cansan, comen forraje y no pueden partirse a la mitad sin morir. La humanidad necesitaba con urgencia una tecnología para almacenar y transferir el valor.'
    ],
    takeaways: [
      'Doble Coincidencia: Para comerciar con trueque, debes hallar a alguien que tenga lo que quieres Y que además desee exactamente lo que tú ofreces.',
      'Fricción e Ineficiencia: La sociedad no podía especializarse cuando se pasaban días enteros buscando con quién cambiar una cabra.',
      'Indivisibilidad: Una cabra viva no puede dividirse en pequeñas fracciones para compras menores.'
    ],
    comicArtDescription: 'Un mercado vibrante lleno de vasijas de barro, Kai sudando mientras jala una cabrita marrón terca, Lia con cestas vacías mirando con frustración al mercader de grano que rechaza su oferta con los brazos cruzados.',
    quote: '«El trueque es un rompecabezas donde las piezas casi nunca encajan, y el tiempo se escapa entre regateos sin éxito.»'
  },
  {
    pageNumber: 3,
    trackKey: 'era_sal_cauri',
    title: 'Página 2: Las Conchas de Cauri & El Primer Salario',
    eraBadge: 'Era 2: El Dinero Mercancía',
    characters: 'Lia con conchas de cauri brillantes y Kai con saquito de sal pura',
    icon: '🧂',
    image: GAME_IMAGES.eras.salCauri,
    paragraphs: [
      'El mundo cambia cuando Kai y Lia descubren que ya no necesitan cargar con animales pesados para comerciar. Aprenden que ciertos objetos poseen un valor universal porque toda la comunidad los reconoce y acepta.',
      'Lia sostiene un puñado de brillantes conchas de cauri, pequeñas y ligeras como tesoros marinos, mientras Kai guarda con celo un saquito de sal marina pura. La sal no solo sazona y preserva los alimentos: se convierte en el primer "salario" formal de la historia.',
      'Ahora, el valor de una cabra cabe en la palma de su mano. El dinero se ha vuelto portátil, duradero y, sobre todo, perfectamente divisible para cualquier intercambio cotidiano.'
    ],
    takeaways: [
      'Portabilidad: El valor de una pesada cabra ahora pesa pocos gramos en la palma de la mano.',
      'Durabilidad: La sal pura y las conchas no mueren, no se pudren ni se enferman con el tiempo.',
      'Divisibilidad: Puedes fraccionar la sal en puñados exactos para pagar compras pequeñas y salarios.'
    ],
    comicArtDescription: 'Frente a una hermosa costa azul con montículos blancos de sal cristalina, Kai guarda un saquito de cuero con sal pura y Lia sonríe maravillada con un puñado de conchas marinas de cauri brillantes.',
    quote: '«Ahora, el valor de una cabra cabe en la palma de su mano; el dinero se ha vuelto portátil, duradero y divisible.»'
  },
  {
    pageNumber: 4,
    trackKey: 'era_forja_lidia',
    title: 'Página 3: La Forja de Lidia & El Sello del León',
    eraBadge: 'Era 3: La Moneda Acuñada',
    characters: 'El maestro artesano Dario (herrero de Lidia) y Kai',
    icon: '🦁',
    image: GAME_IMAGES.eras.forjaLidia,
    paragraphs: [
      'Los siglos pasan y el ingenio humano busca mayor precisión y rapidez. En el próspero reino de Lidia, Kai observa con asombro cómo el herrero Darío golpea un trozo de electro —una aleación natural de oro y plata— sobre el yunque ardiente.',
      'Con un golpe seco y certero de su martillo de acero, Darío estampa el feroz sello del león sobre el metal candente, garantizando su peso y pureza oficiales ante reyes y mercaderes.',
      'Ya no hace falta cargar balanzas en cada transacción comercial. La confianza ahora tiene la forma de un disco reluciente. Las monedas nacen para que el comercio cruce mares y una a civilizaciones lejanas.'
    ],
    takeaways: [
      'Estandarización: El sello real garantiza el peso y pureza exactos del metal precioso.',
      'Eliminación de Balanzas: Ya no necesitas pesar el oro en cada tienda; basta con contar las monedas.',
      'Comercio Global: Las monedas acuñadas permitieron el nacimiento del comercio internacional fluido.'
    ],
    comicArtDescription: 'En la fragua de piedra ardiente (Lydian Mint), Dario el fornido artesano levanta su martillo sobre el yunque de acero mientras Kai con su visor futurista observa chispas de oro y plata saltando al acuñar el león.',
    quote: '«Ya no hace falta pesar el metal en cada trato; la confianza ahora tiene la forma de un disco reluciente.»'
  },
  {
    pageNumber: 5,
    trackKey: 'era_red_digital',
    title: 'Página 4: La Red Invisible & Del Papel al Bit',
    eraBadge: 'Era 4: El Ciberespacio & Blockchain',
    characters: 'Kai y Lia en el ciberespacio frente a pantallas cuánticas de datos',
    icon: '⚡',
    image: GAME_IMAGES.eras.bitBlockchain,
    paragraphs: [
      'En el presente, Kai y Lia ya no tocan el dinero físico, pero su alcance e impacto son más globales y veloces que nunca.',
      'Sentados en un entorno de luces de neón y flujos de datos interconectados, observan cómo las cifras bailan en tiempo real en pantallas holográficas. El dinero se ha transformado en código matemático, en pulsos de fibra óptica y en redes distribuidas de blockchain.',
      'Ya no es sal, ni oro, ni papel moneda: es pura información y confianza compartida en una red invisible que conecta el planeta. El viaje del valor ha llegado a la frontera digital, donde tu mejor activo es tu educación financiera.'
    ],
    takeaways: [
      'Pura Información: El dinero no requiere ser un objeto físico; es un libro de cuentas inmutable.',
      'Velocidad de la Luz: Las transferencias cruzan continentes en milisegundos gracias a la tecnología de red.',
      'Criptografía y Matemáticas: Protocolos inmutables evitan el doble gasto y prescinden de intermediarios lentos.'
    ],
    comicArtDescription: 'Kai y Lia sentados espalda con espalda en un mundo cibernético de rejillas holográficas púrpuras y cian, con pantallas de trading de cotización en tiempo real y monedas de datos flotando a su alrededor.',
    quote: '«Ya no es sal, ni oro, ni papel; es pura información y confianza compartida en una red invisible que conecta el mundo entero.»'
  },
  {
    pageNumber: 6,
    trackKey: 'epilogo_mentores',
    title: 'Página 5: Los Guardianes del Valor & Tu Futuro Financiero',
    eraBadge: 'Epílogo & Sabiduría Patrimonial',
    characters: 'Kai, Lia y los nuevos arquitectos del valor',
    icon: '🏛️',
    image: GAME_IMAGES.mentors,
    paragraphs: [
      'Kai y Lia concluyen su travesía mirándote a los ojos. El viaje a través de las cuatro eras no fue solo una lección de historia: es el mapa para que construyas tu propia libertad financiera.',
      'Al entender cómo el valor se transformó desde la cabra inquieta del trueque hasta los bits del ciberespacio, ahora sabes identificar la inflación, el interés compuesto y el poder de los activos productivos.',
      'Cada decisión económica que tomas hoy define tu futuro. Invierte tus puntos, administra tu flujo de caja con sabiduría y conviértete en un verdadero guardián del valor.'
    ],
    takeaways: [
      'Comprensión Histórica: Conocer el origen del dinero te protege contra la pérdida de poder adquisitivo.',
      'Flujo de Caja Activo: Haz que tus activos generen rendimientos continuos en lugar de acumular pasivos.',
      'Tu Mente es el Activo Supremo: La educación financiera es la única inversión que nunca se devalúa.'
    ],
    comicArtDescription: 'Kai con su visor brillante y Lia con su tableta holográfica sonriendo al viajero frente a las cuatro puertas temporales de las eras del dinero.',
    quote: '«Quien no conoce el origen del dinero es esclavo de la deuda; quien comprende su evolución se convierte en arquitecto de su libertad financiera.»'
  }
];

export const BibliotecaFlotanteModal: React.FC = () => {
  const { activeModal, closeModal } = useGameStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());
  const [activeReadingId, setActiveReadingId] = useState<string | null>(null);
  const [autoReadOnClick, setAutoReadOnClick] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      const state = narratorEngine.getState();
      setNarratorState(state);
      if (!state.isSpeaking) {
        setActiveReadingId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // When changing page, if autoReadOnClick is enabled, start narration of that page on click
  useEffect(() => {
    if (activeModal === 'biblioteca' && autoReadOnClick && viewMode === 'single') {
      const currentPage = BOOK_PAGES[currentPageIndex];
      setActiveReadingId(`page_${currentPage.pageNumber}`);
      narratorEngine.play(currentPage.trackKey);
    }
  }, [activeModal, currentPageIndex, autoReadOnClick, viewMode]);

  if (activeModal !== 'biblioteca') return null;

  const page = BOOK_PAGES[currentPageIndex];
  const isNarratingThisPage = narratorState.isSpeaking && (
    narratorState.currentTrack?.id === page.trackKey || 
    activeReadingId === `page_${page.pageNumber}`
  );

  const handleNextPage = () => {
    if (currentPageIndex < BOOK_PAGES.length - 1) {
      soundFx.playClick();
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      soundFx.playClick();
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  // Click on Page Image: Reads the entire scene narrative
  const handleReadPage = (targetPage: BookPage) => {
    soundFx.playSuccess();
    const sectionId = `page_${targetPage.pageNumber}`;
    if (activeReadingId === sectionId && narratorState.isSpeaking) {
      narratorEngine.pause();
    } else {
      setActiveReadingId(sectionId);
      const fullText = `${targetPage.title}. ${targetPage.paragraphs.join(' ')}`;
      narratorEngine.readCuentoSection(
        sectionId,
        fullText,
        targetPage.title,
        targetPage.eraBadge
      );
    }
  };

  // Click on specific Paragraph: Reads that exact paragraph
  const handleReadParagraph = (targetPage: BookPage, pIdx: number, text: string) => {
    soundFx.playClick();
    const sectionId = `p_${targetPage.pageNumber}_${pIdx}`;
    if (activeReadingId === sectionId && narratorState.isSpeaking) {
      narratorEngine.pause();
    } else {
      setActiveReadingId(sectionId);
      narratorEngine.readCuentoSection(
        sectionId,
        text,
        `${targetPage.title} — Párrafo ${pIdx + 1}`,
        targetPage.eraBadge
      );
    }
  };

  // Click on Quote: Reads the quote out loud
  const handleReadQuote = (targetPage: BookPage) => {
    soundFx.playClick();
    const sectionId = `quote_${targetPage.pageNumber}`;
    setActiveReadingId(sectionId);
    narratorEngine.readCuentoSection(
      sectionId,
      `Cita del libro: ${targetPage.quote}`,
      `Cita Célebre de ${targetPage.title}`,
      targetPage.eraBadge
    );
  };

  // Click on Key Lesson: Reads lesson out loud
  const handleReadTakeaway = (targetPage: BookPage, lessonIdx: number, text: string) => {
    soundFx.playClick();
    const sectionId = `lesson_${targetPage.pageNumber}_${lessonIdx}`;
    setActiveReadingId(sectionId);
    narratorEngine.readCuentoSection(
      sectionId,
      `Lección clave ${lessonIdx + 1}: ${text}`,
      `Lección de ${targetPage.title}`,
      targetPage.eraBadge
    );
  };

  // Toggle Full Audiobook
  const handlePlayCompleteAudiobook = () => {
    soundFx.playClick();
    setActiveReadingId('historia_completa');
    narratorEngine.play('historia_completa');
  };

  return (
    <div id="modal-biblioteca-flotante" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900/95 border-2 border-cyan-500/70 rounded-3xl p-4 sm:p-6 md:p-7 text-white shadow-[0_0_60px_rgba(0,242,254,0.3)] overflow-hidden max-h-[95vh] flex flex-col">
        
        {/* CLOSE BUTTON */}
        <button
          id="btn-close-biblioteca"
          onClick={() => {
            soundFx.playClick();
            narratorEngine.stop();
            closeModal();
          }}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-20 cursor-pointer"
          title="Cerrar Cuento"
        >
          <X className="w-6 h-6" />
        </button>

        {/* TOP HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                CUENTO ILUSTRADO & AUDIOLIBRO DIGITAL
              </span>
              <span className="text-xs font-mono text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                By ircar rojas
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
              El Viaje del Valor: De la Sal al Bit
            </h2>
            <p className="text-xs text-cyan-300/90 font-medium">
              Lectura con voz interactiva: ¡Haz clic en cualquier imagen, párrafo o cita para escucharla de inmediato!
            </p>
          </div>

          {/* VIEW MODE TOGGLE & AUDIO CONTROLS */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('single');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Ver página a página con imagen grande e historia debajo"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Página a Página</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('continuous');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'continuous'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Ver todas las imágenes grandes continuas con su historia debajo"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cuento Continuo</span>
              </button>
            </div>

            <button
              onClick={handlePlayCompleteAudiobook}
              className="hidden lg:flex px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold items-center gap-1.5 transition-all cursor-pointer"
              title="Escuchar toda la historia de corrido"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>Audiolibro Completo</span>
            </button>
          </div>
        </div>

        {/* NARRATOR BAR WITH CLICK-TO-READ STATUS */}
        <div className="mb-3 p-3 rounded-2xl bg-slate-950 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              narratorState.isSpeaking
                ? 'bg-cyan-500 text-slate-950 animate-pulse shadow-md shadow-cyan-500/40'
                : 'bg-slate-800 text-cyan-400'
            }`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">Narración Interactiva al Clic</span>
                {narratorState.isSpeaking && (
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1 animate-pulse">
                    <Radio className="w-3 h-3 text-cyan-400" /> NARRANDO AHORA
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {narratorState.isSpeaking && narratorState.currentTrack
                  ? `Voz activa: "${narratorState.currentTrack.title}" (${narratorState.progressPercent}%)`
                  : 'Haz clic sobre cualquier imagen o texto para escuchar la lectura al instante.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-read toggle */}
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={autoReadOnClick}
                onChange={e => setAutoReadOnClick(e.target.checked)}
                className="w-3.5 h-3.5 accent-cyan-400 cursor-pointer"
              />
              <span className="text-[11px]">Lectura al cambiar página</span>
            </label>

            {narratorState.isSpeaking && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  if (narratorState.isPaused) narratorEngine.resume();
                  else narratorEngine.pause();
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer transition-all"
              >
                {narratorState.isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Reanudar
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" /> Pausar
                  </>
                )}
              </button>
            )}

            {narratorState.isSpeaking && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  narratorEngine.stop();
                  setActiveReadingId(null);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                title="Detener Narración"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* THUMBNAILS BAR (IN SINGLE PAGE MODE) */}
        {viewMode === 'single' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 scrollbar-thin">
            {BOOK_PAGES.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentPageIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border cursor-pointer ${
                  currentPageIndex === idx
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)] scale-102'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
                title={p.title}
              >
                <span className="text-sm">{p.icon}</span>
                <span className="whitespace-nowrap">Pág {p.pageNumber}</span>
              </button>
            ))}
          </div>
        )}

        {/* MAIN SCROLLABLE CONTENT: IMÁGENES GRANDES CON LA HISTORIA DEBAJO */}
        <div className="overflow-y-auto pr-1 sm:pr-2 flex-1 space-y-8">
          {viewMode === 'single' ? (
            /* ================= SINGLE PAGE VIEW ================= */
            <div className="space-y-6">
              {/* 1. IMAGEN GRANDE */}
              <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/60 group bg-slate-950">
                <img
                  src={page.image}
                  alt={page.title}
                  referrerPolicy="no-referrer"
                  onClick={() => handleReadPage(page)}
                  className="w-full h-64 sm:h-80 md:h-[440px] lg:h-[480px] object-cover sm:object-contain bg-slate-950 group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                />
                
                {/* Visual Audio Wave & Click overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Action Button ON the Image */}
                <button
                  onClick={() => handleReadPage(page)}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2.5 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/70 shadow-2xl backdrop-blur-md font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  title="Haz clic para escuchar la narración completa de esta escena"
                >
                  {isNarratingThisPage && !narratorState.isPaused ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Narrando Escena... (Clic para Pausar)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      <span>🔊 Clic en la Imagen para Escuchar</span>
                    </>
                  )}
                </button>

                {/* Top Badge on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold backdrop-blur-md">
                    {page.icon} {page.eraBadge}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold backdrop-blur-md">
                    Página {page.pageNumber} de {BOOK_PAGES.length}
                  </span>
                </div>
              </div>

              {/* 2. LA HISTORIA DIRECTAMENTE DEBAJO DE LA IMAGEN */}
              <div className="p-5 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
                {/* Title & Metadata */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-1">
                    <span className="font-mono text-cyan-400 font-bold">{page.eraBadge}</span>
                    <span>Personajes en escena: <strong className="text-slate-200">{page.characters}</strong></span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    {page.title}
                  </h3>
                </div>

                {/* Clickable Paragraphs ("la lectura se haga a medida que se hace clic") */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                    <span>📖</span>
                    <span>TEXTO DEL CUENTO (Haz clic en cualquier párrafo para escucharlo):</span>
                  </div>

                  {page.paragraphs.map((pText, pIdx) => {
                    const isReadingThisP = activeReadingId === `p_${page.pageNumber}_${pIdx}` && narratorState.isSpeaking;

                    return (
                      <div
                        key={pIdx}
                        onClick={() => handleReadParagraph(page, pIdx, pText)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer group text-slate-200 relative ${
                          isReadingThisP
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-[0_0_25px_rgba(0,242,254,0.35)] ring-1 ring-cyan-400 scale-[1.01]'
                            : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/60'
                        }`}
                        title="Haz clic para escuchar este párrafo narrado en voz viva"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1.5 opacity-80 group-hover:opacity-100">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Volume2 className={`w-3.5 h-3.5 ${isReadingThisP ? 'text-cyan-300 animate-bounce' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                            {isReadingThisP ? '🔊 LEYENDO ESTE PÁRRAFO... (Clic para pausar)' : '▶ Clic para escuchar este párrafo'}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                            Párrafo {pIdx + 1}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                          {pText}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Clickable Quote from the original book */}
                <div
                  onClick={() => handleReadQuote(page)}
                  className={`p-4 rounded-2xl border-l-4 border-amber-400 transition-all cursor-pointer group flex items-start justify-between gap-3 ${
                    activeReadingId === `quote_${page.pageNumber}` && narratorState.isSpeaking
                      ? 'bg-amber-950/70 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                      : 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-slate-800 hover:border-amber-400/50'
                  }`}
                  title="Haz clic para escuchar la cita célebre"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 mb-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>CITA DESTACADA DEL LIBRO DE IRCAR ROJAS (Clic para escuchar):</span>
                    </div>
                    <p className="text-sm sm:text-base italic text-amber-200 leading-relaxed font-serif">
                      {page.quote}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Clickable Key Lessons */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Lecciones Clave para la Vida y las Finanzas (Haz clic en cada lección):</span>
                    <span className="text-[10px] font-mono text-cyan-400">Audio interactivo</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {page.takeaways.map((point, i) => {
                      const isReadingLesson = activeReadingId === `lesson_${page.pageNumber}_${i}` && narratorState.isSpeaking;

                      return (
                        <div
                          key={i}
                          onClick={() => handleReadTakeaway(page, i, point)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer text-xs flex items-start gap-2 group ${
                            isReadingLesson
                              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400 shadow-md'
                              : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/40 text-slate-300'
                          }`}
                          title="Haz clic para escuchar esta lección"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="leading-snug">{point}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Visual Comic Scene Description */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-yellow-400">Escena Ilustrada en el Cómic:</strong> {page.comicArtDescription}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= CONTINUOUS VIEW: TODAS LAS IMÁGENES GRANDES CON SU HISTORIA DEBAJO ================= */
            <div className="space-y-12 pb-6">
              {BOOK_PAGES.map((p) => {
                const isThisPageNarrating = narratorState.isSpeaking && (
                  narratorState.currentTrack?.id === p.trackKey ||
                  activeReadingId === `page_${p.pageNumber}`
                );

                return (
                  <div key={p.pageNumber} className="space-y-6 border-b-2 border-slate-800/80 pb-10">
                    {/* IMAGEN GRANDE */}
                    <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/60 group bg-slate-950">
                      <img
                        src={p.image}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        onClick={() => handleReadPage(p)}
                        className="w-full h-72 sm:h-96 md:h-[460px] object-cover sm:object-contain bg-slate-950 group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                      />
                      
                      {/* Floating Action Button ON the Image */}
                      <button
                        onClick={() => handleReadPage(p)}
                        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2.5 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/70 shadow-2xl backdrop-blur-md font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                      >
                        {isThisPageNarrating && !narratorState.isPaused ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Narrando... (Clic para Pausar)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-cyan-400" />
                            <span>🔊 Clic en la Imagen para Escuchar</span>
                          </>
                        )}
                      </button>

                      {/* Top Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold backdrop-blur-md">
                          {p.icon} {p.eraBadge}
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold backdrop-blur-md">
                          Página {p.pageNumber} de {BOOK_PAGES.length}
                        </span>
                      </div>
                    </div>

                    {/* HISTORIA DIRECTAMENTE DEBAJO DE LA IMAGEN */}
                    <div className="p-5 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-5 shadow-xl">
                      <div>
                        <div className="text-xs text-cyan-400 font-mono font-bold mb-1">{p.eraBadge}</div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">{p.title}</h3>
                      </div>

                      {/* Clickable Paragraphs */}
                      <div className="space-y-3">
                        {p.paragraphs.map((pText, pIdx) => {
                          const isReadingThisP = activeReadingId === `p_${p.pageNumber}_${pIdx}` && narratorState.isSpeaking;

                          return (
                            <div
                              key={pIdx}
                              onClick={() => handleReadParagraph(p, pIdx, pText)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer group text-slate-200 ${
                                isReadingThisP
                                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,242,254,0.3)] ring-1 ring-cyan-400'
                                  : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/60'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1.5 opacity-80 group-hover:opacity-100">
                                <span className="flex items-center gap-1.5 font-bold">
                                  <Volume2 className="w-3.5 h-3.5" />
                                  {isReadingThisP ? '🔊 LEYENDO PÁRRAFO' : '▶ Clic para escuchar este párrafo'}
                                </span>
                                <span className="text-[10px] text-slate-400">Párrafo {pIdx + 1}</span>
                              </div>
                              <p className="text-sm sm:text-base leading-relaxed">{pText}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quote */}
                      <div
                        onClick={() => handleReadQuote(p)}
                        className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border-l-4 border-amber-400 border border-slate-800 text-sm sm:text-base italic text-amber-200 cursor-pointer hover:border-amber-400/60 transition-all flex items-start justify-between gap-3"
                      >
                        <p>{p.quote}</p>
                        <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM PAGINATION CONTROLS (ONLY IN SINGLE PAGE MODE) */}
        {viewMode === 'single' && (
          <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                currentPageIndex === 0
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Página Anterior
            </button>

            <span className="text-xs sm:text-sm text-cyan-300 font-mono font-bold bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {currentPageIndex + 1} de {BOOK_PAGES.length}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === BOOK_PAGES.length - 1}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                currentPageIndex === BOOK_PAGES.length - 1
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/30'
              }`}
            >
              Página Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
