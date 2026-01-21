import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  // ⏳ tunggu cek auth selesai
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // 🚫 belum login → lempar ke login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 🔒 role check
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
