import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  Repeat, 
  Hammer, 
  ShoppingBag,
  Layers
} from 'lucide-react';

export const MercadoTruequeModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    goatsCount, 
    wheatSacks, 
    copperToolsCount, 
    cash, 
    solveBarterPuzzle, 
    craftProduct,
    openModal 
  } = useGameStore();

  const [dialogueStep, setDialogueStep] = useState(0);
  const [tradeOffer, setTradeOffer] = useState<'cabra' | 'leche' | 'cobre' | null>(null);

  if (activeModal !== 'mercado_trueque' && activeModal !== 'carpinteria') return null;

  const handleBarterAttempt = () => {
    if (tradeOffer === 'cobre') {
      solveBarterPuzzle();
      setDialogueStep(2);
    } else if (tradeOffer === 'cabra') {
      setDialogueStep(1); // Merchant refuses because he already has 3 goats!
    } else if (tradeOffer === 'leche') {
      setDialogueStep(3); // Merchant only wants copper tools!
    }
  };

  return (
    <div id="modal-mercado-trueque" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-amber-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          id="btn-close-mercado-trueque"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0 bg-slate-950">
            <img
              src={GAME_IMAGES.eras.trueque}
              alt="Era del Trueque 3D"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-950 text-amber-400 border border-amber-500/40">
                ERA 1: EL MERCADO ANCESTRAL
              </span>
              <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                La Doble Coincidencia de Necesidades
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">El Dilema de la Cabra Inquieta & El Trigo</h2>
            <p className="text-xs text-slate-300">
              Kai y Lia intentan conseguir trigo para sobrevivir, pero el mercader no acepta la cabra. ¡Descubre por qué el trueque falla!
            </p>
          </div>
        </div>

        {/* COMIC STORY PANEL */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 text-xs text-amber-100 mb-4 flex flex-col md:flex-row items-center gap-3.5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/50 shadow-md shrink-0 group relative">
            <img
              src={GAME_IMAGES.eras.trueque}
              alt="Mercado de Trueque"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/80 px-1 rounded text-amber-400">3D Art</span>
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              Fragmento del Libro "El Viaje del Valor: De la Sal al Bit" (ircar rojas):
            </div>
            <p className="italic text-slate-200 leading-relaxed text-[11px] md:text-xs">
              «Kai tira de la cuerda de una cabra inquieta, mientras Lia carga con cestas vacías, buscando desesperadamente a alguien que necesite leche a cambio de los sacos de trigo que tanto les hacen falta. Pero el mercader de grano ya tiene tres cabras y solo busca herramientas de cobre. Es la "doble coincidencia de necesidades": el trueque es un rompecabezas donde las piezas casi nunca encajan.»
            </p>
          </div>
        </div>

        {/* INTERACTIVE BARTER PUZZLE & WORKSHOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
          {/* LEFT: THE BARTER DILEMMA SIMULATOR */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-amber-400" />
                  Puesto del Mercader de Grano
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Tiene: Sacos de Trigo
                </span>
              </div>

              {/* Character Dialogue Box */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 mb-4">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-base shrink-0 border border-amber-500/50">
                    👳
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400">Mercader de Grano dice:</span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {dialogueStep === 0 && '«¡Hola jóvenes! Tengo trigo de primera, pero ya tengo 3 cabras en mi corral. ¡Solo cambiaré mi trigo si me traen herramientas de cobre para arar mis tierras!»'}
                      {dialogueStep === 1 && '«¡No gracias! Tu cabra es bonita pero no me sirve. Ya tengo 3 cabras y no tengo más pasto. ¡Tráeme herramientas de cobre!»'}
                      {dialogueStep === 2 && '«¡Por todos los dioses! ¡Una herramienta de cobre forjada! Trato hecho: tomen 3 sacos de trigo dorado. ¡Gracias Kai y Lia!»'}
                      {dialogueStep === 3 && '«La leche se daña en dos días y no la necesito hoy. ¡Busco metal duradero y herramientas de cobre!»'}
                    </p>
                  </div>
                </div>
              </div>

              {/* What do you want to offer? */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-bold text-slate-400 block">¿Qué deseas ofrecerle en trueque?</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTradeOffer('cabra')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      tradeOffer === 'cabra'
                        ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">🐐</div>
                    <div className="text-[11px] font-bold">Cabra Viva</div>
                    <div className="text-[9px] text-slate-400">({goatsCount} disp.)</div>
                  </button>

                  <button
                    onClick={() => setTradeOffer('leche')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      tradeOffer === 'leche'
                        ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">🥛</div>
                    <div className="text-[11px] font-bold">Cesta de Leche</div>
                    <div className="text-[9px] text-slate-400">Perecedero</div>
                  </button>

                  <button
                    onClick={() => setTradeOffer('cobre')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      tradeOffer === 'cobre'
                        ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">🪓</div>
                    <div className="text-[11px] font-bold">Herramienta Cobre</div>
                    <div className="text-[9px] text-cyan-400">({copperToolsCount} disp.)</div>
                  </button>
                </div>
              </div>
            </div>

            <button
              id="btn-propose-trade"
              disabled={!tradeOffer || (tradeOffer === 'cobre' && copperToolsCount === 0)}
              onClick={handleBarterAttempt}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                !tradeOffer || (tradeOffer === 'cobre' && copperToolsCount === 0)
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
              }`}
            >
              <Repeat className="w-4 h-4" />
              Proponer Intercambio de Trueque
            </button>
          </div>

          {/* RIGHT: TALLER DE COBRE & ARTESANÍA */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-cyan-400" />
                  Taller Metalúrgico de Cobre
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Costo: $25 de insumos
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                Si nadie quiere tu cabra directamente, debes fabricar el bien intermedio que el mercado demanda para poder comerciar.
              </p>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Tus Herramientas de Cobre:</span>
                  <span className="text-base font-black text-cyan-400">{copperToolsCount} unidades</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Trigo acumulado de Lia:</span>
                  <span className="text-base font-black text-amber-400">{wheatSacks} sacos</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300 mb-4">
                💡 <strong>Lección Económica:</strong> Cuando los bienes no son divisibles ni universalmente deseados, el trueque colapsa. Por eso la humanidad buscó un estándar de valor portátil: la sal y las conchas.
              </div>
            </div>

            <button
              id="btn-craft-copper"
              onClick={() => craftProduct('cobre_tool')}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Hammer className="w-4 h-4" />
              Forjar Herramienta de Cobre ($25)
            </button>
          </div>
        </div>

        {/* BOTTOM SHORTCUT */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Inventario: <span className="text-white font-bold">{goatsCount} Cabra(s)</span> | <span className="text-amber-400 font-bold">{wheatSacks} Sacos de Trigo</span>
          </div>

          <button
            onClick={() => { closeModal(); openModal('acertijos'); }}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            Ver Acertijos de esta Era <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
