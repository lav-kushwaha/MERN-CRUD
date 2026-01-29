import {createContext,useEffect,useState} from 'react'
import authApi from "../api/authApi"

export const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const[isAuth,setIsAuth] = useState(false);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        authApi.checkAuth()
        .then(()=>setIsAuth(true))
        .catch(()=>setIsAuth(false))
        .finally(()=>setLoading(false))
    },[]);

    return(
        <AuthContext.Provider value={{isAuth,setIsAuth,loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;