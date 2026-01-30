import React, { Suspense, useState } from 'react'
import { CollapsiblePanel } from '../ui/CollapsiblePanel'

const AbcGrandStaff = React.lazy(() => import('./AbcGrandStaff'))

interface InlineGrandStaffProps {
  /** Title displayed in header */
  title?: string
  /** ABC notation to render */
  abc: string
  /** Optional CSS class */
  className?: string
}

/**
 * InlineGrandStaff - Thin wrapper that reuses AbcGrandStaff with CollapsiblePanel
 * Used within theoryContent via {{grandStaff:Title|ABC_NOTATION}} syntax
 */
export const InlineGrandStaff: React.FC<InlineGrandStaffProps> = ({
  title,
  abc,
  className = '',
}) => {
  const [showNoteNames, setShowNoteNames] = useState(false)

  // Process ABC - convert escaped newlines to actual newlines
  const processedAbc = abc.replace(/\\n/g, '\n')

  return (
    <div className={`my-6 ${className}`}>
      <CollapsiblePanel
        title={title || 'Grand Staff View'}
        icon="music_note"
        defaultOpen
        headerExtra={
          <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
            <input
              type="checkbox"
              checked={showNoteNames}
              onChange={(e) => setShowNoteNames(e.target.checked)}
              className="w-3 h-3 accent-[#30e8e8]"
            />
            <span>Notes</span>
          </label>
        }
      >
        <Suspense
          fallback={
            <div className="w-full h-[150px] flex items-center justify-center text-slate-400">
              Loading staff...
            </div>
          }
        >
          <AbcGrandStaff showNoteNames={showNoteNames} overrideAbc={processedAbc} />
        </Suspense>
      </CollapsiblePanel>
    </div>
  )
}

export default InlineGrandStaff
