
/**
 * Safely reads a JSON-serialized value from localStorage.
 *
 * @param key  The storage key.
 * @returns    The parsed value, or null if not found or on error.
 */
export function getItem<T>(key: string): T | null {
  try {
    const json = localStorage.getItem(key);
    if (json === null) {
      return null;
    }
    return JSON.parse(json) as T;
  } catch (err) {
    console.error(`Failed to parse localStorage key "${key}":`, err);
    return null;
  }
}

/**
 * Safely writes a JSON-serializable value to localStorage.
 *
 * @param key   The storage key.
 * @param value The value to serialize.
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to serialize localStorage key "${key}":`, err);
  }
}

/**
 * Safely removes an entry from localStorage.
 *
 * @param key  The storage key to remove.
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Failed to remove localStorage key "${key}":`, err);
  }
}