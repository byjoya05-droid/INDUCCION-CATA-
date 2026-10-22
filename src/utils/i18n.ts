import { CaseScenario, QuizQuestion, Badge, RuleArticle } from '../types';
import {
  RULE_ARTICLES,
  INDUCTION_PLAN_STEPS,
  CASE_SCENARIOS,
  QUIZ_QUESTIONS,
  INITIAL_BADGES
} from '../data/senaData';

export type Language = 'es' | 'en';

export const translations = {
  es: {
    senaTitle: 'Servicio Nacional de Aprendizaje SENA',
    inductionTitle: 'Inducción Institucional 2026',
    regulation: 'Reglamento del Aprendiz • Acuerdo 0009',
    portalTitle: 'Portal de Inducción SENA',
    portalSubtitle: 'Selecciona tu rol para ingresar a la plataforma interactiva de aprendizaje y normatividad del Acuerdo 0009 de 2024.',
    apprenticeRole: 'Soy Aprendiz',
    apprenticeDesc: 'Realiza los módulos, simulador y obtén tu certificado',
    instructorRole: 'Soy Instructor',
    instructorDesc: 'Panel de control, seguimiento y Google Drive',
    watchVideo: 'Ver Video Tutorial de Inducción (Google Drive)',
    instructorLogin: 'Clave de Instructor',
    instructorLoginDesc: 'Ingresa la clave institucional asignada para administrar el panel de seguimiento.',
    passwordPlaceholder: 'Ingresa la clave (cata2026)',
    enterPanel: 'Ingresar al Panel',
    cancel: 'Cancelar',
    back: 'Volver',
    apprenticeForm: 'Datos del Aprendiz',
    apprenticeFormDesc: 'Ingresa tus datos personales y de ficha para generar tu certificado oficial al finalizar la inducción.',
    fullName: 'Nombre Completo',
    docType: 'Tipo Doc.',
    docNumber: 'Número de Identificación',
    fichaNumber: 'Número de Ficha',
    programName: 'Programa de Formación',
    startInduction: 'Iniciar Inducción 🚀',
    logout: 'Cerrar Sesión',
    modules: 'Módulos Formativos',
    cases: 'Simulador de Casos',
    quiz: 'Evaluación Final',
    certificate: 'Certificado Oficial',
    plan: 'Plan Estructurado',
    instructorPanel: 'Panel Instructor',
    searchRegulation: 'Reglamento',
    connectedDrive: 'Drive Sincronizado ✓',
    connectDrive: 'Conectar Drive',
    badges: 'Insignias',
    spanish: 'Español',
    english: 'English',
    instructorAdmin: 'Instructor / Admin',
    apprenticeMode: 'Modo Aprendiz',
    viewAsApprentice: 'Ver como Aprendiz',
    instructorAccess: 'Acceso Instructor',
    shareApprenticeLink: 'Copiar Enlace de Aprendices',
    registeredApprentices: 'Aprendices Registrados',
    averageProgress: 'Avance Promedio',
    certifiedIssued: 'Certificados Emitidos',
    driveStatus: 'Estado Google Drive',
    welcomeBannerTitle: '¡Hola! Prepárate para ser un Aprendiz Integral.',
    welcomeBannerDesc: 'Este prototipo interactivo te guiará paso a paso por el nuevo Acuerdo 0009 de 2024 (Reglamento del Aprendiz). Descubre tus derechos y deberes, toma decisiones en casos reales, supera la evaluación y obtén tu Certificado Oficial de Inducción con validez institucional.',
    updateData: 'Actualizar mis Datos',
    checkKeyArticles: 'Consultar Artículos Clave',
    footerRights: 'Servicio Nacional de Aprendizaje - SENA • Dirección de Formación Profesional',
    footerSub: 'Prototipo de Inducción Gamificada reglamentado bajo el Acuerdo 0009 de 2024 (deroga Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024).',
    fullRegulation: 'Reglamento Completo',
    pedagogicalPlan: 'Plan Pedagógico',
    switchRoleExit: 'Cambiar de Rol / Salir',

    // ModuleViewer
    mandatoryRoute: 'Ruta de Aprendizaje Obligatoria',
    moduleProgress: 'Progreso de Módulos (Acuerdo 0009 de 2024):',
    completedOf: 'completados',
    ruleExplorerBtn: 'Explorador del Reglamento',
    modulesTitle: 'Módulos Formativos de la Inducción SENA',
    modulesSubtitle: 'Explora cada pilar normativo, marca los temas completados para acumular XP y desbloquear el simulador de casos y la evaluación final.',
    tabIdentidad: '1. Identidad y FPI',
    tabIdentidadDesc: 'Misión, valores y etapas de formación',
    tabDerechos: '2. Derechos del Aprendiz',
    tabDerechosDesc: 'Garantías, Bienestar y Debido Proceso',
    tabDeberes: '3. Deberes y Prohibiciones',
    tabDeberesDesc: 'Ética, convivencia y no al plagio',
    tabRegimen: '4. Régimen Disciplinario',
    tabRegimenDesc: 'Medidas formativas vs sanciones',
    markModuleComplete: 'Marcar Módulo como Completado (+100 XP)',
    moduleCompletedBadge: 'Módulo Completado ✓',
    exploreArticles: 'Consultar Artículos de este Módulo',
    nextModule: 'Siguiente Módulo',
    goToCases: 'Ir al Simulador de Casos',

    // CaseSimulator
    caseSimTitle: 'Simulador del Comité de Convivencia y Ética',
    caseSimTag: 'Dilemas Reales SENA',
    caseSimHeading: 'Aprende Tomando Decisiones con el Reglamento',
    caseSimDesc: 'Analiza situaciones cotidianas vividas por aprendices en centros de formación y determina la aplicación del debido proceso y las medidas formativas.',
    simPoints: 'Puntos de Simulación',
    caseLabel: 'Caso',
    of: 'de',
    area: 'Área',
    difficulty: 'Dificultad',
    character: 'Personaje',
    dilemmaToSolve: 'Dilema a Resolver:',
    selectDecision: 'Selecciona la decisión conforme al Acuerdo 0009 de 2024:',
    excellentCriterion: '¡Excelente Criterio Formativo!',
    inaccurateDecision: 'Decisión Imprecisa o No Ajustada al Reglamento',
    legalBasis: 'Fundamento Normativo',
    restartCases: 'Reiniciar Casos',
    nextCase: 'Siguiente Caso',
    allCasesDone: '¡Todos los casos completados!',

    // GamifiedQuiz
    quizBadge: 'Desafío del Saber: Reglamento SENA',
    quizMinScore: 'Puntaje mínimo aprobatorio: 80%',
    quizHeading: 'Evaluación Final Gamificada',
    quizDesc: 'Demuestra tu apropiación de las normas, derechos y deberes. Al superar el 80% se liberará de manera inmediata tu Certificado Oficial de Inducción.',
    streak: 'Racha',
    correctHits: 'Aciertos',
    passedBanner: '¡INDUCCIÓN SUPERADA CON ÉXITO!',
    failedBanner: 'POR DEBAJO DEL UMBRAL DEL 80%',
    youObtained: 'Obtuviste',
    passedMsg: 'Felicitaciones aprendiz, has acreditado el conocimiento pleno de los deberes, derechos y garantías del Acuerdo 0009 de 2024. Tu certificado ha sido generado.',
    failedMsg: 'El reglamento exige un 80% para la certificación de inducción institucional. Repasa los módulos o vuelve a intentarlo.',
    retryQuiz: 'Reintentar Desafío',
    viewDownloadCert: 'Ver y Descargar Certificado',
    pedagogicalReview: 'Revisión Pedagógica de Respuestas',
    ruleQuote: 'Norma',
    questionLabel: 'Pregunta',
    categoryLabel: 'Categoría',
    correctAnswer: '¡Respuesta Correcta!',
    wrongAnswer: 'Respuesta Incorrecta',
    selectToAdvance: 'Selecciona una opción para avanzar',
    finishQuiz: 'Finalizar Evaluación',
    nextQuestion: 'Siguiente Pregunta',

    // OfficialCertificate
    certPending: 'Certificado Pendiente de Aprobación',
    certPendingTitle: 'Aún no has completado la Evaluación Final',
    certPendingDesc: 'Para obtener tu Certificado Oficial de Inducción con validez institucional, debes alcanzar al menos un 80% de respuestas correctas en el Desafío del Saber.',
    goToQuizBtn: 'Ir a la Evaluación Final Gamificada',
    certAccredited: 'Certificado Oficial Acreditado',
    validLectiva: 'Válido para Etapa Lectiva',
    issuedUnder: 'Expedido bajo el marco del Acuerdo 0009 de 2024',
    editData: 'Editar Datos',
    copyValidation: 'Copiar Validación',
    copiedLink: '¡Enlace Copiado!',
    saveDrive: 'Guardar en Google Drive',
    printPdf: 'Imprimir / Descargar PDF',
    republic: 'República de Colombia • Ministerio del Trabajo',
    senaOrg: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
    directorate: 'Dirección de Formación Profesional Integral • Bienestar al Aprendiz',
    certApprovalTitle: 'Certificado de Aprobación de Inducción',
    certMerit: 'Otorgado en mérito al conocimiento integral del Reglamento del Aprendiz (Acuerdo 0009 de 2024)',
    certifiesThat: 'Hace constar que el (la) aprendiz:',
    identifiedWith: 'Identificado(a) con',
    completedSat: 'Completó satisfactoriamente la jornada y evaluación integral de inducción para el programa:',
    cohortFicha: 'Ficha de Caracterización',
    modalityLabel: 'Modalidad',
    centerLabel: 'Centro',
    approvalExcel: 'Aprobación con',
    excelScore: 'de Excelencia',
    scoreXp: 'Puntaje',
    accumulatedXp: 'XP Acumulados',
    subdirectorate: 'Subdirección de Centro',
    trainingCenter: 'Centro de Formación SENA',
    academicCoord: 'Coordinación Académica',
    welfareTraining: 'Bienestar y Formación Profesional',
    digitalVerification: 'Verificación Digital Activa',
    issuedOn: 'Expedido en Colombia',
    mottoSena: 'SENA: Más Trabajo, Más País',

    // Modals & Drawers
    profileTitle: 'Perfil del Aprendiz SENA',
    profileDesc: 'Estos datos aparecerán en tu Certificado Oficial',
    regionalLabel: 'Regional SENA',
    centerNameLabel: 'Centro de Formación',
    modalityTitle: 'Modalidad de Formación',
    saveProfileBtn: 'Guardar Perfil',
    badgesTitle: 'Insignias y Logros SENA',
    badgesUnlocked: 'insignias desbloqueadas',
    apprenticeLevel: 'Nivel de Aprendiz:',
    guardianLevel: '🌟 Guardián del Reglamento',
    activeLevel: '🚀 Aprendiz Activo',
    noviceLevel: '🌱 Aprendiz Novato',
    unlockedTag: 'Desbloqueada',
    lockedTag: 'Bloqueada'
  },
  en: {
    senaTitle: 'National Learning Service SENA',
    inductionTitle: 'Institutional Induction 2026',
    regulation: 'Apprentice Regulation • Agreement 0009',
    portalTitle: 'SENA Induction Portal',
    portalSubtitle: 'Select your role to enter the interactive learning and regulations platform for Agreement 0009 of 2024.',
    apprenticeRole: 'I am an Apprentice',
    apprenticeDesc: 'Complete modules, simulator and get your certificate',
    instructorRole: 'I am an Instructor',
    instructorDesc: 'Control panel, tracking and Google Drive',
    watchVideo: 'Watch Induction Video Tutorial (Google Drive)',
    instructorLogin: 'Instructor Password',
    instructorLoginDesc: 'Enter the assigned institutional password to manage the tracking dashboard.',
    passwordPlaceholder: 'Enter password (cata2026)',
    enterPanel: 'Enter Dashboard',
    cancel: 'Cancel',
    back: 'Back',
    apprenticeForm: 'Apprentice Details',
    apprenticeFormDesc: 'Enter your personal and cohort data to generate your official certificate upon completion.',
    fullName: 'Full Name',
    docType: 'Doc. Type',
    docNumber: 'Identification Number',
    fichaNumber: 'Cohort Number (Ficha)',
    programName: 'Training Program',
    startInduction: 'Start Induction 🚀',
    logout: 'Sign Out',
    modules: 'Training Modules',
    cases: 'Case Simulator',
    quiz: 'Final Quiz',
    certificate: 'Official Certificate',
    plan: 'Structured Plan',
    instructorPanel: 'Instructor Panel',
    searchRegulation: 'Regulations',
    connectedDrive: 'Drive Synced ✓',
    connectDrive: 'Connect Drive',
    badges: 'Badges',
    spanish: 'Español',
    english: 'English',
    instructorAdmin: 'Instructor / Admin',
    apprenticeMode: 'Apprentice Mode',
    viewAsApprentice: 'View as Apprentice',
    instructorAccess: 'Instructor Access',
    shareApprenticeLink: 'Copy Apprentice Link',
    registeredApprentices: 'Registered Apprentices',
    averageProgress: 'Average Progress',
    certifiedIssued: 'Certificates Issued',
    driveStatus: 'Google Drive Status',
    welcomeBannerTitle: 'Hello! Prepare to be an Integral Apprentice.',
    welcomeBannerDesc: 'This interactive prototype will guide you step by step through the new Agreement 0009 of 2024 (Apprentice Regulation). Discover your rights and duties, make decisions in real cases, pass the evaluation and obtain your Official Induction Certificate with institutional validity.',
    updateData: 'Update My Data',
    checkKeyArticles: 'Explore Key Articles',
    footerRights: 'National Learning Service - SENA • Professional Training Directorate',
    footerSub: 'Gamified Induction Prototype regulated under Agreement 0009 of 2024 (repeals Agreements 07/2012, 02/2014, 06/2023, and 02/2024).',
    fullRegulation: 'Full Regulation',
    pedagogicalPlan: 'Pedagogical Plan',
    switchRoleExit: 'Switch Role / Exit',

    // ModuleViewer
    mandatoryRoute: 'Mandatory Learning Path',
    moduleProgress: 'Module Progress (Agreement 0009 of 2024):',
    completedOf: 'completed',
    ruleExplorerBtn: 'Regulation Explorer',
    modulesTitle: 'SENA Induction Training Modules',
    modulesSubtitle: 'Explore each regulatory pillar, mark completed topics to earn XP, and unlock the case simulator and final quiz.',
    tabIdentidad: '1. Identity & FPI',
    tabIdentidadDesc: 'Mission, values and training stages',
    tabDerechos: '2. Apprentice Rights',
    tabDerechosDesc: 'Guarantees, Welfare and Due Process',
    tabDeberes: '3. Duties & Prohibitions',
    tabDeberesDesc: 'Ethics, coexistence and no plagiarism',
    tabRegimen: '4. Disciplinary Regime',
    tabRegimenDesc: 'Formative measures vs sanctions',
    markModuleComplete: 'Mark Module as Completed (+100 XP)',
    moduleCompletedBadge: 'Module Completed ✓',
    exploreArticles: 'Consult Articles of this Module',
    nextModule: 'Next Module',
    goToCases: 'Go to Case Simulator',

    // CaseSimulator
    caseSimTitle: 'Coexistence & Ethics Committee Simulator',
    caseSimTag: 'Real SENA Dilemmas',
    caseSimHeading: 'Learn by Making Decisions with Regulations',
    caseSimDesc: 'Analyze everyday situations experienced by apprentices in training centers and determine the application of due process and formative measures.',
    simPoints: 'Simulation Points',
    caseLabel: 'Case',
    of: 'of',
    area: 'Area',
    difficulty: 'Difficulty',
    character: 'Character',
    dilemmaToSolve: 'Dilemma to Solve:',
    selectDecision: 'Select the decision pursuant to Agreement 0009 of 2024:',
    excellentCriterion: 'Excellent Formative Judgment!',
    inaccurateDecision: 'Inaccurate or Non-compliant Decision',
    legalBasis: 'Regulatory Foundation',
    restartCases: 'Restart Cases',
    nextCase: 'Next Case',
    allCasesDone: 'All cases completed!',

    // GamifiedQuiz
    quizBadge: 'Knowledge Challenge: SENA Regulation',
    quizMinScore: 'Minimum passing score: 80%',
    quizHeading: 'Gamified Final Assessment',
    quizDesc: 'Demonstrate your grasp of regulations, rights, and duties. Passing 80% will immediately unlock your Official Induction Certificate.',
    streak: 'Streak',
    correctHits: 'Correct',
    passedBanner: 'INDUCTION SUCCESSFULLY PASSED!',
    failedBanner: 'BELOW THE 80% THRESHOLD',
    youObtained: 'You achieved',
    passedMsg: 'Congratulations apprentice! You have proven comprehensive knowledge of duties, rights, and guarantees of Agreement 0009 of 2024. Your certificate is ready.',
    failedMsg: 'The regulation requires 80% for official induction certification. Review the modules or try again.',
    retryQuiz: 'Retry Challenge',
    viewDownloadCert: 'View and Download Certificate',
    pedagogicalReview: 'Pedagogical Review of Answers',
    ruleQuote: 'Standard',
    questionLabel: 'Question',
    categoryLabel: 'Category',
    correctAnswer: 'Correct Answer!',
    wrongAnswer: 'Incorrect Answer',
    selectToAdvance: 'Select an option to proceed',
    finishQuiz: 'Finish Assessment',
    nextQuestion: 'Next Question',

    // OfficialCertificate
    certPending: 'Certificate Pending Approval',
    certPendingTitle: 'You have not completed the Final Assessment yet',
    certPendingDesc: 'To earn your Official Induction Certificate with institutional validity, you must achieve at least 80% correct answers in the Knowledge Challenge.',
    goToQuizBtn: 'Go to Gamified Final Assessment',
    certAccredited: 'Official Accredited Certificate',
    validLectiva: 'Valid for Schooling Stage',
    issuedUnder: 'Issued under the framework of Agreement 0009 of 2024',
    editData: 'Edit Details',
    copyValidation: 'Copy Validation',
    copiedLink: 'Link Copied!',
    saveDrive: 'Save to Google Drive',
    printPdf: 'Print / Download PDF',
    republic: 'Republic of Colombia • Ministry of Labour',
    senaOrg: 'NATIONAL LEARNING SERVICE - SENA',
    directorate: 'Comprehensive Vocational Training Directorate • Apprentice Welfare',
    certApprovalTitle: 'Induction Approval Certificate',
    certMerit: 'Granted in recognition of comprehensive knowledge of the Apprentice Regulation (Agreement 0009 of 2024)',
    certifiesThat: 'Certifies that the apprentice:',
    identifiedWith: 'Identified with',
    completedSat: 'Successfully completed the comprehensive induction program and evaluation for:',
    cohortFicha: 'Cohort Code (Ficha)',
    modalityLabel: 'Modality',
    centerLabel: 'Center',
    approvalExcel: 'Approval with',
    excelScore: 'Excellence',
    scoreXp: 'Score',
    accumulatedXp: 'XP Accumulated',
    subdirectorate: 'Center Subdirectorate',
    trainingCenter: 'SENA Training Center',
    academicCoord: 'Academic Coordination',
    welfareTraining: 'Welfare and Vocational Training',
    digitalVerification: 'Active Digital Verification',
    issuedOn: 'Issued in Colombia',
    mottoSena: 'SENA: More Work, More Nation',

    // Modals & Drawers
    profileTitle: 'SENA Apprentice Profile',
    profileDesc: 'These details will appear on your Official Certificate',
    regionalLabel: 'SENA Regional',
    centerNameLabel: 'Training Center',
    modalityTitle: 'Training Modality',
    saveProfileBtn: 'Save Profile',
    badgesTitle: 'SENA Badges & Achievements',
    badgesUnlocked: 'badges unlocked',
    apprenticeLevel: 'Apprentice Level:',
    guardianLevel: '🌟 Regulation Guardian',
    activeLevel: '🚀 Active Apprentice',
    noviceLevel: '🌱 Novice Apprentice',
    unlockedTag: 'Unlocked',
    lockedTag: 'Locked'
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['es']): string => {
  return translations[lang]?.[key] || translations['es']?.[key] || (key as string);
};

// English datasets for full localization
export const RULE_ARTICLES_EN: RuleArticle[] = [
  {
    id: 'art-der-1',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 1',
    title: 'Right to a Complete and Relevant Induction',
    category: 'derecho',
    summary: 'Receive at the beginning of training an induction guiding you on SENA, the virtual platform, program, and regulations.',
    fullText: 'Receive upon starting the training process the institutional induction program allowing you to know the mission, vision, organic structure, duties, rights and current regulations of SENA.',
    highlightTag: 'Fundamental in Induction',
    practicalTip: 'Make sure to participate in all sessions and validate this interactive course to receive your induction certificate.'
  },
  {
    id: 'art-der-2',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 2',
    title: 'Quality Comprehensive Professional Training',
    category: 'derecho',
    summary: 'Access qualified instruction, suitable environments, and tools aligned with the curriculum design.',
    fullText: 'Enjoy Comprehensive Professional Training consistent with the enrolled training program, guided by competent instructors and using modern learning environments.',
    highlightTag: 'Excellence FPI'
  },
  {
    id: 'art-der-3',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 3',
    title: 'Use of Infrastructure and Technological Tools',
    category: 'derecho',
    summary: 'Use laboratories, workshops, digital libraries, and platforms like SOFIA Plus / Zajuna.',
    fullText: 'Make adequate and timely use of physical, technological resources, libraries, and didactic tools available in the Training Center for competence development.',
    highlightTag: 'Public Resources'
  },
  {
    id: 'art-der-4',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 4',
    title: 'Personal Protective Equipment (PPE)',
    category: 'derecho',
    summary: 'Demand and receive occupational safety guidance and required gear in high-risk workshops.',
    fullText: 'Receive timely guidance on occupational health and safety (SST) and the required use of Personal Protective Equipment (PPE) in specialized workshops.',
    highlightTag: 'SST & Life'
  },
  {
    id: 'art-der-5',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 5',
    title: 'Apprentice Welfare Benefits',
    category: 'derecho',
    summary: 'Health programs, culture, sports, socioeconomic support, food, and monitories.',
    fullText: 'Access welfare programs, projects, and benefits aimed at human, cultural, recreational, psychosocial development and socioeconomic support.',
    highlightTag: 'Integral Welfare'
  },
  {
    id: 'art-der-6',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 6',
    title: 'Guarantee of Due Process and Defense',
    category: 'derecho',
    summary: 'Be heard in statements, provide evidence, and file appeals against any sanction.',
    fullText: 'Be heard previously in statements, provide evidence, challenge those presented against you, and have all constitutional guarantees of due process.',
    highlightTag: 'Legal Guarantee',
    practicalTip: 'No one can be sanctioned without being formally summoned to statements before the Evaluation and Monitoring Committee.'
  },
  {
    id: 'art-der-7',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 7',
    title: 'Incentives and Awards for Excellence',
    category: 'derecho',
    summary: 'Be nominated for paid monitories, honor recognitions, scholarships, and institutional representation.',
    fullText: 'Receive incentives and distinctions for high academic performance, leadership, applied research (SENNAPRENDIZ / SENNOVA) or sports and cultural participation.',
    highlightTag: 'Academic Merit'
  },
  {
    id: 'art-deb-1',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 1',
    title: 'Signing and Compliance of the Commitment Pledge',
    category: 'deber',
    summary: 'Strictly comply with statutes, regulations, and ethical commitments signed upon enrollment.',
    fullText: 'Know and strictly comply with the Apprentice Regulation, institutional policies, and sign the ethical commitment pledge at enrollment.',
    highlightTag: 'Ethical Commitment'
  },
  {
    id: 'art-deb-2',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 2',
    title: 'Visible Badge and Institutional Uniform',
    category: 'deber',
    summary: 'Wear the ID badge visibly at all times in the center and wear the regulatory uniform.',
    fullText: 'Wear the valid institutional ID badge visibly in all SENA facilities and wear the regulatory uniform or technical clothing required for the program.',
    highlightTag: 'Safety & Coexistence'
  },
  {
    id: 'art-deb-3',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 3',
    title: 'Academic Integrity and Honesty (Zero Plagiarism)',
    category: 'deber',
    summary: 'Submit original evidence, cite bibliographical sources, and avoid exam fraud.',
    fullText: 'Act with honesty in all evaluations, projects, and evidence. Refrain from plagiarism, unauthorized copying, or impersonation in physical or virtual environments.',
    highlightTag: 'Intellectual Honesty',
    practicalTip: 'Always cite sources under APA or IEEE standards; plagiarism is classified as a serious or very serious offense.'
  },
  {
    id: 'art-deb-4',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 4',
    title: 'Punctuality and Strict Attendance',
    category: 'deber',
    summary: 'Attend classes punctually and formally justify absences within 3 business days.',
    fullText: 'Attend punctually all scheduled training activities. In case of force majeure or fortuitous event, provide medical or work justifications within no more than three (3) business days.',
    highlightTag: 'Professional Discipline'
  },
  {
    id: 'art-deb-5',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 5',
    title: 'Care and Custody of Assets and Facilities',
    category: 'deber',
    summary: 'Protect physical infrastructure, machinery, software, and SENA endowment.',
    fullText: 'Care carefully for facilities, tools, computer equipment, machinery, and software made available, being responsible for damage caused by intent or negligence.',
    highlightTag: 'Public Assets'
  },
  {
    id: 'art-pro-1',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 1',
    title: 'Psychoactive Substances, Alcohol and Weapons',
    category: 'prohibicion',
    summary: 'Entering under influence, consuming or carrying alcoholic beverages, drugs, or weapons in SENA.',
    fullText: 'Entering or remaining in SENA facilities under the influence of alcoholic, psychotropic, or psychoactive substances, as well as commercializing them or carrying any type of weapon.',
    highlightTag: 'Zero Tolerance'
  },
  {
    id: 'art-pro-2',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 2',
    title: 'Prolonged Unjustified Inactivity (Desertion)',
    category: 'prohibicion',
    summary: 'Failing to attend for more than 3 consecutive days without report or failing to log into platform for over 30 days.',
    fullText: 'Unjustified absence for three (3) consecutive business days in face-to-face mode, or lack of login and interactivity in the virtual platform for thirty (30) calendar days without justified legal cause.',
    highlightTag: 'Desertion Cause'
  },
  {
    id: 'art-pro-3',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 3',
    title: 'Harassment, Cyberbullying and Violence in Learning Environments',
    category: 'prohibicion',
    summary: 'Verbal, psychological, gender, or physical aggressions against apprentices, instructors, or staff.',
    fullText: 'Engage in violence, workplace harassment, discrimination, bullying, or cyberbullying towards any member of the educational community, whether in person or through digital channels.',
    highlightTag: 'Safe Coexistence'
  },
  {
    id: 'art-pro-4',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 4',
    title: 'Political and Religious Proselytism in Facilities',
    category: 'prohibicion',
    summary: 'Using SENA spaces to conduct partisan or dogmatic proselytizing campaigns.',
    fullText: 'Conducting political electoral proselytism or religious proselytism activities that interrupt training dynamics within training centers.',
    highlightTag: 'Institutional Laicity'
  },
  {
    id: 'art-fal-1',
    chapter: 'Chapter V - Disciplinary Regime',
    number: 'Art. 22',
    title: 'Classification of Offenses (Academic and Disciplinary)',
    category: 'falta',
    summary: 'Offenses are divided into academic (performance, evidence) and disciplinary (coexistence, integrity).',
    fullText: 'Offenses are classified into: Academic (failure in learning outcomes) and Disciplinary (conducts affecting healthy coexistence and regulations). They are graded as Minor, Serious, and Very Serious according to impact and intent.',
    highlightTag: 'Sanction Regime'
  },
  {
    id: 'art-med-1',
    chapter: 'Chapter V - Formative Measures',
    number: 'Art. 28',
    title: 'Verbal Pedagogical Warning',
    category: 'medida_formativa',
    summary: 'Immediate pedagogical measure agreed by the instructor. Does not constitute a sanction or go to record.',
    fullText: 'A reflective dialogue between instructor and apprentice regarding conduct contrary to training in a minor degree, aimed at timely correction. Generates no disciplinary background.',
    highlightTag: 'Pedagogical, No Sanction'
  },
  {
    id: 'art-med-2',
    chapter: 'Chapter V - Formative Measures',
    number: 'Art. 29',
    title: 'Academic or Disciplinary Improvement Plan',
    category: 'medida_formativa',
    summary: 'Agreed plan with complementary activities and specific deadline to achieve pending goals.',
    fullText: 'Agreed measure between apprentice and instructor or academic coordinator to overcome deficiencies in achieving competences or conducts. If breached, elevated to disciplinary Committee.',
    highlightTag: 'Improvement Route'
  },
  {
    id: 'art-san-1',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 1',
    title: 'Written Reprimand with Record',
    category: 'sancion',
    summary: 'Formal sanction imposed by Subdirection with record in apprentice life file.',
    fullText: 'Sanction applied by Center Subdirection for repeated minor or serious offenses, via motivated administrative act, with copy to apprentice file.',
    highlightTag: 'Formal Sanction'
  },
  {
    id: 'art-san-2',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 2',
    title: 'Conditional Enrollment',
    category: 'sancion',
    summary: 'Loss of incentives and subjection to strict evaluation during the rest of the term.',
    fullText: 'Apprentice remains under rigorous observation. Loses welfare benefits and any new offense implies final cancellation.',
    highlightTag: 'Critical Alert'
  },
  {
    id: 'art-san-3',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 3',
    title: 'Enrollment Cancellation & Institutional Disqualification',
    category: 'sancion',
    summary: 'Maximum sanction unlinking apprentice and imposing 6 months to 3 years ban to re-enter SENA.',
    fullText: 'Loss of SENA apprentice condition for very serious offenses or repeated defiance. Carries temporary disqualification to enroll in SENA programs for 6 months to 3 years.',
    highlightTag: 'Maximum Sanction'
  }
];

export const INDUCTION_PLAN_STEPS_EN = [
  {
    phase: 'Phase 1: Welcome & Institutional Immersion',
    duration: 'Day 1 (4 Hours)',
    objective: 'Recognize SENA identity, history, patriotic symbols, and the Comprehensive Professional Training pedagogical model.',
    activities: [
      'Presentation of Center authorities and Apprentice Welfare team.',
      'Interactive workshop: Mission, Vision, Shield, Flag, and institutional motto.',
      'Opening of Ethical Commitment Pledge and digital signature.',
      'Activation of institutional accounts (Soy SENA email, Zajuna / LMS, Sofia Plus).'
    ],
    deliverable: 'Configured profile and digitally signed commitment pledge.'
  },
  {
    phase: 'Phase 2: Coexistence & Guarantees (Agreement 0009 of 2024)',
    duration: 'Day 2 (4 Hours)',
    objective: 'Appropriate Rights, Duties, and Prohibitions of the new SENA Apprentice Regulation.',
    activities: [
      'Interactive socialization of Chapter II: Rights and Welfare Benefits.',
      'Workshop on Duties and Prohibitions: Zero tolerance for plagiarism and cyberbullying.',
      'Exploration of Occupational Health and Safety (SST) and use of PPE.',
      'Election of cohort spokespersons and leaders.'
    ],
    deliverable: 'Approval of interactive modules on Rights and Duties.'
  },
  {
    phase: 'Phase 3: Ethical Dilemmas & Committee Cases',
    duration: 'Day 3 (4 Hours)',
    objective: 'Develop ethical judgment and conflict resolution through analysis of real cases.',
    activities: [
      'Case simulator: Academic integrity, absences, and workshop risks.',
      'Practical differentiation between Formative Measures (improvement plans) and Sanctions.',
      'Experiential workshop: Due process and the Evaluation and Monitoring Committee role.',
      'Presentation of the 5 alternatives for Productive Stage.'
    ],
    deliverable: 'Successful resolution of the 5 simulator cases (100% completion).'
  },
  {
    phase: 'Phase 4: Gamified Evaluation & Official Certification',
    duration: 'Day 4 (2 Hours)',
    objective: 'Evaluate acquired normative and civic competencies with a minimum approval threshold of 80%.',
    activities: [
      'Presentation of Knowledge Challenge (Gamified evaluation with immediate feedback).',
      'Reflective review of answers and articles from Agreement 0009 of 2024.',
      'Issuance and download of Official Induction Approval Certificate with QR verification code.',
      'Institutional celebration and integration of the formative community.'
    ],
    deliverable: 'Issued and verified SENA Induction Approval Certificate.'
  }
];

export const CASE_SCENARIOS_EN: CaseScenario[] = [
  {
    id: 'caso-1',
    title: 'The Code Downloaded from GitHub without Attribution',
    category: 'Integridad Académica',
    difficulty: 'Intermedio',
    character: 'Camilo Torres',
    characterRole: 'Lectiva stage ADSO apprentice',
    description: 'Camilo has to deliver an integrative project tomorrow evaluating Node.js and database backend development. Due to lack of time at work, he downloaded a full GitHub repo, changed the author names in comments and submitted it as his own to Zajuna. The instructor detected the match via antiplagiarism.',
    dilemma: 'What type of offense did Camilo commit under Agreement 0009 of 2024 and what is the instructor’s appropriate response?',
    choices: [
      {
        id: 'c1-opt1',
        text: 'It is a simple formative slip; instructor should congratulate him for researching on GitHub and tell him to change frontend colors.',
        isCorrect: false,
        feedback: 'Incorrect. Taking third-party code without citation is fraud and plagiarism, violating intellectual honesty.',
        legalBasis: 'Chapter III, Art. 9 Duties - Honesty in academic evidence.',
        points: 0
      },
      {
        id: 'c1-opt2',
        text: 'It is a serious academic and disciplinary offense. The instructor must not approve the learning outcome, hold a formative dialogue, report the offense and initiate due process before the Evaluation Committee.',
        isCorrect: true,
        feedback: 'Excellent decision! Deliberate plagiarism attacks institutional integrity. Due process must be guaranteed and forwarded to the Committee.',
        legalBasis: 'Chapter V, Art. 22 & 24 - Serious offenses against academic integrity.',
        points: 100
      },
      {
        id: 'c1-opt3',
        text: 'The instructor can immediately expel Camilo from SENA verbally without committee or procedures.',
        isCorrect: false,
        feedback: 'Incorrect. No instructor has the power to unilaterally expel apprentices. All sanctions require due process.',
        legalBasis: 'Chapter II, Art. 7 Num. 6 - Due process guarantee.',
        points: 10
      }
    ],
    keyTakeaway: 'Always reference libraries and code sources. Plagiarism in formative evidence entails disciplinary investigation and can cause enrollment cancellation.'
  },
  {
    id: 'caso-2',
    title: 'Family Emergency and 4-Day Absence',
    category: 'Inasistencias y Deserción',
    difficulty: 'Básico',
    character: 'Mariana Duarte',
    characterRole: 'Administrative Management apprentice',
    description: 'Mariana had a serious medical emergency with her mother in a rural area and could not attend or connect to the training center for 4 consecutive business days. There is no reliable cell signal in the countryside where she was caring for her.',
    dilemma: 'How should Mariana act to avoid being declared in training desertion?',
    choices: [
      {
        id: 'c2-opt1',
        text: 'She shouldn\'t worry; SENA never drops apprentices and she can return a month later without telling anyone.',
        isCorrect: false,
        feedback: 'False. Three (3) consecutive days of unjustified absence trigger the automatic desertion alert.',
        legalBasis: 'Chapter III, Art. 10 & Chapter V - Causes for Desertion.',
        points: 0
      },
      {
        id: 'c2-opt2',
        text: 'Submit medical evidence and an explanatory letter to the coordinator and instructors within 3 business days of returning to justify the absence due to force majeure.',
        isCorrect: true,
        feedback: 'Correct! The regulation grants 3 business days to submit duly supported force majeure justifications.',
        legalBasis: 'Chapter III, Art. 9 Num. 4 - Duty to justify absences on time.',
        points: 100
      },
      {
        id: 'c2-opt3',
        text: 'Ask a classmate to sign the attendance sheet for her so the instructor does not notice.',
        isCorrect: false,
        feedback: 'Dangerous! Forging a classmate\'s signature is a very serious offense of document forgery.',
        legalBasis: 'Chapter III, Art. 10 - Prohibition of fraud or alteration of institutional records.',
        points: 0
      }
    ],
    keyTakeaway: 'In emergencies or hardships, immediately contact your spokesperson or instructor and submit documentation within 3 business days.'
  },
  {
    id: 'caso-3',
    title: 'Machinery Workshop without Safety Boots or Goggles',
    category: 'Seguridad en Talleres',
    difficulty: 'Básico',
    character: 'Andrés Felipe',
    characterRole: 'Mechatronics Maintenance apprentice',
    description: 'Andrés forgot his steel-toe boots and safety goggles. He wants to enter the machine-tool workshop saying: "I am only going to sit on a chair and take notes, I won’t operate any lathe or milling machine."',
    dilemma: 'What is the applicable occupational safety rule and training duty?',
    choices: [
      {
        id: 'c3-opt1',
        text: 'The instructor must prohibit entry into the technical environment due to occupational safety risk. Andrés has the duty to wear full PPE in industrial danger areas.',
        isCorrect: true,
        feedback: 'Very good! Active machinery workshops mandate full PPE for anyone entering, no exceptions.',
        legalBasis: 'Chapter II & III - Occupational Health and Safety (SST) and use of PPE.',
        points: 100
      },
      {
        id: 'c3-opt2',
        text: 'Allow him to enter if he promises not to leave the chair or touch machines.',
        isCorrect: false,
        feedback: 'Risky and illegal. Metal shavings or pressurized fluids can fly in a machine shop; risk exists across the perimeter.',
        legalBasis: 'Occupational Safety Protocols SENA.',
        points: 10
      },
      {
        id: 'c3-opt3',
        text: 'Immediately impose a sanction of permanent enrollment cancellation.',
        isCorrect: false,
        feedback: 'Disproportionate. First apply the verbal pedagogical warning and instruct on self-care culture.',
        legalBasis: 'Chapter V - Proportionality criteria and formative measures.',
        points: 20
      }
    ],
    keyTakeaway: 'Life and physical integrity are non-negotiable. PPE is both an apprentice right and an unalienable duty.'
  },
  {
    id: 'caso-4',
    title: 'Conflict and Offensive Messages in Cohort WhatsApp Group',
    category: 'Convivencia y Respeto',
    difficulty: 'Intermedio',
    character: 'Laura and Julián',
    characterRole: 'Apprentices of the same cohort',
    description: 'In the WhatsApp group created by the spokesperson to coordinate evidence, Julián began sending derogatory messages, degrading memes and taunts about Laura’s sexual orientation and cognitive abilities.',
    dilemma: 'Does the SENA Apprentice Regulation apply even if the offense occurs in a digital group and outside in-person class hours?',
    choices: [
      {
        id: 'c4-opt1',
        text: 'Does not apply, because WhatsApp is a private network and SENA only has jurisdiction within classroom walls.',
        isCorrect: false,
        feedback: 'Incorrect. Agreement 0009 of 2024 explicitly addresses coexistence in virtual environments, networks, and platforms.',
        legalBasis: 'Chapter III, Art. 10 - Prohibition of cyberbullying and digital violence.',
        points: 10
      },
      {
        id: 'c4-opt2',
        text: 'Yes, it fully applies. Respect for dignity and prohibition of cyberbullying covers any digital channel related to training. It constitutes a serious disciplinary offense.',
        isCorrect: true,
        feedback: 'Exactly! SENA fosters environments free of discrimination and violence, including digital interaction channels.',
        legalBasis: 'Chapter III, Art. 10 Num. 3 - Conducts of discrimination, aggression, and digital bullying.',
        points: 100
      },
      {
        id: 'c4-opt3',
        text: 'Only Laura should leave the group and others should ignore Julián to avoid trouble.',
        isCorrect: false,
        feedback: 'Incorrect. Do not revictimize the affected person; the center provides Apprentice Welfare and the Committee.',
        legalBasis: 'Coexistence and Welfare Care Pathway SENA.',
        points: 0
      }
    ],
    keyTakeaway: 'Respect and non-discrimination are fundamental in person and across any community digital medium.'
  },
  {
    id: 'caso-5',
    title: 'Completion of Lectiva Stage and Apprenticeship Contract',
    category: 'Etapa Productiva',
    difficulty: 'Avanzado',
    character: 'Esteban Muñoz',
    characterRole: 'Apprentice about to finish Lectiva Stage',
    description: 'Esteban completed all his lectiva competencies at the center, but is unaware of options for his Productive Stage and believes the only valid route is landing an Apprenticeship Contract paid by a multinational.',
    dilemma: 'What are the official alternatives recognized by SENA to complete the Productive Stage?',
    choices: [
      {
        id: 'c5-opt1',
        text: 'Only the apprenticeship contract with companies paying full salary exists.',
        isCorrect: false,
        feedback: 'Incorrect. Multiple alternatives exist to certify the productive stage according to apprentice preferences.',
        legalBasis: 'Chapter IV - Productive stage alternatives.',
        points: 10
      },
      {
        id: 'c5-opt2',
        text: 'Multiple valid alternatives exist: Apprenticeship Contract, Productive Project (Fondo Emprender), Community or Business Internship, Monitory at SENA, and Formal Employment Contract.',
        isCorrect: true,
        feedback: 'Perfect! All these options allow applying technical knowledge in real scenarios with instructor monitoring.',
        legalBasis: 'Chapter IV, Art. 14 - Recognized modalities for Productive Stage.',
        points: 100
      },
      {
        id: 'c5-opt3',
        text: 'He can fabricate a fake certificate from his uncle\'s shop so he doesn\'t have to work 6 months.',
        isCorrect: false,
        feedback: 'Total fraud. SENA audits and follows up. Falsifying documents causes enrollment cancellation and criminal investigation.',
        legalBasis: 'Chapter V - Forgery in formative documents.',
        points: 0
      }
    ],
    keyTakeaway: 'Learn with your coordinator about the different productive stage modalities from the start of induction.'
  }
];

export const QUIZ_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Identidad SENA',
    question: 'What is the most recent administrative act governing the SENA Apprentice Regulation?',
    options: [
      'Agreement 007 of 2012',
      'Agreement 0009 of 2024',
      'Decree 1072 of 2015',
      'Law 119 of 1994'
    ],
    correctAnswerIndex: 1,
    explanation: 'Agreement 0009 of 2024 adopted the new comprehensive SENA apprentice regulation, updating and repealing previous agreements.',
    articleCitation: 'Preamble and Final Art. of Agreement 0009 of 2024',
    xpValue: 50
  },
  {
    id: 'q2',
    category: 'Derechos',
    question: 'What guarantee does an apprentice have when summoned to answer for an alleged disciplinary offense?',
    options: [
      'Must accept the sanction immediately without speaking',
      'Guarantee of due process, being heard in statements, submitting evidence, and having the right to defense',
      'Can only defend if hiring an external lawyer',
      'Sanction is applied automatically within 24 hours'
    ],
    correctAnswerIndex: 1,
    explanation: 'Due process is a constitutional guarantee and fundamental right of the SENA apprentice (Chapter II), guaranteeing statements and appeals.',
    articleCitation: 'Chapter II, Art. 7 Num. 6 - Due Process Guarantee',
    xpValue: 50
  },
  {
    id: 'q3',
    category: 'Deberes',
    question: 'If an apprentice has a domestic emergency preventing attendance for 2 days, what is the maximum deadline to submit justification?',
    options: [
      'Until the end of the term',
      'Three (3) business days following return',
      'Fifteen (15) calendar days',
      'Not necessary if a classmate informs the instructor'
    ],
    correctAnswerIndex: 1,
    explanation: 'The apprentice must submit valid justifications within 3 business days following return to avoid it counting as unjustified absence.',
    articleCitation: 'Chapter III, Art. 9 Num. 4 - Attendance and Justifications',
    xpValue: 50
  },
  {
    id: 'q4',
    category: 'Prohibiciones',
    question: 'How many consecutive business days of unjustified in-person absence constitute legal grounds for desertion in SENA?',
    options: [
      'One (1) single day',
      'Three (3) consecutive business days',
      'Ten (10) consecutive days',
      'Thirty (30) calendar days'
    ],
    correctAnswerIndex: 1,
    explanation: 'Unjustified absence for three (3) consecutive business days in face-to-face mode is formal grounds for desertion.',
    articleCitation: 'Chapter III, Art. 10 & Chapter V - Causes for Desertion',
    xpValue: 50
  },
  {
    id: 'q5',
    category: 'Medidas y Sanciones',
    question: 'What is the substantial difference between a Formative Measure and a Sanctionary Measure?',
    options: [
      'There is no difference, both are severe punishments',
      'The Formative Measure is pedagogical and preventive (does not stain record), while the Sanctionary Measure is imposed after due process and goes to the institutional file',
      'The Formative Measure always includes a cash fine',
      'Formative Measures are only applied by National Police'
    ],
    correctAnswerIndex: 1,
    explanation: 'Formative measures (verbal warning, improvement plans) aim to guide and recover competencies without punitive record annotation.',
    articleCitation: 'Chapter V, Art. 28 & 31 - Guiding Principles of Sanctionary Regime',
    xpValue: 50
  },
  {
    id: 'q6',
    category: 'Identidad SENA',
    question: 'What do the elements of the SENA shield represent (gear, caduceus, and coffee/grain)?',
    options: [
      'The three geographic regions of Colombia',
      'The three sectors of the national economy: Industry & Construction, Commerce & Services, and Agricultural Sector',
      'Gold, coal, and oil',
      'The three branches of public power'
    ],
    correctAnswerIndex: 1,
    explanation: 'The SENA shield summarizes the productive sectors moving Colombia: gear (industry), caduceus (commerce), and coffee (agriculture).',
    articleCitation: 'SENA Institutional Symbols',
    xpValue: 50
  },
  {
    id: 'q7',
    category: 'Derechos',
    question: 'Which of the following is a benefit of the Apprentice Welfare program?',
    options: [
      'Exemption from submitting evidence and homework',
      'Support allowances, monitories, sports activities, health, arts, and culture',
      'Ability to choose instructors at will',
      'Access to unlimited vacations'
    ],
    correctAnswerIndex: 1,
    explanation: 'Apprentice Welfare provides psychosocial support, sports activities, socioeconomic aid, and monitory opportunities.',
    articleCitation: 'Chapter II, Art. 7 Num. 5 - Apprentice Welfare',
    xpValue: 50
  },
  {
    id: 'q8',
    category: 'Prohibiciones',
    question: 'What consequence does definitive enrollment cancellation carry for very serious offenses?',
    options: [
      'Only a reminder email',
      'Loss of apprentice status and a ban on re-enrolling in SENA for 6 months to 3 years depending on gravity',
      'Paying a bank bond',
      'No future consequences'
    ],
    correctAnswerIndex: 1,
    explanation: 'Enrollment cancellation is the maximum sanction and temporarily disqualifies the sanctioned person from SENA programs for 6 months to 3 years.',
    articleCitation: 'Chapter V, Art. 31 Num. 3 - Enrollment Cancellation',
    xpValue: 50
  }
];

export const INITIAL_BADGES_EN: Badge[] = [
  {
    id: 'badge-identidad',
    title: 'SENA Pioneer',
    description: 'Explored values, symbols, and Comprehensive Professional Training (FPI).',
    icon: 'Compass',
    category: 'progreso',
    isUnlocked: true,
    unlockedAt: 'Upon starting'
  },
  {
    id: 'badge-derechos',
    title: 'Rights Defender',
    description: 'Thoroughly understands apprentice rights, welfare, and due process.',
    icon: 'ShieldCheck',
    category: 'conocimiento',
    isUnlocked: false
  },
  {
    id: 'badge-deberes',
    title: 'Honor Commitment',
    description: 'Appropriated duties, academic honesty, and proper use of infrastructure.',
    icon: 'Award',
    category: 'conocimiento',
    isUnlocked: false
  },
  {
    id: 'badge-casos',
    title: 'Ethics Advisor',
    description: 'Successfully resolved practical cases of the Coexistence Committee.',
    icon: 'Scale',
    category: 'simulador',
    isUnlocked: false
  },
  {
    id: 'badge-certificado',
    title: 'Induction Graduate',
    description: 'Successfully passed the final evaluation of the Apprentice Regulation 2024.',
    icon: 'GraduationCap',
    category: 'excelencia',
    isUnlocked: false
  }
];

export const getRuleArticles = (lang: Language): RuleArticle[] => {
  return lang === 'en' ? RULE_ARTICLES_EN : RULE_ARTICLES;
};

export const getInductionPlan = (lang: Language) => {
  return lang === 'en' ? INDUCTION_PLAN_STEPS_EN : INDUCTION_PLAN_STEPS;
};

export const getCaseScenarios = (lang: Language): CaseScenario[] => {
  return lang === 'en' ? CASE_SCENARIOS_EN : CASE_SCENARIOS;
};

export const getQuizQuestions = (lang: Language): QuizQuestion[] => {
  return lang === 'en' ? QUIZ_QUESTIONS_EN : QUIZ_QUESTIONS;
};

export const getBadges = (lang: Language): Badge[] => {
  return lang === 'en' ? INITIAL_BADGES_EN : INITIAL_BADGES;
};
