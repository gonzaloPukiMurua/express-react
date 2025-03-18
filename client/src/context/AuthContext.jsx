import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import jwtDecodeModule from "jwt-decode";

const jwtDecode = jwtDecodeModule.default || jwtDecodeModule; // Compatibilidad asegurada

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userValidated, setUserValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (credentials) => {
    try {
      const response = await loginRequest(credentials);
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      
      const decodedUser = jwtDecode(accessToken);
      console.log("Estoy en authcontext signin", decodedUser);
      if (!decodedUser.roles) {
        throw new Error("El token no contiene un rol válido");
      }
      
      setUser(decodedUser);
      setUserValidated(true);
      navigate("/");
    } catch (error) {
      setErrors([error.response?.data?.message || "Error en el inicio de sesión"]);
    }
  };

  const signup = async (data) => {
    try {
      await registerRequest(data);
      navigate("/login"); // Redirige al Login después de registrar
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al registrar"]);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = null;
    setUser(null);
    setUserValidated(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        logout();
        return;
      }
  
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      try {
        const { data } = await verifyTokenRequest(); // Petición al backend
        setUser(data.user); // Suponiendo que el backend devuelve los datos del usuario
        setUserValidated(true);
      } catch (error) {
        console.error("Token inválido o expirado", error);
        logout(); // Si falla, cerramos sesión
      }
    };
  
    verifyToken();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ signin, signup, logout, user, errors, userValidated }}>
      {children}
    </AuthContext.Provider>
  );
};
