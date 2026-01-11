import type { FluteType, Fingering, FingeringDataset } from '../types';
import rawData from './fingerings.json';

// Cast the raw JSON to our strict type
const fingeringData = rawData as unknown as FingeringDataset;

export const getFingering = (note: string, type: FluteType): Fingering | null => {
  const fluteData = fingeringData[type];
  if (!fluteData) return null;

  // Try exact match first, then normalized
  const fingering = fluteData[note] || fluteData[note.toUpperCase()] || fluteData[note.charAt(0).toUpperCase() + note.slice(1)];
  return fingering || null;
};
