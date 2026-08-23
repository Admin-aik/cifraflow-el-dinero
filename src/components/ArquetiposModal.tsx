import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { ARCHETYPES, CIFRAFLOW_LOGO } from '../data/archetypes';
import { ArchetypeId } from '../types';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  Award,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ArquetiposModal: React.FC = () => {
  const { activeModal, closeModal, archetypeId, setArchetype } = useGameStore();

  if (activeModal !== 'arquetipos') return null;

  const currentArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  const handleSelect = (id: ArchetypeId) => {
    setArchetype(id);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div 
      id="modal-arquetipos"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040510]/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#090d1a] border-2 border-cyan-500/40 rounded-3xl text-white shadow-[0_0_50px_rgba(0,242,254,0.2)] overflow-hidden">
        {/* Glow ambient background accents */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* HEADER */}
        <div className="p-5 md:p-6 border-b border-slate-800/80 flex items-center justify-between relative z-10 bg-[#040510]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.4)] shrink-0 bg-slate-950">
              <img
                src={CIFRAFLOW_LOGO}
                alt="CifraFlow Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  CifraFlow • 3D Stylized Art
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline font-medium">
                  Guía de Estilo Visual 2026
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Arquetipos Gen-Z & Creadores de Valor
              </h2>
            </div>
          </div>

          <button
            id="btn-close-arquetipos-modal"
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            title="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY - CARDS GRID */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar relative z-10">
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Selecciona tu arquetipo generacional para personalizar tu viaje a través de las 4 eras del dinero. Cada personaje aporta bonificaciones activas y habilidades financieras únicas inspiradas en el libro <strong className="text-cyan-300">«El Viaje del Valor: De la Sal al Bit»</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {ARCHETYPES.map((archetype) => {
              const isSelected = archetype.id === archetypeId;

              return (
                <div
                  key={archetype.id}
                  id={`card-archetype-${archetype.id}`}
                  onClick={() => handleSelect(archetype.id)}
                  className={`group relative rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                    isSelected 
                      ? 'bg-gradient-to-b from-cyan-950/60 to-[#090d1a] border-cyan-400 shadow-[0_0_30px_rgba(0,242,254,0.35)] scale-[1.02]' 
                      : 'bg-[#040510]/80 border-slate-700/60 hover:border-cyan-400/60 hover:bg-[#0c1224] hover:shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                  }`}
                >
                  {/* Active Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Activo
                    </div>
                  )}

                  <div>
                    {/* Character 3D Stylized Image Container */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-700/60 group-hover:border-cyan-400/50 bg-slate-950 mb-3.5 shadow-inner">
                      <img
                        src={archetype.image}
                        alt={archetype.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040510] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono px-2 py-1 rounded-lg bg-[#040510]/80 backdrop-blur-md border border-slate-700/50 text-cyan-300 font-bold">
                        <span>{archetype.role.split('&')[0]}</span>
                        <span className="text-slate-400">{archetype.age}</span>
                      </div>
                    </div>

                    {/* Name and Role */}
                    <h3 className="text-base font-black text-white tracking-tight flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                      {archetype.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {archetype.description}
                    </p>

                    {/* Passive Bonus Box */}
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                      <div className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {archetype.passiveBonusTitle}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {archetype.passiveBonusDescription}
                      </p>
                    </div>
                  </div>

                  {/* Stats & Select Button */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                      <div className="p-1 rounded bg-slate-900 border border-slate-800">
                        <div className="text-slate-500 text-[9px]">FLUJO</div>
                        <div className="text-emerald-400 font-bold">{archetype.stats.flujo}%</div>
                      </div>
                      <div className="p-1 rounded bg-slate-900 border border-slate-800">
                        <div className="text-slate-500 text-[9px]">INNOV</div>
                        <div className="text-cyan-400 font-bold">{archetype.stats.innovacion}%</div>
                      </div>
                      <div className="p-1 rounded bg-slate-900 border border-slate-800">
                        <div className="text-slate-500 text-[9px]">RESIL</div>
                        <div className="text-purple-400 font-bold">{archetype.stats.resiliencia}%</div>
                      </div>
                    </div>

                    <button
                      id={`btn-select-archetype-${archetype.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(archetype.id);
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Arquetipo Seleccionado
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          Elegir Arquetipo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER SUMMARY */}
        <div className="p-4 md:p-5 border-t border-slate-800/80 bg-[#040510]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Arquetipo actual: <strong className="text-white font-bold">{currentArchetype.name}</strong> ({currentArchetype.role})
            </span>
          </div>

          <button
            id="btn-confirm-arquetipos"
            onClick={closeModal}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)]"
          >
            Continuar Odisea del Dinero
          </button>
        </div>
      </div>
    </div>
  );
};
