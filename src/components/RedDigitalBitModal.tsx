import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Globe, 
  CheckCircle2, 
  ShieldAlert, 
  Terminal, 
  Layers,
  Headphones,
  Play,
  Pause
} from 'lucide-react';

export const RedDigitalBitModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    digitalBitsCount, 
    cash, 
    mineBlockchainBits, 
    openModal 
  } = useGameStore();

  const [isMining, setIsMining] = useState(false);
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      setNarratorState(narratorEngine.getState());
    });
    return () => unsubscribe();
  }, []);

  // Auto-play audio when modal opens
  useEffect(() => {
    if (activeModal === 'red_digital') {
      narratorEngine.play('era_red_digital');
    }
  }, [activeModal]);

  if (activeModal !== 'red_digital' && activeModal !== 'defensa') return null;

  const isNarratingEra4 = narratorState.isSpeaking && narratorState.currentTrack?.id === 'era_red_digital';

  const handleToggleNarrate = () => {
    soundFx.playClick();
    if (isNarratingEra4) {
      if (narratorState.isPaused) {
        narratorEngine.resume();
      } else {
        narratorEngine.pause();
      }
    } else {
      narratorEngine.play('era_red_digital');
    }
  };

  const handleMine = () => {
    setIsMining(true);
    mineBlockchainBits();
    setTimeout(() => {
      setIsMining(false);
    }, 400);
  };

  return (
    <div id="modal-red-digital" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-fuchsia-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(217,70,239,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-red-digital"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* CLICKABLE 3D ILLUSTRATION WITH NARRATION TRIGGER */}
            <button
              onClick={() => {
                soundFx.playSuccess();
                narratorEngine.play('era_red_digital');
              }}
              title="¡Haz clic en la imagen para escuchar la narración en voz viva!"
              className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)] shrink-0 bg-slate-950 group relative cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={GAME_IMAGES.eras.bitBlockchain}
                alt="Era del Bit y Blockchain 3D"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-5 h-5 text-fuchsia-300 fill-fuchsia-300 drop-shadow" />
              </div>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/40">
                  ERA 4: EL CIBERESPACIO DEL BIT & BLOCKCHAIN
                </span>
                <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                  Del Papel al Bit: Pura Información
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">La Red Invisible & La Frontera Digital</h2>
              <p className="text-xs text-slate-300">
                El dinero se vuelve código y blockchain. ¡Haz clic en la imagen para oír la historia en voz viva!
              </p>
            </div>
          </div>

          {/* Era Narrative Audio Player Button */}
          <button
            onClick={handleToggleNarrate}
            className={`px-3.5 py-2 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isNarratingEra4
                ? 'bg-fuchsia-500 text-slate-950 border-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.4)] animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-fuchsia-300 border-fuchsia-500/40 hover:border-fuchsia-400'
            }`}
            title="Escuchar narración con voz de la Era del Bit y Blockchain"
          >
            <Headphones className="w-4 h-4" />
            <span>
              {isNarratingEra4 
                ? (narratorState.isPaused ? '⏸️ Reanudar Audio' : `🎙️ Narrando Era 4 (${narratorState.progressPercent}%)`) 
                : '🔊 Escuchar Historia de la Era'}
            </span>
          </button>
        </div>

        {/* COMIC STORY PANEL */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 to-slate-900 border border-fuchsia-500/30 text-xs text-fuchsia-100 mb-4 flex flex-col md:flex-row items-center gap-3.5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-fuchsia-400/50 shadow-md shrink-0 group relative">
            <img
              src={GAME_IMAGES.eras.bitBlockchain}
              alt="Ciberespacio Blockchain"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/80 px-1 rounded text-fuchsia-400">3D Art</span>
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-bold text-fuchsia-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-400 shrink-0" />
              Fragmento del Libro "El Viaje del Valor: De la Sal al Bit" (ircar rojas):
            </div>
            <p className="italic text-slate-200 leading-relaxed text-[11px] md:text-xs">
              «En el presente, Kai y Lia ya no tocan el dinero, pero su poder es más global que nunca. Sentados en un entorno de luces de neón y flujos de datos, observan sus pantallas donde los números bailan en tiempo real. El dinero se ha transformado en código, en impulsos eléctricos y en redes de blockchain. Ya no es sal, ni oro, ni papel; es pura información y confianza compartida en una red invisible que conecta el mundo entero. El viaje del valor ha llegado a la frontera digital, donde el límite es la imaginación.»
            </p>
          </div>
        </div>

        {/* INTERACTIVE DIGITAL MATRIX & BLOCKCHAIN SIMULATOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
          {/* LEFT: BLOCK MINER & DATA STREAM */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-fuchsia-400" />
                  Terminal de Nodos Cuánticos
                </h3>
                <span className="text-xs font-mono text-fuchsia-400 bg-fuchsia-950/60 px-2 py-0.5 rounded border border-fuchsia-500/30">
                  {digitalBitsCount} Bits Digitales
                </span>
              </div>

              {/* CYBER MATRIX VISUALIZER */}
              <div className="my-4 p-4 rounded-xl bg-slate-900 border border-fuchsia-500/30 relative overflow-hidden font-mono text-[11px] text-cyan-300 flex flex-col items-center justify-center min-h-[130px]">
                <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                  <Cpu className="w-5 h-5 animate-pulse" />
                  <span className="font-bold">BLOCKCHAIN LEDGER #0894</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  HASH: 0x7f9a...3c82 • PROTOCOLO DE CONFIANZA ACTIVO
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="px-2 py-1 rounded bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/40 text-[10px]">
                    Kai.Wallet -&gt; Lia.Node [2.5 BIT]
                  </div>
                  <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                Valida bloques descentralizados para transmitir valor digital a la velocidad de la luz sin fronteras geográficas.
              </p>
            </div>

            <button
              id="btn-mine-bit"
              onClick={handleMine}
              disabled={isMining}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95"
            >
              <Zap className={`w-4 h-4 ${isMining ? 'animate-spin text-yellow-300' : ''}`} />
              Minar y Validar Bloque Digital (+2 Bits, +$200 & +$25 Flujo)
            </button>
          </div>

          {/* RIGHT: THE NATURE OF MODERN MONEY */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  El Dinero Como Pura Información
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Global & Instantáneo
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
                    1. ¿Por qué el dinero es ahora código?
                  </div>
                  <p className="text-[11px] text-slate-300">
                    El valor nunca estuvo en la sal, ni en la concha, ni en el metal; siempre estuvo en la <strong>confianza mutua</strong> entre los seres humanos de que ese registro será aceptado mañana.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    2. Seguridad Criptográfica
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Las matemáticas y la criptografía reemplazan el martillo del rey: la escasez está garantizada por algoritmos auditables por cualquiera.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-fuchsia-950/30 border border-fuchsia-500/20 text-[11px] text-fuchsia-200">
                  🛡️ <strong>Defensa Activa:</strong> En el ciberespacio debes proteger tus claves privadas de los monstruos de phishing y las trampas de deuda.
                </div>
              </div>
            </div>

            <button
              onClick={() => { closeModal(); openModal('defensa'); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-fuchsia-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-lg transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-fuchsia-400" />
              Entrar al Bastión de Seguridad Anti-Fraude
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Red Cuántica: <span className="text-fuchsia-400 font-bold">{digitalBitsCount} Bits Digitales</span>
          </div>

          <button
            onClick={() => { closeModal(); openModal('biblioteca'); }}
            className="text-xs text-fuchsia-400 hover:text-fuchsia-300 font-bold flex items-center gap-1"
          >
            Abrir el Libro Completo "De la Sal al Bit" <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
