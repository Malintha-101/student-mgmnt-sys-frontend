import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Dashboard from './pages/dashboard';
import Batches from './pages/batches';
import Students from './pages/students';
import Course from './pages/courses';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Students />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path='/batches' element={<Batches />} />
      <Route path='/students' element={<Students />} />
      <Route path='/courses' element={<Course />} />
      </Routes>
    </Router>
  )
}

export default App
