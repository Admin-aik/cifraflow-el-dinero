import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ARCHETYPES, STARTER_RELICS, CIFRAFLOW_LOGO } from '../data/archetypes';
import { soundFx } from '../utils/audio';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Flame,
  Award
} from 'lucide-react';

export const PortalTransicionEras: React.FC = () => {
  const { 
    playerName, 
    playerTitle, 
    archetypeId, 
    selectedRelic, 
    startMapGameplay 
  } = useGameStore();

  const [countdown, setCountdown] = useState(4);
  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];
  const activeRelic = STARTER_RELICS.find(r => r.id === selectedRelic) || STARTER_RELICS[0];

  useEffect(() => {
    soundFx.playPowerUp();

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          startMapGameplay();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startMapGameplay]);

  return (
    <div 
      id="portal-transicion-container"
      className="relative w-screen h-screen bg-[#02050f] text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden select-none"
    >
      {/* VORTEX ANIMATION BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/20 animate-ping opacity-25" />
        <div className="w-[450px] h-[450px] rounded-full border border-fuchsia-500/30 animate-spin opacity-40 duration-1000" />
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-amber-500/20 blur-[90px] animate-pulse" />
      </div>

      {/* CENTER HOLOGRAPHIC TIME-PORTAL CARD */}
      <div className="relative z-10 w-full max-w-xl bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(0,242,254,0.3)]">
        
        {/* LOGO & STEP BADGE */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400 shadow-md">
            <img 
              src={CIFRAFLOW_LOGO} 
              alt="Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Nexo Temporal • Salto de Época
          </span>
        </div>

        {/* CHARACTER AVATAR SPOTLIGHT */}
        <div className="relative inline-block my-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.5)] mx-auto bg-slate-950">
            <img 
              src={activeArchetype.image} 
              alt={activeArchetype.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-pulse" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-950 border border-fuchsia-400 text-lg flex items-center justify-center shadow-md">
            {activeRelic.icon}
          </div>
        </div>

        {/* WELCOME HEADLINE */}
        <h1 className="text-xl sm:text-2xl font-black text-white mt-2">
          ¡Bienvenido al Viaje del Valor, {playerName}!
        </h1>
        
        <p className="text-xs sm:text-sm font-semibold text-amber-300 mt-1">
          {playerTitle} • {activeArchetype.name}
        </p>

        <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-md mx-auto">
          El portal intertemporal se ha abierto con éxito. Has recibido tu reliquia <strong className="text-fuchsia-300">{activeRelic.name}</strong> y estás listo para explorar las 4 grandes eras del dinero con Kai y Lia.
        </p>

        {/* 4 ERAS MINI HORIZONTAL PATH */}
        <div className="my-5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-4 gap-2">
          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/50 text-center animate-bounce">
            <div className="text-lg">🐐</div>
            <div className="text-[10px] font-bold text-amber-300 mt-0.5">Era 1</div>
            <div className="text-[9px] text-slate-400">Trueque</div>
          </div>

          <div className="p-2 rounded-xl bg-cyan-950/20 border border-slate-800 text-center opacity-70">
            <div className="text-lg">🧂</div>
            <div className="text-[10px] font-bold text-cyan-300 mt-0.5">Era 2</div>
            <div className="text-[9px] text-slate-400">Sal & Cauri</div>
          </div>

          <div className="p-2 rounded-xl bg-yellow-950/20 border border-slate-800 text-center opacity-70">
            <div className="text-lg">🦁</div>
            <div className="text-[10px] font-bold text-yellow-300 mt-0.5">Era 3</div>
            <div className="text-[9px] text-slate-400">Forja Lidia</div>
          </div>

          <div className="p-2 rounded-xl bg-fuchsia-950/20 border border-slate-800 text-center opacity-70">
            <div className="text-lg">⚡</div>
            <div className="text-[10px] font-bold text-fuchsia-300 mt-0.5">Era 4</div>
            <div className="text-[9px] text-slate-400">Bit Digital</div>
          </div>
        </div>

        {/* INSTANT ENTER BUTTON */}
        <button
          id="btn-saltar-al-mapa"
          onClick={() => {
            soundFx.playSuccess();
            startMapGameplay();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,242,254,0.5)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Aterrizar en el Mapa de las Eras ({countdown}s)</span>
          <ArrowRight className="w-5 h-5 font-black" />
        </button>
      </div>
    </div>
  );
};
