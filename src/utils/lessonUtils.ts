/**
 * Extract a short display name (2-3 words) from a full lesson title
 * Examples:
 * - "The Staff & Clefs" → "Staff & Clefs"
 * - "Understanding the Musical Staff" → "Musical Staff"
 * - "Introduction to Rhythm" → "Intro Rhythm"
 */
export function getShortLessonName(fullTitle: string): string {
  // Remove common prefixes
  const cleaned = fullTitle.replace(/^(The|Understanding|Introduction to|Các)\s+/i, '').trim()

  // Split into words
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0)

  if (words.length === 0) return fullTitle

  // If there's a connector (&, and, và) as second word, take 3 words
  if (words.length >= 3 && ['&', 'and', 'và'].includes(words[1].toLowerCase())) {
    return words.slice(0, 3).join(' ')
  }

  // Otherwise take first 2 words
  if (words.length >= 2) {
    return words.slice(0, 2).join(' ')
  }

  // If only 1 word, return it
  return words[0]
}
