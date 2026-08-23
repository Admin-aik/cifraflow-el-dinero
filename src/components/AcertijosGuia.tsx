import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  Compass, 
  Award, 
  DollarSign, 
  ArrowRight, 
  HelpCircle, 
  Lightbulb, 
  BookOpen 
} from 'lucide-react';

export const AcertijosGuiaModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    quests, 
    openModal, 
    stage 
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'todos' | 'era_trueque' | 'era_sal_cauri' | 'era_forja_lidia' | 'era_bit_digital'>('todos');
  const [showHintId, setShowHintId] = useState<string | null>(null);

  if (activeModal !== 'acertijos') return null;

  const completedCount = quests.filter(q => q.completed).length;

  const filteredQuests = activeTab === 'todos' 
    ? quests 
    : quests.filter(q => q.era === activeTab);

  const handleGoToLocation = (locationId: string) => {
    closeModal();
    openModal(locationId);
  };

  return (
    <div id="modal-acertijos-guia" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-yellow-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(234,179,8,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          id="btn-close-acertijos"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER WITH 3D MENTORS IMAGE */}
        <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.35)] shrink-0 bg-slate-950 group">
            <img
              src={GAME_IMAGES.mentors}
              alt="Mentores Kai y Lia 3D"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-yellow-950 text-yellow-400 border border-yellow-500/40">
                ORÁCULO DE KAI & LIA
              </span>
              <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                Acertijos Resueltos: {completedCount}/{quests.length}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">El Recorrido de los Acertijos: De la Sal al Bit</h2>
            <p className="text-xs text-slate-300">
              Resuelve las adivinanzas de cada era histórica para desbloquear recompensas de prestigio y multiplicar tu flujo de abundancia.
            </p>
          </div>
        </div>

        {/* ERA FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'todos'
                ? 'bg-yellow-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todos ({quests.length})
          </button>
          <button
            onClick={() => setActiveTab('era_trueque')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'era_trueque'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🐐 Era 1: Trueque
          </button>
          <button
            onClick={() => setActiveTab('era_sal_cauri')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'era_sal_cauri'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🧂 Era 2: Sal & Cauri
          </button>
          <button
            onClick={() => setActiveTab('era_forja_lidia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'era_forja_lidia'
                ? 'bg-yellow-400 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🦁 Era 3: Forja de Lidia
          </button>
          <button
            onClick={() => setActiveTab('era_bit_digital')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'era_bit_digital'
                ? 'bg-fuchsia-500 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Era 4: El Bit Digital
          </button>
        </div>

        {/* QUEST LIST */}
        <div className="space-y-3.5 overflow-y-auto flex-1 pr-1">
          {filteredQuests.map((quest, idx) => {
            const isHintOpen = showHintId === quest.id;

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-xl border transition-all ${
                  quest.completed
                    ? 'bg-slate-950/50 border-emerald-500/40 opacity-85'
                    : 'bg-slate-950/80 border-slate-700 hover:border-yellow-500/50 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      quest.completed ? 'bg-emerald-500 text-slate-950' : 'bg-yellow-500 text-slate-950'
                    }`}>
                      {quest.completed ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white flex items-center gap-2">
                        {quest.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                        <Compass className="w-3 h-3 text-cyan-400" /> Ubicación: {quest.locationName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Award className="w-3.5 h-3.5" /> +{quest.rewardPrestige}
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <DollarSign className="w-3.5 h-3.5" /> +${quest.rewardCash}
                    </span>
                  </div>
                </div>

                {/* Riddle quote */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs italic text-yellow-100 mb-2">
                  “{quest.riddle}”
                </div>

                {/* Hint Dropdown Toggle */}
                <div className="mb-2">
                  <button
                    onClick={() => setShowHintId(isHintOpen ? null : quest.id)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {isHintOpen ? 'Ocultar Pista de Kai y Lia' : '¿Necesitas una pista?'}
                  </button>

                  {isHintOpen && (
                    <div className="mt-1.5 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 animate-fade-in">
                      💡 <strong>Pista de Lia:</strong> {quest.hint}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">
                    Objetivo: <strong className="text-slate-200">{quest.goalDescription}</strong>
                  </span>

                  {quest.completed ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleGoToLocation(quest.locationId)}
                      className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      Viajar a esta Era <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SHORTCUT TO BOOK */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Resuelve los acertijos para avanzar por las 4 eras del valor.
          </span>
          <button
            onClick={() => { closeModal(); openModal('biblioteca'); }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" /> Consultar el Libro Original
          </button>
        </div>
      </div>
    </div>
  );
};
