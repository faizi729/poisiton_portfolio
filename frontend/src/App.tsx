import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TradeForm from "./pages/trade";
import Positions from "./pages/position";
import PnLPage from "./pages/pnl";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useEffect, useState } from "react";

function App() {
   const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // ✅ Listen for login/logout changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protect these routes */}
        <Route
          path="/trade"
          element={userId ? <TradeForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/position"
          element={userId ? <Positions /> : <Navigate to="/" replace />}
        />
        <Route
          path="/pnl"
          element={userId ? <PnLPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
