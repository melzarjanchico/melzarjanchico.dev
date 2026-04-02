import { useMemo } from "react";

declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

export const useIsLowEndDevice = () => {
  const isLowEnd = useMemo(() => {
    const memory = navigator.deviceMemory ?? 8; 
    const cores = navigator.hardwareConcurrency ?? 4;

    return memory < 4 || cores < 2;
  }, []);

  return isLowEnd;
};