import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ARCHETYPES, STARTER_RELICS, PLAYER_TITLES } from '../data/archetypes';
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
  Award, 
  Compass,
  User,
  Crown,
  Flame,
  Info
} from 'lucide-react';

export const PantallaCreacionPersonaje: React.FC = () => {
  const { 
    playerName: storedName, 
    playerTitle: storedTitle, 
    archetypeId: storedArchetype, 
    selectedRelic: storedRelic,
    completeCharacterCreation,
    goToLogin
  } = useGameStore();

  const [selectedArchId, setSelectedArchId] = useState<ArchetypeId>(storedArchetype || 'streamer');
  const [characterName, setCharacterName] = useState(storedName || 'Ircar Rojas');
  const [characterTitle, setCharacterTitle] = useState(storedTitle || PLAYER_TITLES[0]);
  const [selectedRelicId, setSelectedRelicId] = useState(storedRelic || 'cencerro_cabra');
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());

  const currentArchetype = ARCHETYPES.find(a => a.id === selectedArchId) || ARCHETYPES[0];
  const currentRelic = STARTER_RELICS.find(r => r.id === selectedRelicId) || STARTER_RELICS[0];

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
    soundFx.playClick();
    setSelectedArchId(id);
  };

  const handleSelectRelic = (id: string) => {
    soundFx.playPowerUp();
    setSelectedRelicId(id);
  };

  const handleConfirm = () => {
    narratorEngine.stop();
    completeCharacterCreation({
      archetypeId: selectedArchId,
      playerName: characterName.trim() || 'Viajero Cuántico',
      playerTitle: characterTitle,
      selectedRelic: selectedRelicId
    });
  };

  return (
    <div 
      id="pantalla-creacion-personaje-container"
      className="relative w-screen h-screen bg-[#030712] text-slate-100 flex flex-col p-4 sm:p-6 overflow-y-auto overflow-x-hidden select-none"
    >
      {/* BACKGROUND COSMIC AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentArchetype.primaryColor }}
        />
        <div 
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 transition-all duration-700"
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
      <header className="relative z-20 max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={goToLogin}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Volver a la pantalla de logeo"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white">
                Forja de Personaje & Identidad
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/40">
                Paso 2 de 3
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personaliza tu avatar, título y reliquia de inicio para viajar al Mapa de las Eras
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Narrator */}
          <button
            onClick={handleAudioNarrator}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
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
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* MAIN BUILDER CONTENT */}
      <main className="relative z-10 max-w-6xl w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
        
        {/* LEFT COLUMN: ARCHETYPE CARDS SELECTION (7 Cols) */}
        <section className="lg:col-span-7 space-y-4">
          
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              1. Selecciona tu Arquetipo Generacional
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCHETYPES.map((arch) => {
                const isSelected = arch.id === selectedArchId;
                return (
                  <div
                    key={arch.id}
                    onClick={() => handleSelectArchetype(arch.id)}
                    className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.25)] ring-1 ring-cyan-400/50 scale-[1.01]'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Active check badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border relative shadow-md"
                        style={{ borderColor: isSelected ? arch.primaryColor : '#334155' }}
                      >
                        <img 
                          src={arch.image} 
                          alt={arch.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                          {arch.name}
                          <span className="text-[10px] text-slate-400 font-normal">({arch.age})</span>
                        </h3>
                        <div 
                          className="text-[11px] font-medium leading-tight mt-0.5"
                          style={{ color: arch.primaryColor }}
                        >
                          {arch.role}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                          {arch.description}
                        </p>
                      </div>
                    </div>

                    {/* Passive Bonus Pill */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                      <div className="text-[9px] uppercase font-mono text-slate-400">Habilidad Pasiva:</div>
                      <div className="text-[10px] text-slate-300 font-semibold mt-0.5 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="text-white">{arch.passiveBonusTitle}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. STARTER RELIC / AMULET SELECTION */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-fuchsia-400" />
              2. Elige tu Reliquia del Tiempo (Bono de Inicio)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STARTER_RELICS.map((relic) => {
                const isSelected = relic.id === selectedRelicId;
                return (
                  <button
                    type="button"
                    key={relic.id}
                    onClick={() => handleSelectRelic(relic.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-fuchsia-950/40 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.25)] text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{relic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200 truncate">{relic.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-fuchsia-300 font-mono font-bold mt-0.5">
                        {relic.bonusStat}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                        {relic.bonusDescription}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. CUSTOMIZE NAME & TITLE */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              3. Identificador de Avatar & Rango Temporal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nombre en el Mapa de las Eras
                </label>
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Tu Nombre o Alias"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título Honorífico
                </label>
                <select
                  value={characterTitle}
                  onChange={(e) => setCharacterTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-cyan-300 text-xs outline-none cursor-pointer"
                >
                  {PLAYER_TITLES.map((title) => (
                    <option key={title} value={title} className="bg-slate-900 text-white">
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: HOLOGRAPHIC PASSPORT PREVIEW & CONFIRM (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Holographic Passport Card */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#040814] border border-cyan-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Top glowing line */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
              style={{ backgroundColor: currentArchetype.primaryColor }}
            />

            {/* Passport Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase font-bold text-white">Pasaporte del Viajero</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Verificado
              </span>
            </div>

            {/* Character Spotlight */}
            <div className="flex items-center gap-4 my-4">
              <div 
                className="w-20 h-24 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-950 shadow-lg relative"
                style={{ borderColor: currentArchetype.primaryColor }}
              >
                <img 
                  src={currentArchetype.image} 
                  alt={currentArchetype.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono text-cyan-400">Viajero Principal</div>
                <h3 className="text-base font-black text-white truncate">
                  {characterName || currentArchetype.name}
                </h3>
                <div className="text-xs font-medium text-amber-300 truncate">
                  {characterTitle}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Arquetipo: <span className="text-white font-semibold">{currentArchetype.name}</span>
                </div>
              </div>
            </div>

            {/* Stats Bars */}
            <div className="space-y-2 py-3 border-t border-b border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Parámetros del Viajero:</div>
              
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-300 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-cyan-400" /> Flujo Financiero
                  </span>
                  <span className="font-bold text-cyan-300">{currentArchetype.stats.flujo}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500 rounded-full"
                    style={{ width: `${currentArchetype.stats.flujo}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-fuchsia-400" /> Innovación & Adaptación
                  </span>
                  <span className="font-bold text-fuchsia-300">{currentArchetype.stats.innovacion}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-400 transition-all duration-500 rounded-full"
                    style={{ width: `${currentArchetype.stats.innovacion}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Resiliencia a la Deuda
                  </span>
                  <span className="font-bold text-emerald-300">{currentArchetype.stats.resiliencia}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                    style={{ width: `${currentArchetype.stats.resiliencia}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Selected Relic Summary */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
              <span className="text-2xl">{currentRelic.icon}</span>
              <div className="text-[11px] min-w-0">
                <div className="font-bold text-white truncate">{currentRelic.name}</div>
                <div className="text-[10px] text-fuchsia-300 font-mono">{currentRelic.bonusStat}</div>
              </div>
            </div>
          </div>

          {/* CONFIRM AND ENTER MAP BUTTON */}
          <div className="space-y-2 pt-2">
            <button
              id="btn-confirmar-personaje"
              type="button"
              onClick={handleConfirm}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-teal-400 hover:from-fuchsia-500 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(217,70,239,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Confirmar y Entrar al Mapa de las Eras</span>
              <ArrowRight className="w-5 h-5 font-black" />
            </button>

            <div className="text-center text-[10px] text-slate-500">
              Podrás ver tu perfil o ajustar tu arquetipo en cualquier momento desde el mapa.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
