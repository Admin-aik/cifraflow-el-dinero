import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ARCHETYPES } from '../data/archetypes';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Award, 
  Eye, 
  EyeOff, 
  Sparkles, 
  BookOpen, 
  ChevronUp, 
  ChevronDown, 
  Compass, 
  Scale, 
  Hammer, 
  Cpu, 
  ShieldAlert,
  User 
} from 'lucide-react';

export const EstadoFinanciero: React.FC = () => {
  const {
    cash,
    prestigePoints,
    currentEra,
    stage,
    flowVisionActive,
    toggleFlowVision,
    goatsCount,
    wheatSacks,
    copperToolsCount,
    saltSacksCount,
    cowrieShellsCount,
    electrumCoinsCount,
    digitalBitsCount,
    monthlyPassiveIncome,
    monthlyExpenses,
    openModal,
    banks,
    stocks,
    archetypeId
  } = useGameStore();

  const [expanded, setExpanded] = useState(false);
  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  // Stock Dividends
  const stockDividends = stocks.reduce((sum, s) => {
    return sum + ((s.sharesOwned * s.price * (s.dividendYield / 100)) / 12);
  }, 0);

  // Bank Interest
  const bankInterest = banks.filter(b => b.opened && b.balance > 0).reduce((sum, b) => {
    return sum + ((b.balance * (b.interestRateAnnual / 100)) / 12);
  }, 0);

  const totalInflow = monthlyPassiveIncome + stockDividends + bankInterest;
  const netCashflow = totalInflow - monthlyExpenses;

  return (
    <div id="panel-estado-financiero" className="w-full max-w-7xl mx-auto px-4 py-2 select-none">
      {/* MAIN GLASS HUD BAR */}
      <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 p-3 md:p-4 shadow-2xl overflow-hidden">
        {/* Neon Glow Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-fuchsia-500" />

        {/* TOP ROW: ERA TIMELINE PROGRESS & STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 items-center">
          {/* 0. ARQUETIPO DEL JUGADOR */}
          <div 
            onClick={() => openModal('arquetipos')}
            className="p-1.5 rounded-xl bg-slate-950/70 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all cursor-pointer flex items-center gap-2 group"
            title="Ver / Cambiar Arquetipo de Jugador"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400 shrink-0 bg-slate-900">
              <img
                src={activeArchetype.image}
                alt={activeArchetype.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-cyan-400 font-bold leading-tight group-hover:text-cyan-300">
                {activeArchetype.name.split(' ')[0]}
              </div>
              <div className="text-[9px] text-slate-400 truncate leading-tight">
                {activeArchetype.role.split('&')[0]}
              </div>
            </div>
          </div>

          {/* 1. ERA & ETAPA ACTUAL */}
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Era del Dinero
            </div>
            <div className="text-sm font-black text-white mt-0.5 truncate">
              {currentEra === 'era_trueque' && '🐐 Era 1: Trueque'}
              {currentEra === 'era_sal_cauri' && '🧂 Era 2: Sal & Cauri'}
              {currentEra === 'era_forja_lidia' && '🦁 Era 3: Forja Lidia'}
              {currentEra === 'era_bit_digital' && '⚡ Era 4: Bit Digital'}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {stage}
            </div>
          </div>

          {/* 2. LIQUIDEZ / EFECTIVO */}
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Liquidez Operativa
            </div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">
              ${cash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Flujo: +${netCashflow.toFixed(1)}/s
            </div>
          </div>

          {/* 3. INVENTARIO DEL VIAJERO */}
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 col-span-2 sm:col-span-1 lg:col-span-2">
            <div className="text-[10px] text-cyan-400 font-bold flex items-center justify-between">
              <span>Recursos del Valor Acumulados</span>
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
              >
                {expanded ? 'Menos' : 'Detalles'} {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1 overflow-x-auto text-xs font-mono">
              <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30" title="Cabras">
                🐐 {goatsCount}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30" title="Trigo">
                🌾 {wheatSacks}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30" title="Sal Pura">
                🧂 {saltSacksCount}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30" title="Conchas Cauri">
                🐚 {cowrieShellsCount}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-yellow-950/60 text-yellow-300 border border-yellow-500/30" title="Monedas Lidia">
                🦁 {electrumCoinsCount}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-500/30" title="Bits Digitales">
                ⚡ {digitalBitsCount}
              </span>
            </div>
          </div>

          {/* 4. PRESTIGIO DEL SABER */}
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Prestigio del Saber
            </div>
            <div className="text-lg font-black text-amber-300 mt-0.5">
              {prestigePoints} <span className="text-xs font-normal text-amber-500">pts</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Kai & Lia Crononautas
            </div>
          </div>

          {/* 5. FLOW VISION & ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-flow-vision"
              onClick={toggleFlowVision}
              className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                flowVisionActive
                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,243,255,0.6)] animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40'
              }`}
              title="Gafas de Visión de Flujo de Kai: Resalta Activos en Cian y Pasivos en Magenta"
            >
              {flowVisionActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{flowVisionActive ? 'Visión Activa' : 'Visión Flujo'}</span>
            </button>

            <button
              id="btn-open-acertijos-hud"
              onClick={() => openModal('acertijos')}
              className="py-2 px-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md transition-all"
              title="Acertijos & Quests del Libro"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Acertijos</span>
            </button>
          </div>
        </div>

        {/* EXPANDED TIMELINE EXPLORER */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
            <button
              onClick={() => openModal('mercado_trueque')}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-amber-500/40 hover:bg-amber-950/30 text-left transition-all"
            >
              <div className="text-base mb-0.5">🐐 Era 1: Trueque</div>
              <div className="text-[10px] text-slate-300">Cabra, Trigo y Doble Coincidencia</div>
            </button>

            <button
              onClick={() => openModal('almacen_sal')}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/40 hover:bg-cyan-950/30 text-left transition-all"
            >
              <div className="text-base mb-0.5">🧂 Era 2: Sal & Cauri</div>
              <div className="text-[10px] text-slate-300">El Primer Salario y Divisibilidad</div>
            </button>

            <button
              onClick={() => openModal('forja_lidia')}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-yellow-500/40 hover:bg-yellow-950/30 text-left transition-all"
            >
              <div className="text-base mb-0.5">🦁 Era 3: Forja de Lidia</div>
              <div className="text-[10px] text-slate-300">Dario, Electro y Sello del León</div>
            </button>

            <button
              onClick={() => openModal('red_digital')}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-fuchsia-500/40 hover:bg-fuchsia-950/30 text-left transition-all"
            >
              <div className="text-base mb-0.5">⚡ Era 4: Bit Digital</div>
              <div className="text-[10px] text-slate-300">Ciberespacio y Red Blockchain</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
