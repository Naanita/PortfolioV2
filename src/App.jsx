// Importaciones necesarias
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import UniqExperience from './pages/Experience/uniqExperience.jsx';
import Skills from './pages/Skills/skills.jsx';
import Projects from './pages/Projects/projects.jsx';
import Template1Home from './templates/template1/pages/home/home.jsx';
import MapStore from './pages/StoreLocator/mapStore.jsx';
import Counter from './pages/Counter/counter.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Skills" element={<Skills />} />
      <Route path="/Experience/:id" element={<UniqExperience />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Template/1" element={<Template1Home />} /> 
      <Route path="/StoreLocator" element={<MapStore />} />
      <Route path='/counter' element={<Counter targetDate={new Date(2025, 0, 15, 0, 0, 0, 0)} />} />
    </Routes>
  );
}

export default App;