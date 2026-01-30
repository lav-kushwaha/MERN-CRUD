import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext} from "react";

import Clientlayout from "./layout/clientlayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

function App() {
  
  const {isAuth,loading} = useContext(AuthContext);

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