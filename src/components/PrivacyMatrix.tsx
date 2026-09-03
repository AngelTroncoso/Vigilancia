import React from 'react';
import { ShieldCheck, Video, Watch, Check, X, AlertTriangle, Moon, Wifi, Lock } from 'lucide-react';

export const PrivacyMatrix: React.FC = () => {
  return (
    <div id="privacy-matrix-section" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Ventaja Social: Dignidad, Intimidad y Cero Fricción
            </h3>
            <p className="text-xs text-slate-400">
              Por qué la detección por radiofrecuencia CSI supera los fallos críticos de cámaras y pulseras
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
          Diseño Basado en Derechos y Dignidad
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-3 pr-4 font-semibold">Criterio Fundamental</th>
              <th className="pb-3 px-4 font-bold text-teal-300 bg-teal-950/40 rounded-t-lg border-t border-x border-teal-800/40">
                GeriCare Wi-Fi (CSI RF)
              </th>
              <th className="pb-3 px-4 font-medium text-slate-400">Cámaras de Vídeo Ópticas</th>
              <th className="pb-3 pl-4 font-medium text-slate-400">Wearables (Pulseras / Relojes)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {/* Row 1 */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-200">
                Privacidad en Baño y Dormitorio
                <span className="block text-[11px] text-slate-400 font-normal">
                  Donde ocurren el 70% de las caídas
                </span>
              </td>
              <td className="py-3 px-4 bg-teal-950/20 text-emerald-400 font-medium border-x border-teal-800/20">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Protegida (Cero píxeles)</span>
                </div>
              </td>
              <td className="py-3 px-4 text-rose-400">
                <div className="flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Invasiva (Rechazo casi unánime)</span>
                </div>
              </td>
              <td className="py-3 pl-4 text-amber-400">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Se la quitan para ducharse</span>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-200">
                Funcionamiento en Oscuridad Total
                <span className="block text-[11px] text-slate-400 font-normal">
                  Accidentes nocturnos camino al aseo
                </span>
              </td>
              <td className="py-3 px-4 bg-teal-950/20 text-emerald-400 font-medium border-x border-teal-800/20">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inmune (Ondas RF a 0 Lux)</span>
                </div>
              </td>
              <td className="py-3 px-4 text-rose-400">
                <div className="flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Ciega sin focos infrarrojos</span>
                </div>
              </td>
              <td className="py-3 pl-4 text-emerald-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Funciona (si la lleva puesta)</span>
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-200">
                Penetración de Muros y Obstáculos
                <span className="block text-[11px] text-slate-400 font-normal">
                  Mantas, sillones, puertas cerradas
                </span>
              </td>
              <td className="py-3 px-4 bg-teal-950/20 text-emerald-400 font-medium border-x border-teal-800/20">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Atraviesa tabiques (NLOS)</span>
                </div>
              </td>
              <td className="py-3 px-4 text-rose-400">
                <div className="flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Puntos ciegos por muebles</span>
                </div>
              </td>
              <td className="py-3 pl-4 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>En cuerpo (alcance BLE limitado)</span>
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-200">
                Carga de Baterías y Olvidos
                <span className="block text-[11px] text-slate-400 font-normal">
                  Causa #1 de fracaso en mayores
                </span>
              </td>
              <td className="py-3 px-4 bg-teal-950/20 text-emerald-400 font-medium border-x border-teal-800/20">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0% Olvidos (Siempre activo en red)</span>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Alimentación de pared</span>
                </div>
              </td>
              <td className="py-3 pl-4 text-rose-400">
                <div className="flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>78% abandono por no cargarla</span>
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-200">
                Estigma y Aceptación Psicológica
                <span className="block text-[11px] text-slate-400 font-normal">
                  Sentimiento de autonomía vs dependencia
                </span>
              </td>
              <td className="py-3 px-4 bg-teal-950/20 text-emerald-400 font-medium border-x border-teal-800/20 rounded-b-lg border-b">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Invisible (Sin estigma)</span>
                </div>
              </td>
              <td className="py-3 px-4 text-rose-400">
                <div className="flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Sensación de "Gran Hermano"</span>
                </div>
              </td>
              <td className="py-3 pl-4 text-amber-400">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>"Etiqueta de enfermo / frágil"</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Narrative Callout */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <strong className="text-slate-100 block">El principio de teleasistencia invisible:</strong>
          La tecnología más segura es aquella que no exige al adulto mayor cambiar sus hábitos. Al transformar las ondas invisibles del Wi-Fi doméstico que ya están presentes en el hogar en un sensor volumétrico 3D de alta precisión, la persona vive con total libertad y sus familiares tienen la certeza de que nunca quedará desasistida tras una caída.
        </div>
      </div>
    </div>
  );
};
