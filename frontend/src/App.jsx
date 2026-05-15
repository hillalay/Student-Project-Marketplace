import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import MyProjects from "./pages/MyProjects";
import MyApplications from "./pages/MyApplications";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;