import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="p-4 text-xl font-bold">Bienvenue sur SELEZIONE 👑</div>} />
      </Routes>
    </Router>
  );
};

export default App;
