/**
 * Service for managing persistent storage durability in PWAs.
 */

export interface StorageStats {
  usage: number
  quota: number
}

/**
 * Requests persistent storage from the browser.
 * This prevents the browser from evicting data (like high scores) under storage pressure.
 * Returns true if persistence was granted, false otherwise.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  // Check for secure context and API availability
  if (!window.isSecureContext || !navigator.storage || !navigator.storage.persist) {
    return false
  }

  try {
    const isPersisted = await navigator.storage.persist()
    if (import.meta.env.DEV) {
      console.log(`Storage Persistence Granted: ${isPersisted}`)
    }
    return isPersisted
  } catch (error) {
    console.warn('Error requesting persistent storage:', error)
    return false
  }
}

/**
 * Gets the current storage usage and quota estimates.
 * Useful for debugging or showing "Space Used" in settings.
 */
export async function getStorageEstimate(): Promise<StorageStats | undefined> {
  if (!navigator.storage || !navigator.storage.estimate) {
    return undefined
  }

  try {
    const estimate = await navigator.storage.estimate()
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0,
    }
  } catch (error) {
    console.warn('Error getting storage estimate:', error)
    return undefined
  }
}
