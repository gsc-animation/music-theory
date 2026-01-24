import React from 'react'
import type { AbcDemo } from '../../data/course-data'
import { AbcRenderer } from '../abc/AbcRenderer'

interface AbcDemoSectionProps {
  demos: AbcDemo[]
}

/**
 * AbcDemoSection - Renders multiple ABC notation demos with playback
 * Uses the unified AbcRenderer component for all ABC notation rendering
 */
export const AbcDemoSection: React.FC<AbcDemoSectionProps> = ({ demos }) => {
  return (
    <div className="space-y-6">
      {demos.map((demo) => (
        <AbcRenderer
          key={demo.id}
          abc={demo.abc}
          title={demo.title}
          description={demo.description}
          showPlayButton={demo.playable}
        />
      ))}
    </div>
  )
}

export default AbcDemoSection
