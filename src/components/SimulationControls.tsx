import React from 'react';
import { SeniorPostureState, Language } from '../types';
import { translations } from '../i18n/translations';
import { Footprints, Armchair, AlertTriangle, ShieldCheck, PlayCircle, RefreshCw, Zap } from 'lucide-react';

interface SimulationControlsProps {
  currentPosture: SeniorPostureState;
  onSelectScenario: (scenario: 'walking' | 'sitting' | 'standing' | 'fall_critical' | 'fall_recovering') => void;
  onResetToSafe: () => void;
  isSimulating: boolean;
  language?: Language;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  currentPosture,
  onSelectScenario,
  onResetToSafe,
  isSimulating,
  language = 'es',
}) => {
  const t = translations[language].simulation;

  return (
    <div id="simulation-controls" className="rounded-2xl bg-white border-2 border-slate-200 p-6 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <PlayCircle className="w-4 h-4" />
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
        <button
          onClick={onResetToSafe}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 hover:border-slate-900 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.resetBtn}</span>
        </button>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        {t.description}
      </p>

      {/* Scenario Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Scenario 1: Caminar */}
        <button
          id="btn-scenario-walking"
          onClick={() => onSelectScenario('walking')}
          className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
            currentPosture === 'walking'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            currentPosture === 'walking' ? 'bg-orange-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}>
            <Footprints className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">{t.scenario1Title}</span>
              {currentPosture === 'walking' && (
                <span className="text-[10px] bg-orange-500 text-white font-bold uppercase px-2 py-0.5 rounded-full">
                  {t.activeBadge}
                </span>
              )}
            </div>
            <p className={`text-[11px] mt-1 font-medium leading-normal ${currentPosture === 'walking' ? 'text-slate-300' : 'text-slate-500'}`}>
              {t.scenario1Desc}
            </p>
          </div>
        </button>

        {/* Scenario 2: Sentarse */}
        <button
          id="btn-scenario-sitting"
          onClick={() => onSelectScenario('sitting')}
          className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
            currentPosture === 'sitting'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            currentPosture === 'sitting' ? 'bg-orange-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}>
            <Armchair className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">{t.scenario2Title}</span>
              {currentPosture === 'sitting' && (
                <span className="text-[10px] bg-orange-500 text-white font-bold uppercase px-2 py-0.5 rounded-full">
                  {t.activeBadge}
                </span>
              )}
            </div>
            <p className={`text-[11px] mt-1 font-medium leading-normal ${currentPosture === 'sitting' ? 'text-slate-300' : 'text-slate-500'}`}>
              {t.scenario2Desc}
            </p>
          </div>
        </button>

        {/* Scenario 3: Caída Crítica */}
        <button
          id="btn-scenario-fall-critical"
          onClick={() => onSelectScenario('fall_critical')}
          className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
            currentPosture === 'fallen_immobile' || currentPosture === 'falling'
              ? 'bg-rose-600 text-white border-rose-600 shadow-lg animate-pulse'
              : 'bg-rose-50/50 border-rose-200 hover:border-rose-400 text-slate-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            currentPosture === 'fallen_immobile' || currentPosture === 'falling'
              ? 'bg-white text-rose-600'
              : 'bg-rose-100 text-rose-600'
          }`}>
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">{t.scenario3Title}</span>
              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-rose-700">
                {t.emergencyBadge}
              </span>
            </div>
            <p className={`text-[11px] mt-1 font-medium leading-normal ${
              currentPosture === 'fallen_immobile' || currentPosture === 'falling'
                ? 'text-rose-100'
                : 'text-rose-800'
            }`}>
              {t.scenario3Desc}
            </p>
          </div>
        </button>

        {/* Scenario 4: Auto-Recuperación */}
        <button
          id="btn-scenario-recovering"
          onClick={() => onSelectScenario('fall_recovering')}
          className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
            currentPosture === 'recovering'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            currentPosture === 'recovering' ? 'bg-orange-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">{t.scenario4Title}</span>
              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                {t.aiFilterBadge}
              </span>
            </div>
            <p className={`text-[11px] mt-1 font-medium leading-normal ${currentPosture === 'recovering' ? 'text-slate-300' : 'text-slate-500'}`}>
              {t.scenario4Desc}
            </p>
          </div>
        </button>
      </div>

      {/* Real-time sensing indicators note */}
      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
        <Zap className="w-3.5 h-3.5 text-orange-600 shrink-0" />
        <span>{t.samplingNote}</span>
      </div>
    </div>
  );
};
