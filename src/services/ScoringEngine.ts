export interface ScoreFeedback {
  rating: 'PERFECT' | 'GOOD' | 'MISS' | 'EARLY' | 'LATE'
  scoreDelta: number
  timeDelta: number
  label: string
}

export class ScoringEngine {
  // Windows in milliseconds
  static readonly WINDOW_PERFECT = 50
  static readonly WINDOW_GOOD = 100

  // Score values
  static readonly POINTS_PERFECT = 100
  static readonly POINTS_GOOD = 50
  static readonly POINTS_MISS = 0

  /**
   * Compares the actual input time against the expected time.
   * @param expectedTime The timestamp (in ms) when the note should have been played.
   * @param actualTime The timestamp (in ms) when the note was actually played.
   */
  static compare(expectedTime: number, actualTime: number): ScoreFeedback {
    const diff = actualTime - expectedTime
    const absDiff = Math.abs(diff)

    if (absDiff <= this.WINDOW_PERFECT) {
      return {
        rating: 'PERFECT',
        scoreDelta: this.POINTS_PERFECT,
        timeDelta: diff,
        label: 'Perfect!',
      }
    } else if (absDiff <= this.WINDOW_GOOD) {
      return {
        rating: diff < 0 ? 'EARLY' : 'LATE', // Sub-classify GOOD if needed, or just GOOD
        scoreDelta: this.POINTS_GOOD,
        timeDelta: diff,
        label: diff < 0 ? 'Early' : 'Late',
      }
    } else {
      return {
        rating: 'MISS',
        scoreDelta: this.POINTS_MISS,
        timeDelta: diff,
        label: 'Miss',
      }
    }
  }
}
