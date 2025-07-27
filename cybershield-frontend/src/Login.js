import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // <-- Add

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`Login successful! Role: ${data.role}`);
        // Save role/email for dashboard use
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/dashboard"); // redirects to dashboard!
        }, 800); // Slight delay to show message
      } else {
        setMessage("Login failed! Check your credentials.");
      }
    } catch {
      setMessage("Server error. Try again later.");
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/cyber-overlay.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for gradient and semi-transparency */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      <div className="max-w-md w-full bg-[#111827] bg-opacity-90 border border-blue-700 rounded-2xl shadow-2xl p-10 backdrop-blur-md relative z-10">
        <h2 className="text-4xl text-cyan-400 font-extrabold mb-8 tracking-wide font-mono text-center drop-shadow-lg">
          CyberShield
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-cyan-300 font-semibold mb-2 select-none"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-shadow"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-cyan-300 font-semibold mb-2 select-none"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-shadow"
            />
          </div>
          <div className="mt-2 text-right">
            <a href="/forgot-password" className="text-xs text-cyan-400 underline hover:text-cyan-300">Forgot Password?</a>
            </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors font-bold text-lg text-gray-900 rounded-md py-3 shadow-md shadow-cyan-600/50 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          >
            Log In
          </button>
        </form>
        {message && (
          <p className="mt-6 text-center text-sm font-medium text-red-400 select-text drop-shadow-md">
            {message}
          </p>
        )}
        <div className="mt-8 text-center text-xs text-cyan-600 font-mono tracking-widest">
          &copy; 2025 CyberShield - Securing Your Digital World
        </div>
      </div>
    </div>
  );
}

export default Login;
