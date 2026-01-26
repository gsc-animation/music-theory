import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { BottomNavigation } from './BottomNavigation'
import { useIsMobile } from '../../hooks/useMediaQuery'
import { useNavigate } from 'react-router-dom'

interface AppLayoutProps {
  children: React.ReactNode
  className?: string
  showMobileNav?: boolean // Option to hide bottom nav on certain pages
}

/**
 * AppLayout - Manages responsive layout with hybrid approach
 * Mobile (<768px): MobileHeader + BottomNavigation
 * Desktop (≥768px): Sidebar + existing header
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className,
  showMobileNav = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const openMobileMenu = () => setIsMobileMenuOpen(true)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleSettings = () => {
    // TODO: Open settings modal/page
    console.log('Settings clicked')
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  // Mobile layout (<768px)
  if (isMobile) {
    return (
      <div
        className={`flex flex-col min-h-screen bg-[#F5F7FA] dark:bg-[#121212] ${className || ''}`}
      >
        {/* Mobile Header */}
        <MobileHeader onSettings={handleSettings} onProfile={handleProfile} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>

        {/* Bottom Navigation */}
        {showMobileNav && <BottomNavigation />}
      </div>
    )
  }

  // Desktop layout (≥768px) - Keep existing sidebar pattern
  return (
    <div className={`flex min-h-screen bg-[#F5F7FA] dark:bg-[#121212] ${className || ''}`}>
      {/* Desktop Sidebar - hidden on mobile */}
      <Sidebar
        className="hidden md:flex"
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={closeMobileMenu}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Menu Button - only shown on mobile */}
        {isMobile && (
          <button
            data-testid="mobile-menu-button"
            onClick={openMobileMenu}
            className="fixed top-4 left-4 z-30 w-10 h-10 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center touch-target-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors md:hidden"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 text-[24px]">
              menu
            </span>
          </button>
        )}

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
}

export default AppLayout
