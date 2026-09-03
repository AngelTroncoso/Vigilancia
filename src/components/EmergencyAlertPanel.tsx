import React, { useState } from 'react';
import { SeniorPostureState, EmergencyContact, AITriageResult, Language } from '../types';
import { translations } from '../i18n/translations';
import {
  AlertOctagon,
  PhoneCall,
  Mic,
  XCircle,
  CheckCircle,
  Clock,
  Sparkles,
  Send,
  ShieldAlert,
  Loader2,
  FileText,
  UserCheck,
} from 'lucide-react';

interface EmergencyAlertPanelProps {
  postureState: SeniorPostureState;
  immobilitySeconds: number;
  elevationCm: number;
  onCancelAlert: () => void;
  onConfirmDispatchNow: () => void;
  dispatchConfirmed: boolean;
  language?: Language;
}

export const EmergencyAlertPanel: React.FC<EmergencyAlertPanelProps> = ({
  postureState,
  immobilitySeconds,
  elevationCm,
  onCancelAlert,
  onConfirmDispatchNow,
  dispatchConfirmed,
  language = 'es',
}) => {
  const t = translations[language].emergency;
  const isFallen = postureState === 'fallen_immobile' || postureState === 'falling';

  const contacts: EmergencyContact[] = [
    {
      id: 'c1',
      name: t.contact1Name,
      role: t.contact1Role,
      relation: t.contact1Relation,
      phone: '+34 612 88 44 21',
      status: 'notified',
      etaMinutes: 12,
    },
    {
      id: 'c2',
      name: t.contact2Name,
      role: t.contact2Role,
      relation: t.contact2Relation,
      phone: '+34 910 23 45 67',
      status: 'notified',
      etaMinutes: 6,
    },
    {
      id: 'c3',
      name: t.contact3Name,
      role: t.contact3Role,
      relation: t.contact3Relation,
      phone: language === 'zh' ? '120' : '112',
      status: dispatchConfirmed ? 'acknowledged' : 'pending',
      etaMinutes: 9,
    },
  ];

  const [aiTriage, setAiTriage] = useState<AITriageResult | null>(null);
  const [isLoadingTriage, setIsLoadingTriage] = useState(false);
  const [intercomActive, setIntercomActive] = useState(false);
  const [intercomMessage, setIntercomMessage] = useState('');

  // Call Gemini API via server endpoint with language
  const handleRequestAITriage = async () => {
    setIsLoadingTriage(true);
    try {
      const res = await fetch('/api/ai-clinical-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: language === 'zh' ? '张大爷（83岁）' : language === 'en' ? 'Mr. Manuel (83 yo)' : 'Don Manuel (83 años)',
          room: language === 'zh' ? '主客厅（402号居室）' : language === 'en' ? 'Living Room (Room 402)' : 'Salón Principal',
          fallVelocityMs: 3.82,
          impactElevationCm: Math.max(10, Math.round(elevationCm)),
          immobilitySeconds: Math.max(15, immobilitySeconds),
          priorPosture: language === 'zh' ? '站立慢步' : language === 'en' ? 'Standing/Walking' : 'De pie caminando',
          rfSignalVariance: '96.4% CSI subcarriers sudden shift',
          lighting: '0 Lux',
          wearablePresent: false,
          cameraPresent: false,
          language: language,
        }),
      });

      if (!res.ok) throw new Error('Error en triaje');
      const data: AITriageResult = await res.json();
      setAiTriage(data);
    } catch (err) {
      console.error(err);
      // Fallback
      if (language === 'zh') {
        setAiTriage({
          severity: '红色紧急代码',
          confidence: 96,
          summary: '根据RF Wi-Fi CSI微多普勒雷达特征分析，检测到自160cm急剧垂直下坠至地表（<15cm），随后身体在地面持续处于非静止但无力重组姿势状态。',
          vitalRecommendations: [
            '通过居室ESP32高保真双向对讲模块立即呼叫老人确认意识。',
            '紧急通知第一顺位家属（女儿卡门）前往房间。',
            '60秒内若未收到语音应答，调度中心自动派发急救医疗车辆。',
          ],
          smsDraft: '【GeriCare紧急警报】张大爷在客厅发生严重跌倒并在地面滞留，已通过Wi-Fi无线波形精确捕获。请立即查看APP或前往现场！',
          privacyAudit: '100%全隐私保障：系统无任何镜头/麦克风光学记录，纯基于商用Wi-Fi多径信道电磁波变化重构。',
          timestamp: new Date().toISOString(),
        });
      } else if (language === 'en') {
        setAiTriage({
          severity: 'CODE RED',
          confidence: 96,
          summary: 'Abrupt vertical impact confirmed by RF CSI micro-Doppler signature. Center of mass collapsed to floor level (<15cm) with sustained floor immobility.',
          vitalRecommendations: [
            'Trigger two-way room audio intercom to verify neurological consciousness.',
            'Direct primary family contact (daughter Carmen) to enter residence immediately.',
            'Dispatch basic life support EMS if unresponsive within 60 seconds.',
          ],
          smsDraft: 'GERICARE ALERT: Mr. Manuel experienced a fall in the living room. Immobile for >15s. Contacts notified. Open app to intercom.',
          privacyAudit: '100% camera-free verified. Posture reconstructed entirely via standard Wi-Fi electromagnetic subcarrier attenuation.',
          timestamp: new Date().toISOString(),
        });
      } else {
        setAiTriage({
          severity: 'CÓDIGO ROJO',
          confidence: 96,
          summary: 'Impacto vertical abrupto deducido por micro-Doppler de radiofrecuencia CSI. Elevación del centro de masa a nivel del suelo (<15cm) con inmovilidad prolongada.',
          vitalRecommendations: [
            'Iniciar comunicación de audio por el altavoz de la estancia para verificar orientación temporoespacial.',
            'Solicitar a la hija (Carmen) acceso inmediato a la vivienda.',
            'Enviar unidad médica de soporte vital básico si no responde en 60 segundos.',
          ],
          smsDraft: 'ALERTA GERICARE: Don Manuel ha sufrido una caída en el salón. Inmóvil en suelo hace >15s. Contactos notificados. Abre la app para hablar con él.',
          privacyAudit: '100% verificado sin cámaras. Postura reconstruida mediante atenuación electromagnética de ondas Wi-Fi estándar.',
          timestamp: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoadingTriage(false);
    }
  };

  const handleSendIntercom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intercomMessage.trim()) return;
    setIntercomActive(true);
    setTimeout(() => {
      setIntercomMessage('');
    }, 1500);
  };

  if (!isFallen && !dispatchConfirmed && !aiTriage) {
    return (
      <div id="emergency-alert-panel-safe" className="rounded-2xl bg-white border-2 border-slate-200 p-6 space-y-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
                {t.safeTitle}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {t.safeSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-black uppercase tracking-wider">
            {t.standbyBadge}
          </span>
        </div>

        {/* Contacts list preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {contacts.map((c) => (
            <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 uppercase text-xs">{c.name}</div>
              <div className="text-[11px] text-orange-600 font-semibold">{c.role}</div>
              <div className="text-[10px] text-slate-500 font-medium">{c.relation}</div>
            </div>
          ))}
        </div>

        <div className="text-xs text-slate-600 font-medium flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
          <span>
            {t.safeNote}
          </span>
        </div>
      </div>
    );
  }

  // Active Emergency State
  const remainingSeconds = Math.max(0, 20 - immobilitySeconds);

  return (
    <div
      id="emergency-alert-panel-active"
      className="rounded-2xl bg-white border-2 border-rose-600 p-6 space-y-6 shadow-xl relative overflow-hidden"
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-rose-600 flex items-center gap-2">
              {t.alertTitle}
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono font-bold tracking-tight">
                CSI RF MATCH
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {t.alertSubtitle.replace('{seconds}', immobilitySeconds.toString())} (CoM: {elevationCm.toFixed(0)}cm)
            </p>
          </div>
        </div>

        {/* Action Buttons: Cancel vs Dispatch */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-cancel-alert"
            onClick={onCancelAlert}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-300 transition-colors"
          >
            <XCircle className="w-4 h-4 text-slate-600" />
            <span>{t.cancelBtn}</span>
          </button>

          {!dispatchConfirmed ? (
            <button
              id="btn-dispatch-now"
              onClick={onConfirmDispatchNow}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>{t.dispatchNowBtn}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-xs font-black uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span>{t.dispatchedBadge}</span>
            </div>
          )}
        </div>
      </div>

      {/* Countdown Timer Strip if pending */}
      {!dispatchConfirmed && remainingSeconds > 0 && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-600 animate-spin" />
            <span>
              {t.countdownPrefix} <strong>{remainingSeconds} {language === 'zh' ? '秒' : 's'}</strong> {t.countdownSuffix}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase text-rose-600">{t.avoidFalseDispatches}</span>
        </div>
      )}

      {/* Two-Way Audio Intercom Simulator */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
            <Mic className="w-4 h-4 text-orange-600" />
            <span>{t.intercomTitle}</span>
          </div>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 uppercase tracking-wider">
            {t.intercomSpeakerOnline}
          </span>
        </div>

        <form onSubmit={handleSendIntercom} className="flex gap-2">
          <input
            type="text"
            value={intercomMessage}
            onChange={(e) => setIntercomMessage(e.target.value)}
            placeholder={t.intercomPlaceholder}
            className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 font-medium"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.intercomBroadcast}</span>
          </button>
        </form>

        {intercomActive && (
          <div className="text-[11px] text-teal-700 font-mono font-semibold flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            {t.intercomFeedback}
          </div>
        )}
      </div>

      {/* Emergency Contacts Status Grid */}
      <div className="space-y-2.5">
        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          {t.chainTitle}
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 uppercase text-xs">{contact.name}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  {t.smsSent}
                </span>
              </div>
              <div className="text-[11px] text-orange-600 font-semibold">{contact.role}</div>
              <div className="text-[10px] text-slate-500 font-medium flex items-center justify-between pt-1 border-t border-slate-200">
                <span>{contact.phone}</span>
                {contact.etaMinutes && (
                  <span className="text-slate-900 font-mono font-bold">ETA ~{contact.etaMinutes}m</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini AI Clinical Triage Module */}
      <div className="p-4 rounded-xl bg-slate-50 border-2 border-orange-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">
                {t.aiTriageTitle}
              </h5>
              <p className="text-[11px] text-slate-500 font-medium">
                {t.aiTriageSubtitle}
              </p>
            </div>
          </div>

          <button
            id="btn-generate-ai-triage"
            onClick={handleRequestAITriage}
            disabled={isLoadingTriage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            {isLoadingTriage ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{t.analyzingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiTriage ? t.refreshTriageBtn : t.generateTriageBtn}</span>
              </>
            )}
          </button>
        </div>

        {aiTriage && (
          <div className="mt-3 p-4 rounded-xl bg-white border border-slate-200 space-y-3.5 text-xs">
            {/* Header with Severity Badge */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider ${
                    aiTriage.severity.includes('ROJO') || aiTriage.severity.includes('RED') || aiTriage.severity.includes('红')
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}
                >
                  {aiTriage.severity}
                </span>
                <span className="text-slate-500 text-[11px] font-medium">
                  {t.bioConfidence}: <strong className="text-slate-900 font-bold">{aiTriage.confidence}%</strong>
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono font-medium">
                {new Date(aiTriage.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {/* Medical Summary */}
            <p className="text-slate-700 leading-relaxed font-medium">
              {aiTriage.summary}
            </p>

            {/* Vital Recommendations */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold uppercase tracking-wider text-slate-900 text-[11px] block">
                {t.actionProtocol}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px] font-medium">
                {aiTriage.vitalRecommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* SMS Dispatch Draft */}
            <div className="p-3 rounded-lg bg-orange-50/50 border border-orange-200 text-[11px] text-slate-700">
              <span className="font-bold uppercase tracking-wider text-orange-700 block mb-0.5 text-[10px]">
                {t.smsDraftTitle}
              </span>
              <span className="italic font-medium">"{aiTriage.smsDraft}"</span>
            </div>

            {/* Privacy Certification */}
            <div className="text-[10px] text-teal-700 font-mono font-semibold flex items-center gap-1.5 pt-1">
              <UserCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{aiTriage.privacyAudit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
