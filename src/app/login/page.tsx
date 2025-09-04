"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

  if (res.ok) {
   
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  // ✅ username bhi localStorage me
  localStorage.setItem("username", username);

  // Redux me set
  dispatch(setUser({ username }));

  toast.success("✅ Login successful!", { position: "top-center" });

  setTimeout(() => {
    if (data.role === "doctor") {
      router.push("/doctor-dashboard");
    } else {
      router.push("/");
    }
  }, 1500);
}

 else {
        toast.error(`❌ ${data.error}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Tabeeb Login
        </h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>

     
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
}
