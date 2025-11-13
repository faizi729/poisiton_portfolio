import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TradeForm from "./pages/trade";
import Positions from "./pages/position";
import PnLPage from "./pages/pnl";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";


function App() {
   

  // ✅ Listen for login/logout changes in localStorage
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protect these routes */}
        <Route
          path="/trade"
          element={  <TradeForm />   }
        />
        <Route
          path="/position"
          element={  <Positions />  }
        />
        <Route
          path="/pnl"
          element={  <PnLPage />  }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
