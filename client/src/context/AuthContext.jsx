import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider.")
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try{
            console.log(user);
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            console.error(error.responde.data);
            setErrors(error.response.data);
        }        
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user); 
            console.log("Realizando logueo.")   
            console.log(res);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
        
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {

        const checkLogin = async () => {
            const cookies = Cookies.get();
            console.log("UseEffect realizandose.")
            console.log(cookies.token);
            if(!cookies.token){
                setIsAuthenticated(false); 
                setLoading(false);              
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log("Verificando Token.\nDatos del usuario: ");
                console.log(res.data);
                if(!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);    
                setLoading(false);
            }catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
                console.log(error);
            }
        };
        checkLogin();       
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors,
                loading
            }}
        >
                {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;