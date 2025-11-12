"use client";
import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

export default function LoginPage() {
const navigate = useNavigate()
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backend_url}/api/login`, form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user.id);
    alert("✅ Login successful!");
    navigate("/trade");
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert("❌ Login failed: " + err.response?.data?.message);
    } else {
      alert("❌ Login failed due to an unexpected error.");
    }
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black bg-white"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black bg-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Login
        </button>
        <p
          onClick={() => navigate("/register")}
          className="text-sm text-center cursor-pointer hover:underline mt-2"
        >
          Don’t have an account? Register
        </p>
      </form>
    </div>
  );
}
