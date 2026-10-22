import React from 'react';
import { Badge } from '../types';
import { Language, getBadges, getTranslation } from '../utils/i18n';
import {
  Compass,
  ShieldCheck,
  Award,
  Scale,
  GraduationCap,
  X,
  Lock,
  Sparkles
} from 'lucide-react';

interface Props {
  badges: Badge[];
  isOpen: boolean;
  onClose: () => void;
  totalXP: number;
  language?: Language;
}

export const BadgeDrawer: React.FC<Props> = ({
  badges,
  isOpen,
  onClose,
  totalXP,
  language = 'es'
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string, isUnlocked: boolean) => {
    const props = { className: `w-6 h-6 ${isUnlocked ? 'text-amber-500' : 'text-slate-400'}` };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Award':
        return <Award {...props} />;
      case 'Scale':
        return <Scale {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  const localizedBadgesList = getBadges(language);
  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 transition-colors">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-200">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{getTranslation(language, 'badgesTitle')}</h3>
              <p className="text-xs text-amber-100">
                {unlockedCount} {getTranslation(language, 'of')} {badges.length} {getTranslation(language, 'badgesUnlocked')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/40 flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-900 dark:text-amber-200">{getTranslation(language, 'apprenticeLevel')}</span>
          <span className="font-bold text-amber-950 dark:text-amber-100 bg-amber-200/80 dark:bg-amber-900/60 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-700">
            {totalXP > 600 ? getTranslation(language, 'guardianLevel') : totalXP > 300 ? getTranslation(language, 'activeLevel') : getTranslation(language, 'noviceLevel')}
          </span>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {badges.map((badge) => {
            const localized = localizedBadgesList.find((b) => b.id === badge.id) || badge;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  badge.isUnlocked
                    ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  badge.isUnlocked ? 'bg-amber-100 dark:bg-amber-950/80' : 'bg-slate-200 dark:bg-slate-800'
                }`}>
                  {badge.isUnlocked ? renderIcon(badge.icon, true) : <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{localized.title}</h4>
                    {badge.isUnlocked ? (
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {getTranslation(language, 'unlockedTag')}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{getTranslation(language, 'lockedTag')}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{localized.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-transparent dark:border-slate-700 cursor-pointer"
          >
            {getTranslation(language, 'cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
