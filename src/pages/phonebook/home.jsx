import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // pastikan pakai api.js dengan interceptor

export default function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // ---------------------------
  // Ambil data user saat komponen mount
  // ---------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token tidak ada → langsung redirect ke login
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        // Ambil user profile dari API
        const res = await api.get("/auth/me");
        setUser(res.data.data); // ambil object "data" dari response API
      } catch (err) {
        console.error("Fetch user gagal:", err);
        // Token invalid/expired → hapus token & redirect ke login
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  // ---------------------------
  // Logout handler
  // ---------------------------
  const logoutHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // kalau token tidak ada, langsung redirect
      return;
    }

    try {
      // Panggil endpoint logout → interceptor otomatis pasang token
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout gagal, token mungkin expired:", err);
    } finally {
      // Hapus token & redirect ke login selalu
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // ---------------------------
  // Render UI
  // ---------------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Selamat Datang {user.name?.toUpperCase()}</h2>
        <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
