import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { CIFRAFLOW_LOGO, CIFRAFLOW_TEAM_BANNER } from '../data/archetypes';
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
  GraduationCap, 
  CreditCard,
  BookOpen, 
  Building2, 
  TrendingUp, 
  BarChart3, 
  ShieldAlert,
  RefreshCw,
  Clock,
  Coins,
  ChevronRight
} from 'lucide-react';

export const PantallaLogeo: React.FC = () => {
  const { 
    setStudentData, 
    studentName: currentName, 
    studentCedula: currentCedula, 
    studentSchool: currentSchool,
    bcvRateInfo,
    refreshBcvRate,
    levelPoints,
    cumulativePoints,
    textScale,
    setTextScale,
    goBack,
    phaseHistory
  } = useGameStore();

  const [name, setName] = useState(currentName || 'Ircar Rojas');
  const [cedula, setCedula] = useState(currentCedula || 'V-31.450.820');
  const [school, setSchool] = useState(currentSchool || 'Liceo Nacional de Ciencias y Tecnología');
  const [isRefreshingBcv, setIsRefreshingBcv] = useState(false);
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
      narratorEngine.play('login_fase0');
    }
  };

  const handleRefreshBcv = async () => {
    setIsRefreshingBcv(true);
    await refreshBcvRate();
    setTimeout(() => setIsRefreshingBcv(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    narratorEngine.stop();
    setStudentData(name.trim(), cedula.trim(), school.trim());
  };

  return (
    <div 
      id="pantalla-logeo-container"
      className="relative w-screen min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-start p-3 sm:p-5 md:p-6 overflow-x-hidden select-none"
    >
      {/* BACKGROUND COSMIC AMBIENT & PARTICLES */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        
        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00f3ff 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* TOP FLOATING CONTROLS & BCV RATE BAR */}
      <header className="relative w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 z-20 mb-3 bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 px-4 py-2.5 rounded-2xl">
        {/* LOGO & BRAND */}
        <button
          id="btn-cifraflow-login-back"
          onClick={() => {
            soundFx.playClick();
            goBack();
          }}
          className="flex items-center gap-3 text-left group cursor-pointer hover:opacity-95 transition-all p-1 rounded-xl hover:bg-slate-800/40"
          title="Logotipo CifraFlow - Volver a la pantalla anterior"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 group-hover:border-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:scale-105 bg-slate-950 flex items-center justify-center transition-transform">
            <img 
              src={CIFRAFLOW_LOGO} 
              alt="CifraFlow Logo - Volver" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 group-hover:text-cyan-300">
                CIFRAFLOW FINANCIERO
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold group-hover:border-cyan-300">
                Volver Atrás
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block font-mono">Haz clic para volver a la pantalla anterior</span>
          </div>
        </button>

        {/* BCV REAL-TIME BADGE */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-amber-500/30 px-3 py-1.5 rounded-xl shadow-inner">
          <Coins className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <span>BCV OFICIAL (WEB EN VIVO)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>1 USD = Bs. {bcvRateInfo.rate.toFixed(2)}</span>
              <span className="text-[9px] text-emerald-400/80 font-mono">({bcvRateInfo.updateHour})</span>
            </div>
          </div>
          <button
            id="btn-refresh-bcv"
            onClick={handleRefreshBcv}
            disabled={isRefreshingBcv}
            className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
            title="Actualizar tasa BCV en tiempo real"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingBcv ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>

        {/* TEXT SCALE & AUDIO CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Text scale accessibility selector */}
          <div className="flex items-center bg-slate-950/90 border border-slate-700/60 rounded-xl p-0.5 text-xs font-mono">
            <button
              onClick={() => setTextScale('small')}
              className={`px-2 py-1 rounded-lg transition-all ${textScale === 'small' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Texto Pequeño (90%)"
            >
              A-
            </button>
            <button
              onClick={() => setTextScale('normal')}
              className={`px-2 py-1 rounded-lg transition-all ${textScale === 'normal' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Texto Normal (100%)"
            >
              A
            </button>
            <button
              onClick={() => setTextScale('large')}
              className={`px-2 py-1 rounded-lg transition-all ${textScale === 'large' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Texto Grande (115%)"
            >
              A+
            </button>
            <button
              onClick={() => setTextScale('xlarge')}
              className={`px-2 py-1 rounded-lg transition-all ${textScale === 'xlarge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Texto Extra Grande (130%)"
            >
              A++
            </button>
          </div>

          {/* Audio Narrator Button */}
          <button
            id="btn-narrador-login"
            onClick={handleAudioNarrator}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              narratorState.isSpeaking
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.6)] animate-pulse'
                : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/30'
            }`}
            title="Escuchar locución en Español Latinoamericano Neutro"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {narratorState.isSpeaking 
                ? (narratorState.isPaused ? 'Pausado' : 'Narrando...') 
                : 'Voz Guía'}
            </span>
          </button>

          {/* Sound FX Mute */}
          <button
            id="btn-mute-login"
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:bg-slate-800 text-slate-300 transition-colors"
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* 1. BANNER PRINCIPAL (ILUSTRACIÓN Y EQUIPO DE AVATARES ADOLESCENTES) */}
      <section 
        id="banner-equipo-adolescente" 
        className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_40px_rgba(0,243,255,0.25)] bg-slate-950 mb-4"
      >
        <div className="relative w-full h-48 sm:h-64 md:h-76 lg:h-84 overflow-hidden">
          <img 
            src={CIFRAFLOW_TEAM_BANNER} 
            alt="Equipo CifraFlow: Jorge, Ircar, Iván y Carlos" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />

          {/* Holographic overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />

          {/* Holographic Shield Banner Center */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/60 shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                <span className="text-[10px] font-black text-slate-950">∞</span>
              </div>
              <span className="text-xs font-black tracking-widest text-cyan-300">
                ESCUDO CENTRAL CIFRAFLOW
              </span>
            </div>
          </div>

          {/* Bottom Identification Tags for the 4 Teen Avatars */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center sm:justify-between gap-2 z-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {/* Jorge */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-400 text-cyan-300 flex items-center gap-2 text-xs font-bold shadow-[0_0_12px_rgba(0,243,255,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" />
                <span>Jorge (Cian)</span>
                <span className="text-[10px] text-cyan-400/80 hidden md:inline">• Operador Táctico</span>
              </div>

              {/* Ircar */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-fuchsia-500 text-fuchsia-300 flex items-center gap-2 text-xs font-bold shadow-[0_0_12px_rgba(255,0,127,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f]" />
                <span>Ircar (Rosa / Magenta)</span>
                <span className="text-[10px] text-fuchsia-400/80 hidden md:inline">• Especialista Cloud</span>
              </div>

              {/* Iván */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-400 text-emerald-300 flex items-center gap-2 text-xs font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                <span>Iván (Verde)</span>
                <span className="text-[10px] text-emerald-400/80 hidden md:inline">• Auditor Forense</span>
              </div>

              {/* Carlos */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-amber-400 text-amber-300 flex items-center gap-2 text-xs font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]" />
                <span>Carlos (Dorado)</span>
                <span className="text-[10px] text-amber-400/80 hidden md:inline">• Estratega BVC</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Avatares Adolescentes Activos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. ENCABEZADO DE FASE, TÍTULO Y DESCRIPCIÓN OFICIAL HOMOGÉNEA */}
      <section className="relative w-full max-w-6xl mx-auto text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          FASE 0 — REGISTRO E INGRESO AL ECOSISTEMA UNIFICADO
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
          CifraFlow Financiero
        </h1>

        {/* Official Description in Single Uniform Neon Silver / Crystal White */}
        <p className="text-sm sm:text-base max-w-3xl mx-auto font-medium text-[#e2e8f0] leading-relaxed px-2">
          "Plataforma interactiva de simulación que integra Comprensión Lectora, Primera Cuenta Bancaria, Emprendimiento, Bolsa de Valores de Caracas (BVC) y Ciberseguridad Real."
        </p>
      </section>

      {/* 4. MÓDULOS / PILARES DEL ECOSISTEMA (5 TARJETAS) */}
      <section className="relative w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
        {/* 1. Lectura & Contratos */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 transition-all flex items-center gap-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-200">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-200">Lectura & Contratos</div>
            <div className="text-[10px] text-slate-400 font-mono">Cláusulas & Comprensión</div>
          </div>
        </div>

        {/* 2. Banca Fintech */}
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2.5 shadow-[0_0_12px_rgba(0,243,255,0.1)]">
          <div className="w-8 h-8 rounded-lg bg-cyan-900/60 border border-cyan-400/60 flex items-center justify-center text-cyan-300">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-cyan-300">Banca Fintech</div>
            <div className="text-[10px] text-cyan-400/70 font-mono">BDV & Primera Cuenta</div>
          </div>
        </div>

        {/* 3. Emprendimiento */}
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-2.5 shadow-[0_0_12px_rgba(52,211,153,0.1)]">
          <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-400/60 flex items-center justify-center text-emerald-300">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-emerald-300">Emprendimiento</div>
            <div className="text-[10px] text-emerald-400/70 font-mono">Carpintería & Manufactura</div>
          </div>
        </div>

        {/* 4. Bolsa BVC */}
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 transition-all flex items-center gap-2.5 shadow-[0_0_12px_rgba(251,191,36,0.1)]">
          <div className="w-8 h-8 rounded-lg bg-amber-900/60 border border-amber-400/60 flex items-center justify-center text-amber-300">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-amber-300">Bolsa BVC</div>
            <div className="text-[10px] text-amber-400/70 font-mono">Acciones de Caracas</div>
          </div>
        </div>

        {/* 5. Ciberseguridad */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 transition-all flex items-center gap-2.5 col-span-2 sm:col-span-1 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
          <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-400/60 flex items-center justify-center text-purple-300">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-purple-300">Ciberseguridad</div>
            <div className="text-[10px] text-purple-400/70 font-mono">Defensa Anti-Fraude</div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER: STUDENT REGISTRATION FORM + PEDAGOGICAL LORE CARD */}
      <main className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        
        {/* LEFT COLUMN: FORMULARIO DE INGRESO DEL ESTUDIANTE */}
        <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-[0_0_35px_rgba(0,0,0,0.7)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Registro de Cyber-Cadete Estudiante
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ingresa tus datos académicos para vincular tu progreso al Certificado Digital
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300">
                Paso 1: Credencial
              </span>
            </div>

            <form id="form-registro-estudiante" onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Nombre del Estudiante */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  1. Nombre Completo del Estudiante <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    id="input-student-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ircar Rojas, Carlos Mendoza, Jorge Silva..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. Cédula de Identidad */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  2. Cédula de Identidad <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    id="input-student-cedula"
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ej. V-31.450.820"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 3. Institución Educativa */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  3. Institución Educativa (Liceo, Colegio o Universidad) <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    id="input-student-school"
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Ej. Liceo Nacional de Ciencias, UCV, Colegio San Ignacio..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  id="btn-ingresar-fase1"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.7)] transition-all cursor-pointer"
                >
                  <span>REGISTRAR E INGRESAR A SELECCIÓN DE AVATAR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certificación Académica Digital Oficial
            </span>
            <span className="font-mono text-cyan-400">CIFRAFLOW 2026</span>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW OF RIGHT-SIDE HUD & BOOK LORE PRESERVATION */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* RIGHT-SIDE HUD PREVIEW CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0c1322] border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                RECUADRO DERECHO (RIGHT-SIDE HUD)
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Inicializado en 0 pts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-3">
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Puntaje del Reto</div>
                <div className="text-xl font-black text-cyan-300 font-mono">
                  {levelPoints >= 0 ? `+${levelPoints}` : `${levelPoints}`} Pts
                </div>
                <div className="text-[9px] text-slate-500">Acierto +150 / Error -50</div>
              </div>

              <div className="text-left border-l border-slate-800 pl-3">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Total Acumulado</div>
                <div className="text-xl font-black text-fuchsia-300 font-mono">
                  {cumulativePoints >= 0 ? `+${cumulativePoints}` : `${cumulativePoints}`} Pts
                </div>
                <div className="text-[9px] text-slate-500">Admite valores negativos</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              El HUD derecho permanecerá visible durante todo el juego registrando la suma acumulativa ininterrumpida de reto en reto. Los fallos restan puntos y pueden llevar el marcador a saldo negativo.
            </p>
          </div>

          {/* VIAJE DEL VALOR LORE PRESERVATION */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-[0_0_25px_rgba(0,0,0,0.5)] flex items-center gap-4">
            <div className="w-16 h-22 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-950 shadow-md">
              <img 
                src={GAME_IMAGES.bookCover} 
                alt="El Viaje del Valor: De la Sal al Bit" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                El Viaje del Valor: De la Sal al Bit
              </div>
              <div className="text-[11px] text-cyan-400 font-medium mt-0.5">
                Por ircar rojas • Contenidos Académicos
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">
                Preservación integral de las 4 Eras históricas: Trueque, Sal & Cauri, Forja de Lidia y Red Digital Blockchain.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
