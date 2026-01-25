import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = ({ children }: { children: ReactNode }) => <BrowserRouter>{children}</BrowserRouter>

  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Wait for audio events (mock implementation for tests)
 */
export function waitForAudio(timeout = 1000): Promise<void> {
  return new Promise((resolve) => {
    const handler = () => {
      window.removeEventListener('audio-playback-started', handler)
      resolve()
    }
    window.addEventListener('audio-playback-started', handler)
    setTimeout(() => {
      window.removeEventListener('audio-playback-started', handler)
      resolve()
    }, timeout)
  })
}

/**
 * Set up localStorage with specific state
 */
export function setupLocalStorage(state: Record<string, any>) {
  Object.entries(state).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value))
  })
}

/**
 * Clear all test state
 */
export function clearTestState() {
  localStorage.clear()
  sessionStorage.clear()
}

/**
 * Simulate quiz completion
 */
export async function completeQuiz(
  getByTestId: (id: string) => HTMLElement,
  answer: string,
) {
  const answerInput = getByTestId('quiz-answer')
  const submitButton = getByTestId('quiz-submit')

  // Type answer
  answerInput.setAttribute('value', answer)

  // Submit
  submitButton.click()

  // Wait for feedback
  await new Promise((resolve) => setTimeout(resolve, 500))
}
