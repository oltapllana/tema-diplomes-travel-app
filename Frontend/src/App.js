import "./App.css";
import "./styles/login.css";
import "./styles/modal.css";
import "./styles/main.css";
import './styles/admin.css'
import Homepage from "./components/Homepage";
import "./styles/components.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/login/LoginRegister";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
