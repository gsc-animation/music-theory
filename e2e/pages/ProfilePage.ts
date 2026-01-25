import { Page } from '@playwright/test'

/**
 * Page Object Model for Profile/Journey Map page
 * Encapsulates all interactions with the student profile and progress visualization
 */
export class ProfilePage {
  constructor(private page: Page) {}

  /**
   * Navigate to profile page
   */
  async navigate() {
    await this.page.goto('/')
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Get total XP displayed
   */
  async getTotalXP() {
    const xpText = await this.page.locator('[data-testid="total-xp"]').textContent()
    return parseInt(xpText?.replace(/\D/g, '') || '0', 10)
  }

  /**
   * Get current level
   */
  async getLevel() {
    const levelText = await this.page.locator('[data-testid="user-level"]').textContent()
    return parseInt(levelText?.replace(/\D/g, '') || '1', 10)
  }

  /**
   * Get completion percentage
   */
  async getCompletionPercentage() {
    const percentText = await this.page
      .locator('[data-testid="completion-percentage"]')
      .textContent()
    return parseInt(percentText?.replace(/\D/g, '') || '0', 10)
  }

  /**
   * Check if a lesson is marked as completed on the journey map
   */
  async isLessonCompleted(moduleId: number, lessonId: string) {
    const node = this.page.locator(`[data-testid="journey-node-${moduleId}-${lessonId}"]`)
    const classes = await node.getAttribute('class')
    return classes?.includes('completed')
  }

  /**
   * Click on a journey map node to navigate to that lesson
   */
  async clickJourneyNode(moduleId: number, lessonId: string) {
    await this.page.locator(`[data-testid="journey-node-${moduleId}-${lessonId}"]`).click()
  }

  /**
   * Check if a module is locked
   */
  async isModuleLocked(moduleId: number) {
    const module = this.page.locator(`[data-testid="journey-module-${moduleId}"]`)
    const classes = await module.getAttribute('class')
    return classes?.includes('locked')
  }

  /**
   * Get completed lesson count
   */
  async getCompletedLessonCount() {
    const count = await this.page.locator('[data-testid="completed-lessons-count"]').textContent()
    return parseInt(count?.replace(/\D/g, '') || '0', 10)
  }

  /**
   * Reset all progress (danger zone action)
   */
  async resetProgress() {
    await this.page.locator('[data-testid="reset-progress-button"]').click()
    // Confirm dialog
    await this.page.locator('[data-testid="confirm-reset"]').click()
  }
}
