import { test, expect } from '@playwright/test'
import { LessonPage } from './pages/LessonPage'

test.describe('Lesson Completion Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing progress
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('user can complete a lesson by answering quizzes', async ({ page }) => {
    const lesson = new LessonPage(page)

    // Navigate to first lesson
    await lesson.navigateToLesson(1, '1.1')

    // Verify lesson loaded
    const title = await lesson.getLessonTitle()
    expect(title).toBeTruthy()

    // First section should be visible
    expect(await lesson.isSectionVisible(0)).toBe(true)

    // Second section should be hidden (gated by quiz)
    expect(await lesson.isSectionVisible(1)).toBe(false)

    // Answer first quiz to unlock next section
    // Note: Actual quiz answer depends on lesson content
    await lesson.answerQuiz('C')

    // Wait for section to reveal
    await page.waitForTimeout(500)

    // Second section should now be visible
    expect(await lesson.isSectionVisible(1)).toBe(true)

    // Complete all quizzes by using bypass button for testing
    await lesson.clickBypassButton()

    // Wait for all content to reveal
    await page.waitForTimeout(1000)

    // Lesson should be marked as completed
    expect(await lesson.isCompleted()).toBe(true)
  })

  test('progress persists after page reload', async ({ page }) => {
    const lesson = new LessonPage(page)

    // Complete a lesson
    await lesson.navigateToLesson(1, '1.1')
    await lesson.clickBypassButton()
    await page.waitForTimeout(500)

    // Verify completion
    expect(await lesson.isCompleted()).toBe(true)

    // Reload the page
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Completion status should persist
    expect(await lesson.isCompleted()).toBe(true)

    // All content should remain visible
    expect(await lesson.isSectionVisible(0)).toBe(true)
    expect(await lesson.isSectionVisible(1)).toBe(true)
  })

  test('progress dots navigation works', async ({ page }) => {
    const lesson = new LessonPage(page)

    await lesson.navigateToLesson(1, '1.1')

    // Check if progress dots are present
    const dotCount = await lesson.getProgressDotCount()

    if (dotCount > 1) {
      // Unlock all sections first
      await lesson.clickBypassButton()
      await page.waitForTimeout(500)

      // Click on second dot
      await lesson.clickProgressDot(1)

      // Page should scroll to second section
      await page.waitForTimeout(300)

      // Second section should be in viewport
      const section = page.locator('[data-testid="theory-section-1"]')
      expect(await section.isVisible()).toBe(true)
    }
  })
})
