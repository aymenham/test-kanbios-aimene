import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJwt } from "../hooks/useJwt";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isTokenExpired: boolean;
  showModal: boolean;
  closeModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getItem, removeItem } = useLocalStorage();
  const { isTokenExpired: checkTokenExpired } = useJwt();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = () => {
      const token = getItem("token");
      if (token && checkTokenExpired(token)) {
        setIsTokenExpired(true);
        removeItem("token");
        setShowModal(true);
      }
    };

    const intervalId = setInterval(verifyToken, 60000);

    return () => clearInterval(intervalId);
  }, [getItem, removeItem, checkTokenExpired]);

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isTokenExpired, showModal, closeModal }}>
      {children}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">
              Votre session a expiré. Veuillez vous reconnecter.
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-500 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
