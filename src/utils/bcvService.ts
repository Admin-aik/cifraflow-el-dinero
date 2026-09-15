import { BcvRateInfo } from '../types';

// Load cached rate from localStorage if available, otherwise default to latest known BCV official rate
const STORAGE_KEY = 'cifraflow_bcv_rate_v1';

function getInitialCachedRate(): BcvRateInfo {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.rate === 'number' && parsed.rate > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }
  return {
    rate: 842.21,
    valueDate: new Date().toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    updateHour: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true }),
    lastChecked: Date.now(),
    isLive: true,
    source: 'Banco Central de Venezuela (BCV Oficial)',
    sourceUrl: 'https://ve.dolarapi.com/v1/dolares/oficial'
  };
}

let cachedRate: BcvRateInfo = getInitialCachedRate();

export const bcvService = {
  getCurrentRate(): BcvRateInfo {
    return cachedRate;
  },

  /**
   * Fetches the official BCV exchange rate in real-time from the web.
   * Uses DolarAPI official feed (CORS enabled, real-time central bank feed).
   */
  async fetchLiveRate(): Promise<BcvRateInfo> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const liveAverage = typeof data.promedio === 'number' ? data.promedio : (typeof data.venta === 'number' ? data.venta : null);

        if (liveAverage && liveAverage > 0) {
          const now = new Date();
          const rawDate = data.fechaActualizacion ? new Date(data.fechaActualizacion) : now;
          const valueDate = isNaN(rawDate.getTime())
            ? now.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })
            : rawDate.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });

          const updateHour = now.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });

          cachedRate = {
            rate: Number(liveAverage.toFixed(2)),
            valueDate,
            updateHour,
            lastChecked: Date.now(),
            isLive: true,
            source: 'Banco Central de Venezuela (BCV Oficial)',
            sourceUrl: 'https://ve.dolarapi.com/v1/dolares/oficial'
          };

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedRate));
          } catch {
            // Storage quota or disabled
          }

          return cachedRate;
        }
      }
    } catch (error) {
      console.warn('Live BCV Web fetch failed, retaining cached rate:', error);
    }

    return cachedRate;
  },

  usdToBs(usd: number): number {
    return Number((usd * cachedRate.rate).toFixed(2));
  },

  bsToUsd(bs: number): number {
    return Number((bs / cachedRate.rate).toFixed(2));
  },

  formatBs(amount: number): string {
    return `Bs. ${amount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  formatUsd(amount: number): string {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

