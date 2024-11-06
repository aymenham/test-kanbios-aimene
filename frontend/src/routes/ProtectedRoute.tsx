import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJwt } from "../hooks/useJwt";
import { useUser } from "../hooks/useUser";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { getItem } = useLocalStorage();
  const { isTokenExpired } = useJwt();
  const { user } = useUser();

  const token = getItem("token");

  if (
    !token ||
    isTokenExpired(token) ||
    (allowedRoles && user && !allowedRoles.includes(user?.role))
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
