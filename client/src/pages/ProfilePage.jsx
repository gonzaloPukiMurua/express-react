import { useAuth } from "../context/AuthContext";

export function ProfilePage() {
  const { user, userValidated } = useAuth();
  console.log("Estoy en ProfilePage: ", user);
  
  if (!userValidated) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700 mb-2">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Rol:</strong> {user.roles.map((role, index) => (
            <span key={index} className="inline-block bg-gray-100 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold mr-2">
              {role}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
