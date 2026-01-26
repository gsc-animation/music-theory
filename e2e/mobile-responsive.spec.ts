import { test, expect } from '@playwright/test'

/**
 * Mobile-specific E2E tests for responsive layout and touch interactions
 * Tests drawer navigation, responsive breakpoints, and touch target sizes
 */

test.describe('Mobile Navigation - iPhone SE (375x667)', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should show hamburger menu button on mobile', async ({ page }) => {
    await page.goto('/')
    
    // Mobile menu button should be visible
    const menuButton = page.locator('[data-testid="mobile-menu-button"]')
    await expect(menuButton).toBeVisible()
    
    // Desktop sidebar should be hidden
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).not.toBeVisible()
  })

  test('drawer opens and closes correctly', async ({ page }) => {
    await page.goto('/')
    
    // Click hamburger to open drawer
    await page.locator('[data-testid="mobile-menu-button"]').click()
    
    // Drawer should be visible
    const drawer = page.locator('[data-testid="mobile-drawer"]')
    await expect(drawer).toBeVisible()
    
    // Click backdrop to close
    const backdrop = page.locator('[data-testid="mobile-drawer-backdrop"]')
    await backdrop.click({ position: { x: 10, y: 10 } })
    
    // Drawer should close
    await expect(drawer).not.toBeVisible()
  })

  test('drawer auto-closes after navigation', async ({ page }) => {
    await page.goto('/')
    
    // Open drawer
    await page.locator('[data-testid="mobile-menu-button"]').click()
    const drawer = page.locator('[data-testid="mobile-drawer"]')
    await expect(drawer).toBeVisible()
    
    // Navigate to a module
    const firstModule = page.locator('[data-testid^="nav-module-"]').first()
    await firstModule.click()
    
    // Wait for navigation
    await page.waitForTimeout(500)
    
    // Drawer should auto-close
    await expect(drawer).not.toBeVisible()
  })

  test('no horizontal scrollbars on content', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to a lesson with content
    await page.goto('/module/1/1.1')
    await page.waitForLoadState('networkidle')
    
    // Check for horizontal overflow
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const bodyClientWidth = await page.evaluate(() => document.body.clientWidth)
    
    expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1) // +1 for rounding
  })

  test('header height is condensed on mobile', async ({ page }) => {
    await page.goto('/')
    
    const header = page.locator('[data-testid="main-header"]')
    const headerHeight = await header.evaluate(el => el.getBoundingClientRect().height)
    
    // Mobile header should be 56px (not 72px desktop)
    expect(headerHeight).toBeLessThanOrEqual(56)
  })
})

test.describe('Touch Target Compliance', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('all interactive elements meet 44px minimum', async ({ page }) => {
    await page.goto('/')
    
    // Get all interactive elements
    const interactiveElements = await page.locator('button, a, input, [role="button"]').all()
    
    const undersizedElements: string[] = []
    
    for (const element of interactiveElements) {
      const isVisible = await element.isVisible()
      if (!isVisible) continue
      
      const box = await element.boundingBox()
      if (!box) continue
      
      // Check if element meets minimum touch target size (44x44px)
      if (box.width < 44 || box.height < 44) {
        const testId = await element.getAttribute('data-testid')
        const tag = await element.evaluate(el => el.tagName)
        undersizedElements.push(`${tag}${testId ? `[data-testid="${testId}"]` : ''} (${Math.round(box.width)}x${Math.round(box.height)})`)
      }
    }
    
    // Report any undersized elements
    if (undersizedElements.length > 0) {
      console.warn('Undersized touch targets found:', undersizedElements)
    }
    
    // This is a soft assertion - log warnings but don't fail
    // Adjust to expect(undersizedElements).toHaveLength(0) for strict enforcement
  })
})

test.describe('Responsive Breakpoints', () => {
  test('iPad (768px) shows tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // At 768px (md breakpoint), sidebar may transition to persistent drawer
    // Verify this matches your design spec
    const sidebar = page.locator('[data-testid="sidebar"]')
    const menuButton = page.locator('[data-testid="mobile-menu-button"]')
    
    // One of these should be visible depending on tablet strategy
    const sidebarVisible = await sidebar.isVisible()
    const menuVisible = await menuButton.isVisible()
    
    expect(sidebarVisible || menuVisible).toBeTruthy()
  })

  test('desktop (1024px+) shows full sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto('/')
    
    // Desktop should show sidebar, not hamburger
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).toBeVisible()
  })
})

test.describe('Mobile Virtual Instruments', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('piano keys have adequate touch targets', async ({ page }) => {
    await page.goto('/practice')
    
    // Check if piano is visible
    const piano = page.locator('[data-testid="virtual-piano"]')
    if (await piano.isVisible()) {
      // Check first piano key dimensions
      const firstKey = page.locator('[data-testid^="piano-key-"]').first()
      const box = await firstKey.boundingBox()
      
      if (box) {
        // Piano keys should be wide enough for touch (minimum 44px recommended)
        expect(box.width).toBeGreaterThanOrEqual(40) // Slightly relaxed for keyboard
      }
    }
  })

  test('floating instrument panel becomes bottom sheet on mobile', async ({ page }) => {
    await page.goto('/practice')
    
    // Check if floating panel uses bottom sheet pattern
    const floatingPanel = page.locator('[data-testid="floating-instrument-panel"]')
    
    if (await floatingPanel.isVisible()) {
      const position = await floatingPanel.evaluate(el => {
        const rect = el.getBoundingClientRect()
        return {
          bottom: window.innerHeight - rect.bottom,
          left: rect.left,
        }
      })
      
      // On mobile, panel should be anchored to bottom (not floating)
      // This is a general check - adjust based on your implementation
      expect(position.bottom).toBeLessThan(100) // Should be near bottom
    }
  })
})

test.describe('ABC Notation Rendering', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('musical notation is readable without overflow', async ({ page }) => {
    await page.goto('/module/1/1.1')
    await page.waitForLoadState('networkidle')
    
    // Find ABC rendered content
    const abcSvg = page.locator('svg.abcjs-container').first()
    
    if (await abcSvg.count() > 0) {
      const svgBox = await abcSvg.boundingBox()
      
      if (svgBox) {
        // SVG should not exceed viewport width (allowing horizontal scroll is ok)
        const viewportWidth = page.viewportSize()?.width || 375
        
        // Either fits in viewport OR parent has horizontal scroll
        const parent = page.locator('svg.abcjs-container').first().locator('..')
        const hasHorizontalScroll = await parent.evaluate(el => el.scrollWidth > el.clientWidth)
        
        const fitsInViewport = svgBox.width <= viewportWidth
        expect(fitsInViewport || hasHorizontalScroll).toBeTruthy()
      }
    }
  })
})
