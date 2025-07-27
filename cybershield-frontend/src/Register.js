import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    // Basic validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Registration successful! Please log in.");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "user",
        });
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-black bg-cover bg-center"
      // This inline style is the *most robust*, works with any Create React App setup!
      style={{
        backgroundImage: "url('/cyber-overlay.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="max-w-md w-full bg-[#111827] bg-opacity-90 border border-blue-700 rounded-2xl shadow-2xl p-10 backdrop-blur-md relative z-10">
        <h2 className="text-3xl text-cyan-400 font-extrabold mb-6 font-mono text-center drop-shadow-lg">
          Register - CyberShield
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-blue-600 bg-gray-900 text-cyan-200 placeholder-cyan-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors font-bold text-lg text-gray-900 rounded-md py-2 shadow-md shadow-cyan-600/50"
          >
            Register
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-red-400 drop-shadow">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-center text-green-400 drop-shadow">{message}</p>
        )}
        <div className="mt-6 text-center text-xs text-cyan-600 font-mono tracking-widest">
          Already have an account? <a href="/login" className="underline text-cyan-400">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
