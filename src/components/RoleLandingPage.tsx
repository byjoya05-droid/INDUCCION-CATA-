import React, { useState } from 'react';
import { LearnerProfile, UserRole } from '../types';
import { SenaLogoComplete, SenaEmblem } from './SenaEmblem';
import { Language, getTranslation } from '../utils/i18n';
import {
  GraduationCap,
  Shield,
  KeyRound,
  UserCheck,
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Lock,
  Building2,
  FileText,
  AlertCircle,
  Play,
  X,
  Globe
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  onSelectRole: (role: UserRole, initialProfile?: LearnerProfile) => void;
  defaultProfile: LearnerProfile;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const RoleLandingPage: React.FC<Props> = ({ onSelectRole, defaultProfile, language, onToggleLanguage }) => {
  const [selectedMode, setSelectedMode] = useState<'chooser' | 'instructor_login' | 'aprendiz_form'>('chooser');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Instructor login state
  const [passwordInput, setPasswordInput] = useState('');
  const [instructorError, setInstructorError] = useState(false);

  // Apprentice form state
  const [formProfile, setFormProfile] = useState<LearnerProfile>(defaultProfile);
  const [formError, setFormError] = useState('');

  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'cata2026') {
      playSound('correct');
      onSelectRole('instructor');
    } else {
      playSound('wrong');
      setInstructorError(true);
      setTimeout(() => setInstructorError(false), 3000);
    }
  };

  const handleAprendizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProfile.fullName.trim() || !formProfile.documentNumber.trim() || !formProfile.fichaNumber.trim()) {
      setFormError('Por favor completa tu nombre completo, número de documento y número de ficha.');
      playSound('wrong');
      return;
    }
    playSound('correct');
    onSelectRole('aprendiz', formProfile);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#00324D]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Top Bar */}
      <header className="w-full bg-[#00324D]/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <SenaLogoComplete />
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playSound('click');
              onToggleLanguage(language === 'es' ? 'en' : 'es');
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Cambiar idioma / Change language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'es' ? 'English (EN)' : 'Español (ES)'}</span>
          </button>

          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
              {getTranslation(language, 'inductionTitle')}
            </span>
            <span className="text-xs text-slate-300">
              {getTranslation(language, 'regulation')}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10">
        <div className="max-w-xl w-full mx-auto">
          {selectedMode === 'chooser' && (
            <div className="bg-slate-850/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#39A900]/20 rounded-2xl mx-auto flex items-center justify-center border border-[#39A900]/30 text-[#39A900]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {getTranslation(language, 'portalTitle')}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {getTranslation(language, 'portalSubtitle')}
                </p>
              </div>

              {/* Video Tutorial Button */}
              <div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsVideoModalOpen(true);
                  }}
                  className="w-full py-3.5 px-4 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-200 font-extrabold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>{getTranslation(language, 'watchVideo')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Aprendiz Button */}
                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedMode('aprendiz_form');
                  }}
                  className="group relative p-6 bg-gradient-to-br from-emerald-900/40 to-slate-800 hover:from-emerald-900/60 hover:to-slate-750 border border-emerald-500/30 hover:border-[#39A900] rounded-2xl transition-all shadow-lg flex flex-col items-center text-center space-y-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#39A900] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-emerald-300 transition-colors">
                      {getTranslation(language, 'apprenticeRole')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {getTranslation(language, 'apprenticeDesc')}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center gap-1 text-xs font-bold text-[#39A900]">
                    <span>Ingresar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Instructor Button */}
                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedMode('instructor_login');
                  }}
                  className="group relative p-6 bg-gradient-to-br from-sky-900/40 to-slate-800 hover:from-sky-900/60 hover:to-slate-750 border border-sky-500/30 hover:border-sky-400 rounded-2xl transition-all shadow-lg flex flex-col items-center text-center space-y-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00324D] border border-sky-400/40 text-sky-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-sky-300 transition-colors">
                      {getTranslation(language, 'instructorRole')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {getTranslation(language, 'instructorDesc')}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center gap-1 text-xs font-bold text-sky-400">
                    <span>Acceso Admin</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-slate-400">
                  {getTranslation(language, 'senaTitle')} • Dirección General de Formación
                </span>
              </div>
            </div>
          )}

          {/* Instructor Password Gate */}
          {selectedMode === 'instructor_login' && (
            <div className="bg-slate-850/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedMode('chooser');
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  ← {getTranslation(language, 'back')}
                </button>
                <span className="px-3 py-1 bg-sky-950/80 text-sky-300 border border-sky-700 text-[11px] font-bold rounded-full">
                  Acceso Restringido
                </span>
              </div>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-sky-900/30 border border-sky-600/40 text-sky-400 rounded-2xl mx-auto flex items-center justify-center">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white">
                  {getTranslation(language, 'instructorLogin')}
                </h2>
                <p className="text-xs text-slate-300">
                  {getTranslation(language, 'instructorLoginDesc')}
                </p>
              </div>

              <form onSubmit={handleInstructorSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {getTranslation(language, 'instructorLogin')}
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={getTranslation(language, 'passwordPlaceholder')}
                    autoFocus
                    className="w-full text-xs px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono focus:outline-hidden focus:border-[#39A900]"
                  />
                </div>

                {instructorError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Contraseña incorrecta. La clave correcta es cata2026</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMode('chooser')}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    {getTranslation(language, 'cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#00324D] hover:bg-[#004e75] text-white font-extrabold text-xs rounded-xl shadow-md transition-all border border-sky-600/30"
                  >
                    {getTranslation(language, 'enterPanel')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Apprentice Characterization Form */}
          {selectedMode === 'aprendiz_form' && (
            <div className="bg-slate-850/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedMode('chooser');
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  ← {getTranslation(language, 'back')}
                </button>
                <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-700 text-[11px] font-bold rounded-full">
                  Registro de Caracterización
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {getTranslation(language, 'apprenticeForm')}
                </h2>
                <p className="text-xs text-slate-300">
                  {getTranslation(language, 'apprenticeFormDesc')}
                </p>
              </div>

              <form onSubmit={handleAprendizSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {getTranslation(language, 'fullName')}
                  </label>
                  <input
                    type="text"
                    value={formProfile.fullName}
                    onChange={(e) => setFormProfile({ ...formProfile, fullName: e.target.value })}
                    placeholder="Ej. Carlos Andrés Gómez"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-[#39A900]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {getTranslation(language, 'docType')}
                    </label>
                    <select
                      value={formProfile.documentType}
                      onChange={(e: any) => setFormProfile({ ...formProfile, documentType: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden"
                    >
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      <option value="CE">CE</option>
                      <option value="PEP">PEP</option>
                      <option value="PPT">PPT</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {getTranslation(language, 'docNumber')}
                    </label>
                    <input
                      type="text"
                      value={formProfile.documentNumber}
                      onChange={(e) => setFormProfile({ ...formProfile, documentNumber: e.target.value })}
                      placeholder="Ej. 1098765432"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono focus:outline-hidden focus:border-[#39A900]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {getTranslation(language, 'fichaNumber')}
                    </label>
                    <input
                      type="text"
                      value={formProfile.fichaNumber}
                      onChange={(e) => setFormProfile({ ...formProfile, fichaNumber: e.target.value })}
                      placeholder="Ej. 3170314"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono focus:outline-hidden focus:border-[#39A900]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {getTranslation(language, 'programName')}
                    </label>
                    <input
                      type="text"
                      value={formProfile.programName}
                      onChange={(e) => setFormProfile({ ...formProfile, programName: e.target.value })}
                      placeholder="Ej. ADSO / Cocina / Contabilidad"
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-[#39A900]"
                    />
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMode('chooser')}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    {getTranslation(language, 'back')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                  >
                    {getTranslation(language, 'startInduction')}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Video Tutorial Floating Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#00324D]">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Video Tutorial de Inducción Institucional SENA</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src="https://drive.google.com/file/d/1eV6TiqKJ6zsG5QF4rVDO1-WFbYj4uuigLH2pKSYt11Q/preview"
                title="Video Tutorial de Inducción SENA"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="px-6 py-3 bg-slate-850 text-slate-400 text-xs text-center border-t border-slate-800">
              Reproductor oficial de Google Drive con controles de reproducción integrados.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center text-slate-500 text-xs border-t border-slate-800 z-10">
        Servicio Nacional de Aprendizaje SENA • Acuerdo 0009 de 2024
      </footer>
    </div>
  );
};
