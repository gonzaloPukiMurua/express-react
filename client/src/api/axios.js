import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
  withCredentials: true, // Mantiene la sesión si usas cookies
});

// Interceptor para agregar el token a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // O la forma en que almacenes el JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response, // Devolver la respuesta si es correcta
    (error) => {
      if (!error.response) {
        console.error("Error de red o servidor no disponible");
      } else {
        const { status, data } = error.response;
  
        if (status === 401) {
          console.warn("No autorizado. Redirigiendo a login...");
          localStorage.removeItem("token"); // Borrar token inválido
          window.location.href = "/login"; // Redirigir a la página de login
        } else if (status === 403) {
          console.warn("Acceso prohibido.");
        } else if (status === 500) {
          console.error("Error del servidor:", data.message || "Error interno.");
        } else {
          console.error("Error en la petición:", data.message || error.message);
        }
      }
  
      return Promise.reject(error);
    }
  ); 

export default instance;
