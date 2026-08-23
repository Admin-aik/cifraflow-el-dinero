import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { ARCHETYPES } from '../data/archetypes';
import { narratorEngine } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { 
  TrendingUp, 
  TrendingDown, 
  X, 
  DollarSign, 
  PieChart, 
  Sparkles, 
  Activity, 
  Building2, 
  Info,
  Play
} from 'lucide-react';

export const BolsaCaracasModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    stocks, 
    buyStock, 
    sellStock, 
    cash,
    archetypeId 
  } = useGameStore();

  const [selectedTicker, setSelectedTicker] = useState<string>('RST');
  const [tradeQuantity, setTradeQuantity] = useState<number>(5);

  // Auto-play narration on modal open
  useEffect(() => {
    if (activeModal === 'bolsa') {
      narratorEngine.play('bolsa');
    }
  }, [activeModal]);

  if (activeModal !== 'bolsa') return null;

  const currentArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];
  const currentStock = stocks.find(s => s.ticker === selectedTicker) || stocks[0];
  const isUp = currentStock.price >= currentStock.previousPrice;
  const totalCost = currentStock.price * tradeQuantity;

  return (
    <div id="modal-bolsa-caracas" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border-2 border-cyan-500/70 rounded-3xl p-5 md:p-7 text-white shadow-[0_0_50px_rgba(0,243,255,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          id="btn-close-bolsa"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playSuccess();
                narratorEngine.play('bolsa');
              }}
              title="¡Haz clic en la imagen para escuchar la narración de la Bolsa de Valores de Caracas!"
              className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)] shrink-0 bg-slate-950 relative group cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={GAME_IMAGES.buildings.bolsaCaracas}
                alt="Piso de Remates BVC 3D"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-cyan-300 fill-cyan-300 drop-shadow" />
              </div>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  MERCADO DE CAPITALES DE CARACAS (BVC)
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Activity className="w-3 h-3 animate-pulse" /> Sesión en Tiempo Real
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">Bolsa de Valores de Caracas - Terminal de Renta Variable</h2>
              <p className="text-xs text-slate-300">
                Operador: <span className="text-cyan-400 font-bold">{currentArchetype.name} ({currentArchetype.role})</span> • Haz clic en la imagen para escuchar la explicación bursátil.
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0">
              <img
                src={currentArchetype.image}
                alt={currentArchetype.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Trader</div>
              <div className="text-xs font-bold text-white">{currentArchetype.name}</div>
            </div>
          </div>
        </div>

        {/* Main Trading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto flex-1 pr-1">
          {/* LEFT: STOCK TICKER LIST */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Emisores Cotizados</span>
              <span>Precio Actual</span>
            </div>

            {stocks.map((stock) => {
              const change = stock.price - stock.previousPrice;
              const changePct = stock.previousPrice > 0 ? (change / stock.previousPrice) * 100 : 0;
              const isSelected = stock.ticker === selectedTicker;

              return (
                <div
                  key={stock.ticker}
                  onClick={() => setSelectedTicker(stock.ticker)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-white text-sm">{stock.ticker}</span>
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[110px]">{stock.name}</span>
                    </div>
                    <div className="font-mono font-bold text-sm text-white">
                      ${stock.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-mono">
                      Div: {stock.dividendYield}% / año
                    </span>
                    <span className={`font-mono font-semibold flex items-center gap-0.5 ${
                      change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {change >= 0 ? '+' : ''}{changePct.toFixed(1)}%
                    </span>
                  </div>

                  {stock.sharesOwned > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] text-amber-300 font-mono flex items-center justify-between">
                      <span>En Cartera:</span>
                      <span>{stock.sharesOwned} acciones (${(stock.sharesOwned * stock.price).toFixed(1)})</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER & RIGHT: STOCK DETAILS & TRADING DESK */}
          <div className="lg:col-span-2 space-y-4">
            {/* CURRENT SELECTED STOCK CARD */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{currentStock.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                      {currentStock.ticker}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{currentStock.sector}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400 font-mono">${currentStock.price.toFixed(2)}</div>
                  <div className={`text-xs font-mono font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? '▲ Cotización en alza' : '▼ Corrección saludable'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4">{currentStock.description}</p>

              {/* MINI HISTORICAL CHART SPARKLINE */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-4">
                <div className="text-[10px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                  <span>Fluctuación Histórica de Precio</span>
                  <span className="text-emerald-400 font-bold">Rendimiento por Dividendos: {currentStock.dividendYield}% Anual</span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-16 w-full flex items-end gap-2 pt-2">
                  {currentStock.history.map((val, idx) => {
                    const min = Math.min(...currentStock.history) * 0.9;
                    const max = Math.max(...currentStock.history) * 1.1;
                    const heightPct = ((val - min) / (max - min)) * 100;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                        <div 
                          className="w-full rounded-t transition-all bg-gradient-to-t from-cyan-600 to-cyan-300 group-hover:from-cyan-400 group-hover:to-white"
                          style={{ height: `${Math.max(15, heightPct)}%` }}
                        />
                        <span className="text-[9px] font-mono text-slate-500">${val.toFixed(0)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TRADING ORDER FORM */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-slate-300 font-semibold">Orden de Mercado</span>
                  <span className="text-slate-400">
                    Tu Liquidez: <strong className="text-emerald-400 font-mono">${cash.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label className="text-[11px] text-slate-400 block mb-1">Cantidad de Acciones</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={tradeQuantity}
                        onChange={(e) => setTradeQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm"
                      />
                      {[5, 10, 25].map(q => (
                        <button
                          key={q}
                          onClick={() => setTradeQuantity(q)}
                          className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 font-bold"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Costo Total de Orden</div>
                    <div className="text-lg font-black text-cyan-400 font-mono">${totalCost.toFixed(2)}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      +${((totalCost * (currentStock.dividendYield / 100)) / 12).toFixed(2)}/tick
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => buyStock(currentStock.ticker, tradeQuantity)}
                    disabled={cash < totalCost}
                    className="py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                  >
                    <TrendingUp className="w-4 h-4" /> Comprar Acciones (${totalCost.toFixed(1)})
                  </button>

                  <button
                    onClick={() => sellStock(currentStock.ticker, Math.min(tradeQuantity, currentStock.sharesOwned))}
                    disabled={currentStock.sharesOwned <= 0}
                    className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    <TrendingDown className="w-4 h-4" /> Vender Acciones (Disp: {currentStock.sharesOwned})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATIONAL FOOTER NOTE */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-cyan-300/80">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Sabiduría de Inversión:</strong> A diferencia del azar o la lotería, invertir en acciones de la BVC te otorga derechos reales de propiedad sobre activos productivos y su flujo de caja.
          </span>
        </div>
      </div>
    </div>
  );
};
