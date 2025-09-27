import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Homepage from "./Pages/Homepage/Homepage.jsx";
import Gemini from "./Pages/Gemini.jsx";
import OnboardingStepper from "./Components/OnboardingStepper.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gemini" element={<Gemini />} />
        <Route path="/onboarding" element={<OnboardingStepper />} />
      </Routes>
    </Router>
  );
}

export default App;
