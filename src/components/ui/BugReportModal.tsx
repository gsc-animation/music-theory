import React, { useState, useCallback } from 'react'
import { useBugReportStore } from '../../stores/useBugReportStore'

type TabType = 'actions' | 'console' | 'errors'

const formatTimestamp = (ts: number) => {
  const d = new Date(ts)
  return d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

/**
 * Bug Report Modal - shows logs and allows copying to clipboard
 */
export const BugReportModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('actions')
  const [copied, setCopied] = useState(false)

  const isModalOpen = useBugReportStore((state) => state.isModalOpen)
  const setModalOpen = useBugReportStore((state) => state.setModalOpen)
  const actions = useBugReportStore((state) => state.actions)
  const consoleLogs = useBugReportStore((state) => state.consoleLogs)
  const errors = useBugReportStore((state) => state.errors)
  const clearLogs = useBugReportStore((state) => state.clearLogs)
  const generateReport = useBugReportStore((state) => state.generateReport)

  const handleCopy = useCallback(async () => {
    const report = generateReport()
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }, [generateReport])

  const handleClose = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const handleClear = useCallback(() => {
    if (confirm('Xóa tất cả logs?')) {
      clearLogs()
    }
  }, [clearLogs])

  if (!isModalOpen) return null

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'actions', label: 'Actions', count: actions.length },
    { id: 'console', label: 'Console', count: consoleLogs.length },
    { id: 'errors', label: 'Errors', count: errors.length },
  ]

  return (
    <div className="bug-report-overlay" onClick={handleClose}>
      <div className="bug-report-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bug-report-header">
          <h2>
            <span className="material-symbols-outlined">bug_report</span>
            Bug Report
          </h2>
          <button onClick={handleClose} className="bug-report-close" aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bug-report-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`bug-report-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
              <span className="bug-report-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bug-report-content">
          {activeTab === 'actions' && (
            <div className="bug-report-logs">
              {actions.length === 0 ? (
                <p className="bug-report-empty">Không có actions nào được ghi nhận</p>
              ) : (
                actions
                  .slice()
                  .reverse()
                  .map((action) => (
                    <div key={action.id} className="bug-report-log-entry action">
                      <span className="log-time">{formatTimestamp(action.timestamp)}</span>
                      <span className="log-type">{action.type}</span>
                      <span className="log-details">{JSON.stringify(action.details)}</span>
                    </div>
                  ))
              )}
            </div>
          )}

          {activeTab === 'console' && (
            <div className="bug-report-logs">
              {consoleLogs.length === 0 ? (
                <p className="bug-report-empty">Không có console logs</p>
              ) : (
                consoleLogs
                  .slice()
                  .reverse()
                  .map((log) => (
                    <div key={log.id} className={`bug-report-log-entry console ${log.level}`}>
                      <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                      <span className={`log-level ${log.level}`}>{log.level.toUpperCase()}</span>
                      <span className="log-message">{log.args}</span>
                    </div>
                  ))
              )}
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="bug-report-logs">
              {errors.length === 0 ? (
                <p className="bug-report-empty">Không có errors - Tuyệt vời! 🎉</p>
              ) : (
                errors
                  .slice()
                  .reverse()
                  .map((error) => (
                    <div key={error.id} className="bug-report-log-entry error">
                      <span className="log-time">{formatTimestamp(error.timestamp)}</span>
                      <span className="log-error-name">{error.name}</span>
                      <span className="log-error-message">{error.message}</span>
                      {error.context && (
                        <span className="log-context">Context: {error.context}</span>
                      )}
                      {error.stack && <pre className="log-stack">{error.stack}</pre>}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bug-report-footer">
          <button onClick={handleClear} className="bug-report-btn secondary">
            <span className="material-symbols-outlined">delete</span>
            Clear
          </button>
          <button onClick={handleCopy} className="bug-report-btn primary">
            <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Đã copy!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BugReportModal
