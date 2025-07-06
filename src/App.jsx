import React, { useState } from "react";
import "./index.css";
import Dashboard from "./components/Dashboard";
import AssistantLuxe from "./components/AssistantLuxe";
import FicheProduit from "./components/FicheProduit";
import EstimationLuxe from "./components/EstimationLuxe";
import ComparateurLuxe from "./components/ComparateurLuxe";
import ScraperVC from "./components/ScraperVC";
import Quiz from "./components/Quiz";
import Academy from "./components/Academy";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
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
    <div>
     <nav style={{ padding: "1rem", background: "#111" }}>
  <button onClick={() => setCurrentPage("assistant")}>Assistant Luxe</button>
  <button onClick={() => setCurrentPage("fiche")}>Fiche Produit</button>
  <button onClick={() => setCurrentPage("estimation")}>Estimation Luxe</button>
  <button onClick={() => setCurrentPage("comparateur")}>Comparateur</button>
  <button onClick={() => setCurrentPage("scraper")}>Scraper Vestiaire</button>
  <button onClick={() => setCurrentPage("quiz")}>Quiz</button>
  <button onClick={() => setCurrentPage("academy")}>Academy</button>
  <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
</nav> 
      <div style={{ padding: "2rem" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
