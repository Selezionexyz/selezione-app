import React, { useState } from "react";
import SaasLayout from "./components/SaasLayout";
import Navbar from "./components/Navbar";
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
      case "dashboard": return <Dashboard />;
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
    <SaasLayout>
      <Navbar setCurrentComponent={setCurrentComponent} />
      {renderComponent()}
    </SaasLayout>
  );
}

export default App;
