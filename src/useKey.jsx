import { useEffect } from "react";
export function useKey(key, event) {
  useEffect(() => {
    function handleKey(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        event();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [key, event]);
}
