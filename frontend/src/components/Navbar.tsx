import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 

const Navbar: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate()
    // ✅ Load userId once
    useEffect(() => {
      const storedId = localStorage.getItem("userId");
      if (storedId) setUserId(storedId);
    }, []);

    const handleLogout = ()=>{
      localStorage.clear()
      navigate("/")
    }
  
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">📈 Portfolio Tracker</h1>
      <div className="space-x-6">
        <Link to="/trade">Trade</Link>
        <Link to="/position">Position</Link>
        <Link to="/pnl">Realized P&L</Link>
        {userId && <button
          onClick={() => {
            handleLogout()}} 
            className="bg-red-500 py-3 text-white rounded-md px-5 cursor-pointer hover:bg-red-700 transition duration-300"
            >
          Logout
            </button>}
      </div>
    </nav>
  );
};

export default Navbar;
