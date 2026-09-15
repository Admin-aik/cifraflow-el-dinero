import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/EstadoJuego';
import { PantallaLogeo } from './components/PantallaLogeo';
import { PantallaCreacionPersonaje } from './components/PantallaCreacionPersonaje';
import { PortalTransicionEras } from './components/PortalTransicionEras';
import { CaminoLegado3D } from './components/CaminoLegado3D';
import { EstadoFinanciero } from './components/EstadoFinanciero';
import { LetreroMensajeModal } from './components/LetreroMensaje';
import { AcertijosGuiaModal } from './components/AcertijosGuia';
import { BibliotecaFlotanteModal } from './components/BibliotecaFlotanteModal';
import { ArquetiposModal } from './components/ArquetiposModal';
import { EduPopupNotification } from './components/EduPopupNotification';
import { NarradorAudioHUD } from './components/NarradorAudioHUD';
import { MarcadorPuntosFlotante } from './components/MarcadorPuntosFlotante';
import { ContadorInversionModal } from './components/ContadorInversionModal';
import { TriviaDecisionesModal } from './components/TriviaDecisionesModal';
import { PantallaSeleccionModulos } from './components/PantallaSeleccionModulos';
import { PantallaGameOverReto } from './components/PantallaGameOverReto';
import { PantallaFinMision } from './components/PantallaFinMision';
import { RightHudScorePanel } from './components/RightHudScorePanel';
import { LineaHorizontalEras } from './components/LineaHorizontalEras';
import { CuadroUnificadoEras } from './components/CuadroUnificadoEras';
import { ARCHETYPES, STARTER_RELICS, CIFRAFLOW_LOGO } from './data/archetypes';
import { soundFx } from './utils/audio';
import { narratorEngine } from './utils/narrator';
import { MoneyEra } from './types';
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
  UserCheck, 
  Headphones,
  User,
  Pause,
  Play
} from 'lucide-react';

export default function App() {
  const { 
    gameFlowState,
    playerName,
    playerTitle,
    selectedRelic,
    tick, 
    flowVisionActive, 
    toggleFlowVision, 
    openModal, 
    closeModal,
    activeModal,
    resetGame,
    stage,
    currentEra,
    archetypeId,
    goToCharacterCreation,
    goBack,
    goToModules,
    refreshBcvRate
  } = useGameStore();

  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [showErasTimeline, setShowErasTimeline] = useState(false);
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());
  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];
  const activeRelic = STARTER_RELICS.find(r => r.id === selectedRelic) || STARTER_RELICS[0];

  const isCuadroErasOpen = ['cuadro_eras', 'mercado_trueque', 'almacen_sal', 'forja_lidia', 'red_digital'].includes(activeModal || '');
  const cuadroInitialEra: MoneyEra = 
    activeModal === 'almacen_sal' ? 'era_sal_cauri'
    : activeModal === 'forja_lidia' ? 'era_forja_lidia'
    : activeModal === 'red_digital' ? 'era_bit_digital'
    : activeModal === 'mercado_trueque' ? 'era_trueque'
    : currentEra;

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      setNarratorState(narratorEngine.getState());
    });
    return () => unsubscribe();
  }, []);

  // AUTOMÁTICO EN TIEMPO REAL: Actualiza la tasa oficial BCV según la web al inicio y cada 60s
  useEffect(() => {
    refreshBcvRate(true);
    const bcvTimer = setInterval(() => {
      refreshBcvRate(true);
    }, 60000);
    return () => clearInterval(bcvTimer);
  }, [refreshBcvRate]);

  // Background game loop: tick cashflow calculation every 2.5 seconds (only when on map)
  useEffect(() => {
    if (gameFlowState !== 'map_gameplay') return;
    const interval = setInterval(() => {
      tick();
    }, 2500);
    return () => clearInterval(interval);
  }, [tick, gameFlowState]);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleReset = () => {
    if (window.confirm('¿Reiniciar la Aventura de Kai & Lia y volver a la pantalla de inicio?')) {
      narratorEngine.stop();
      resetGame();
    }
  };

  // STEP 1: FASE 0 - LOGIN & REGISTRO DE ESTUDIANTE
  if (gameFlowState === 'login') {
    return <PantallaLogeo />;
  }

  // STEP 2: FASE 1 - SELECCIÓN CINEMATOGRÁFICA DE AVATARES ADOLESCENTES
  if (gameFlowState === 'character_creation') {
    return <PantallaCreacionPersonaje />;
  }

  // STEP 3: FASE 2 - SELECCIÓN DE MÓDULOS PEDAGÓGICOS
  if (gameFlowState === 'module_selection') {
    return <PantallaSeleccionModulos />;
  }

  // STEP 4: TRANSICIÓN DE PORTAL DE LAS ERAS
  if (gameFlowState === 'transition') {
    return <PortalTransicionEras />;
  }

  // STEP 5: TRANSICIÓN GAME OVER ENTRE RETOS
  if (gameFlowState === 'game_over_challenge') {
    return <PantallaGameOverReto />;
  }

  // STEP 6: FASE 5 - FIN DE LA MISIÓN & CERTIFICADO DIGITAL
  if (gameFlowState === 'mission_complete') {
    return <PantallaFinMision />;
  }

  // STEP 7: MAP OF THE ERAS GAMEPLAY VIEWPORT
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none relative">
      {/* PERSISTENT RIGHT-SIDE HUD SCORE PANEL & BCV RATE */}
      <RightHudScorePanel />
      {/* TOP COMPACT BRANDING & PLAYER PASSPORT HEADER */}
      <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between z-30 shrink-0 shadow-lg">
        {/* BRAND & LOGO - CLICKING CIFRAFLOW RETURNS TO PREVIOUS SCREEN */}
        <button
          id="btn-cifraflow-nav-back"
          onClick={() => {
            soundFx.playClick();
            narratorEngine.stop();
            goBack();
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left hover:opacity-95 transition-all p-1 -ml-1 rounded-xl hover:bg-slate-800/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          title="Haz clic en el logotipo de CifraFlow para volver a la pantalla anterior"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-cyan-400/50 group-hover:border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] shrink-0 bg-slate-950 flex items-center justify-center group-hover:scale-105 transition-all">
            <img
              src={CIFRAFLOW_LOGO}
              alt="CifraFlow Logo - Volver"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm md:text-base font-black tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 group-hover:brightness-125 underline-offset-4 group-hover:underline flex items-center gap-1">
                CifraFlow
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 hidden sm:inline-flex items-center gap-1 font-semibold group-hover:border-cyan-300">
                  Volver Atrás
                </span>
              </span>
              <span className="hidden sm:inline text-cyan-400">• El Viaje del Valor</span>
              <span className="hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Por ircar rojas
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden lg:block group-hover:text-cyan-300 transition-colors">
              Haz clic en <strong className="text-cyan-400 font-bold">CifraFlow</strong> para volver a la pantalla anterior
            </p>
          </div>
        </button>

        {/* QUICK CONTROLS & ERA SHORTCUTS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Archetype & Player Name Pill */}
          <button
            id="btn-open-arquetipos"
            onClick={() => openModal('arquetipos')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#040510] border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all group cursor-pointer"
            title="Cambiar o Inspeccionar Arquetipo de Jugador"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400 shrink-0 bg-slate-900 relative">
              <img
                src={activeArchetype.image}
                alt={activeArchetype.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-black text-cyan-300 leading-none flex items-center gap-1">
                <span>{playerName || activeArchetype.name.split(' ')[0]}</span>
                <span className="text-[10px]">{activeRelic.icon}</span>
              </div>
              <div className="text-[9px] text-amber-400/90 leading-none mt-0.5 truncate max-w-[110px] hidden sm:block">
                {playerTitle || activeArchetype.role.split('&')[0]}
              </div>
            </div>
          </button>

          {/* Botón Maestro: Cuadro de las Eras & Misiones */}
          <button
            id="btn-header-cuadro-eras"
            onClick={() => {
              soundFx.playClick();
              narratorEngine.playIconNarration('icon_era_trueque');
              openModal('cuadro_eras');
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:brightness-110 transition-all cursor-pointer"
            title="Abrir el Cuadro Unificado de las Eras: Narraciones, Acertijos y Transacciones con Puntos"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cuadro de las Eras</span>
          </button>

          {/* Quick Era Modals shortcuts with speech interruption/initiation */}
          <button
            onClick={() => {
              soundFx.playClick();
              narratorEngine.playIconNarration('icon_era_trueque');
              openModal('mercado_trueque');
            }}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 1: El Trueque y la Cabra (Clic para narrar y abrir misión)"
          >
            🐐 Era 1
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              narratorEngine.playIconNarration('icon_era_sal_cauri');
              openModal('almacen_sal');
            }}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 2: Sal & Cauri (Clic para narrar y abrir misión)"
          >
            🧂 Era 2
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              narratorEngine.playIconNarration('icon_era_forja_lidia');
              openModal('forja_lidia');
            }}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-yellow-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 3: Forja de Lidia (Clic para narrar y abrir misión)"
          >
            🦁 Era 3
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              narratorEngine.playIconNarration('icon_era_red_digital');
              openModal('red_digital');
            }}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-fuchsia-300 font-medium items-center gap-1 border border-slate-700"
            title="Era 4: El Bit Digital (Clic para narrar y abrir misión)"
          >
            ⚡ Era 4
          </button>

          {/* Audio Narrator Quick Trigger */}
          <button
            id="btn-audiolibro-header"
            onClick={() => {
              if (narratorState.isSpeaking) {
                if (narratorState.isPaused) narratorEngine.resume();
                else narratorEngine.pause();
              } else {
                narratorEngine.play('introduccion');
              }
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
              narratorState.isSpeaking
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
            }`}
            title="Audiolibro Narrado & BSO de Fondo"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {narratorState.isSpeaking 
                ? (narratorState.isPaused ? 'Audio Pausado' : 'Narrando...') 
                : 'Audiolibro'}
            </span>
          </button>

          {/* Botón Maestro: Pausar Todos los Audios */}
          <button
            id="btn-pausar-todos-audios"
            onClick={() => {
              if (narratorState.isAllAudioPaused) {
                narratorEngine.resumeAll();
              } else {
                narratorEngine.pauseAll();
              }
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
              narratorState.isAllAudioPaused
                ? 'bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border-amber-500/50'
                : 'bg-red-950/70 hover:bg-red-900/80 text-red-300 border-red-500/50'
            }`}
            title={narratorState.isAllAudioPaused ? 'Audios actualmente pausados. Clic para reanudar' : 'Pausar todos los audios y narraciones'}
          >
            {narratorState.isAllAudioPaused ? (
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className="text-[11px]">
              {narratorState.isAllAudioPaused ? 'Audios en Pausa' : 'Pausar Audios'}
            </span>
          </button>

          {/* Botón Conteo de Inversión */}
          <button
            id="btn-header-conteo-inversion"
            onClick={() => openModal('contador_inversion')}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 text-xs text-amber-300 font-bold flex items-center gap-1 border border-amber-500/40 transition-all"
            title="Conteo de Inversión, Portafolio y Puntos Acumulados"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Inversión</span>
          </button>

          {/* Botón Trivia & Decisiones */}
          <button
            id="btn-header-trivia-decisiones"
            onClick={() => openModal('trivia_decisiones')}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-xs text-emerald-300 font-bold flex items-center gap-1 border border-emerald-500/40 transition-all"
            title="Decisiones & Preguntas: Gana puntos con aciertos o piérdelos con fallos"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Decisiones</span>
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

      {/* FLOATING AUDIO NARRATOR HUD */}
      <NarradorAudioHUD />

      {/* FIXED BOTTOM FINANCIAL STATUS HUD */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto">
        <EstadoFinanciero />
      </footer>

      {/* INTERACTIVE MODALS & PANELS */}
      <CuadroUnificadoEras 
        isOpen={isCuadroErasOpen} 
        onClose={closeModal} 
        initialEra={cuadroInitialEra} 
      />
      <LetreroMensajeModal />
      <AcertijosGuiaModal />
      <BibliotecaFlotanteModal />
      <ArquetiposModal />
      <ContadorInversionModal />
      <TriviaDecisionesModal />

      {/* FLOATING SCORE TICKER NOTIFICATIONS */}
      <MarcadorPuntosFlotante />

      {/* TOAST NOTIFICATION POPUPS */}
      <EduPopupNotification />
    </div>
  );
}
