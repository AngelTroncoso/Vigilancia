# GeriCare Wi-Fi 📡🛡️

**Acompañamiento y detección de caídas para adultos mayores, sin cámaras y sin wearables.**

GeriCare Wi-Fi es una plataforma de teleasistencia que detecta caídas e inmovilidad en el hogar de personas mayores utilizando exclusivamente el router Wi-Fi doméstico y microcontroladores de bajo costo. No requiere cámaras que invadan la intimidad ni pulseras/colgantes que las personas suelen olvidar ponerse o cargar.

---

## 🩺 El problema que resuelve

- Más del 75% de las caídas graves ocurren en espacios íntimos (baños y dormitorios), donde las personas mayores rechazan justificadamente ser grabadas por cámaras.
- Los dispositivos wearables (botones de pánico, pulseras) suelen quedar en la mesilla de noche, no se usan al ducharse, o se quedan sin batería.

## ⚙️ Cómo funciona

GeriCare Wi-Fi utiliza **Wi-Fi CSI (Channel State Information)**: el cuerpo humano (70% agua) perturba y dispersa las ondas electromagnéticas del Wi-Fi ambiental. A partir de esa perturbación, el sistema:

- Mapea de forma abstracta la postura tridimensional del usuario en tiempo real.
- Analiza una matriz de **64 subportadoras a 100 Hz** para calcular:
  - Velocidad cinemática de descenso (distingue un impacto de un movimiento normal como sentarse o caminar).
  - Elevación vertical del centro de masa (detecta el colapso al suelo).
  - Tiempo de inmovilidad posterior, que dispara la alerta automática.
- Funciona en **oscuridad absoluta (0 Lux)** y **atraviesa obstáculos** como muebles, sábanas, mamparas y paredes (NLOS).
- Protege la dignidad y privacidad del residente: no genera video ni requiere que la persona sea visible ante ninguna lente.

## 🔌 Hardware de ultra bajo costo

| Componente | Función | Costo |
|---|---|---|
| Router Wi-Fi convencional | Emisor (TX) | $0 (ya instalado en el hogar) |
| Nodo ESP32-S3 con antena RF | Receptor (RX) | ~$4.50 USD por unidad |

## ✨ Características principales

- **Visualizador 3D de postura abstracta**: vistas Isométrica, Cenital y de Perfil, con simulación de 0 Lux y modo de penetración de paredes.
- **Monitor espectral de 64 subportadoras**: gráfica en tiempo real de amplitud (dBm), efecto Doppler y perfil de desplazamiento vertical del centro de masa.
- **Simulador de escenarios**: 4 comportamientos configurables — caminar, sentarse, tropiezo con auto-recuperación (8s) y caída crítica con inmovilidad.
- **Cadena de alerta y triage clínico con IA**: despacho de emergencia (112/120), aviso por SMS a familiares, megafonía bidireccional simulada y filtrado de falsas alarmas.
- **Selector multi-idioma**: interfaz completa en Español 🇪🇸, Chino 🇨🇳 e Inglés 🇬🇧, incluyendo los informes clínicos generados por IA.
- **Diseño Bold Typography**: tipografía de alto impacto, contraste marcado y acentos funcionales para indicadores de estado y alertas.

## 🔑 ¿Necesita API Key?

**No es obligatoria.** La aplicación funciona al 100% sin ninguna API Key: el motor 3D, el monitor CSI, los cambios de vista, las simulaciones de oscuridad/paredes, el audio de alarma y el despacho de emergencias se ejecutan de forma autónoma en el navegador.

Existe una integración **opcional** con Google Gemini (`gemini-3.8-flash`) para redactar el informe de triage clínico y biomecánico al detectarse una caída, mediante la variable `GEMINI_API_KEY` configurada a nivel de servidor.

- Si la clave está disponible → se genera un informe de IA personalizado en el idioma seleccionado.
- Si **no** hay clave configurada → el sistema no falla; entrega automáticamente un informe de triage estructurado y realista como respaldo (fallback), en el idioma activo.

---

*GeriCare Wi-Fi combina detección de caídas confiable con respeto absoluto por la privacidad del adulto mayor.*
