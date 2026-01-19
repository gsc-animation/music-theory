import React, { useState } from 'react'

interface SidebarProps {
  className?: string
}

const NAV_ITEMS = [
  'Intervals',
  'Scales',
  'Chords',
  'Standards',
  'Semdations',
  'Chords',
  'Programmens',
  'Attaitis',
  'Contents',
]

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <aside
      className={`
        ${isOpen ? 'w-48' : 'w-14'}
        bg-gradient-to-b from-[#1a5a5c] to-[#134445]
        text-white
        flex flex-col
        transition-all duration-300
        shadow-xl
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-3 flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpen && (
          <div>
            <h1 className="text-sm font-bold">Music Theory</h1>
            <p className="text-xs text-white/70">Lessons</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2">
        {NAV_ITEMS.map((item, index) => (
          <button
            key={`${item}-${index}`}
            onClick={() => setActiveItem(item)}
            className={`
              w-full text-left px-4 py-2.5 text-sm
              hover:bg-white/10 transition-colors
              ${activeItem === item ? 'bg-white/20 border-l-2 border-white' : ''}
              ${!isOpen ? 'text-center px-0' : ''}
            `}
          >
            {isOpen ? item : item.charAt(0)}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
