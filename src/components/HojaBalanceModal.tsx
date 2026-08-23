import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  Scale, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  HelpCircle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const HojaBalanceModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    balanceItems, 
    placeBalanceItem, 
    verifyBalanceSheet,
    quests
  } = useGameStore();

  if (activeModal !== 'vivero') return null;

  const balanceSheetSolved = quests.find(q => q.id === 'quest_7_balance_sheet')?.completed || false;

  // Calculate Subtotals
  const unplacedItems = balanceItems.filter(i => i.placedInSlot === null);

  const getSlotTotal = (slotName: string) => {
    return balanceItems
      .filter(i => i.placedInSlot === slotName)
      .reduce((sum, i) => sum + i.amount, 0);
  };

  const totalActivosCirculantes = getSlotTotal('activos_circulantes');
  const totalActivosFijos = getSlotTotal('activos_fijos');
  const totalActivos = totalActivosCirculantes + totalActivosFijos;

  const totalPasivosCorto = getSlotTotal('pasivos_corto');
  const totalPasivosLargo = getSlotTotal('pasivos_largo');
  const totalPasivos = totalPasivosCorto + totalPasivosLargo;

  const totalPatrimonio = getSlotTotal('capital_social');
  const totalPasivoMasPatrimonio = totalPasivos + totalPatrimonio;

  const isBalanced = totalActivos > 0 && totalActivos === totalPasivoMasPatrimonio;

  const handleValidate = () => {
    const success = verifyBalanceSheet();
    if (success) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div id="modal-hoja-balance" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(0,255,170,0.2)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-balance"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with 3D Mentor Avatar */}
        <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-[0_0_15px_rgba(0,255,170,0.3)] shrink-0 bg-slate-950 group">
            <img
              src={GAME_IMAGES.mentors}
              alt="Academia Contable Kai y Lia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                CAPÍTULO 3: EL VIVERO DE IDEAS & ACADEMIA CONTABLE
              </span>
              {balanceSheetSolved && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Armonía Cósmica Resuelta
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">La Hoja de Balance 3D de Cifra</h2>
            <p className="text-xs text-slate-300">
              Arrastra y coloca cada bloque numérico en su columna exacta para equilibrar la Ecuación Contable Universal: <strong className="text-emerald-300">ACTIVO = PASIVO + PATRIMONIO</strong>.
            </p>
          </div>
        </div>

        {/* EQUATION GAUGE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 items-center">
          <div className="text-center p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
            <div className="text-xs font-bold text-cyan-400 uppercase">Total Activos (Lo que Tienes)</div>
            <div className="text-2xl font-black text-cyan-300 font-mono mt-0.5">${totalActivos}</div>
            <div className="text-[10px] text-slate-400">Circulantes (${totalActivosCirculantes}) + Fijos (${totalActivosFijos})</div>
          </div>

          <div className="text-center flex flex-col items-center justify-center">
            <Scale className={`w-8 h-8 transition-colors ${isBalanced ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <div className="text-xs font-bold mt-1 text-slate-300">
              {isBalanced ? '✨ BALANZA EQUILIBRADA ✨' : '⚠️ Desequilibrio en Balanza'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Diferencia: ${Math.abs(totalActivos - totalPasivoMasPatrimonio)}
            </div>
          </div>

          <div className="text-center p-3 rounded-lg bg-purple-950/40 border border-purple-500/30">
            <div className="text-xs font-bold text-purple-400 uppercase">Pasivos + Patrimonio (Cómo se Financia)</div>
            <div className="text-2xl font-black text-purple-300 font-mono mt-0.5">${totalPasivoMasPatrimonio}</div>
            <div className="text-[10px] text-slate-400">Pasivos (${totalPasivos}) + Patrimonio (${totalPatrimonio})</div>
          </div>
        </div>

        {/* MAIN PUZZLE WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto flex-1 pr-1">
          {/* 1. ACTIVOS SLOTS */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/40 space-y-4">
            <div className="text-xs font-bold text-cyan-300 uppercase flex items-center justify-between">
              <span>🔵 Columna de ACTIVOS</span>
              <span className="font-mono">${totalActivos}</span>
            </div>

            {/* Slot: Activos Circulantes */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center justify-between">
                <span>Activos Circulantes (Líquidos & Corto Plazo)</span>
                <span className="font-mono text-slate-400">${totalActivosCirculantes}</span>
              </div>
              <div className="space-y-1.5 min-h-[60px]">
                {balanceItems.filter(i => i.placedInSlot === 'activos_circulantes').map(item => (
                  <div key={item.id} className="p-2 rounded bg-cyan-950/70 border border-cyan-500/40 text-xs flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-300">${item.amount}</span>
                      <button 
                        onClick={() => placeBalanceItem(item.id, null)}
                        className="text-slate-400 hover:text-white text-[10px] px-1 bg-slate-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot: Activos Fijos */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center justify-between">
                <span>Activos Fijos & Inversiones a Largo Plazo</span>
                <span className="font-mono text-slate-400">${totalActivosFijos}</span>
              </div>
              <div className="space-y-1.5 min-h-[60px]">
                {balanceItems.filter(i => i.placedInSlot === 'activos_fijos').map(item => (
                  <div key={item.id} className="p-2 rounded bg-cyan-950/70 border border-cyan-500/40 text-xs flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-300">${item.amount}</span>
                      <button 
                        onClick={() => placeBalanceItem(item.id, null)}
                        className="text-slate-400 hover:text-white text-[10px] px-1 bg-slate-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. PASIVOS & PATRIMONIO SLOTS */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-fuchsia-500/40 space-y-4">
            <div className="text-xs font-bold text-fuchsia-300 uppercase flex items-center justify-between">
              <span>🔴 PASIVOS & PATRIMONIO</span>
              <span className="font-mono">${totalPasivoMasPatrimonio}</span>
            </div>

            {/* Slot: Pasivos a Corto Plazo */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-rose-400 mb-1.5 flex items-center justify-between">
                <span>Pasivos Corto Plazo (Deudas &lt; 1 año)</span>
                <span className="font-mono text-slate-400">${totalPasivosCorto}</span>
              </div>
              <div className="space-y-1.5 min-h-[50px]">
                {balanceItems.filter(i => i.placedInSlot === 'pasivos_corto').map(item => (
                  <div key={item.id} className="p-2 rounded bg-rose-950/70 border border-rose-500/40 text-xs flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-rose-300">${item.amount}</span>
                      <button 
                        onClick={() => placeBalanceItem(item.id, null)}
                        className="text-slate-400 hover:text-white text-[10px] px-1 bg-slate-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot: Pasivos a Largo Plazo */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-rose-400 mb-1.5 flex items-center justify-between">
                <span>Pasivos Largo Plazo (Maquinaria/Hipotecario)</span>
                <span className="font-mono text-slate-400">${totalPasivosLargo}</span>
              </div>
              <div className="space-y-1.5 min-h-[50px]">
                {balanceItems.filter(i => i.placedInSlot === 'pasivos_largo').map(item => (
                  <div key={item.id} className="p-2 rounded bg-rose-950/70 border border-rose-500/40 text-xs flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-rose-300">${item.amount}</span>
                      <button 
                        onClick={() => placeBalanceItem(item.id, null)}
                        className="text-slate-400 hover:text-white text-[10px] px-1 bg-slate-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot: Capital Social / Patrimonio */}
            <div className="p-3 rounded-lg bg-slate-900 border border-purple-500/40">
              <div className="text-[11px] font-bold text-purple-400 mb-1.5 flex items-center justify-between">
                <span>Patrimonio Neto (Capital de Cifra)</span>
                <span className="font-mono text-slate-400">${totalPatrimonio}</span>
              </div>
              <div className="space-y-1.5 min-h-[50px]">
                {balanceItems.filter(i => i.placedInSlot === 'capital_social').map(item => (
                  <div key={item.id} className="p-2 rounded bg-purple-950/70 border border-purple-500/40 text-xs flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-purple-300">${item.amount}</span>
                      <button 
                        onClick={() => placeBalanceItem(item.id, null)}
                        className="text-slate-400 hover:text-white text-[10px] px-1 bg-slate-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. FLOATING DISORGANIZED BLOCKS (CLICK TO ASSIGN) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Bloques por Clasificar
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Selecciona dónde colocar cada elemento contable en las casillas correspondientes:
              </p>

              <div className="space-y-2.5">
                {unplacedItems.map(item => (
                  <div key={item.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white">{item.label}</span>
                      <span className="font-mono font-black text-amber-300">${item.amount}</span>
                    </div>

                    {/* Quick Placement Buttons */}
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <button
                        onClick={() => placeBalanceItem(item.id, 'activos_circulantes')}
                        className="py-1 px-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50"
                      >
                        + Activo Circulante
                      </button>
                      <button
                        onClick={() => placeBalanceItem(item.id, 'activos_fijos')}
                        className="py-1 px-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50"
                      >
                        + Activo Fijo
                      </button>
                      <button
                        onClick={() => placeBalanceItem(item.id, 'pasivos_corto')}
                        className="py-1 px-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700/50"
                      >
                        + Pasivo Corto
                      </button>
                      <button
                        onClick={() => placeBalanceItem(item.id, 'pasivos_largo')}
                        className="py-1 px-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700/50"
                      >
                        + Pasivo Largo
                      </button>
                      <button
                        onClick={() => placeBalanceItem(item.id, 'capital_social')}
                        className="col-span-2 py-1 px-1.5 rounded bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700/50"
                      >
                        + Patrimonio / Capital
                      </button>
                    </div>
                  </div>
                ))}

                {unplacedItems.length === 0 && (
                  <div className="p-4 text-center text-xs text-emerald-400 bg-emerald-950/40 rounded-lg border border-emerald-500/40">
                    ¡Todos los bloques han sido asignados! Haz clic abajo para validar la armonía contable.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                id="btn-validate-balance-sheet"
                onClick={handleValidate}
                className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,170,0.4)]"
              >
                <CheckCircle2 className="w-4 h-4" />
                Validar Ecuación Contable Universal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
