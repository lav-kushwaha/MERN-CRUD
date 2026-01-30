import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authApi from "../api/authApi";

const Header = () => {
  const {isAuth,setIsAuth} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      await authApi.logout();
      setIsAuth(false); //update global state
      navigate("/login");
    } catch (error) {
        console.log( error +"error in logout")
    }
  }
  return (
    <header className="w-full bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          Notes App
        </Link>

        <div className="space-x-4">
          {isAuth ? (
            <button onClick={()=>handleLogout()}
              className="px-4 py-2  bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;