declare module 'pitchfinder' {
  interface YINConfig {
    sampleRate?: number
    threshold?: number
    bufferSize?: number
    probabilityThreshold?: number
  }

  type PitchDetector = (signal: Float32Array) => number | null

  export function YIN(config?: YINConfig): PitchDetector
  export function AMDF(config?: any): PitchDetector
  export function ACF2PLUS(config?: any): PitchDetector
  export function DynamicWavelet(config?: any): PitchDetector
  export function Macleod(config?: any): PitchDetector
}
