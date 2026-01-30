import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authApi from "../api/authApi";

const initialFormData = {
  userName: "",
  email: "",
  password: ""
};

const Login = () => {
  const {setIsAuth} = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const response = isLogin
        ? await authApi.login(formData)
        : await authApi.signup(formData);

        if(response?.data?.success){
            setIsAuth(true); //global true
            navigate("/")
        }
    } catch (error) {
        alert(error.response?.data?.message || "Auth failed")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="userName"
              placeholder="username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
