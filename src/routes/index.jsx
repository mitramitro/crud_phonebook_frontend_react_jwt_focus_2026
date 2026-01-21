import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Home from "../pages/phonebook/home";
import AdminPage from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTE */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["user"]}>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
