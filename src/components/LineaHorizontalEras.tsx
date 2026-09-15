import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { MoneyEra } from '../types';
import { soundFx } from '../utils/audio';
import { 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Compass, 
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface EraStep {
  id: MoneyEra;
  number: string;
  name: string;
  icon: string;
  subtitle: string;
  missionTitle: string;
  modalTarget: string;
  color: string;
  borderColor: string;
  bgActive: string;
}

const ERAS_LIST: EraStep[] = [
  {
    id: 'era_trueque',
    number: 'ERA 01',
    name: 'El Mercado del Trueque',
    icon: '🐐',
    subtitle: 'Doble Coincidencia de Necesidades',
    missionTitle: 'Misión: Resolver el Trueque de Cabra por Trigo & Cobre',
    modalTarget: 'mercado_trueque',
    color: '#f59e0b',
    borderColor: 'border-amber-500',
    bgActive: 'bg-amber-950/40'
  },
  {
    id: 'era_sal_cauri',
    number: 'ERA 02',
    name: 'Sal & Conchas de Cauri',
    icon: '🧂',
    subtitle: 'El Primer Salario Portátil & Divisible',
    missionTitle: 'Misión: Medir y Empaquetar Saquitos de Sal Pura',
    modalTarget: 'almacen_sal',
    color: '#06b6d4',
    borderColor: 'border-cyan-500',
    bgActive: 'bg-cyan-950/40'
  },
  {
    id: 'era_forja_lidia',
    number: 'ERA 03',
    name: 'La Forja Real de Lidia',
    icon: '🦁',
    subtitle: 'Moneda Acuñada & Sello del León',
    missionTitle: 'Misión: Acuñar Monedas de Electro con Sello Real',
    modalTarget: 'forja_lidia',
    color: '#eab308',
    borderColor: 'border-yellow-500',
    bgActive: 'bg-yellow-950/40'
  },
  {
    id: 'era_bit_digital',
    number: 'ERA 04',
    name: 'Red Digital & Blockchain',
    icon: '⚡',
    subtitle: 'Ciberespacio, Bits y Confianza en Red',
    missionTitle: 'Misión: Minar Bits y Conectar Nodos Descentralizados',
    modalTarget: 'red_digital',
    color: '#c084fc',
    borderColor: 'border-purple-500',
    bgActive: 'bg-purple-950/40'
  }
];

export const LineaHorizontalEras: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { 
    currentEra, 
    completedEras, 
    completeEraAndAdvance, 
    setCorrelativeEra,
    openModal,
    finishMission
  } = useGameStore();

  const isCompleted = (era: MoneyEra) => completedEras.includes(era);

  const isUnlocked = (era: MoneyEra, index: number) => {
    if (index === 0) return true; // Era 1 is always unlocked
    const prevEra = ERAS_LIST[index - 1].id;
    return isCompleted(prevEra) || currentEra === era;
  };

  const handleOpenMission = (era: EraStep, index: number) => {
    if (!isUnlocked(era.id, index)) {
      soundFx.playError();
      return;
    }
    soundFx.playClick();
    setCorrelativeEra(era.id);
    openModal(era.modalTarget);
  };

  const handleCompleteAndAdvance = (era: EraStep, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUnlocked(era.id, index)) return;
    completeEraAndAdvance(era.id);
  };

  const allCompleted = ERAS_LIST.every(era => isCompleted(era.id));

  return (
    <div 
      id="linea-horizontal-eras"
      className="w-full max-w-6xl mx-auto my-3 p-3 sm:p-4 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.7)] flex flex-col gap-3 transition-all"
    >
      {/* HEADER WITH PROGRESS STATUS */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Línea Correlativa de las 4 Eras Financieras
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {completedEras.length} / 4 Eras Completadas
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Avanza en orden secuencial estricto: al revelar y superar la misión de cada era se desbloquea la siguiente.
            </p>
          </div>
        </div>

        {allCompleted && (
          <button
            id="btn-linea-certificado-final"
            onClick={finishMission}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all cursor-pointer hover:scale-105"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Ver Certificado Final (Fase 5)</span>
          </button>
        )}
      </div>

      {/* HORIZONTAL TIMELINE STEP CARDS (4 ERAS SIDE BY SIDE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 relative">
        {ERAS_LIST.map((era, index) => {
          const completed = isCompleted(era.id);
          const unlocked = isUnlocked(era.id, index);
          const isCurrent = currentEra === era.id;

          return (
            <div
              key={era.id}
              id={`era-step-${era.id}`}
              onClick={() => handleOpenMission(era, index)}
              className={`relative p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                completed
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_15px_rgba(52,211,153,0.15)] hover:border-emerald-400'
                  : isCurrent
                  ? `${era.bgActive} ${era.borderColor} shadow-[0_0_20px_rgba(0,243,255,0.25)] ring-1 ring-cyan-400/50`
                  : unlocked
                  ? 'bg-slate-950/70 border-slate-700 hover:border-slate-500'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* TOP STRIP: NUMBER, ICON & STATUS */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label={era.name}>
                    {era.icon}
                  </span>
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
                      {era.number}
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      {era.name}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div>
                  {completed ? (
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 text-[9px] font-bold px-1.5" title="Misión Completada">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Hecha</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center gap-1 text-[9px] font-bold px-1.5 animate-pulse" title="Misión Actual en Curso">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Activa</span>
                    </span>
                  ) : unlocked ? (
                    <span className="p-1 rounded-full bg-slate-800 text-slate-300 text-[9px] font-mono px-1.5" title="Desbloqueada">
                      Lista
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1 text-[9px] font-mono px-1.5" title="Bloqueada">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Bloq.</span>
                    </span>
                  )}
                </div>
              </div>

              {/* MISSION DETAILS */}
              <div className="my-2">
                <p className="text-[11px] font-semibold text-slate-300 mb-1 line-clamp-1">
                  {era.subtitle}
                </p>
                <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[10px] text-slate-300">
                  <span className="text-cyan-400 font-bold block mb-0.5">Reto Pedagógico:</span>
                  <span className="line-clamp-2 leading-relaxed">{era.missionTitle}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-1.5 mt-auto">
                {unlocked ? (
                  <div className="flex items-center gap-1">
                    <button
                      id={`btn-abrir-mision-${era.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMission(era, index);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 border border-cyan-500/30 transition-all"
                      title="Abrir simulación interactiva de esta era"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>{completed ? 'Revisar' : 'Hacer Misión'}</span>
                    </button>

                    {!completed && (
                      <button
                        id={`btn-superar-avanzar-${era.id}`}
                        onClick={(e) => handleCompleteAndAdvance(era, index, e)}
                        className="py-1.5 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-black flex items-center justify-center gap-1 shadow-md transition-all shrink-0"
                        title="Completar reto y avanzar correlativamente a la siguiente era"
                      >
                        <span>Superar</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="py-1.5 px-2 rounded-xl bg-slate-950 text-slate-500 text-[10px] font-mono text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Supera la Era 0{index}</span>
                  </div>
                )}
              </div>

              {/* HORIZONTAL CORRELATIVE ARROW INDICATOR */}
              {index < 3 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-slate-400 items-center justify-center shadow-md">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
