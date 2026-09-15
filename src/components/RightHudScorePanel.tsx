import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { 
  Coins, 
  RefreshCw, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const RightHudScorePanel: React.FC = () => {
  const {
    levelPoints,
    cumulativePoints,
    bcvRateInfo,
    refreshBcvRate,
    textScale,
    setTextScale,
    goBack,
    gameFlowState,
    goToModules,
    studentName
  } = useGameStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshBcv = async () => {
    setIsRefreshing(true);
    await refreshBcvRate();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const isLevelNegative = levelPoints < 0;
  const isCumulativeNegative = cumulativePoints < 0;

  return (
    <aside 
      id="right-hud-panel"
      className="fixed top-16 right-3 sm:right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto"
      style={{
        fontSize: textScale === 'small' ? '0.85rem' : textScale === 'large' ? '1.1rem' : textScale === 'xlarge' ? '1.25rem' : '1rem'
      }}
    >
      {/* MAIN HUD CONTAINER */}
      <div className="w-56 sm:w-64 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 transition-all">
        
        {/* HEADER: STUDENT & BCV LIVE RATE */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold truncate max-w-[110px]">
              {studentName || 'Cyber-Cadete'}
            </span>
          </div>

          {/* BCV real-time web badge */}
          <div 
            className="flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded-lg border border-amber-500/40 text-[10px] font-mono text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
            title={`Tasa Oficial BCV en Vivo según la Web: Bs. ${bcvRateInfo.rate.toFixed(2)} / USD • Hora: ${bcvRateInfo.updateHour}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Tasa BCV Web En Vivo" />
            <Coins className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="font-bold">Bs.{bcvRateInfo.rate.toFixed(2)}</span>
            <button
              onClick={handleRefreshBcv}
              className="hover:text-white transition-colors cursor-pointer ml-0.5 p-0.5"
              title="Actualizar tasa BCV desde la Web en tiempo real"
            >
              <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-slate-400 hover:text-amber-300'}`} />
            </button>
          </div>
        </div>

        {/* DUAL SCORING SECTION: LEVEL SCORE + CUMULATIVE SCORE */}
        <div className="grid grid-cols-2 gap-2">
          {/* 1. Puntaje del Reto Actual */}
          <div className={`p-2 rounded-xl border flex flex-col justify-between transition-all ${
            isLevelNegative 
              ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
              : 'bg-slate-950/80 border-cyan-500/30'
          }`}>
            <div className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Reto Actual</span>
              {isLevelNegative && <AlertTriangle className="w-2.5 h-2.5 text-rose-400 animate-pulse" />}
            </div>
            <div className={`text-lg font-black font-mono mt-0.5 tracking-tight ${
              isLevelNegative ? 'text-rose-400' : 'text-cyan-300'
            }`}>
              {levelPoints > 0 ? `+${levelPoints}` : `${levelPoints}`}
              <span className="text-[9px] font-normal text-slate-400 ml-0.5">pts</span>
            </div>
            <div className="text-[8px] text-slate-500 font-mono">
              {isLevelNegative ? 'Saldo Negativo' : 'Nivel en curso'}
            </div>
          </div>

          {/* 2. Total Acumulado Ininterrumpido */}
          <div className={`p-2 rounded-xl border flex flex-col justify-between transition-all ${
            isCumulativeNegative 
              ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
              : 'bg-slate-950/80 border-fuchsia-500/40'
          }`}>
            <div className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Acumulado</span>
              {isCumulativeNegative ? (
                <span className="text-[8px] font-bold text-rose-400">Déficit</span>
              ) : (
                <Sparkles className="w-2.5 h-2.5 text-fuchsia-400" />
              )}
            </div>
            <div className={`text-lg font-black font-mono mt-0.5 tracking-tight ${
              isCumulativeNegative ? 'text-rose-400' : 'text-fuchsia-300'
            }`}>
              {cumulativePoints > 0 ? `+${cumulativePoints}` : `${cumulativePoints}`}
              <span className="text-[9px] font-normal text-slate-400 ml-0.5">pts</span>
            </div>
            <div className="text-[8px] text-slate-500 font-mono">
              Total Ininterrumpido
            </div>
          </div>
        </div>

        {/* ACCESSIBILITY TEXT SCALE CONTROLLER */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <span className="text-[9px] font-mono text-slate-400">Texto:</span>
          <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-800">
            {(['small', 'normal', 'large', 'xlarge'] as const).map(scale => (
              <button
                key={scale}
                onClick={() => setTextScale(scale)}
                className={`text-[9px] font-mono px-1 rounded transition-all ${
                  textScale === scale 
                    ? 'bg-cyan-400 text-slate-950 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Tamaño ${scale}`}
              >
                {scale === 'small' ? 'A-' : scale === 'normal' ? 'A' : scale === 'large' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION ACTIONS */}
        <div className="flex items-center gap-1.5 pt-1">
          {gameFlowState !== 'module_selection' && (
            <button
              id="btn-hud-modulos"
              onClick={goToModules}
              className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-cyan-500/30 transition-colors"
              title="Ir al Menú de Módulos"
            >
              <Layers className="w-3 h-3" />
              <span>Módulos</span>
            </button>
          )}

          <button
            id="btn-hud-retroceder"
            onClick={goBack}
            className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 border border-slate-700 transition-colors"
            title="Volver a la pantalla anterior"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Atrás</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
