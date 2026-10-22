import React from 'react';
import {
  CheckCircle2,
  BookOpen,
  Sparkles,
  ChevronRight,
  Trophy,
  ShieldCheck,
  Scale,
  Compass,
  ArrowRight
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { Language } from '../utils/i18n';

export interface ModuleStepInfo {
  id: 'mod-1' | 'mod-2' | 'mod-3' | 'mod-4';
  tabId: 'identidad' | 'derechos' | 'deberes' | 'regimen';
  number: number;
  title: string;
  shortTitle: string;
  chapterRef: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const REGULATION_MODULES_ES: ModuleStepInfo[] = [
  {
    id: 'mod-1',
    tabId: 'identidad',
    number: 1,
    title: 'Identidad SENA y Formación Profesional Integral',
    shortTitle: '1. Identidad y FPI',
    chapterRef: 'Capítulo I & Principios',
    icon: Compass
  },
  {
    id: 'mod-2',
    tabId: 'derechos',
    number: 2,
    title: 'Carta de Derechos del Aprendiz',
    shortTitle: '2. Derechos',
    chapterRef: 'Capítulo II (Garantías)',
    icon: ShieldCheck
  },
  {
    id: 'mod-3',
    tabId: 'deberes',
    number: 3,
    title: 'Deberes y Prohibiciones Expresas',
    shortTitle: '3. Deberes y Prohibiciones',
    chapterRef: 'Capítulos III y IV',
    icon: CheckCircle2
  },
  {
    id: 'mod-4',
    tabId: 'regimen',
    number: 4,
    title: 'Régimen Disciplinario y Debido Proceso',
    shortTitle: '4. Régimen Disciplinario',
    chapterRef: 'Capítulos V y VI (Medidas)',
    icon: Scale
  }
];

export const REGULATION_MODULES_EN: ModuleStepInfo[] = [
  {
    id: 'mod-1',
    tabId: 'identidad',
    number: 1,
    title: 'SENA Identity and Comprehensive Professional Training',
    shortTitle: '1. Identity & FPI',
    chapterRef: 'Chapter I & Principles',
    icon: Compass
  },
  {
    id: 'mod-2',
    tabId: 'derechos',
    number: 2,
    title: 'Apprentice Bill of Rights',
    shortTitle: '2. Rights',
    chapterRef: 'Chapter II (Guarantees)',
    icon: ShieldCheck
  },
  {
    id: 'mod-3',
    tabId: 'deberes',
    number: 3,
    title: 'Express Duties and Prohibitions',
    shortTitle: '3. Duties & Prohibitions',
    chapterRef: 'Chapters III & IV',
    icon: CheckCircle2
  },
  {
    id: 'mod-4',
    tabId: 'regimen',
    number: 4,
    title: 'Disciplinary Regime and Due Process',
    shortTitle: '4. Disciplinary Regime',
    chapterRef: 'Chapters V & VI (Measures)',
    icon: Scale
  }
];

interface Props {
  completedModules: string[];
  onNavigateToModule: (tabId: 'identidad' | 'derechos' | 'deberes' | 'regimen') => void;
  onGoToCases?: () => void;
  onGoToQuiz?: () => void;
  currentTab?: string;
  activeModuleTab?: string;
  language?: Language;
}

export const GlobalProgressBar: React.FC<Props> = ({
  completedModules,
  onNavigateToModule,
  onGoToCases,
  onGoToQuiz,
  currentTab = 'modulos',
  activeModuleTab = 'identidad',
  language = 'es'
}) => {
  const modulesList = language === 'en' ? REGULATION_MODULES_EN : REGULATION_MODULES_ES;
  const totalModules = modulesList.length;
  const completedCount = completedModules.filter((id) =>
    modulesList.some((m) => m.id === id)
  ).length;

  const progressPercent = Math.round((completedCount / totalModules) * 100);
  const isAllComplete = progressPercent === 100;

  const handleStepClick = (tabId: 'identidad' | 'derechos' | 'deberes' | 'regimen') => {
    playSound('click');
    onNavigateToModule(tabId);
  };

  return (
    <section
      aria-label={language === 'en' ? 'Apprentice Regulation global progress' : 'Progreso global de módulos del Reglamento del Aprendiz'}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 transition-all no-print"
    >
      {/* Top Header of Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-200 dark:border-emerald-800/60">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-[#00324D] dark:text-white tracking-tight">
                {language === 'en' ? 'Global Apprentice Regulation Progress' : 'Progreso Global del Reglamento del Aprendiz'}
              </h3>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                {language === 'en' ? 'Agreement 0009 of 2024' : 'Acuerdo 0009 de 2024'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? `${completedCount} of ${totalModules} modules completed (${progressPercent}%)`
                : `${completedCount} de ${totalModules} módulos completados (${progressPercent}%)`}
            </p>
          </div>
        </div>

        {/* Status Percentage Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-baseline gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {language === 'en' ? 'Progress:' : 'Avance:'}
            </span>
            <span className={`text-base font-black ${
              isAllComplete
                ? 'text-[#39A900] dark:text-emerald-400'
                : 'text-[#00324D] dark:text-emerald-300'
            }`}>
              {progressPercent}%
            </span>
          </div>

          {isAllComplete && (
            <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 animate-in fade-in">
              <Trophy className="w-3.5 h-3.5 text-[#39A900]" />
              {language === 'en' ? '100% Completed!' : '¡100% Normativo!'}
            </span>
          )}
        </div>
      </div>

      {/* Main Visual Progress Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/80 dark:border-slate-700/80">
          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${progressPercent}%` }}
            className={`h-full rounded-full transition-all duration-500 ease-out relative ${
              isAllComplete
                ? 'bg-gradient-to-r from-emerald-500 via-[#39A900] to-teal-400 shadow-[0_0_12px_rgba(57,169,0,0.5)]'
                : 'bg-gradient-to-r from-[#00324D] via-[#005a8a] to-[#39A900]'
            }`}
          >
            {/* Subtle light shimmer animation */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Scale labels under the bar */}
        <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 px-0.5">
          <span>{language === 'en' ? '0% Start' : '0% Inicio'}</span>
          <span>{language === 'en' ? '25% Mod 1' : '25% Mod 1'}</span>
          <span>{language === 'en' ? '50% Mod 2' : '50% Mod 2'}</span>
          <span>{language === 'en' ? '75% Mod 3' : '75% Mod 3'}</span>
          <span className={isAllComplete ? 'text-[#39A900] font-bold' : ''}>
            {language === 'en' ? '100% Complete' : '100% Completado'}
          </span>
        </div>
      </div>

      {/* Interactive Module Step Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {modulesList.map((mod) => {
          const isDone = completedModules.includes(mod.id);
          const isCurrentInViewer = currentTab === 'modulos' && activeModuleTab === mod.tabId;
          const Icon = mod.icon;

          return (
            <button
              key={mod.id}
              onClick={() => handleStepClick(mod.tabId)}
              title={language === 'en' ? `Click to view module: ${mod.title}` : `Clic para ir al módulo: ${mod.title}`}
              className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all group cursor-pointer ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50'
                  : isCurrentInViewer
                  ? 'bg-[#00324D] dark:bg-emerald-800 text-white border-[#00324D] dark:border-emerald-700 shadow-xs ring-2 ring-[#39A900]/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 hover:border-slate-300'
              }`}
            >
              {/* Step indicator circle */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ${
                isDone
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : isCurrentInViewer
                  ? 'bg-white text-[#00324D] font-extrabold'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : mod.number}
              </div>

              {/* Step text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs font-bold truncate ${
                    isCurrentInViewer
                      ? 'text-white'
                      : isDone
                      ? 'text-emerald-900 dark:text-emerald-200'
                      : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900'
                  }`}>
                    {mod.shortTitle}
                  </span>
                </div>
                <span className={`text-[10px] block truncate ${
                  isCurrentInViewer
                    ? 'text-emerald-200'
                    : isDone
                    ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-slate-400 dark:text-slate-400'
                }`}>
                  {isDone ? (language === 'en' ? '✓ Completed' : '✓ Completado') : mod.chapterRef}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Completion alert & next step callouts */}
      {isAllComplete && (
        <div className="mt-3.5 pt-3.5 border-t border-emerald-100 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/50 dark:bg-emerald-950/20 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3.5 sm:px-5 sm:py-3 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#39A900] flex-shrink-0" />
            <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
              <strong>{language === 'en' ? 'Normative Roadmap Completed!' : '¡Ruta Normativa Finalizada!'}</strong> {language === 'en' ? 'You have reviewed all 4 modules of Agreement 0009 of 2024. Test your knowledge in the simulator or take the evaluation.' : 'Has revisado los 4 módulos del Acuerdo 0009 de 2024. Pon a prueba tus conocimientos en el simulador o rinde la evaluación.'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {onGoToCases && (
              <button
                onClick={onGoToCases}
                className="px-3 py-1.5 bg-[#00324D] dark:bg-slate-800 hover:bg-[#002235] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>{language === 'en' ? 'Simulator' : 'Simulador'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            {onGoToQuiz && (
              <button
                onClick={onGoToQuiz}
                className="px-3.5 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{language === 'en' ? 'Final Quiz' : 'Evaluación Final'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
