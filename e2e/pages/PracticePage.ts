import { Page } from '@playwright/test'

/**
 * Page Object Model for Practice page
 * Encapsulates all interactions with the practice/free-play mode
 */
export class PracticePage {
  constructor(private page: Page) {}

  /**
   * Navigate to practice page
   */
  async navigate() {
    await this.page.goto('/practice')
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Toggle virtual piano visibility
   */
  async togglePiano() {
    await this.page.locator('[data-testid="toggle-piano"]').click()
  }

  /**
   * Check if virtual piano is visible
   */
  async isPianoVisible() {
    return await this.page.locator('[data-testid="virtual-piano"]').isVisible()
  }

  /**
   * Play a piano key
   */
  async playPianoKey(note: string) {
    await this.page.locator(`[data-testid="piano-key-${note}"]`).click()
  }

  /**
   * Toggle virtual guitar visibility
   */
  async toggleGuitar() {
    await this.page.locator('[data-testid="toggle-guitar"]').click()
  }

  /**
   * Check if virtual guitar is visible
   */
  async isGuitarVisible() {
    return await this.page.locator('[data-testid="virtual-guitar"]').isVisible()
  }

  /**
   * Play a guitar note
   */
  async playGuitarNote(string: number, fret: number) {
    await this.page.locator(`[data-testid="guitar-string-${string}-fret-${fret}"]`).click()
  }

  /**
   * Check if a piano key is highlighted
   */
  async isPianoKeyHighlighted(note: string) {
    const key = this.page.locator(`[data-testid="piano-key-${note}"]`)
    const classes = await key.getAttribute('class')
    return classes?.includes('highlighted') || classes?.includes('active')
  }

  /**
   * Set BPM (tempo)
   */
  async setBPM(bpm: number) {
    await this.page.locator('[data-testid="bpm-input"]').fill(bpm.toString())
  }

  /**
   * Get current BPM value
   */
  async getBPM() {
    const value = await this.page.locator('[data-testid="bpm-input"]').inputValue()
    return parseInt(value, 10)
  }
}
