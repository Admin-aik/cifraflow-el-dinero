import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { GAME_IMAGES } from '../data/gameAssets';
import { soundFx } from '../utils/audio';
import { narratorEngine } from '../utils/narrator';
import { 
  Sparkles, 
  ArrowRight, 
  Headphones, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  User, 
  Mail, 
  Compass, 
  Layers, 
  BookOpen, 
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  Gem
} from 'lucide-react';

export const PantallaLogeo: React.FC = () => {
  const { setLoginData, playerName: currentName, playerEmail: currentEmail } = useGameStore();

  const [name, setName] = useState(currentName || 'Ircar Rojas');
  const [email, setEmail] = useState(currentEmail || '');
  const [rememberMe, setRememberMe] = useState(true);
  const [gameMode, setGameMode] = useState<'story' | 'challenge'>('story');
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());

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
      narratorEngine.play('login_intro');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    narratorEngine.stop();
    setLoginData(name.trim(), email.trim());
  };

  const handleQuickGuest = () => {
    narratorEngine.stop();
    setLoginData(name.trim() || 'Viajero Cuántico', email.trim());
  };

  return (
    <div 
      id="pantalla-logeo-container"
      className="relative w-screen h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden select-none"
    >
      {/* BACKGROUND COSMIC AMBIENT & PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        
        {/* Subtle Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00f3ff 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* TOP FLOATING CONTROLS */}
      <header className="absolute top-4 left-4 right-4 max-w-6xl mx-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/40 shadow-[0_0_12px_rgba(0,242,254,0.3)] bg-slate-900 flex items-center justify-center">
            <img 
              src={CIFRAFLOW_LOGO} 
              alt="CifraFlow Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black text-cyan-300 tracking-wider">CIFRAFLOW</span>
            <span className="text-[10px] text-slate-400 block font-mono">Nexo Temporal v2.4</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Narrator Button */}
          <button
            id="btn-narrador-login"
            onClick={handleAudioNarrator}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              narratorState.isSpeaking
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                : 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border-cyan-500/30'
            }`}
            title="Escuchar audio narrado del portal temporal"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {narratorState.isSpeaking 
                ? (narratorState.isPaused ? 'Audio Pausado' : 'Narrando Bienvenida...') 
                : 'Escuchar Guía Sonora'}
            </span>
          </button>

          {/* Sound FX Mute */}
          <button
            id="btn-mute-login"
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* MAIN LOGIN CARD */}
      <div className="relative z-10 w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]">
        
        {/* LEFT COLUMN: HERO LORE & BOOK COVER */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0c1322] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          {/* Subtle glowing halo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-wide uppercase mb-3">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Fase 1 • Inicio de Sesión
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1">
              El Viaje del Valor
            </h1>
            <h2 className="text-sm font-semibold text-cyan-400 mb-3">
              De la Sal al Bit • por ircar rojas
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Embárcate en un simulador de finanzas y evolución del dinero. Atraviesa las 4 grandes eras históricas con Kai y Lia, supera acertijos y forja tu propio imperio de flujo de caja.
            </p>

            {/* Book and Mentor visual badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="w-14 h-16 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-950 shadow-md">
                <img 
                  src={GAME_IMAGES.bookCover} 
                  alt="Libro El Viaje del Valor" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  Obra Original
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Conceptos de dinero, trueque, conchas de cauri, electro y blockchain.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Eras Micro Badges */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <div className="text-[10px] uppercase font-mono text-slate-400 mb-2">Las 4 Eras del Viaje:</div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span>🐐</span> Era 1: Trueque
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <span>🧂</span> Era 2: Sal & Cauri
              </div>
              <div className="flex items-center gap-1.5 text-yellow-300 font-medium">
                <span>🦁</span> Era 3: Forja Lidia
              </div>
              <div className="flex items-center gap-1.5 text-fuchsia-300 font-medium">
                <span>⚡</span> Era 4: Bit Digital
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM & CHARACTER ENTRY */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/60 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Acceso al Nexo Temporal
                </h3>
                <p className="text-xs text-slate-400">
                  Ingresa tu nombre o alias para registrar tu huella de viajero
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded-full">
                  Paso 1 de 3
                </span>
              </div>
            </div>

            <form id="form-login-viajero" onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre del Viajero / Alias Cuántico <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    id="input-login-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ircar Rojas, Kai, Lia, Satoshi..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email Input (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Correo Electrónico / Identificador</span>
                  <span className="text-[10px] text-slate-500 font-normal">Opcional para guardar perfil</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    id="input-login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@cifraflow.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                </div>
              </div>

              {/* Game Mode Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Selecciona la Experiencia de Inicio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGameMode('story')}
                    className={`p-3 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                      gameMode === 'story'
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.15)] text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <BookOpen className={`w-4 h-4 mt-0.5 shrink-0 ${gameMode === 'story' ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Modo Historia Épica</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        Acompaña a Kai y Lia paso a paso con acertijos y narrativa completa.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGameMode('challenge')}
                    className={`p-3 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                      gameMode === 'challenge'
                        ? 'bg-fuchsia-950/50 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.15)] text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Coins className={`w-4 h-4 mt-0.5 shrink-0 ${gameMode === 'challenge' ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Desafío Financiero</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        Optimiza flujo de caja, derrota villanos de deuda y domina la banca.
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500/20"
                  />
                  <span>Recordar mi sesión en este dispositivo</span>
                </label>
              </div>

              {/* SUBMIT BUTTONS */}
              <div className="pt-3 space-y-2">
                <button
                  id="btn-iniciar-sesion"
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Crear Personaje y Personalizar</span>
                  <ArrowRight className="w-4 h-4 font-black" />
                </button>

                <button
                  id="btn-invitado-rapido"
                  type="button"
                  onClick={handleQuickGuest}
                  className="w-full py-2 px-4 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Acceso Rápido como Explorador</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Guardado local seguro
            </span>
            <span>CifraFlow Engine • Basado en el libro de ircar rojas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
