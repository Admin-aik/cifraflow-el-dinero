import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { Hammer, ShoppingBag, X, ArrowRight, Sparkles, Check, DollarSign } from 'lucide-react';

export const CarpinteriaModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    tangibles, 
    craftProduct, 
    sellProduct, 
    cash, 
    openModal 
  } = useGameStore();

  if (activeModal !== 'carpinteria') return null;

  return (
    <div id="modal-carpinteria" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-carpinteria"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with 3D Image */}
        <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.35)] shrink-0 bg-slate-950 group">
            <img
              src={GAME_IMAGES.buildings.carpinteria}
              alt="Carpintería de Mateo 3D"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/40">
                ETAPA 1: EMPRENDIMIENTO & VALOR TANGIBLE
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">Taller de Carpintería Financiera de Mateo</h2>
            <p className="text-xs text-slate-300">
              Transforma materias primas en bienes de alto valor agregado con engranajes, madera y diseño. Obtén tu capital de trabajo inicial.
            </p>
          </div>
        </div>

        {/* Educational Note */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 mb-6 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>Lección de Producción:</strong> El valor no se crea mágicamente; surge al combinar insumos, trabajo y diseño. La diferencia entre el costo de materiales y el precio de venta en el mercado es tu <span className="text-cyan-300 font-bold">Margen de Ganancia Bruta</span>.
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
          {tangibles.map((prod) => {
            const margin = prod.marketValue - prod.costToMake;
            const marginPct = Math.round((margin / prod.costToMake) * 100);

            return (
              <div 
                key={prod.id} 
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{prod.icon}</span>
                      <div>
                        <h3 className="font-bold text-sm text-white">{prod.name}</h3>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {prod.type}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-400">Inventario</div>
                      <div className="text-lg font-black text-cyan-400">{prod.craftedCount} u.</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">{prod.description}</p>

                  {/* Cost vs Market Value breakdown */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center mb-4">
                    <div>
                      <div className="text-[10px] text-slate-400">Costo Materia</div>
                      <div className="text-xs font-bold text-rose-400">${prod.costToMake}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Precio Mercado</div>
                      <div className="text-xs font-bold text-emerald-400">${prod.marketValue}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Margen Bruto</div>
                      <div className="text-xs font-bold text-cyan-300">+{marginPct}%</div>
                    </div>
                  </div>
                </div>

                {/* Actions: Craft or Sell */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => craftProduct(prod.id)}
                    disabled={cash < prod.costToMake}
                    className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    <Hammer className="w-3.5 h-3.5" />
                    Fabricar (${prod.costToMake})
                  </button>

                  <button
                    onClick={() => sellProduct(prod.id)}
                    disabled={prod.craftedCount < 1}
                    className="py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Vender (+${prod.marketValue})
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Route Navigation Suggestion */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Siguiente paso: Deposita las ganancias en el <strong className="text-white">Banco de Venezuela</strong> o invierte en la <strong className="text-white">BVC</strong>.
          </div>
          <button
            onClick={() => {
              closeModal();
              openModal('bancos');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-all"
          >
            Ir al Distrito Bancario <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
