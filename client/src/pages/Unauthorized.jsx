export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
      <p className="text-gray-600 text-lg mb-6">No tienes permiso para acceder a esta página.</p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition duration-300"
      >
        Volver al inicio
      </a>
    </div>
  );
};
  