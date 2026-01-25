import { test, expect } from '@playwright/test'
import { PracticePage } from '../pages/PracticePage'

test.describe('Practice Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to practice page before each test
    const practice = new PracticePage(page)
    await practice.navigate()
  })

  test('virtual piano can be toggled and played', async ({ page }) => {
    const practice = new PracticePage(page)

    // Piano might be visible or hidden by default, toggle to ensure it's shown
    if (!(await practice.isPianoVisible())) {
      await practice.togglePiano()
    }

    // Piano should be visible
    expect(await practice.isPianoVisible()).toBe(true)

    // Play a key (C4)
    await practice.playPianoKey('C4')

    // Key should be highlighted (assuming there's a visual indicator)
    // Note: This depends on the actual implementation
    await page.waitForTimeout(200)

    // Toggle piano off
    await practice.togglePiano()

    // Piano should be hidden
    expect(await practice.isPianoVisible()).toBe(false)
  })

  test('virtual guitar can be toggled and played', async ({ page }) => {
    const practice = new PracticePage(page)

    // Toggle guitar on
    if (!(await practice.isGuitarVisible())) {
      await practice.toggleGuitar()
    }

    // Guitar should be visible
    expect(await practice.isGuitarVisible()).toBe(true)

    // Play a note (String 1, Fret 0 - open E string)
    await practice.playGuitarNote(1, 0)

    await page.waitForTimeout(200)

    // Toggle guitar off
    await practice.toggleGuitar()

    // Guitar should be hidden
    expect(await practice.isGuitarVisible()).toBe(false)
  })

  test('BPM tempo can be adjusted', async ({ page }) => {
    const practice = new PracticePage(page)

    // Set BPM to 90
    await practice.setBPM(90)

    // Verify BPM is set
    expect(await practice.getBPM()).toBe(90)

    // Set BPM to 140
    await practice.setBPM(140)

    // Verify BPM is updated
    expect(await practice.getBPM()).toBe(140)
  })

  test('instruments can be used together', async ({ page }) => {
    const practice = new PracticePage(page)

    // Show both instruments
    if (!(await practice.isPianoVisible())) {
      await practice.togglePiano()
    }
    if (!(await practice.isGuitarVisible())) {
      await practice.toggleGuitar()
    }

    // Both should be visible
    expect(await practice.isPianoVisible()).toBe(true)
    expect(await practice.isGuitarVisible()).toBe(true)

    // Play on both
    await practice.playPianoKey('C4')
    await page.waitForTimeout(100)
    await practice.playGuitarNote(1, 0)

    await page.waitForTimeout(200)
  })
})
