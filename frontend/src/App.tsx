import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Pantry from "./pages/Pantry";
//import Recipes from "./pages/Recipes";
import "./theme.css";

export default function App() {
  const [tab, setTab] = useState<"dashboard" | "pantry" | "recipes">(
    "dashboard"
  );

  return (
    <div>
      {/* HEADER */}
      <header
        style={{
          padding: "18px 40px",
          background: "linear-gradient(90deg, var(--primary), var(--secondary))",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 700 }}>WasteLess AI</h2>

        {/* NAVIGATION TABS */}
        <nav style={{ display: "flex", gap: "16px", fontWeight: 600 }}>
          <span
            onClick={() => setTab("dashboard")}
            style={{
              cursor: "pointer",
              opacity: tab === "dashboard" ? 1 : 0.7,
              borderBottom: tab === "dashboard" ? "2px solid white" : "none",
              paddingBottom: 4,
            }}
          >
            Dashboard
          </span>

          <span
            onClick={() => setTab("pantry")}
            style={{
              cursor: "pointer",
              opacity: tab === "pantry" ? 1 : 0.7,
              borderBottom: tab === "pantry" ? "2px solid white" : "none",
              paddingBottom: 4,
            }}
          >
            Pantry
          </span>

          {/* <span
            onClick={() => setTab("recipes")}
            style={{
              cursor: "pointer",
              opacity: tab === "recipes" ? 1 : 0.7,
              borderBottom: tab === "recipes" ? "2px solid white" : "none",
              paddingBottom: 4,
            }}
          >
            Recipes
          </span> */}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ padding: "30px", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "dashboard" && <Dashboard />}
        {tab === "pantry" && <Pantry />}
        {/* {tab === "recipes" && <Recipes />} */}
      </main>
    </div>
  );
}
