import React, { useState, useEffect, useCallback } from 'react'

interface CollapsiblePanelProps {
  title: string
  icon?: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
  /**
   * Unique identifier for persisting the collapse/expand state.
   * If not provided, the title will be used as the id.
   */
  persistId?: string
  /**
   * Extra content to render in the header (e.g., checkbox, buttons)
   */
  headerExtra?: React.ReactNode
}

const STORAGE_KEY_PREFIX = 'collapsible-panel-state:'

/**
 * Collapsible panel using native details/summary elements
 * Matches the HTML example styling with chevron rotation
 * State is persisted to localStorage using the persistId or title
 */
export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  icon,
  defaultOpen = true,
  children,
  className = '',
  persistId,
  headerExtra,
}) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${persistId || title}`

  // Initialize state from localStorage or use defaultOpen
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultOpen
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      return stored === 'true'
    }
    return defaultOpen
  })

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(storageKey, String(isOpen))
  }, [isOpen, storageKey])

  const handleToggle = useCallback((e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(e.currentTarget.open)
  }, [])

  return (
    <details
      className={`
        group rounded-2xl border border-slate-200/80 dark:border-slate-700/80
        bg-white dark:bg-slate-800/95 shadow-lg shadow-slate-900/5 dark:shadow-black/20
        overflow-hidden transition-all duration-300 ease-out
        open:shadow-xl open:shadow-slate-900/10 dark:open:shadow-black/30
        hover:border-slate-300 dark:hover:border-slate-600
        ${className}
      `}
      open={isOpen}
      onToggle={handleToggle}
    >
      {/* Gradient accent bar at top */}
      <div className="h-1 bg-gradient-to-r from-[#30e8e8] via-[#26d4d4] to-[#1f9d9d] opacity-80 group-open:opacity-100 transition-opacity" />
      
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 list-none select-none hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-all duration-200">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#30e8e8]/10 dark:bg-[#30e8e8]/20">
              <span className="material-symbols-outlined text-[#30e8e8] text-xl">{icon}</span>
            </div>
          )}
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            {title}
          </span>
          {headerExtra && (
            <div className="ml-2" onClick={(e) => e.stopPropagation()}>
              {headerExtra}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700/50 group-hover:bg-slate-200 dark:group-hover:bg-slate-600/50 transition-colors">
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-lg transition-transform duration-300 ease-out group-open:rotate-180">
            expand_more
          </span>
        </div>
      </summary>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </details>
  )
}

export default CollapsiblePanel
