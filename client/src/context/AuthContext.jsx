import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";

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
            console.log(res);
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
            return clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider 
            value={{
                signup,
                user,
                isAuthenticated,
                errors,
                signin
            }}
            >
                {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;