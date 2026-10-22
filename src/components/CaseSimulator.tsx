import React, { useState } from 'react';
import { CASE_SCENARIOS } from '../data/senaData';
import { CaseScenario, CaseChoice } from '../types';
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  onEarnXP: (amount: number, reason: string) => void;
  onCasesCompleted: () => void;
  casesFinished: boolean;
}

export const CaseSimulator: React.FC<Props> = ({
  onEarnXP,
  onCasesCompleted,
  casesFinished
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<CaseChoice | null>(null);
  const [completedCases, setCompletedCases] = useState<Record<string, { choiceId: string; points: number }>>({});

  const currentCase: CaseScenario = CASE_SCENARIOS[currentCaseIndex];
  const isAnswered = !!selectedChoice;

  const handleSelectChoice = (choice: CaseChoice) => {
    if (selectedChoice) return; // already picked for this view

    setSelectedChoice(choice);
    if (choice.isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    const newCompleted = {
      ...completedCases,
      [currentCase.id]: { choiceId: choice.id, points: choice.points }
    };
    setCompletedCases(newCompleted);

    if (choice.points > 0) {
      onEarnXP(choice.points, `Caso resuelto: ${currentCase.title}`);
    }

    // Check if all cases answered
    if (Object.keys(newCompleted).length === CASE_SCENARIOS.length) {
      onCasesCompleted();
    }
  };

  const handleNextCase = () => {
    playSound('click');
    if (currentCaseIndex < CASE_SCENARIOS.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      const nextCase = CASE_SCENARIOS[currentCaseIndex + 1];
      const prevAnswer = completedCases[nextCase.id];
      if (prevAnswer) {
        const found = nextCase.choices.find((c) => c.id === prevAnswer.choiceId);
        setSelectedChoice(found || null);
      } else {
        setSelectedChoice(null);
      }
    }
  };

  const handleSelectCaseByIndex = (index: number) => {
    playSound('click');
    setCurrentCaseIndex(index);
    const targetCase = CASE_SCENARIOS[index];
    const prevAnswer = completedCases[targetCase.id];
    if (prevAnswer) {
      const found = targetCase.choices.find((c) => c.id === prevAnswer.choiceId);
      setSelectedChoice(found || null);
    } else {
      setSelectedChoice(null);
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCompletedCases({});
    setSelectedChoice(null);
    setCurrentCaseIndex(0);
  };

  const totalPoints = Object.values(completedCases).reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 flex items-center gap-1 border border-purple-200 dark:border-purple-800">
                <Scale className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Simulador del Comité de Convivencia y Ética
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Dilemas Reales SENA</span>
            </div>
            <h2 className="text-2xl font-black text-[#00324D] dark:text-white tracking-tight">
              Aprende Tomando Decisiones con el Reglamento
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
              Analiza situaciones cotidianas vividas por aprendices en centros de formación y determina la aplicación del debido proceso y las medidas formativas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-400 dark:text-slate-400 block font-medium">Puntos de Simulación</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {totalPoints} / {CASE_SCENARIOS.length * 100} XP
              </span>
            </div>
          </div>
        </div>

        {/* Case Stepper */}
        <div className="grid grid-cols-5 gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          {CASE_SCENARIOS.map((sc, i) => {
            const isCurrent = currentCaseIndex === i;
            const res = completedCases[sc.id];
            const isDone = !!res;
            const isPerfect = res && res.points === 100;

            return (
              <button
                key={sc.id}
                onClick={() => handleSelectCaseByIndex(i)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all text-xs font-semibold ${
                  isCurrent
                    ? 'bg-[#00324D] dark:bg-purple-800 text-white border-[#00324D] dark:border-purple-700 ring-2 ring-purple-400'
                    : isDone
                    ? isPerfect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {isDone ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isPerfect ? 'text-emerald-500' : 'text-amber-500'}`} />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Caso {i + 1}</span>
                </div>
                <span className="text-[10px] opacity-80 truncate max-w-full">
                  {sc.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Case Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        {/* Case Top Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#00324D] dark:bg-emerald-700 text-white text-xs font-bold rounded-lg">
              Caso {currentCaseIndex + 1} de {CASE_SCENARIOS.length}
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg">
              Área: {currentCase.category}
            </span>
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/60">
              Dificultad: {currentCase.difficulty}
            </span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>Personaje:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentCase.character}</span>
            <span className="text-slate-400 dark:text-slate-500">({currentCase.characterRole})</span>
          </div>
        </div>

        {/* Case Narrative */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {currentCase.title}
          </h3>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-emerald-500 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {currentCase.description}
          </div>

          <div className="bg-purple-50/70 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-800/60">
            <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block mb-1">
              Dilema a Resolver:
            </span>
            <p className="text-sm font-semibold text-purple-950 dark:text-purple-100">
              {currentCase.dilemma}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Selecciona la decisión conforme al Acuerdo 0009 de 2024:
            </span>

            {currentCase.choices.map((choice, idx) => {
              const isChosen = selectedChoice?.id === choice.id;
              let choiceStyle = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100';

              if (selectedChoice) {
                if (choice.isCorrect) {
                  choiceStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-300 dark:ring-emerald-800';
                } else if (isChosen) {
                  choiceStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-600 text-rose-950 dark:text-rose-100 ring-2 ring-rose-300 dark:ring-rose-800';
                } else {
                  choiceStyle = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-50 dark:text-slate-400';
                }
              }

              return (
                <button
                  key={choice.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(choice)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${choiceStyle}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                    isChosen && choice.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isChosen && !choice.isCorrect
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1 text-sm font-medium leading-relaxed">
                    {choice.text}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Section (Shown once answered) */}
          {selectedChoice && (
            <div className={`mt-5 p-5 rounded-xl border-2 animate-in fade-in duration-200 ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                {selectedChoice.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Excelente Criterio Formativo! (+{selectedChoice.points} XP)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>Decisión Imprecisa o No Ajustada al Reglamento (+{selectedChoice.points} XP)</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed mb-3">
                {selectedChoice.feedback}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  📜 Fundamento Normativo: {selectedChoice.legalBasis}
                </span>
                <span className="italic text-slate-500 dark:text-slate-400">
                  💡 {currentCase.keyTakeaway}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Case Footer Navigation */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Casos
          </button>

          <div className="flex items-center gap-3">
            {currentCaseIndex < CASE_SCENARIOS.length - 1 ? (
              <button
                onClick={handleNextCase}
                disabled={!selectedChoice}
                className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-xl transition-all shadow-xs ${
                  selectedChoice
                    ? 'bg-[#00324D] dark:bg-emerald-700 hover:bg-[#002235] dark:hover:bg-emerald-600 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>Siguiente Caso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                  <Award className="w-4 h-4" />
                  ¡Todos los casos completados!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
