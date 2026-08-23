import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Scale, 
  Plus, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const AlmacenSalCauriModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    saltSacksCount, 
    cowrieShellsCount, 
    cash, 
    processSaltAndCowrie, 
    openModal 
  } = useGameStore();

  const [saltRations, setSaltRations] = useState(1);

  if (activeModal !== 'almacen_sal' && activeModal !== 'vivero') return null;

  return (
    <div id="modal-almacen-sal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-almacen-sal"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.4)] shrink-0 bg-slate-950">
            <img
              src={GAME_IMAGES.eras.salCauri}
              alt="Era de la Sal y el Cauri 3D"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                ERA 2: LA COSTA DE CAURI & EL ALMACÉN DE SAL
              </span>
              <span className="text-xs font-mono text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                El Primer "Salario" & Valor Portátil
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">El Valor de una Cabra en la Palma de tu Mano</h2>
            <p className="text-xs text-slate-300">
              Kai y Lia descubren que no necesitan cargar animales pesados: la sal y las conchas de cauri son portátiles, duraderas y divisibles.
            </p>
          </div>
        </div>

        {/* COMIC STORY PANEL */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 text-xs text-cyan-100 mb-4 flex flex-col md:flex-row items-center gap-3.5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-cyan-400/50 shadow-md shrink-0 group relative">
            <img
              src={GAME_IMAGES.eras.salCauri}
              alt="Sal y Cauri"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/80 px-1 rounded text-cyan-400">3D Art</span>
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              Fragmento del Libro "El Viaje del Valor: De la Sal al Bit" (ircar rojas):
            </div>
            <p className="italic text-slate-200 leading-relaxed text-[11px] md:text-xs">
              «El mundo cambia cuando Kai y Lia descubren que no necesitan cargar con animales para comerciar. Aprenden que ciertos objetos tienen un "valor mágico" porque todos los aceptan. Lia sostiene un puñado de brillantes conchas de cauri, pequeñas y ligeras como tesoros, mientras Kai guarda con celo un saquito de sal pura. La sal no solo da sabor, sino que es el primer "salario". Ahora, el valor de una cabra cabe en la palma de su mano; el dinero se ha vuelto portátil, duradero y, sobre todo, divisible.»
            </p>
          </div>
        </div>

        {/* INTERACTIVE SALT SCALE & COWRIE MEASUREMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
          {/* LEFT: BALANZA DE SAL & SALARIOS */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Balanza de Raciones de Sal Pura
                </h3>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {saltSacksCount} Saquitos en Bóveda
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                La sal pura es divisible: puedes fraccionarla en saquitos exactos para pagar días de trabajo o comprar víveres sin partir una cabra viva.
              </p>

              {/* Equivalence Visual Card */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800 mb-4 text-center">
                <div className="p-2 rounded bg-slate-950/60">
                  <div className="text-2xl mb-1">🐐</div>
                  <div className="text-[10px] text-slate-400">1 Cabra Viva (Pesada)</div>
                  <div className="text-xs font-bold text-amber-400">= 10 Saquitos de Sal</div>
                </div>
                <div className="p-2 rounded bg-slate-950/60">
                  <div className="text-2xl mb-1">🧂</div>
                  <div className="text-[10px] text-slate-400">1 Saquito de Sal (Portátil)</div>
                  <div className="text-xs font-bold text-cyan-400">= 1 Jornada Laboral ("Salario")</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300 mb-4">
                ✨ <strong>Propiedades Mágicas del Dinero:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                  <li><strong>Portabilidad:</strong> Llévalo en el bolsillo o en la palma de la mano.</li>
                  <li><strong>Durabilidad:</strong> La sal y el cauri no mueren ni se pudren.</li>
                  <li><strong>Divisibilidad:</strong> Puedes dar medio puñado sin destruir el bien.</li>
                </ul>
              </div>
            </div>

            <button
              id="btn-process-salt"
              onClick={processSaltAndCowrie}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Scale className="w-4 h-4" />
              Medir y Empaquetar Sal Pura (+1 Saquito & +4 Conchas Cauri)
            </button>
          </div>

          {/* RIGHT: COSTA DE CONCHAS DE CAURI */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Tesoros de Cauri de Lia
                </h3>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {cowrieShellsCount} Conchas de Cauri
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                Las conchas de cauri brillan como pequeñas joyas. Son tan difíciles de falsificar y tan livianas que los mercaderes las aceptan en todos los puertos.
              </p>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Aceptación Universal:</span>
                  <span className="text-emerald-400 font-bold">100% en rutas costeras</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Peso Total en Bolsillo:</span>
                  <span className="text-cyan-300 font-bold">&lt; 150 gramos</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Reserva de Valor Acumulada:</span>
                  <span className="text-amber-300 font-bold">${cowrieShellsCount * 12 + saltSacksCount * 30} en activos</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                💡 <strong>Dato Curioso del Libro:</strong> La palabra <em>salario</em> proviene del latín <em>salarium</em>, porque a los soldados y trabajadores de la antigüedad se les pagaba con raciones de sal pura.
              </div>
            </div>

            <button
              onClick={() => { closeModal(); openModal('bancos'); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Depositar Tesoros en la Bóveda Bancaria
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Portabilidad: <span className="text-cyan-400 font-bold">{saltSacksCount} Saquitos de Sal</span> | <span className="text-amber-400 font-bold">{cowrieShellsCount} Conchas de Cauri</span>
          </div>

          <button
            onClick={() => { closeModal(); openModal('forja_lidia'); }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            Avanzar a la Era 3: La Forja de Lidia <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
