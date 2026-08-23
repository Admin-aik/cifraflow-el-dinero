import React, { useState } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { 
  Building2, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  CreditCard,
  Lock,
  Sparkles
} from 'lucide-react';

export const BancosDistritoModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    banks, 
    selectedBankId, 
    setSelectedBank,
    openBank, 
    depositBank, 
    withdrawBank, 
    takeCredit, 
    payoffDebt,
    cash 
  } = useGameStore();

  const [depositAmount, setDepositAmount] = useState<number>(50);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(50);
  const [loanAmount, setLoanAmount] = useState<number>(200);

  if (activeModal !== 'bancos') return null;

  // Active bank selection (default to BDV if none selected)
  const currentBankId = selectedBankId || 'bdv';
  const currentBank = banks.find(b => b.id === currentBankId) || banks[0];

  return (
    <div id="modal-bancos" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border-2 rounded-3xl p-5 md:p-7 text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        style={{ borderColor: currentBank.color, boxShadow: `0 0 45px ${currentBank.color}40` }}
      >
        {/* Close Button */}
        <button
          id="btn-close-bancos"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* BANK SELECTOR TABS */}
        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-800 overflow-x-auto">
          {banks.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBank(b.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                currentBank.id === b.id 
                  ? 'text-white shadow-lg scale-105' 
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
              style={{
                backgroundColor: currentBank.id === b.id ? `${b.color}35` : undefined,
                borderColor: currentBank.id === b.id ? b.color : undefined
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
              {b.name}
              {b.opened && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>

        {/* BANK HEADER WITH 3D IMAGE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-md shrink-0 bg-slate-950 group">
              <img
                src={GAME_IMAGES.buildings.bancoCentral}
                alt="Distrito Bancario 3D"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div 
                className="absolute bottom-1 right-1 px-1 rounded text-[10px] font-black text-white"
                style={{ backgroundColor: currentBank.color }}
              >
                {currentBank.badge}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Sistema Bancario Nacional
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">{currentBank.fullName}</h2>
              <p className="text-xs text-slate-300 italic">{currentBank.slogan}</p>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Rendimiento: {currentBank.interestRateAnnual}% Anual
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-cyan-300 font-mono">
                  Línea de Crédito: ${(currentBank.creditAvailable - currentBank.debt).toFixed(0)} disp.
                </span>
              </div>
            </div>
          </div>

          {!currentBank.opened ? (
            <button
              id="btn-open-bank-account"
              onClick={() => openBank(currentBank.id)}
              className="px-4 py-2.5 rounded-xl font-bold text-slate-950 transition-all hover:scale-105 shadow-lg flex items-center gap-2 text-xs shrink-0"
              style={{ backgroundColor: currentBank.accentColor }}
            >
              <ShieldCheck className="w-4 h-4" />
              Aperturar Cuenta Digital (Gratis)
            </button>
          ) : (
            <div className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Cuenta Activa & Auditada
            </div>
          )}
        </div>

        {/* BANK OPERATIONS BODY */}
        {currentBank.opened ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1">
            {/* SAVINGS / DEPOSIT CARD */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">Bóveda de Ahorro con Interés</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Saldo Depositado</div>
                    <div className="text-lg font-black text-emerald-400">${currentBank.balance.toFixed(2)}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4">
                  El dinero en esta cuenta genera un <strong className="text-emerald-400">+{currentBank.interestRateAnnual}% anual</strong> que se suma automáticamente a tu Flujo de Caja Pasivo cada tick.
                </p>

                {/* Deposit Controls */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Monto a Depositar (Disponible: ${cash.toFixed(2)})</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={cash}
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                      <button
                        onClick={() => depositBank(currentBank.id, depositAmount)}
                        disabled={cash < depositAmount || depositAmount <= 0}
                        className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs shrink-0"
                      >
                        Depositar
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Monto a Retirar (En Bóveda: ${currentBank.balance.toFixed(2)})</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={currentBank.balance}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                      <button
                        onClick={() => withdrawBank(currentBank.id, withdrawAmount)}
                        disabled={currentBank.balance < withdrawAmount || withdrawAmount <= 0}
                        className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs shrink-0"
                      >
                        Retirar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MICRO-CREDIT / LOAN CARD */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm text-white">Línea de Microcrédito Joven</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Deuda Actual</div>
                    <div className="text-lg font-black text-rose-400">${currentBank.debt.toFixed(2)}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs mb-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Advertencia Financiera:</strong> El crédito genera un gasto por intereses del 2%/tick. Solo tómalo si lo invertirás en un activo que rinda más de ese porcentaje.
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Solicitar Crédito (Máx: ${(currentBank.creditAvailable - currentBank.debt).toFixed(0)})
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={currentBank.creditAvailable - currentBank.debt}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                      <button
                        onClick={() => takeCredit(currentBank.id, loanAmount)}
                        disabled={(currentBank.creditAvailable - currentBank.debt) < loanAmount || loanAmount <= 0}
                        className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs shrink-0"
                      >
                        Solicitar
                      </button>
                    </div>
                  </div>

                  {currentBank.debt > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => payoffDebt(currentBank.id, Math.min(cash, currentBank.debt))}
                        disabled={cash <= 0 || currentBank.debt <= 0}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                      >
                        Amortizar / Pagar Deuda (${Math.min(cash, currentBank.debt).toFixed(0)})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center flex-1">
            <Lock className="w-10 h-10 text-slate-500 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Abre tu cuenta para desbloquear operaciones</h3>
            <p className="text-xs text-slate-400 max-w-md mb-4">
              Cada banco en Metrópolis Capital ofrece ventajas específicas: BDV ofrece custodia digital masiva, Banco Plaza mesa de divisas y Banco del Tesoro tasas protegidas.
            </p>
            <button
              onClick={() => openBank(currentBank.id)}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-950 shadow-lg"
              style={{ backgroundColor: currentBank.accentColor }}
            >
              Aperturar Cuenta en {currentBank.name}
            </button>
          </div>
        )}

        {/* BANK PERKS FOOTER */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {currentBank.perks.map((perk, idx) => (
              <span key={idx} className="flex items-center gap-1 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {perk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
