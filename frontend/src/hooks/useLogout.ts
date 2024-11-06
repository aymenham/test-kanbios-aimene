import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useJwt } from "./useJwt";

export const useLogout = () => {
  const { removeItem } = useLocalStorage();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    const token = getItem("token");

    if (token) {
      removeItem("token");
    }

    navigate("/login");
  }, [getItem, removeItem, navigate]);

  return logout;
};
