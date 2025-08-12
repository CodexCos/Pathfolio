import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import FormProvider from "@/context/FormProvider";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }

  return user ? <FormProvider>{children}</FormProvider> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
