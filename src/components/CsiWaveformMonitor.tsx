import React, { useEffect, useRef } from 'react';
import { Activity, Radio, BarChart3, ArrowDown } from 'lucide-react';
import { SeniorPostureState, Language } from '../types';
import { translations } from '../i18n/translations';

interface CsiWaveformMonitorProps {
  postureState: SeniorPostureState;
  elevationCm: number;
  dopplerVelocity: number;
  language?: Language;
}

export const CsiWaveformMonitor: React.FC<CsiWaveformMonitorProps> = ({
  postureState,
  elevationCm,
  dopplerVelocity,
  language = 'es',
}) => {
  const t = translations[language].monitor;
  const csiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const elevationHistoryRef = useRef<number[]>(new Array(60).fill(160));
  const subcarriersRef = useRef<number[]>(new Array(64).fill(0));

  useEffect(() => {
    // Keep history of elevation for the graph
    elevationHistoryRef.current.shift();
    elevationHistoryRef.current.push(elevationCm);
  }, [elevationCm]);

  useEffect(() => {
    const canvas = csiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.05;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw background grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let y = 20; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Update simulated 64 subcarriers amplitude
      const isFallen = postureState === 'fallen_immobile';
      const isFalling = postureState === 'falling';
      const isWalking = postureState === 'walking';

      const varianceFactor = isFalling ? 22 : isFallen ? 1.5 : isWalking ? 8 : 3;

      // Draw 64 Subcarrier Bars (CSI Amplitude dBm)
      const barWidth = (w - 40) / 64;
      const baselineY = h - 25;

      for (let i = 0; i < 64; i++) {
        const noise = Math.sin(t * 3 + i * 0.4) * varianceFactor + Math.cos(t * 2 + i * 0.8) * (varianceFactor * 0.6);
        const baseAmp = -45 + (Math.sin(i * 0.1) * 8);
        const amp = baseAmp + noise;
        subcarriersRef.current[i] = amp;

        // Map amp (-70dBm to -20dBm) to bar height
        const barHeight = Math.max(4, Math.min(h - 35, ((amp + 75) / 60) * (h - 40)));
        const x = 20 + i * barWidth;

        // Color gradient depending on state
        let barColor = 'rgba(45, 212, 191, 0.7)'; // teal
        if (isFalling) {
          barColor = 'rgba(239, 68, 68, 0.85)'; // red
        } else if (isFallen) {
          barColor = 'rgba(245, 158, 11, 0.75)'; // amber
        } else if (isWalking) {
          barColor = 'rgba(56, 189, 248, 0.75)'; // sky
        }

        ctx.fillStyle = barColor;
        ctx.fillRect(x, baselineY - barHeight, barWidth - 1, barHeight);
      }

      // Draw Subcarrier CSI Envelope Curve
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isFalling ? '#ef4444' : isFallen ? '#f59e0b' : '#2dd4bf';

      for (let i = 0; i < 64; i++) {
        const x = 20 + i * barWidth + (barWidth / 2);
        const amp = subcarriersRef.current[i];
        const barHeight = Math.max(4, Math.min(h - 35, ((amp + 75) / 60) * (h - 40)));
        const y = baselineY - barHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Labels
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText('Subportadora #1 (-20MHz)', 20, h - 10);
      ctx.fillText('Canal Central 5.24 GHz', w / 2 - 50, h - 10);
      ctx.fillText('Subportadora #64 (+20MHz)', w - 145, h - 10);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [postureState]);

  return (
    <div id="csi-waveform-monitor" className="rounded-2xl bg-white border-2 border-slate-200 p-6 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
              {t.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-500 font-medium">
            {t.dopplerLabel}{' '}
            <strong
              className={`font-bold ${
                dopplerVelocity > 2.5
                  ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200'
                  : dopplerVelocity > 0.5
                  ? 'text-orange-600'
                  : 'text-slate-900'
              }`}
            >
              {dopplerVelocity.toFixed(2)} m/s
            </strong>
          </span>
          <span className="text-slate-500 font-medium">
            {t.comElevationLabel}{' '}
            <strong
              className={`font-bold ${
                elevationCm < 30
                  ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200'
                  : 'text-teal-600'
              }`}
            >
              {elevationCm.toFixed(0)} cm
            </strong>
          </span>
        </div>
      </div>

      {/* CSI 64-Subcarriers Canvas */}
      <div className="relative bg-slate-950 rounded-xl p-3 border-2 border-slate-900 shadow-inner">
        <div className="absolute top-2.5 left-3.5 flex items-center gap-2 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          <Radio className="w-3 h-3 text-teal-400" />
          <span>{t.spectrumTitle}</span>
        </div>
        <canvas
          ref={csiCanvasRef}
          width={560}
          height={110}
          className="w-full h-24 block mt-3"
        />
      </div>

      {/* Real-time CoM Elevation History Strip */}
      <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-700">
            <ArrowDown className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.displacementTitle}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">{t.displacementPeriod}</span>
        </div>

        <div className="relative h-14 w-full flex items-end gap-1 pt-1 pb-1">
          {/* Fall threshold line at 25cm */}
          <div className="absolute left-0 right-0 bottom-3 border-b-2 border-dashed border-rose-400/80 flex justify-end">
            <span className="text-[9px] font-mono font-bold text-rose-600 bg-white border border-rose-200 px-1.5 py-0.5 rounded-sm shadow-xs">
              {t.criticalThreshold}
            </span>
          </div>

          {elevationHistoryRef.current.map((elev, idx) => {
            const heightPercent = Math.max(5, Math.min(100, (elev / 180) * 100));
            const isUnderThreshold = elev < 25;
            return (
              <div
                key={idx}
                className="flex-1 rounded-t-xs transition-all duration-150"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: isUnderThreshold ? '#e11d48' : elev < 90 ? '#ea580c' : '#0d9488',
                  opacity: 0.35 + (idx / 60) * 0.65,
                }}
                title={`${elev.toFixed(0)} cm`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
