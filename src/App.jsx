// Importaciones necesarias
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import UniqExperience from './pages/Experience/uniqExperience.jsx';
import Skills from './pages/Skills/skills.jsx';
import Projects from './pages/Projects/projects.jsx';
import Template1Home from './templates/template1/pages/home/home.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Skills" element={<Skills />} />
      <Route path="/Experience/:id" element={<UniqExperience />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Template/1" element={<Template1Home />} />
    </Routes>
  );
}

export default App;