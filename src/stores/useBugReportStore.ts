import { create } from 'zustand'

interface ActionLog {
  id: string
  timestamp: number
  type: string
  details: Record<string, unknown>
}

interface ConsoleLog {
  id: string
  timestamp: number
  level: 'log' | 'warn' | 'error' | 'info'
  args: string
}

interface ErrorLog {
  id: string
  timestamp: number
  name: string
  message: string
  stack?: string
  context?: string
}

interface BugReportState {
  actions: ActionLog[]
  consoleLogs: ConsoleLog[]
  errors: ErrorLog[]
  isModalOpen: boolean
  isInitialized: boolean

  // Actions
  logAction: (type: string, details: Record<string, unknown>) => void
  logConsole: (level: ConsoleLog['level'], args: unknown[]) => void
  logError: (error: Error, context?: string) => void
  clearLogs: () => void
  setModalOpen: (open: boolean) => void
  generateReport: () => string
  initializeInterceptors: () => void
}

const MAX_ACTIONS = 50
const MAX_CONSOLE_LOGS = 100
const MAX_ERRORS = 20

const generateId = () => Math.random().toString(36).substring(2, 9)

const formatTimestamp = (ts: number) => {
  const d = new Date(ts)
  return (
    d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }) +
    '.' +
    String(d.getMilliseconds()).padStart(3, '0')
  )
}

const stringifyArgs = (args: unknown[]): string => {
  return args
    .map((arg) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2)
        } catch {
          return String(arg)
        }
      }
      return String(arg)
    })
    .join(' ')
}

export const useBugReportStore = create<BugReportState>((set, get) => ({
  actions: [],
  consoleLogs: [],
  errors: [],
  isModalOpen: false,
  isInitialized: false,

  logAction: (type, details) => {
    const action: ActionLog = {
      id: generateId(),
      timestamp: Date.now(),
      type,
      details,
    }
    set((state) => ({
      actions: [...state.actions.slice(-MAX_ACTIONS + 1), action],
    }))
  },

  logConsole: (level, args) => {
    const log: ConsoleLog = {
      id: generateId(),
      timestamp: Date.now(),
      level,
      args: stringifyArgs(args),
    }
    set((state) => ({
      consoleLogs: [...state.consoleLogs.slice(-MAX_CONSOLE_LOGS + 1), log],
    }))
  },

  logError: (error, context) => {
    const errorLog: ErrorLog = {
      id: generateId(),
      timestamp: Date.now(),
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
    }
    set((state) => ({
      errors: [...state.errors.slice(-MAX_ERRORS + 1), errorLog],
    }))
  },

  clearLogs: () => set({ actions: [], consoleLogs: [], errors: [] }),

  setModalOpen: (open) => set({ isModalOpen: open }),

  generateReport: () => {
    const { actions, consoleLogs, errors } = get()
    const now = new Date()

    let report = `=== BUG REPORT ===\n`
    report += `Generated: ${now.toLocaleString('vi-VN')}\n`
    report += `URL: ${window.location.href}\n`
    report += `User Agent: ${navigator.userAgent}\n`
    report += `Viewport: ${window.innerWidth}x${window.innerHeight}\n`
    report += `\n`

    // Actions
    report += `=== RECENT ACTIONS (${actions.length}) ===\n`
    if (actions.length === 0) {
      report += `(no actions recorded)\n`
    } else {
      actions.forEach((a) => {
        report += `[${formatTimestamp(a.timestamp)}] ${a.type}: ${JSON.stringify(a.details)}\n`
      })
    }
    report += `\n`

    // Console logs
    report += `=== CONSOLE LOGS (${consoleLogs.length}) ===\n`
    if (consoleLogs.length === 0) {
      report += `(no console logs)\n`
    } else {
      consoleLogs.forEach((c) => {
        report += `[${c.level.toUpperCase()}] [${formatTimestamp(c.timestamp)}] ${c.args}\n`
      })
    }
    report += `\n`

    // Errors
    report += `=== ERRORS (${errors.length}) ===\n`
    if (errors.length === 0) {
      report += `(no errors)\n`
    } else {
      errors.forEach((e) => {
        report += `[${formatTimestamp(e.timestamp)}] ${e.name}: ${e.message}\n`
        if (e.context) report += `  Context: ${e.context}\n`
        if (e.stack)
          report += `  Stack:\n${e.stack
            .split('\n')
            .map((l) => '    ' + l)
            .join('\n')}\n`
      })
    }

    return report
  },

  initializeInterceptors: () => {
    if (get().isInitialized) return
    set({ isInitialized: true })

    const store = get()

    // Intercept console methods
    const originalConsole = {
      log: console.log.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console),
    }

    console.log = (...args: unknown[]) => {
      originalConsole.log(...args)
      store.logConsole('log', args)
    }

    console.warn = (...args: unknown[]) => {
      originalConsole.warn(...args)
      store.logConsole('warn', args)
    }

    console.error = (...args: unknown[]) => {
      originalConsole.error(...args)
      store.logConsole('error', args)
    }

    console.info = (...args: unknown[]) => {
      originalConsole.info(...args)
      store.logConsole('info', args)
    }

    // Global error handler
    window.addEventListener('error', (event) => {
      store.logError(event.error || new Error(event.message), 'window.onerror')
    })

    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
      store.logError(error, 'unhandledrejection')
    })

    // Log navigation changes
    const logNavigation = () => {
      store.logAction('navigation', {
        path: window.location.pathname,
        search: window.location.search,
      })
    }

    window.addEventListener('popstate', logNavigation)

    // Initial navigation log
    logNavigation()
  },
}))
