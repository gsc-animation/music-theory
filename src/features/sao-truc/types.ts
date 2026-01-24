export type FluteType = '6-hole' | '10-hole'

// 'O' = Open, 'X' = Closed, 'H' = Half-hole
export type HoleState = 'O' | 'X' | 'H'

export interface Fingering {
  note: string // Scientific pitch notation: C4, C#4, etc.
  holes: HoleState[] // Ordered: Bottom (Hole 1) -> Top (Hole 6/10)
  description?: string // Optional: "Standard", "Alternative", "Trill"
}

export interface FingeringDataset {
  '6-hole': Record<string, Fingering>
  '10-hole': Record<string, Fingering>
}
