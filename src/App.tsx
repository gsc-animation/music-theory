import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MainLayout } from './components/layout/MainLayout'
import './App.css'
import { useSettingsStore } from './stores/useSettingsStore'
import { useProgressStore } from './stores/useProgressStore'
import { useEffect, lazy, Suspense } from 'react'

// Lazy load pages for better performance
const SubmodulePage = lazy(() => import('./pages/SubmodulePage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

function App() {
  const theme = useSettingsStore((state) => state.theme)
  const updateStreak = useProgressStore((state) => state.updateStreak)

  // Update streak on app load
  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  // Listen for system theme changes if we are in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(mediaQuery.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-slate-400">Loading...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/module/:moduleId/:submoduleId" element={<SubmodulePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
