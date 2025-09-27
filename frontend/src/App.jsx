import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OnboardingStepper from "./Components/Onboarding/OnboardingStepper.jsx"

import "./App.css";
import Homepage from "./Components/Pages/Homepage.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/onboarding" element={<OnboardingStepper />} />
      </Routes>
    </Router>
  );
}

export default App;
