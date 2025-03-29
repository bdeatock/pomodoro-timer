import { useEffect } from "react";

import { useState } from "react";

export function getStorageValue<T>(key: string, defaultValue: T): T {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

/**
 * This hook is used to store a value in the local storage.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
