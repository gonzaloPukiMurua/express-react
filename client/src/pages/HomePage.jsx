import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a la Home</h1>
      <p className="text-gray-600 text-lg mb-6">Explora la plataforma y gestiona tus órdenes.</p>
      <a
        href="/"
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition duration-300"
      >
        Cerrar Sesión
      </a>
    </div>
  );
}