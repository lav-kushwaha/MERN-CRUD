import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Clientlayout from "./layout/clientlayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import authApi from "./api/authApi";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ start TRUE

  useEffect(() => {
    authApi.checkAuth()
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth} loading={loading}>
              <Clientlayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>

        <Route
          path="/login"
          element={
            loading
              ? <p>Loading...</p>
              : isAuth
                ? <Navigate to="/" replace />
                : <Login />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;