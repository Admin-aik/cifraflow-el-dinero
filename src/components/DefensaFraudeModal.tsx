import React, { useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  ShieldAlert, 
  X, 
  ShieldCheck, 
  Eye, 
  FileText, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Award,
  DollarSign,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DefensaFraudeModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    villains, 
    attackVillain 
  } = useGameStore();

  // Auto-play audio when modal opens
  useEffect(() => {
    if (activeModal === 'defensa') {
      narratorEngine.play('defensa');
    }
  }, [activeModal]);

  if (activeModal !== 'defensa') return null;

  const currentVillain = villains.find(v => v.active && !v.defeated) || villains[0];

  const getVillainImage = (id: string) => {
    if (id.includes('inflation') || id.includes('inflacion')) return GAME_IMAGES.villains.inflation;
    return GAME_IMAGES.villains.phantomDebt;
  };

  const currentVillainImage = getVillainImage(currentVillain.id);

  const handleAttack = (skill: '2fa_shield' | 'flow_vision_strike' | 'balance_audit') => {
    let damage = 35;
    if (skill === 'flow_vision_strike') damage = 45;
    if (skill === 'balance_audit') damage = 50;
    attackVillain(currentVillain.id, damage);
  };

  return (
    <div id="modal-defensa-fraude" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-fuchsia-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(255,0,127,0.3)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          id="btn-close-defensa"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
          <button
            onClick={() => {
              soundFx.playSuccess();
              narratorEngine.play('defensa');
            }}
            title="¡Haz clic en la imagen para escuchar la alerta de ciberseguridad!"
            className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.4)] shrink-0 bg-slate-950 relative group cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={currentVillainImage}
              alt={currentVillain.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 text-rose-300 fill-rose-300 drop-shadow" />
            </div>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/40">
                SALA DE DEFENSAS CIBER-FINANCIERAS
              </span>
              <span className="text-xs text-rose-400 font-mono font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Amenaza Activa
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">Escuadrón Anti-Fraude & Purgador de Gastos Fijos</h2>
            <p className="text-xs text-slate-300">
              Usa las herramientas de ciberseguridad y disciplina presupuestaria para neutralizar las amenazas que drenan tu flujo de caja.
            </p>
          </div>
        </div>

        {/* CURRENT THREAT CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1 pr-1">
          {/* VILLAIN STATUS & LORE */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-rose-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-rose-500/50 shrink-0 bg-slate-900 shadow-md">
                    <img
                      src={currentVillainImage}
                      alt={currentVillain.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-rose-300">{currentVillain.name}</h3>
                    <span className="text-xs text-slate-400 font-medium">{currentVillain.title}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30">
                    Drenaje
                  </span>
                  <div className="text-base md:text-lg font-black text-rose-400 font-mono">
                    -${currentVillain.drainRatePerSec}/tick
                  </div>
                </div>
              </div>

              {/* Health bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Energía del Monstruo</span>
                  <span className="font-bold text-rose-400">{currentVillain.health} / {currentVillain.maxHealth} HP</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-600 to-fuchsia-500 transition-all duration-300"
                    style={{ width: `${(currentVillain.health / currentVillain.maxHealth) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{currentVillain.description}</p>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Debilidad Detectada</div>
                <div className="text-slate-200">{currentVillain.weakness}</div>
              </div>
            </div>

            {currentVillain.defeated && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> ¡Amenaza Neutralizada! El drenaje se ha detenido.
              </div>
            )}
          </div>

          {/* CIFRA'S SUPERHERO SKILLS */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" /> Habilidades de Defensa & Purga
              </h4>

              <div className="space-y-2.5">
                {/* SKILL 1: 2FA SHIELD */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between gap-3 hover:border-cyan-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Escudo 2FA & Token Bancario BDV</div>
                      <div className="text-[10px] text-slate-400">Bloquea suplantaciones de identidad bancaria (-45 HP)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAttack('2fa_shield')}
                    disabled={currentVillain.defeated}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs shrink-0 transition-transform active:scale-95"
                  >
                    Activar
                  </button>
                </div>

                {/* SKILL 2: FLOW VISION STRIKE */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-fuchsia-500/30 flex items-center justify-between gap-3 hover:border-fuchsia-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-fuchsia-500/20 text-fuchsia-400">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Rayo de "Visión de Flujo"</div>
                      <div className="text-[10px] text-slate-400">Desarma la ilusión de esquemas piramidales (-60 HP)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAttack('flow_vision_strike')}
                    disabled={currentVillain.defeated}
                    className="px-3.5 py-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-400 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs shrink-0 transition-transform active:scale-95"
                  >
                    Disparar
                  </button>
                </div>

                {/* SKILL 3: BALANCE AUDIT */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between gap-3 hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Auditoría Presupuesto Base Cero</div>
                      <div className="text-[10px] text-slate-400">Elimina suscripciones zombies y gastos innecesarios (-50 HP)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAttack('balance_audit')}
                    disabled={currentVillain.defeated}
                    className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs shrink-0 transition-transform active:scale-95"
                  >
                    Ejecutar
                  </button>
                </div>
              </div>
            </div>

            {/* LIST OF THREATS */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Registro de Amenazas de Metrópolis:</span>
              <div className="flex items-center gap-2">
                {villains.map((v) => (
                  <span 
                    key={v.id} 
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      v.defeated ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {v.name.split(' ')[0]} {v.defeated ? '✓' : '⚠️'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
