import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      await login(res.data.data.access_token);
    } catch (err) {
      setError("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">🔐 Login</h1>

          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium
                         hover:bg-blue-700 transition disabled:opacity-60
                         disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Your App</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
