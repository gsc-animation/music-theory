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
        group rounded-xl border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 shadow-soft overflow-hidden
        transition-all duration-200 open:shadow-md
        ${className}
      `}
      open={isOpen}
      onToggle={handleToggle}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3 p-2 list-none select-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
        <div className="flex items-center gap-2">
          {icon && <span className="material-symbols-outlined text-[#30e8e8] text-lg">{icon}</span>}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
            {title}
          </span>
          {headerExtra && (
            <div className="ml-2" onClick={(e) => e.stopPropagation()}>
              {headerExtra}
            </div>
          )}
        </div>
        <span className="material-symbols-outlined text-slate-400 text-base transition-transform duration-200 group-open:rotate-180">
          expand_more
        </span>
      </summary>
      <div className="p-4 pt-0">{children}</div>
    </details>
  )
}

export default CollapsiblePanel
