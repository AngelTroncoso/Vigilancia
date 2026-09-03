import { Language } from '../types';

export interface Translations {
  nav: {
    title: string;
    subtitle: string;
    rfActive: string;
    privacyShield: string;
    esp32Nodes: string;
    simulateFall: string;
    markSafe: string;
    languageToggle: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    monitoredZone: string;
    roomName: string;
    residentLabel: string;
    residentName: string;
    statusLabel: string;
    statusSafe: string;
    statusCritical: string;
    immobilityDuration: string;
  };
  visualizer: {
    title: string;
    subcarrierRate: string;
    subtitle: string;
    viewIso: string;
    viewTop: string;
    viewSide: string;
    darknessOn: string;
    simulateDarkness: string;
    wallActive: string;
    addWall: string;
    privacySeal: string;
    postureAlert: string;
    postureImpact: string;
    postureSitting: string;
    postureWalking: string;
    postureStanding: string;
    postureRecovering: string;
    dopplerCritical: string;
    dopplerNormal: string;
    dopplerStatic: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
  };
  monitor: {
    title: string;
    subtitle: string;
    dopplerLabel: string;
    comElevationLabel: string;
    spectrumTitle: string;
    displacementTitle: string;
    displacementPeriod: string;
    criticalThreshold: string;
  };
  simulation: {
    title: string;
    subtitle: string;
    resetBtn: string;
    description: string;
    scenario1Title: string;
    scenario1Desc: string;
    scenario2Title: string;
    scenario2Desc: string;
    scenario3Title: string;
    scenario3Desc: string;
    scenario4Title: string;
    scenario4Desc: string;
    activeBadge: string;
    emergencyBadge: string;
    aiFilterBadge: string;
    samplingNote: string;
  };
  emergency: {
    safeTitle: string;
    safeSubtitle: string;
    standbyBadge: string;
    safeNote: string;
    alertTitle: string;
    alertSubtitle: string;
    cancelBtn: string;
    dispatchNowBtn: string;
    dispatchedBadge: string;
    countdownPrefix: string;
    countdownSuffix: string;
    avoidFalseDispatches: string;
    intercomTitle: string;
    intercomSpeakerOnline: string;
    intercomPlaceholder: string;
    intercomBroadcast: string;
    intercomFeedback: string;
    chainTitle: string;
    smsSent: string;
    aiTriageTitle: string;
    aiTriageSubtitle: string;
    generateTriageBtn: string;
    analyzingBtn: string;
    refreshTriageBtn: string;
    bioConfidence: string;
    actionProtocol: string;
    smsDraftTitle: string;
    contact1Name: string;
    contact1Role: string;
    contact1Relation: string;
    contact2Name: string;
    contact2Role: string;
    contact2Relation: string;
    contact3Name: string;
    contact3Role: string;
    contact3Relation: string;
  };
  hardware: {
    title: string;
    subtitle: string;
    tabPipeline: string;
    tabBOM: string;
    tabPrivacy: string;
    step1Tag: string;
    step1Title: string;
    step1Desc: string;
    step2Tag: string;
    step2Title: string;
    step2Desc: string;
    step3Tag: string;
    step3Title: string;
    step3Desc: string;
    bom1Title: string;
    bom1Price: string;
    bom1Desc: string;
    bom2Title: string;
    bom2Price: string;
    bom2Desc: string;
    privacyHeadline: string;
    privacyBody: string;
    privacyBullet1: string;
    privacyBullet2: string;
    privacyBullet3: string;
    privacyBullet4: string;
  };
  terminal: {
    title: string;
    rateBadge: string;
    log1: string;
    log2: string;
    log3: string;
  };
  footer: {
    activeNodes: string;
    activeNodesVal: string;
    sampling: string;
    samplingVal: string;
    latency: string;
    latencyVal: string;
    guarantee1: string;
    guarantee2: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      title: 'GERICARE WI-FI',
      subtitle: 'DETECCIÓN DE CAÍDAS POR SUBPORTADORAS RF Y CUIDADO',
      rfActive: 'Detección RF Activa',
      privacyShield: 'Escudo Privacidad: 100% Sin Óptica',
      esp32Nodes: '2 ESP32-S3 RX en Línea',
      simulateFall: 'Simular Caída',
      markSafe: 'Marcar Seguro / Limpiar',
      languageToggle: 'Idioma',
    },
    hero: {
      eyebrow: 'Cero Cámaras • Cero Wearables • 100% Dignidad',
      headline: 'SEGURIDAD SIN',
      headlineHighlight: 'VIGILANCIA',
      description:
        'GeriCare Wi-Fi aprovecha routers Wi-Fi domésticos estándar y microcontroladores ESP32 de $4 USD para reconstruir la postura en 3D mediante Información del Estado del Canal (CSI). Detecta caídas peligrosas e inmovilidad prolongada en suelo en oscuridad total y a través de paredes, sin invadir la intimidad.',
      monitoredZone: 'ZONA MONITORIZADA',
      roomName: 'Habitación 402 • Salón Principal',
      residentLabel: 'Adulto mayor:',
      residentName: 'Don Manuel (83 años)',
      statusLabel: 'Estado actual:',
      statusSafe: 'SEGURO Y MÓVIL',
      statusCritical: '¡CAÍDA CRÍTICA!',
      immobilityDuration: 'Tiempo en suelo:',
    },
    visualizer: {
      title: 'Mapeo Abstracto Postural',
      subcarrierRate: '100 HZ CSI',
      subtitle: 'Malla RF 3D sin cámaras ópticas • Escudo de intimidad activo',
      viewIso: '3D Iso',
      viewTop: 'Planta',
      viewSide: 'Perfil',
      darknessOn: '0 Lux (Oscuro) ON',
      simulateDarkness: 'Oscuridad 0 Lux',
      wallActive: 'Muro NLOS Activo',
      addWall: '+ Muro NLOS',
      privacySeal: 'Cero Cámaras • Dignidad Total',
      postureAlert: '¡EMERGENCIA: CAÍDA DETECTADA!',
      postureImpact: '¡IMPACTO SÚBITO EN CURSO!',
      postureSitting: 'POSTURA: SENTADO ESTABLE',
      postureWalking: 'POSTURA: CAMINANDO NORMAL',
      postureStanding: 'POSTURA: DE PIE ESTABLE',
      postureRecovering: 'POSTURA: EN RECUPERACIÓN',
      dopplerCritical: 'Micro-Doppler: 3.82 m/s [CRÍTICO]',
      dopplerNormal: 'Micro-Doppler: 0.74 m/s [NORMAL]',
      dopplerStatic: 'Micro-Doppler: 0.04 m/s [ESTÁTICO]',
      feat1Title: 'Dignidad y Privacidad Total',
      feat1Desc: 'Sin lentes de vídeo ni captura de fotos. Apto para baños y dormitorios.',
      feat2Title: 'Oscuridad y No-Visión Directa (NLOS)',
      feat2Desc: 'Las ondas Wi-Fi atraviesan mantas, paredes y operan a 0 Lux absolutos.',
      feat3Title: 'Cero Wearables Requeridos',
      feat3Desc: 'Sin pulseras que olvidar, cargar o perder. La propia estancia cuida.',
    },
    monitor: {
      title: 'Telemetría Espectral de Subportadoras CSI',
      subtitle: 'Matriz de estado del canal multi-trayecto en tiempo real (Banda 5GHz)',
      dopplerLabel: 'DOPPLER:',
      comElevationLabel: 'ELEVACIÓN CoM:',
      spectrumTitle: 'Espectro de Amplitud de 64 Subportadoras (dBm)',
      displacementTitle: 'Perfil de Desplazamiento Vertical del Centro de Masa',
      displacementPeriod: 'Últimos 30s (60 FPS)',
      criticalThreshold: 'UMBRAL CRÍTICO (<25 cm)',
    },
    simulation: {
      title: 'Simulador de Conducta Postural en Vivo',
      subtitle: 'Pruebas de respuesta interactiva por radiofrecuencia CSI',
      resetBtn: 'Restablecer Seguro',
      description:
        'Comprueba cómo el algoritmo RF CSI distingue instantáneamente entre rutinas suaves de baja velocidad (sentarse, caminar) y un impacto súbito con inmovilidad.',
      scenario1Title: '1. Caminar por la estancia',
      scenario1Desc: 'CoM vertical ~160cm. Doppler oscilatorio rítmico (<1.0 m/s). Rastreo continuo seguro.',
      scenario2Title: '2. Sentarse en el sillón',
      scenario2Desc: 'Descenso suave gradual a ~75cm. Cero pico destructivo. No genera falsas alarmas.',
      scenario3Title: '3. Caída súbita con inmovilidad',
      scenario3Desc: 'Aceleración Doppler >3.5 m/s. Colapso de elevación a 12cm + inmovilidad en suelo.',
      scenario4Title: '4. Tropezón con auto-rescate',
      scenario4Desc: 'Tropiezo rápido al suelo pero se reincorpora antes de 8s. Falsa alarma suprimida.',
      activeBadge: 'Activo',
      emergencyBadge: 'PRUEBA CRÍTICA',
      aiFilterBadge: 'Filtro IA',
      samplingNote: 'Muestreo: 100 paquetes CSI/seg/antena • Respuesta algorítmica: <450 ms',
    },
    emergency: {
      safeTitle: 'Red de Asistencia Rápida y Despacho Familiar',
      safeSubtitle: 'Enlace permanente con familiares y servicios de teleasistencia',
      standbyBadge: 'Standby Activo',
      safeNote: 'Al detectar un accidente o caída, GeriCare Wi-Fi inicia de inmediato la secuencia de rescate con triaje clínico por IA.',
      alertTitle: '¡Alerta de Caída Crítica en Suelo!',
      alertSubtitle: 'Don Manuel inmóvil hace {sec}s • Habitación 402 Salón (Elevación CoM: {cm}cm)',
      cancelBtn: 'Cancelar (Falsa Alarma)',
      dispatchNowBtn: 'Despachar Ambulancia 112 Ahora',
      dispatchedBadge: '112 Despachado (ETA 9 min)',
      countdownPrefix: 'Llamada automática al 112 en ',
      countdownSuffix: ' segundos si no se cancela...',
      avoidFalseDispatches: 'Evita despachos falsos',
      intercomTitle: 'Interfono Bidireccional por Altavoz Wi-Fi',
      intercomSpeakerOnline: 'Altavoz ESP32 Conectado',
      intercomPlaceholder: 'Escribe mensaje: "Don Manuel, ¿nos escucha? La ayuda viene en camino..."',
      intercomBroadcast: 'Transmitir Voz',
      intercomFeedback: 'Voz emitida en el salón de Don Manuel con volumen amplificado.',
      chainTitle: 'Cadena de Notificación Inmediata',
      smsSent: 'SMS ENVIADO',
      aiTriageTitle: 'Triaje Clínico Gemini IA',
      aiTriageSubtitle: 'Análisis biomecánico del impacto RF, orientación médica y borrador para sanitarios',
      generateTriageBtn: 'Generar Triaje Médico IA',
      analyzingBtn: 'Analizando Telemetría RF...',
      refreshTriageBtn: 'Actualizar Triaje IA',
      bioConfidence: 'Confianza Biomecánica:',
      actionProtocol: 'Protocolo de Actuación Recomendado:',
      smsDraftTitle: 'Mensaje SMS Automático Enviado a Familiares:',
      contact1Name: 'Carmen Martínez',
      contact1Role: 'Familiar Principal',
      contact1Relation: 'Hija (a 12 min)',
      contact2Name: 'Marta V. (Enfermera)',
      contact2Role: 'Atención Domiciliaria / Residencia',
      contact2Relation: 'Guardia de Zona (a 6 min)',
      contact3Name: 'Central Emergencias 112',
      contact3Role: 'Servicios de Urgencias Médicas',
      contact3Relation: 'Despacho Móvil (ETA ~9 min)',
    },
    hardware: {
      title: 'Arquitectura de Bajo Coste y Mecánica RF CSI',
      subtitle: 'Router Wi-Fi doméstico estándar + microcontroladores ESP32-S3 de $4',
      tabPipeline: 'Flujo RF',
      tabBOM: 'Lista de Materiales',
      tabPrivacy: 'Impacto Social',
      step1Tag: 'Paso 01 • TX RF',
      step1Title: 'Router Wi-Fi Doméstico (TX)',
      step1Desc: 'Emite señales baliza 802.11ac/ax normales. No requiere radares caros ni emisores especiales.',
      step2Tag: 'Paso 02 • Perturbación',
      step2Title: 'Dispersión Multi-camino del Cuerpo',
      step2Desc: 'El cuerpo humano (~70% agua) refleja las ondas RF, modulando amplitud y fase en 64 subportadoras.',
      step3Tag: 'Paso 03 • RX ESP32',
      step3Title: 'Extracción en el Borde ESP32-S3',
      step3Desc: 'Captura paquetes CSI a 100 Hz, filtra ruido multi-camino y reconstruye la trayectoria del centro de masa.',
      bom1Title: 'Receptor ESP32-S3 Dual-Core',
      bom1Price: '~$4.50 USD',
      bom1Desc: 'Xtensa 32-bit LX7 @ 240MHz con 512KB SRAM. Wi-Fi integrado con acceso a registros CSI.',
      bom2Title: 'Router Comercial Wi-Fi 6 Estándar',
      bom2Price: '$0 (Ya instalado)',
      bom2Desc: 'Utiliza el router ya presente en el hogar del anciano transmitiendo tramas OFDM ordinarias.',
      privacyHeadline: 'Por qué GeriCare Wi-Fi resuelve el dilema de la dignidad',
      privacyBody:
        'Los adultos mayores rechazan cámaras en baños y dormitorios, lugares donde ocurre más del 75% de las caídas graves. Los botones de pánico se olvidan, no se llevan al ducharse o se quedan sin batería.',
      privacyBullet1: 'Cumplimiento estricto con RGPD y privacidad médica',
      privacyBullet2: 'Cero imágenes ópticas ni escaneo facial',
      privacyBullet3: 'Protección continua 24/7 sin interrupciones',
      privacyBullet4: 'Cero necesidad de recargar baterías corporales',
    },
    terminal: {
      title: 'Flujo de Eventos de Telemetría RF en Vivo',
      rateBadge: 'Frecuencia 100 Hz',
      log1: 'Demonio GeriCare Wi-Fi CSI iniciado. Nodos ESP32 #1 y #2 vinculados.',
      log2: 'Línea base de 64 subportadoras OFDM calibrada en 5.24 GHz (Canal 48).',
      log3: 'Escudo de Privacidad verificado: 0 lentes ópticas detectadas. 100% telemetría pasiva RF.',
    },
    footer: {
      activeNodes: 'NODOS ACTIVOS:',
      activeNodesVal: '1 Router TX + 2 ESP32-S3 RX',
      sampling: 'MUESTREO CSI:',
      samplingVal: '100 Hz / Antena',
      latency: 'LATENCIA:',
      latencyVal: '<450 ms',
      guarantee1: 'Garantía Sin Cámaras',
      guarantee2: 'Dignidad del Anciano Primero',
    },
  },

  zh: {
    nav: {
      title: 'GERICARE WI-FI',
      subtitle: '基于射频子载波的跌倒感知与无感照护系统',
      rfActive: '射频感知运行中',
      privacyShield: '隐私防护：100%无光学镜头',
      esp32Nodes: '2台 ESP32-S3 节点在线',
      simulateFall: '模拟摔倒',
      markSafe: '标记安全 / 复位',
      languageToggle: '语言切换',
    },
    hero: {
      eyebrow: '零摄像头 • 零可穿戴设备 • 100%人格尊严',
      headline: '安全无感',
      headlineHighlight: '告别监控',
      description:
        'GeriCare Wi-Fi 利用普通家用Wi-Fi路由器及单价仅4美元的ESP32微控制器，通过信道状态信息（CSI）在三维空间重构人体姿态。在全黑黑暗环境或隔墙非视距（NLOS）下，精准捕捉危险跌倒与地面失能，彻底杜绝隐私泄露风险。',
      monitoredZone: '当前监测区域',
      roomName: '402室 • 起居客厅',
      residentLabel: '受护老人：',
      residentName: '曼纽尔老爷爷 (83岁)',
      statusLabel: '实时状态：',
      statusSafe: '安全活动中',
      statusCritical: '危险跌倒！',
      immobilityDuration: '地面静止时间：',
    },
    visualizer: {
      title: '人体抽象姿态三维RF重构',
      subcarrierRate: '100 HZ CSI 采样',
      subtitle: '基于Wi-Fi射频波形重构 • 无光学摄像头 • 隐私盾全面生效',
      viewIso: '3D等轴',
      viewTop: '俯视平面',
      viewSide: '侧视立面',
      darknessOn: '0 Lux 全黑模式开启',
      simulateDarkness: '模拟全黑 (0 Lux)',
      wallActive: '穿墙(NLOS)模式激活',
      addWall: '+ 穿墙(NLOS)',
      privacySeal: '零摄像头 • 绝对隐私与人格尊严',
      postureAlert: '紧急：检测到摔倒与地面失能！',
      postureImpact: '突发坠落冲击中！',
      postureSitting: '姿态：平稳就坐',
      postureWalking: '姿态：正常走动',
      postureStanding: '姿态：站立稳定',
      postureRecovering: '姿态：自我恢复起身中',
      dopplerCritical: '多普勒微动: 3.82 m/s [危险临界冲击]',
      dopplerNormal: '多普勒微动: 0.74 m/s [日常慢速走动]',
      dopplerStatic: '多普勒微动: 0.04 m/s [静止稳定]',
      feat1Title: '尊严与隐私第一',
      feat1Desc: '无任何视频镜头或相片拍摄，全天候守护卫生间及卧室私密空间。',
      feat2Title: '全黑环境与隔墙穿透 (NLOS)',
      feat2Desc: 'Wi-Fi射频电磁波可穿透被褥与实体墙壁，0 Lux黑暗中正常探测。',
      feat3Title: '无需佩戴任何设备',
      feat3Desc: '无需老人穿戴手环或吊坠，免去遗忘、丢失或反复充电的困扰。',
    },
    monitor: {
      title: 'CSI 载波信道状态多径频谱实时遥测',
      subtitle: '实时多径信道状态矩阵（5GHz Wi-Fi频段）',
      dopplerLabel: '多普勒速度:',
      comElevationLabel: '质心高度 (CoM):',
      spectrumTitle: '64个OFDM子载波幅度衰减谱 (dBm)',
      displacementTitle: '人体垂直质心高度位移实时变化轮廓',
      displacementPeriod: '最近30秒 (60帧/秒采样)',
      criticalThreshold: '跌倒临界阈值 (<25 cm)',
    },
    simulation: {
      title: '实时姿态场景与行为模拟器',
      subtitle: '交互式 CSI 射频行为特征反应测试',
      resetBtn: '复位至安全状态',
      description:
        '体验 CSI 射频算法如何毫秒级区分低速日常动作（如平稳就坐、缓慢走动）与高动能跌倒及卧地失能。',
      scenario1Title: '1. 在客厅中正常走动',
      scenario1Desc: '垂直质心 ~160cm。周期性多普勒微动震荡 (<1.0 m/s)。安全连续追踪。',
      scenario2Title: '2. 坐入扶手椅沙发',
      scenario2Desc: '质心平滑平稳下降至 ~75cm。无破坏性动能尖峰。不会触发任何警报。',
      scenario3Title: '3. 突发重摔且卧地失能',
      scenario3Desc: '多普勒加速度 >3.5 m/s。质心骤降至地面 12cm 并持续静止。触发急救分诊。',
      scenario4Title: '4. 绊倒后自主起身复原',
      scenario4Desc: '快速倒地但8秒内自行爬起。智能AI模型自动抑制误报，恢复安全。',
      activeBadge: '当前测试',
      emergencyBadge: '急救测试',
      aiFilterBadge: 'AI滤波',
      samplingNote: '采样率：100包CSI/秒/天线 • 算法决策延迟：<450 毫秒',
    },
    emergency: {
      safeTitle: '紧急救援响应与家属直连网络',
      safeSubtitle: '全天候直连直系家属手机、社区护工及120急救调度中心',
      standbyBadge: '监听待命中',
      safeNote: '一旦监测到危险意外或老人摔倒，GeriCare Wi-Fi 将毫秒级激活自动化急救流程并生成 AI 临床伤情分诊报告。',
      alertTitle: '危险警告：检测到地面严重跌倒！',
      alertSubtitle: '曼纽尔老爷爷在地面静止已达 {sec}秒 • 402室起居客厅（质心高度：{cm}cm）',
      cancelBtn: '误报 / 取消警报',
      dispatchNowBtn: '立即调度 120/112 急救车',
      dispatchedBadge: '急救车已出动 (预计9分钟到达)',
      countdownPrefix: '系统将在 ',
      countdownSuffix: ' 秒后自动呼叫120急救调度（可手动取消）...',
      avoidFalseDispatches: '防止误报调度',
      intercomTitle: 'ESP32 Wi-Fi 房间双向语音喊话对讲',
      intercomSpeakerOnline: 'ESP32 扩音器在线',
      intercomPlaceholder: '输入语音内容："老爷爷您听得到吗？救援人员已在路上，请保持平躺..."',
      intercomBroadcast: '立即喊话广播',
      intercomFeedback: '语音指令已通过房间扬声器放大广播至曼纽尔老爷爷房间。',
      chainTitle: '直系监护人与急救通知链',
      smsSent: '短信已送达',
      aiTriageTitle: 'Gemini AI 临床伤情分诊',
      aiTriageSubtitle: '基于射频冲击力学分析、医疗急救建议及医护人员交接摘要',
      generateTriageBtn: '生成 Gemini AI 临床分诊',
      analyzingBtn: '正在分析射频冲击遥测...',
      refreshTriageBtn: '更新 AI 临床分诊',
      bioConfidence: '力学判定置信度：',
      actionProtocol: '推荐紧急行动指南：',
      smsDraftTitle: '已自动向紧急联系人推送的紧急短信：',
      contact1Name: '卡门·马丁内斯 (Carmen)',
      contact1Role: '第一顺位监护人',
      contact1Relation: '女儿（车程12分钟）',
      contact2Name: '玛塔护士 (Marta)',
      contact2Role: '社区长者关照中心 / 专职护工',
      contact2Relation: '区域值班员（距离6分钟）',
      contact3Name: '120/112 医疗急救调度中心',
      contact3Role: '医疗急救绿色通道',
      contact3Relation: '急救车指派（预计9分钟）',
    },
    hardware: {
      title: '极低硬件成本与 CSI 射频感知原理',
      subtitle: '利用普通家用Wi-Fi路由器 + 单价4美元的ESP32-S3微控制器',
      tabPipeline: '处理链路',
      tabBOM: '硬件清单',
      tabPrivacy: '社会价值',
      step1Tag: '第01步 • 射频发射',
      step1Title: '家用Wi-Fi路由器 (TX 发射端)',
      step1Desc: '发射常规 802.11ac/ax 射频信标帧，无需任何昂贵的专业毫米波或微波雷达硬件。',
      step2Tag: '第02步 • 人体扰动',
      step2Title: '人体多径散射与能量调制',
      step2Desc: '人体（含水约70%）对电磁波产生反射与微扰，在64个子载波上调制出特征幅度与相位变化。',
      step3Tag: '第03步 • 边缘提取',
      step3Title: 'ESP32-S3 边缘接收与姿态解算',
      step3Desc: '以 100 Hz 提取底层 CSI 数据包，滤除环境静态多径杂波，快速解算人体垂直质心轨迹。',
      bom1Title: 'ESP32-S3 双核Wi-Fi接收芯片模组',
      bom1Price: '约 ¥30 / $4.50',
      bom1Desc: 'Xtensa 32位 LX7 @ 240MHz，内置512KB SRAM。支持底层硬件寄存器无损抓取 CSI。',
      bom2Title: '家庭已有的普通 Wi-Fi 6 路由器',
      bom2Price: '¥0 (无需新购)',
      bom2Desc: '直接利旧长者家中电信/移动/联通宽带赠送的常规光猫或无线路由器，零额外设备负担。',
      privacyHeadline: '为什么 GeriCare Wi-Fi 能够化解老年看护的尊严困境？',
      privacyBody:
        '老年人极度抗拒在浴室、卫生间及主卧安装摄像头，而超过75%的致命摔倒恰恰发生在这些私密空间。传统的SOS紧急呼救手环和吊坠常因遗忘佩戴、洗澡摘下或电量耗尽而沦为摆设。',
      privacyBullet1: '严格遵循 GDPR、HIPAA 等高级别隐私安全标准',
      privacyBullet2: '从物理层面杜绝视频捕获与人脸生物识别',
      privacyBullet3: '24小时无死角守护，无视黑暗与障碍物阻挡',
      privacyBullet4: '老人零学习成本，无需充电或随身佩戴任何物件',
    },
    terminal: {
      title: '实时射频遥测事件流日志',
      rateBadge: '100 Hz 频次',
      log1: 'GeriCare Wi-Fi CSI 守护进程就绪。ESP32 接收端节点 #1 与 #2 已配对。',
      log2: 'OFDM 64个子载波基线完成校准，工作频段 5.24 GHz（信道 48）。',
      log3: '隐私盾验证通过：零光学镜头接入，100% 纯电磁射频无感感知。',
    },
    footer: {
      activeNodes: '在线感知节点：',
      activeNodesVal: '1台发射路由器 + 2台 ESP32-S3 接收模组',
      sampling: 'CSI 采样率：',
      samplingVal: '100 Hz / 天线通道',
      latency: '决策延迟：',
      latencyVal: '<450 毫秒',
      guarantee1: '无摄像头物理级安全',
      guarantee2: '捍卫长者尊严为先',
    },
  },

  en: {
    nav: {
      title: 'GERICARE WI-FI',
      subtitle: 'RF SUBCARRIER FALL DETECTION & CARE SYSTEM',
      rfActive: 'RF Sensing Active',
      privacyShield: 'Privacy Shield: 100% Optics-Free',
      esp32Nodes: '2 ESP32-S3 RX Online',
      simulateFall: 'Simulate Fall',
      markSafe: 'Mark Safe / Clear',
      languageToggle: 'Language',
    },
    hero: {
      eyebrow: 'Zero Cameras • Zero Wearables • 100% Dignity',
      headline: 'SAFETY WITHOUT',
      headlineHighlight: 'SURVEILLANCE',
      description:
        'GeriCare Wi-Fi harnesses standard commercial Wi-Fi routers and $4 ESP32 microcontrollers to reconstruct 3D posture via Channel State Information (CSI). Detects dangerous falls and prolonged floor immobility in pitch darkness and through physical walls—with zero privacy invasion.',
      monitoredZone: 'MONITORED ZONE',
      roomName: 'Room 402 • Living Area',
      residentLabel: 'Resident:',
      residentName: 'Don Manuel (83 yrs)',
      statusLabel: 'Current Status:',
      statusSafe: 'SAFE & MOBILE',
      statusCritical: 'CRITICAL FALL',
      immobilityDuration: 'Immobility Duration:',
    },
    visualizer: {
      title: 'Abstract Posture Mapping',
      subcarrierRate: '100 HZ CSI',
      subtitle: '3D RF mesh without optical cameras • Privacy shield active',
      viewIso: '3D Iso',
      viewTop: 'Top Plan',
      viewSide: 'Side Profile',
      darknessOn: '0 Lux (Dark) ON',
      simulateDarkness: 'Darkness 0 Lux',
      wallActive: 'Wall NLOS Active',
      addWall: '+ Wall NLOS',
      privacySeal: 'Zero Cameras • Complete Dignity',
      postureAlert: 'EMERGENCY: FALL DETECTED',
      postureImpact: 'IMPACT IN PROGRESS',
      postureSitting: 'POSTURE: SEATED_STABLE',
      postureWalking: 'POSTURE: WALKING_NORMAL',
      postureStanding: 'POSTURE: STANDING_STABLE',
      postureRecovering: 'POSTURE: RECOVERING',
      dopplerCritical: 'Micro-Doppler: 3.82 m/s [CRITICAL]',
      dopplerNormal: 'Micro-Doppler: 0.74 m/s [NORMAL]',
      dopplerStatic: 'Micro-Doppler: 0.04 m/s [STATIC]',
      feat1Title: 'Dignity & Privacy First',
      feat1Desc: 'No video lenses or image captures. Perfect for bathrooms and private bedrooms.',
      feat2Title: 'Total Darkness & NLOS',
      feat2Desc: 'Wi-Fi waves pierce physical furniture, blankets, and operate at absolute 0 Lux.',
      feat3Title: 'Zero Wearables Needed',
      feat3Desc: 'No smartbands to forget, charge, or lose. The room itself provides continuous care.',
    },
    monitor: {
      title: 'CSI Subcarrier Spectral Telemetry',
      subtitle: 'Real-time multipath channel state matrix (5GHz Band)',
      dopplerLabel: 'DOPPLER:',
      comElevationLabel: 'CoM ELEVATION:',
      spectrumTitle: '64-Subcarriers Amplitude Spectrum (dBm)',
      displacementTitle: 'Vertical Center-of-Mass Displacement Profile',
      displacementPeriod: 'Last 30s (60 FPS)',
      criticalThreshold: 'CRITICAL THRESHOLD (<25 cm)',
    },
    simulation: {
      title: 'Live Postural Scenario Simulator',
      subtitle: 'Interactive CSI behavioral response testing',
      resetBtn: 'Reset Safe State',
      description:
        'Test how the RF CSI algorithm instantaneously discriminates between routine low-velocity activities (sitting, walking) and a high-impact fall with floor immobility.',
      scenario1Title: '1. Walking in Living Room',
      scenario1Desc: 'Vertical CoM ~160cm. Oscillatory rhythmic Doppler (<1.0 m/s). Safe continuous tracking.',
      scenario2Title: '2. Sitting on Armchair',
      scenario2Desc: 'Smooth gradual descent to ~75cm. Zero destructive kinetic spike. No false alerts.',
      scenario3Title: '3. Sudden Fall + Immobile',
      scenario3Desc: 'Doppler acceleration >3.5 m/s. Elevation collapse to 12cm + prolonged immobility.',
      scenario4Title: '4. Stumble with Self-Recovery',
      scenario4Desc: 'Rapid floor trip but reincorporates within 8 seconds. False alarm automatically suppressed.',
      activeBadge: 'Active',
      emergencyBadge: 'CRITICAL TEST',
      aiFilterBadge: 'AI Filter',
      samplingNote: 'Sampling Rate: 100 CSI packets/sec/antenna • Algorithmic Response: <450 ms',
    },
    emergency: {
      safeTitle: 'Rapid Emergency & Family Dispatch Network',
      safeSubtitle: 'Continuous link with family members and telecare dispatch',
      standbyBadge: 'Standby Active',
      safeNote: 'Upon accident or fall detection, GeriCare Wi-Fi instantly initiates automated rescue sequence with AI clinical triage.',
      alertTitle: 'Critical Floor Fall Detected!',
      alertSubtitle: 'Don Manuel immobile for {sec}s • Room 402 Living Area (CoM Elevation: {cm}cm)',
      cancelBtn: 'Cancel (False Alarm)',
      dispatchNowBtn: 'Dispatch 112 Ambulance Now',
      dispatchedBadge: '112 Dispatched (ETA 9m)',
      countdownPrefix: 'Automatic 112 emergency call in ',
      countdownSuffix: ' seconds unless dismissed...',
      avoidFalseDispatches: 'Suppresses False Dispatches',
      intercomTitle: 'Two-Way Room Speaker Intercom',
      intercomSpeakerOnline: 'ESP32 Speaker Online',
      intercomPlaceholder: 'Type voice message: "Don Manuel, can you hear us? Help is on the way..."',
      intercomBroadcast: 'Broadcast',
      intercomFeedback: "Voice audio broadcasted into Don Manuel's room at amplified volume.",
      chainTitle: 'Immediate Notification Chain',
      smsSent: 'SMS SENT',
      aiTriageTitle: 'Gemini AI Clinical Triage',
      aiTriageSubtitle: 'Biomechanical RF impact analysis, medical assessment & paramedic briefing',
      generateTriageBtn: 'Generate AI Clinical Triage',
      analyzingBtn: 'Analyzing RF Telemetry...',
      refreshTriageBtn: 'Refresh AI Triage',
      bioConfidence: 'Biomechanical Confidence:',
      actionProtocol: 'Recommended Action Protocol:',
      smsDraftTitle: 'Auto SMS Dispatched to Contacts:',
      contact1Name: 'Carmen Martínez',
      contact1Role: 'Primary Family Contact',
      contact1Relation: 'Daughter (12 min away)',
      contact2Name: 'Marta V. (Caregiver)',
      contact2Role: 'Home & Community Care',
      contact2Relation: 'Area Nurse (6 min away)',
      contact3Name: 'Emergency Medical Service 112',
      contact3Role: 'Emergency Dispatch',
      contact3Relation: 'Medical Unit (ETA ~9 min)',
    },
    hardware: {
      title: 'Low-Cost Hardware & CSI RF Mechanics',
      subtitle: 'Standard Wi-Fi router + $4 ESP32-S3 microcontrollers',
      tabPipeline: 'Pipeline',
      tabBOM: 'Bill of Materials',
      tabPrivacy: 'Social Impact',
      step1Tag: 'Step 01 • RF TX',
      step1Title: 'Home Wi-Fi Router (TX)',
      step1Desc: 'Emits standard 802.11ac/ax beacon signals. No specialized or costly radar emitter required.',
      step2Tag: 'Step 02 • Perturbation',
      step2Title: 'Body Multipath Scatter',
      step2Desc: 'The human body (~70% water) reflects and scatters RF waves, modulating amplitude and phase across 64 subcarriers.',
      step3Tag: 'Step 03 • ESP32 RX',
      step3Title: 'ESP32-S3 Edge Extraction',
      step3Desc: 'Captures raw CSI packets at 100 Hz, filters multipath noise, and reconstructs vertical center-of-mass trajectory.',
      bom1Title: 'ESP32-S3 Dual-Core Receiver',
      bom1Price: '~$4.50 USD',
      bom1Desc: 'Xtensa 32-bit LX7 @ 240MHz with 512KB SRAM. Built-in 2.4/5GHz Wi-Fi baseband with native promiscuous CSI register access.',
      bom2Title: 'Standard Consumer Wi-Fi 6 Router',
      bom2Price: '$0 (Existing)',
      bom2Desc: "Utilizes the senior's already installed ISP router. Transmits Orthogonal Frequency Division Multiplexing (OFDM) frames.",
      privacyHeadline: 'Why GeriCare Wi-Fi Solves the Dignity Dilemma',
      privacyBody:
        'Elderly adults strongly resist optical cameras in personal quarters like bathrooms and bedrooms—precisely where over 75% of severe domestic falls occur. Wearable panic buttons fail because seniors frequently forget to put them on, remove them before bathing, or forget to recharge batteries.',
      privacyBullet1: 'Full compliance with GDPR & HIPAA',
      privacyBullet2: 'Zero optical imaging or facial scanning',
      privacyBullet3: 'Continuous 24/7 unhindered protection',
      privacyBullet4: 'Zero maintenance or device charging',
    },
    terminal: {
      title: 'Live RF Telemetry Event Stream',
      rateBadge: '100 Hz Rate',
      log1: 'GeriCare Wi-Fi CSI daemon initialized. ESP32 nodes #1 & #2 paired.',
      log2: 'OFDM 64-subcarriers baseline calibrated at 5.24 GHz (Channel 48).',
      log3: 'Privacy Shield verified: 0 optical lenses detected. 100% RF passive telemetry.',
    },
    footer: {
      activeNodes: 'ACTIVE NODES:',
      activeNodesVal: '1 TX Router + 2 ESP32-S3 RX',
      sampling: 'CSI SAMPLING:',
      samplingVal: '100 Hz / Antenna',
      latency: 'LATENCY:',
      latencyVal: '<450 ms',
      guarantee1: 'Camera-Free Guarantee',
      guarantee2: 'Elderly Dignity First',
    },
  },
};
