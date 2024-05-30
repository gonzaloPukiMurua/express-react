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
            return clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {

        async function checkLogin(){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);               
                return setUser(null);
            }
            try {
                const res = verifyTokenRequest(cookies.token);
                console.log(res);
                if(!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);    
            }catch (error) {
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        checkLogin();       
    }, []);

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