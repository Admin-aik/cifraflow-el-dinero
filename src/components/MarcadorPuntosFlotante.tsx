import React, { useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ArrowUpRight, ArrowDownRight, Award, ShieldAlert, Hammer, HelpCircle, TrendingUp, X } from 'lucide-react';

export const MarcadorPuntosFlotante: React.FC = () => {
  const floatingScoreEvent = useGameStore(s => s.floatingScoreEvent);
  const clearFloatingScore = useGameStore(s => s.clearFloatingScore);

  useEffect(() => {
    if (!floatingScoreEvent) return;

    const timer = setTimeout(() => {
      clearFloatingScore();
    }, 3200);

    return () => clearTimeout(timer);
  }, [floatingScoreEvent, clearFloatingScore]);

  if (!floatingScoreEvent) return null;

  const isGain = floatingScoreEvent.type === 'gain';

  const getCategoryIcon = () => {
    switch (floatingScoreEvent.category) {
      case 'respuestas':
        return <HelpCircle className="w-5 h-5" />;
      case 'ataque':
        return <ShieldAlert className="w-5 h-5" />;
      case 'construccion':
        return <Hammer className="w-5 h-5" />;
      case 'inversion':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <aside 
      aria-label="Marcador de Puntos en Vivo"
      className="fixed top-20 right-4 md:right-8 z-50 pointer-events-auto transition-all animate-bounce"
    >
      <div 
        id="floating-score-card"
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border ${
          isGain 
            ? 'bg-emerald-950/90 text-emerald-100 border-emerald-400 shadow-emerald-900/50' 
            : 'bg-rose-950/90 text-rose-100 border-rose-400 shadow-rose-900/50'
        }`}
      >
        <div className={`p-2 rounded-xl flex items-center justify-center ${
          isGain ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {getCategoryIcon()}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
            {isGain ? (
              <span className="flex items-center text-emerald-300 font-extrabold text-base">
                <ArrowUpRight className="w-5 h-5 mr-0.5" />
                {floatingScoreEvent.text}
              </span>
            ) : (
              <span className="flex items-center text-rose-300 font-extrabold text-base">
                <ArrowDownRight className="w-5 h-5 mr-0.5" />
                {floatingScoreEvent.text}
              </span>
            )}
          </div>
          {floatingScoreEvent.deltaCash !== undefined && floatingScoreEvent.deltaCash !== 0 && (
            <span className={`text-xs font-semibold ${isGain ? 'text-emerald-200' : 'text-rose-200'}`}>
              Efecto en Capital: {floatingScoreEvent.deltaCash > 0 ? `+$${floatingScoreEvent.deltaCash}` : `-$${Math.abs(floatingScoreEvent.deltaCash)}`}
            </span>
          )}
        </div>

        <button
          id="btn-close-floating-score"
          onClick={clearFloatingScore}
          aria-label="Cerrar notificación de puntos"
          className="ml-2 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
