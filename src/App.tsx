/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SeniorPostureState, Language } from './types';
import { translations } from './i18n/translations';
import { CsiSpatialVisualizer } from './components/CsiSpatialVisualizer';
import { CsiWaveformMonitor } from './components/CsiWaveformMonitor';
import { SimulationControls } from './components/SimulationControls';
import { EmergencyAlertPanel } from './components/EmergencyAlertPanel';
import { HardwareArchitecture } from './components/HardwareArchitecture';
import { soundSynth } from './utils/audio';
import {
  Wifi,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Activity,
  Heart,
  EyeOff,
  Moon,
  Clock,
  ChevronRight,
  Sparkles,
  Terminal,
  Languages,
} from 'lucide-react';

interface TelemetryLog {
  id: string;
  time: string;
  type: 'INFO' | 'WARN' | 'ALERT' | 'SUCCESS';
  message: string;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const t = translations[language];

  const [postureState, setPostureState] = useState<SeniorPostureState>('walking');
  const [elevationCm, setElevationCm] = useState<number>(160);
  const [dopplerVelocity, setDopplerVelocity] = useState<number>(0.74);
  const [isDarknessMode, setIsDarknessMode] = useState<boolean>(false);
  const [isObstacleMode, setIsObstacleMode] = useState<boolean>(false);
  const [immobilitySeconds, setImmobilitySeconds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [dispatchConfirmed, setDispatchConfirmed] = useState<boolean>(false);

  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: 'log-1',
      time: '10:42:01',
      type: 'INFO',
      message: 'GeriCare Wi-Fi CSI daemon initialized. ESP32 nodes #1 & #2 paired.',
    },
    {
      id: 'log-2',
      time: '10:42:05',
      type: 'INFO',
      message: 'OFDM 64-subcarriers baseline calibrated at 5.24 GHz (Channel 48).',
    },
    {
      id: 'log-3',
      time: '10:42:15',
      type: 'SUCCESS',
      message: 'Privacy Shield verified: 0 optical lenses detected. 100% RF passive telemetry.',
    },
  ]);

  const addLog = (type: 'INFO' | 'WARN' | 'ALERT' | 'SUCCESS', message: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs((prev) => [
      { id: `log-${Date.now()}-${Math.random()}`, time: timeStr, type, message },
      ...prev.slice(0, 19),
    ]);
  };

  // Immobility counter effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (postureState === 'fallen_immobile') {
      interval = setInterval(() => {
        setImmobilitySeconds((sec) => sec + 1);
      }, 1000);
    } else {
      setImmobilitySeconds(0);
    }
    return () => clearInterval(interval);
  }, [postureState]);

  // Handle Scenario Selection
  const handleSelectScenario = (
    scenario: 'walking' | 'sitting' | 'standing' | 'fall_critical' | 'fall_recovering'
  ) => {
    if (scenario === 'walking') {
      setPostureState('walking');
      setElevationCm(160);
      setDopplerVelocity(0.74);
      setDispatchConfirmed(false);
      addLog('INFO', 'Posture transition: WALKING_SAFE. CoM: 160cm, Micro-Doppler: 0.74 m/s.');
    } else if (scenario === 'sitting') {
      setPostureState('sitting');
      setElevationCm(75);
      setDopplerVelocity(0.18);
      setDispatchConfirmed(false);
      addLog('INFO', 'Posture transition: SEATED_SAFE. CoM gradual descent to 75cm.');
    } else if (scenario === 'standing') {
      setPostureState('standing');
      setElevationCm(165);
      setDopplerVelocity(0.04);
      setDispatchConfirmed(false);
      addLog('INFO', 'Posture transition: STANDING_STABLE. CoM: 165cm.');
    } else if (scenario === 'fall_critical') {
      // 1. Initial fall moment (kinetic spike)
      setPostureState('falling');
      setElevationCm(40);
      setDopplerVelocity(3.82);
      if (soundEnabled) soundSynth.playEmergencyAlarm();
      addLog('ALERT', 'CRITICAL IMPULSE: Vertical acceleration >3.5 m/s across 64 subcarriers!');

      // 2. Impact and immobility on floor
      setTimeout(() => {
        setPostureState('fallen_immobile');
        setElevationCm(12);
        setDopplerVelocity(0.02);
        addLog('ALERT', 'FALL CONFIRMED: Subject motionless at floor level (<15cm). Timer started.');
      }, 650);
    } else if (scenario === 'fall_recovering') {
      // Stumble then self recovery
      setPostureState('falling');
      setElevationCm(35);
      setDopplerVelocity(2.65);
      addLog('WARN', 'Abrupt displacement detected. Monitoring for self-recovery window...');

      setTimeout(() => {
        setPostureState('recovering');
        setElevationCm(90);
        setDopplerVelocity(1.1);
        addLog('INFO', 'Self-reincorporation in progress: CoM rising above 80cm.');

        setTimeout(() => {
          setPostureState('walking');
          setElevationCm(160);
          setDopplerVelocity(0.74);
          if (soundEnabled) soundSynth.playSafeChime();
          addLog('SUCCESS', 'False alarm suppressed: Resident regained standing posture within 6s.');
        }, 1200);
      }, 900);
    }
  };

  const handleResetToSafe = () => {
    setPostureState('standing');
    setElevationCm(165);
    setDopplerVelocity(0.04);
    setImmobilitySeconds(0);
    setDispatchConfirmed(false);
    if (soundEnabled) soundSynth.playSafeChime();
    addLog('SUCCESS', 'System state manual reset: Resident safe and mobile.');
  };

  const handleConfirmDispatchNow = () => {
    setDispatchConfirmed(true);
    addLog('ALERT', 'Emergency 112 dispatched with CSI biomechanical report.');
  };

  const isCritical = postureState === 'fallen_immobile' || postureState === 'falling';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-orange-500/20 selection:text-orange-700">
      {/* Top Universal App Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo with Bold Typography */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Wifi className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tighter uppercase text-slate-900 leading-none block">
                GERI<span className="text-orange-600">CARE</span> WI-FI
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block -mt-0.5">
                {t.nav.subtitle}
              </span>
            </div>
          </div>

          {/* Center Status Badges */}
          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-800">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>{t.nav.rfActive}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-800">
              <EyeOff className="w-3 h-3 text-orange-600" />
              <span>{t.nav.privacyShield}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-800">
              <Radio className="w-3 h-3 text-teal-600" />
              <span>{t.nav.esp32Nodes}</span>
            </div>
          </div>

          {/* Right Action: Language Switcher and Quick Simulation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Buttons (Español / 中文 / English) */}
            <div
              id="language-switcher"
              className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-bold shadow-xs"
              role="group"
              aria-label={t.nav.languageToggle}
            >
              <button
                id="btn-lang-es"
                onClick={() => setLanguage('es')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'es'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Cambiar idioma a Español"
                aria-pressed={language === 'es'}
              >
                <span>🇪🇸</span>
                <span className="font-extrabold tracking-wider text-[11px]">ES</span>
                <span className="hidden md:inline font-semibold text-[11px]">Español</span>
              </button>

              <button
                id="btn-lang-zh"
                onClick={() => setLanguage('zh')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'zh'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="切换语言为中文"
                aria-pressed={language === 'zh'}
              >
                <span>🇨🇳</span>
                <span className="font-extrabold tracking-wider text-[11px]">中文</span>
              </button>

              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch language to English"
                aria-pressed={language === 'en'}
              >
                <span>🇬🇧</span>
                <span className="font-extrabold tracking-wider text-[11px]">EN</span>
              </button>
            </div>

            {/* Quick Simulation Trigger for Fall */}
            {!isCritical ? (
              <button
                id="btn-quick-simulate-fall"
                onClick={() => handleSelectScenario('fall_critical')}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all shrink-0"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.simulateFall}</span>
                <span className="sm:hidden text-[11px] font-bold">{t.nav.simulateFall.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                id="btn-quick-reset-safe"
                onClick={handleResetToSafe}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span className="hidden sm:inline">{t.nav.markSafe}</span>
                <span className="sm:hidden text-[11px] font-bold">{t.nav.markSafe.split(' ')[0]}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main App Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Bold Typography Statement & Real-time Room Beacon Header */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-orange-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.eyebrow}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none text-slate-900">
                {t.hero.headline} <span className="text-slate-400">{t.hero.headlineHighlight}</span>
              </h1>
              <p className="text-sm text-slate-600 font-medium leading-relaxed pt-1">
                {t.hero.description}
              </p>
            </div>

            {/* Resident Telemetry Room Card */}
            <div className="lg:w-80 p-4 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                    {t.hero.monitoredZone}
                  </span>
                  <span className="text-sm font-black uppercase tracking-wider text-slate-900">
                    {t.hero.roomName}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">{t.hero.residentLabel}</span>
                <span className="font-bold text-slate-900">{t.hero.residentName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{t.hero.statusLabel}</span>
                <span
                  className={`font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-[10px] ${
                    isCritical
                      ? 'bg-rose-600 text-white'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {isCritical ? t.hero.statusCritical : t.hero.statusSafe}
                </span>
              </div>

              {immobilitySeconds > 0 && (
                <div className="flex items-center justify-between text-xs pt-1 text-rose-600 font-bold font-mono">
                  <span>{t.hero.immobilityDuration}:</span>
                  <span>{immobilitySeconds}s</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dual Column Layout: Left (RF Visualizer & Waveforms) | Right (Controls, Dispatch & Hardware Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Stage (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 3D RF Spatial Abstract Posture Visualizer */}
            <CsiSpatialVisualizer
              language={language}
              postureState={postureState}
              elevationCm={elevationCm}
              isDarknessMode={isDarknessMode}
              isObstacleMode={isObstacleMode}
              onToggleDarkness={() => {
                const next = !isDarknessMode;
                setIsDarknessMode(next);
                addLog('INFO', next ? (language === 'zh' ? '已模拟全黑夜间模式（0勒克斯）：射频无线电波不受黑暗影响。' : language === 'es' ? 'Modo noche (0 Lux) simulado: las ondas RF no se ven afectadas por la oscuridad.' : 'Night mode (0 Lux) simulated: RF waves unaffected by darkness.') : (language === 'zh' ? '已恢复日间采光模式。' : language === 'es' ? 'Modo diurno restablecido.' : 'Daylight mode restored.'));
              }}
              onToggleObstacle={() => {
                const next = !isObstacleMode;
                setIsObstacleMode(next);
                addLog('INFO', next ? (language === 'zh' ? '已插入实体家具/墙体障碍物：子载波保持非视距（NLOS）强穿透。' : language === 'es' ? 'Obstáculo físico/pared insertado: las subportadoras mantienen penetración NLOS.' : 'Physical furniture / Wall obstacle inserted: Subcarriers maintain NLOS penetration.') : (language === 'zh' ? '已移除物理障碍物。' : language === 'es' ? 'Obstáculo físico retirado.' : 'Obstacle removed.'));
              }}
              immobilitySeconds={immobilitySeconds}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />

            {/* 64-Subcarriers CSI Waveform Monitor */}
            <CsiWaveformMonitor
              language={language}
              postureState={postureState}
              elevationCm={elevationCm}
              dopplerVelocity={dopplerVelocity}
            />

            {/* Hardware & RF Engineering Specs */}
            <HardwareArchitecture language={language} />
          </div>

          {/* Right Action & Control Column (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Scenario Simulator */}
            <SimulationControls
              language={language}
              currentPosture={postureState}
              onSelectScenario={handleSelectScenario}
              onResetToSafe={handleResetToSafe}
              isSimulating={isCritical}
            />

            {/* Emergency Alert & AI Clinical Triage with Gemini */}
            <EmergencyAlertPanel
              language={language}
              postureState={postureState}
              immobilitySeconds={immobilitySeconds}
              elevationCm={elevationCm}
              onCancelAlert={handleResetToSafe}
              onConfirmDispatchNow={handleConfirmDispatchNow}
              dispatchConfirmed={dispatchConfirmed}
            />

            {/* Live System Telemetry Terminal / Event Logs */}
            <div className="rounded-2xl bg-white border-2 border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-600" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
                    {t.terminal.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  {t.terminal.rateBadge}
                </span>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 max-h-52 overflow-y-auto space-y-2 border-2 border-slate-900 font-mono text-[11px]">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-tight">
                    <span className="text-slate-500 select-none">[{log.time}]</span>
                    <span
                      className={`font-bold select-none text-[10px] px-1 rounded ${
                        log.type === 'ALERT'
                          ? 'bg-rose-900 text-rose-200'
                          : log.type === 'WARN'
                          ? 'bg-orange-900 text-orange-200'
                          : log.type === 'SUCCESS'
                          ? 'bg-teal-900 text-teal-200'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {log.type}
                    </span>
                    <span
                      className={`flex-1 ${
                        log.type === 'ALERT'
                          ? 'text-rose-400 font-bold'
                          : log.type === 'WARN'
                          ? 'text-orange-300'
                          : log.type === 'SUCCESS'
                          ? 'text-teal-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Metrics & Social Guarantee Ribbon */}
      <footer className="bg-white border-t-2 border-slate-200 mt-10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6">
            <span className="text-slate-500 font-medium">
              {t.footer.activeNodes}:{' '}
              <strong className="text-slate-900 font-bold">{t.footer.activeNodesVal}</strong>
            </span>
            <span className="text-slate-500 font-medium hidden sm:inline">
              {t.footer.sampling}:{' '}
              <strong className="text-slate-900 font-bold">{t.footer.samplingVal}</strong>
            </span>
            <span className="text-slate-500 font-medium hidden md:inline">
              {t.footer.latency}:{' '}
              <strong className="text-teal-700 font-bold">{t.footer.latencyVal}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold uppercase tracking-wider border border-slate-200">
              {t.footer.guarantee1}
            </span>
            <span className="text-[10px] px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-bold uppercase tracking-wider border border-orange-200">
              {t.footer.guarantee2}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
