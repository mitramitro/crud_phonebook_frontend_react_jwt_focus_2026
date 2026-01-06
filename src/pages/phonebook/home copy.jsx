import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth(); // 🔥 reusable

  // ---------------------------
  // 3️⃣ Render UI
  // ---------------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Selamat Datang {user.name?.toUpperCase()}</h2>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
