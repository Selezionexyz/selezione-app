import React, { useState } from "react";
import AssistantLuxe from "./AssistantLuxe";
import FicheProduit from "./FicheProduit";
import EstimationLuxe from "./EstimationLuxe";
import ComparateurLuxe from "./ComparateurLuxe";
import ScraperVC from "./ScraperVC";
import Quiz from "./Quiz";
import Academy from "./Academy";
import Dashboard from "./Dashboard";

function SaasLayout() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "assistant": return <AssistantLuxe />;
      case "fiche": return <FicheProduit />;
      case "estimation": return <EstimationLuxe />;
      case "comparateur": return <ComparateurLuxe />;
      case "scraper": return <ScraperVC />;
      case "quiz": return <Quiz />;
      case "academy": return <Academy />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ padding: "1rem", backgroundColor: "#111", textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", color: "gold" }}>
        SELEZIONE ✨ Luxe SaaS
      </header>

      <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", padding: "1rem", backgroundColor: "#111" }}>
        <button onClick={() => setPage("dashboard")}>🏠 Dashboard</button>
        <button onClick={() => setPage("assistant")}>🤖 Assistant</button>
        <button onClick={() => setPage("fiche")}>📄 Fiche Produit</button>
        <button onClick={() => setPage("estimation")}>📈 Estimation</button>
        <button onClick={() => setPage("comparateur")}>💎 Comparateur</button>
        <button onClick={() => setPage("scraper")}>🧹 Scraper VC</button>
        <button onClick={() => setPage("quiz")}>📝 Quiz</button>
        <button onClick={() => setPage("academy")}>🎓 Academy</button>
      </nav>

      <main style={{ padding: "2rem" }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default SaasLayout;
