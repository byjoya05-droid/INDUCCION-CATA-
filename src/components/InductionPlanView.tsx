import React from 'react';
import { INDUCTION_PLAN_STEPS } from '../data/senaData';
import { INDUCTION_PLAN_STEPS_EN, Language } from '../utils/i18n';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  FileCheck,
  Download,
  BookOpen,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  language?: Language;
}

export const InductionPlanView: React.FC<Props> = ({ language = 'es' }) => {
  const stepsToUse = language === 'en' ? INDUCTION_PLAN_STEPS_EN : INDUCTION_PLAN_STEPS;

  const handleDownloadPlan = () => {
    playSound('click');
    const textContent = `PLAN ESTRUCTURADO DE INDUCCIÓN SENA - ACUERDO 0009 DE 2024
Servicio Nacional de Aprendizaje (SENA)
Dirección de Formación Profesional Integral

${stepsToUse.map((s, idx) => `
${idx + 1}. ${s.phase.toUpperCase()}
   Duración: ${s.duration}
   Objetivo: ${s.objective}
   Actividades Clave:
   ${s.activities.map((a) => `   - ${a}`).join('\n')}
   Entregable / Evidencia: ${s.deliverable}
`).join('\n')}

Metodología: Formación Profesional Integral (FPI) con Evaluación Gamificada.
Puntaje mínimo aprobatorio para certificación: 80%.
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Plan_Estructurado_Induccion_SENA_2024.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {language === 'en' ? 'Institutional Curricular Design' : 'Diseño Curricular Institucional'}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Plan Pedagógico 2024</span>
          </div>
          <h2 className="text-2xl font-black text-[#00324D] dark:text-white tracking-tight">
            {language === 'en' ? 'SENA Structured Induction Plan' : 'Plan Estructurado de Inducción SENA'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
            {language === 'en'
              ? 'Schedule and 4-phase methodological roadmap for appropriating the new regulations, rights, duties, and SENA culture.'
              : 'Cronograma y ruta metodológica de 4 fases para la apropiación del nuevo reglamento, derechos, deberes y cultura SENA.'}
          </p>
        </div>

        <button
          onClick={handleDownloadPlan}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00324D] dark:bg-emerald-700 hover:bg-[#002235] dark:hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'en' ? 'Export Plan (.TXT)' : 'Exportar Plan (.TXT)'}</span>
        </button>
      </div>

      {/* Strategic Pillars Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs transition-colors">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            {language === 'en' ? '1. Competency-Based Approach' : '1. Enfoque por Competencias'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Comprehensive training of knowing, doing, and being in harmonious coexistence.'
              : 'Formación integral del saber, saber hacer y saber ser en convivencia armónica.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/30 dark:to-slate-900 p-5 rounded-2xl border border-sky-200 dark:border-sky-800/60 shadow-xs transition-colors">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            {language === 'en' ? '2. Formative Gamification' : '2. Gamificación Formativa'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Interactive missions, streaks, ethical dilemmas, and XP that encourage meaningful learning.'
              : 'Misiones interactivas, rachas, dilemas éticos y XP que incentivan el aprendizaje significativo.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-900 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs transition-colors">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            {language === 'en' ? '3. Verifiable Certification' : '3. Certificación Verificable'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Accreditation with 80% threshold and unique QR validation code for the training center.'
              : 'Acreditación con umbral del 80% y código QR único de validación para el centro de formación.'}
          </p>
        </div>
      </div>

      {/* Structured Steps Timeline */}
      <div className="space-y-4">
        {stepsToUse.map((step, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-emerald-200 dark:hover:border-emerald-700 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-[#00324D] dark:bg-emerald-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {step.phase}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300">
                      <Clock className="w-3.5 h-3.5" /> {step.duration}
                    </span>
                    <span>•</span>
                    <span>{language === 'en' ? 'Framework: Agreement 0009 of 2024' : 'Marco: Acuerdo 0009 de 2024'}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-3 py-1 rounded-lg self-start border border-slate-200 dark:border-slate-700">
                {language === 'en' ? 'Deliverable: ' : 'Entregable: '}{step.deliverable}
              </div>
            </div>

            <div className="space-y-3 pl-0 md:pl-12">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-[#00324D] dark:text-emerald-400">
                  {language === 'en' ? 'Pedagogical Objective: ' : 'Objetivo Pedagógico: '}
                </span>
                {step.objective}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  {language === 'en' ? 'Face-to-Face and Virtual Learning Activities:' : 'Actividades de Aprendizaje Presenciales y Virtuales:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {step.activities.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
