import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillBridgeLanding from "./LandingPage/LadingPage";
import SignupPage from "./Forms/Signup";
import Login from "./Forms/Login";
import RoleSelector from './utils/RoleSelector';
import TeacherDashboard from './LandingPage/TeacherDashboard';
import StudentDashboard from './LandingPage/StudentDashboard';
import TeacherProfile from './Forms/TeacherProfile';

function App() {
  return (
        <Router>
        <Routes>
          <Route path="/select-role" element={<RoleSelector />} /> 
          <Route path="/" element={<SkillBridgeLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/student" element={<StudentDashboard />} /> 
          <Route path="/teacher" element={<TeacherDashboard />} /> 
        </Routes>
      </Router>
      // <TeacherProfile/>
  );
}

export default App;