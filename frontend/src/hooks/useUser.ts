import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import { TUser } from "../interfaces/user";

export const useUser = () => {
  const { removeItem, getItem } = useLocalStorage();
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<TUser>(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [getItem]);

  const clearUserData = () => {
    removeItem("token");
    setUser(null);
  };

  return { user, clearUserData };
};
