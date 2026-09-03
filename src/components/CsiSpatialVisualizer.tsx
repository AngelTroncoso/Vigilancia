import React, { useRef, useEffect, useState } from 'react';
import { SeniorPostureState, RoomNode, Language } from '../types';
import { translations } from '../i18n/translations';
import { EyeOff, Moon, Shield, Radio, Layers, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface CsiSpatialVisualizerProps {
  postureState: SeniorPostureState;
  elevationCm: number;
  isDarknessMode: boolean;
  isObstacleMode: boolean;
  onToggleDarkness: () => void;
  onToggleObstacle: () => void;
  immobilitySeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  language?: Language;
}

export const CsiSpatialVisualizer: React.FC<CsiSpatialVisualizerProps> = ({
  postureState,
  elevationCm,
  isDarknessMode,
  isObstacleMode,
  onToggleDarkness,
  onToggleObstacle,
  immobilitySeconds,
  soundEnabled,
  onToggleSound,
  language = 'es',
}) => {
  const t = translations[language].visualizer;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewAngle, setViewAngle] = useState<'iso' | 'top' | 'side'>('iso');

  // Node positions
  const nodes: RoomNode[] = [
    { id: 'router-tx', name: 'Router Wi-Fi 6 (TX)', type: 'router_tx', x: 0.15, y: 0.2, z: 1.8, status: 'broadcasting', ip: '192.168.1.1' },
    { id: 'esp32-rx1', name: 'ESP32-S3 #1 (RX)', type: 'esp32_rx', x: 0.85, y: 0.25, z: 0.9, status: 'online', ip: '192.168.1.142', rssi: -48 },
    { id: 'esp32-rx2', name: 'ESP32-S3 #2 (RX)', type: 'esp32_rx', x: 0.75, y: 0.85, z: 0.8, status: 'online', ip: '192.168.1.143', rssi: -52 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background depending on Darkness mode
      if (isDarknessMode) {
        ctx.fillStyle = '#05070e'; // Ultra dark pitch black
        ctx.fillRect(0, 0, width, height);

        // Subtle dark grid
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
        ctx.lineWidth = 1;
      } else {
        // Sophisticated slate darkroom background
        ctx.fillStyle = '#0b1120';
        ctx.fillRect(0, 0, width, height);
      }

      // Projection helper: coordinates (rx: 0..1, ry: 0..1, rz: 0..2) to screen (px, py)
      const project = (x: number, y: number, z: number) => {
        if (viewAngle === 'top') {
          return {
            x: 70 + x * (width - 140),
            y: 60 + y * (height - 120) - z * 10,
          };
        } else if (viewAngle === 'side') {
          return {
            x: 70 + x * (width - 140),
            y: height - 60 - z * 150,
          };
        }
        // Isometric 3D projection
        const originX = width * 0.5;
        const originY = height * 0.72;
        const scaleX = width * 0.42;
        const scaleY = height * 0.24;
        const scaleZ = height * 0.38;

        const isoX = originX + (x - y) * scaleX;
        const isoY = originY + (x + y - 1) * scaleY - z * scaleZ;
        return { x: isoX, y: isoY };
      };

      // 1. Draw 3D Floor Grid
      ctx.beginPath();
      const gridSteps = 6;
      ctx.strokeStyle = isDarknessMode ? 'rgba(45, 212, 191, 0.15)' : 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= gridSteps; i++) {
        const p1 = project(i / gridSteps, 0, 0);
        const p2 = project(i / gridSteps, 1, 0);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const p3 = project(0, i / gridSteps, 0);
        const p4 = project(1, i / gridSteps, 0);
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
      }
      ctx.stroke();

      // 2. Room Furniture (Sofa, Coffee Table, Door)
      // Sofa
      const sofaP1 = project(0.1, 0.65, 0);
      const sofaP2 = project(0.4, 0.65, 0);
      const sofaP3 = project(0.4, 0.9, 0);
      const sofaP4 = project(0.1, 0.9, 0);
      const sofaT1 = project(0.1, 0.65, 0.35);
      const sofaT2 = project(0.4, 0.65, 0.35);
      const sofaT3 = project(0.4, 0.9, 0.35);
      const sofaT4 = project(0.1, 0.9, 0.35);

      ctx.fillStyle = isDarknessMode ? 'rgba(30, 41, 59, 0.4)' : 'rgba(51, 65, 85, 0.4)';
      ctx.strokeStyle = isDarknessMode ? 'rgba(71, 85, 105, 0.4)' : 'rgba(100, 116, 139, 0.5)';
      ctx.beginPath();
      ctx.moveTo(sofaT1.x, sofaT1.y);
      ctx.lineTo(sofaT2.x, sofaT2.y);
      ctx.lineTo(sofaT3.x, sofaT3.y);
      ctx.lineTo(sofaT4.x, sofaT4.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Label for sofa
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('Sillón', sofaT1.x + 10, sofaT1.y - 4);

      // 3. Person's Coordinates & Posture Animation
      let personX = 0.52;
      let personY = 0.5;
      if (postureState === 'walking') {
        personX = 0.48 + Math.sin(t * 1.5) * 0.08;
        personY = 0.45 + Math.cos(t * 1.5) * 0.06;
      } else if (postureState === 'sitting') {
        personX = 0.25;
        personY = 0.72;
      } else if (postureState === 'fallen_immobile' || postureState === 'falling') {
        personX = 0.56;
        personY = 0.52;
      }

      const normZ = Math.max(0.1, elevationCm / 100); // 0.1 to 1.7

      // Human wireframe joint calculation
      const isFallen = postureState === 'fallen_immobile' || postureState === 'falling';
      const isSitting = postureState === 'sitting';

      // 3D Joints
      let headPos, spinePos, hipsPos, lHand, rHand, lFoot, rFoot;

      if (isFallen) {
        // Laying flat on the floor with subtle breathing motion
        const breath = Math.sin(t * 3) * 0.02;
        headPos = project(personX - 0.14, personY, 0.12 + breath);
        spinePos = project(personX - 0.05, personY, 0.14 + breath);
        hipsPos = project(personX + 0.05, personY, 0.12);
        lHand = project(personX - 0.08, personY - 0.08, 0.05);
        rHand = project(personX - 0.04, personY + 0.09, 0.05);
        lFoot = project(personX + 0.15, personY - 0.06, 0.05);
        rFoot = project(personX + 0.16, personY + 0.05, 0.05);
      } else if (isSitting) {
        headPos = project(personX, personY, normZ);
        spinePos = project(personX, personY, normZ * 0.7);
        hipsPos = project(personX, personY, 0.38);
        lHand = project(personX + 0.06, personY - 0.06, 0.38);
        rHand = project(personX + 0.06, personY + 0.06, 0.38);
        lFoot = project(personX + 0.12, personY - 0.05, 0.02);
        rFoot = project(personX + 0.12, personY + 0.05, 0.02);
      } else {
        // Standing / Walking
        const gaitPhase = t * 4;
        const footSwing = postureState === 'walking' ? Math.sin(gaitPhase) * 0.06 : 0;
        const armSwing = postureState === 'walking' ? Math.cos(gaitPhase) * 0.05 : 0;

        headPos = project(personX, personY, normZ);
        spinePos = project(personX, personY, normZ * 0.65);
        hipsPos = project(personX, personY, normZ * 0.45);
        lHand = project(personX - 0.05, personY - 0.06 + armSwing, normZ * 0.5);
        rHand = project(personX + 0.05, personY + 0.06 - armSwing, normZ * 0.5);
        lFoot = project(personX - 0.04, personY - 0.05 + footSwing, 0.02);
        rFoot = project(personX + 0.04, personY + 0.05 - footSwing, 0.02);
      }

      // 4. Draw RF Multipath Beams (Router TX -> Human Body -> ESP32 RX Nodes)
      const txPos = project(nodes[0].x, nodes[0].y, nodes[0].z);
      const rx1Pos = project(nodes[1].x, nodes[1].y, nodes[1].z);
      const rx2Pos = project(nodes[2].x, nodes[2].y, nodes[2].z);

      // Router TX Wave Radiations
      ctx.save();
      const waveCount = 4;
      for (let w = 0; w < waveCount; w++) {
        const waveRadius = ((t * 40 + w * 25) % 100);
        const alpha = Math.max(0, 1 - waveRadius / 100) * 0.35;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.arc(txPos.x, txPos.y, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Multipath reflected rays passing through/bouncing off the senior
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -t * 20;

      // Ray 1: TX -> Spine -> RX1
      ctx.beginPath();
      ctx.moveTo(txPos.x, txPos.y);
      ctx.lineTo(spinePos.x, spinePos.y);
      ctx.lineTo(rx1Pos.x, rx1Pos.y);
      ctx.strokeStyle = isFallen ? 'rgba(239, 68, 68, 0.55)' : 'rgba(45, 212, 191, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ray 2: TX -> Head -> RX2
      ctx.beginPath();
      ctx.moveTo(txPos.x, txPos.y);
      ctx.lineTo(headPos.x, headPos.y);
      ctx.lineTo(rx2Pos.x, rx2Pos.y);
      ctx.strokeStyle = isFallen ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();
      ctx.restore();

      // 5. Draw Obstacle (if toggled)
      if (isObstacleMode) {
        const wallP1 = project(0.45, 0.3, 0);
        const wallP2 = project(0.45, 0.7, 0);
        const wallT1 = project(0.45, 0.3, 1.4);
        const wallT2 = project(0.45, 0.7, 1.4);

        ctx.fillStyle = 'rgba(71, 85, 105, 0.65)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wallP1.x, wallP1.y);
        ctx.lineTo(wallP2.x, wallP2.y);
        ctx.lineTo(wallT2.x, wallT2.y);
        ctx.lineTo(wallT1.x, wallT1.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px Plus Jakarta Sans, sans-serif';
        ctx.fillText('Muro / Mueble (Obstáculo opaco)', wallT1.x - 30, wallT1.y - 8);

        // Highlight RF penetration
        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('RF 5GHz atraviesa el muro ✓', wallT1.x - 15, wallT1.y + 20);
      }

      // 6. Draw the Senior Posture (Dignified 3D RF Wireframe & Point Cloud - NO Video/Pixel Face)
      const primaryColor = isFallen ? '#ef4444' : '#2dd4bf'; // Red if fallen, Teal if safe
      const glowColor = isFallen ? 'rgba(239, 68, 68, 0.4)' : 'rgba(45, 212, 191, 0.3)';

      // Ground Shadow / Footprint Projection
      const groundCenter = project(personX, personY, 0);
      ctx.beginPath();
      ctx.ellipse(groundCenter.x, groundCenter.y, 24, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = isFallen ? 'rgba(239, 68, 68, 0.25)' : 'rgba(45, 212, 191, 0.15)';
      ctx.fill();

      // If fallen, draw pulsing warning circle on floor
      if (isFallen) {
        const haloRadius = 30 + Math.sin(t * 6) * 8;
        ctx.beginPath();
        ctx.ellipse(groundCenter.x, groundCenter.y, haloRadius, haloRadius * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Skeleton Bones
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 10;

      // Spine & Head
      ctx.beginPath();
      ctx.moveTo(headPos.x, headPos.y);
      ctx.lineTo(spinePos.x, spinePos.y);
      ctx.lineTo(hipsPos.x, hipsPos.y);
      // Arms
      ctx.moveTo(spinePos.x, spinePos.y);
      ctx.lineTo(lHand.x, lHand.y);
      ctx.moveTo(spinePos.x, spinePos.y);
      ctx.lineTo(rHand.x, rHand.y);
      // Legs
      ctx.moveTo(hipsPos.x, hipsPos.y);
      ctx.lineTo(lFoot.x, lFoot.y);
      ctx.moveTo(hipsPos.x, hipsPos.y);
      ctx.lineTo(rFoot.x, rFoot.y);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset

      // Joint Points (RF Point Cloud)
      const joints = [headPos, spinePos, hipsPos, lHand, rHand, lFoot, rFoot];
      joints.forEach((joint, idx) => {
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, idx === 0 ? 7 : 4, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#ffffff' : primaryColor;
        ctx.fill();
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Posture Height Metric Tag floating beside Head
      ctx.fillStyle = '#0f172a';
      const tagX = headPos.x + 18;
      const tagY = headPos.y - 10;
      ctx.fillRect(tagX - 4, tagY - 14, 110, 26);
      ctx.strokeStyle = isFallen ? '#ef4444' : '#0d9488';
      ctx.lineWidth = 1;
      ctx.strokeRect(tagX - 4, tagY - 14, 110, 26);

      ctx.fillStyle = isFallen ? '#fca5a5' : '#5eead4';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`Z: ${elevationCm.toFixed(0)}cm (${isFallen ? 'SUELO' : isSitting ? 'SENTADO' : 'DE PIE'})`, tagX, tagY);

      if (isFallen && immobilitySeconds > 0) {
        ctx.fillStyle = '#f87171';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`Inmóvil: ${immobilitySeconds}s`, tagX, tagY + 12);
      }

      // 7. Draw Wi-Fi Hardware Nodes
      // Router TX
      ctx.beginPath();
      ctx.arc(txPos.x, txPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Router Wi-Fi 6 (TX)', txPos.x - 45, txPos.y - 12);

      // ESP32 RX Nodes
      [rx1Pos, rx2Pos].forEach((pos, i) => {
        ctx.beginPath();
        ctx.rect(pos.x - 7, pos.y - 7, 14, 14);
        ctx.fillStyle = '#059669';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Blinking LED
        if (Math.sin(t * 10 + i) > 0) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#6ee7b7';
          ctx.fill();
        }

        ctx.fillStyle = '#34d399';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`ESP32-S3 #${i + 1}`, pos.x - 30, pos.y + 18);
      });

      // 8. Darkness Badge if Active
      if (isDarknessMode) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(16, 16, 230, 48);
        ctx.strokeRect(16, 16, 230, 48);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
        const darkTitle =
          language === 'zh'
            ? '🌙 0 LUX 全黑微光环境'
            : language === 'en'
            ? '🌙 TOTAL DARKNESS (0 LUX)'
            : '🌙 MODO OSCURIDAD TOTAL (0 LUX)';
        ctx.fillText(darkTitle, 26, 34);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        const darkSubtitle =
          language === 'zh'
            ? '传统摄像头失效。Wi-Fi CSI 100%全向工作'
            : language === 'en'
            ? 'Cameras fail. Wi-Fi CSI 100% active.'
            : 'Las cámaras fallan. Wi-Fi CSI 100% activo.';
        ctx.fillText(darkSubtitle, 26, 50);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [postureState, elevationCm, isDarknessMode, isObstacleMode, viewAngle, immobilitySeconds, language]);

  return (
    <div id="csi-spatial-visualizer-container" className="relative rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-sm">
      {/* Visualizer Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              {t.title}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono font-bold tracking-tight">
                {t.subcarrierRate}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* View Perspective Buttons */}
          <div className="flex items-center p-1 rounded-full bg-slate-200 border border-slate-300 text-xs">
            <button
              id="btn-view-iso"
              onClick={() => setViewAngle('iso')}
              className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
                viewAngle === 'iso' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.viewIso}
            </button>
            <button
              id="btn-view-top"
              onClick={() => setViewAngle('top')}
              className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
                viewAngle === 'top' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.viewTop}
            </button>
            <button
              id="btn-view-side"
              onClick={() => setViewAngle('side')}
              className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all ${
                viewAngle === 'side' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.viewSide}
            </button>
          </div>

          {/* Darkness Toggle */}
          <button
            id="btn-toggle-darkness"
            onClick={onToggleDarkness}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all ${
              isDarknessMode
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-orange-500" />
            <span>{isDarknessMode ? t.darknessOn : t.simulateDarkness}</span>
          </button>

          {/* Obstacle Penetration Toggle */}
          <button
            id="btn-toggle-obstacle"
            onClick={onToggleObstacle}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all ${
              isObstacleMode
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isObstacleMode ? t.wallActive : t.addWall}</span>
          </button>

          {/* Sound toggle */}
          <button
            id="btn-toggle-audio"
            onClick={onToggleSound}
            className={`p-2 rounded-full text-xs border-2 transition-colors ${
              soundEnabled
                ? 'bg-orange-50 text-orange-600 border-orange-600'
                : 'bg-white text-slate-400 border-slate-300 hover:text-slate-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[16/9] min-h-[340px] max-h-[460px] bg-slate-950">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full h-full object-contain block"
        />

        {/* Privacy Seal Floating Badge */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md text-xs text-white shadow-xl">
          <Shield className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-bold uppercase tracking-widest text-[10px]">{t.privacySeal}</span>
        </div>

        {/* Dynamic Status Indicator overlay */}
        <div className="absolute top-4 right-6 flex flex-col items-end gap-2">
          <div
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl border-2 ${
              postureState === 'fallen_immobile'
                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                : postureState === 'falling'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white/95 text-slate-900 border-slate-900'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                postureState === 'fallen_immobile'
                  ? 'bg-white'
                  : postureState === 'falling'
                  ? 'bg-white'
                  : 'bg-teal-500'
              }`}
            />
            {postureState === 'fallen_immobile' && t.postureAlert}
            {postureState === 'falling' && t.postureImpact}
            {postureState === 'sitting' && t.postureSitting}
            {postureState === 'walking' && t.postureWalking}
            {postureState === 'standing' && t.postureStanding}
            {postureState === 'recovering' && t.postureRecovering}
          </div>

          <div className="text-[11px] font-mono font-semibold text-slate-300 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700">
            {postureState === 'falling' ? t.dopplerCritical : postureState === 'walking' ? t.dopplerNormal : t.dopplerStatic}
          </div>
        </div>
      </div>

      {/* Social / Technical Advantage Ribbon below canvas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x-2 divide-slate-200 bg-slate-50 border-t-2 border-slate-200 text-xs">
        <div className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black uppercase tracking-wider text-slate-900 block text-xs">{t.feat1Title}</span>
            <span className="text-slate-500 mt-0.5 block leading-relaxed font-medium">{t.feat1Desc}</span>
          </div>
        </div>
        <div className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black uppercase tracking-wider text-slate-900 block text-xs">{t.feat2Title}</span>
            <span className="text-slate-500 mt-0.5 block leading-relaxed font-medium">{t.feat2Desc}</span>
          </div>
        </div>
        <div className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black uppercase tracking-wider text-slate-900 block text-xs">{t.feat3Title}</span>
            <span className="text-slate-500 mt-0.5 block leading-relaxed font-medium">{t.feat3Desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
