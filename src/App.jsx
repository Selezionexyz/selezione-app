import React from "react";
import SaasLayout from "./components/SaasLayout";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <SaasLayout />
      </div>
    </ErrorBoundary>
  );
}

export default App;
