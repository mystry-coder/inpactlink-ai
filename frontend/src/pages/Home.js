export default function Home({ setPage }) {
  return (
    <div className="dashboard-wrapper animate-fade-in">

      {/* 🔹 TITLE ABOVE */}
      <h3 style={{ 
        textAlign: "center", 
        marginTop: "20px",
        marginBottom: "20px" 
      }}>
        How ImpactLink Works
      </h3>

      {/* 🔹 MAIN HERO CARD */}
      <div
        className="glass-card"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1 className="card-title" style={{ fontSize: "28px" }}>
          ImpactLink AI
        </h1>

        <p className="card-description" style={{ marginTop: "10px" }}>
          Connecting people in need with volunteers using smart AI matching
        </p>

        <div style={{ marginTop: "25px" }}>
          <button
            className="nav-btn nav-btn-active"
            onClick={() => setPage("need")}
          >
            Report Need
          </button>

          <button
            className="nav-btn"
            style={{ marginLeft: "10px" }}
            onClick={() => setPage("dashboard")}
          >
            View Needs
          </button>
        </div>
      </div>

      {/* 🔥 FLOW SECTION */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <div className="glass-card" style={{ padding: "20px", flex: 1 }}>
          <h4>📌 Report Need</h4>
          <p style={{ fontSize: "13px" }}>
            Users submit requests for help in their community.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "20px", flex: 1 }}>
          <h4>🤖 AI Matching</h4>
          <p style={{ fontSize: "13px" }}>
            System finds the best volunteers using smart logic.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "20px", flex: 1 }}>
          <h4>🤝 Get Help</h4>
          <p style={{ fontSize: "13px" }}>
            Volunteers connect and provide support quickly.
          </p>
        </div>
      </div>

    </div>
  );
}