import { test, expect } from '@playwright/test'

/**
 * Mobile Color Contrast E2E Tests
 * Ensures ABC notation rendering meets WCAG AA standards in both Light and Dark modes
 * Viewport: iPhone SE (375x667) - smallest modern mobile device
 */

/**
 * Helper function to calculate relative luminance from RGB color
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Parse RGB color string to {r, g, b} object
 */
function parseRgb(rgbString: string): { r: number; g: number; b: number } | null {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return null
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
  }
}

test.describe('Mobile Light Mode - Color Contrast (WCAG AA)', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    // Ensure light mode
    await page.goto('/module/1/1.1')
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
    })
    await page.waitForLoadState('networkidle')
  })

  test('ABC notation noteheads have sufficient contrast on white background', async ({ page }) => {
    // Find ABC notation elements
    const notehead = page.locator('.abcjs-notehead').first()
    
    if (await notehead.count() > 0) {
      const noteheadColor = await notehead.evaluate((el) => {
        return window.getComputedStyle(el).fill
      })
      
      const backgroundColor = await page.evaluate(() => {
        const container = document.querySelector('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const noteRgb = parseRgb(noteheadColor)
      const bgRgb = parseRgb(backgroundColor)

      if (noteRgb && bgRgb) {
        const contrast = getContrastRatio(noteRgb, bgRgb)
        console.log(`Notehead contrast ratio (Light Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 3:1 for graphics/large text
        expect(contrast).toBeGreaterThanOrEqual(3.0)
      }
    }
  })

  test('ABC title text meets WCAG AA contrast (4.5:1)', async ({ page }) => {
    const titleElement = page.locator('.abc-renderer .text-teal-700').first()
    
    if (await titleElement.count() > 0) {
      const titleColor = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).color
      })
      
      const backgroundColor = await titleElement.evaluate((el) => {
        const container = el.closest('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const titleRgb = parseRgb(titleColor)
      const bgRgb = parseRgb(backgroundColor)

      if (titleRgb && bgRgb) {
        const contrast = getContrastRatio(titleRgb, bgRgb)
        console.log(`Title contrast ratio (Light Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 4.5:1 for normal text
        expect(contrast).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  test('ABC description text meets WCAG AA contrast', async ({ page }) => {
    const descElement = page.locator('.abc-renderer .text-slate-600').first()
    
    if (await descElement.count() > 0) {
      const descColor = await descElement.evaluate((el) => {
        return window.getComputedStyle(el).color
      })
      
      const backgroundColor = await descElement.evaluate((el) => {
        const container = el.closest('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const descRgb = parseRgb(descColor)
      const bgRgb = parseRgb(backgroundColor)

      if (descRgb && bgRgb) {
        const contrast = getContrastRatio(descRgb, bgRgb)
        console.log(`Description contrast ratio (Light Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 4.5:1 for normal text
        expect(contrast).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  test('staff lines are clearly visible in Light Mode', async ({ page }) => {
    const staffLine = page.locator('.abcjs-staff').first()
    
    if (await staffLine.count() > 0) {
      const staffColor = await staffLine.evaluate((el) => {
        return window.getComputedStyle(el).stroke
      })
      
      const backgroundColor = await page.evaluate(() => {
        const container = document.querySelector('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const staffRgb = parseRgb(staffColor)
      const bgRgb = parseRgb(backgroundColor)

      if (staffRgb && bgRgb) {
        const contrast = getContrastRatio(staffRgb, bgRgb)
        console.log(`Staff line contrast ratio (Light Mode): ${contrast.toFixed(2)}:1`)
        
        // Staff lines should have at least 3:1 contrast
        expect(contrast).toBeGreaterThanOrEqual(3.0)
      }
    }
  })
})

test.describe('Mobile Dark Mode - Color Contrast (WCAG AA)', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    // Ensure dark mode
    await page.goto('/module/1/1.1')
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
    await page.waitForLoadState('networkidle')
  })

  test('ABC notation noteheads have sufficient contrast on dark background', async ({ page }) => {
    const notehead = page.locator('.abcjs-notehead').first()
    
    if (await notehead.count() > 0) {
      const noteheadColor = await notehead.evaluate((el) => {
        return window.getComputedStyle(el).fill
      })
      
      const backgroundColor = await page.evaluate(() => {
        const container = document.querySelector('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const noteRgb = parseRgb(noteheadColor)
      const bgRgb = parseRgb(backgroundColor)

      if (noteRgb && bgRgb) {
        const contrast = getContrastRatio(noteRgb, bgRgb)
        console.log(`Notehead contrast ratio (Dark Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 3:1 for graphics/large text
        expect(contrast).toBeGreaterThanOrEqual(3.0)
      }
    }
  })

  test('ABC title text meets WCAG AA contrast in Dark Mode', async ({ page }) => {
    const titleElement = page.locator('.abc-renderer .dark\\:text-teal-400').first()
    
    if (await titleElement.count() > 0) {
      const titleColor = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).color
      })
      
      const backgroundColor = await titleElement.evaluate((el) => {
        const container = el.closest('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const titleRgb = parseRgb(titleColor)
      const bgRgb = parseRgb(backgroundColor)

      if (titleRgb && bgRgb) {
        const contrast = getContrastRatio(titleRgb, bgRgb)
        console.log(`Title contrast ratio (Dark Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 4.5:1 for normal text
        expect(contrast).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  test('ABC description text meets WCAG AA contrast in Dark Mode', async ({ page }) => {
    const descElement = page.locator('.abc-renderer .dark\\:text-slate-400').first()
    
    if (await descElement.count() > 0) {
      const descColor = await descElement.evaluate((el) => {
        return window.getComputedStyle(el).color
      })
      
      const backgroundColor = await descElement.evaluate((el) => {
        const container = el.closest('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const descRgb = parseRgb(descColor)
      const bgRgb = parseRgb(backgroundColor)

      if (descRgb && bgRgb) {
        const contrast = getContrastRatio(descRgb, bgRgb)
        console.log(`Description contrast ratio (Dark Mode): ${contrast.toFixed(2)}:1`)
        
        // WCAG AA requires 4.5:1 for normal text
        expect(contrast).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  test('staff lines are clearly visible in Dark Mode', async ({ page }) => {
    const staffLine = page.locator('.abcjs-staff').first()
    
    if (await staffLine.count() > 0) {
      const staffColor = await staffLine.evaluate((el) => {
        return window.getComputedStyle(el).stroke
      })
      
      const backgroundColor = await page.evaluate(() => {
        const container = document.querySelector('.abc-renderer')
        return window.getComputedStyle(container || document.body).backgroundColor
      })

      const staffRgb = parseRgb(staffColor)
      const bgRgb = parseRgb(backgroundColor)

      if (staffRgb && bgRgb) {
        const contrast = getContrastRatio(staffRgb, bgRgb)
        console.log(`Staff line contrast ratio (Dark Mode): ${contrast.toFixed(2)}:1`)
        
        // Staff lines should have at least 3:1 contrast
        expect(contrast).toBeGreaterThanOrEqual(3.0)
      }
    }
  })
})

test.describe('Mobile Responsive Staff Rendering', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/module/1/1.1')
    await page.waitForLoadState('networkidle')
  })

  test('ABC staff width adapts to mobile viewport', async ({ page }) => {
    const abcContainer = page.locator('.abc-renderer').first()
    
    if (await abcContainer.count() > 0) {
      const containerWidth = await abcContainer.evaluate(el => 
        el.getBoundingClientRect().width
      )
      
      const viewportWidth = page.viewportSize()?.width || 375
      
      // Container should not exceed viewport width
      expect(containerWidth).toBeLessThanOrEqual(viewportWidth)
      
      console.log(`ABC container width: ${containerWidth}px (viewport: ${viewportWidth}px)`)
    }
  })

  test('horizontal scroll is available for wide staves on mobile', async ({ page }) => {
    const scrollContainer = page.locator('.abc-renderer').first().locator('..')
    
    if (await scrollContainer.count() > 0) {
      const hasOverflow = await scrollContainer.evaluate(el => {
        const style = window.getComputedStyle(el)
        return style.overflowX === 'auto' || el.scrollWidth > el.clientWidth
      })
      
      // Should either have overflow-x: auto or actual scrollable content
      expect(hasOverflow).toBe(true)
      
      console.log('Horizontal scroll is properly configured for mobile')
    }
  })

  test('Grand Staff View uses responsive width on mobile', async ({ page }) => {
    // Navigate to a lesson with Grand Staff
    const grandStaff = page.locator('.inline-grand-staff').first()
    
    if (await grandStaff.count() > 0) {
      const staffWidth = await grandStaff.locator('#paper-inline-staff').evaluate((el: HTMLElement) => {
        const svg = el.querySelector('svg')
        return svg ? svg.getBoundingClientRect().width : 0
      })
      
      const viewportWidth = page.viewportSize()?.width || 375
      
      // Staff should fit within mobile viewport (allowing some tolerance for scroll)
      expect(staffWidth).toBeLessThanOrEqual(viewportWidth + 100)
      
      console.log(`Grand Staff width: ${staffWidth}px (viewport: ${viewportWidth}px)`)
    }
  })

  test('no horizontal page-level scrollbars on mobile', async ({ page }) => {
    // Check entire page doesn't have horizontal scrollbar
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const bodyClientWidth = await page.evaluate(() => document.body.clientWidth)
    
    // Allow 1px tolerance for rounding errors
    expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1)
    
    console.log(`Page scroll status - scrollWidth: ${bodyScrollWidth}, clientWidth: ${bodyClientWidth}`)
  })
})
