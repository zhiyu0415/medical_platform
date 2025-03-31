import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicalAnalysisPlatform from './pages/MedicalAnalysisPlatform';
import Analysis from './pages/analysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicalAnalysisPlatform />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
