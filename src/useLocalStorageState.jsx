import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  });
  useEffect(() => {
    localStorage.setItem("watchedMovie", JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
