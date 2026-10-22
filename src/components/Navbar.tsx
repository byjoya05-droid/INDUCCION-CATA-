import React, { useState } from 'react';
import { LearnerProfile, Badge } from '../types';
import { Language, getTranslation } from '../utils/i18n';
import { SenaLogoComplete } from './SenaEmblem';
import {
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  User,
  Search,
  CheckCircle2,
  Lock,
  Menu,
  X,
  Sparkles,
  Scale,
  Calendar,
  GraduationCap,
  Moon,
  Sun,
  FileSpreadsheet,
  RefreshCw,
  Shield,
  Eye
} from 'lucide-react';
import { isSoundEnabled, toggleSound, playSound } from '../utils/audio';

interface Props {
  currentTab: 'modulos' | 'casos' | 'quiz' | 'certificado' | 'plan' | 'instructor';
  onSelectTab: (tab: 'modulos' | 'casos' | 'quiz' | 'certificado' | 'plan' | 'instructor') => void;
  profile: LearnerProfile;
  totalXP: number;
  badges: Badge[];
  isCertificateUnlocked: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile: () => void;
  onOpenExplorer: () => void;
  onOpenBadges: () => void;
  onOpenDrive?: () => void;
  completedModulesCount?: number;
  totalModulesCount?: number;
  syncState?: 'idle' | 'syncing' | 'synced' | 'error' | 'unauthenticated';
  sheetUrl?: string | null;
  lastSyncTime?: string | null;
  onTriggerSync?: () => void;
  userRole?: 'instructor' | 'aprendiz';
  onSwitchRole?: (role: 'instructor' | 'aprendiz') => void;
  onLogout?: () => void;
  language?: Language;
  onToggleLanguage?: (lang: Language) => void;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  profile,
  totalXP,
  badges,
  isCertificateUnlocked,
  isDarkMode,
  onToggleDarkMode,
  onOpenProfile,
  onOpenExplorer,
  onOpenBadges,
  onOpenDrive,
  completedModulesCount = 0,
  totalModulesCount = 4,
  syncState = 'unauthenticated',
  sheetUrl,
  lastSyncTime,
  onTriggerSync,
  userRole = 'instructor',
  onSwitchRole,
  onLogout,
  language = 'es',
  onToggleLanguage
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSound('click');
  };

  const navItems = [
    ...(userRole === 'instructor'
      ? [
          {
            id: 'instructor',
            label: getTranslation(language, 'instructorPanel'),
            icon: Shield,
            badge: 'Admin'
          }
        ]
      : []),
    {
      id: 'modulos',
      label: getTranslation(language, 'modules'),
      icon: BookOpen,
      badge: `${completedModulesCount}/${totalModulesCount}`
    },
    { id: 'casos', label: getTranslation(language, 'cases'), icon: Scale },
    { id: 'quiz', label: getTranslation(language, 'quiz'), icon: Award },
    {
      id: 'certificado',
      label: getTranslation(language, 'certificate'),
      icon: GraduationCap,
      badge: isCertificateUnlocked
        ? (language === 'en' ? 'Ready!' : '¡Listo!')
        : (language === 'en' ? 'Locked' : 'Bloqueado')
    },
    { id: 'plan', label: getTranslation(language, 'plan'), icon: Calendar }
  ];

  const unlockedBadgesCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs no-print transition-colors duration-200">
      {/* Top institutional strip */}
      <div className="bg-[#00324D] dark:bg-slate-950 text-white text-[11px] py-1 px-4 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-emerald-400">SENA COLOMBIA</span>
          <span className="text-slate-400">|</span>
          <span className="truncate max-w-[180px] sm:max-w-none text-slate-300">
            {language === 'en'
              ? 'Apprentice Regulations • Agreement 0009 of 2024'
              : 'Reglamento del Aprendiz • Acuerdo 0009 de 2024'}
          </span>
          <span className="text-slate-400">|</span>
          <span
            className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
              userRole === 'instructor'
                ? 'bg-amber-400 text-slate-900'
                : 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30'
            }`}
          >
            {userRole === 'instructor' ? (
              <>
                <Shield className="w-2.5 h-2.5" />
                <span>Instructor</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-2.5 h-2.5" />
                <span>{language === 'en' ? 'Apprentice' : 'Aprendiz'}</span>
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick role toggle */}
          {userRole === 'instructor' ? (
            <button
              onClick={() => {
                playSound('click');
                onSwitchRole?.('aprendiz');
              }}
              title={language === 'en' ? 'Switch temporarily to apprentice view' : 'Cambiar temporalmente a vista de aprendiz'}
              className="text-amber-300 hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">{getTranslation(language, 'viewAsApprentice')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                playSound('click');
                onSwitchRole?.('instructor');
              }}
              title={language === 'en' ? 'Access with Instructor profile' : 'Acceder con perfil de Instructor'}
              className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer text-[11px] font-semibold"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>{getTranslation(language, 'instructorAccess')}</span>
            </button>
          )}

          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">
            {language === 'en' ? 'Cohort: ' : 'Ficha: '}
            <strong className="text-white">{profile.fichaNumber}</strong>
          </span>
          <button
            onClick={onOpenProfile}
            className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-semibold"
            title={language === 'en' ? 'View / Edit Profile' : 'Ver / Editar Perfil'}
          >
            <img
              src="/src/assets/images/instructor_apprentice_avatar_1792611661870.jpg"
              alt="Avatar SENA"
              className="w-5 h-5 rounded-full object-cover border border-[#39A900]"
              referrerPolicy="no-referrer"
            />
            <span className="truncate max-w-[120px] sm:max-w-none">{profile.fullName.split(' ')[0]}</span>
          </button>

          <span className="hidden sm:inline text-slate-400">|</span>
          <button
            onClick={() => {
              playSound('click');
              onLogout?.();
            }}
            className="text-rose-300 hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer text-[11px] bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-800/60"
            title="Cerrar sesión y volver a la selección de rol"
          >
            <span>{getTranslation(language, 'logout')}</span>
          </button>

          <span className="hidden sm:inline text-slate-400">|</span>
          <button
            onClick={() => {
              playSound('click');
              onToggleLanguage?.(language === 'es' ? 'en' : 'es');
            }}
            className="text-slate-200 hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer text-[11px] bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xs"
            title="Cambiar idioma / Change language"
          >
            <span>{language === 'es' ? 'EN 🇬🇧' : 'ES 🇨🇴'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[72px] py-1.5">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playSound('click');
                onSelectTab('modulos');
              }}
              className="text-left focus:outline-hidden"
            >
              <SenaLogoComplete />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound('click');
                    onSelectTab(item.id as any);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#00324D] dark:bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 dark:text-emerald-200' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      item.badge === '¡Listo!' || item.badge === 'Ready!'
                        ? 'bg-[#39A900] text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools (Parte superior derecha) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            {/* Quick search button */}
            <button
              onClick={() => {
                playSound('click');
                onOpenExplorer();
              }}
              title={language === 'en' ? 'Search Regulations' : 'Buscar en el Reglamento'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{getTranslation(language, 'searchRegulation')}</span>
            </button>

            {/* Google Drive & Sheets Dynamic Auto-Sync Button (Solo accesible para el Instructor) */}
            {userRole === 'instructor' && (
              syncState === 'syncing' ? (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenDrive?.();
                  }}
                  title={language === 'en' ? 'Automatically syncing with Google Drive...' : 'Sincronizando automáticamente con Google Drive...'}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs transition-all cursor-pointer animate-pulse"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Saving to Drive...' : 'Guardando en Drive...'}</span>
                </button>
              ) : syncState === 'synced' ? (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenDrive?.();
                  }}
                  title={language === 'en' ? `Automatically synced to Google Drive${lastSyncTime ? ` at ${lastSyncTime}` : ''}. Click to view sheet link.` : `Sincronizado automáticamente en Google Drive${lastSyncTime ? ` a las ${lastSyncTime}` : ''}. Clic para ver enlace de la hoja.`}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400" />
                  <span className="hidden sm:inline">{getTranslation(language, 'connectedDrive')}</span>
                </button>
              ) : syncState === 'error' ? (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenDrive?.();
                  }}
                  title={language === 'en' ? 'Error syncing with Google Drive. Click to review and retry.' : 'Error al sincronizar con Google Drive. Clic para revisar y reintentar.'}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-2xs transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Retry Drive' : 'Reintentar Drive'}</span>
                </button>
              ) : syncState === 'unauthenticated' ? (
                <button
                  onClick={() => {
                    playSound('click');
                    if (onTriggerSync) {
                      onTriggerSync();
                    } else {
                      onOpenDrive?.();
                    }
                  }}
                  title={language === 'en' ? 'Connect Google Drive for live automated learner sync' : 'Conectar Google Drive para sincronización automática en vivo de los aprendices'}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">{getTranslation(language, 'connectDrive')}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenDrive?.();
                  }}
                  title={language === 'en' ? 'Google Drive linked. Automatic sync active.' : 'Google Drive vinculado. Sincronización automática activa.'}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Drive & Sheets</span>
                </button>
              )
            )}

            {/* Quick Modules Progress Indicator */}
            <button
              onClick={() => {
                playSound('click');
                onSelectTab('modulos');
              }}
              title={language === 'en' ? `Agreement 0009 of 2024 Modules Progress: ${completedModulesCount} of ${totalModulesCount} (${Math.round((completedModulesCount / (totalModulesCount || 4)) * 100)}%)` : `Progreso en Módulos del Acuerdo 0009 de 2024: ${completedModulesCount} de ${totalModulesCount} (${Math.round((completedModulesCount / (totalModulesCount || 4)) * 100)}%)`}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <span className="text-[10px] text-slate-400 font-normal">{language === 'en' ? 'Modules:' : 'Módulos:'}</span>
              <div className="w-10 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#39A900] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(completedModulesCount / (totalModulesCount || 4)) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-black text-[#39A900] dark:text-emerald-400">
                {Math.round((completedModulesCount / (totalModulesCount || 4)) * 100)}%
              </span>
            </button>

            {/* Badges Counter */}
            <button
              onClick={() => {
                playSound('click');
                onOpenBadges();
              }}
              title={language === 'en' ? 'Unlocked Badges' : 'Insignias Desbloqueadas'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 text-amber-800 dark:text-amber-300 transition-colors border border-amber-200 dark:border-amber-800"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{unlockedBadgesCount}/{badges.length}</span>
            </button>

            {/* XP Counter */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
              <span>{totalXP} XP</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={language === 'en' ? (soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects') : (soundOn ? 'Silenciar Efectos de Sonido' : 'Activar Sonidos')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#39A900] dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Modo Oscuro / Modo Claro Toggle Icon (Parte superior derecha) */}
            <button
              onClick={() => {
                playSound('click');
                onToggleDarkMode();
              }}
              title={language === 'en' ? (isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode') : (isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro')}
              aria-label={language === 'en' ? (isDarkMode ? 'Enable light mode' : 'Enable dark mode') : (isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro')}
              className={`p-2 rounded-xl transition-all flex items-center justify-center border shadow-xs cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 border-amber-500/40 text-amber-300 hover:bg-slate-700 hover:border-amber-400 ring-2 ring-amber-400/20'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 animate-in spin-in-180 duration-300 fill-amber-300/30 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 animate-in spin-in-180 duration-300 fill-slate-700/20 text-slate-700" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click');
                  onSelectTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-[#00324D] dark:bg-emerald-700 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    item.badge === '¡Listo!' || item.badge === 'Ready!'
                      ? 'bg-[#39A900] text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                onToggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center gap-1.5"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? (language === 'en' ? 'Light Mode' : 'Modo Claro') : (language === 'en' ? 'Dark Mode' : 'Modo Oscuro')}</span>
            </button>
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'My Profile' : 'Mi Perfil'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
