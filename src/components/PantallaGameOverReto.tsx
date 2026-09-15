import React, { useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Flag,
  Coins,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const PantallaGameOverReto: React.FC = () => {
  const { 
    lastChallengeFinished, 
    levelPoints, 
    cumulativePoints, 
    currentChallengeIndex,
    continueNextChallenge,
    studentName,
    goBack
  } = useGameStore();

  useEffect(() => {
    // Play the mandatory spoken phrase in humanized Latin American neutral Spanish
    narratorEngine.play('game_over_reto');
  }, []);

  const earnedPts = lastChallengeFinished?.earnedPoints ?? levelPoints;
  const isNegative = earnedPts < 0;
  const isCumulativeNegative = cumulativePoints < 0;

  const handleReplayAudio = () => {
    narratorEngine.play('game_over_reto');
  };

  return (
    <div 
      id="pantalla-game-over-reto"
      className="relative w-screen min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* BACKGROUND COSMIC AMBIENT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 ${
          isNegative ? 'bg-rose-600' : 'bg-cyan-500'
        }`} />
      </div>

      {/* TOP CIFRAFLOW LOGO BACK TRIGGER */}
      <div className="relative z-20 w-full max-w-xl mx-auto mb-3 flex items-center justify-between">
        <button
          id="btn-cifraflow-gameover-back"
          onClick={() => {
            soundFx.playClick();
            goBack();
          }}
          className="group flex items-center gap-2.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer hover:scale-105 shadow-md"
          title="Haz clic en el logotipo de CifraFlow para volver a la pantalla anterior"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/60 group-hover:border-cyan-300 bg-slate-950 p-0.5 shadow-[0_0_12px_rgba(0,242,254,0.3)] shrink-0">
            <img 
              src={CIFRAFLOW_LOGO} 
              alt="CifraFlow Logo - Volver" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-300">
                CIFRAFLOW
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold group-hover:border-cyan-300">
                Volver Atrás
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              Clic para volver a la pantalla anterior
            </span>
          </div>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-center flex flex-col items-center">
        
        {/* MANDATORY BANNER */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,243,255,0.3)] mb-4">
          <Flag className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            TRANSICIÓN OFICIAL DE RETO
          </span>
        </div>

        {/* LARGE SPOKEN TITLE BANNER */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 tracking-tight leading-tight mb-2">
          GAME OVER
        </h1>
        
        <div className="text-base sm:text-lg font-bold text-slate-200 mb-6 flex items-center justify-center gap-2">
          <span>Fin de este reto, vamos al siguiente.</span>
          <button
            onClick={handleReplayAudio}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
            title="Repetir locución en español neutro"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* CHALLENGE TITLE */}
        <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-5 text-left">
          <div className="text-[10px] font-mono uppercase text-slate-400">Reto Evaluado:</div>
          <div className="text-sm font-bold text-white mt-0.5">
            {lastChallengeFinished?.title || `Reto Nivel ${currentChallengeIndex - 1}`}
          </div>
        </div>

        {/* BREAKDOWN OF SCORES (LEVEL & CUMULATIVE) */}
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          {/* Level Earned Points */}
          <div className={`p-4 rounded-2xl border text-center ${
            isNegative 
              ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
              : 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
          }`}>
            <div className="text-xs font-mono uppercase text-slate-400 mb-1 flex items-center justify-center gap-1">
              {isNegative ? <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> : <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
              Puntos del Reto
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
              isNegative ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {earnedPts >= 0 ? `+${earnedPts}` : `${earnedPts}`}
              <span className="text-xs font-normal text-slate-400 ml-1">pts</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {isNegative ? 'Penalización por errores' : 'Desempeño destacado'}
            </div>
          </div>

          {/* Cumulative Total Points */}
          <div className={`p-4 rounded-2xl border text-center ${
            isCumulativeNegative 
              ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
              : 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_20px_rgba(0,243,255,0.2)]'
          }`}>
            <div className="text-xs font-mono uppercase text-slate-400 mb-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Total Acumulado
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
              isCumulativeNegative ? 'text-rose-400' : 'text-cyan-300'
            }`}>
              {cumulativePoints >= 0 ? `+${cumulativePoints}` : `${cumulativePoints}`}
              <span className="text-xs font-normal text-slate-400 ml-1">pts</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {isCumulativeNegative ? 'Saldo acumulado negativo' : 'Suma ininterrumpida'}
            </div>
          </div>
        </div>

        {/* STUDENT INFO BADGE */}
        <div className="text-xs text-slate-400 mb-6 font-mono">
          Estudiante Operador: <span className="text-cyan-300 font-bold">{studentName}</span>
        </div>

        {/* ACTION BUTTON TO CONTINUE TO NEXT CHALLENGE */}
        <button
          id="btn-continuar-siguiente-reto"
          onClick={continueNextChallenge}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>CONTINUAR AL SIGUIENTE RETO</span>
          <ArrowRight className="w-5 h-5 font-black" />
        </button>

      </div>
    </div>
  );
};
