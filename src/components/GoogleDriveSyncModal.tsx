import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  initAuth
} from '../services/googleAuth';
import {
  saveApprenticeToGoogleSheet,
  findExistingSpreadsheet,
  fetchStoredRecords,
  ApprenticeSyncData,
  StoredRecord,
  DEFAULT_SHEET_TITLE
} from '../services/googleSheetsService';
import {
  FileSpreadsheet,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Clock,
  User,
  GraduationCap,
  Copy,
  Check
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  syncData: ApprenticeSyncData;
  onSyncSuccess?: (spreadsheetUrl: string) => void;
}

export const GoogleDriveSyncModal: React.FC<Props> = ({
  isOpen,
  onClose,
  syncData,
  onSyncSuccess
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sena_drive_sheet_url');
    } catch {
      return null;
    }
  });
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sena_drive_last_sync');
    } catch {
      return null;
    }
  });
  const [storedRecords, setStoredRecords] = useState<StoredRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    const urlToCopy = sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices';
    navigator.clipboard.writeText(urlToCopy);
    setCopiedLink(true);
    playSound('click');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        // Not signed in or token missing
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available, check for existing spreadsheet & fetch records
  useEffect(() => {
    if (accessToken && isOpen) {
      checkExistingSheet(accessToken);
    }
  }, [accessToken, isOpen]);

  const checkExistingSheet = async (token: string) => {
    try {
      const sheet = await findExistingSpreadsheet(token);
      if (sheet) {
        setSheetUrl(sheet.spreadsheetUrl);
        setIsLoadingRecords(true);
        const records = await fetchStoredRecords(sheet.spreadsheetId, token);
        setStoredRecords(records);
        setIsLoadingRecords(false);
      }
    } catch (err) {
      console.warn('Error fetching existing sheet:', err);
    }
  };

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      playSound('click');
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        playSound('correct');
        await checkExistingSheet(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error al conectar con la cuenta de Google');
      playSound('wrong');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      playSound('click');
      await logoutGoogle();
      setCurrentUser(null);
      setAccessToken(null);
      setStoredRecords([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmSave = async () => {
    setShowConfirmDialog(false);
    setIsSyncing(true);
    setSyncStatus('idle');
    setErrorMessage(null);

    try {
      playSound('click');
      const result = await saveApprenticeToGoogleSheet(syncData);
      setSheetUrl(result.spreadsheetUrl);
      setSyncStatus('success');
      playSound('fanfare');

      const now = new Date();
      const dateStr = now.toLocaleDateString('es-CO') + ' ' + now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      setLastSyncDate(dateStr);

      if (accessToken) {
        const sheetId = localStorage.getItem('sena_drive_sheet_id');
        if (sheetId) {
          const records = await fetchStoredRecords(sheetId, accessToken);
          setStoredRecords(records);
        }
      }

      onSyncSuccess?.(result.spreadsheetUrl);
    } catch (err: any) {
      console.error('Error syncing:', err);
      setSyncStatus('error');
      setErrorMessage(err.message || 'Error al registrar datos en Google Drive');
      playSound('wrong');
    } finally {
      setIsSyncing(false);
    }
  };

  const progressPercent = Math.round((syncData.completedModules.length / 4) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00324D] via-[#004e75] to-[#39A900] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-xs">
              <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Almacenamiento en Google Drive</h3>
                <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  Google Sheets API
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Registro y sincronización de aprendices bajo el Acuerdo 0009 de 2024
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Auth State Box */}
          {!currentUser ? (
            <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Conecta tu cuenta de Google
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Para guardar los datos de inducción de los aprendices en una hoja de cálculo en tu Google Drive, inicia sesión con tu cuenta de Google con el permiso requerido.
                </p>
              </div>

              {/* Official Google Sign-in Button */}
              <div className="flex justify-center pt-1">
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isSigningIn ? 'Conectando con Google...' : 'Acceder con Google'}</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Usuario'}
                    className="w-10 h-10 rounded-full border-2 border-emerald-500 shadow-xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-emerald-950 dark:text-emerald-100">
                      {currentUser.displayName || 'Usuario Conectado'}
                    </span>
                    <span className="text-[10px] bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.2 rounded-full">
                      ✓ Conectado
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 truncate max-w-[240px] sm:max-w-none">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                title="Cerrar sesión de Google"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Current Learner Record Preview */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Datos a Almacenar en la Hoja de Drive
              </span>
              <span className="text-xs font-bold text-[#00324D] dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                Ficha: {syncData.profile.fichaNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Aprendiz</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {syncData.profile.fullName}
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Documento</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {syncData.profile.documentType} {syncData.profile.documentNumber}
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Programa</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {syncData.profile.programName}
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Avance de Módulos</span>
                <span className="font-bold text-[#39A900] truncate block">
                  {syncData.completedModules.length}/4 ({progressPercent}%)
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Simulador / Quiz</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {syncData.casesFinished ? 'Casos ✓' : 'Casos ⏳'} • {syncData.quizScorePercent}%
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Certificado Oficial</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate block">
                  {syncData.isCertificateUnlocked ? 'Emitido y Válido' : 'Pendiente de Aprobación'}
                </span>
              </div>
            </div>
          </div>

          {/* Direct Spreadsheet Link Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                Enlace de la Hoja de Cálculo en Google Drive
              </span>
              {sheetUrl ? (
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-bold px-2 py-0.5 rounded-full">
                  ✓ Hoja vinculada
                </span>
              ) : (
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  Pendiente de creación
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices'}
                className="flex-1 text-xs font-mono bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 select-all focus:outline-hidden"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  title="Copiar enlace al portapapeles"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-600 shadow-2xs transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Enlace</span>
                    </>
                  )}
                </button>

                <a
                  href={sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#00324D] hover:bg-[#004e75] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{sheetUrl ? 'Abrir en Drive' : 'Buscar en Drive'}</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {sheetUrl ? (
                <>
                  Hoja activa: <strong className="text-slate-800 dark:text-slate-200">{DEFAULT_SHEET_TITLE}</strong>. Cada vez que guardas, se añade una nueva fila con la inducción del aprendiz.
                </>
              ) : (
                <>
                  Nombre oficial de la hoja: <strong className="text-slate-800 dark:text-slate-200">{DEFAULT_SHEET_TITLE}</strong>. Si aún no la has creado, haz clic abajo en <em>"Guardar Datos en Google Drive"</em> para generarla inmediatamente en tu cuenta de Google.
                </>
              )}
            </p>
          </div>

          {/* Sync Actions Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Sincronización con Google Drive
                </span>
                {lastSyncDate ? (
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                    <Clock className="w-3 h-3" /> Última sincronización: {lastSyncDate}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Aún no has sincronizado datos en esta sesión.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={!currentUser || isSyncing}
                  className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer ${
                    !currentUser || isSyncing
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      : 'bg-[#39A900] hover:bg-[#2e8800] text-white hover:shadow-lg'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Guardando en Drive...' : 'Guardar Datos en Google Drive'}</span>
                </button>
              </div>
            </div>

            {syncStatus === 'success' && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] flex-shrink-0" />
                <span>¡Datos guardados con éxito en la hoja de cálculo de tu Google Drive!</span>
              </div>
            )}

            {syncStatus === 'error' && errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Stored Records in Drive Table */}
          {storedRecords.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  Registros guardados en la hoja ({storedRecords.length})
                </h4>
                {sheetUrl && (
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Ver todos en Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-3 py-2">Aprendiz</th>
                      <th className="px-3 py-2">Documento</th>
                      <th className="px-3 py-2">Ficha</th>
                      <th className="px-3 py-2">% Avance</th>
                      <th className="px-3 py-2">Quiz</th>
                      <th className="px-3 py-2">Certificado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {storedRecords.slice(-5).reverse().map((rec, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                          {rec.name}
                        </td>
                        <td className="px-3 py-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {rec.document}
                        </td>
                        <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {rec.ficha}
                        </td>
                        <td className="px-3 py-2 font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                          {rec.progress}
                        </td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {rec.quizScore}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.certificateStatus.includes('Aprobado')
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}>
                            {rec.certificateStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Reglamento del Aprendiz • Acuerdo 0009 de 2024
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Confirmation Dialog before writing to Drive (Workspace Safety Guideline) */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                ¿Confirmas guardar los datos en Google Drive?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Se registrará una nueva fila en la hoja de cálculo <strong>"{DEFAULT_SHEET_TITLE}"</strong> en tu unidad de Google Drive con los datos actuales del aprendiz <strong>{syncData.profile.fullName}</strong> (Ficha {syncData.profile.fichaNumber}, {progressPercent}% de avance normativo).
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-5 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Sí, Guardar en Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
