import React, { useState } from 'react';
import { LearnerProfile } from '../types';
import { Language, getTranslation } from '../utils/i18n';
import { SenaEmblem } from './SenaEmblem';
import {
  Printer,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Edit3,
  ExternalLink,
  Award,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  profile: LearnerProfile;
  scorePercent: number;
  totalXP: number;
  isUnlocked: boolean;
  onEditProfile: () => void;
  onGoToQuiz: () => void;
  onOpenDrive?: () => void;
  userRole?: 'instructor' | 'aprendiz';
  language?: Language;
}

export const OfficialCertificate: React.FC<Props> = ({
  profile,
  scorePercent,
  totalXP,
  isUnlocked,
  onEditProfile,
  onGoToQuiz,
  onOpenDrive,
  userRole = 'instructor',
  language = 'es'
}) => {
  const [copied, setCopied] = useState(false);

  // Formatted date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString(language === 'en' ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verificationCode = `SENA-IND-2024-${profile.fichaNumber}-${profile.documentNumber.slice(-4)}`;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const handleCopyLink = () => {
    playSound('correct');
    const url = `${window.location.origin}/#verify=${verificationCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-5 transition-colors">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl mx-auto flex items-center justify-center text-slate-400 dark:text-slate-500">
          <Lock className="w-10 h-10" />
        </div>
        <div>
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full border border-amber-200 dark:border-amber-800">
            {getTranslation(language, 'certPending')}
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2 mb-2">
            {getTranslation(language, 'certPendingTitle')}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {getTranslation(language, 'certPendingDesc')}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoToQuiz}
            className="px-6 py-3 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>{getTranslation(language, 'goToQuizBtn')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar (Hidden on print) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">{getTranslation(language, 'certAccredited')}</h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                {getTranslation(language, 'validLectiva')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{getTranslation(language, 'issuedUnder')}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onEditProfile}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{getTranslation(language, 'editData')}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? getTranslation(language, 'copiedLink') : getTranslation(language, 'copyValidation')}</span>
          </button>

          {userRole === 'instructor' && onOpenDrive && (
            <button
              onClick={() => {
                playSound('click');
                onOpenDrive();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-xl transition-colors border border-emerald-300 dark:border-emerald-800 cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{getTranslation(language, 'saveDrive')}</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00324D] dark:bg-emerald-700 hover:bg-[#002235] dark:hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{getTranslation(language, 'printPdf')}</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Canvas */}
      <div className="certificate-page bg-white rounded-3xl border-8 border-double border-[#00324D] shadow-2xl p-6 sm:p-10 md:p-14 relative overflow-hidden text-slate-900 max-w-4xl mx-auto my-0">
        {/* Subtle Watermark in Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <SenaEmblem className="w-[450px] h-[450px]" />
        </div>

        {/* Outer Corner Ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#39A900]" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#39A900]" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#39A900]" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#39A900]" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="flex justify-center items-center gap-4 mb-3">
            <SenaEmblem variant="shield" className="w-14 h-16" />
          </div>

          <p className="text-[11px] font-black tracking-[0.25em] text-[#00324D] uppercase">
            {getTranslation(language, 'republic')}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
            {getTranslation(language, 'senaOrg')}
          </h1>
          <p className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
            {getTranslation(language, 'directorate')}
          </p>

          <div className="w-32 h-1 bg-[#39A900] mx-auto my-3 rounded-full" />

          <h2 className="font-cert-title text-xl sm:text-2xl font-bold text-slate-800 uppercase tracking-widest pt-2">
            {getTranslation(language, 'certApprovalTitle')}
          </h2>
          <p className="text-xs text-slate-500 font-medium italic">
            {getTranslation(language, 'certMerit')}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="text-center space-y-6 my-6 relative z-10">
          <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
            {getTranslation(language, 'certifiesThat')}
          </p>

          <div className="py-2 border-b-2 border-slate-300 max-w-xl mx-auto">
            <h3 className="font-cert-title text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-wide">
              {profile.fullName}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            {getTranslation(language, 'identifiedWith')} <span className="font-bold">{profile.documentType} No. {profile.documentNumber}</span>
          </p>

          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
            <p>
              {getTranslation(language, 'completedSat')}
            </p>
            <p className="font-bold text-[#00324D] text-base sm:text-lg">
              {profile.programName}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-1 text-slate-600">
              <span><strong>{getTranslation(language, 'cohortFicha')}:</strong> {profile.fichaNumber}</span>
              <span>•</span>
              <span><strong>{getTranslation(language, 'modalityLabel')}:</strong> {profile.modality}</span>
              <span>•</span>
              <span><strong>{getTranslation(language, 'centerLabel')}:</strong> {profile.centerName}</span>
              <span>•</span>
              <span><strong>{profile.regional}</strong></span>
            </div>
          </div>

          {/* Achievement stats badge */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-700 pt-1">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {getTranslation(language, 'approvalExcel')} {scorePercent}% {getTranslation(language, 'excelScore')}
            </span>
            <span className="bg-sky-50 text-sky-800 border border-sky-300 px-3 py-1 rounded-full">
              {getTranslation(language, 'scoreXp')}: {totalXP} {getTranslation(language, 'accumulatedXp')}
            </span>
          </div>
        </div>

        {/* Certificate Signatures & Security Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10">
          {/* Signature 1 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-center justify-center">
              <span className="font-cursive text-xl text-slate-600 italic tracking-wider">
                Carlos Mario Estrada
              </span>
            </div>
            <div className="w-44 h-px bg-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-800">{getTranslation(language, 'subdirectorate')}</p>
            <p className="text-[10px] text-slate-500">{getTranslation(language, 'trainingCenter')}</p>
          </div>

          {/* Official Gold Seal & QR Center */}
          <div className="text-center flex flex-col items-center justify-center">
            {/* Vector Authentic QR Simulation */}
            <div className="w-20 h-20 bg-white p-1.5 rounded-xl border-2 border-slate-300 shadow-xs flex flex-col justify-between mb-1.5">
              <div className="flex justify-between">
                <div className="w-4 h-4 bg-[#00324D] rounded-xs" />
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                <div className="w-4 h-4 bg-[#00324D] rounded-xs" />
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-slate-800 rounded-xs" />
                <div className="w-3 h-3 bg-[#39A900] rounded-xs" />
                <div className="w-2 h-2 bg-slate-800 rounded-xs" />
              </div>
              <div className="flex justify-between">
                <div className="w-4 h-4 bg-[#00324D] rounded-xs" />
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                <div className="w-4 h-4 bg-[#00324D] rounded-xs" />
              </div>
            </div>
            <span className="font-mono text-[9px] font-bold text-slate-600 tracking-wider">
              {verificationCode}
            </span>
            <span className="text-[9px] text-emerald-700 font-bold">
              {getTranslation(language, 'digitalVerification')}
            </span>
          </div>

          {/* Signature 2 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-center justify-center">
              <span className="font-cursive text-xl text-slate-600 italic tracking-wider">
                Diana Marcela Gómez
              </span>
            </div>
            <div className="w-44 h-px bg-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-800">{getTranslation(language, 'academicCoord')}</p>
            <p className="text-[10px] text-slate-500">{getTranslation(language, 'welfareTraining')}</p>
          </div>
        </div>

        {/* Date & Legal reference line */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500">
          <span>{getTranslation(language, 'issuedOn')} {dateFormatted}</span>
          <span>{getTranslation(language, 'regulation')}</span>
          <span>{getTranslation(language, 'mottoSena')}</span>
        </div>
      </div>
    </div>
  );
};

