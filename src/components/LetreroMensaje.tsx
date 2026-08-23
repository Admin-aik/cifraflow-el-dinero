import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { Sparkles, Award, TrendingUp, X, CheckCircle2, BookOpen, ShieldCheck, Headphones, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LetreroMensajeModal: React.FC = () => {
  const { 
    eras, 
    selectedDynastyId, 
    setSelectedDynasty, 
    unlockEraWisdom,
    activeModal,
    closeModal 
  } = useGameStore();

  const [narratorState, setNarratorState] = useState(narratorEngine.getState());

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      setNarratorState(narratorEngine.getState());
    });
    return () => unsubscribe();
  }, []);

  if (activeModal !== 'dynasty' && !selectedDynastyId) return null;

  const era = eras.find(e => e.id === selectedDynastyId) || eras[0];
  if (!era) return null;

  const getEraImage = (id: string) => {
    switch (id) {
      case 'era_trueque': return GAME_IMAGES.eras.trueque;
      case 'era_sal_cauri': return GAME_IMAGES.eras.salCauri;
      case 'era_forja_lidia': return GAME_IMAGES.eras.forjaLidia;
      case 'era_bit_digital': return GAME_IMAGES.eras.bitBlockchain;
      default: return GAME_IMAGES.eras.trueque;
    }
  };

  const getTrackId = (id: string) => {
    switch (id) {
      case 'era_trueque': return 'era_trueque';
      case 'era_sal_cauri': return 'era_sal_cauri';
      case 'era_forja_lidia': return 'era_forja_lidia';
      case 'era_bit_digital': return 'era_red_digital';
      default: return 'era_trueque';
    }
  };

  const trackId = getTrackId(era.id);
  const isPlayingThisEra = narratorState.isSpeaking && narratorState.currentTrack?.id === trackId;

  const handleToggleNarrate = () => {
    soundFx.playClick();
    if (isPlayingThisEra) {
      if (narratorState.isPaused) {
        narratorEngine.resume();
      } else {
        narratorEngine.pause();
      }
    } else {
      narratorEngine.play(trackId);
    }
  };

  const handleUnlock = () => {
    unlockEraWisdom(era.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const eraImage = getEraImage(era.id);

  return (
    <div id="modal-letrero-mensaje" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-slate-900/95 border-2 rounded-3xl p-5 md:p-7 text-white shadow-2xl overflow-hidden"
        style={{ borderColor: era.color, boxShadow: `0 0 35px ${era.color}40` }}
      >
        {/* Glow corner accents */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: era.color }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: '#00f3ff' }}
        />

        {/* Close button */}
        <button
          id="btn-close-letrero"
          onClick={() => { setSelectedDynasty(null); closeModal(); }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
          title="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with 3D Era Artwork */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-inner shrink-0 bg-slate-950 group"
              style={{ borderColor: era.color }}
            >
              <img
                src={eraImage}
                alt={era.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                  {era.title}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {era.characters}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight">
                {era.subtitle}
              </h2>
              <p className="text-xs text-slate-300 italic mt-0.5">
                Concepto Clave: {era.coreConcept}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleNarrate}
            className={`p-2.5 rounded-2xl border flex items-center gap-1.5 text-xs font-bold transition-all shadow-md shrink-0 ${
              isPlayingThisEra
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
            }`}
            title="Escuchar audio narrativo de esta Era"
          >
            <Headphones className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isPlayingThisEra ? 'Narrando' : 'Voz'}
            </span>
          </button>
        </div>

        {/* Quote from the Book */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-4 text-xs italic text-cyan-200 leading-relaxed border-l-4" style={{ borderLeftColor: era.color }}>
          «{era.quoteFromBook}»
        </div>

        {/* Riddle & Lesson Card */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 mb-6 space-y-2">
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Acertijo del Valor:
          </div>
          <p className="text-xs text-slate-200">
            {era.riddleChallenge}
          </p>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
            <strong className="text-white">Lección:</strong> {era.lessonText}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            {era.unlocked ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Sabiduría Asimilada (+Bonus Activo)
              </span>
            ) : (
              <span>Desbloquear otorga <strong className="text-amber-400">+50 Pts de Prestigio</strong> y bono de flujo</span>
            )}
          </div>

          {!era.unlocked && (
            <button
              id="btn-unlock-dynasty-wisdom"
              onClick={handleUnlock}
              className="px-5 py-2.5 rounded-xl font-black text-slate-950 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              style={{ backgroundColor: era.color }}
            >
              <Award className="w-4 h-4" />
              Asimilar Sabiduría
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
