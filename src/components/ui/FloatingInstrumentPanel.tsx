import React, { useRef, useState, useCallback, useEffect } from 'react'
import type { InstrumentType } from '../../stores/useFloatingInstrumentsStore'
import { useFloatingInstrumentsStore } from '../../stores/useFloatingInstrumentsStore'

interface FloatingInstrumentPanelProps {
  type: InstrumentType
  title: string
  icon: string
  children: React.ReactNode
}

export const FloatingInstrumentPanel: React.FC<FloatingInstrumentPanelProps> = ({
  type,
  title,
  icon,
  children,
}) => {
  const {
    instruments,
    activeInstrument,
    hideInstrument,
    minimizeInstrument,
    restoreInstrument,
    setPosition,
    setSize,
    bringToFront,
  } = useFloatingInstrumentsStore()

  const state = instruments[type]
  const panelRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Handle drag start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('.panel-controls')) return
      if ((e.target as HTMLElement).closest('.resize-handle')) return
      bringToFront(type)
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - state.position.x,
        y: e.clientY - state.position.y,
      })
    },
    [state.position, type, bringToFront]
  )

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      bringToFront(type)
      setIsResizing(true)
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: state.size.width,
        height: state.size.height,
      })
    },
    [state.size, type, bringToFront]
  )

  // Handle drag
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffset.x))
      const newY = Math.max(0, Math.min(window.innerHeight - 50, e.clientY - dragOffset.y))
      setPosition(type, { x: newX, y: newY })
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, type, setPosition])

  // Handle resize
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      const newWidth = Math.max(300, Math.min(800, resizeStart.width + deltaX))
      const newHeight = Math.max(100, Math.min(400, resizeStart.height + deltaY))
      setSize(type, { width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => setIsResizing(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeStart, type, setSize])

  if (!state.isVisible) return null

  const isActive = activeInstrument === type
  const zIndex = isActive ? 1000 : 900

  // Minimized state
  if (state.isMinimized) {
    return (
      <div
        style={{ position: 'fixed', left: state.position.x, top: state.position.y, zIndex }}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-[#30e8e8]/50 cursor-pointer"
        onClick={() => restoreInstrument(type)}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="material-symbols-outlined text-[#30e8e8] text-sm">{icon}</span>
          <span className="text-xs font-medium text-slate-900 dark:text-white">{title}</span>
          <span className="material-symbols-outlined text-slate-400 text-sm ml-2">
            open_in_full
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        left: state.position.x,
        top: state.position.y,
        width: state.size.width,
        zIndex,
      }}
      className={`
        bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl 
        border-2 transition-colors duration-200
        ${isActive ? 'border-[#30e8e8]' : 'border-slate-300 dark:border-slate-600/50'}
      `}
      onMouseDown={() => bringToFront(type)}
    >
      {/* Minimal Header - mobile-optimized with close button on left */}
      <div
        className="relative flex items-center justify-between px-2 py-1.5 bg-gradient-to-r from-[#30e8e8]/10 to-transparent rounded-t-xl cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Close button - always on LEFT for easy access when dragged to right */}
        <button
          onClick={() => hideInstrument(type)}
          className="panel-controls w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-red-50 dark:hover:bg-red-900/40 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-all z-10 flex-shrink-0"
          title="Close"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        {/* Title - compact */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <span className="material-symbols-outlined text-[#30e8e8] text-base">{icon}</span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Minimize button - on right */}
        <button
          onClick={() => minimizeInstrument(type)}
          className="panel-controls w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all z-10 flex-shrink-0"
          title="Minimize"
        >
          <span className="material-symbols-outlined text-base">remove</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-2 overflow-auto" style={{ maxHeight: state.size.height }}>
        {children}
      </div>

      {/* Resize handle - bottom right corner, more visible */}
      <div
        className="resize-handle absolute -bottom-1 -right-1 w-8 h-8 cursor-se-resize group flex items-end justify-end p-1"
        onMouseDown={handleResizeStart}
        title="Drag to resize"
      >
        <div className="w-4 h-4 border-r-2 border-b-2 border-[#30e8e8]/40 group-hover:border-[#30e8e8] rounded-br transition-colors" />
      </div>
    </div>
  )
}

export default FloatingInstrumentPanel
