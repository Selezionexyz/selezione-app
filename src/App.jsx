import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import AssistantLuxe from "./components/AssistantLuxe";
import ComparateurLuxe from "./components/ComparateurLuxe";
import EstimationLuxe from "./components/EstimationLuxe";
import FicheProduit from "./components/FicheProduit";
import ScraperVC from "./components/ScraperVC";
import Quiz from "./components/Quiz";
import Academy from "./components/Academy";

function App() {
  const [currentComponent, setCurrentComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (currentComponent) {
      case "dashboard":
        return <Dashboard />;
      case "assistant":
        return <AssistantLuxe />;
      case "comparateur":
        return <ComparateurLuxe />;
      case "estimation":
        return <EstimationLuxe />;
      case "fiche":
        return <FicheProduit />;
      case "scraper":
        return <ScraperVC />;
      case "quiz":
        return <Quiz />;
      case "academy":
        return <Academy />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ color: "white", backgroundColor: "black", minHeight: "100vh", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>SELEZIONE - SaaS Luxe</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
        <button onClick={() => setCurrentComponent("dashboard")}>🏠 Dashboard</button>
        <button onClick={() => setCurrentComponent("assistant")}>🤖 Assistant Luxe</button>
        <button onClick={() => setCurrentComponent("comparateur")}>💎 Comparateur</button>
        <button onClick={() => setCurrentComponent("estimation")}>📈 Estimation</button>
        <button onClick={() => setCurrentComponent("fiche")}>📄 Fiche Produit</button>
        <button onClick={() => setCurrentComponent("scraper")}>🧹 Scraper VC</button>
        <button onClick={() => setCurrentComponent("quiz")}>📝 Quiz</button>
        <button onClick={() => setCurrentComponent("academy")}>🎓 Academy</button>
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
}

export default App;
