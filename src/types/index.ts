export type UserRole = 'instructor' | 'aprendiz';

export interface InstructorConfig {
  defaultFicha: string;
  defaultProgram: string;
  regional: string;
  centerName: string;
  autoSyncEnabled: boolean;
}

export interface LearnerProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP' | 'PPT';
  documentNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  centerName: string;
  modality: 'Presencial' | 'Virtual' | 'Distancia' | 'Mixta';
}

export interface RuleArticle {
  id: string;
  chapter: string;
  number: string;
  title: string;
  category: 'derecho' | 'deber' | 'prohibicion' | 'falta' | 'medida_formativa' | 'sancion' | 'general';
  summary: string;
  fullText: string;
  highlightTag?: string;
  practicalTip?: string;
}

export interface CaseChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  legalBasis: string;
  points: number;
}

export interface CaseScenario {
  id: string;
  title: string;
  category: 'Integridad Académica' | 'Convivencia y Respeto' | 'Seguridad en Talleres' | 'Etapa Productiva' | 'Inasistencias y Deserción';
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  character: string;
  characterRole: string;
  description: string;
  dilemma: string;
  choices: CaseChoice[];
  keyTakeaway: string;
}

export interface QuizQuestion {
  id: string;
  category: 'Identidad SENA' | 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Medidas y Sanciones';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  articleCitation: string;
  xpValue: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progreso' | 'conocimiento' | 'simulador' | 'excelencia';
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  estimatedMinutes: number;
  completed: boolean;
  score?: number;
}
