import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ARCHETYPES, PLAYER_TITLES, CIFRAFLOW_LOGO } from '../data/archetypes';
import { ArchetypeId } from '../types';
import { soundFx } from '../utils/audio';
import { narratorEngine } from '../utils/narrator';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Headphones, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Compass,
  User,
  Crown,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const PantallaCreacionPersonaje: React.FC = () => {
  const { 
    playerName: storedName, 
    playerTitle: storedTitle, 
    archetypeId: storedArchetype, 
    selectedRelic: storedRelic,
    completeCharacterCreation,
    goToLogin,
    goBack,
    startMapGameplay,
    isLoggedIn
  } = useGameStore();

  const [selectedArchId, setSelectedArchId] = useState<ArchetypeId>(storedArchetype || 'jorge');
  const [characterName, setCharacterName] = useState(storedName || 'Ircar Rojas');
  const [characterTitle, setCharacterTitle] = useState(storedTitle || PLAYER_TITLES[0]);
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());

  const currentArchetype = ARCHETYPES.find(a => a.id === selectedArchId) || ARCHETYPES[0];

  useEffect(() => {
    const unsub = narratorEngine.subscribe(() => {
      setNarratorState(narratorEngine.getState());
    });
    return () => unsub();
  }, []);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleAudioNarrator = () => {
    if (narratorState.isSpeaking) {
      if (narratorState.isPaused) narratorEngine.resume();
      else narratorEngine.pause();
    } else {
      narratorEngine.play('creacion_personaje');
    }
  };

  const handleSelectArchetype = (id: ArchetypeId) => {
    soundFx.playPowerUp();
    setSelectedArchId(id);
  };

  const handleConfirm = () => {
    narratorEngine.stop();
    // Maintain automatic balanced starter relic for state continuity
    const relicMap: Partial<Record<ArchetypeId, string>> = {
      jorge: 'cencerro_cabra',
      ircar: 'frasco_sal',
      ivan: 'sello_leon',
      carlos: 'chip_cuantico'
    };
    const finalRelic = relicMap[selectedArchId] || storedRelic || 'cencerro_cabra';

    completeCharacterCreation({
      archetypeId: selectedArchId,
      playerName: characterName.trim() || 'Viajero Cuántico',
      playerTitle: characterTitle,
      selectedRelic: finalRelic
    });
  };

  return (
    <div 
      id="pantalla-creacion-personaje-container"
      className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col p-3 sm:p-5 lg:p-6 overflow-y-auto select-none"
    >
      {/* BACKGROUND COSMIC AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentArchetype.primaryColor }}
        />
        <div 
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentArchetype.accentColor }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00f3ff 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* TOP HEADER & NAVIGATION */}
      <header className="relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CIFRAFLOW LOGO AS BACK TRIGGER */}
          <button
            id="btn-cifraflow-personaje-back"
            onClick={() => {
              soundFx.playClick();
              goBack();
            }}
            className="group p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 flex items-center gap-2.5 transition-all cursor-pointer hover:scale-105 shadow-md"
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
              <span className="text-[10px] text-slate-400 block -mt-0.5 hidden sm:block">
                Clic para volver a la pantalla anterior
              </span>
            </div>
          </button>

          <button
            onClick={goToLogin}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Volver a la pantalla de logeo"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Logeo</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={() => {
                soundFx.playClick();
                narratorEngine.stop();
                startMapGameplay();
              }}
              className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-[0_0_12px_rgba(0,242,254,0.25)] hover:scale-105 cursor-pointer"
              title="Volver directamente al Mapa de las Eras"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Ir al Mapa</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base md:text-lg font-black text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Selección de Avatar & Forja de Identidad</span>
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                4 Avatares Disponibles
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Selecciona a tu viajero generacional favorito, personaliza tu nombre y rango para saltar al Mapa de las Eras
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Audio Narrator */}
          <button
            onClick={handleAudioNarrator}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              narratorState.isSpeaking
                ? 'bg-fuchsia-500 text-slate-950 border-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.6)] animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-fuchsia-300 border-fuchsia-500/30'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {narratorState.isSpeaking ? (narratorState.isPaused ? 'Pausado' : 'Narrando...') : 'Guía de Forja'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 cursor-pointer"
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: ENLARGED 4-AVATAR SELECTION GRID */}
      <main className="relative z-10 max-w-7xl w-full mx-auto flex-1 flex flex-col justify-between py-4 sm:py-5 gap-5">
        
        {/* SECTION TITLE */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Elige tu Avatar Generacional:</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Haz clic en un avatar para seleccionarlo
          </span>
        </div>

        {/* 4 ENLARGED AVATARS IN FULL-WIDTH GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 flex-1 items-stretch">
          {ARCHETYPES.map((arch) => {
            const isSelected = arch.id === selectedArchId;
            return (
              <div
                key={arch.id}
                id={`card-avatar-${arch.id}`}
                onClick={() => handleSelectArchetype(arch.id)}
                className={`relative rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden border ${
                  isSelected
                    ? 'bg-slate-900/95 border-2 shadow-[0_0_30px_rgba(0,0,0,0.8)] scale-[1.02] ring-2'
                    : 'bg-slate-950/75 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50 hover:scale-[1.01]'
                }`}
                style={{
                  borderColor: isSelected ? arch.primaryColor : undefined,
                  boxShadow: isSelected ? `0 0 25px ${arch.primaryColor}35, inset 0 0 15px ${arch.primaryColor}15` : undefined
                }}
              >
                {/* Top Colored Edge Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                  style={{ backgroundColor: arch.primaryColor }}
                />

                {/* UPPER CARD SECTION: PORTRAIT IMAGE & BADGES */}
                <div>
                  <div 
                    className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border-2 shadow-2xl bg-slate-950"
                    style={{ borderColor: isSelected ? arch.primaryColor : '#334155' }}
                  >
                    <img 
                      src={arch.image} 
                      alt={arch.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Age Pill */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/70 text-[10px] font-mono font-bold text-slate-200 shadow-md">
                      {arch.age}
                    </div>

                    {/* Selected Status Badge */}
                    {isSelected ? (
                      <div 
                        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg animate-fadeIn"
                        style={{ backgroundColor: arch.primaryColor }}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Activo</span>
                      </div>
                    ) : (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/60 backdrop-blur-sm border border-slate-700/50 text-[10px] text-slate-400 group-hover:text-slate-200">
                        Click para elegir
                      </div>
                    )}

                    {/* Floating Avatar Name on Image */}
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="text-base sm:text-lg font-black text-white drop-shadow-md leading-tight">
                        {arch.name}
                      </h3>
                      <div 
                        className="text-[11px] font-bold drop-shadow mt-0.5 truncate"
                        style={{ color: arch.primaryColor }}
                      >
                        {arch.role}
                      </div>
                    </div>
                  </div>

                  {/* Character Bio Description */}
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {arch.description}
                  </p>

                  {/* Passive Ability Highlight Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-slate-400">
                      <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Habilidad Pasiva:</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1 leading-snug">
                      {arch.passiveBonusTitle}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {arch.passiveBonusDescription}
                    </p>
                  </div>
                </div>

                {/* LOWER CARD SECTION: STATS GAUGE BARS & BUTTON */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="space-y-1.5">
                    {/* Flujo Financiero */}
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5 font-medium">
                        <span className="text-slate-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-cyan-400" /> Flujo Financiero
                        </span>
                        <span className="font-bold text-cyan-300 font-mono">{arch.stats.flujo}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${arch.stats.flujo}%` }}
                        />
                      </div>
                    </div>

                    {/* Innovación */}
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5 font-medium">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-fuchsia-400" /> Innovación
                        </span>
                        <span className="font-bold text-fuchsia-300 font-mono">{arch.stats.innovacion}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-400 rounded-full transition-all duration-500"
                          style={{ width: `${arch.stats.innovacion}%` }}
                        />
                      </div>
                    </div>

                    {/* Resiliencia */}
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5 font-medium">
                        <span className="text-slate-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Resiliencia
                        </span>
                        <span className="font-bold text-emerald-300 font-mono">{arch.stats.resiliencia}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${arch.stats.resiliencia}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selection Button */}
                  <button
                    type="button"
                    id={`btn-select-avatar-${arch.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectArchetype(arch.id);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'text-slate-950 shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: isSelected ? arch.primaryColor : undefined
                    }}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>Avatar Seleccionado</span>
                      </>
                    ) : (
                      <span>Elegir a {arch.name.split(' ')[0]}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM IDENTITY & CONFIRMATION BAR */}
        <footer className="relative z-20 w-full p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* ACTIVE AVATAR RECAP */}
          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-800 lg:pr-5">
            <div 
              className="w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-950 shadow-md relative"
              style={{ borderColor: currentArchetype.primaryColor }}
            >
              <img 
                src={currentArchetype.image} 
                alt={currentArchetype.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <span>Avatar Seleccionado:</span>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: currentArchetype.primaryColor }} />
              </div>
              <div className="text-sm font-black text-white">
                {currentArchetype.name}
              </div>
              <div className="text-[11px] font-semibold truncate max-w-[200px]" style={{ color: currentArchetype.primaryColor }}>
                {currentArchetype.role}
              </div>
            </div>
          </div>

          {/* NAME & TITLE CUSTOMIZATION CONTROLS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full flex-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nombre en el Mapa:</span>
              </label>
              <input
                type="text"
                id="input-character-name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Tu Nombre o Alias"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-white text-xs outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Título Honorífico:</span>
              </label>
              <select
                id="select-character-title"
                value={characterTitle}
                onChange={(e) => setCharacterTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-cyan-300 text-xs outline-none cursor-pointer transition-colors"
              >
                {PLAYER_TITLES.map((title) => (
                  <option key={title} value={title} className="bg-slate-900 text-white">
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <div className="w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
            <button
              id="btn-confirmar-personaje"
              type="button"
              onClick={handleConfirm}
              className="w-full lg:w-auto min-w-[260px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Confirmar y Entrar al Mapa</span>
              <ArrowRight className="w-4 h-4 font-black" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
