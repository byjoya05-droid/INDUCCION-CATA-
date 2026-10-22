import React, { useState } from 'react';
import { SENA_INFO } from '../data/senaData';
import { Language, getRuleArticles, getTranslation } from '../utils/i18n';
import { SenaEmblem } from './SenaEmblem';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Scale,
  Sparkles,
  ChevronRight,
  BookOpen,
  Check,
  HeartHandshake,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  onEarnXP: (amount: number, reason: string) => void;
  completedModules: string[];
  onCompleteModule: (moduleId: string) => void;
  onOpenExplorer: () => void;
  activeModuleTab?: 'identidad' | 'derechos' | 'deberes' | 'regimen';
  onSelectModuleTab?: (tab: 'identidad' | 'derechos' | 'deberes' | 'regimen') => void;
  language?: Language;
}

export const ModuleViewer: React.FC<Props> = ({
  onEarnXP,
  completedModules,
  onCompleteModule,
  onOpenExplorer,
  activeModuleTab,
  onSelectModuleTab,
  language = 'es'
}) => {
  const [internalTab, setInternalTab] = useState<'identidad' | 'derechos' | 'deberes' | 'regimen'>('identidad');
  const activeTab = activeModuleTab || internalTab;

  const setActiveTab = (tab: 'identidad' | 'derechos' | 'deberes' | 'regimen') => {
    setInternalTab(tab);
    onSelectModuleTab?.(tab);
  };

  const [readTopics, setReadTopics] = useState<Record<string, boolean>>({});

  const toggleTopicRead = (id: string, xpPoints: number) => {
    if (!readTopics[id]) {
      playSound('correct');
      setReadTopics((prev) => ({ ...prev, [id]: true }));
      onEarnXP(xpPoints, language === 'en' ? 'Regulatory reading & comprehension' : 'Lectura y comprensión normativa');
    }
  };

  const markCurrentTabCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      playSound('unlock');
      onCompleteModule(moduleId);
      onEarnXP(100, language === 'en' ? `Module ${moduleId} successfully completed` : `Módulo ${moduleId} completado con éxito`);
    }
  };

  const articles = getRuleArticles(language);

  const tabs = [
    {
      id: 'identidad',
      label: getTranslation(language, 'tabIdentidad'),
      icon: Compass,
      moduleId: 'mod-1',
      desc: getTranslation(language, 'tabIdentidadDesc')
    },
    {
      id: 'derechos',
      label: getTranslation(language, 'tabDerechos'),
      icon: ShieldCheck,
      moduleId: 'mod-2',
      desc: getTranslation(language, 'tabDerechosDesc')
    },
    {
      id: 'deberes',
      label: getTranslation(language, 'tabDeberes'),
      icon: CheckCircle2,
      moduleId: 'mod-3',
      desc: getTranslation(language, 'tabDeberesDesc')
    },
    {
      id: 'regimen',
      label: getTranslation(language, 'tabRegimen'),
      icon: Scale,
      moduleId: 'mod-4',
      desc: getTranslation(language, 'tabRegimenDesc')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {getTranslation(language, 'mandatoryRoute')}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                {getTranslation(language, 'regulation')}
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#00324D] dark:text-white tracking-tight">
              {getTranslation(language, 'modulesTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
              {getTranslation(language, 'modulesSubtitle')}
            </p>
          </div>

          <button
            onClick={onOpenExplorer}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700 self-start md:self-center cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {getTranslation(language, 'ruleExplorerBtn')}
          </button>
        </div>

        {/* Module Progress Overview */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>{getTranslation(language, 'moduleProgress')}</span>
              <span className="text-[#39A900] dark:text-emerald-400 font-extrabold">{completedModules.length} {getTranslation(language, 'of')} {tabs.length} {getTranslation(language, 'completedOf')}</span>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-black">
              {Math.round((completedModules.length / tabs.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              role="progressbar"
              aria-valuenow={Math.round((completedModules.length / tabs.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="bg-gradient-to-r from-[#00324D] via-[#39A900] to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedModules.length / tabs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = completedModules.includes(tab.moduleId);

            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id as any);
                }}
                className={`flex flex-col text-left p-3.5 rounded-xl transition-all border relative overflow-hidden ${
                  isActive
                    ? 'bg-[#00324D] dark:bg-emerald-800 text-white border-[#00324D] dark:border-emerald-700 shadow-md ring-2 ring-[#39A900]/40'
                    : 'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {isCompleted && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-[#39A900] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 dark:text-emerald-200' : 'text-[#39A900] dark:text-emerald-400'}`} />
                  <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                    {tab.label}
                  </span>
                </div>
                <span className={`text-[11px] leading-tight line-clamp-1 ${isActive ? 'text-slate-300 dark:text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content 1: Identidad y FPI */}
      {activeTab === 'identidad' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Institutional Hero Banner */}
          <div className="bg-gradient-to-br from-[#00324D] via-[#004266] to-[#04283b] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <SenaEmblem className="w-72 h-72" />
            </div>

            <div className="max-w-2xl relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#39A900] text-white mb-3 inline-block">
                Misión Institucional SENA
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                Formación Profesional Integral (FPI) para el Trabajo y la Vida
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-4">
                El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación de las personas en actividades productivas.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">🏛️ Fundado en 1957</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">🎓 Gratuito y de Acceso Público</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">🇨🇴 Presencia en 33 Regionales</span>
              </div>
            </div>
          </div>

          {/* Símbolos del SENA */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <SenaEmblem className="w-5 h-5" />
              Símbolos Institucionales que te identifican
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Como aprendiz SENA, estos símbolos representan tu compromiso con Colombia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-emerald-50/40 dark:hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 flex items-center justify-center p-1.5 mb-3">
                  <SenaEmblem variant="shield" className="w-full h-full" />
                </div>
                <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">El Escudo Institucional</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SENA_INFO.symbols.shield}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-emerald-50/40 dark:hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 flex items-center justify-center p-2 mb-3">
                  <SenaEmblem className="w-full h-full" />
                </div>
                <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">El Logotipo (El Aprendiz)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SENA_INFO.symbols.logo}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-emerald-50/40 dark:hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-3 font-bold text-xl">
                  🏳️
                </div>
                <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">La Bandera y el Himno</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SENA_INFO.symbols.flag} El himno resalta "Adelante la patria nos llama..."
                </p>
              </div>
            </div>
          </div>

          {/* Las 2 Etapas de la Formación SENA */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              La Ruta de tu Formación: Etapa Lectiva y Etapa Productiva
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              El proceso formativo comprende dos fases complementarias indispensables para titularse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#39A900] text-white">
                    Fase 1: Etapa Lectiva
                  </span>
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">En Ambientes de Aprendizaje</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  Periodo en el que desarrollas conocimientos, habilidades técnicas, trabajo en equipo y competencias transversales mediante proyectos formativos guiados por los instructores.
                </p>
                <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 pt-1 border-t border-emerald-200 dark:border-emerald-800/60">
                  <li className="flex items-center gap-1.5">✓ Acompañamiento técnico y pedagógico continuo.</li>
                  <li className="flex items-center gap-1.5">✓ Uso de aulas, talleres, maquinaria y LMS Zajuna.</li>
                  <li className="flex items-center gap-1.5">✓ Registro de evidencias y resultados de aprendizaje (RAP).</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border-2 border-sky-200 dark:border-sky-800/60 bg-sky-50/40 dark:bg-sky-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#00324D] dark:bg-sky-700 text-white">
                    Fase 2: Etapa Productiva
                  </span>
                  <span className="text-xs font-semibold text-sky-900 dark:text-sky-300">Aplicación en Escenarios Reales</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  Periodo donde consolidas tus competencias en un entorno laboral o productivo real con seguimiento de un instructor asignado.
                </p>
                <div className="pt-1 border-t border-sky-200 dark:border-sky-800/60">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">5 Alternativas Oficiales Reconocidas:</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-sky-200 dark:border-slate-700">1. Contrato de Aprendizaje</span>
                    <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-sky-200 dark:border-slate-700">2. Proyecto Productivo</span>
                    <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-sky-200 dark:border-slate-700">3. Pasantía Empresarial</span>
                    <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-sky-200 dark:border-slate-700">4. Vínculo Laboral Afín</span>
                    <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-sky-200 dark:border-slate-700 col-span-2">5. Monitoría de Aprendiz en el SENA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Valores Institucionales */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              Principios y Valores del Aprendiz SENA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SENA_INFO.values.map((v, i) => (
                <div
                  key={v.name}
                  onClick={() => toggleTopicRead(`val-${i}`, 15)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    readTopics[`val-${i}`]
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#00324D] dark:text-emerald-300">{v.name}</span>
                    {readTopics[`val-${i}`] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 font-bold px-1.5 py-0.5 rounded">
                        +15 XP
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Module Complete Action */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex items-center justify-between transition-colors">
            <div>
              <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                {language === 'en' ? 'Finished reviewing this module?' : '¿Terminaste de revisar este módulo?'}
              </h5>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {language === 'en' ? 'Mark it as completed to earn your 100 XP and move to Apprentice Rights.' : 'Márcalo como completado para ganar tus 100 XP y pasar a los Derechos del Aprendiz.'}
              </p>
            </div>
            <button
              onClick={() => {
                markCurrentTabCompleted('mod-1');
                setActiveTab('derechos');
              }}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'en' ? 'Continue to Rights' : 'Continuar a Derechos'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 2: Derechos del Aprendiz */}
      {activeTab === 'derechos' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-emerald-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-md">
            <div className="max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#39A900] text-white mb-2 inline-block">
                Capítulo II - Acuerdo 0009 de 2024
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                Carta Fundamental de Derechos del Aprendiz
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                El nuevo reglamento amplía y salvaguarda las garantías formativas, el acceso irrestricto a los programas de bienestar y el blindaje del debido proceso legal frente a cualquier reclamo o trámite disciplinario.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.filter((a) => a.category === 'derecho').map((derecho) => {
              const isRead = !!readTopics[derecho.id];
              return (
                <div
                  key={derecho.id}
                  onClick={() => toggleTopicRead(derecho.id, 20)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isRead
                      ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-700 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#00324D] dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border dark:border-slate-700">
                      {derecho.number}
                    </span>
                    {isRead ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Leído
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        +20 XP (Toca para leer)
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {derecho.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {derecho.fullText}
                  </p>

                  {derecho.practicalTip && (
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60">
                      <span className="font-bold">Nota clave: </span> {derecho.practicalTip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module Complete Action */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex items-center justify-between transition-colors">
            <div>
              <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                {language === 'en' ? 'Rights Module Reviewed' : 'Módulo de Derechos Revisado'}
              </h5>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {language === 'en' ? 'Now explore your ethical commitments and institutional prohibitions.' : 'Conoce ahora tus compromisos éticos y las prohibiciones institucionales.'}
              </p>
            </div>
            <button
              onClick={() => {
                markCurrentTabCompleted('mod-2');
                setActiveTab('deberes');
              }}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'en' ? 'Continue to Duties' : 'Continuar a Deberes'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 3: Deberes y Prohibiciones */}
      {activeTab === 'deberes' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-[#00324D] to-[#1e4a64] text-white rounded-2xl p-6 shadow-md">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900 mb-2 inline-block">
              Capítulo III - Convivencia y Compromiso
            </span>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              Deberes Esenciales y Prohibiciones Críticas
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed max-w-xl">
              El proceso formativo exige corresponsabilidad. Tu integridad como futuro profesional depende del respeto hacia la comunidad y del cumplimiento de las normas éticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deberes Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Deberes Obligatorios del Aprendiz</h4>
              </div>

              {articles.filter((a) => a.category === 'deber').map((deber) => {
                const isRead = !!readTopics[deber.id];
                return (
                  <div
                    key={deber.id}
                    onClick={() => toggleTopicRead(deber.id, 20)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isRead
                        ? 'bg-white dark:bg-slate-900 border-sky-300 dark:border-sky-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-200 dark:hover:border-sky-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border dark:border-sky-800">
                        {deber.number}
                      </span>
                      {isRead ? (
                        <Check className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      ) : (
                        <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 px-1.5 py-0.5 rounded">
                          +20 XP
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{deber.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{deber.fullText}</p>
                    {deber.practicalTip && (
                      <p className="mt-2 text-[11px] font-semibold text-sky-900 dark:text-sky-200 bg-sky-50 dark:bg-sky-950/40 p-2 rounded border border-sky-100 dark:border-sky-800/60">
                        💡 {deber.practicalTip}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prohibiciones Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Prohibiciones Críticas (Tolerancia Cero)</h4>
              </div>

              {articles.filter((a) => a.category === 'prohibicion').map((prohibicion) => {
                const isRead = !!readTopics[prohibicion.id];
                return (
                  <div
                    key={prohibicion.id}
                    onClick={() => toggleTopicRead(prohibicion.id, 20)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isRead
                        ? 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border dark:border-rose-800">
                        {prohibicion.number}
                      </span>
                      {isRead ? (
                        <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                          +20 XP
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{prohibicion.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{prohibicion.fullText}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Module Complete Action */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex items-center justify-between transition-colors">
            <div>
              <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                {language === 'en' ? 'Coexistence Module Reviewed' : 'Módulo de Convivencia Revisado'}
              </h5>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {language === 'en' ? 'Advance to the disciplinary regime and formative measures.' : 'Avanza al régimen sancionatorio y medidas formativas.'}
              </p>
            </div>
            <button
              onClick={() => {
                markCurrentTabCompleted('mod-3');
                setActiveTab('regimen');
              }}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'en' ? 'Continue to Disciplinary Regime' : 'Continuar a Régimen Disciplinario'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 4: Régimen Disciplinario y Medidas */}
      {activeTab === 'regimen' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-md">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500 text-white mb-2 inline-block">
              Capítulo V - Debido Proceso y Graduación
            </span>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              Medidas Formativas vs. Sanciones Disciplinarias
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              El SENA prioriza la pedagogía y la formación de carácter. Solo cuando las medidas formativas no corrigen la conducta o ante faltas graves/gravísimas, se activa el Comité de Evaluación y Seguimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medidas Formativas (Pedagógicas) */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/80 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-100 dark:border-emerald-900/60">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                  🌱
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Medidas Formativas (No Sancionatorias)</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Tienen carácter pedagógico y NO generan antecedentes en la hoja de vida</p>
                </div>
              </div>

              {articles.filter((a) => a.category === 'medida_formativa').map((m) => (
                <div key={m.id} className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                    <span>{m.title}</span>
                    <span className="font-mono text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">{m.number}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{m.fullText}</p>
                </div>
              ))}
            </div>

            {/* Medidas Sancionatorias */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-rose-200 dark:border-rose-800/80 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-2 border-b border-rose-100 dark:border-rose-900/60">
                <span className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
                  ⚖️
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Medidas Sancionatorias (Vía Comité)</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Impuestas por Subdirección previo debido proceso y descargos</p>
                </div>
              </div>

              {articles.filter((a) => a.category === 'sancion').map((s) => (
                <div key={s.id} className="p-3.5 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-rose-950 dark:text-rose-200 mb-1">
                    <span>{s.title}</span>
                    <span className="font-mono text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-700">{s.number}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{s.fullText}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comité de Evaluación y Seguimiento Flow */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              ¿Cómo opera el Comité de Evaluación y Seguimiento?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Instancia encargada de investigar presuntas faltas y garantizar el debido proceso constitucional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold inline-flex items-center justify-center mb-2">1</span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1">Queja o Reporte</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Instructor o directivo remite informe motivado con evidencias.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold inline-flex items-center justify-center mb-2">2</span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1">Citación Formal</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Notificación al aprendiz especificando presunta falta y fecha de descargos.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold inline-flex items-center justify-center mb-2">3</span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1">Sesión y Descargos</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">El aprendiz expone su versión y aporta pruebas documentales o testimonios.</p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/60 text-center">
                <span className="w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-200 text-xs font-bold inline-flex items-center justify-center mb-2">4</span>
                <h5 className="font-bold text-xs text-purple-900 dark:text-purple-200 mb-1">Decisión y Reposición</h5>
                <p className="text-[11px] text-purple-800 dark:text-purple-300">Subdirección emite acto administrativo; el aprendiz puede interponer recurso.</p>
              </div>
            </div>
          </div>

          {/* Module Complete Action */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex items-center justify-between transition-colors">
            <div>
              <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                {language === 'en' ? 'You have completed all regulatory pillars!' : '¡Has completado todos los pilares normativos!'}
              </h5>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {language === 'en' ? 'Now test your judgment in the Case Simulator.' : 'Ahora pon a prueba tu criterio en el Simulador de Casos Prácticos.'}
              </p>
            </div>
            <button
              onClick={() => {
                markCurrentTabCompleted('mod-4');
              }}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'en' ? 'Finish Module 4 (+100 XP)' : 'Finalizar Módulo 4 (+100 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
