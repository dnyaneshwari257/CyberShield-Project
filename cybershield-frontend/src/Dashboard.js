import React from "react";

function Dashboard() {
  // Get user's role and email from localStorage (set on login)
  const role = localStorage.getItem("role") || "user";
  const email = localStorage.getItem("email") || "";

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/cyber-overlay.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75" />

      <div className="max-w-xl w-full bg-[#111827] bg-opacity-90 border border-blue-700 rounded-2xl shadow-2xl p-10 backdrop-blur-md relative z-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-4 text-center font-mono drop-shadow-lg">CyberShield Dashboard</h1>
        <h2 className="text-cyan-200 text-lg mb-8 text-center">
          Welcome, <span className="text-cyan-300">{email}</span>!
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-900 bg-opacity-80 rounded-lg p-6 shadow-inner border border-cyan-800">
            <div className="text-cyan-400 text-xl font-semibold mb-2 flex items-center">
              <span className="inline-block mr-2">🛡️</span> Security Status
            </div>
            <div className="text-cyan-200">All systems are secure.</div>
          </div>

          <div className="bg-gray-900 bg-opacity-80 rounded-lg p-6 shadow-inner border border-cyan-800">
            <div className="text-cyan-400 text-xl font-semibold mb-2 flex items-center">
              <span className="inline-block mr-2">⚡</span> Quick Actions
            </div>
            <div className="flex space-x-3">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-5 py-2 rounded-lg shadow-cyan-600/30 shadow transition">
                Scan URL
              </button>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-5 py-2 rounded-lg shadow-cyan-600/30 shadow transition">
                Scan File
              </button>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-5 py-2 rounded-lg shadow-cyan-600/30 shadow transition">
                Profile
              </button>
            </div>
          </div>

          {role === "admin" && (
            <div className="bg-gray-900 bg-opacity-80 rounded-lg p-6 shadow-inner border border-cyan-800">
              <div className="text-cyan-400 text-xl font-semibold mb-2 flex items-center">
                <span className="inline-block mr-2">👑</span> Admin Panel
              </div>
              <div className="text-cyan-200">Extra admin tools and analytics here.</div>
            </div>
          )}
        </div>
        <div className="mt-8 text-center text-xs text-cyan-600 font-mono tracking-widest">
          &copy; 2025 CyberShield - Securing Your Digital World
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
