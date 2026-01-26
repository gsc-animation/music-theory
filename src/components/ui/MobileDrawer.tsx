import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'left' | 'right'
}

/**
 * Mobile drawer component - slides in from the side with backdrop
 * Used for mobile navigation, settings, etc.
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
  side = 'left',
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sideClasses = side === 'left' ? 'left-0' : 'right-0'

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        data-testid="mobile-drawer-backdrop"
        className="mobile-drawer-backdrop fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        data-testid="mobile-drawer"
        className={`
          fixed top-0 ${sideClasses} bottom-0 z-50
          w-[280px] max-w-[85vw]
          bg-white dark:bg-[#1a1d21]
          shadow-2xl
          mobile-drawer-slide-in
          overflow-y-auto
        `}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>,
    document.body
  )
}

export default MobileDrawer
