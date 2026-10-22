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
    driveStatus: 'Estado Google Drive'
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
    driveStatus: 'Google Drive Status'
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['es']): string => {
  return translations[lang][key] || translations['es'][key] || key;
};

// English datasets for full localization
export const RULE_ARTICLES_EN = [
  {
    id: 'art-der-1',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 1',
    title: 'Right to a Complete and Relevant Induction',
    category: 'derecho' as const,
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
    category: 'derecho' as const,
    summary: 'Access qualified instruction, suitable environments, and tools aligned with the curriculum design.',
    fullText: 'Enjoy Comprehensive Professional Training consistent with the enrolled training program, guided by competent instructors and using modern learning environments.',
    highlightTag: 'Excellence FPI'
  },
  {
    id: 'art-der-3',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 3',
    title: 'Use of Infrastructure and Technological Tools',
    category: 'derecho' as const,
    summary: 'Use laboratories, workshops, digital libraries, and platforms like SOFIA Plus / Zajuna.',
    fullText: 'Make adequate and timely use of physical, technological resources, libraries, and didactic tools available in the Training Center for competence development.',
    highlightTag: 'Public Resources'
  },
  {
    id: 'art-der-4',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 4',
    title: 'Personal Protective Equipment (PPE)',
    category: 'derecho' as const,
    summary: 'Demand and receive occupational safety guidance and required gear in high-risk workshops.',
    fullText: 'Receive timely guidance on occupational health and safety (SST) and the required use of Personal Protective Equipment (PPE) in specialized workshops.',
    highlightTag: 'SST & Life'
  },
  {
    id: 'art-der-5',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 5',
    title: 'Apprentice Welfare Benefits',
    category: 'derecho' as const,
    summary: 'Health programs, culture, sports, socioeconomic support, food, and monitories.',
    fullText: 'Access welfare programs, projects, and benefits aimed at human, cultural, recreational, psychosocial development and socioeconomic support.',
    highlightTag: 'Integral Welfare'
  },
  {
    id: 'art-der-6',
    chapter: 'Chapter II - Apprentice Rights',
    number: 'Art. 7 Num. 6',
    title: 'Guarantee of Due Process and Defense',
    category: 'derecho' as const,
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
    category: 'derecho' as const,
    summary: 'Be nominated for paid monitories, honor recognitions, scholarships, and institutional representation.',
    fullText: 'Receive incentives and distinctions for high academic performance, leadership, applied research (SENNAPRENDIZ / SENNOVA) or sports and cultural participation.',
    highlightTag: 'Academic Merit'
  },
  {
    id: 'art-deb-1',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 1',
    title: 'Signing and Compliance of the Commitment Pledge',
    category: 'deber' as const,
    summary: 'Strictly comply with statutes, regulations, and ethical commitments signed upon enrollment.',
    fullText: 'Know and strictly comply with the Apprentice Regulation, institutional policies, and sign the ethical commitment pledge at enrollment.',
    highlightTag: 'Ethical Commitment'
  },
  {
    id: 'art-deb-2',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 2',
    title: 'Visible Badge and Institutional Uniform',
    category: 'deber' as const,
    summary: 'Wear the ID badge visibly at all times in the center and wear the regulatory uniform.',
    fullText: 'Wear the valid institutional ID badge visibly in all SENA facilities and wear the regulatory uniform or technical clothing required for the program.',
    highlightTag: 'Safety & Coexistence'
  },
  {
    id: 'art-deb-3',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 3',
    title: 'Academic Integrity and Honesty (Zero Plagiarism)',
    category: 'deber' as const,
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
    category: 'deber' as const,
    summary: 'Attend classes punctually and formally justify absences within 3 business days.',
    fullText: 'Attend punctually all scheduled training activities. In case of force majeure or fortuitous event, provide medical or work justifications within no more than three (3) business days.',
    highlightTag: 'Professional Discipline'
  },
  {
    id: 'art-deb-5',
    chapter: 'Chapter III - Apprentice Duties',
    number: 'Art. 9 Num. 5',
    title: 'Care and Custody of Assets and Facilities',
    category: 'deber' as const,
    summary: 'Protect physical infrastructure, machinery, software, and SENA endowment.',
    fullText: 'Care carefully for facilities, tools, computer equipment, machinery, and software made available, being responsible for damage caused by intent or negligence.',
    highlightTag: 'Public Assets'
  },
  {
    id: 'art-pro-1',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 1',
    title: 'Psychoactive Substances, Alcohol and Weapons',
    category: 'prohibicion' as const,
    summary: 'Entering under influence, consuming or carrying alcoholic beverages, drugs, or weapons in SENA.',
    fullText: 'Entering or remaining in SENA facilities under the influence of alcoholic, psychotropic, or psychoactive substances, as well as commercializing them or carrying any type of weapon.',
    highlightTag: 'Zero Tolerance'
  },
  {
    id: 'art-pro-2',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 2',
    title: 'Prolonged Unjustified Inactivity (Desertion)',
    category: 'prohibicion' as const,
    summary: 'Failing to attend for more than 3 consecutive days without report or failing to log into platform for over 30 days.',
    fullText: 'Unjustified absence for three (3) consecutive business days in face-to-face mode, or lack of login and interactivity in the virtual platform for thirty (30) calendar days without justified legal cause.',
    highlightTag: 'Desertion Cause'
  },
  {
    id: 'art-pro-3',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 3',
    title: 'Harassment, Cyberbullying and Violence in Learning Environments',
    category: 'prohibicion' as const,
    summary: 'Verbal, psychological, gender, or physical aggressions against apprentices, instructors, or staff.',
    fullText: 'Engage in violence, workplace harassment, discrimination, bullying, or cyberbullying towards any member of the educational community, whether in person or through digital channels.',
    highlightTag: 'Safe Coexistence'
  },
  {
    id: 'art-pro-4',
    chapter: 'Chapter III - Prohibitions',
    number: 'Art. 10 Num. 4',
    title: 'Political and Religious Proselytism in Facilities',
    category: 'prohibicion' as const,
    summary: 'Using SENA spaces to conduct partisan or dogmatic proselytizing campaigns.',
    fullText: 'Conducting political electoral proselytism or religious proselytism activities that interrupt training dynamics within training centers.',
    highlightTag: 'Institutional Laicity'
  },
  {
    id: 'art-fal-1',
    chapter: 'Chapter V - Disciplinary Regime',
    number: 'Art. 22',
    title: 'Classification of Offenses (Academic and Disciplinary)',
    category: 'falta' as const,
    summary: 'Offenses are divided into academic (performance, evidence) and disciplinary (coexistence, integrity).',
    fullText: 'Offenses are classified into: Academic (failure in learning outcomes) and Disciplinary (conducts affecting healthy coexistence and regulations). They are graded as Minor, Serious, and Very Serious according to impact and intent.',
    highlightTag: 'Sanction Regime'
  },
  {
    id: 'art-med-1',
    chapter: 'Chapter V - Formative Measures',
    number: 'Art. 28',
    title: 'Verbal Pedagogical Warning',
    category: 'medida_formativa' as const,
    summary: 'Immediate pedagogical measure agreed by the instructor. Does not constitute a sanction or go to record.',
    fullText: 'A reflective dialogue between instructor and apprentice regarding conduct contrary to training in a minor degree, aimed at timely correction. Generates no disciplinary background.',
    highlightTag: 'Pedagogical, No Sanction'
  },
  {
    id: 'art-med-2',
    chapter: 'Chapter V - Formative Measures',
    number: 'Art. 29',
    title: 'Academic or Disciplinary Improvement Plan',
    category: 'medida_formativa' as const,
    summary: 'Agreed plan with complementary activities and specific deadline to achieve pending goals.',
    fullText: 'Agreed measure between apprentice and instructor or academic coordinator to overcome deficiencies in achieving competences or conducts. If breached, elevated to disciplinary Committee.',
    highlightTag: 'Improvement Route'
  },
  {
    id: 'art-san-1',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 1',
    title: 'Written Reprimand with Record',
    category: 'sancion' as const,
    summary: 'Formal sanction imposed by Subdirection with record in apprentice life file.',
    fullText: 'Sanction applied by Center Subdirection for repeated minor or serious offenses, via motivated administrative act, with copy to apprentice file.',
    highlightTag: 'Formal Sanction'
  },
  {
    id: 'art-san-2',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 2',
    title: 'Conditional Enrollment',
    category: 'sancion' as const,
    summary: 'Loss of incentives and subjection to strict evaluation during the rest of the term.',
    fullText: 'Apprentice remains under rigorous observation. Loses welfare benefits and any new offense implies final cancellation.',
    highlightTag: 'Critical Alert'
  },
  {
    id: 'art-san-3',
    chapter: 'Chapter V - Sanctionary Measures',
    number: 'Art. 31 Num. 3',
    title: 'Enrollment Cancellation & Institutional Disqualification',
    category: 'sancion' as const,
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
