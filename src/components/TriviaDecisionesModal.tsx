import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  DollarSign, 
  X 
} from 'lucide-react';

export const TriviaDecisionesModal: React.FC = () => {
  const activeModal = useGameStore(s => s.activeModal);
  const closeModal = useGameStore(s => s.closeModal);
  const openModal = useGameStore(s => s.openModal);
  const quizQuestions = useGameStore(s => s.quizQuestions);
  const answerQuizQuestion = useGameStore(s => s.answerQuizQuestion);
  const ledger = useGameStore(s => s.investmentLedger);

  const [filterEra, setFilterEra] = useState<string>('todas');

  if (activeModal !== 'trivia_decisiones') return null;

  const answeredCount = quizQuestions.filter(q => q.answered).length;
  const filteredQuestions = filterEra === 'todas' 
    ? quizQuestions 
    : quizQuestions.filter(q => q.era === filterEra);

  return (
    <div 
      id="modal-trivia-decisiones"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="title-trivia-decisiones"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            {/* CIFRAFLOW LOGO AS RETURN BUTTON */}
            <button
              id="btn-cifraflow-trivia-back"
              onClick={() => {
                soundFx.playClick();
                closeModal();
              }}
              className="group flex items-center gap-2 p-1 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-400 text-slate-300 hover:text-white transition-all cursor-pointer hover:scale-105 shrink-0 mr-1"
              title="Haz clic en el logotipo de CifraFlow para volver al mapa"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-400/60 group-hover:border-emerald-300 bg-slate-950 p-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0">
                <img 
                  src={CIFRAFLOW_LOGO} 
                  alt="CifraFlow Logo - Volver" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-left hidden sm:block pr-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-white group-hover:text-emerald-300">
                    CIFRAFLOW
                  </span>
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-semibold">
                    Volver
                  </span>
                </div>
              </div>
            </button>

            <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 id="title-trivia-decisiones" className="text-xl md:text-2xl font-black text-emerald-100 flex items-center gap-2">
                Centro de Respuestas & Decisiones Financieras
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {answeredCount}/{quizQuestions.length} Respondidas
                </span>
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Responde con criterio afirmativo o contrario: ¡Respuestas acertadas suman puntos e inversión; fallos restan puntos!
              </p>
            </div>
          </div>
          <button
            id="btn-close-trivia-decisiones"
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal de respuestas y decisiones"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Score Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3.5 bg-slate-950/50 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400">Aciertos:</span>{' '}
              <strong className="text-emerald-300">{ledger.stats.answers.correctCount}</strong>
              <span className="text-emerald-400/80 ml-1">(+{ledger.stats.answers.pointsGained} Pts)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-400" />
            <div>
              <span className="text-slate-400">Fallos:</span>{' '}
              <strong className="text-rose-300">{ledger.stats.answers.wrongCount}</strong>
              <span className="text-rose-400/80 ml-1">(-{ledger.stats.answers.pointsLost} Pts)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-400">Puntos Inversión:</span>{' '}
              <strong className="text-amber-300">{ledger.totalInvestmentPoints} Pts</strong>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              id="btn-ver-conteo-desde-trivia"
              onClick={() => openModal('contador_inversion')}
              className="py-1 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all flex items-center gap-1"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Ver Portafolio
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {filteredQuestions.map((q, idx) => {
            const isAnswered = !!q.answered;
            const wasCorrect = q.wasCorrect;

            return (
              <div 
                key={q.id}
                id={`card-quiz-${q.id}`}
                className={`p-5 rounded-2xl border transition-all ${
                  isAnswered
                    ? wasCorrect 
                      ? 'bg-emerald-950/20 border-emerald-500/40' 
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {/* Header question */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300 font-semibold">
                      Pregunta #{idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm md:text-base">
                      {q.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      +{q.pointsReward} Pts / +${q.cashReward}
                    </span>
                    <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                      -{q.pointsPenalty} Pts / -${q.cashPenalty}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                  {q.question}
                </p>

                {/* Answer Options: 3 Opciones con Alternancia */}
                {!isAnswered ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(q.options || []).map((opt, optIdx) => (
                      <button
                        key={opt.id || `opt_${optIdx}`}
                        id={`btn-option-${opt.letter.toLowerCase()}-${q.id}`}
                        onClick={() => {
                          soundFx.playClick();
                          answerQuizQuestion(q.id, optIdx);
                          if (opt.isCorrect) {
                            soundFx.playPowerUp();
                            narratorEngine.playIconNarration(`trivia_ok_${q.id}`, {
                              title: '¡Decisión Correcta!',
                              eraName: 'Trivia Financiera',
                              icon: '🎯',
                              text: `¡Decisión correcta! ${opt.text}. ${opt.explanation}. Has ganado ${q.pointsReward} puntos.`
                            });
                          } else {
                            soundFx.playError();
                            narratorEngine.playIconNarration(`trivia_err_${q.id}`, {
                              title: 'Decisión Errónea',
                              eraName: 'Trivia Financiera',
                              icon: '⚠️',
                              text: `Decisión errónea. ${opt.text}. ${opt.explanation}. Has perdido ${q.pointsPenalty} puntos.`
                            });
                          }
                        }}
                        className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-emerald-400 text-slate-100 hover:text-emerald-100 transition-all text-left flex flex-col justify-between group cursor-pointer"
                      >
                        <div className="flex items-center justify-between font-bold text-xs md:text-sm mb-2">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono flex items-center justify-center text-xs">
                              {opt.letter}
                            </span>
                            <span>Opción {opt.letter}</span>
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                            +{q.pointsReward} Pts
                          </span>
                        </div>
                        <span className="text-xs text-slate-200 font-medium leading-snug">
                          {opt.text}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Answered Feedback */
                  <div className={`p-4 rounded-xl border ${
                    wasCorrect 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs md:text-sm mb-1">
                      {wasCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>¡Decisión Correcta! (+{q.pointsReward} Puntos & +${q.cashReward} Fondo de Inversión)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>¡Decisión Errónea! (-{q.pointsPenalty} Puntos & -${q.cashPenalty} Penalización)</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {q.selectedOptionIndex !== undefined && q.options?.[q.selectedOptionIndex]
                        ? q.options[q.selectedOptionIndex].explanation
                        : wasCorrect
                        ? (q.options?.find(o => o.isCorrect)?.explanation || q.affirmativeOption?.explanation)
                        : "Respuesta incorrecta. Tu saldo ha recibido una penalización de puntos. Revisa los conceptos de la era histórica para deducir la alternativa acertada."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Cada respuesta construye tu sabiduría patrimonial y alimenta tu fondo de inversión.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="btn-finish-challenge-trivia"
              onClick={() => {
                closeModal();
                useGameStore.getState().finishCurrentChallenge('Desafío de Decisiones Financieras', useGameStore.getState().levelPoints);
              }}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Finalizar Reto (Game Over)</span>
            </button>
            <button
              id="btn-close-footer-trivia"
              onClick={closeModal}
              className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
            >
              Volver al Mapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
