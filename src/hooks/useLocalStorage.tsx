import { useEffect, useState } from "react";

import { isDateStringToday } from "../lib";

export function getStorageValue<T>(key: string, defaultValue: T): T {
  const value = localStorage.getItem(key);
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  return JSON.parse(value) as T;
}

interface UseLocalStorageOptions<T> {
  /** The key to store the value in local storage */
  key: string;
  /** The default value to use if the value is not found in local storage */
  defaultValue: T;
}

/**
 * This hook is used to store a value in the local storage.
 */
export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageOptions<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

interface UseLocalStorageWithDailyResetOptions<T> {
  /** The key to store the value in local storage */
  key: string;
  /** The default value to use if the value is not found in local storage */
  defaultValue: T;
}

/**
 * This hook is used to store a value in local storage with daily reset functionality.
 * The reset check only happens when the component mounts or page loads.
 */
export function useLocalStorageWithDailyReset<T>({
  key,
  defaultValue,
}: UseLocalStorageWithDailyResetOptions<T>): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
] {
  const [lastResetDate, setLastResetDate] = useLocalStorage<string>({
    key: `${key}-last-reset-date`,
    defaultValue: new Date().toDateString(),
  });

  if (!isDateStringToday(lastResetDate)) {
    localStorage.removeItem(key);
    setLastResetDate(new Date().toDateString());
  }

  const [value, setValue] = useLocalStorage<T>({
    key,
    defaultValue,
  });

  return [value, setValue];
}
