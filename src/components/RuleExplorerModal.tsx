import React, { useState } from 'react';
import { RULE_ARTICLES } from '../data/senaData';
import { RULE_ARTICLES_EN, Language } from '../utils/i18n';
import { RuleArticle } from '../types';
import { Search, BookOpen, Shield, CheckCircle, AlertTriangle, X, BookmarkCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const RuleExplorerModal: React.FC<Props> = ({ isOpen, onClose, language = 'es' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  if (!isOpen) return null;

  const articlesToUse = language === 'en' ? RULE_ARTICLES_EN : RULE_ARTICLES;

  const categories = [
    { id: 'todos', label: language === 'en' ? 'All Articles' : 'Todos los Artículos' },
    { id: 'derecho', label: language === 'en' ? 'Rights (Cap. II)' : 'Derechos (Cap. II)' },
    { id: 'deber', label: language === 'en' ? 'Duties (Cap. III)' : 'Deberes (Cap. III)' },
    { id: 'prohibicion', label: language === 'en' ? 'Prohibitions' : 'Prohibiciones' },
    { id: 'medida_formativa', label: language === 'en' ? 'Formative Measures' : 'Medidas Formativas' },
    { id: 'sancion', label: language === 'en' ? 'Sanctions (Cap. V)' : 'Sanciones (Cap. V)' }
  ];

  const filteredArticles = articlesToUse.filter((art) => {
    const matchesCategory = selectedCategory === 'todos' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.fullText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.highlightTag && art.highlightTag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (category: RuleArticle['category']) => {
    switch (category) {
      case 'derecho':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> {language === 'en' ? 'Right' : 'Derecho'}</span>;
      case 'deber':
        return <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {language === 'en' ? 'Duty' : 'Deber'}</span>;
      case 'prohibicion':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {language === 'en' ? 'Prohibition' : 'Prohibición'}</span>;
      case 'medida_formativa':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><BookOpen className="w-3 h-3" /> {language === 'en' ? 'Formative Measure' : 'Medida Formativa'}</span>;
      case 'sancion':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {language === 'en' ? 'Sanction' : 'Sanción'}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00324D] to-[#0d476c] dark:from-slate-950 dark:to-[#00324D] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{language === 'en' ? 'Apprentice Regulation Explorer' : 'Buscador del Reglamento del Aprendiz'}</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Acuerdo 0009 de 2024
                </span>
              </div>
              <p className="text-xs text-slate-300">{language === 'en' ? 'Quick lookup of articles, guarantees and disciplinary regime' : 'Consulta rápida de artículos, garantías y régimen disciplinario'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'en' ? 'Search by keyword (e.g. due process, plagiarism, absence, PPE)...' : 'Buscar por palabra clave (ej. debido proceso, plagio, inasistencia, EPP, sanción)...'}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#00324D] dark:bg-emerald-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Article List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="font-medium text-slate-600 dark:text-slate-400">{language === 'en' ? 'No articles found with that criteria.' : 'No se encontraron artículos con ese criterio.'}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{language === 'en' ? 'Try broader terms like "plagiarism", "attendance" or "guarantees".' : 'Intenta con términos más generales como "plagio", "asistencia" o "garantías".'}</p>
            </div>
          ) : (
            filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {art.number}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">| {art.chapter}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {art.title}
                    </h4>
                  </div>
                  <div>{getCategoryBadge(art.category)}</div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                  {art.fullText}
                </p>

                {art.practicalTip && (
                  <div className="mt-2.5 p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-[#39A900] rounded-r-lg text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                    <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{language === 'en' ? 'Formative tip: ' : 'Clave formativa: '}</span>
                      {art.practicalTip}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{language === 'en' ? `Showing ${filteredArticles.length} of ${articlesToUse.length} key articles` : `Mostrando ${filteredArticles.length} de ${articlesToUse.length} artículos clave`}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors border border-transparent dark:border-slate-700"
          >
            {language === 'en' ? 'Close Lookup' : 'Cerrar Consulta'}
          </button>
        </div>
      </div>
    </div>
  );
};
