export type SeniorPostureState = 'standing' | 'walking' | 'sitting' | 'falling' | 'fallen_immobile' | 'recovering';

export type Language = 'es' | 'zh' | 'en';

export interface RoomNode {
  id: string;
  name: string;
  type: 'router_tx' | 'esp32_rx';
  x: number; // percentage in room
  y: number;
  z: number;
  status: 'online' | 'broadcasting' | 'idle';
  rssi?: number;
  ip: string;
}

export interface CSIPacketSample {
  timestamp: number;
  subcarrierAmplitudes: number[]; // 64 subcarriers
  dopplerVelocity: number; // m/s
  elevationCm: number; // cm above ground
  phaseVariance: number; // 0 - 1
  fresnelDisturbance: number; // 0 - 100%
}

export interface FallIncidentData {
  patientName: string;
  age: number;
  room: string;
  timestamp: string;
  fallVelocityMs: number;
  impactElevationCm: number;
  immobilitySeconds: number;
  priorPosture: string;
  rfSignalVariance: string;
  lighting: string;
  wearablePresent: boolean;
  cameraPresent: boolean;
}

export interface AITriageResult {
  severity: 'CÓDIGO ROJO' | 'CÓDIGO AMARILLO' | 'CÓDIGO VERDE';
  confidence: number;
  summary: string;
  vitalRecommendations: string[];
  smsDraft: string;
  privacyAudit: string;
  timestamp: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  relation: string;
  phone: string;
  status: 'pending' | 'notified' | 'acknowledged';
  etaMinutes?: number;
}
