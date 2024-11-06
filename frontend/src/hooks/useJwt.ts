import { jwtDecode } from "jwt-decode";

export const useJwt = () => {
  const decodeToken = (token: string): any | null => {
    try {
      return jwtDecode<any>(token);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };

  const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (decoded) {
      return decoded.exp * 1000 < Date.now();
    }
    return true;
  };

  return { decodeToken, isTokenExpired };
};
