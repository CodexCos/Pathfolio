import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useNavigate } from "react-router-dom";

type User = {
  _id:string,
  username:string,
  email:string,
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { username: string; email: string; password: string }) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/portfolio/auth");
        console.log(res.data)
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    await axiosInstance.post("/auth/login", data);
    const res = await axiosInstance.get("/portfolio/auth");
    setUser(res.data);
  };

  const signup = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    await axiosInstance.post("/auth/signup", data);
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
    navigate("/login");
    sessionStorage.removeItem("formState");
    sessionStorage.removeItem("currentStep");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
