import React, { useState } from "react";

function App() {
  const [state, setState] = useState(0);

  return (
    <div style={{ color: "white", backgroundColor: "black", height: "100vh", padding: "2rem" }}>
      <h1>Test React SELEZIONE 🔁</h1>
      <p>Valeur : {state}</p>
      <button onClick={() => setState(state + 1)}>Incrémenter</button>
    </div>
  );
}

export default App;
