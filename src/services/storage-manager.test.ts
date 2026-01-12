import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { requestPersistentStorage, getStorageEstimate } from './storage-manager';

describe('Storage Manager', () => {
  const originalNavigator = global.navigator;
  const originalWindow = global.window;

  beforeEach(() => {
    // Mock window.isSecureContext
    Object.defineProperty(global.window, 'isSecureContext', {
      value: true,
      writable: true
    });

    // Mock navigator.storage
    Object.defineProperty(global.navigator, 'storage', {
      value: {
        persist: vi.fn(),
        estimate: vi.fn(),
        persisted: vi.fn()
      },
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(global, 'navigator', { value: originalNavigator });
    Object.defineProperty(global, 'window', { value: originalWindow });
  });

  describe('requestPersistentStorage', () => {
    it('returns false if not in secure context', async () => {
      Object.defineProperty(global.window, 'isSecureContext', { value: false });
      const result = await requestPersistentStorage();
      expect(result).toBe(false);
    });

    it('returns false if navigator.storage is missing', async () => {
      Object.defineProperty(global.navigator, 'storage', { value: undefined });
      const result = await requestPersistentStorage();
      expect(result).toBe(false);
    });

    it('calls navigator.storage.persist and returns result', async () => {
      const mockPersist = vi.fn().mockResolvedValue(true);
      global.navigator.storage.persist = mockPersist;

      const result = await requestPersistentStorage();
      expect(mockPersist).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('handles errors gracefully', async () => {
      const mockPersist = vi.fn().mockRejectedValue(new Error('Failed'));
      global.navigator.storage.persist = mockPersist;

      const result = await requestPersistentStorage();
      expect(result).toBe(false);
    });
  });

  describe('getStorageEstimate', () => {
    it('returns estimate from navigator.storage', async () => {
      const mockEstimate = vi.fn().mockResolvedValue({ usage: 100, quota: 1000 });
      global.navigator.storage.estimate = mockEstimate;

      const result = await getStorageEstimate();
      expect(mockEstimate).toHaveBeenCalled();
      expect(result).toEqual({ usage: 100, quota: 1000 });
    });

    it('returns undefined if not supported', async () => {
      Object.defineProperty(global.navigator, 'storage', { value: undefined });
      const result = await getStorageEstimate();
      expect(result).toBeUndefined();
    });

    it('handles errors gracefully', async () => {
      const mockEstimate = vi.fn().mockRejectedValue(new Error('Failed'));
      global.navigator.storage.estimate = mockEstimate;

      const result = await getStorageEstimate();
      expect(result).toBeUndefined();
    });
  });
});
