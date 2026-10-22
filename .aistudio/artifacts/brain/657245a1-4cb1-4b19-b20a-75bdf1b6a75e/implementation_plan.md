# Sincronización Automática Transparente con Google Sheets & Drive (Acuerdo 0009 de 2024)

Este plan establece una arquitectura de sincronización autónoma en segundo plano para registrar automáticamente el progreso, evaluaciones y certificados de los aprendices en la hoja de Google Drive del instructor sin requerir apertura manual de modales, clics de confirmación continuos ni reconexiones recurrentes.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones clave para la automatización sin fricción:**
> 1. **Sincronización por Hitos (Debounced Auto-Sync):** El prototipo guardará automáticamente el progreso del aprendiz al culminar hitos clave (completar un módulo normativo del Acuerdo 0009 de 2024, resolver el simulador de faltas y medidas formativas, superar el quiz final o emitir el certificado oficial).
> 2. **Autenticación Persistente y Silenciosa:** Se mantendrá activa la sesión de Google mediante Firebase Auth en el navegador con renovación automática del token de acceso (`accessToken`), de modo que el usuario no necesite presionar "Acceder con Google" en cada visita.
> 3. **Actualización de Fila por Ficha y Documento (Upsert Inteligente):** En lugar de duplicar infinitamente filas del mismo aprendiz cada vez que avanza 10%, el servicio buscará si ya existe un registro con su número de documento/ficha y actualizará su fila correspondiente, o creará una nueva si es un aprendiz nuevo.
> 4. **Indicador Visual Discreto de Sincronización:** Se sustituye la necesidad de abrir modales por un indicador sutil e informativo en la barra superior (`"Sincronizado con Drive ✓"` / `"Guardando..."` / `"Sin conexión"`), manteniendo acceso al enlace directo de la hoja en todo momento.

---

## 1. Overview & Core Concept

- **Qué hace:** Automatiza por completo el flujo de recolección de datos formativos. Toda la actividad del aprendiz en el prototipo se persiste directamente en la hoja de cálculo de Google Drive titulada **`SENA - Registro de Aprendices e Inducción (Acuerdo 0009 de 2024)`** de manera reactiva, silenciosa y confiable.
- **Audiencia y Contexto:** Aprendices e instructores del SENA en procesos de inducción bajo el nuevo Acuerdo 0009 de 2024, permitiendo monitoreo en tiempo real del cumplimiento normativo sin interrumpir la experiencia de aprendizaje.
- **Valor Principal:** Cero fricción operativa: el aprendiz navega, aprende y se evalúa mientras el prototipo mantiene el libro de calificaciones y evidencias del instructor actualizado en Drive en tiempo real.

---

## 2. User Experience & Visual Design

### Flujo de Usuario Autónomo
1. **Inicio de Sesión Unificado (Cero pasos adicionales):** Al cargar el prototipo, si la cuenta de Google ya fue autorizada previamente, el cliente reactiva la sesión de forma inmediata. Si es la primera vez, un discreto aviso en la cabecera ofrece conectar Google con un solo clic.
2. **Progreso y Guardado en Vivo:** Cuando el aprendiz completa un módulo normativo (ej. Módulo 1: Principios y Valores), aprueba un caso disciplinario o termina la evaluación con puntaje aprobatorio, el sistema dispara en segundo plano la sincronización con Google Sheets.
3. **Feedback en Tiempo Real:** 
   - Un discreto micro-indicador en el Navbar muestra el estado:
     - 🟢 *Sincronizado con Drive* (con timestamp relativo).
     - 🟡 *Actualizando hoja de cálculo...* (con micro-spinner).
     - ⚪ *Pendiente de conexión* (con botón directo de 1 clic).
   - Acceso inmediato al enlace directo de la hoja de cálculo para inspección con un solo clic en cualquier instante.

### Identidad Visual y Estilo Institucional
- **Paleta de Colores Institucional SENA:**
  - Verde Institucional (`#39A900`) para estados de éxito y confirmaciones de sincronización.
  - Azul Profundo SENA (`#00324D`) para encabezados estructurales y paneles de control.
  - Superficie neutra clara (`#F8FAFC`) y oscura (`#0F172A`) con contraste accesible WCAG AA.
- **Tipografía y Micro-Interacciones:**
  - `Plus Jakarta Sans` para titulares e interfaces.
  - Cifras tabulares (`tabular-nums`) para métricas de avance (%, XP, puntajes).
  - Transiciones suaves de opacidad ($\le 200\text{ms}$) al cambiar el estado del indicador de sincronización.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Sincronización Automática con Debounce vs. Guardado Manual**
  - *Enfoque Seleccionado:* Auto-sync reactivo con debounce de 1500ms tras eventos de progreso.
  - *Por qué:* Evita saturar cuotas de la API de Google Sheets si el aprendiz interactúa rápidamente, pero garantiza que ningún progreso se quede sin registrar.
  - *Alternativa descartada:* Requerir confirmación modal en cada avance, lo cual interrumpe la navegación del aprendiz.

- **Decisión 2: Actualización Inteligente (Upsert) vs. Inserción Continua de Filas**
  - *Enfoque Seleccionado:* El servicio verificará si el documento del aprendiz ya cuenta con una fila en la hoja: si existe, actualizará los campos de avance (% módulos, nota de quiz, casos y certificado); si no existe, añadirá una nueva fila al final.
  - *Por qué:* Mantiene la hoja de cálculo limpia, ordenada y legible para el instructor con exactamente un registro consolidado por aprendiz.
  - *Alternativa descartada:* Añadir una fila cada vez que avanza 1%, lo que generaría cientos de filas duplicadas por usuario.

- **Decisión 3: Caché Local Offline con Auto-Reintento (Resiliencia)**
  - *Enfoque Seleccionado:* Si la conexión a internet falla o el token expira brevemente, los datos se encolan en `localStorage` y se sincronizan automáticamente en cuanto se restablezca la conexión.
  - *Por qué:* Garantiza que los aprendices no pierdan su progreso formativo si experimentan intermitencias en la red.

---

## 4. Technical Architecture & Data Strategy

### Diagrama del Sistema de Sincronización Automática

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            NAVEGADOR DEL APRENDIZ                           │
│                                                                             │
│  ┌───────────────────────┐         ┌─────────────────────────────────────┐  │
│  │   Acciones Aprendiz   │         │           Navbar Global             │  │
│  │  - Completa Módulo    │         │  - Indicador de Estado en Vivo      │  │
│  │  - Resuelve Casos     ├────┐    │    [🟢 Sincronizado / 🟡 Guardando] │  │
│  │  - Aprueba Quiz       │    │    │  - Acceso directo al enlace Sheet   │  │
│  │  - Desbloquea Cert.   │    │    └──────────────────▲──────────────────┘  │
│  └───────────────────────┘    │                       │                     │
│                               ▼                       │                     │
│               ┌──────────────────────────────┐        │                     │
│               │     AutoSyncManager Hook     ├────────┘                     │
│               │  - Debounce de cambios       │                              │
│               │  - Cola de reintentos        │                              │
│               │  - Verificación de sesión    │                              │
│               └──────────────┬───────────────┘                              │
│                              │                                              │
│                              ▼                                              │
│               ┌──────────────────────────────┐                              │
│               │     googleSheetsService      │                              │
│               │  - Busca o Crea Sheet        │                              │
│               │  - Match por Documento/Ficha │                              │
│               │  - BatchUpdate (Upsert)      │                              │
│               └──────────────┬───────────────┘                              │
└──────────────────────────────┼──────────────────────────────────────────────┘
                               │ HTTPS / OAuth Bearer Token
                               ▼
        ┌──────────────────────────────────────────────┐
        │        Google Workspace / Drive APIs         │
        │                                              │
        │  ┌────────────────────────────────────────┐  │
        │  │ Hoja de Cálculo en Google Drive:       │  │
        │  │ "SENA - Registro de Aprendices e       │  │
        │  │  Inducción (Acuerdo 0009 de 2024)"     │  │
        │  │                                        │  │
        │  │  Fila consolidada por cada Aprendiz:   │  │
        │  │  [Doc | Ficha | % Avance | Quiz | Cert]│  │
        │  └────────────────────────────────────────┘  │
        └──────────────────────────────────────────────┘
```

### Componentes y Cambios Técnicos
1. **`src/services/googleAuth.ts`**:
   - Integración de persistencia de sesión con Firebase Auth (`browserLocalPersistence`).
   - Renovación silenciosa de credenciales sin interrumpir al usuario.
2. **`src/services/googleSheetsService.ts`**:
   - Implementación de `upsertApprenticeRecord`: localiza la fila existente por `Documento` o inserta nueva fila.
   - Manejo de cuotas y debounce para llamadas concurrentes.
3. **`src/hooks/useAutoDriveSync.ts`**:
   - Nuevo Hook reactivo que escucha cambios en el progreso del aprendiz (`completedModules`, `casesCompleted`, `quizScore`, `isCertificateUnlocked`).
   - Dispara automáticamente la actualización en Drive y expone el estado (`'idle' | 'saving' | 'saved' | 'error' | 'unauthenticated'`).
4. **`src/components/Navbar.tsx` & `src/App.tsx`**:
   - Incorporación del indicador de sincronización en tiempo real en la barra de herramientas superior con enlace directo a la hoja de Google Drive.
