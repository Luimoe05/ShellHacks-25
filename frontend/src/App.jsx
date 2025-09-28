import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Homepage from "./Pages/Homepage/Homepage.jsx";
// import Gemini from "./AIpage/Gemini.jsx";
import AIPage from "./AIpage/AIPage.jsx";
import OnboardingStepper from "./Components/OnboardingStepper.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Footer from "./Pages/Footer.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gemini" element={<AIPage />} />
        <Route path="/onboarding" element={<OnboardingStepper />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
