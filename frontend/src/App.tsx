import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TradeForm from "./pages/trade";
import Positions from "./pages/position";
import PnLPage from "./pages/pnl";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  const userId = localStorage.getItem("userId");

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
