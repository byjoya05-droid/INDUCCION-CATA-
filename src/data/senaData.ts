import { CaseScenario, QuizQuestion, RuleArticle, Badge } from '../types';

export const SENA_INFO = {
  acronym: 'SENA',
  name: 'Servicio Nacional de Aprendizaje',
  motto: 'Conocimiento y emprendimiento para todos los colombianos',
  regulation: 'Acuerdo 0009 de 2024',
  regulationSubtitle: 'Por el cual se adopta el Reglamento del Aprendiz del Servicio Nacional de Aprendizaje - SENA y se derogan disposiciones anteriores (Acuerdos 07 de 2012, 02 de 2014 y 02 de 2024).',
  primaryColor: '#39A900', // Verde SENA Oficial
  secondaryColor: '#00324D', // Azul Institucional SENA
  values: [
    { name: 'Respeto', desc: 'Reconocimiento y valoración de la dignidad humana y los derechos individuales.' },
    { name: 'Libre Pensamiento', desc: 'Apertura hacia diversas posturas ideológicas con sentido crítico y constructivo.' },
    { name: 'Liderazgo', desc: 'Capacidad de inspirar, promover cambios positivos e impulsar a la comunidad formativa.' },
    { name: 'Solidaridad', desc: 'Espíritu de colaboración mutua y sentido de comunidad en los centros de formación.' },
    { name: 'Justicia y Equidad', desc: 'Garantía del debido proceso, igualdad de oportunidades e imparcialidad.' },
    { name: 'Transparencia', desc: 'Actuación honesta, ética y clara en el ámbito académico y disciplinario.' },
    { name: 'Creatividad e Innovación', desc: 'Búsqueda constante de soluciones disruptivas para el desarrollo productivo del país.' }
  ],
  symbols: {
    shield: 'Representa los tres sectores de la economía nacional: el piñón (industria y construcción), el caduceo (comercio y servicios) y el café/espiga (sector agropecuario).',
    flag: 'Blanca con el escudo del SENA en el centro, simbolizando la paz, la pureza de intención formativa y la tranquilidad institucional.',
    logo: 'Silueta dinámica de una persona que camina hacia el futuro, con los brazos abiertos, representando la formación integral para el trabajo y el desarrollo humano.',
    anthem: 'Himno institucional compuesto por el maestro Jesús Alberto Sepúlveda, que exalta la fuerza transformadora de la juventud y la patria trabajadora.'
  }
};

export const DEFAULT_PROFILE = {
  fullName: 'Valentina Restrepo Henao',
  documentType: 'CC' as const,
  documentNumber: '1020493821',
  programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  fichaNumber: '3170314',
  regional: 'Regional Distrito Capital',
  centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  modality: 'Presencial' as const
};

export const RULE_ARTICLES: RuleArticle[] = [
  // Derechos
  {
    id: 'art-der-1',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 1',
    title: 'Derecho a una Inducción Completa y Pertinente',
    category: 'derecho',
    summary: 'Recibir al inicio del proceso formativo una inducción que oriente sobre el SENA, la plataforma virtual, el programa y el reglamento.',
    fullText: 'Recibir al iniciar el proceso formativo, el programa de inducción institucional que le permita conocer la misión, visión, estructura orgánica, deberes, derechos y reglamento vigente del SENA.',
    highlightTag: 'Fundamental en Inducción',
    practicalTip: 'Asegúrate de participar en todas las sesiones y validar este curso interactivo para recibir tu certificado de inducción.'
  },
  {
    id: 'art-der-2',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 2',
    title: 'Formación Profesional Integral de Calidad',
    category: 'derecho',
    summary: 'Acceso a instrucción calificada, ambientes idóneos y herramientas acordes al diseño curricular.',
    fullText: 'Disfrutar de una Formación Profesional Integral acorde con el programa formativo matriculado, orientada por instructores competentes y utilizando ambientes de aprendizaje modernos.',
    highlightTag: 'FPI de Excelencia'
  },
  {
    id: 'art-der-3',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 3',
    title: 'Uso de Infraestructura y Herramientas Tecnológicas',
    category: 'derecho',
    summary: 'Utilizar laboratorios, talleres, bibliotecas digitales y plataformas como SOFIA Plus / Zajuna.',
    fullText: 'Hacer uso adecuado y oportuno de los recursos físicos, tecnológicos, bibliotecas y herramientas didácticas disponibles en el Centro de Formación para el desarrollo de sus competencias.',
    highlightTag: 'Recursos Públicos'
  },
  {
    id: 'art-der-4',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 4',
    title: 'Elementos de Protección Personal (EPP)',
    category: 'derecho',
    summary: 'Exigir y recibir la orientación de seguridad y dotación requerida en talleres de riesgo.',
    fullText: 'Recibir oportuna orientación sobre seguridad y salud en el trabajo (SST) y el uso exigido de los Elementos de Protección Personal (EPP) en talleres especializados.',
    highlightTag: 'SST y Vida'
  },
  {
    id: 'art-der-5',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 5',
    title: 'Beneficios de Bienestar al Aprendiz',
    category: 'derecho',
    summary: 'Programas de salud, cultura, deportes, apoyo socioeconómico, alimentación y monitorías.',
    fullText: 'Acceder a los programas, proyectos y beneficios del área de Bienestar al Aprendiz orientados al desarrollo humano, cultural, recreativo, psicosocial y de apoyo socioeconómico.',
    highlightTag: 'Bienestar Integral'
  },
  {
    id: 'art-der-6',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 6',
    title: 'Garantía del Debido Proceso y Defensa',
    category: 'derecho',
    summary: 'Ser escuchado en descargos, aportar pruebas y presentar recurso de reposición ante cualquier sanción.',
    fullText: 'Ser escuchado previamente en descargos, aportar pruebas, controvertir las que se alleguen en su contra y contar con todas las garantías constitucionales del debido proceso.',
    highlightTag: 'Garantía Legal',
    practicalTip: 'Nadie puede ser sancionado sin haber sido citado formalmente a descargos ante el Comité de Evaluación y Seguimiento.'
  },
  {
    id: 'art-der-7',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    number: 'Art. 7 Num. 7',
    title: 'Estímulos e Incentivos por Excelencia',
    category: 'derecho',
    summary: 'Ser postulado a monitorías remuneradas, reconocimientos de honor, becas y representación institucional.',
    fullText: 'Recibir incentivos y distinciones por alto desempeño académico, liderazgo, investigación aplicada (SENNAPRENDIZ / SENNOVA) o participación deportiva y cultural.',
    highlightTag: 'Mérito Académico'
  },

  // Deberes
  {
    id: 'art-deb-1',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    number: 'Art. 9 Num. 1',
    title: 'Firma y Cumplimiento del Acta de Compromiso',
    category: 'deber',
    summary: 'Cumplir a cabalidad los estatutos, reglamentos y compromisos éticos suscritos en la matrícula.',
    fullText: 'Conocer y cumplir estrictamente el Reglamento del Aprendiz, las políticas institucionales y firmar el acta de compromiso ético al momento de la matrícula.',
    highlightTag: 'Compromiso Ético'
  },
  {
    id: 'art-deb-2',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    number: 'Art. 9 Num. 2',
    title: 'Porte Visible del Carné y Uniforme Institucional',
    category: 'deber',
    summary: 'Portar el carné en lugar visible durante toda la permanencia en el centro y usar el uniforme reglamentario.',
    fullText: 'Portar visiblemente el carné institucional vigente en todas las instalaciones del SENA y portar con decoro el uniforme o indumentaria técnica exigida para el programa.',
    highlightTag: 'Seguridad y Convivencia'
  },
  {
    id: 'art-deb-3',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    number: 'Art. 9 Num. 3',
    title: 'Integridad y Honestidad Académica (Cero Plagio)',
    category: 'deber',
    summary: 'Presentar evidencias originales, citar fuentes bibliográficas y no cometer fraude en evaluaciones.',
    fullText: 'Actuar con honestidad en todas las evaluaciones, proyectos y evidencias. Abstenerse de incurrir en plagio, copia no autorizada o suplantación en entornos físicos o virtuales.',
    highlightTag: 'Honestidad Intelectual',
    practicalTip: 'Siempre cita las fuentes bajo normas APA o IEEE; el plagio se tipifica como falta grave o gravísima.'
  },
  {
    id: 'art-deb-4',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    number: 'Art. 9 Num. 4',
    title: 'Puntualidad y Asistencia Rigurosa',
    category: 'deber',
    summary: 'Asistir puntualmente a clases y justificar formalmente las inasistencias dentro de los 3 días hábiles siguientes.',
    fullText: 'Asistir con puntualidad a todas las actividades formativas programadas. En caso de fuerza mayor o caso fortuito, allegar las justificaciones médicas o laborales en un plazo no mayor a tres (3) días hábiles.',
    highlightTag: 'Disciplina Profesional'
  },
  {
    id: 'art-deb-5',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    number: 'Art. 9 Num. 5',
    title: 'Cuidado y Custodia de Bienes e Instalaciones',
    category: 'deber',
    summary: 'Proteger la infraestructura física, máquinas, software y dotación del SENA.',
    fullText: 'Cuidar con esmero las instalaciones, herramientas, equipos de cómputo, maquinaria y software puestos a su disposición, respondiendo por el deterioro causado por dolo o negligencia.',
    highlightTag: 'Bienes Públicos'
  },

  // Prohibiciones
  {
    id: 'art-pro-1',
    chapter: 'Capítulo III - Prohibiciones',
    number: 'Art. 10 Num. 1',
    title: 'Sustancias Psicoactivas, Alcohol y Armas',
    category: 'prohibicion',
    summary: 'Ingresar bajo efectos, consumir o portar bebidas embriagantes, estupefacientes o armas en el SENA.',
    fullText: 'Ingresar o permanecer en las instalaciones del SENA bajo el influjo de sustancias alcohólicas, psicotrópicas o psicoactivas, así como su comercialización o porte de cualquier tipo de arma.',
    highlightTag: 'Tolerancia Cero'
  },
  {
    id: 'art-pro-2',
    chapter: 'Capítulo III - Prohibiciones',
    number: 'Art. 10 Num. 2',
    title: 'Inactividad Prolongada e Injustificada (Deserción)',
    category: 'prohibicion',
    summary: 'Dejar de asistir por más de 3 días consecutivos sin reporte o no ingresar a plataforma por más de 30 días.',
    fullText: 'La inasistencia injustificada durante tres (3) días hábiles consecutivos en modalidad presencial, o la falta de ingreso e interactividad en la plataforma virtual por treinta (30) días calendario sin causa legal justificada.',
    highlightTag: 'Causal de Deserción'
  },
  {
    id: 'art-pro-3',
    chapter: 'Capítulo III - Prohibiciones',
    number: 'Art. 10 Num. 3',
    title: 'Acoso, Ciberacoso y Violencia en Ambientes de Aprendizaje',
    category: 'prohibicion',
    summary: 'Agresiones verbales, psicológicas, de género o físicas contra aprendices, instructores o personal.',
    fullText: 'Incurrir en conductas de violencia, acoso laboral, discriminación, matoneo o ciberacoso hacia cualquier miembro de la comunidad educativa, ya sea presencialmente o mediante canales digitales.',
    highlightTag: 'Convivencia Segura'
  },
  {
    id: 'art-pro-4',
    chapter: 'Capítulo III - Prohibiciones',
    number: 'Art. 10 Num. 4',
    title: 'Proselitismo Político y Religioso en Instalaciones',
    category: 'prohibicion',
    summary: 'Usar los espacios del SENA para hacer campañas proselitistas partidistas o dogmáticas.',
    fullText: 'Realizar actividades de proselitismo político electoral o proselitismo religioso que interrumpan la dinámica formativa dentro de los centros de formación.',
    highlightTag: 'Laicidad Institucional'
  },

  // Faltas y Medidas
  {
    id: 'art-fal-1',
    chapter: 'Capítulo V - Régimen Disciplinario',
    number: 'Art. 22',
    title: 'Clasificación de las Faltas (Académicas y Disciplinarias)',
    category: 'falta',
    summary: 'Las faltas se dividen en académicas (rendimiento, evidencias) y disciplinarias (convivencia, integridad).',
    fullText: 'Las faltas se clasifican en: Académicas (incumplimiento en resultados de aprendizaje) y Disciplinarias (conductas que afectan la sana convivencia y normativas). Se gradúan en Leves, Graves y Gravísimas según el impacto y dolo.',
    highlightTag: 'Régimen Sancionatorio'
  },
  {
    id: 'art-med-1',
    chapter: 'Capítulo V - Medidas Formativas',
    number: 'Art. 28',
    title: 'Llamado de Atención Verbal Pedagógico',
    category: 'medida_formativa',
    summary: 'Medida pedagógica inmediata concertada por el instructor. No constituye sanción ni va a hoja de vida.',
    fullText: 'Es un diálogo reflexivo entre el instructor y el aprendiz ante una conducta contraria a la formación en grado menor, con el fin de corregir oportunamente. No genera antecedentes disciplinarios.',
    highlightTag: 'Pedagógico sin Sanción'
  },
  {
    id: 'art-med-2',
    chapter: 'Capítulo V - Medidas Formativas',
    number: 'Art. 29',
    title: 'Plan de Mejoramiento Académico o Disciplinario',
    category: 'medida_formativa',
    summary: 'Acuerdo concertado con actividades complementarias y plazo específico para alcanzar los logros pendientes.',
    fullText: 'Medida concertada entre el aprendiz y el instructor o coordinador académico para superar insuficiencias en el logro de competencias o conductas. Si se incumple, se eleva a Comité disciplinario.',
    highlightTag: 'Ruta de Superación'
  },
  {
    id: 'art-san-1',
    chapter: 'Capítulo V - Medidas Sancionatorias',
    number: 'Art. 31 Num. 1',
    title: 'Llamado de Atención Escrito con Registro',
    category: 'sancion',
    summary: 'Sanción formal impuesta por Subdirección con registro en la hoja de vida del aprendiz.',
    fullText: 'Sanción aplicada por la Subdirección de Centro ante faltas leves reiteradas o graves, mediante acto administrativo motivado, con copia al expediente u hoja de vida del aprendiz.',
    highlightTag: 'Sanción Formal'
  },
  {
    id: 'art-san-2',
    chapter: 'Capítulo V - Medidas Sancionatorias',
    number: 'Art. 31 Num. 2',
    title: 'Condicionamiento de Matrícula',
    category: 'sancion',
    summary: 'Pérdida de estímulos y sujeción a evaluación estricta durante el resto del trimestre o fase.',
    fullText: 'El aprendiz queda en condición de observación rigurosa. Pierde beneficios de bienestar (como apoyos de sostenimiento) y cualquier nueva falta implicará cancelación definitiva.',
    highlightTag: 'Alerta Crítica'
  },
  {
    id: 'art-san-3',
    chapter: 'Capítulo V - Medidas Sancionatorias',
    number: 'Art. 31 Num. 3',
    title: 'Cancelación de Matrícula e Inhabilidad Institucional',
    category: 'sancion',
    summary: 'Máxima sanción que desvincula al aprendiz e impone inhabilidad de 6 meses a 3 años para reingresar al SENA.',
    fullText: 'Pérdida de la condición de aprendiz SENA ante faltas gravísimas o desacato reiterado. Conlleva una inhabilidad temporal para matricularse en programas del SENA por un periodo entre 6 meses y 3 años.',
    highlightTag: 'Máxima Sanción'
  }
];

export const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'caso-1',
    title: 'El Código Descargado de GitHub sin Atribución',
    category: 'Integridad Académica',
    difficulty: 'Intermedio',
    character: 'Camilo Torres',
    characterRole: 'Aprendiz de ADSO en Etapa Lectiva',
    description: 'Camilo tiene que entregar mañana un proyecto integrador que evalúa la competencia de desarrollo Backend con Node.js y bases de datos. Por falta de tiempo en su trabajo, descargó un repositorio completo de GitHub, le cambió los nombres de los autores en los comentarios y lo subió como evidencia propia al LMS institucional (Zajuna). El instructor identificó la coincidencia mediante la herramienta antiplagio.',
    dilemma: '¿Qué tipo de falta cometió Camilo según el Acuerdo 0009 de 2024 y cuál es la actuación correspondiente del instructor?',
    choices: [
      {
        id: 'c1-opt1',
        text: 'Es un simple descuido formativo; el instructor debe felicitarlo por investigar en GitHub y pedirle que cambie los colores del frontend.',
        isCorrect: false,
        feedback: 'Incorrecto. La apropiación de código de terceros sin cita ni autoría se cataloga como fraude y plagio, vulnerando el deber de honestidad intelectual.',
        legalBasis: 'Capítulo III, Art. 9 Deberes - Honestidad en evidencias académicas.',
        points: 0
      },
      {
        id: 'c1-opt2',
        text: 'Es una falta académica y disciplinaria grave. El instructor debe no aprobar el resultado de aprendizaje, citar al aprendiz a diálogo formativo, reportar la falta e iniciar el debido proceso ante el Comité de Evaluación.',
        isCorrect: true,
        feedback: '¡Excelente decisión! El plagio deliberado atenta contra la honestidad institucional. Se debe garantizar el debido proceso y remitir al Comité de Evaluación y Seguimiento.',
        legalBasis: 'Capítulo V, Art. 22 y 24 - Faltas Graves que atentan contra la integridad académica.',
        points: 100
      },
      {
        id: 'c1-opt3',
        text: 'El instructor puede expulsar inmediatamente a Camilo del SENA de manera verbal sin comités ni trámites.',
        isCorrect: false,
        feedback: 'Incorrecto. Ningún instructor tiene la facultad de expulsar aprendices de forma unilateral. Toda sanción requiere Comité de Evaluación y debido proceso.',
        legalBasis: 'Capítulo II, Art. 7 Num. 6 - Garantía Constitucional del Debido Proceso.',
        points: 10
      }
    ],
    keyTakeaway: 'Siempre referencia librerías y fuentes de código. El plagio en evidencias formativas conlleva investigación disciplinaria y puede causar cancelación de matrícula.'
  },
  {
    id: 'caso-2',
    title: 'Emergencia Familiar y Ausencia de 4 Días',
    category: 'Inasistencias y Deserción',
    difficulty: 'Básico',
    character: 'Mariana Duarte',
    characterRole: 'Aprendiz de Gestión Administrativa',
    description: 'Mariana tuvo una emergencia médica grave con su madre en una zona rural y no pudo conectarse ni asistir al centro de formación durante 4 días hábiles consecutivos. No cuenta con señal continua de celular en la vereda donde estuvo cuidándola.',
    dilemma: '¿Cómo debe actuar Mariana para evitar que se le declare en causal de deserción formativa?',
    choices: [
      {
        id: 'c2-opt1',
        text: 'No debe preocuparse; el SENA nunca deserta a los aprendices y puede volver un mes después sin avisar a nadie.',
        isCorrect: false,
        feedback: 'Falso. Tres (3) días consecutivos de inasistencia injustificada activan la alerta automática de deserción formativa.',
        legalBasis: 'Capítulo III, Art. 10 y Capítulo V - Causales de Deserción.',
        points: 0
      },
      {
        id: 'c2-opt2',
        text: 'Presentar dentro de los 3 días hábiles tras su reintegro los soportes médicos y una carta explicativa al coordinador e instructores para justificar la inasistencia por fuerza mayor.',
        isCorrect: true,
        feedback: '¡Correcto! El reglamento otorga 3 días hábiles para radicar las justificaciones de fuerza mayor o caso fortuito debidamente soportadas.',
        legalBasis: 'Capítulo III, Art. 9 Num. 4 - Deber de justificar inasistencias oportunamente.',
        points: 100
      },
      {
        id: 'c2-opt3',
        text: 'Pedirle a un compañero que firme la lista de asistencia por ella para que el instructor no se dé cuenta.',
        isCorrect: false,
        feedback: '¡Peligroso! Suplantar la firma de un compañero es una falta gravísima de falsedad documental tanto para quien lo pide como para quien firma.',
        legalBasis: 'Capítulo III, Art. 10 - Prohibición de fraude o alteración de listas institucionales.',
        points: 0
      }
    ],
    keyTakeaway: 'Ante emergencias o calamidades, comunícate inmediatamente con tu vocero o instructor y radica los soportes antes de los 3 días hábiles.'
  },
  {
    id: 'caso-3',
    title: 'Taller de Maquinaria sin Botas ni Gafas de Seguridad',
    category: 'Seguridad en Talleres',
    difficulty: 'Básico',
    character: 'Andrés Felipe',
    characterRole: 'Aprendiz de Mantenimiento Mecatrónico',
    description: 'Andrés olvidó sus botas con puntera de seguridad y sus gafas de protección ocular. Quiere ingresar al taller de máquinas-herramienta diciendo: "Solo voy a sentarme en una silla a tomar apuntes, no voy a operar ningún torno ni fresadora".',
    dilemma: '¿Cuál es la norma de bioseguridad y deber formativo aplicable?',
    choices: [
      {
        id: 'c3-opt1',
        text: 'El instructor debe prohibirle el ingreso al ambiente técnico por riesgo de SST. Andrés tiene el deber de portar los EPP completos en áreas de peligro industrial.',
        isCorrect: true,
        feedback: '¡Muy bien! Los talleres con maquinaria activa exigen EPP obligatorio a cualquier persona que ingrese, sin excepciones.',
        legalBasis: 'Capítulo II y III - Seguridad y Salud en el Trabajo (SST) y uso de EPP.',
        points: 100
      },
      {
        id: 'c3-opt2',
        text: 'Permitirle ingresar si promete no levantarse de la silla ni tocar las máquinas.',
        isCorrect: false,
        feedback: 'Riesgoso e ilegal. En un taller mecánico pueden saltar virutas metálicas o desprenderse fluidos a presión; el riesgo existe en todo el perímetro.',
        legalBasis: 'Protocolos de Seguridad Ocupacional SENA.',
        points: 10
      },
      {
        id: 'c3-opt3',
        text: 'Ponerle una sanción de cancelación definitiva de matrícula de manera inmediata.',
        isCorrect: false,
        feedback: 'Desproporcionado. Primero se aplica el llamado de atención pedagógico y se le instruye sobre la cultura del autocuidado.',
        legalBasis: 'Capítulo V - Criterios de Proporcionalidad y Medidas Formativas.',
        points: 20
      }
    ],
    keyTakeaway: 'La vida y la integridad física no se negocian. Los EPP son tanto un derecho del aprendiz como un deber intransferible.'
  },
  {
    id: 'caso-4',
    title: 'Conflicto y Mensajes Ofensivos en Grupo de WhatsApp de la Ficha',
    category: 'Convivencia y Respeto',
    difficulty: 'Intermedio',
    character: 'Laura y Julián',
    characterRole: 'Aprendices de la misma ficha',
    description: 'En el grupo de WhatsApp creado por la vocera para coordinar evidencias, Julián comenzó a enviar mensajes con lenguaje despectivo, memes denigrantes y burlas hacia la orientación sexual y capacidades cognitivas de Laura.',
    dilemma: '¿Aplica el Reglamento del Aprendiz SENA aunque la ofensa ocurra en un grupo digital y fuera del horario de clases presenciales?',
    choices: [
      {
        id: 'c4-opt1',
        text: 'No aplica, porque WhatsApp es una red privada y el SENA solo tiene jurisdicción dentro de las 4 paredes del salón de clases.',
        isCorrect: false,
        feedback: 'Incorrecto. El Acuerdo 0009 de 2024 contempla expresamente la convivencia en ambientes virtuales, redes y plataformas vinculadas a la comunidad educativa.',
        legalBasis: 'Capítulo III, Art. 10 - Prohibición de ciberacoso y violencia digital.',
        points: 10
      },
      {
        id: 'c4-opt2',
        text: 'Sí aplica plenamente. El respeto a la dignidad y la prohibición de ciberacoso cobija cualquier canal digital relacionado con la formación. Constituye falta disciplinaria grave.',
        isCorrect: true,
        feedback: '¡Exacto! El SENA promueve ambientes libres de discriminación y violencia, incluyendo los medios digitales de interacción formativa.',
        legalBasis: 'Capítulo III, Art. 10 Num. 3 - Conductas de discriminación, agresión y matoneo digital.',
        points: 100
      },
      {
        id: 'c4-opt3',
        text: 'Solo Laura debe salirse del grupo y los demás deben ignorar a Julián para no tener problemas.',
        isCorrect: false,
        feedback: 'Incorrecto. No se debe revictimizar a quien sufre el acoso; el centro cuenta con Bienestar al Aprendiz y el Comité para restaurar la convivencia.',
        legalBasis: 'Ruta de Atención de Convivencia y Bienestar SENA.',
        points: 0
      }
    ],
    keyTakeaway: 'El respeto y la no discriminación son irrenunciables en persona y en cualquier medio digital de la comunidad SENA.'
  },
  {
    id: 'caso-5',
    title: 'Finalización de Etapa Lectiva y Contrato de Aprendizaje',
    category: 'Etapa Productiva',
    difficulty: 'Avanzado',
    character: 'Esteban Muñoz',
    characterRole: 'Aprendiz a punto de culminar Etapa Lectiva',
    description: 'Esteban terminó todas sus competencias lectivas en el centro, pero desconoce qué opciones tiene para hacer su Etapa Productiva y cree que la única vía válida es conseguir un Contrato de Aprendizaje pagado por una multinacional.',
    dilemma: '¿Cuáles son las alternativas oficiales reconocidas por el SENA para desarrollar la Etapa Productiva?',
    choices: [
      {
        id: 'c5-opt1',
        text: 'Únicamente existe el contrato de aprendizaje con empresas que paguen salario completo.',
        isCorrect: false,
        feedback: 'Incorrecto. Existen múltiples alternativas para certificar la etapa productiva según las preferencias y aptitudes del aprendiz.',
        legalBasis: 'Capítulo IV - Alternativas de Etapa Productiva.',
        points: 10
      },
      {
        id: 'c5-opt2',
        text: 'Existen múltiples alternativas válidas: Contrato de Aprendizaje, Proyecto Productivo (Fondo Emprender), Pasantía comunitaria o empresarial, Monitoría en el SENA y Vínculo Laboral formal afín.',
        isCorrect: true,
        feedback: '¡Perfecto! Todas estas opciones permiten aplicar los conocimientos técnicos en escenarios reales con seguimiento de un instructor asignado.',
        legalBasis: 'Capítulo IV, Art. 14 - Modalidades reconocidas para la Etapa Productiva.',
        points: 100
      },
      {
        id: 'c5-opt3',
        text: 'Puede inventarse un certificado falso de una tienda de su tío para no tener que trabajar 6 meses.',
        isCorrect: false,
        feedback: 'Fraude total. El SENA realiza auditorías y seguimiento técnico presencial o virtual. Falsificar soportes es causal de cancelación de matrícula e investigación penal.',
        legalBasis: 'Capítulo V - Falsedad en documentos formativos.',
        points: 0
      }
    ],
    keyTakeaway: 'Conoce con tu coordinador las diferentes modalidades de etapa productiva (contrato, proyecto productivo, pasantía, vínculo laboral o monitoría) desde la inducción.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Identidad SENA',
    question: '¿Cuál es el acto administrativo más reciente que rige el Reglamento del Aprendiz SENA?',
    options: [
      'Acuerdo 007 de 2012',
      'Acuerdo 0009 de 2024',
      'Decreto 1072 de 2015',
      'Ley 119 de 1994'
    ],
    correctAnswerIndex: 1,
    explanation: 'El Acuerdo 0009 de 2024 adoptó el nuevo reglamento integral del aprendiz SENA, actualizando y derogando los acuerdos 07 de 2012, 02 de 2014 y 02 de 2024.',
    articleCitation: 'Preámbulo y Art. Final del Acuerdo 0009 de 2024',
    xpValue: 50
  },
  {
    id: 'q2',
    category: 'Derechos',
    question: '¿Qué garantía tiene un aprendiz cuando es llamado a responder por una presunta falta disciplinaria?',
    options: [
      'Debe aceptar la sanción de inmediato sin hablar',
      'Garantía al debido proceso, ser escuchado en descargos, aportar pruebas y contar con derecho a la defensa',
      'Solo puede defenderse si contrata a un abogado externo',
      'La sanción se aplica automáticamente en 24 horas'
    ],
    correctAnswerIndex: 1,
    explanation: 'El debido proceso es una garantía constitucional y derecho fundamental del aprendiz SENA (Capítulo II), garantizando descargos y recursos de reposición.',
    articleCitation: 'Capítulo II, Art. 7 Num. 6 - Garantía del Debido Proceso',
    xpValue: 50
  },
  {
    id: 'q3',
    category: 'Deberes',
    question: 'Si un aprendiz tiene una calamidad doméstica que le impide asistir al centro por 2 días, ¿cuál es el plazo máximo para presentar su justificación?',
    options: [
      'Hasta el final del trimestre',
      'Tres (3) días hábiles siguientes al reintegro',
      'Quince (15) días calendario',
      'No es necesario justificar si el compañero le dice al instructor'
    ],
    correctAnswerIndex: 1,
    explanation: 'El aprendiz debe presentar los soportes válidos dentro de los 3 días hábiles siguientes al reintegro para evitar que se compute como inasistencia injustificada.',
    articleCitation: 'Capítulo III, Art. 9 Num. 4 - Asistencia y Justificaciones',
    xpValue: 50
  },
  {
    id: 'q4',
    category: 'Prohibiciones',
    question: '¿Cuántos días consecutivos de inasistencia presencial injustificada constituyen causal legal de deserción en el SENA?',
    options: [
      'Un (1) solo día',
      'Tres (3) días hábiles consecutivos',
      'Diez (10) días consecutivos',
      'Treinta (30) días calendario'
    ],
    correctAnswerIndex: 1,
    explanation: 'La inasistencia injustificada durante tres (3) días hábiles consecutivos en presencialidad es causal formal de deserción del proceso formativo.',
    articleCitation: 'Capítulo III, Art. 10 y Capítulo V - Causales de Deserción',
    xpValue: 50
  },
  {
    id: 'q5',
    category: 'Medidas y Sanciones',
    question: '¿Cuál es la diferencia sustancial entre una Medida Formativa y una Medida Sancionatoria?',
    options: [
      'No hay diferencia, ambas son castigos severos',
      'La Medida Formativa es pedagógica y preventiva (no mancha la hoja de vida), mientras que la Sancionatoria se impone tras debido proceso y va al registro institucional',
      'La Medida Formativa siempre incluye una multa económica en dinero',
      'Las Medidas Formativas solo las aplica la Policía Nacional'
    ],
    correctAnswerIndex: 1,
    explanation: 'Las medidas formativas (llamado verbal, planes de mejoramiento) buscan orientar y recuperar competencias sin carácter punitivo ni anotación de sanción.',
    articleCitation: 'Capítulo V, Art. 28 y 31 - Principios Orientadores del Régimen Sancionatorio',
    xpValue: 50
  },
  {
    id: 'q6',
    category: 'Identidad SENA',
    question: '¿Qué representan los elementos del escudo del SENA (piñón, caduceo y café/espiga)?',
    options: [
      'Las tres regiones geográficas de Colombia',
      'Los tres sectores de la economía nacional: Industria y Construcción, Comercio y Servicios, y Sector Agropecuario',
      'El oro, el carbón y el petróleo',
      'Los tres poderes públicos del Estado'
    ],
    correctAnswerIndex: 1,
    explanation: 'El escudo del SENA resume los sectores productivos que mueven a Colombia: piñón (industria), caduceo (comercio) y café (campo).',
    articleCitation: 'Símbolos Institucionales del SENA',
    xpValue: 50
  },
  {
    id: 'q7',
    category: 'Derechos',
    question: '¿Cuál de los siguientes es un beneficio del programa de Bienestar al Aprendiz?',
    options: [
      'Exención de presentar evidencias y tareas',
      'Apoyos de sostenimiento, monitorías, actividades deportivas, de salud, arte y cultura',
      'Poder elegir los instructores a gusto propio',
      'Acceso a vacaciones ilimitadas'
    ],
    correctAnswerIndex: 1,
    explanation: 'Bienestar al Aprendiz brinda acompañamiento psicosocial, actividades deportivas, apoyo socioeconómico para aprendices focalizados y convocatorias de monitorías.',
    articleCitation: 'Capítulo II, Art. 7 Num. 5 - Bienestar al Aprendiz',
    xpValue: 50
  },
  {
    id: 'q8',
    category: 'Prohibiciones',
    question: '¿Qué sanción conlleva la cancelación definitiva de matrícula por faltas gravísimas?',
    options: [
      'Solo una llamada de atención por correo',
      'Pérdida de la condición de aprendiz y una inhabilidad para ingresar al SENA de 6 meses a 3 años según la gravedad',
      'Pagar una fianza bancaria',
      'No tiene ninguna consecuencia a futuro'
    ],
    correctAnswerIndex: 1,
    explanation: 'La cancelación de matrícula es la sanción máxima e inhabilita al sancionado para matricularse en programas del SENA por un periodo legal de entre 6 meses y 3 años.',
    articleCitation: 'Capítulo V, Art. 31 Num. 3 - Cancelación de Matrícula',
    xpValue: 50
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-identidad',
    title: 'Pionero SENA',
    description: 'Exploró los valores, símbolos y la Formación Profesional Integral (FPI).',
    icon: 'Compass',
    category: 'progreso',
    isUnlocked: true,
    unlockedAt: 'Al iniciar'
  },
  {
    id: 'badge-derechos',
    title: 'Defensor de Garantías',
    description: 'Conoce al detalle los derechos, bienestar y debido proceso del aprendiz.',
    icon: 'ShieldCheck',
    category: 'conocimiento',
    isUnlocked: false
  },
  {
    id: 'badge-deberes',
    title: 'Compromiso de Honor',
    description: 'Apropió los deberes, honestidad académica y uso debido de infraestructura.',
    icon: 'Award',
    category: 'conocimiento',
    isUnlocked: false
  },
  {
    id: 'badge-casos',
    title: 'Consejero de Ética',
    description: 'Resolvió exitosamente los casos prácticos del Comité de Convivencia.',
    icon: 'Scale',
    category: 'simulador',
    isUnlocked: false
  },
  {
    id: 'badge-certificado',
    title: 'Graduado de Inducción',
    description: 'Aprobó con éxito la evaluación final del Reglamento del Aprendiz 2024.',
    icon: 'GraduationCap',
    category: 'excelencia',
    isUnlocked: false
  }
];

export const INDUCTION_PLAN_STEPS = [
  {
    phase: 'Fase 1: Bienvenida e Inmersión Institucional',
    duration: 'Día 1 (4 Horas)',
    objective: 'Reconocer la identidad del SENA, su historia, símbolos patrios y el modelo pedagógico de Formación Profesional Integral.',
    activities: [
      'Presentación de las autoridades del Centro y equipo de Bienestar al Aprendiz.',
      'Taller interactivo: Misión, Visión, Escudo, Bandera y Lema institucional.',
      'Apertura del Acta de Compromiso Ético y firma digital.',
      'Activación de cuentas institucionales (Correo Soy SENA, Zajuna / LMS, Sofia Plus).'
    ],
    deliverable: 'Perfil configurado y Acta de compromiso firmada digitalmente.'
  },
  {
    phase: 'Fase 2: Convivencia y Garantías (Acuerdo 0009 de 2024)',
    duration: 'Día 2 (4 Horas)',
    objective: 'Apropiar los Derechos, Deberes y Prohibiciones del nuevo Reglamento del Aprendiz SENA.',
    activities: [
      'Socialización interactiva del Capítulo II: Derechos y Beneficios de Bienestar.',
      'Taller de Deberes y Prohibiciones: Cero tolerancia al plagio y ciberacoso.',
      'Exploración de la seguridad y salud en el trabajo (SST) y uso de EPP.',
      'Elección de voceros y líderes de ficha.'
    ],
    deliverable: 'Aprobación de los módulos interactivos de Derechos y Deberes.'
  },
  {
    phase: 'Fase 3: Dilemas Éticos y Casos del Comité',
    duration: 'Día 3 (4 Horas)',
    objective: 'Desarrollar el criterio ético y de resolución de conflictos mediante el análisis de casos reales.',
    activities: [
      'Simulador de casos: Integridad académica, inasistencias y riesgos en talleres.',
      'Diferenciación práctica entre Medidas Formativas (planes de mejoramiento) y Sanciones.',
      'Taller vivencial: El debido proceso y la función del Comité de Evaluación y Seguimiento.',
      'Presentación de las 5 alternativas para la Etapa Productiva.'
    ],
    deliverable: 'Resolución satisfactoria de los 5 casos del simulador (100% completitud).'
  },
  {
    phase: 'Fase 4: Evaluación Gamificada y Certificación Oficial',
    duration: 'Día 4 (2 Horas)',
    objective: 'Evaluar las competencias normativas y ciudadanas adquiridas con un umbral de aprobación mínimo del 80%.',
    activities: [
      'Presentación del Desafío del Saber (Evaluación gamificada con retroalimentación inmediata).',
      'Revisión reflexiva de aciertos y artículos del Acuerdo 0009 de 2024.',
      'Emisión y descarga del Certificado Oficial de Aprobación de Inducción con código QR de verificación.',
      'Celebración institucional e integración de la comunidad formativa.'
    ],
    deliverable: 'Certificado de Aprobación de Inducción SENA expedido y verificado.'
  }
];
