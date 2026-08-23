import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Hammer, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Flame, 
  Coins 
} from 'lucide-react';

export const ForjaLidiaModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    electrumCoinsCount, 
    cash, 
    strikeLydianCoin, 
    openModal 
  } = useGameStore();

  const [isStriking, setIsStriking] = useState(false);
  const [strikeFeedback, setStrikeFeedback] = useState<string | null>(null);

  if (activeModal !== 'forja_lidia' && activeModal !== 'bolsa') return null;

  const handleStrike = () => {
    setIsStriking(true);
    setStrikeFeedback('¡GOLPE PERFECTO! El león de Lidia ha sido estampado en el electro.');
    strikeLydianCoin();
    setTimeout(() => {
      setIsStriking(false);
    }, 600);
  };

  return (
    <div id="modal-forja-lidia" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-yellow-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(234,179,8,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          id="btn-close-forja-lidia"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0 bg-slate-950">
            <img
              src={GAME_IMAGES.eras.forjaLidia}
              alt="Era de Lidia 3D"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-yellow-950 text-yellow-400 border border-yellow-500/40">
                ERA 3: EL REINO DE LIDIA (LYDIAN MINT)
              </span>
              <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                Nacimiento de la Moneda Acuñada
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">La Forja de Dario & El Sello del León</h2>
            <p className="text-xs text-slate-300">
              Kai observa con asombro cómo el electro (oro + plata) se transforma en monedas con peso y pureza garantizados por el rey.
            </p>
          </div>
        </div>

        {/* COMIC STORY PANEL */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-yellow-950/40 to-slate-900 border border-yellow-500/30 text-xs text-yellow-100 mb-4 flex flex-col md:flex-row items-center gap-3.5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-yellow-400/50 shadow-md shrink-0 group relative">
            <img
              src={GAME_IMAGES.eras.forjaLidia}
              alt="Forja de Lidia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/80 px-1 rounded text-yellow-400">3D Art</span>
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-bold text-yellow-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
              Fragmento del Libro "El Viaje del Valor: De la Sal al Bit" (ircar rojas):
            </div>
            <p className="italic text-slate-200 leading-relaxed text-[11px] md:text-xs">
              «Los siglos pasan y el ingenio humano busca más precisión. En el reino de Lidia, Kai observa con asombro cómo un artesano llamado Dario golpea un trozo de electro —una mezcla natural de oro y plata—. Con un golpe seco de martillo, Dario estampa el sello de un león sobre el metal, garantizando su peso y pureza. Ya no hace falta pesar el metal en cada trato; la confianza ahora tiene la forma de un disco reluciente. Las monedas nacen para que el comercio pueda cruzar fronteras y navegar por mares lejanos.»
            </p>
          </div>
        </div>

        {/* INTERACTIVE FORGE & MINTING SIMULATOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
          {/* LEFT: THE ANVIL & HAMMER STRIKE */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Yunque de Acuñación de Dario
                </h3>
                <span className="text-xs font-mono text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-500/30">
                  {electrumCoinsCount} Monedas Acuñadas
                </span>
              </div>

              {/* COIN VISUALIZER */}
              <div className="my-4 relative flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-yellow-200 border-4 border-yellow-300 shadow-[0_0_35px_rgba(234,179,8,0.5)] flex flex-col items-center justify-center text-slate-950 transition-transform ${isStriking ? 'scale-90 rotate-6' : 'hover:scale-105'}`}>
                  <span className="text-4xl">🦁</span>
                  <span className="text-[9px] font-black tracking-widest uppercase mt-1">LIDIA • ELECTRO</span>
                </div>
                {isStriking && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-6xl animate-ping">💥</span>
                  </div>
                )}
              </div>

              {strikeFeedback && (
                <div className="p-2.5 rounded-lg bg-yellow-950/40 border border-yellow-500/40 text-xs text-yellow-300 mb-3 animate-fade-in font-medium">
                  {strikeFeedback}
                </div>
              )}

              <p className="text-xs text-slate-300 mb-2">
                Presiona el botón para golpear con el martillo de Dario y forjar monedas estandarizadas de electro.
              </p>
            </div>

            <button
              id="btn-strike-coin"
              onClick={handleStrike}
              disabled={isStriking}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95"
            >
              <Hammer className={`w-4 h-4 ${isStriking ? 'animate-bounce' : ''}`} />
              ¡Golpear Yunque & Acuñar Moneda del León! (+1 Moneda & +$120)
            </button>
          </div>

          {/* RIGHT: CONFIDENCE & STANDARDIZATION LESSON */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  La Revolución de la Confianza
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Sin Balanzas
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                    1. ¿Por qué el León?
                  </div>
                  <p className="text-[11px] text-slate-300">
                    El sello real del león actuaba como la firma del estado: garantizaba que cada moneda tenía exactamente la misma cantidad de oro y plata.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                    2. Comercio Sin Fronteras
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Al no tener que pesar ni cortar metales en cada puerto, los barcos y comerciantes pudieron viajar por todo el Mediterráneo comerciando en segundos.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-yellow-950/30 border border-yellow-500/20 text-[11px] text-yellow-200">
                  📈 <strong>El Salto a la Bolsa de Valores:</strong> Gracias a las monedas estándar nacieron los contratos comerciales y las acciones de flotas navieras que hoy cotizan en la Bolsa de Valores.
                </div>
              </div>
            </div>

            <button
              onClick={() => { closeModal(); openModal('bolsa'); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-lg transition-all"
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              Invertir Monedas en la Bolsa de Valores
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Monedas de Electro: <span className="text-yellow-400 font-bold">{electrumCoinsCount} discos acuñados</span>
          </div>

          <button
            onClick={() => { closeModal(); openModal('red_digital'); }}
            className="text-xs text-yellow-400 hover:text-yellow-300 font-bold flex items-center gap-1"
          >
            Avanzar a la Era 4: La Frontera Digital <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
