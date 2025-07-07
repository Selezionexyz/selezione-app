import React, { useState } from "react";
import AssistantLuxe from "./components/AssistantLuxe";
import FicheProduit from "./components/FicheProduit";
import EstimationLuxe from "./components/EstimationLuxe";
import ComparateurLuxe from "./components/ComparateurLuxe";
import ScraperVC from "./components/ScraperVC";
import Quiz from "./components/Quiz";
import Academy from "./components/Academy";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentComponent, setCurrentComponent] = useState("home");

  const renderContent = () => {
    switch (currentComponent) {
      case "assistant":
        return <AssistantLuxe />;
      case "fiche":
        return <FicheProduit />;
      case "estimation":
        return <EstimationLuxe />;
      case "comparateur":
        return <ComparateurLuxe />;
      case "scraper":
        return <ScraperVC />;
      case "quiz":
        return <Quiz />;
      case "academy":
        return <Academy />;
      case "dashboard":
        return <Dashboard />;
      default:
        return (
          <div style={{ padding: "2rem", color: "white" }}>
            <h1>Bienvenue sur SELEZIONE</h1>
            <p>Le rendu React fonctionne. Sélectionnez un composant.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh" }}>
      <nav style={{ padding: "1rem", background: "#111" }}>
        <button onClick={() => setCurrentComponent("assistant")}>Assistant Luxe</button>
        <button onClick={() => setCurrentComponent("fiche")}>Fiche Produit</button>
        <button onClick={() => setCurrentComponent("estimation")}>Estimation Luxe</button>
        <button onClick={() => setCurrentComponent("comparateur")}>Comparateur Luxe</button>
        <button onClick={() => setCurrentComponent("scraper")}>Scraper Vestiaire</button>
        <button onClick={() => setCurrentComponent("quiz")}>Quiz</button>
        <button onClick={() => setCurrentComponent("academy")}>Academy</button>
        <button onClick={() => setCurrentComponent("dashboard")}>Dashboard</button>
      </nav>

      <main style={{ padding: "1rem" }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
