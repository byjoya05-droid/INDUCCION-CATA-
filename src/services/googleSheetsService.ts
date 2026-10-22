import { LearnerProfile } from '../types';
import { getAccessToken } from './googleAuth';

export const DEFAULT_SHEET_TITLE = 'SENA - Registro de Aprendices e Inducción (Acuerdo 0009 de 2024)';

export interface ApprenticeSyncData {
  profile: LearnerProfile;
  completedModules: string[];
  casesFinished: boolean;
  quizScorePercent: number;
  totalXP: number;
  isCertificateUnlocked: boolean;
}

export interface SheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  sheetName: string;
}

export interface StoredRecord {
  id: string;
  timestamp: string;
  name: string;
  document: string;
  ficha: string;
  program: string;
  progress: string;
  quizScore: string;
  xp: string;
  certificateStatus: string;
}

const HEADERS = [
  'ID Registro',
  'Fecha y Hora',
  'Nombre Completo',
  'Tipo Doc',
  'No. Identificación',
  'No. Ficha',
  'Programa de Formación',
  'Regional SENA',
  'Centro de Formación',
  'Modalidad',
  'Módulos Completados',
  '% Avance Normativo',
  'Casos Resueltos',
  'Puntaje Evaluación (%)',
  'Total XP Acumulados',
  'Certificado de Inducción',
  'Código Verificación Digital'
];

/**
 * Searches Google Drive for an existing induction spreadsheet created by the app.
 */
export const findExistingSpreadsheet = async (token: string): Promise<SheetInfo | null> => {
  try {
    const query = encodeURIComponent(
      `name = '${DEFAULT_SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
    );
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('Drive search error:', err);
      return null;
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      const file = data.files[0];
      return {
        spreadsheetId: file.id,
        spreadsheetUrl: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
        title: file.name,
        sheetName: 'Aprendices'
      };
    }
    return null;
  } catch (error) {
    console.error('Error finding spreadsheet in Drive:', error);
    return null;
  }
};

/**
 * Creates a new styled spreadsheet in Google Drive via Google Sheets API.
 */
export const createInductionSpreadsheet = async (token: string): Promise<SheetInfo> => {
  const requestBody = {
    properties: {
      title: DEFAULT_SHEET_TITLE
    },
    sheets: [
      {
        properties: {
          title: 'Aprendices',
          gridProperties: {
            frozenRowCount: 1
          }
        }
      }
    ]
  };

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Error al crear la hoja de cálculo en Google Drive');
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;
  const sheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Write headers to the new sheet
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A1:Q1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: 'Aprendices!A1:Q1',
        values: [HEADERS]
      })
    }
  );

  return {
    spreadsheetId,
    spreadsheetUrl: sheetUrl,
    title: DEFAULT_SHEET_TITLE,
    sheetName: 'Aprendices'
  };
};

/**
 * Ensures the induction spreadsheet exists in Google Drive (finds or creates it).
 */
export const getOrCreateSpreadsheet = async (token: string): Promise<SheetInfo> => {
  const existing = await findExistingSpreadsheet(token);
  if (existing) {
    return existing;
  }
  return await createInductionSpreadsheet(token);
};

/**
 * Upserts (inserts or updates existing row) an apprentice record in Google Sheets.
 * Matches by Document Number (column E) and Ficha (column F).
 */
export const upsertApprenticeRecord = async (
  syncData: ApprenticeSyncData
): Promise<{ spreadsheetUrl: string; isUpdated: boolean; rowNumber: number }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Debes iniciar sesión con tu cuenta de Google para almacenar en Drive');
  }

  // 1. Get or create spreadsheet in Drive
  const sheetInfo = await getOrCreateSpreadsheet(token);

  const { profile, completedModules, casesFinished, quizScorePercent, totalXP, isCertificateUnlocked } = syncData;
  const progressPercent = Math.round((completedModules.length / 4) * 100);
  const verificationCode = `SENA-IND-2024-${profile.fichaNumber}-${profile.documentNumber.slice(-4)}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  // 2. Check if a row with this apprentice's document already exists
  let existingRowIndex = -1;
  let existingRecordId = '';
  try {
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetInfo.spreadsheetId}/values/Aprendices!A2:Q100`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (checkRes.ok) {
      const data = await checkRes.json();
      if (data.values && Array.isArray(data.values)) {
        for (let i = 0; i < data.values.length; i++) {
          const row = data.values[i];
          const docNum = row[4]; // column E (No. Identificación)
          if (docNum && docNum.toString().trim() === profile.documentNumber.trim()) {
            existingRowIndex = i + 2; // Row numbers are 1-based, header is row 1
            existingRecordId = row[0] || '';
            break;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error checking existing row in sheet:', err);
  }

  const recordId = existingRecordId || `REG-${profile.documentNumber}-${Date.now().toString().slice(-4)}`;

  const rowValues = [
    recordId,
    dateStr,
    profile.fullName,
    profile.documentType,
    profile.documentNumber,
    profile.fichaNumber,
    profile.programName,
    profile.regional,
    profile.centerName,
    profile.modality,
    `${completedModules.length}/4 Módulos`,
    `${progressPercent}%`,
    casesFinished ? '100% Completado' : 'Pendiente',
    `${quizScorePercent}%`,
    totalXP,
    isCertificateUnlocked ? 'Aprobado y Emitido' : 'Pendiente',
    verificationCode
  ];

  if (existingRowIndex > 1) {
    // UPDATE existing row
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetInfo.spreadsheetId}/values/Aprendices!A${existingRowIndex}:Q${existingRowIndex}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          range: `Aprendices!A${existingRowIndex}:Q${existingRowIndex}`,
          values: [rowValues]
        })
      }
    );

    if (!updateRes.ok) {
      const errorData = await updateRes.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || 'Error al actualizar el registro en la hoja');
    }

    try {
      localStorage.setItem('sena_drive_sheet_url', sheetInfo.spreadsheetUrl);
      localStorage.setItem('sena_drive_sheet_id', sheetInfo.spreadsheetId);
      localStorage.setItem('sena_drive_last_sync', dateStr);
    } catch {}

    return {
      spreadsheetUrl: sheetInfo.spreadsheetUrl,
      isUpdated: true,
      rowNumber: existingRowIndex
    };
  } else {
    // APPEND new row to sheet
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetInfo.spreadsheetId}/values/${sheetInfo.sheetName}!A1:Q1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowValues]
        })
      }
    );

    if (!appendRes.ok) {
      const errorData = await appendRes.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || 'Error al guardar los datos en la hoja de cálculo');
    }

    try {
      localStorage.setItem('sena_drive_sheet_url', sheetInfo.spreadsheetUrl);
      localStorage.setItem('sena_drive_sheet_id', sheetInfo.spreadsheetId);
      localStorage.setItem('sena_drive_last_sync', dateStr);
    } catch {}

    return {
      spreadsheetUrl: sheetInfo.spreadsheetUrl,
      isUpdated: false,
      rowNumber: -1
    };
  }
};

/**
 * Appends or updates an apprentice record in the Google Sheets spreadsheet hosted on Google Drive.
 */
export const saveApprenticeToGoogleSheet = async (
  syncData: ApprenticeSyncData
): Promise<{ spreadsheetUrl: string; rowCount: number }> => {
  const result = await upsertApprenticeRecord(syncData);
  return {
    spreadsheetUrl: result.spreadsheetUrl,
    rowCount: 1
  };
};

/**
 * Fetches existing records from the spreadsheet for display.
 */
export const fetchStoredRecords = async (spreadsheetId: string, token: string): Promise<StoredRecord[]> => {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A2:Q50`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.values) return [];

    return data.values.map((row: any[]) => ({
      id: row[0] || '',
      timestamp: row[1] || '',
      name: row[2] || '',
      document: `${row[3] || ''} ${row[4] || ''}`,
      ficha: row[5] || '',
      program: row[6] || '',
      progress: row[11] || '',
      quizScore: row[13] || '',
      xp: row[14] || '',
      certificateStatus: row[15] || ''
    }));
  } catch (error) {
    console.error('Error fetching sheet records:', error);
    return [];
  }
};
