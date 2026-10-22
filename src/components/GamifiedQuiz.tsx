import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/senaData';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  onEarnXP: (amount: number, reason: string) => void;
  onQuizCompleted: (passed: boolean, scorePercent: number) => void;
  isCertificateUnlocked: boolean;
  onGoToCertificate: () => void;
}

export const GamifiedQuiz: React.FC<Props> = ({
  onEarnXP,
  onQuizCompleted,
  isCertificateUnlocked,
  onGoToCertificate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionIndex: number; selected: number; isCorrect: boolean }>>([]);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const isAnswered = selectedOption !== null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isFinished) return;

    setSelectedOption(idx);
    const isCorrect = idx === currentQ.correctAnswerIndex;

    if (isCorrect) {
      playSound('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + 1);

      // XP with combo bonus
      const bonusXP = newStreak > 2 ? currentQ.xpValue * 1.5 : currentQ.xpValue;
      onEarnXP(Math.round(bonusXP), `Respuesta correcta (${newStreak} en racha)`);
    } else {
      playSound('wrong');
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionIndex: currentIndex, selected: idx, isCorrect }
    ]);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = score + (selectedOption === currentQ.correctAnswerIndex ? 0 : 0); // already updated
    const percent = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);
    const passed = percent >= 80;

    setIsFinished(true);
    onQuizCompleted(passed, percent);

    if (passed) {
      playSound('fanfare');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setUserAnswers([]);
  };

  const scorePercent = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const passed = scorePercent >= 80;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Desafío del Saber: Reglamento SENA
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Puntaje mínimo aprobatorio: 80%</span>
            </div>
            <h2 className="text-2xl font-black text-[#00324D] dark:text-white tracking-tight">
              Evaluación Final Gamificada
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
              Demuestra tu apropiación de las normas, derechos y deberes. Al superar el 80% se liberará de manera inmediata tu Certificado Oficial de Inducción.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {streak > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-xl font-bold text-xs shadow-sm animate-pulse">
                <Flame className="w-4 h-4 fill-white" />
                <span>Racha x{streak}</span>
              </div>
            )}
            <div className="text-right">
              <span className="text-xs text-slate-400 dark:text-slate-400 block font-medium">Aciertos</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {score} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mt-6 overflow-hidden">
          <div
            className="bg-[#39A900] h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + (isFinished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Finished Summary View */}
      {isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 md:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200 transition-colors">
          <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-inner relative">
            {passed ? (
              <div className="w-full h-full rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center border border-emerald-300 dark:border-emerald-800">
                <Trophy className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-full h-full rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center border border-amber-300 dark:border-amber-800">
                <HelpCircle className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
              passed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
            }`}>
              {passed ? '¡INDUCCIÓN SUPERADA CON ÉXITO!' : 'POR DEBAJO DEL UMBRAL DEL 80%'}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              Obtuviste {scorePercent}% ({score} de {QUIZ_QUESTIONS.length} correctas)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {passed
                ? 'Felicitaciones aprendiz, has acreditado el conocimiento pleno de los deberes, derechos y garantías del Acuerdo 0009 de 2024. Tu certificado ha sido generado.'
                : 'El reglamento exige un 80% para la certificación de inducción institucional. Repasa los módulos o vuelve a intentarlo.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar Desafío
            </button>

            {passed && (
              <button
                onClick={onGoToCertificate}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Ver y Descargar Certificado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Breakdown of questions */}
          <div className="text-left pt-6 border-t border-slate-200 dark:border-slate-800 max-w-2xl mx-auto space-y-3">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Revisión Pedagógica de Respuestas
            </h4>
            {userAnswers.map((ua, i) => {
              const q = QUIZ_QUESTIONS[ua.questionIndex];
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border text-xs ${
                    ua.isCorrect
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                      : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1 font-semibold text-slate-900 dark:text-slate-100">
                    {ua.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{q.question}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Norma: </span> {q.articleCitation}. {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#00324D] dark:bg-emerald-700 text-white font-bold rounded-lg">
                Pregunta {currentIndex + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg">
                Categoría: {currentQ.category}
              </span>
            </div>
            <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              +{currentQ.xpValue} XP
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optClass = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100';

                if (isAnswered) {
                  if (idx === currentQ.correctAnswerIndex) {
                    optClass = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-300 dark:ring-emerald-800';
                  } else if (isSelected) {
                    optClass = 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-600 text-rose-950 dark:text-rose-100 ring-2 ring-rose-300 dark:ring-rose-800';
                  } else {
                    optClass = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-50 dark:text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${optClass}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isSelected && idx === currentQ.correctAnswerIndex
                        ? 'bg-emerald-600 text-white'
                        : isSelected && idx !== currentQ.correctAnswerIndex
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium leading-relaxed flex-1">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Immediate pedagogical feedback */}
            {isAnswered && (
              <div className={`p-4 rounded-xl border-2 animate-in fade-in duration-150 ${
                selectedOption === currentQ.correctAnswerIndex
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider">
                  {selectedOption === currentQ.correctAnswerIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta Correcta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Respuesta Incorrecta</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed mb-2">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 pt-1 border-t border-black/10 dark:border-white/10">
                  📜 Cita reglamentaria: {currentQ.articleCitation}
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 dark:text-slate-400">
              Selecciona una opción para avanzar
            </span>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-6 py-2.5 font-bold text-xs rounded-xl shadow-xs transition-all ${
                isAnswered
                  ? 'bg-[#39A900] hover:bg-[#2e8800] text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Finalizar Evaluación' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
