// Importaciones necesarias
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import UniqExperience from './pages/Experience/uniqExperience.jsx';
import Skills from './pages/Skills/skills.jsx';
import Projects from './pages/Projects/projects.jsx';
import Template1Home from './templates/template1/pages/home/home.jsx';
import MapStore from './pages/StoreLocator/mapStore.jsx';
// import Counter from './pages/Counter/counter.jsx';
// import FlexVu from './pages/FlexVu/FlexVu.jsx';
import FlexVu2 from './pages/FlexVu/FlexVu2.jsx';
import ColorVu3 from './pages/ColorVu/colorvu3.jsx'
import FlexVu3D from './pages/FlexVu/flexVu3D.jsx'
import TilemapGrid from './pages/SMB/homeScenario.jsx'
import Test from './pages/SMB/test.jsx';
import TikHikLatam from './pages/Tiktok/latam/TikHikLatam.jsx'
import TikHikMx from './pages/Tiktok/mx/TikHikMx.jsx'


// ImprovedNoise

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Skills" element={<Skills />} />
      <Route path="/Experience/:id" element={<UniqExperience />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Template/1" element={<Template1Home />} /> 
      <Route path="/StoreLocator" element={<MapStore />} />
      {/* <Route path="/FlexVu" element={<FlexVu />} /> */}
      <Route path="/FlexVu2" element={<FlexVu2 />} />
      <Route path='/ColorVu3' element={<ColorVu3/>} />
      <Route path='/FlexVu3D' element={<FlexVu3D/>} />
      <Route path='/smb/home' element={<TilemapGrid/>} />
      <Route path='/smb/test' element={<Test/>} />
      <Route path='/tiktok/latam' element={<TikHikLatam/>}/>
      <Route path='/tiktok/mx' element={<TikHikMx/>}/>
      
      
      {/* <Route path='/counter' element={<Counter targetDate={new Date(2025, 0, 15, 0, 0, 0, 0)} />} /> */}
    </Routes>
  );
}
 
export default App;