import { useState, useEffect, useRef, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  logoutGoogle
} from '../services/googleAuth';
import {
  upsertApprenticeRecord,
  findExistingSpreadsheet,
  ApprenticeSyncData
} from '../services/googleSheetsService';
import { playSound } from '../utils/audio';

export type SyncState = 'idle' | 'syncing' | 'synced' | 'error' | 'unauthenticated';

export interface UseAutoDriveSyncResult {
  syncState: SyncState;
  currentUser: User | null;
  sheetUrl: string | null;
  lastSyncTime: string | null;
  errorMessage: string | null;
  connectGoogle: () => Promise<void>;
  disconnectGoogle: () => Promise<void>;
  triggerManualSync: () => Promise<void>;
}

export const useAutoDriveSync = (
  syncData: ApprenticeSyncData,
  onNotify?: (message: string, sub?: string) => void
): UseAutoDriveSyncResult => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [syncState, setSyncState] = useState<SyncState>('unauthenticated');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sena_drive_last_sync');
    } catch {
      return null;
    }
  });
  const [sheetUrl, setSheetUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sena_drive_sheet_url');
    } catch {
      return null;
    }
  });

  const lastFingerprintRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSyncingRef = useRef<boolean>(false);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      async (user, token) => {
        setCurrentUser(user);
        setSyncState('idle');
        try {
          const sheet = await findExistingSpreadsheet(token);
          if (sheet) {
            setSheetUrl(sheet.spreadsheetUrl);
          }
        } catch (err) {
          console.warn('Auto-check existing sheet:', err);
        }
      },
      () => {
        setCurrentUser(null);
        setSyncState('unauthenticated');
      }
    );
    return () => unsubscribe();
  }, []);

  // Compute a progress fingerprint to detect meaningful milestone changes
  const currentFingerprint = JSON.stringify({
    doc: syncData.profile.documentNumber,
    ficha: syncData.profile.fichaNumber,
    name: syncData.profile.fullName,
    modules: syncData.completedModules.sort(),
    cases: syncData.casesFinished,
    quiz: syncData.quizScorePercent,
    xp: syncData.totalXP,
    cert: syncData.isCertificateUnlocked
  });

  // Execute the upsert to Google Sheets
  const executeSync = useCallback(
    async (isManual: boolean = false) => {
      const token = await getAccessToken();
      if (!token) {
        setSyncState('unauthenticated');
        return;
      }

      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      setSyncState('syncing');
      setErrorMessage(null);

      try {
        const result = await upsertApprenticeRecord(syncData);
        setSheetUrl(result.spreadsheetUrl);
        setSyncState('synced');
        lastFingerprintRef.current = currentFingerprint;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        setLastSyncTime(timeStr);

        if (isManual) {
          playSound('correct');
          onNotify?.(
            '¡Sincronizado con Google Drive!',
            result.isUpdated
              ? `Registro de Ficha ${syncData.profile.fichaNumber} actualizado`
              : 'Nuevo registro añadido a la hoja'
          );
        }
      } catch (err: any) {
        console.error('Error during auto-sync to Drive:', err);
        setSyncState('error');
        setErrorMessage(err.message || 'Error al sincronizar con Google Sheets');
        if (isManual) {
          playSound('wrong');
          onNotify?.('Error de sincronización', err.message || 'No se pudo guardar en Drive');
        }
      } finally {
        isSyncingRef.current = false;
      }
    },
    [currentFingerprint, onNotify, syncData]
  );

  // Auto-sync effect: when fingerprint changes and user is authenticated, debounce and save
  useEffect(() => {
    if (!currentUser) {
      setSyncState('unauthenticated');
      return;
    }

    // If fingerprint hasn't changed, do nothing
    if (lastFingerprintRef.current === currentFingerprint) {
      return;
    }

    // Debounce by 1500ms to consolidate rapid state changes
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      executeSync(false);
    }, 1500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentFingerprint, currentUser, executeSync]);

  const connectGoogle = async () => {
    try {
      playSound('click');
      setSyncState('syncing');
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        playSound('correct');
        const sheet = await findExistingSpreadsheet(res.accessToken);
        if (sheet) {
          setSheetUrl(sheet.spreadsheetUrl);
        }
        // Immediate initial sync
        await executeSync(true);
      }
    } catch (err: any) {
      console.error(err);
      setSyncState('unauthenticated');
      setErrorMessage(err.message || 'Error al conectar cuenta de Google');
      playSound('wrong');
    }
  };

  const disconnectGoogle = async () => {
    try {
      playSound('click');
      await logoutGoogle();
      setCurrentUser(null);
      setSyncState('unauthenticated');
    } catch (err) {
      console.error(err);
    }
  };

  const triggerManualSync = async () => {
    if (!currentUser) {
      await connectGoogle();
    } else {
      await executeSync(true);
    }
  };

  return {
    syncState,
    currentUser,
    sheetUrl,
    lastSyncTime,
    errorMessage,
    connectGoogle,
    disconnectGoogle,
    triggerManualSync
  };
};
