import React from 'react'

interface CollapsiblePanelProps {
  title: string
  icon?: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Collapsible panel using native details/summary elements
 * Matches the HTML example styling with chevron rotation
 */
export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  icon,
  defaultOpen = true,
  children,
  className = '',
}) => {
  return (
    <details
      className={`
        group rounded-xl border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 shadow-soft overflow-hidden
        transition-all duration-200 open:shadow-md
        ${className}
      `}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 list-none select-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="material-symbols-outlined text-[#30e8e8] text-xl">
              {icon}
            </span>
          )}
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
            {title}
          </span>
        </div>
        <span className="material-symbols-outlined text-slate-400 text-lg transition-transform duration-200 group-open:rotate-180">
          expand_more
        </span>
      </summary>
      <div className="p-4 pt-0">
        {children}
      </div>
    </details>
  )
}

export default CollapsiblePanel
