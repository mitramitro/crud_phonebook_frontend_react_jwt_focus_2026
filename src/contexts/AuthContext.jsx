import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔁 cek user saat app pertama kali load
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // 🔐 login
  const login = async (token) => {
    localStorage.setItem("token", token);

    try {
      const res = await api.get("/auth/me");
      const userData = res.data.data;

      setUser(userData);

      // ⬅️ redirect BERDASARKAN ROLE
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      throw new Error("Login gagal");
    }
  };

  // 🚪 logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // token bisa saja sudah expired → abaikan
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

// helper hook
export const useAuth = () => useContext(AuthContext);
