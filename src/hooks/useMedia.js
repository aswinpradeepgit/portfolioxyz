import { useSyncExternalStore } from "react";

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

// Mouse/trackpad users: custom cursor, magnetic buttons, tilt effects
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const useReducedMotionPref = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useDesktop = () => useMediaQuery("(min-width: 768px)");
