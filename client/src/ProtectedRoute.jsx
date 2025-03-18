import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { user, userValidated } = useAuth();

  console.log("Estoy en ProtectedRoute. Este es mi user: ", user);
  console.log("RequiredRoles es: ", requiredRoles);
  console.log("user.roles está en requiredRoles: ", user?.roles && requiredRoles.includes(user.roles));

  // ✅ Mientras no se haya verificado el usuario, mostramos un estado de carga
  if (!userValidated) {
    return <p>Cargando...</p>; // Aquí puedes poner un spinner o un indicador de carga más elegante
  }

  // ❌ Si el usuario no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 Si se requieren roles específicos y el usuario no tiene el rol adecuado, redirigir a "/unauthorized"
  if (requiredRoles.length > 0 && !requiredRoles.some(role => user.roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
