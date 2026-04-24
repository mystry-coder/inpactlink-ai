import React, { useState } from "react";
import NeedForm from "./pages/NeedForm";
import Dashboard from "./pages/Dashboard";
import VolunteerForm from "./pages/VolunteerForm";

function App() {
  const [page, setPage] = useState("need");

  return (
    <div>

      {/* Navigation */}
      <div className="nav">
        <button
          className={page === "need" ? "active" : ""}
          onClick={() => setPage("need")}
        >
          Need Form
        </button>

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "volunteer" ? "active" : ""}
          onClick={() => setPage("volunteer")}
        >
          Volunteer
        </button>
      </div>

      {/* Page Switching */}
      <div className="page-container">
        {page === "need" && <NeedForm setPage={setPage} />}
        {page === "dashboard" && <Dashboard />}
        {page === "volunteer" && <VolunteerForm setPage={setPage} />}
      </div>

    </div>
  );
}

export default App;