import React, { useState } from "react";
import NeedForm from "./pages/NeedForm";
import Dashboard from "./pages/Dashboard";
import VolunteerForm from "./pages/VolunteerForm";

function App() {
  const [page, setPage] = useState("need");

  return (
    <div className="app-container">
      
      {/* Header & Navigation */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="app-title">ImpactLink AI</h1>
        </div>

        <nav className="glass-nav">
          <button
            className={`nav-btn ${page === "need" ? "nav-btn-active" : "nav-btn-inactive"}`}
            onClick={() => setPage("need")}
          >
            Need Form
          </button>

          <button
            className={`nav-btn ${page === "dashboard" ? "nav-btn-active" : "nav-btn-inactive"}`}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-btn ${page === "volunteer" ? "nav-btn-active" : "nav-btn-inactive"}`}
            onClick={() => setPage("volunteer")}
          >
            Volunteer
          </button>
        </nav>
      </header>

      {/* Page Switching */}
      <main className="app-main">
        {page === "need" && <NeedForm setPage={setPage} />}
        {page === "dashboard" && <Dashboard />}
        {page === "volunteer" && <VolunteerForm setPage={setPage} />}
      </main>

    </div>
  );
}

export default App;