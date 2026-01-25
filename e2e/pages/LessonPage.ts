import { Page } from '@playwright/test'

/**
 * Page Object Model for Lesson/Submodule pages
 * Encapsulates all interactions with lesson pages
 */
export class LessonPage {
  constructor(private page: Page) {}

  /**
   * Navigate to a specific lesson
   */
  async navigateToLesson(moduleId: number, lessonId: string) {
    await this.page.goto(`/module/${moduleId}/${lessonId}`)
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Get the lesson title
   */
  async getLessonTitle() {
    return await this.page.locator('[data-testid="submodule-title"]').textContent()
  }

  /**
   * Check if a section is visible
   */
  async isSectionVisible(sectionIndex: number) {
    const section = this.page.locator(`[data-testid="theory-section-${sectionIndex}"]`)
    return await section.isVisible()
  }

  /**
   * Answer a quiz question
   */
  async answerQuiz(answer: string) {
    // Wait for quiz to be visible
    await this.page.waitForSelector('[data-testid="inline-quiz"]', { state: 'visible' })

    // Type answer
    const input = this.page.locator('[data-testid="quiz-answer-input"]')
    await input.fill(answer)

    // Submit
    await this.page.locator('[data-testid="quiz-submit"]').click()

    // Wait for response
    await this.page.waitForTimeout(500)
  }

  /**
   * Click the bypass button to reveal all content
   */
  async clickBypassButton() {
    await this.page.locator('[data-testid="bypass-button"]').click()
  }

  /**
   * Check if lesson is marked as completed
   */
  async isCompleted() {
    const badge = this.page.locator('[data-testid="completion-badge"]')
    return await badge.isVisible()
  }

  /**
   * Click on a progress dot to navigate
   */
  async clickProgressDot(index: number) {
    await this.page.locator(`[data-testid="progress-dot-${index}"]`).click()
  }

  /**
   * Get number of visible progress dots
   */
  async getProgressDotCount() {
    const dots = await this.page.locator('[data-testid^="progress-dot-"]').count()
    return dots
  }

  /**
   * Play an ABC demo
   */
  async playAbcDemo(demoId: string) {
    await this.page.locator(`[data-testid="abc-play-${demoId}"]`).click()
  }

  /**
   * Check if audio is playing (looks for visual indicator)
   */
  async isAudioPlaying() {
    return await this.page.locator('[data-testid="audio-playing-indicator"]').isVisible()
  }
}
