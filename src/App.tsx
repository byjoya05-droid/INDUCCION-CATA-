/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LearnerProfile, Badge, UserRole } from './types';
import { Language, getTranslation } from './utils/i18n';
import { DEFAULT_PROFILE, INITIAL_BADGES } from './data/senaData';
import { RoleLandingPage } from './components/RoleLandingPage';
import { InstructorDashboard } from './components/InstructorDashboard';
import { Navbar } from './components/Navbar';
import { ModuleViewer } from './components/ModuleViewer';
import { CaseSimulator } from './components/CaseSimulator';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { OfficialCertificate } from './components/OfficialCertificate';
import { InductionPlanView } from './components/InductionPlanView';
import { LearnerProfileModal } from './components/LearnerProfileModal';
import { RuleExplorerModal } from './components/RuleExplorerModal';
import { BadgeDrawer } from './components/BadgeDrawer';
import { GlobalProgressBar } from './components/GlobalProgressBar';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { useAutoDriveSync } from './hooks/useAutoDriveSync';
import {
  Sparkles,
  Award,
  BookOpen,
  Scale,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Flame,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { playSound } from './utils/audio';

export default function App() {
  // Role state: 'none' (shows landing page), 'instructor', or 'aprendiz'
  const [userRole, setUserRole] = useState<UserRole | 'none'>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role');
      if (roleParam === 'aprendiz') return 'aprendiz';
      if (roleParam === 'instructor') return 'instructor';

      const saved = localStorage.getItem('sena_user_role');
      if (saved === 'instructor' || saved === 'aprendiz') return saved;
      return 'none';
    } catch {
      return 'none';
    }
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      return (localStorage.getItem('sena_language') as Language) || 'es';
    } catch {
      return 'es';
    }
  });

  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('sena_language', lang);
    } catch {}
  };

  // Default ficha & program configured by instructor
  const [defaultFicha, setDefaultFicha] = useState<string>(() => {
    try {
      return localStorage.getItem('sena_default_ficha') || DEFAULT_PROFILE.fichaNumber;
    } catch {
      return DEFAULT_PROFILE.fichaNumber;
    }
  });

  const [defaultProgram, setDefaultProgram] = useState<string>(() => {
    try {
      return localStorage.getItem('sena_default_program') || DEFAULT_PROFILE.programName;
    } catch {
      return DEFAULT_PROFILE.programName;
    }
  });

  // Persistence via localStorage with safe fallbacks
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_learner_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          fichaNumber: parsed.fichaNumber || defaultFicha,
          programName: parsed.programName || defaultProgram
        };
      }
      return {
        ...DEFAULT_PROFILE,
        fichaNumber: defaultFicha,
        programName: defaultProgram
      };
    } catch {
      return {
        ...DEFAULT_PROFILE,
        fichaNumber: defaultFicha,
        programName: defaultProgram
      };
    }
  });

  const [totalXP, setTotalXP] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sena_total_xp');
      return saved ? Number(saved) : 100; // Starter XP
    } catch {
      return 100;
    }
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('sena_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sena_completed_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [casesFinished, setCasesFinished] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_cases_finished') === 'true';
    } catch {
      return false;
    }
  });

  const [isCertificateUnlocked, setIsCertificateUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_cert_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [quizScorePercent, setQuizScorePercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sena_quiz_score');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Dark mode state with system preference & localStorage fallback
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_theme_mode');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Atmospheric screen blur transition effect when toggling dark mode
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  const [currentTab, setCurrentTab] = useState<'modulos' | 'casos' | 'quiz' | 'certificado' | 'plan' | 'instructor'>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('role') === 'aprendiz') return 'modulos';
      const savedRole = localStorage.getItem('sena_user_role');
      if (savedRole === 'instructor') return 'instructor';
      return 'modulos';
    } catch {
      return 'modulos';
    }
  });

  const [activeModuleTab, setActiveModuleTab] = useState<'identidad' | 'derechos' | 'deberes' | 'regimen'>('identidad');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState(false);
  const [isBadgeDrawerOpen, setIsBadgeDrawerOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  const handleNavigateToModule = (tabId: 'identidad' | 'derechos' | 'deberes' | 'regimen') => {
    setActiveModuleTab(tabId);
    setCurrentTab('modulos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast notifications for XP & badges
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null);

  // Sync dark mode class to HTML document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsBlurTransitioning(true);
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sena_theme_mode', next ? 'dark' : 'light');
      } catch {}
      return next;
    });

    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 650);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_learner_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_total_xp', totalXP.toString());
    } catch {}
  }, [totalXP]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_completed_modules', JSON.stringify(completedModules));
    } catch {}
  }, [completedModules]);

  useEffect(() => {
    try {
      if (userRole !== 'none') {
        localStorage.setItem('sena_user_role', userRole);
      }
    } catch {}
  }, [userRole]);

  const showToast = (message: string, sub?: string) => {
    setToast({ message, sub });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Autonomous background synchronization with Google Drive & Sheets
  const syncData = {
    profile,
    completedModules,
    casesFinished,
    quizScorePercent,
    totalXP,
    isCertificateUnlocked
  };

  const {
    syncState,
    currentUser,
    sheetUrl,
    lastSyncTime,
    connectGoogle,
    triggerManualSync
  } = useAutoDriveSync(syncData, (message, sub) => showToast(message, sub));

  const handleEarnXP = (amount: number, reason: string) => {
    setTotalXP((prev) => prev + amount);
    showToast(`+${amount} XP Obtenidos`, reason);
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.isUnlocked) {
          playSound('unlock');
          showToast(`¡Insignia Desbloqueada: ${b.title}!`, b.description);
          return { ...b, isUnlocked: true, unlockedAt: 'Hoy' };
        }
        return b;
      })
    );
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
      if (moduleId === 'mod-2') unlockBadge('badge-derechos');
      if (moduleId === 'mod-3') unlockBadge('badge-deberes');
    }
  };

  const handleCasesCompleted = () => {
    setCasesFinished(true);
    localStorage.setItem('sena_cases_finished', 'true');
    unlockBadge('badge-casos');
  };

  const handleQuizCompleted = (passed: boolean, scorePercent: number) => {
    setQuizScorePercent(scorePercent);
    localStorage.setItem('sena_quiz_score', scorePercent.toString());

    if (passed) {
      setIsCertificateUnlocked(true);
      localStorage.setItem('sena_cert_unlocked', 'true');
      unlockBadge('badge-certificado');
    }
  };

  // If user role is not selected yet, show Landing Page gateway
  if (userRole === 'none') {
    return (
      <RoleLandingPage
        defaultProfile={profile}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onSelectRole={(role, initialProfile) => {
          setUserRole(role);
          if (initialProfile) {
            setProfile(initialProfile);
          }
          if (role === 'instructor') {
            setCurrentTab('instructor');
          } else {
            setCurrentTab('modulos');
          }
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-[#39A900] selection:text-white transition-colors duration-300 relative ${isBlurTransitioning ? 'screen-blur-active' : ''}`}>
      {/* Full-screen blur overlay when switching theme mode */}
      {isBlurTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-950/20 dark:bg-white/10 transition-all duration-700"
        />
      )}

      {/* Toast notification floating */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00324D] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-[#39A900] flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold flex-shrink-0">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <p className="text-sm font-bold">{toast.message}</p>
            {toast.sub && <p className="text-xs text-slate-300">{toast.sub}</p>}
          </div>
        </div>
      )}

      {/* Main Navbar with Role & Google Drive Sync Indicator */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        profile={profile}
        totalXP={totalXP}
        badges={badges}
        isCertificateUnlocked={isCertificateUnlocked}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenExplorer={() => setIsExplorerModalOpen(true)}
        onOpenBadges={() => setIsBadgeDrawerOpen(true)}
        onOpenDrive={() => setIsDriveModalOpen(true)}
        completedModulesCount={completedModules.length}
        totalModulesCount={4}
        syncState={syncState}
        sheetUrl={sheetUrl}
        lastSyncTime={lastSyncTime}
        onTriggerSync={triggerManualSync}
        userRole={userRole}
        onSwitchRole={(r) => {
          if (r === 'instructor') {
            setUserRole('instructor');
            setCurrentTab('instructor');
          } else {
            setCurrentTab('modulos');
          }
        }}
        onLogout={() => {
          setUserRole('none');
          localStorage.removeItem('sena_user_role');
        }}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* If instructor tab is active and user is instructor, show InstructorDashboard */}
        {userRole === 'instructor' && currentTab === 'instructor' ? (
          <InstructorDashboard
            currentUser={currentUser}
            sheetUrl={sheetUrl}
            syncState={syncState}
            lastSyncTime={lastSyncTime}
            onConnectGoogle={connectGoogle}
            onOpenDriveModal={() => setIsDriveModalOpen(true)}
            onSwitchToLearnerView={() => setCurrentTab('modulos')}
            defaultFicha={defaultFicha}
            onUpdateDefaultFicha={(f) => {
              setDefaultFicha(f);
              localStorage.setItem('sena_default_ficha', f);
              setProfile((prev) => ({ ...prev, fichaNumber: f }));
            }}
            defaultProgram={defaultProgram}
            onUpdateDefaultProgram={(p) => {
              setDefaultProgram(p);
              localStorage.setItem('sena_default_program', p);
              setProfile((prev) => ({ ...prev, programName: p }));
            }}
            onTriggerSync={triggerManualSync}
            language={language}
          />
        ) : (
          <>
            {/* Global Progress Bar: Tracking percentage through all modules of Acuerdo 0009 de 2024 */}
            <GlobalProgressBar
              completedModules={completedModules}
              onNavigateToModule={handleNavigateToModule}
              onGoToCases={() => {
                playSound('click');
                setCurrentTab('casos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToQuiz={() => {
                playSound('click');
                setCurrentTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentTab={currentTab as any}
              activeModuleTab={activeModuleTab}
              language={language}
            />

            {/* Onboarding Hero Banner (Only shown on 'modulos' tab) */}
            {currentTab === 'modulos' && completedModules.length === 0 && (
              <div className="bg-gradient-to-r from-[#00324D] via-[#004e75] to-[#39A900] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden no-print">
                <div className="max-w-2xl relative z-10 space-y-3">
                  <span className="px-3 py-1 bg-white/20 text-white font-bold text-xs rounded-full inline-flex items-center gap-1.5 backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    {language === 'en' ? 'Welcome to SENA Institutional Induction 2026' : 'Bienvenido(a) a la Inducción Institucional SENA 2024'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                    {language === 'en'
                      ? `Hello, ${profile.fullName.split(' ')[0]}! Prepare to be an Integral Apprentice.`
                      : `¡Hola, ${profile.fullName.split(' ')[0]}! Prepárate para ser un Aprendiz Integral.`}
                  </h1>
                  <p className="text-sm text-slate-100 leading-relaxed">
                    {getTranslation(language, 'welcomeBannerDesc')}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="px-4 py-2 bg-white text-[#00324D] font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                    >
                      {getTranslation(language, 'updateData')} ({profile.fichaNumber})
                    </button>
                    <button
                      onClick={() => setIsExplorerModalOpen(true)}
                      className="px-4 py-2 bg-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/30 transition-colors border border-white/20 cursor-pointer"
                    >
                      {getTranslation(language, 'checkKeyArticles')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Switcher */}
            {currentTab === 'modulos' && (
              <ModuleViewer
                onEarnXP={handleEarnXP}
                completedModules={completedModules}
                onCompleteModule={handleCompleteModule}
                onOpenExplorer={() => setIsExplorerModalOpen(true)}
                activeModuleTab={activeModuleTab}
                onSelectModuleTab={setActiveModuleTab}
                language={language}
              />
            )}

            {currentTab === 'casos' && (
              <CaseSimulator
                onEarnXP={handleEarnXP}
                onCasesCompleted={handleCasesCompleted}
                casesFinished={casesFinished}
                language={language}
              />
            )}

            {currentTab === 'quiz' && (
              <GamifiedQuiz
                onEarnXP={handleEarnXP}
                onQuizCompleted={handleQuizCompleted}
                isCertificateUnlocked={isCertificateUnlocked}
                onGoToCertificate={() => setCurrentTab('certificado')}
                language={language}
              />
            )}

            {currentTab === 'certificado' && (
              <OfficialCertificate
                profile={profile}
                scorePercent={quizScorePercent || 100}
                totalXP={totalXP}
                isUnlocked={isCertificateUnlocked}
                onEditProfile={() => setIsProfileModalOpen(true)}
                onGoToQuiz={() => setCurrentTab('quiz')}
                onOpenDrive={() => setIsDriveModalOpen(true)}
                userRole={userRole === 'instructor' ? 'instructor' : 'aprendiz'}
                language={language}
              />
            )}

            {currentTab === 'plan' && <InductionPlanView language={language} />}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold text-slate-200">
              {getTranslation(language, 'footerRights')}
            </p>
            <p className="text-slate-500 text-[11px]">
              {getTranslation(language, 'footerSub')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsExplorerModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {getTranslation(language, 'fullRegulation')}
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('plan')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {getTranslation(language, 'pedagogicalPlan')}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setUserRole('none');
                localStorage.removeItem('sena_user_role');
              }}
              className="hover:text-amber-400 transition-colors font-bold text-amber-300 cursor-pointer"
            >
              {getTranslation(language, 'switchRoleExit')}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LearnerProfileModal
        profile={profile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={(newProfile) => {
          setProfile(newProfile);
          showToast(language === 'en' ? 'Apprentice Profile Updated' : 'Perfil de Aprendiz Actualizado', `Ficha: ${newProfile.fichaNumber}`);
        }}
        language={language}
      />

      <RuleExplorerModal
        isOpen={isExplorerModalOpen}
        onClose={() => setIsExplorerModalOpen(false)}
        language={language}
      />

      <BadgeDrawer
        badges={badges}
        isOpen={isBadgeDrawerOpen}
        onClose={() => setIsBadgeDrawerOpen(false)}
        totalXP={totalXP}
        language={language}
      />

      <GoogleDriveSyncModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        syncData={syncData}
        onSyncSuccess={(url) => {
          showToast(
            language === 'en' ? 'Record Saved to Google Drive!' : '¡Registro Guardado en Google Drive!',
            language === 'en' ? 'Spreadsheet successfully updated' : 'Hoja de cálculo actualizada con éxito'
          );
        }}
        language={language}
      />
    </div>
  );
}
