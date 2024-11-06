import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../Context/AuhContext";
import { UserRole } from "../interfaces/user";

const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
