import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuth,loading,children})=>{
    if(loading) return <p>Loading..</p>;

    if(!isAuth){
        return <Navigate to="/login" replace/>
    }
    
    return children;
}

export default ProtectedRoute;