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
  const [currentComponent, setCurrentComponent] = useState("");

  const renderComponent = () => {
    if (currentComponent === "assistant") return <AssistantLuxe />;
    if (currentComponent === "fiche") return <FicheProduit />;
    if (currentComponent === "estimation") return <EstimationLuxe />;
    if (currentComponent === "comparateur") return <ComparateurLuxe />;
    if (currentComponent === "scraper") return <ScraperVC />;
    if (currentComponent === "quiz") return <Quiz />;
    if (currentComponent === "academy") return <Academy />;
    if (currentComponent === "dashboard") return <Dashboard />;
    return (
      <div style={{ color: "white", padding: "2rem" }}>
        <h2>Bienvenue sur SELEZIONE</h2>
        <p>Le rendu React fonctionne. Le problème vient probablement d’un composant importé.</p>
      </div>
    );
  };

  return (
    <div>
      <div style={{ backgroundColor: "#111", padding: "1rem", display: "flex", flexWrap: "wrap" }}>
        <button onClick={() => setCurrentComponent("assistant")}>Assistant Luxe</button>
        <button onClick={() => setCurrentComponent("fiche")}>Fiche Produit</button>
        <button onClick={() => setCurrentComponent("estimation")}>Estimation Luxe</button>
        <button onClick={() => setCurrentComponent("comparateur")}>Comparateur</button>
        <button onClick={() => setCurrentComponent("scraper")}>Scraper Vestiaire</button>
        <button onClick={() => setCurrentComponent("quiz")}>Quiz</button>
        <button onClick={() => setCurrentComponent("academy")}>Academy</button>
        <button onClick={() => setCurrentComponent("dashboard")}>Dashboard</button>
      </div>
      <div style={{ padding: "2rem" }}>{renderComponent()}</div>
    </div>
  );
}

export default App;
