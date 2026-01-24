export const distributeNotesToMeasures = (notes: string[], timeSignature: string): string[][] => {
  if (notes.length === 0) return []

  let beatsPerMeasure = 4
  if (timeSignature === '3/4') {
    beatsPerMeasure = 3
  }
  // Default to 4 for any other value

  const measures: string[][] = []
  for (let i = 0; i < notes.length; i += beatsPerMeasure) {
    measures.push(notes.slice(i, i + beatsPerMeasure))
  }

  return measures
}
