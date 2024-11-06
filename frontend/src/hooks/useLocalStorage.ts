import { useCallback } from "react";

export const useLocalStorage = () => {
  const setItem = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value);
  }, []);

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  const getItem = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  return { setItem, removeItem, getItem };
};
