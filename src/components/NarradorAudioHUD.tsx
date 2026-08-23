import React, { useEffect, useState } from 'react';
import { narratorEngine, NARRATION_STORIES, NarrationTrack } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Headphones, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  X,
  Gauge,
  BookOpen,
  FastForward,
  ListMusic
} from 'lucide-react';

export const NarradorAudioHUD: React.FC = () => {
  const [state, setState] = useState(narratorEngine.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      setState(narratorEngine.getState());
    });
    return () => unsubscribe();
  }, []);

  const handlePlayTrack = (trackKey: string) => {
    soundFx.playClick();
    narratorEngine.play(trackKey);
    setIsExpanded(true);
  };

  const handleTogglePlayPause = () => {
    soundFx.playClick();
    narratorEngine.togglePlayPause();
  };

  const handleStop = () => {
    soundFx.playClick();
    narratorEngine.stop();
  };

  const handleSpeedChange = (speed: number) => {
    soundFx.playClick();
    narratorEngine.setSpeechRate(speed);
  };

  const activeTrack = state.currentTrack || NARRATION_STORIES.portada;

  return (
    <div className="fixed top-16 right-4 z-40 flex flex-col items-end">
      {/* COMPACT FLOATING CONTROLLER PILL */}
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/95 border backdrop-blur-xl shadow-2xl transition-all ${
          state.isSpeaking 
            ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.35)]' 
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Animated Wave Indicator or Headphone Icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 group text-left"
          title="Abrir Centro de Narración Sonora"
        >
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
            state.isSpeaking
              ? 'bg-cyan-500 text-slate-950 shadow-md animate-pulse'
              : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700'
          }`}>
            <Headphones className="w-4 h-4" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black text-white truncate max-w-[140px]">
                {state.isSpeaking ? activeTrack.title.split(':')[0] : 'Audio Narrativo'}
              </span>
              {state.isSpeaking && (
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-4 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
            <div className="text-[9px] font-mono text-cyan-400 leading-none">
              {state.isSpeaking 
                ? (state.isPaused ? '⏸️ Pausado' : `🎙️ Narrando (${state.progressPercent}%)`) 
                : 'Voz de las 4 Eras'}
            </div>
          </div>
        </button>

        {/* Quick Play/Pause Button */}
        <button
          onClick={handleTogglePlayPause}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            state.isSpeaking && !state.isPaused
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500 hover:text-slate-950'
              : 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-md font-bold'
          }`}
          title={state.isSpeaking ? (state.isPaused ? 'Reanudar' : 'Pausar') : 'Reproducir Portada'}
        >
          {state.isSpeaking && !state.isPaused ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Expand / Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          title={isExpanded ? 'Minimizar' : 'Desplegar Reproductor'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* EXPANDED NARRATOR STUDIO PANEL */}
      {isExpanded && (
        <div className="mt-2 w-80 sm:w-96 rounded-3xl bg-slate-900/98 border-2 border-cyan-500/60 p-4 text-white shadow-[0_0_50px_rgba(0,242,254,0.3)] backdrop-blur-2xl animate-fade-in flex flex-col space-y-3 z-50">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-base">{activeTrack.icon}</span>
              <div>
                <h3 className="text-xs font-black text-white leading-tight">{activeTrack.title}</h3>
                <span className="text-[10px] text-cyan-400 font-mono">{activeTrack.eraName}</span>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Reading Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>{state.isSpeaking ? 'Leyendo historia en voz alta' : 'Listo para reproducir'}</span>
              <span className="text-cyan-300 font-bold">{state.progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-fuchsia-500 transition-all duration-300 rounded-full"
                style={{ width: `${state.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Speech Controls & Speed */}
          <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            {/* Play / Pause */}
            <button
              onClick={handleTogglePlayPause}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 transition-all hover:scale-105"
            >
              {state.isSpeaking && !state.isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Reproducir
                </>
              )}
            </button>

            {/* Stop */}
            <button
              onClick={handleStop}
              disabled={!state.isSpeaking}
              className={`p-2 rounded-xl transition-all ${
                state.isSpeaking 
                  ? 'bg-slate-800 hover:bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title="Detener Narración"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
              <Gauge className="w-3 h-3 text-slate-400" />
              {[0.85, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    state.speechRate === speed
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* CHAPTER / ERA SELECTOR LIST */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1">
                <ListMusic className="w-3.5 h-3.5 text-amber-400" /> Capítulos & Eras Narradas:
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Español</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {Object.values(NARRATION_STORIES).map((track) => {
                const isCurrent = activeTrack.id === track.id;
                const isPlayingThis = isCurrent && state.isSpeaking;

                return (
                  <button
                    key={track.id}
                    onClick={() => handlePlayTrack(track.id)}
                    className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between border ${
                      isPlayingThis
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md'
                        : isCurrent
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm shrink-0">{track.icon}</span>
                      <div className="truncate">
                        <div className="text-[11px] font-bold truncate">{track.title}</div>
                        <div className="text-[9px] text-slate-400 font-mono">{track.eraName}</div>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isPlayingThis ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[9px] animate-pulse">
                          EN VIVO
                        </span>
                      ) : (
                        <Play className="w-3 h-3 text-slate-400 hover:text-cyan-300 fill-current" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Audiobook Launcher */}
          <button
            onClick={() => handlePlayTrack('historia_completa')}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Escuchar Audiolibro Completo (De la Sal al Bit)
          </button>
        </div>
      )}
    </div>
  );
};
