// Importaciones necesarias
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Home from './pages/Home/home.jsx';
import UniqExperience from './pages/Experience/uniqExperience.jsx';
import Skills from './pages/Skills/skills.jsx';
import Projects from './pages/Projects/projects.jsx';
import Template1Home from './templates/template1/pages/home/home.jsx';

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      return () => {
        gsap.to(ref.current, { opacity: 0, duration: 1 });
      };
    }
  }, [location.pathname]);
  return <div ref={ref}>{children}</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
      <Route path="/Skills" element={<PageTransitionWrapper><Skills /></PageTransitionWrapper>} />
      <Route path="/Experience/:id" element={<PageTransitionWrapper><UniqExperience /></PageTransitionWrapper>} />
      <Route path="/Projects" element={<PageTransitionWrapper><Projects /></PageTransitionWrapper>} />
      <Route path="/Template1" element={<PageTransitionWrapper><Template1Home /></PageTransitionWrapper>} />
    </Routes>
  );
}

export default App;