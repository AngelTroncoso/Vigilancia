import React, { useState } from 'react';
import { Cpu, Wifi, ShieldCheck, Moon, Layers, Zap, Info, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HardwareArchitectureProps {
  language?: Language;
}

export const HardwareArchitecture: React.FC<HardwareArchitectureProps> = ({ language = 'es' }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'specs' | 'privacy'>('flow');
  const t = translations[language].hardware;

  return (
    <div id="hardware-architecture" className="rounded-2xl bg-white border-2 border-slate-200 p-6 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4 text-orange-500" />
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

        {/* Tab Pills */}
        <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
              activeTab === 'flow' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabPipeline}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
              activeTab === 'specs' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabBOM}
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
              activeTab === 'privacy' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabPrivacy}
          </button>
        </div>
      </div>

      {activeTab === 'flow' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">{t.step1Tag}</span>
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <h5 className="font-bold text-slate-900 uppercase text-xs">{t.step1Title}</h5>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-teal-600 uppercase">{t.step2Tag}</span>
                <Layers className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <h5 className="font-bold text-slate-900 uppercase text-xs">{t.step2Title}</h5>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-900 uppercase">{t.step3Tag}</span>
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <h5 className="font-bold text-slate-900 uppercase text-xs">{t.step3Title}</h5>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 uppercase text-xs">{t.bom1Title}</span>
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {t.bom1Price}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium">
              {t.bom1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 uppercase text-xs">{t.bom2Title}</span>
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {t.bom2Price}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium">
              {t.bom2Desc}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider text-xs">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>{t.privacyHeadline}</span>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed">
            {t.privacyBody}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>{t.privacyBullet1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>{t.privacyBullet2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>{t.privacyBullet3}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>{t.privacyBullet4}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
