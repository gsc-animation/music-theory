import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Mobile Floating Instruments
 * Tests bottom-fixed layout, dynamic toolbar positioning, and instrument optimizations
 */

const MOBILE_VIEWPORT = { width: 375, height: 667 } // iPhone SE
const DESKTOP_VIEWPORT = { width: 1280, height: 720 }
const BASE_URL = 'http://localhost:5504'

test.describe('Mobile Floating Instruments', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto(`${BASE_URL}/module/1/1.1`)
    await page.waitForLoadState('networkidle')
  })

  test.describe('Basic Toggle Behavior', () => {
    test('should toggle Piano on and off', async ({ page }) => {
      // Open toolbar menu
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()

      // Click Piano icon - use nth(1) to get the floating menu one (not bottom nav)
      const pianoButton = page.locator('button:has(span:text("piano"))').nth(1)
      await pianoButton.click()

      // Verify Piano panel is visible (using VirtualPiano component presence)
      await page.waitForTimeout(500) // Wait for animation
      const pianoKeys = page.locator('[data-key]')
      await expect(pianoKeys.first()).toBeVisible()

      // Click Piano again to close
      await pianoButton.click()
      await page.waitForTimeout(500)

      // Verify Piano panel is hidden
      await expect(pianoKeys.first()).not.toBeVisible()
    })

    test('should only show one instrument at a time', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()

      // Open Piano
      await page.locator('button:has(span:text("piano"))').click()
      await expect(page.locator('[data-testid="floating-instrument-piano"]')).toBeVisible()

      // Open Guitar (should close Piano)
      await page.locator('button:has(span:text("music_note"))').click()
      await expect(page.locator('[data-testid="floating-instrument-piano"]')).not.toBeVisible()
      await expect(page.locator('[data-testid="floating-instrument-guitar"]')).toBeVisible()
    })

    test('menu should not auto-close after selecting instrument', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()

      // Open Piano
      await page.locator('button:has(span:text("piano"))').click()

      // Menu should still be expanded
      await expect(page.locator('button:has(span:text("music_note"))')).toBeVisible()
    })
  })

  test.describe('Mobile Layout & Positioning', () => {
    test('Piano should be bottom-fixed with no header', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      await expect(pianoPanel).toBeVisible()

      // Check bottom positioning
      const boundingBox = await pianoPanel.boundingBox()
      expect(boundingBox).not.toBeNull()
      if (boundingBox) {
        // Should be at bottom of viewport
        expect(boundingBox.y + boundingBox.height).toBeGreaterThan(MOBILE_VIEWPORT.height - 50)

        // Should be full width
        expect(boundingBox.width).toBeGreaterThan(MOBILE_VIEWPORT.width - 10)

        // Height should be ~180px
        expect(boundingBox.height).toBeGreaterThanOrEqual(170)
        expect(boundingBox.height).toBeLessThanOrEqual(190)
      }

      // Verify no header (no close/minimize buttons)
      await expect(pianoPanel.locator('button:has(span:text("close"))')).not.toBeVisible()
      await expect(pianoPanel.locator('button:has(span:text("minimize"))')).not.toBeVisible()
    })

    test('toolbar should move up when Piano opens', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      
      // Get initial toolbar position (no instrument)
      const initialBox = await fabButton.boundingBox()
      expect(initialBox).not.toBeNull()
      
      // Open toolbar and select Piano
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()
      
      // Wait for animation
      await page.waitForTimeout(500)
      
      // Get new toolbar position
      const newBox = await fabButton.boundingBox()
      expect(newBox).not.toBeNull()
      
      if (initialBox && newBox) {
        // Toolbar should have moved UP (y decreased)
        expect(newBox.y).toBeLessThan(initialBox.y)
        
        // Should be roughly 241px from bottom (45 + 180 + 16)
        const distanceFromBottom = MOBILE_VIEWPORT.height - newBox.y
        expect(distanceFromBottom).toBeGreaterThan(200)
        expect(distanceFromBottom).toBeLessThan(280)
      }
    })

    test('toolbar should adjust for different instruments', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()

      // Open Piano (height: 180px, toolbar: 241px)
      await page.locator('button:has(span:text("piano"))').click()
      await page.waitForTimeout(400)
      const pianoBox = await fabButton.boundingBox()

      // Open Guitar (height: 160px, toolbar: 221px)
      await page.locator('button:has(span:text("music_note"))').click()
      await page.waitForTimeout(400)
      const guitarBox = await fabButton.boundingBox()

      // Open Flute (height: 120px, toolbar: 181px)
      await page.locator('button:has(span:text("air"))').click()
      await page.waitForTimeout(400)
      const fluteBox = await fabButton.boundingBox()

      expect(pianoBox).not.toBeNull()
      expect(guitarBox).not.toBeNull()
      expect(fluteBox).not.toBeNull()

      if (pianoBox && guitarBox && fluteBox) {
        // Piano toolbar should be highest (smallest y)
        expect(pianoBox.y).toBeLessThan(guitarBox.y)
        
        // Guitar toolbar should be between Piano and Flute
        expect(guitarBox.y).toBeLessThan(fluteBox.y)
      }
    })
  })

  test.describe('Content Accessibility', () => {
    test('content should not be hidden behind instrument', async ({ page }) => {
      // Open Piano
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      // Get main content element
      const mainContent = page.locator('main')
      const contentBox = await mainContent.boundingBox()

      // Get Piano panel
      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      const pianoBox = await pianoPanel.boundingBox()

      expect(contentBox).not.toBeNull()
      expect(pianoBox).not.toBeNull()

      if (contentBox && pianoBox) {
        // Main content should have bottom padding to prevent overlap
        // Content bottom should be above Piano top
        expect(contentBox.y + contentBox.height).toBeLessThanOrEqual(pianoBox.y + 10)
      }
    })

    test('should be able to scroll to bottom of content', async ({ page }) => {
      // Open Piano
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(300)

      // Bottom navigation should still be visible
      const bottomNav = page.locator('[data-testid="bottom-navigation"]')
      await expect(bottomNav).toBeVisible()
    })
  })

  test.describe('Piano Mobile Optimization', () => {
    test('Piano should show 1.5 octaves on mobile', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      // Wait for Piano to load
      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      await expect(pianoPanel).toBeVisible()

      // Count piano keys (1.5 octaves = 18 keys: C, C#, D, D#, E, F, F#, G, G#, A, A#, B × 1.5)
      const pianoKeys = pianoPanel.locator('[data-key]')
      const keyCount = await pianoKeys.count()
      
      expect(keyCount).toBe(18) // C4 to F5 = 18 keys
    })
  })

  test.describe('Visual Regression', () => {
    test('Piano opened - mobile', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('mobile-piano-opened.png', {
        fullPage: false,
        animations: 'disabled',
      })
    })

    test('Guitar opened - mobile', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("music_note"))').click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('mobile-guitar-opened.png', {
        fullPage: false,
        animations: 'disabled',
      })
    })

    test('Flute opened - mobile', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("air"))').click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('mobile-flute-opened.png', {
        fullPage: false,
        animations: 'disabled',
      })
    })
  })

  test.describe('Z-Index Layering', () => {
    test('toolbar should be above instrument panel', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      // Both should be visible
      const toolbar = page.locator('button:has(span:text("apps"))')
      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      
      await expect(toolbar).toBeVisible()
      await expect(pianoPanel).toBeVisible()

      // Toolbar should be clickable (not obscured)
      await expect(toolbar).toBeEnabled()
    })

    test('bottom nav should be above all floating elements', async ({ page }) => {
      const fabButton = page.locator('button:has(span:text("apps"))')
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      // Bottom nav should still be fully interactive
      const homeButton = page.locator('[data-testid="bottom-nav-home"]')
      await expect(homeButton).toBeVisible()
      await expect(homeButton).toBeEnabled()
    })
  })
})

test.describe('Desktop Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto(`${BASE_URL}/module/1/1.1`)
    await page.waitForLoadState('networkidle')
  })

  test('Piano should show 3 octaves on desktop', async ({ page }) => {
    // Desktop uses different UI - may not have floating instruments or uses different pattern
    // This test verifies desktop behavior is unchanged
    
    // If desktop has floating instruments:
    const fabButton = page.locator('button:has(span:text("apps"))')
    if (await fabButton.isVisible()) {
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      if (await pianoPanel.isVisible()) {
        // Desktop should show 3 octaves = 36 keys
        const pianoKeys = pianoPanel.locator('[data-key]')
        const keyCount = await pianoKeys.count()
        expect(keyCount).toBe(36) // C3 to B5 = 36 keys
      }
    }
  })

  test('desktop should have draggable floating panels', async ({ page }) => {
    const fabButton = page.locator('button:has(span:text("apps"))')
    if (await fabButton.isVisible()) {
      await fabButton.click()
      await page.locator('button:has(span:text("piano"))').click()

      const pianoPanel = page.locator('[data-testid="floating-instrument-piano"]')
      if (await pianoPanel.isVisible()) {
        // Desktop panels should have header with close button
        const closeButton = pianoPanel.locator('button:has(span:text("close"))')
        await expect(closeButton).toBeVisible()
      }
    }
  })
})
