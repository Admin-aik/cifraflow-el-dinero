import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/EstadoJuego';
import { CaminoLegado3D } from './components/CaminoLegado3D';
import { EstadoFinanciero } from './components/EstadoFinanciero';
import { LetreroMensajeModal } from './components/LetreroMensaje';
import { MercadoTruequeModal } from './components/MercadoTruequeModal';
import { AlmacenSalCauriModal } from './components/AlmacenSalCauriModal';
import { ForjaLidiaModal } from './components/ForjaLidiaModal';
import { RedDigitalBitModal } from './components/RedDigitalBitModal';
import { BancosDistritoModal } from './components/BancosDistritoModal';
import { BolsaCaracasModal } from './components/BolsaCaracasModal';
import { HojaBalanceModal } from './components/HojaBalanceModal';
import { DefensaFraudeModal } from './components/DefensaFraudeModal';
import { AcertijosGuiaModal } from './components/AcertijosGuia';
import { BibliotecaFlotanteModal } from './components/BibliotecaFlotanteModal';
import { ArquetiposModal } from './components/ArquetiposModal';
import { EduPopupNotification } from './components/EduPopupNotification';
import { ARCHETYPES, CIFRAFLOW_LOGO } from './data/archetypes';
import { soundFx } from './utils/audio';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Eye, 
  Compass, 
  ShieldCheck,
  Building2,
  TrendingUp,
  Hammer,
  UserCheck
} from 'lucide-react';

export default function App() {
  const { 
    tick, 
    flowVisionActive, 
    toggleFlowVision, 
    openModal, 
    resetGame,
    stage,
    currentEra,
    archetypeId
  } = useGameStore();

  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  // Background game loop: tick cashflow calculation every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 2500);
    return () => clearInterval(interval);
  }, [tick]);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleReset = () => {
    if (window.confirm('¿Reiniciar la Aventura de Kai & Lia y volver a la Era del Trueque?')) {
      resetGame();
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* TOP COMPACT BRANDING HEADER */}
      <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 shadow-lg">
        {/* BRAND & LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.4)] shrink-0 bg-slate-950 flex items-center justify-center">
            <img
              src={CIFRAFLOW_LOGO}
              alt="CifraFlow Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black tracking-tight text-white flex items-center gap-2">
              CifraFlow • El Viaje del Valor
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Por ircar rojas
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              De la Sal al Bit • Acertijos, Recorridos y Simulador de Finanzas 3D
            </p>
          </div>
        </div>

        {/* QUICK CONTROLS & ERA SHORTCUTS */}
        <div className="flex items-center gap-2">
          {/* Active Archetype Avatar Pill */}
          <button
            id="btn-open-arquetipos"
            onClick={() => openModal('arquetipos')}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#040510] border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all group"
            title="Cambiar o Inspeccionar Arquetipo de Jugador"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400 shrink-0 bg-slate-900">
              <img
                src={activeArchetype.image}
                alt={activeArchetype.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-[11px] font-black text-cyan-300 leading-none">{activeArchetype.name.split(' ')[0]}</div>
              <div className="text-[9px] text-slate-400 leading-none mt-0.5">{activeArchetype.role.split('&')[0]}</div>
            </div>
          </button>

          {/* Quick Era Modals shortcuts */}
          <button
            onClick={() => openModal('mercado_trueque')}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 1: El Trueque y la Cabra"
          >
            🐐 Era 1
          </button>

          <button
            onClick={() => openModal('almacen_sal')}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 2: Sal & Cauri"
          >
            🧂 Era 2
          </button>

          <button
            onClick={() => openModal('forja_lidia')}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-yellow-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 3: Forja de Lidia"
          >
            🦁 Era 3
          </button>

          <button
            onClick={() => openModal('red_digital')}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-fuchsia-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 4: El Bit Digital"
          >
            ⚡ Era 4
          </button>

          <button
            onClick={() => openModal('biblioteca')}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-xs text-cyan-300 font-bold flex items-center gap-1 border border-cyan-500/40"
            title="Libro Ilustrado Digital De la Sal al Bit"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Libro PDF</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isMuted ? 'Activar Sonido Sintetizado' : 'Silenciar Sonido'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Restart */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reiniciar Aventura"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 3D INTERACTIVE CANVAS VIEWPORT */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <CaminoLegado3D />
      </main>

      {/* FIXED BOTTOM FINANCIAL STATUS HUD */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto">
        <EstadoFinanciero />
      </footer>

      {/* INTERACTIVE MODALS & PANELS */}
      <LetreroMensajeModal />
      <MercadoTruequeModal />
      <AlmacenSalCauriModal />
      <ForjaLidiaModal />
      <RedDigitalBitModal />
      <BancosDistritoModal />
      <BolsaCaracasModal />
      <HojaBalanceModal />
      <DefensaFraudeModal />
      <AcertijosGuiaModal />
      <BibliotecaFlotanteModal />
      <ArquetiposModal />

      {/* TOAST NOTIFICATION POPUPS */}
      <EduPopupNotification />
    </div>
  );
}
