#!/usr/bin/env node
/**
 * ABC Tunebook Splitter - Improved Version
 * Splits a multi-tune ABC file into individual song files
 * Named as: {Song-Name}-in-{Key}.abc
 */

const fs = require('fs')
const path = require('path')

const INPUT_FILE = path.join(__dirname, 'butterworth-collection.txt')
const OUTPUT_DIR = path.join(__dirname, 'butterworth')

// Clear and recreate output directory
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true })
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// Read the input file
const content = fs.readFileSync(INPUT_FILE, 'utf-8')

// Split by X: at the beginning of a line - this marks each tune
const lines = content.split('\n')
const tunes = []
let currentTune = []

for (const line of lines) {
  if (/^X:\d+/.test(line)) {
    // Start of new tune
    if (currentTune.length > 0) {
      tunes.push(currentTune.join('\n'))
    }
    currentTune = [line]
  } else {
    currentTune.push(line)
  }
}
// Don't forget the last tune
if (currentTune.length > 0) {
  tunes.push(currentTune.join('\n'))
}

console.log(`Found ${tunes.length} tunes in collection`)

let savedCount = 0
const seenNames = new Map()

for (const tune of tunes) {
  if (!tune.trim()) continue
  
  // Extract first title (T:) - there might be multiple T: lines
  const titleMatch = tune.match(/^T:(.+)$/m)
  if (!titleMatch) continue
  
  let title = titleMatch[1].trim()
  // Clean up title
  title = title.replace(/\s*Version\s+\d+\s+of\s+\d+\s*/i, '')
  title = title.replace(/^GB\/\d+[a-z]?\/\d+\s*/i, '')
  title = title.trim()
  
  if (!title) continue
  
  // Extract key (K:) - first occurrence
  const keyMatch = tune.match(/^K:(\S+)/m)
  if (!keyMatch) continue
  
  let key = keyMatch[1].trim()
  // Clean key - remove any modifiers after the base key
  const keyBase = key.match(/^([A-G][b#]?)(m|min|maj|mix|dor|aeo|loc|lyd|phr)?/i)
  key = keyBase ? keyBase[0] : key.substring(0, 5)
  
  // Sanitize filename
  const safeTitle = title
    .replace(/[''`]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40)
  
  if (!safeTitle) continue
  
  // Handle duplicates with version numbers
  let filename = `${safeTitle}-in-${key}`
  if (seenNames.has(filename)) {
    const count = seenNames.get(filename) + 1
    seenNames.set(filename, count)
    filename = `${safeTitle}-v${count}-in-${key}`
  } else {
    seenNames.set(filename, 1)
  }
  
  filename = `${filename}.abc`
  
  const filepath = path.join(OUTPUT_DIR, filename)
  fs.writeFileSync(filepath, tune.trim())
  savedCount++
}

console.log(`Saved ${savedCount} individual tune files to ${OUTPUT_DIR}`)

// Show examples
const files = fs.readdirSync(OUTPUT_DIR).slice(0, 10)
console.log('\nExample files:')
files.forEach(f => console.log(`  - ${f}`))
