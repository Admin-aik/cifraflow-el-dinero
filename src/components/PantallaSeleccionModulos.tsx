import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { ARCHETYPES } from '../data/archetypes';
import { soundFx } from '../utils/audio';
import { narratorEngine } from '../utils/narrator';
import { RightHudScorePanel } from './RightHudScorePanel';
import { LineaHorizontalEras } from './LineaHorizontalEras';
import { 
  BookOpen, 
  Building2, 
  TrendingUp, 
  BarChart3, 
  ShieldAlert, 
  Compass, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Lock,
  Play,
  Flame,
  User
} from 'lucide-react';

export const PantallaSeleccionModulos: React.FC = () => {
  const { 
    studentName, 
    studentCedula, 
    studentSchool, 
    archetypeId, 
    startMapGameplay, 
    openModal, 
    goBack,
    finishCurrentChallenge
  } = useGameStore();

  const activeArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  const handleLaunchModule = (modalId: string, moduleTitle: string) => {
    soundFx.playPowerUp();
    startMapGameplay();
    setTimeout(() => {
      openModal(modalId);
    }, 150);
  };

  const MODULES = [
    {
      id: 'lectura',
      modalId: 'hoja_balance',
      number: 'MÓDULO 01',
      title: 'Lectura & Análisis de Contratos Financieros',
      subtitle: 'Comprensión Lectora, Cláusulas y Términos Legales',
      description: 'Aprende a desglosar contratos reales, identificar comisiones ocultas, calcular el Costo Financiero Total (CFT) y organizar tu Hoja de Balance Contable según las enseñanzas de Kai y Lia.',
      icon: BookOpen,
      color: '#38bdf8',
      borderColor: 'border-sky-500/40',
      bgColor: 'bg-sky-950/20',
      skills: ['Lectura Crítica', 'Hoja de Balance', 'Activos vs Pasivos']
    },
    {
      id: 'banca',
      modalId: 'bancos',
      number: 'MÓDULO 02',
      title: 'Banca Digital Fintech & Primera Cuenta',
      subtitle: 'Banco de Venezuela (BDV), Débito & Ahorro Institucional',
      description: 'Abre y gestiona tu primera cuenta bancaria digital, configura tu tarjeta de débito virtual, programa transferencias Pago Móvil y compara tasas pasivas frente a créditos para blindar tu liquidez.',
      icon: Building2,
      color: '#00f3ff',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/20',
      skills: ['Apertura Digital', 'Pago Móvil', 'Interés Compuesto']
    },
    {
      id: 'carpinteria',
      modalId: 'carpinteria',
      number: 'MÓDULO 03',
      title: 'Emprendimiento & Manufactura Real',
      subtitle: 'Taller de Carpintería de Mateo, Costos y Ganancia',
      description: 'Transforma materia prima, madera y engranajes en bienes de alto valor agregado. Desglosa costos de mano de obra, insumos y margen de ganancia neta para construir tu capital semilla.',
      icon: TrendingUp,
      color: '#34d399',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-950/20',
      skills: ['Cálculo de Costos', 'Margen Neto', 'Capital Semilla']
    },
    {
      id: 'bolsa',
      modalId: 'bolsa',
      number: 'MÓDULO 04',
      title: 'Bolsa de Valores de Caracas (BVC)',
      subtitle: 'Piso de Remates, Acciones Venezolanas & Dividendos',
      description: 'Invierte en las empresas más emblemáticas de Venezuela: Ron Santa Teresa, Banco Provincial, Mercantil y CANTV. Adquiere participaciones reales y cobra dividendos en Bolívares y Dólares.',
      icon: BarChart3,
      color: '#fbbf24',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-950/20',
      skills: ['Renta Variable', 'Rendimiento por Dividendo', 'Inversión Real']
    },
    {
      id: 'ciberseguridad',
      modalId: 'defensa',
      number: 'MÓDULO 05',
      title: 'Ciberdefensa Financiera & Escudo Anti-Fraude',
      subtitle: 'Combate contra Deuda Fantasma, Phishing e Inflación',
      description: 'Enfrenta a los villanos cibernéticos que drenan tu dinero. Aplica autenticación en dos factores (2FA), auditoría forense de transacciones y escudo de gasto para blindar tu patrimonio.',
      icon: ShieldAlert,
      color: '#c084fc',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-950/20',
      skills: ['Defensa 2FA', 'Cero Phishing', 'Detección de Estafas']
    }
  ];

  return (
    <div 
      id="pantalla-seleccion-modulos"
      className="relative w-screen min-h-screen bg-[#030712] text-slate-100 flex flex-col p-4 sm:p-6 overflow-x-hidden select-none"
    >
      {/* PERSISTENT RIGHT HUD WITH SCORE & BCV RATE */}
      <RightHudScorePanel />

      {/* HEADER SECTION */}
      <header className="relative w-full max-w-6xl mx-auto flex items-center justify-between gap-4 pb-4 border-b border-slate-800 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Volver a la selección de personaje"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Atrás</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              goBack();
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-left hover:opacity-95 transition-all p-1 rounded-2xl hover:bg-slate-800/60"
            title="Haz clic en el logotipo de CifraFlow para volver a la pantalla anterior"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/60 group-hover:border-cyan-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,243,255,0.3)] bg-slate-950 p-1 transition-all">
              <img 
                src={CIFRAFLOW_LOGO} 
                alt="CifraFlow Logo - Volver" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  CifraFlow Financiero
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  Volver Atrás
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ecosistema Pedagógico de Módulos & Eras
              </p>
            </div>
          </button>
        </div>

        {/* ACTIVE CADETE BADGE */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400">
            <img 
              src={activeArchetype.image} 
              alt={activeArchetype.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">{studentName}</div>
            <div className="text-[10px] text-cyan-400 font-mono">{activeArchetype.name} • {studentCedula}</div>
          </div>
        </div>
      </header>

      {/* LINEA HORIZONTAL DE LAS ERAS (ORDEN CORRELATIVO Y MISIÓN SECUENCIAL) */}
      <LineaHorizontalEras />

      {/* TOP HERO BUTTON: ENTER DIRECTLY INTO THE 3D TIME MAP */}
      <section className="relative w-full max-w-6xl mx-auto my-5">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-fuchsia-950/80 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,243,255,0.15)]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Mapa Completo de las Eras Financieras 3D
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-900/60 border border-fuchsia-400/50 text-fuchsia-200">
                  Experiencia Inmersiva
                </span>
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mt-0.5">
                Navega libremente entre el Mercado del Trueque, Almacén de Sal & Cauri, Forja de Lidia, Red Blockchain y Distrito Bancario con flujo de caja activo.
              </p>
            </div>
          </div>

          <button
            id="btn-entrar-mapa-3d"
            onClick={startMapGameplay}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all cursor-pointer hover:scale-105 shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>EXPLORAR MAPA 3D</span>
          </button>
        </div>
      </section>

      {/* 5 EDUCATIONAL MODULE CARDS */}
      <main className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
        {MODULES.map((mod) => {
          const IconComp = mod.icon;
          return (
            <div
              key={mod.id}
              className={`p-5 rounded-2xl border ${mod.borderColor} ${mod.bgColor} backdrop-blur-md flex flex-col justify-between hover:scale-[1.01] transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
                    {mod.number}
                  </span>
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-md"
                    style={{ borderColor: mod.color, backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  {mod.title}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mt-1 mb-2">
                  {mod.subtitle}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {mod.description}
                </p>
              </div>

              <div>
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Launch Module Button */}
                <button
                  id={`btn-lanzar-${mod.id}`}
                  onClick={() => handleLaunchModule(mod.modalId, mod.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                >
                  <span>INGRESAR AL RETO</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}

        {/* 6TH CARD: TRIVIA DE DECISIONES CON CONTADOR */}
        <div className="p-5 rounded-2xl border border-fuchsia-500/40 bg-fuchsia-950/20 backdrop-blur-md flex flex-col justify-between hover:scale-[1.01] transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-fuchsia-400">
                EVALUACIÓN CONTINUA
              </span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-fuchsia-400 bg-fuchsia-500/10 text-fuchsia-300 shadow-md">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-fuchsia-300 transition-colors leading-tight">
              Desafío de Decisiones & Inversión
            </h3>
            <div className="text-xs font-semibold text-slate-400 mt-1 mb-2">
              Acierto: +150 Pts • Error: -50 Pts (Admite Negativo)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Pon a prueba tus conocimientos en cada era y módulo. Si fallas, no se revelará la respuesta correcta para que profundices tu análisis. Tus puntos alimentan el Fondo de Inversión.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300">
                Retos Evaluativos
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300">
                Puntuación Negativa
              </span>
            </div>

            <button
              id="btn-lanzar-trivia"
              onClick={() => handleLaunchModule('trivia_decisiones', 'Trivia de Decisiones')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-fuchsia-900/40"
            >
              <span>INICIAR DESAFÍO DE PREGUNTAS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
