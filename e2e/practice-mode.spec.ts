import { test, expect } from '@playwright/test'
import { PracticePage } from './pages/PracticePage'

test.describe('Practice Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to practice page before each test
    const practice = new PracticePage(page)
    await practice.navigate()
  })

  test('virtual piano is visible and can be played', async ({ page }) => {
    const practice = new PracticePage(page)

    // Piano should be visible by default (no toggle needed)
    expect(await practice.isPianoVisible()).toBe(true)

    // Play a key (C4)
    await practice.playPianoKey('C4')

    // Wait for any visual feedback
    await page.waitForTimeout(200)
  })

  test('virtual guitar is visible and can be played', async ({ page }) => {
    const practice = new PracticePage(page)

    // Guitar should be visible by default (no toggle needed)
    expect(await practice.isGuitarVisible()).toBe(true)

    // Play a note on guitar
    await practice.playGuitarNote(1, 0)

    await page.waitForTimeout(200)
  })

  test('BPM display shows tempo value', async ({ page }) => {
    const practice = new PracticePage(page)

    // BPM display should show a value (read-only)
    const bpm = await practice.getBPM()

    // Verify BPM is a reasonable value
    expect(bpm).toBeGreaterThan(40)
    expect(bpm).toBeLessThan(200)
  })

  test('piano and guitar work together', async ({ page }) => {
    const practice = new PracticePage(page)

    // Both instruments should be visible
    expect(await practice.isPianoVisible()).toBe(true)
    expect(await practice.isGuitarVisible()).toBe(true)

    // Play on both instruments
    await practice.playPianoKey('C4')
    await page.waitForTimeout(100)
    await practice.playGuitarNote(1, 0)

    await page.waitForTimeout(200)
  })
})
