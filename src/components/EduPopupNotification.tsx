import React from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { GAME_IMAGES } from '../data/gameAssets';
import { Sparkles, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export const EduPopupNotification: React.FC = () => {
  const { notification, clearNotification } = useGameStore();

  if (!notification) return null;

  const getBorderColor = () => {
    switch (notification.type) {
      case 'achievement': return 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]';
      case 'warning': return 'border-fuchsia-500 shadow-[0_0_30px_rgba(255,0,127,0.4)]';
      case 'success': return 'border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]';
      default: return 'border-cyan-500 shadow-[0_0_30px_rgba(0,243,255,0.25)]';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md w-[92vw] sm:w-full animate-slide-in select-none">
      <div className={`p-4 rounded-3xl bg-slate-900/95 backdrop-blur-xl border-2 text-white ${getBorderColor()} relative shadow-2xl`}>
        <button
          id="btn-dismiss-popup"
          onClick={clearNotification}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white transition-colors"
          title="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shrink-0 bg-slate-950 shadow-md mt-0.5">
            <img
              src={GAME_IMAGES.mentors}
              alt="Mentor Kai & Lia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white tracking-tight">{notification.title}</h4>
            <p className="text-xs text-slate-300 mt-1 whitespace-pre-line leading-relaxed">
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
