import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  BookOpen, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Bookmark 
} from 'lucide-react';

interface BookPage {
  pageNumber: number;
  title: string;
  eraBadge: string;
  characters: string;
  icon: string;
  image: string;
  storyText: string;
  takeaways: string[];
  comicArtDescription: string;
  quote: string;
}

const BOOK_PAGES: BookPage[] = [
  {
    pageNumber: 1,
    title: 'Portada: El Viaje del Valor: De la Sal al Bit',
    eraBadge: 'Obra Original de ircar rojas',
    characters: 'Kai (Visor Azul y Brazalete Cuántico) & Lia (Coleta y Brazalete Neón)',
    icon: '📘',
    image: GAME_IMAGES.bookCover,
    storyText: 'Acompaña a Kai y Lia en una travesía épica a través del tiempo para desvelar el secreto más poderoso de la civilización humana: ¿qué es realmente el dinero y cómo ha evolucionado desde el antiguo mercado del trueque hasta la frontera cuántica de los bits?',
    takeaways: [
      'El dinero no es un objeto material: es una tecnología de confianza y coordinación social.',
      'Aprender cómo surgió el dinero te da superpoderes para dominar el ahorro y la inversión moderna.',
      'Kai y Lia son los crononautas que descubren las leyes eternas del valor.'
    ],
    comicArtDescription: 'Kai con su visor cian brillante y reloj cuántico junto a Lia con su coleta estelar, parados entre las columnas de piedra de un mercado antiguo y la cuadrícula de neón del ciberespacio, bajo una gran moneda dorada con el feroz león de Lidia.',
    quote: '«El Viaje del Valor: De la Sal al Bit — By ircar rojas»'
  },
  {
    pageNumber: 2,
    title: 'Página 1: El Mercado del Trueque & La Doble Coincidencia',
    eraBadge: 'Era 1: El Trueque Antiguo',
    characters: 'Kai, Lia, la cabra inquieta marrón y el mercader de grano',
    icon: '🐐',
    image: GAME_IMAGES.eras.trueque,
    storyText: 'En el bullicio de un mercado de hace miles de años, Kai y Lia se enfrentan a un problema logístico agotador. Kai tira de la cuerda de una cabra inquieta, mientras Lia carga con cestas vacías, buscando desesperadamente a alguien que necesite leche a cambio de los sacos de trigo que tanto les hacen falta. Pero el mercader de grano ya tiene tres cabras y solo busca herramientas de cobre. Es la "doble coincidencia de necesidades": el trueque es un rompecabezas donde las piezas casi nunca encajan, y el tiempo se escapa entre regateos sin éxito.',
    takeaways: [
      'Doble Coincidencia: Para que haya trueque, debes encontrar a alguien que tenga lo que quieres Y que además quiera exactamente lo que tú ofreces.',
      'Fricción e Ineficiencia: La sociedad no podía especializarse ni progresar cuando se pasaban días enteros buscando con quién cambiar una cabra.',
      'Los animales se cansan, comen forraje y no pueden partirse por la mitad sin morir.'
    ],
    comicArtDescription: 'Un mercado vibrante lleno de vasijas de barro, Kai sudando mientras jala una cabrita marrón terca, Lia con cestas vacías mirando con frustración al mercader de grano que rechaza su oferta con los brazos cruzados.',
    quote: '«El trueque es un rompecabezas donde las piezas casi nunca encajan, y el tiempo se escapa entre regateos sin éxito.»'
  },
  {
    pageNumber: 3,
    title: 'Página 2: Las Conchas de Cauri & El Primer Salario',
    eraBadge: 'Era 2: El Dinero Mercancía',
    characters: 'Lia con conchas de cauri brillantes y Kai con saquito de sal',
    icon: '🧂',
    image: GAME_IMAGES.eras.salCauri,
    storyText: 'El mundo cambia cuando Kai y Lia descubren que no necesitan cargar con animales para comerciar. Aprenden que ciertos objetos tienen un "valor mágico" porque todos los aceptan. Lia sostiene un puñado de brillantes conchas de cauri, pequeñas y ligeras como tesoros, mientras Kai guarda con celo un saquito de sal pura. La sal no solo da sabor, sino que es el primer "salario". Ahora, el valor de una cabra cabe en la palma de su mano; el dinero se ha vuelto portátil, duradero y, sobre todo, divisible.',
    takeaways: [
      'Portabilidad: El valor de una pesada cabra ahora pesa gramos en la palma de la mano.',
      'Durabilidad: La sal y las conchas no mueren, no se pudren ni se enferman con el tiempo.',
      'Divisibilidad: Puedes fraccionar la sal en puñados exactos para pagar compras pequeñas y salarios.'
    ],
    comicArtDescription: 'Frente a una hermosa costa azul con montículos blancos de sal cristalina, Kai guarda un saquito de cuero con sal pura y Lia sonríe maravillada con un puñado de conchas marinas de cauri brillantes.',
    quote: '«Ahora, el valor de una cabra cabe en la palma de su mano; el dinero se ha vuelto portátil, duradero y, sobre todo, divisible.»'
  },
  {
    pageNumber: 4,
    title: 'Página 3: La Forja de Lidia & El Sello del León',
    eraBadge: 'Era 3: La Moneda Acuñada',
    characters: 'El artesano Dario (45 años, herrero de Lidia) y Kai',
    icon: '🦁',
    image: GAME_IMAGES.eras.forjaLidia,
    storyText: 'Los siglos pasan y el ingenio humano busca más precisión. En el reino de Lidia, Kai observa con asombro cómo un artesano llamado Dario golpea un trozo de electro —una mezcla natural de oro y plata—. Con un golpe seco de martillo, Dario estampa el sello de un león sobre el metal, garantizando su peso y pureza. Ya no hace falta pesar el metal en cada trato; la confianza ahora tiene la forma de un disco reluciente. Las monedas nacen para que el comercio pueda cruzar fronteras y navegar por mares lejanos.',
    takeaways: [
      'Estandarización: El sello real garantiza el peso y pureza exactos del oro/plata.',
      'Eliminación de Balanzas: Ya no necesitas llevar una balanza a cada tienda; basta con contar las monedas.',
      'Comercio Global: Las monedas de electro permitieron a las civilizaciones comerciar a través del mar.'
    ],
    comicArtDescription: 'En la fragua de piedra ardiente (Lydian Mint), Dario el fornido artesano levanta su martillo sobre el yunque de acero mientras Kai con su visor futurista observa chispas de oro y plata saltando al acuñar el león.',
    quote: '«Ya no hace falta pesar el metal en cada trato; la confianza ahora tiene la forma de un disco reluciente.»'
  },
  {
    pageNumber: 5,
    title: 'Página 4: La Red Invisible & Del Papel al Bit',
    eraBadge: 'Era 4: El Ciberespacio & Blockchain',
    characters: 'Kai y Lia en el ciberespacio con pantallas flotantes de datos',
    icon: '⚡',
    image: GAME_IMAGES.eras.bitBlockchain,
    storyText: 'En el presente, Kai y Lia ya no tocan el dinero, pero su poder es más global que nunca. Sentados en un entorno de luces de neón y flujos de datos, observan sus pantallas donde los números bailan en tiempo real. El dinero se ha transformado en código, en impulsos eléctricos y en redes de blockchain. Ya no es sal, ni oro, ni papel; es pura información y confianza compartida en una red invisible que conecta el mundo entero. El viaje del valor ha llegado a la frontera digital, donde el límite es la imaginación.',
    takeaways: [
      'Pura Información: El dinero no necesita ser un objeto físico; es un libro de cuentas inmutable.',
      'Velocidad de la Luz: Las transferencias cruzan el planeta en milisegundos gracias a la fibra óptica y el blockchain.',
      'Confianza Criptográfica: Las matemáticas garantizan que nadie pueda falsificar ni gastar dos veces un mismo bit.'
    ],
    comicArtDescription: 'Kai y Lia sentados espalda con espalda en un mundo cibernético de rejillas holográficas púrpuras y cian, con pantallas de trading de cotización en tiempo real y monedas de datos flotando a su alrededor.',
    quote: '«Ya no es sal, ni oro, ni papel; es pura información y confianza compartida en una red invisible que conecta el mundo entero.»'
  }
];

export const BibliotecaFlotanteModal: React.FC = () => {
  const { activeModal, closeModal, unlockEraWisdom } = useGameStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (activeModal !== 'biblioteca') return null;

  const page = BOOK_PAGES[currentPageIndex];

  const handleNext = () => {
    if (currentPageIndex < BOOK_PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <div id="modal-biblioteca-flotante" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(0,242,254,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-biblioteca"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.3)] shrink-0 bg-slate-950">
              <img
                src={page.image}
                alt={page.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  LIBRO ILUSTRADO DIGITAL
                </span>
                <span className="text-xs font-mono text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                  Página {page.pageNumber} de {BOOK_PAGES.length}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                El Viaje del Valor: De la Sal al Bit
              </h2>
              <span className="text-xs text-slate-400">Por ircar rojas</span>
            </div>
          </div>

          {/* PAGE NAVIGATION THUMBNAILS */}
          <div className="hidden sm:flex items-center gap-1.5">
            {BOOK_PAGES.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPageIndex(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center overflow-hidden border ${
                  currentPageIndex === idx
                    ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                }`}
                title={p.title}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* MAIN PAGE VIEW */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4">
          {/* BADGE & TITLE */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              {page.eraBadge}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Protagonistas: <strong className="text-slate-200">{page.characters}</strong>
            </span>
          </div>

          {/* TEXT CONTENT & ARTWORK SPLIT */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* 3D Stylized Chapter Illustration Container */}
              <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shrink-0 bg-slate-900 relative group">
                <img
                  src={page.image}
                  alt={page.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-center font-bold text-cyan-300 bg-slate-950/80 py-1 rounded-lg border border-slate-700/50 backdrop-blur-md">
                  Arte 3D Estilizado
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white">{page.title}</h3>
                <p className="text-xs md:text-sm text-slate-200 mt-2 leading-relaxed whitespace-pre-line">
                  {page.storyText}
                </p>
              </div>
            </div>

            {/* QUOTE HIGHLIGHT */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-cyan-950/40 to-slate-900 border-l-4 border-cyan-400 text-xs md:text-sm italic text-cyan-200">
              {page.quote}
            </div>

            {/* ART DESCRIPTION */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-yellow-400">Escena Ilustrada en el Cómic:</strong> {page.comicArtDescription}
              </div>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Lecciones Clave para la Vida y las Finanzas:
              </h4>
              <div className="space-y-1.5">
                {page.takeaways.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PAGINATION CONTROLS */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentPageIndex === 0
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentPageIndex + 1} / {BOOK_PAGES.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === BOOK_PAGES.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentPageIndex === BOOK_PAGES.length - 1
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg'
            }`}
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
