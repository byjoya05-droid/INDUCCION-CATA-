import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  FileSpreadsheet,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Users,
  Award,
  BookOpen,
  Search,
  Filter,
  Download,
  Share2,
  Shield,
  Eye,
  Settings,
  GraduationCap,
  Clock,
  Sparkles,
  ChevronRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import {
  StoredRecord,
  fetchStoredRecords,
  DEFAULT_SHEET_TITLE
} from '../services/googleSheetsService';
import { playSound } from '../utils/audio';

interface Props {
  currentUser: FirebaseUser | null;
  sheetUrl: string | null;
  syncState: 'idle' | 'syncing' | 'synced' | 'error' | 'unauthenticated';
  lastSyncTime: string | null;
  onConnectGoogle: () => void;
  onOpenDriveModal: () => void;
  onSwitchToLearnerView: () => void;
  defaultFicha: string;
  onUpdateDefaultFicha: (ficha: string) => void;
  defaultProgram: string;
  onUpdateDefaultProgram: (program: string) => void;
  onTriggerSync?: () => void;
}

export const InstructorDashboard: React.FC<Props> = ({
  currentUser,
  sheetUrl,
  syncState,
  lastSyncTime,
  onConnectGoogle,
  onOpenDriveModal,
  onSwitchToLearnerView,
  defaultFicha,
  onUpdateDefaultFicha,
  defaultProgram,
  onUpdateDefaultProgram,
  onTriggerSync
}) => {
  const [activeTab, setActiveTab] = useState<'seguimiento' | 'compartir' | 'drive' | 'config'>('seguimiento');
  const [records, setRecords] = useState<StoredRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'certified' | 'in_progress'>('all');
  const [copiedApprenticeLink, setCopiedApprenticeLink] = useState(false);
  const [copiedSheetLink, setCopiedSheetLink] = useState(false);
  const [editFicha, setEditFicha] = useState(defaultFicha);
  const [editProgram, setEditProgram] = useState(defaultProgram);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  // Apprentice link with role=aprendiz URL param
  const apprenticeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?role=aprendiz`
    : '';

  // Load records from Google Sheets if available
  useEffect(() => {
    loadRecords();
  }, [sheetUrl]);

  const loadRecords = async () => {
    const sheetId = localStorage.getItem('sena_drive_sheet_id');
    const token = await import('../services/googleAuth').then((m) => m.getAccessToken());
    if (sheetId && token) {
      setIsLoadingRecords(true);
      try {
        const data = await fetchStoredRecords(sheetId, token);
        setRecords(data);
      } catch (err) {
        console.warn('Error fetching records:', err);
      } finally {
        setIsLoadingRecords(false);
      }
    }
  };

  const handleCopyApprenticeLink = () => {
    navigator.clipboard.writeText(apprenticeUrl);
    setCopiedApprenticeLink(true);
    playSound('click');
    setTimeout(() => setCopiedApprenticeLink(false), 2500);
  };

  const handleCopySheetLink = () => {
    const url = sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices';
    navigator.clipboard.writeText(url);
    setCopiedSheetLink(true);
    playSound('click');
    setTimeout(() => setCopiedSheetLink(false), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDefaultFicha(editFicha);
    onUpdateDefaultProgram(editProgram);
    playSound('correct');
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  // Filtered records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.document.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.ficha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.program.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'certified') {
      return rec.certificateStatus.toLowerCase().includes('aprobado');
    }
    if (filterStatus === 'in_progress') {
      return !rec.certificateStatus.toLowerCase().includes('aprobado');
    }
    return true;
  });

  // Calculate statistics
  const totalCount = records.length;
  const certifiedCount = records.filter((r) => r.certificateStatus.toLowerCase().includes('aprobado')).length;
  const averageProgress = totalCount > 0
    ? Math.round(
        records.reduce((acc, r) => {
          const num = parseInt(r.progress.replace('%', ''), 10) || 0;
          return acc + num;
        }, 0) / totalCount
      )
    : 0;

  // Export to CSV
  const handleExportCSV = () => {
    playSound('click');
    if (records.length === 0) return;

    const headers = ['ID', 'Fecha', 'Nombre', 'Documento', 'Ficha', 'Programa', '% Avance', 'Quiz', 'XP', 'Certificado'];
    const rows = records.map((r) => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.name}"`,
      `"${r.document}"`,
      `"${r.ficha}"`,
      `"${r.program}"`,
      `"${r.progress}"`,
      `"${r.quizScore}"`,
      `"${r.xp}"`,
      `"${r.certificateStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Seguimiento_Aprendices_${defaultFicha || '2024'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Institutional Instructor Top Hero Bar */}
      <div className="bg-gradient-to-r from-[#00324D] via-[#004e75] to-[#39A900] text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 text-white font-extrabold text-xs rounded-full inline-flex items-center gap-1.5 backdrop-blur-xs">
                <Shield className="w-3.5 h-3.5 text-yellow-300" />
                Rol: Instructor(a) / Administrador SENA
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-200 font-bold text-xs rounded-full border border-emerald-400/30">
                Acuerdo 0009 de 2024
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Panel de Gestión y Seguimiento de Inducción
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Monitorea el avance de los aprendices en tiempo real, administra la sincronización con Google Drive y genera el enlace limpio de inducción para tus grupos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleCopyApprenticeLink}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#00324D] hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {copiedApprenticeLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">¡Enlace de Aprendices Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#39A900]" />
                  <span>Copiar Enlace de Aprendices</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                playSound('click');
                onSwitchToLearnerView();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl border border-white/30 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Eye className="w-4 h-4" />
              <span>Ver como Aprendiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share with Learners High-Priority Action Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-emerald-300 dark:border-emerald-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center flex-shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Enlace para Compartir a los Aprendices
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Los aprendices que ingresen con este enlace accederán a la inducción formativa sin botones de configuración ni acceso a Google Drive.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            ✓ Modo Aprendiz Seguro
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            readOnly
            value={apprenticeUrl}
            className="flex-1 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-200 select-all focus:outline-hidden truncate min-w-0"
          />

          <button
            onClick={handleCopyApprenticeLink}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            {copiedApprenticeLink ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Enlace</span>
              </>
            )}
          </button>

          <a
            href={apprenticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Probar en pestaña</span>
          </a>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#00324D] dark:text-emerald-400" />
            Aprendices Registrados
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {totalCount}
          </p>
          <span className="text-[10px] text-slate-400 block">
            En hoja de cálculo institucional
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
            Avance Promedio
          </span>
          <p className="text-2xl font-black text-[#39A900] tabular-nums">
            {averageProgress}%
          </p>
          <span className="text-[10px] text-slate-400 block">
            4 módulos del Acuerdo 0009
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Certificados Emitidos
          </span>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
            {certifiedCount}
          </p>
          <span className="text-[10px] text-slate-400 block">
            Evaluación $\ge$ 70% aprobada
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
            Estado Google Drive
          </span>
          <div className="flex items-center gap-2 pt-0.5">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${currentUser ? 'bg-[#39A900]' : 'bg-amber-500'}`} />
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {currentUser ? 'Conectado' : 'Sin conectar'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 truncate block">
            {currentUser?.email || 'Inicia sesión para sincronizar'}
          </span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => {
            playSound('click');
            setActiveTab('seguimiento');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'seguimiento'
              ? 'bg-[#00324D] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Seguimiento de Aprendices ({totalCount})</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setActiveTab('drive');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'drive'
              ? 'bg-[#00324D] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Google Drive & Hoja de Cálculo</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setActiveTab('config');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'config'
              ? 'bg-[#00324D] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Configuración de Ficha</span>
        </button>
      </div>

      {/* Tab 1: Seguimiento de Aprendices */}
      {activeTab === 'seguimiento' && (
        <div className="space-y-4">
          {/* Action and Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar aprendiz por nombre, cédula o ficha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e: any) => setFilterStatus(e.target.value)}
                className="text-xs px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-hidden font-medium"
              >
                <option value="all">Todos los Estados</option>
                <option value="certified">Solo Certificados</option>
                <option value="in_progress">En Progreso</option>
              </select>

              <button
                onClick={loadRecords}
                disabled={isLoadingRecords}
                title="Recargar datos desde Google Sheets"
                className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={records.length === 0}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Aprendiz</th>
                    <th className="px-4 py-3">Identificación</th>
                    <th className="px-4 py-3">Ficha</th>
                    <th className="px-4 py-3">% Avance Normativo</th>
                    <th className="px-4 py-3">Nota Quiz</th>
                    <th className="px-4 py-3">Certificado Oficial</th>
                    <th className="px-4 py-3">Último Registro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((rec, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {rec.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap font-mono text-[11px]">
                          {rec.document}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {rec.ficha}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-extrabold text-[#39A900] dark:text-emerald-400">
                            {rec.progress}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {rec.quizScore}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              rec.certificateStatus.toLowerCase().includes('aprobado')
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            }`}
                          >
                            {rec.certificateStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-[11px] whitespace-nowrap">
                          {rec.timestamp}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-400 space-y-2">
                        <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                        <p className="font-bold text-slate-600 dark:text-slate-300 text-sm">
                          {records.length === 0
                            ? 'Aún no hay registros de aprendices en la hoja de cálculo'
                            : 'No se encontraron aprendices con el filtro actual'}
                        </p>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          {records.length === 0
                            ? 'Comparte el enlace de aprendices para que comiencen su inducción. Los registros aparecerán automáticamente en esta tabla y en tu Google Drive.'
                            : 'Intenta modificar el término de búsqueda o restablecer el filtro.'}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Google Drive & Sheets */}
      {activeTab === 'drive' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Hoja de Cálculo en Google Drive del Instructor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {DEFAULT_SHEET_TITLE}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDriveModal}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Abrir Asistente Drive
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Enlace Directo de la Hoja
            </span>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices'}
                className="flex-1 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-200 select-all focus:outline-hidden"
              />

              <button
                onClick={handleCopySheetLink}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                {copiedSheetLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>

              <a
                href={sheetUrl || 'https://drive.google.com/drive/u/0/search?q=SENA%20Registro%20de%20Aprendices'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#00324D] hover:bg-[#004e75] text-white rounded-xl text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir en Google Drive</span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              {lastSyncTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Última sincronización: {lastSyncTime}
                </span>
              )}
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#39A900]" />
                Cuenta conectada: {currentUser?.email || 'No iniciada'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Configuración de Ficha y Centro */}
      {activeTab === 'config' && (
        <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Parámetros de la Ficha Formativa
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Configura los valores que se cargarán automáticamente a los aprendices cuando abran el enlace de inducción.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Número de Ficha de Caracterización
              </label>
              <input
                type="text"
                value={editFicha}
                onChange={(e) => setEditFicha(e.target.value)}
                placeholder="Ej. 2894521"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white font-mono focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nombre del Programa de Formación
              </label>
              <input
                type="text"
                value={editProgram}
                onChange={(e) => setEditProgram(e.target.value)}
                placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {savedSettingsSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-[#39A900]" />
              <span>¡Parámetros de la ficha actualizados con éxito!</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
