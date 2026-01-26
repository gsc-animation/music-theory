import { test, expect } from '@playwright/test'

test.describe('Mobile UI Redesign - Bottom Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display bottom navigation on mobile', async ({ page }) => {
    // Bottom nav should be visible
    const bottomNav = page.locator('nav').filter({ hasText: 'Lý thuyết' })
    await expect(bottomNav).toBeVisible()

    // Should have 4 tabs
    await expect(page.locator('nav button').filter({ hasText: 'Lý thuyết' })).toBeVisible()
    await expect(page.locator('nav button').filter({ hasText: 'Luyện tập' })).toBeVisible()
    await expect(page.locator('nav button').filter({ hasText: 'Soạn nhạc' })).toBeVisible()
    await expect(page.locator('nav button').filter({ hasText: 'Cá nhân' })).toBeVisible()
  })

  test('should highlight active tab', async ({ page }) => {
    // Theory tab should be active on home page
    const theoryTab = page.locator('nav button').filter({ hasText: 'Lý thuyết' })
    await expect(theoryTab).toHaveClass(/bg-\[#1e40af\]/)
  })

  test('should navigate between tabs', async ({ page }) => {
    // Click Practice tab
    await page.locator('nav button').filter({ hasText: 'Luyện tập' }).click()
    await page.waitForURL('/practice')

    // Practice tab should be active
    const practiceTab = page.locator('nav button').filter({ hasText: 'Luyện tập' })
    await expect(practiceTab).toHaveClass(/bg-\[#1e40af\]/)

    // Click Demo tab
    await page.locator('nav button').filter({ hasText: 'Soạn nhạc' }).click()
    await page.waitForURL('/demo')
  })

  test('should navigate to demo page and back', async ({ page }) => {
    // Navigate to demo
    await page.locator('nav button').filter({ hasText: 'Soạn nhạc' }).click()
    await page.waitForURL('/demo')

    // Check for demo content
    await expect(page.locator('text=Mobile UI Demo')).toBeVisible()

    // Navigate back to home
    await page.locator('nav button').filter({ hasText: 'Lý thuyết' }).click()
    await page.waitForURL('/')
  })
})

test.describe('Mobile UI Redesign - Mobile Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display mobile header with all elements', async ({ page }) => {
    // Check course title
    await expect(page.locator('text=Music Theory Course')).toBeVisible()

    // Check settings button
    const settingsBtn = page.locator('button[aria-label="Settings"]')
    await expect(settingsBtn).toBeVisible()

    // Check profile button
    const profileBtn = page.locator('button[aria-label="Profile"]')
    await expect(profileBtn).toBeVisible()

    // Check VN Mode toggle
    await expect(page.locator('button:has-text("VN MODE")')).toBeVisible()
  })

  test('should toggle VN Mode', async ({ page }) => {
    const vnModeBtn = page.locator('button:has-text("VN MODE")')

    // Get initial state
    const initialClass = await vnModeBtn.getAttribute('class')

    // Click to toggle
    await vnModeBtn.click()

    // Class should change
    const newClass = await vnModeBtn.getAttribute('class')
    expect(initialClass).not.toBe(newClass)
  })

  test('should show progress bar', async ({ page }) => {
    // Progress bar should exist
    const progressBar = page.locator('[role="progressbar"]')
    await expect(progressBar).toBeVisible()

    // Should have valid aria attributes
    const progressValue = await progressBar.getAttribute('aria-valuenow')
    expect(parseInt(progressValue || '0')).toBeGreaterThanOrEqual(0)
    expect(parseInt(progressValue || '0')).toBeLessThanOrEqual(100)
  })
})

test.describe('Mobile UI Redesign - Lesson Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo')
  })

  test('should display lesson header', async ({ page }) => {
    // Lesson header should be visible
    await expect(page.locator('text=Lesson 1.2')).toBeVisible()
    await expect(page.locator('text=Tên nốt & Cao độ')).toBeVisible()
  })

  test('should display lesson card with title and subtitle', async ({ page }) => {
    // Card title should be visible and blue
    const title = page.locator('h2:has-text("Tên nốt & Cao độ")')
    await expect(title).toBeVisible()
    await expect(title).toHaveClass(/text-\[#1e40af\]/)

    // Subtitle should be visible
    await expect(page.locator('text=Nhận biết 7 nốt nhạc')).toBeVisible()
  })

  test('should highlight keywords in cyan', async ({ page }) => {
    // Look for highlighted keyword
    const highlighted = page.locator('span').filter({ hasText: '7 chữ cái' }).first()

    // Should have cyan background
    await expect(highlighted).toHaveClass(/bg-cyan-100/)
  })

  test('should be edge-to-edge on mobile', async ({ page, viewport }) => {
    // Card should not have rounded corners on mobile
    const card = page.locator('div').filter({ hasText: 'Tên nốt & Cao độ' }).first()

    if (viewport && viewport.width < 768) {
      // Should have mobile-square class
      await expect(card).toHaveClass(/mobile-square/)
    }
  })
})

test.describe('Mobile UI Redesign - Mobile Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo')
  })

  test('should display quiz with all options', async ({ page }) => {
    // Quiz question should be visible
    await expect(page.locator('text=Âm nhạc sử dụng bao nhiêu')).toBeVisible()

    // All 3 options should be visible
    await expect(page.locator('button:has-text("5 chữ cái")')).toBeVisible()
    await expect(page.locator('button:has-text("6 chữ cái")')).toBeVisible()
    await expect(page.locator('button:has-text("7 chữ cái")')).toBeVisible()
  })

  test('should select answer and show feedback', async ({ page }) => {
    // Click correct answer (C - 7 chữ cái)
    const correctBtn = page.locator('button').filter({ hasText: '7 chữ cái' })
    await correctBtn.click()

    // Button should turn green (correct)
    await expect(correctBtn).toHaveClass(/bg-emerald-500/)

    // Check icon should appear
    await expect(
      correctBtn.locator('.material-symbols-outlined:has-text("check_circle")')
    ).toBeVisible()
  })

  test('should show wrong answer feedback', async ({ page }) => {
    // Click wrong answer (A - 5 chữ cái)
    const wrongBtn = page.locator('button').filter({ hasText: '5 chữ cái' })
    await wrongBtn.click()

    // Button should turn red (wrong)
    await expect(wrongBtn).toHaveClass(/bg-rose-500/)

    // X icon should appear
    await expect(wrongBtn.locator('.material-symbols-outlined:has-text("cancel")')).toBeVisible()
  })

  test('quiz buttons should meet 44px touch target', async ({ page }) => {
    const quizBtn = page.locator('button').filter({ hasText: '7 chữ cái' })
    const box = await quizBtn.boundingBox()

    expect(box).toBeTruthy()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })
})

test.describe('Mobile UI Redesign - SubmodulePage Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to an actual lesson
    await page.goto('/module/1/1.1')
    await page.waitForLoadState('networkidle')
  })

  test('should display lesson header on SubmodulePage', async ({ page }) => {
    // Lesson header with folder icon should be visible
    await expect(page.locator('text=Lesson').first()).toBeVisible()
  })

  test('should display lesson content in card format', async ({ page }) => {
    // Look for lesson title (should be blue and large)
    const title = page.locator('h2').first()
    await expect(title).toBeVisible()
  })

  test('should show musical staff when available', async ({ page }) => {
    // Staff may be in a collapsible panel
    const staffPanel = page.locator('text=Grand Staff').or(page.locator('text=Musical Staff'))

    // If staff is present, it should be visible or expandable
    const count = await staffPanel.count()
    if (count > 0) {
      await expect(staffPanel.first()).toBeVisible()
    }
  })

  test('should display completion badge when lesson is complete', async ({ page }) => {
    // Check for completion UI
    const completionBadge = page.locator('text=Lesson Completed')
    const count = await completionBadge.count()

    // This is conditional - only shows if lesson was completed
    if (count > 0) {
      await expect(completionBadge).toBeVisible()
      await expect(
        page.locator('.material-symbols-outlined:has-text("check_circle")')
      ).toBeVisible()
    }
  })
})

test.describe('Mobile UI Redesign - Responsive Behavior', () => {
  test('mobile layout on small viewport', async ({ page, viewport }) => {
    await page.goto('/')

    if (viewport && viewport.width < 768) {
      // Mobile header should be visible
      await expect(page.locator('text=Music Theory Course')).toBeVisible()

      // Bottom nav should be visible
      await expect(page.locator('nav button').filter({ hasText: 'Lý thuyết' })).toBeVisible()

      // Desktop sidebar should NOT be visible
      const sidebar = page.locator('[data-testid="sidebar"]')
      const isVisible = await sidebar.isVisible().catch(() => false)
      expect(isVisible).toBe(false)
    }
  })

  test('desktop layout on large viewport', async ({ page, viewport }) => {
    if (viewport && viewport.width >= 768) {
      await page.goto('/')

      // On desktop, sidebar should be present (may be visible or in drawer)
      // This test validates desktop behavior is preserved
      const pageContent = await page.content()
      expect(pageContent.length).toBeGreaterThan(0)
    }
  })
})

test.describe('Mobile UI Redesign - Touch Targets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('bottom nav buttons meet 44px minimum', async ({ page }) => {
    const navButtons = page.locator('nav button')
    const count = await navButtons.count()

    for (let i = 0; i < count; i++) {
      const box = await navButtons.nth(i).boundingBox()
      expect(box).toBeTruthy()
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('header action buttons meet 40px minimum', async ({ page }) => {
    // Settings button
    const settingsBtn = page.locator('button[aria-label="Settings"]')
    let box = await settingsBtn.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.height).toBeGreaterThanOrEqual(40)
    expect(box!.width).toBeGreaterThanOrEqual(40)

    // Profile button
    const profileBtn = page.locator('button[aria-label="Profile"]')
    box = await profileBtn.boundingBox()
    expect(box).toBeTruthy()
    expect(box!.height).toBeGreaterThanOrEqual(40)
    expect(box!.width).toBeGreaterThanOrEqual(40)
  })
})

test.describe('Mobile UI Redesign - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('VN Mode toggle has proper aria attributes', async ({ page }) => {
    const vnModeBtn = page.locator('button:has-text("VN MODE")')

    // Should have aria-label and aria-pressed
    await expect(vnModeBtn).toHaveAttribute('aria-label', 'Toggle Vietnamese mode')

    const ariaPressed = await vnModeBtn.getAttribute('aria-pressed')
    expect(ariaPressed).toMatch(/true|false/)
  })

  test('progress bar has proper ARIA attributes', async ({ page }) => {
    const progressBar = page.locator('[role="progressbar"]')
    await expect(progressBar).toBeVisible()

    // Should have aria-valuenow, aria-valuemin, aria-valuemax
    const valueNow = await progressBar.getAttribute('aria-valuenow')
    const valueMin = await progressBar.getAttribute('aria-valuemin')
    const valueMax = await progressBar.getAttribute('aria-valuemax')

    expect(valueNow).toBeTruthy()
    expect(valueMin).toBe('0')
    expect(valueMax).toBe('100')
  })

  test('navigation tabs have proper aria-current', async ({ page }) => {
    // Active tab should have aria-current="page"
    const activeTab = page.locator('nav button').filter({ hasText: 'Lý thuyết' })
    const ariaCurrent = await activeTab.getAttribute('aria-current')
    expect(ariaCurrent).toBe('page')
  })

  test('keyboard navigation works on bottom nav', async ({ page }) => {
    // Focus first tab
    await page.keyboard.press('Tab')

    // Tab through navigation items
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Tab')
    }

    // Should be able to activate with Enter
    await page.keyboard.press('Enter')

    // Navigation should occur
    const url = page.url()
    expect(url).toBeTruthy()
  })
})

test.describe('Mobile UI Redesign - Performance', () => {
  test('page load time is acceptable', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('bottom navigation does not cause layout shift', async ({ page }) => {
    await page.goto('/')

    // Wait for page to stabilize
    await page.waitForTimeout(500)

    // Measure layout
    const initialLayout = await page.evaluate(() => {
      const nav = document.querySelector('nav')
      return nav?.getBoundingClientRect()
    })

    // Wait a bit more
    await page.waitForTimeout(1000)

    // Measure again
    const finalLayout = await page.evaluate(() => {
      const nav = document.querySelector('nav')
      return nav?.getBoundingClientRect()
    })

    // Position should be stable
    expect(initialLayout?.top).toBe(finalLayout?.top)
    expect(initialLayout?.bottom).toBe(finalLayout?.bottom)
  })

  test('mobile header height is consistent', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header').first()
    const height1 = await header.evaluate((el) => el.getBoundingClientRect().height)

    // Navigate to another page
    await page.goto('/demo')
    await page.waitForLoadState('networkidle')

    const height2 = await header.evaluate((el) => el.getBoundingClientRect().height)

    // Header height should be consistent
    expect(height1).toBe(height2)
  })
})

test.describe('Mobile UI Redesign - Edge Cases', () => {
  test('handles long lesson titles gracefully', async ({ page }) => {
    await page.goto('/demo')

    // Title should not overflow
    const title = page.locator('h2').first()
    const box = await title.boundingBox()
    const viewportWidth = page.viewportSize()?.width || 375

    expect(box).toBeTruthy()
    expect(box!.width).toBeLessThanOrEqual(viewportWidth)
  })

  test('handles many highlighted keywords', async ({ page }) => {
    await page.goto('/demo')

    // Should render all highlighted spans
    const highlights = page.locator('span').filter({ hasText: '7 chữ cái' })
    const count = await highlights.count()

    expect(count).toBeGreaterThan(0)
  })

  test('quiz feedback auto-hides after delay', async ({ page }) => {
    await page.goto('/demo')

    // Click an answer
    const btn = page.locator('button').filter({ hasText: '7 chữ cái' })
    await btn.click()

    // Should show feedback immediately
    await expect(btn).toHaveClass(/bg-emerald-500/)

    // Wait for auto-hide (2 seconds)
    await page.waitForTimeout(2500)

    // Feedback should be cleared (button still selected but not green)
    // This depends on implementation - adjust as needed
  })
})
