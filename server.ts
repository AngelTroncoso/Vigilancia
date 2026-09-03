import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    system: 'GeriCare Wi-Fi CSI Fall Sensing Engine',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Device status endpoint
app.get('/api/devices', (_req, res) => {
  res.json({
    nodes: [
      {
        id: 'ESP32-S3-NODE-01',
        label: 'Habitación Principal (Nodo RX 1)',
        ip: '192.168.1.142',
        rssi: -48,
        csiRateHz: 100,
        subcarriers: 64,
        status: 'online',
        firmware: 'v2.4.1-csi-capture',
        lastPacketMsAgo: 12,
      },
      {
        id: 'ESP32-S3-NODE-02',
        label: 'Sala / Pasillo (Nodo RX 2)',
        ip: '192.168.1.143',
        rssi: -54,
        csiRateHz: 100,
        subcarriers: 64,
        status: 'online',
        firmware: 'v2.4.1-csi-capture',
        lastPacketMsAgo: 15,
      },
      {
        id: 'ROUTER-TX-01',
        label: 'Router Wi-Fi 6 AX3000 (Nodo TX)',
        ip: '192.168.1.1',
        band: '5GHz (Canal 48 - 80MHz)',
        status: 'broadcasting',
        txPowerDbm: 20,
      },
    ],
  });
});

// AI Clinical Assessment via Gemini
app.post('/api/ai-clinical-triage', async (req, res) => {
  try {
    const {
      patientName = 'Don Manuel (83 años)',
      room = 'Salón principal',
      fallVelocityMs = 3.8,
      impactElevationCm = 12,
      immobilitySeconds = 24,
      priorPosture = 'De pie caminando',
      rfSignalVariance = '94.2% disturbio Fresnel súbito',
      lighting = '0 Lux (Oscuridad Total)',
      wearablePresent = false,
      cameraPresent = false,
      language = 'es',
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured clinical triage if no API key is set
      if (language === 'zh') {
        const code = immobilitySeconds > 20 ? '红码 (极高危)' : '黄码 (中危)';
        return res.json({
          severity: code,
          confidence: 96,
          summary: `通过CSI多普勒微动在${room}检测到剧烈坠落。垂直急剧位移（速度 ${fallVelocityMs} m/s），落点距地面仅 ${impactElevationCm} cm。射频高精度记录地面静止持续达 ${immobilitySeconds} 秒，全程无摄像头入侵隐私。`,
          vitalRecommendations: [
            '立即激活双向扩音对讲，确认受护老人意识与空间定向反应。',
            '紧急通知第一顺位家属及社区值班护工前往开门。',
            '若地面失能时间超过45秒，立即调度救护车并提示排查髋关节骨折与颅脑损伤风险。',
          ],
          smsDraft: `🚨 GERICARE 紧急告警：检测到老人于${room}摔倒。卧地已达 ${immobilitySeconds} 秒。已联动急救，请速打开App进行双向语音对讲。`,
          privacyAudit: '物理级纯射频感知：零摄像头、零穿戴手环。全程仅依据商用Wi-Fi子载波（CSI）衰减特性完成监测。',
          timestamp: new Date().toISOString(),
        });
      } else if (language === 'en') {
        const code = immobilitySeconds > 20 ? 'CODE RED' : 'CODE YELLOW';
        return res.json({
          severity: code,
          confidence: 96,
          summary: `Sudden floor fall detected via CSI micro-Doppler in ${room}. Abrupt vertical velocity (${fallVelocityMs} m/s) terminating ${impactElevationCm} cm above floor. Prolonged immobility of ${immobilitySeconds}s recorded with zero privacy invasion.`,
          vitalRecommendations: [
            'Initiate two-way audio speaker broadcast to verify conscious response.',
            'Alert primary emergency contact and residential care assistant.',
            'If floor immobility exceeds 45s, dispatch ambulance with hip/head trauma protocol.',
          ],
          smsDraft: `🚨 GERICARE ALERT: Don Manuel suffered a detected fall in ${room}. Immobile on floor for ${immobilitySeconds}s. Contacts notified. Open app for live intercom.`,
          privacyAudit: '100% camera-free and wearable-free. Processed exclusively via Wi-Fi CSI subcarrier perturbation analysis.',
          timestamp: new Date().toISOString(),
        });
      } else {
        const code = immobilitySeconds > 20 ? 'CÓDIGO ROJO' : 'CÓDIGO AMARILLO';
        return res.json({
          severity: code,
          confidence: 96,
          summary: `Caída detectada por micro-Doppler CSI en ${room}. Desplazamiento vertical abrupto (${fallVelocityMs} m/s) finalizando a ${impactElevationCm} cm del suelo. Inmovilidad prolongada de ${immobilitySeconds} segundos registrada con precisión RF sin invadir privacidad.`,
          vitalRecommendations: [
            'Activar altavoz de comunicación bidireccional inmediata para verificar respuesta consciente.',
            'Alertar al contacto de emergencia prioritario (Hija) y conserjería del edificio.',
            'Si la inmovilidad supera 45s, despachar ambulancia con aviso de posible traumatismo de cadera/craneal.',
          ],
          smsDraft: `🚨 ALERTA GERICARE: Don Manuel sufrió una caída detectada en ${room}. Postura en suelo hace ${immobilitySeconds}s. Ambulancia/Contactos notificados. Abre la app para audio bidireccional.`,
          privacyAudit: '100% libre de cámaras y pulseras. Datos procesados exclusivamente mediante perturbaciones de subportadoras Wi-Fi (CSI).',
          timestamp: new Date().toISOString(),
        });
      }
    }

    const langInstruction =
      language === 'zh'
        ? 'Output the JSON response entirely in Simplified Chinese (中文).'
        : language === 'en'
        ? 'Output the JSON response entirely in English.'
        : 'Output the JSON response entirely in Spanish (Español).';

    const prompt = `Act as the medical emergency triage engine for "GeriCare Wi-Fi", a telehealth technology detecting senior falls via Wi-Fi Channel State Information (CSI) disturbance analysis with zero cameras and zero wearables.
${langInstruction}

Incident data:
- Patient: ${patientName}
- Room: ${room}
- Estimated impact velocity via CSI Doppler: ${fallVelocityMs} m/s (normal walking < 1.2 m/s, critical fall > 3.0 m/s)
- Center of mass elevation post-impact: ${impactElevationCm} cm above floor (standing ~160 cm, sitting ~75 cm, floor < 20 cm)
- Floor immobility time: ${immobilitySeconds} seconds
- Prior posture: ${priorPosture}
- CSI subcarrier variance: ${rfSignalVariance}
- Lighting: ${lighting} (testing at 0 lux absolute darkness)
- Physical wearables: ${wearablePresent ? 'Yes' : 'None (no bracelets, no pendants)'}
- Cameras: ${cameraPresent ? 'Yes' : 'ZERO cameras (complete privacy & dignity guaranteed)'}

Return strictly valid JSON with these fields:
{
  "severity": "CODE RED / CÓDIGO ROJO / 红码",
  "confidence": number between 90 and 99,
  "summary": "Concise clinical assessment of the physical event deduced by CSI RF",
  "vitalRecommendations": ["action 1", "action 2", "action 3"],
  "smsDraft": "Urgent short text for family SMS",
  "privacyAudit": "Note certifying detection occurred with 0 cameras and 0 wearables"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response from Gemini API');
    }

    const parsed = JSON.parse(text);
    return res.json({
      ...parsed,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/ai-clinical-triage:', error);
    return res.status(500).json({
      error: 'Error generating clinical triage',
      fallback: {
        severity: 'CÓDIGO ROJO',
        confidence: 94,
        summary: 'Impacto vertical de alta aceleración registrado por subportadoras Wi-Fi con inmovilidad sostenida.',
        vitalRecommendations: [
          'Verificar estado del paciente mediante interfono de voz.',
          'Notificar de inmediato a familiares y equipo de socorro.',
        ],
        smsDraft: 'ALERTA GERICARE: Posible caída detectada en el hogar. Contactando servicios de soporte.',
      },
    });
  }
});

// Simulated dispatch endpoint
app.post('/api/dispatch-alert', (req, res) => {
  const { alertType = 'FALL_CONFIRMED', recipient = 'Emergencias 112 y Familiar' } = req.body;
  res.json({
    success: true,
    dispatchId: `DISPATCH-${Date.now().toString(36).toUpperCase()}`,
    alertType,
    recipient,
    dispatchedAt: new Date().toISOString(),
    message: 'Protocolo de auxilio activado con telemetría de ubicación de sala exacta.',
  });
});

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GeriCare Wi-Fi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
