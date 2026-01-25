import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// TODO: These tests require dist/ build artifacts
// Should be moved to a separate post-build test workflow
describe.skip('PWA Manifest', () => {
  it('should check if manifest file exists', () => {
    const manifestPath = path.resolve(__dirname, '../dist/manifest.webmanifest')
    expect(fs.existsSync(manifestPath)).toBe(true)
  })

  it('should contain required fields', () => {
    const manifestPath = path.resolve(__dirname, '../dist/manifest.webmanifest')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

    expect(manifest.name).toBe('Music Theory')
    expect(manifest.short_name).toBe('Theory')
    expect(manifest.theme_color).toBe('#4CAF50')
    expect(manifest.background_color).toBe('#FAFAFA')
    expect(manifest.display).toBe('standalone')
    expect(manifest.display_override).toContain('window-controls-overlay')
    expect(manifest.orientation).toBe('portrait')
    expect(manifest.categories).toEqual(['education', 'music', 'games'])
  })

  it('should have correct icons configuration', () => {
    const manifestPath = path.resolve(__dirname, '../dist/manifest.webmanifest')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

    expect(manifest.icons).toHaveLength(4)
    const icon192 = manifest.icons.find((i: any) => i.sizes === '192x192' && i.purpose === 'any')
    expect(icon192).toBeDefined()
    expect(icon192.src).toContain('manifest-icon-192.maskable.png')
  })

  it('should have screenshots configured', () => {
    const manifestPath = path.resolve(__dirname, '../dist/manifest.webmanifest')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

    expect(manifest.screenshots).toHaveLength(2)
    const wideScreenshot = manifest.screenshots.find((s: any) => s.form_factor === 'wide')
    expect(wideScreenshot).toBeDefined()
    expect(wideScreenshot.label).toBe('Desktop Practice Mode')
  })
})
