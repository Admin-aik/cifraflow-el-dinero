import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { ARCHETYPES } from '../data/archetypes';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Coins, 
  Building2, 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  ShieldAlert,
  GraduationCap,
  Calendar,
  Layers
} from 'lucide-react';

export const PantallaFinMision: React.FC = () => {
  const { 
    studentName, 
    studentCedula, 
    studentSchool, 
    archetypeId, 
    cumulativePoints, 
    bcvRateInfo,
    resetGame,
    goToModules,
    goBack
  } = useGameStore();

  const certificateRef = useRef<HTMLDivElement>(null);
  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  useEffect(() => {
    narratorEngine.play('fin_mision');
  }, []);

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const isCumulativeNegative = cumulativePoints < 0;

  return (
    <div 
      id="pantalla-fin-mision"
      className="relative w-screen min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto select-none"
    >
      {/* BACKGROUND COSMIC AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      {/* TOP CIFRAFLOW LOGO BACK TRIGGER */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between mb-2">
        <button
          id="btn-cifraflow-finmision-back"
          onClick={() => {
            soundFx.playClick();
            goBack();
          }}
          className="group flex items-center gap-2.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer hover:scale-105 shadow-md"
          title="Haz clic en el logotipo de CifraFlow para volver a la pantalla anterior"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/60 group-hover:border-cyan-300 bg-slate-950 p-1 shadow-[0_0_12px_rgba(0,242,254,0.3)] shrink-0">
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

      {/* HEADER: FIN DE LA MISIÓN */}
      <header className="relative z-10 w-full max-w-5xl mx-auto text-center my-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/50 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
          <Trophy className="w-4 h-4 text-amber-400" />
          FASE 5 — EVALUACIÓN FINAL & SCORE CARD GENERAL
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-cyan-300 tracking-tight">
          ¡FIN DE LA MISIÓN!
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-2 font-medium">
          Has completado con éxito la simulación interactiva de CifraFlow Financiero y El Viaje del Valor: De la Sal al Bit.
        </p>
      </header>

      {/* SCORE CARD GENERAL SUMMARY TILES */}
      <section className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {/* Total Points */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-lg text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Puntos Acumulados</div>
          <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${
            isCumulativeNegative ? 'text-rose-400' : 'text-amber-300'
          }`}>
            {cumulativePoints >= 0 ? `+${cumulativePoints}` : `${cumulativePoints}`}
            <span className="text-xs font-normal text-slate-400 ml-1">pts</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Saldo Final del Cadete</div>
        </div>

        {/* Tasa BCV Cierre */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-lg text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Tasa BCV Oficial</div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-cyan-300">
            Bs. {bcvRateInfo.rate.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Fecha Valor Actual</div>
        </div>

        {/* Módulos Superados */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-lg text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Módulos Evaluados</div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-emerald-300">
            5 de 5
          </div>
          <div className="text-[10px] text-slate-400 mt-1">100% Completitud</div>
        </div>

        {/* Rango de Cyber-Cadete */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-fuchsia-500/40 shadow-lg text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Rango Otorgado</div>
          <div className="text-xl sm:text-2xl font-black font-mono mt-1 text-fuchsia-300 truncate">
            {cumulativePoints > 300 ? 'Maestro Flujo' : 'Cyber-Cadete'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Nivel Certificado</div>
        </div>
      </section>

      {/* OFFICIAL DIGITAL COMPETENCY CERTIFICATE (PRINTABLE) */}
      <section 
        ref={certificateRef}
        className="relative z-10 w-full max-w-4xl mx-auto my-4 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/60 shadow-[0_0_60px_rgba(251,191,36,0.25)] text-center overflow-hidden"
      >
        {/* Certificate Watermark and Decorative Borders */}
        <div className="absolute inset-2 border border-amber-400/20 rounded-2xl pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Seal & Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400 bg-slate-950 p-1">
            <img 
              src={CIFRAFLOW_LOGO} 
              alt="CifraFlow" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
              REPÚBLICA BOLIVARIANA DE VENEZUELA • ECOSISTEMA EDTECH
            </span>
            <span className="text-xs font-black tracking-widest text-cyan-300">
              PROGRAMA NACIONAL DE EDUCACIÓN FINANCIERA & CIBERSEGURIDAD
            </span>
          </div>

          <div className="w-12 h-12 rounded-xl border border-amber-400 bg-amber-400/10 flex items-center justify-center text-amber-300">
            <Award className="w-7 h-7" />
          </div>
        </div>

        {/* Certificate Title */}
        <div className="my-6">
          <h2 className="text-xs sm:text-sm font-mono uppercase text-slate-400 tracking-wider">
            CERTIFICADO DIGITAL DE COMPETENCIAS FINANCIERAS
          </h2>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-1">
            CifraFlow Financiero
          </div>
          <div className="text-xs text-amber-400 font-mono mt-1">
            Basado en la Obra: "El Viaje del Valor: De la Sal al Bit" • por ircar rojas
          </div>
        </div>

        {/* Recipient Details */}
        <div className="my-6 py-4 border-t border-b border-amber-400/30 max-w-2xl mx-auto space-y-2">
          <div className="text-xs text-slate-400">Se otorga el presente reconocimiento oficial a:</div>
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-200">
            {studentName}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 mt-2">
            <span className="flex items-center gap-1">
              <span className="text-amber-400">C.I.:</span> {studentCedula}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              {studentSchool}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <span className="text-fuchsia-400">Avatar:</span> {activeArchetype.name}
            </span>
          </div>
        </div>

        {/* Competencies Acquired List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto my-6 text-left">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Comprensión Lectora de Contratos Financieros</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Gestión de Cuenta Bancaria BDV & Pago Móvil</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Inversión en la Bolsa de Valores de Caracas (BVC)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Manufactura & Emprendimiento con Capital Semilla</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ciberdefensa, 2FA y Blindaje contra Fraudes</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dominio del Viaje del Valor: De la Sal al Bit</span>
          </div>
        </div>

        {/* Footer Seal & Verification Code */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <div className="text-white font-bold">Verificación Criptográfica FIDO2</div>
              <div className="text-[10px]">HASH: CF-2026-{Math.abs(cumulativePoints)}-VERIFIED</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white font-bold">FECHA DE EMISIÓN: 2026</div>
            <div className="text-[10px] text-amber-400">Tasa BCV: Bs. {bcvRateInfo.rate.toFixed(2)}</div>
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 my-6">
        <button
          id="btn-imprimir-certificado"
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all cursor-pointer hover:scale-105"
        >
          <Printer className="w-4 h-4" />
          <span>IMPRIMIR O GUARDAR CERTIFICADO DIGITAL</span>
        </button>

        <button
          id="btn-volver-modulos"
          onClick={goToModules}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          <span>EXPLORAR OTROS MÓDULOS</span>
        </button>

        <button
          id="btn-reiniciar-simulacion"
          onClick={() => {
            if (window.confirm('¿Deseas reiniciar la simulación para otro estudiante?')) {
              narratorEngine.stop();
              resetGame();
            }
          }}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>NUEVO CADETE</span>
        </button>
      </footer>
    </div>
  );
};
