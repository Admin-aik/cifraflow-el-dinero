import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { 
  TrendingUp, 
  Award, 
  HelpCircle, 
  ShieldAlert, 
  Hammer, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Building2, 
  Briefcase, 
  History, 
  ChevronRight,
  Info,
  X
} from 'lucide-react';

export const ContadorInversionModal: React.FC = () => {
  const activeModal = useGameStore(s => s.activeModal);
  const closeModal = useGameStore(s => s.closeModal);
  const openModal = useGameStore(s => s.openModal);
  const ledger = useGameStore(s => s.investmentLedger);
  const cash = useGameStore(s => s.cash);
  const prestigePoints = useGameStore(s => s.prestigePoints);
  const monthlyPassiveIncome = useGameStore(s => s.monthlyPassiveIncome);
  const stocks = useGameStore(s => s.stocks);
  const investFundInStock = useGameStore(s => s.investFundInStock);
  const investInProductiveProject = useGameStore(s => s.investInProductiveProject);

  const [activeTab, setActiveTab] = useState<'balance' | 'reglas' | 'invertir' | 'historial'>('balance');

  if (activeModal !== 'contador_inversion') return null;

  const totalAnswers = ledger.stats.answers.correctCount + ledger.stats.answers.wrongCount;
  const accuracyRate = totalAnswers > 0 
    ? Math.round((ledger.stats.answers.correctCount / totalAnswers) * 100) 
    : 100;

  const productiveProjects = [
    {
      id: 'proj_taller_mateo',
      name: 'Expansión Taller Mateo (Carpintería & Forja)',
      cost: 150,
      monthlyReturn: 18,
      icon: '🪵',
      description: 'Nuevas sierras y hornos de cobre para duplicar el valor de la madera y herramientas.'
    },
    {
      id: 'proj_red_nodos',
      name: 'Nodos Cuánticos Bit Digital',
      cost: 280,
      monthlyReturn: 35,
      icon: '⚡',
      description: 'Infraestructura de validación para transacciones descentralizadas y seguras.'
    },
    {
      id: 'proj_microcredito_bdv',
      name: 'Fondo de Microcréditos Emprendedores BDV',
      cost: 200,
      monthlyReturn: 24,
      icon: '🏛️',
      description: 'Financiamiento para comerciantes locales con retorno mensual garantizado.'
    }
  ];

  return (
    <div 
      id="modal-contador-inversion"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="title-contador-inversion"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 id="title-contador-inversion" className="text-xl md:text-2xl font-black text-amber-100 flex items-center gap-2">
                Conteo de Puntos & Fondo de Inversión
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  En Vivo
                </span>
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Gana puntos con respuestas afirmativas, ataques y construcción. Evita errores para no perder puntos.
              </p>
            </div>
          </div>
          <button
            id="btn-close-contador-inversion"
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar ventana de conteo de inversión"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6 bg-slate-900/60 border-b border-slate-800">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30">
            <span className="text-xs text-amber-300/80 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Puntos Inversión
            </span>
            <div className="text-2xl font-black text-amber-300 mt-1">
              {ledger.totalInvestmentPoints} <span className="text-xs font-normal text-amber-400">Pts</span>
            </div>
            <span className="text-[11px] text-slate-400">Puntaje neto acumulado</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
            <span className="text-xs text-emerald-300/80 font-medium flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Fondo Inversión
            </span>
            <div className="text-2xl font-black text-emerald-300 mt-1">
              ${ledger.investmentFund}
            </div>
            <span className="text-[11px] text-slate-400">Capital disponible para desplegar</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30">
            <span className="text-xs text-indigo-300/80 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aciertos Trivia
            </span>
            <div className="text-2xl font-black text-indigo-300 mt-1">
              {ledger.stats.answers.correctCount} <span className="text-xs font-normal text-slate-400">({accuracyRate}%)</span>
            </div>
            <span className="text-[11px] text-slate-400">{ledger.stats.answers.wrongCount} fallos registrados</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30">
            <span className="text-xs text-cyan-300/80 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Flujo Pasivo
            </span>
            <div className="text-2xl font-black text-cyan-300 mt-1">
              +${monthlyPassiveIncome} <span className="text-xs font-normal text-slate-400">/tick</span>
            </div>
            <span className="text-[11px] text-slate-400">Retorno de activos comprados</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 gap-2">
          <button
            id="tab-balance-inversion"
            onClick={() => setActiveTab('balance')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'balance' 
                ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Desglose en Vivo
          </button>
          <button
            id="tab-reglas-inversion"
            onClick={() => setActiveTab('reglas')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'reglas' 
                ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" /> Reglas de Puntuación
          </button>
          <button
            id="tab-invertir-inversion"
            onClick={() => setActiveTab('invertir')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'invertir' 
                ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Desplegar Inversión
          </button>
          <button
            id="tab-historial-inversion"
            onClick={() => setActiveTab('historial')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'historial' 
                ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" /> Auditoría ({ledger.recentEvents.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: DESGLOSE EN VIVO */}
          {activeTab === 'balance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Respuestas Afirmativas vs Contrarias */}
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-400" /> Respuestas & Decisiones
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                        {ledger.stats.answers.pointsGained - ledger.stats.answers.pointsLost >= 0 ? '+' : ''}
                        {ledger.stats.answers.pointsGained - ledger.stats.answers.pointsLost} pts netos
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-emerald-300">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Afirmativas / Acertadas ({ledger.stats.answers.correctCount}):
                        </span>
                        <span className="font-bold">+{ledger.stats.answers.pointsGained} Pts</span>
                      </div>
                      <div className="flex items-center justify-between text-rose-300">
                        <span className="flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          Contrarias / Erróneas ({ledger.stats.answers.wrongCount}):
                        </span>
                        <span className="font-bold">-{ledger.stats.answers.pointsLost} Pts</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="btn-abrir-preguntas-desde-conteo"
                    onClick={() => openModal('trivia_decisiones')}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Responder Preguntas de Valor <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Ataque & Ciberdefensa */}
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-purple-400" /> Ataque & Ciberdefensa
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                        {ledger.stats.attacks.pointsGained - ledger.stats.attacks.pointsLost >= 0 ? '+' : ''}
                        {ledger.stats.attacks.pointsGained - ledger.stats.attacks.pointsLost} pts netos
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-purple-300">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                          Golpes & Monstruos ({ledger.stats.attacks.hitsCount} golpes):
                        </span>
                        <span className="font-bold">+{ledger.stats.attacks.pointsGained} Pts</span>
                      </div>
                      <div className="flex items-center justify-between text-rose-300">
                        <span className="flex items-center gap-1.5">
                          <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                          Drenajes de Monstruo:
                        </span>
                        <span className="font-bold">-{ledger.stats.attacks.pointsLost} Pts</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="btn-abrir-defensa-desde-conteo"
                    onClick={() => openModal('defensa_fraude')}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Ir al Campo de Ciberdefensa <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Construcción Productiva */}
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <Hammer className="w-4 h-4 text-amber-400" /> Construcción & Taller
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300">
                        +{ledger.stats.construction.pointsGained} pts netos
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-amber-300">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                          Bienes Fabricados ({ledger.stats.construction.craftedCount} u):
                        </span>
                        <span className="font-bold">+{ledger.stats.construction.pointsGained} Pts</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Valor agregado tangible:</span>
                        <span className="font-semibold text-slate-300">+${ledger.stats.construction.craftedCount * 35}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="btn-abrir-taller-desde-conteo"
                    onClick={() => openModal('carpinteria')}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Construir en Taller Mateo <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Inversiones Realizadas */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-slate-100 text-sm md:text-base">
                      Estado de tu Portafolio de Inversión
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                    ${ledger.stats.investments.totalInvestedCash} Total Desplegado
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    <span className="text-slate-400">Acciones BVC Compradas:</span>
                    <p className="text-base font-black text-slate-100 mt-0.5">{ledger.stats.investments.stocksBoughtCount} títulos</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    <span className="text-slate-400">Proyectos Financiados:</span>
                    <p className="text-base font-black text-slate-100 mt-0.5">{ledger.stats.investments.projectsFundedCount} iniciativas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    <span className="text-slate-400">Retorno Pasivo de Inversión:</span>
                    <p className="text-base font-black text-emerald-400 mt-0.5">+${ledger.stats.investments.passiveReturnGenerated.toFixed(2)}/tick</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGLAS DE PUNTUACIÓN */}
          {activeTab === 'reglas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs md:text-sm">
                <p className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Mecánica Central del Juego:
                </p>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Cada acción que fortalece tu entendimiento financiero suma puntos y capital a tu fondo de inversión. Las decisiones contrarias, los fraudes no defendidos y los errores conllevan deducción directa de puntos y penalización de capital.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Afirmativas / Ganancias */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                  <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4" /> Cómo Ganar Puntos & Capital
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Respuestas Afirmativas Correctas:</strong> +100 a +150 Puntos y +$80 a +$150 de capital para inversión por cada acierto pedagógico.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Ataque Exitoso a Fraude:</strong> +60 Puntos por impacto certero con 2FA/Láser. Al neutralizar un monstruo obtienes +250 Pts y +$200.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Construcción Productiva:</strong> +75 Puntos de Inversión y +$35 de valor tangible por cada herramienta o mueble construido en el taller.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Despliegue de Inversión:</strong> +50 a +100 Puntos por adquirir acciones o financiar proyectos productivos.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Contrarias / Pérdidas */}
                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-3">
                  <h3 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4" /> Cómo se Pierden Puntos & Capital
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300">Respuestas Contrarias / Erróneas:</strong> Pérdida de -50 a -80 Puntos y penalización de -$30 a -$60 por elegir afirmaciones financieras erradas.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300">Drenaje de Monstruos de Fraude:</strong> -25 Puntos y -$15 a -$20 si el monstruo ataca o drena liquidez sin que apliques defensas.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300">Desbalance en Hoja Contable:</strong> Desbalancear Activos y Pasivos bloquea el progreso y te expone a fricciones de liquidez.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESPLEGAR INVERSIÓN */}
          {activeTab === 'invertir' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Fondo Disponible para Inversión</span>
                  <p className="text-2xl font-black text-emerald-300">${ledger.investmentFund}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Puntos de Prestigio</span>
                  <p className="text-2xl font-black text-amber-300">{prestigePoints} Pts</p>
                </div>
              </div>

              {/* Inversión en Acciones BVC */}
              <div>
                <h3 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" /> Acciones de la Bolsa de Valores de Caracas (BVC)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stocks.map(stk => {
                    const price = stk.price;
                    const canAfford = ledger.investmentFund >= price || cash >= price;
                    return (
                      <div key={stk.ticker} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-100 text-sm">{stk.ticker}</span>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                              ${price} / acc
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium mt-1">{stk.name}</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Dividendo: {stk.dividendYield}% anual • En cartera: {stk.sharesOwned} acciones
                          </p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            id={`btn-invest-bvc-${stk.ticker.toLowerCase()}`}
                            disabled={!canAfford}
                            onClick={() => investFundInStock(stk.ticker, 1)}
                            className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1"
                          >
                            Invertir 1 Acc (+50 Pts)
                          </button>
                          <button
                            id={`btn-invest-bvc-5x-${stk.ticker.toLowerCase()}`}
                            disabled={ledger.investmentFund < price * 5 && cash < price * 5}
                            onClick={() => investFundInStock(stk.ticker, 5)}
                            className="py-1.5 px-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-bold text-xs transition-all"
                            title="Comprar 5 acciones"
                          >
                            5x
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inversión en Proyectos Productivos */}
              <div>
                <h3 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" /> Proyectos Productivos de Alto Rendimiento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {productiveProjects.map(proj => {
                    const canAfford = ledger.investmentFund >= proj.cost || cash >= proj.cost;
                    return (
                      <div key={proj.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                        <div>
                          <div className="text-2xl mb-2">{proj.icon}</div>
                          <h4 className="font-bold text-slate-100 text-xs md:text-sm">{proj.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 leading-snug">{proj.description}</p>
                          <div className="mt-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1">
                            <div className="flex justify-between text-slate-300">
                              <span>Inversión requerida:</span>
                              <span className="font-bold text-amber-300">${proj.cost}</span>
                            </div>
                            <div className="flex justify-between text-emerald-300">
                              <span>Retorno mensual:</span>
                              <span className="font-bold">+${proj.monthlyReturn}/tick</span>
                            </div>
                          </div>
                        </div>

                        <button
                          id={`btn-invest-proj-${proj.id}`}
                          disabled={!canAfford}
                          onClick={() => investInProductiveProject(proj.id, proj.cost, proj.monthlyReturn, proj.name)}
                          className="mt-3 w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          Financiar (+100 Pts)
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUDITORÍA / HISTORIAL */}
          {activeTab === 'historial' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Registro de puntos y movimientos de capital ({ledger.recentEvents.length} eventos)</span>
                <span>Últimas acciones</span>
              </div>

              {ledger.recentEvents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Aún no hay eventos registrados en este ciclo.
                </div>
              ) : (
                ledger.recentEvents.map(evt => {
                  const isGain = evt.deltaPoints > 0;
                  return (
                    <div 
                      key={evt.id}
                      className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                          isGain ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {isGain ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-200 text-xs md:text-sm">
                            {evt.title}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                            {evt.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className={`font-black text-xs md:text-sm ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isGain ? `+${evt.deltaPoints}` : evt.deltaPoints} Pts
                        </div>
                        {evt.deltaCash !== 0 && (
                          <div className={`text-[11px] font-semibold ${evt.deltaCash > 0 ? 'text-emerald-300' : 'text-slate-400'}`}>
                            {evt.deltaCash > 0 ? `+$${evt.deltaCash}` : `-$${Math.abs(evt.deltaCash)}`}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 hidden sm:inline">
            El valor crece con decisiones informadas, producción tangible y defensa activa.
          </span>
          <button
            id="btn-close-footer-inversion"
            onClick={closeModal}
            className="w-full sm:w-auto py-2 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
          >
            Entendido, Continuar Juego
          </button>
        </div>
      </div>
    </div>
  );
};
