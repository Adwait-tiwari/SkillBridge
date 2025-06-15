import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillBridgeLanding from "./LandingPage/LadingPage";
import SignupPage from "./Forms/Signup";
import Login from "./Forms/Login";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<SkillBridgeLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </Router>
  );
}

export default App;