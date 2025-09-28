import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage.jsx";
import AIPage from "./AIpage/AIPage.jsx";
import OnboardingStepper from "./Components/OnboardingStepper.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import About from "./Pages/About.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gemini" element={<AIPage />} />
        <Route path="/onboarding" element={<OnboardingStepper />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
