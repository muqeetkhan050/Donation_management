

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CreateCause from './components/CreateCause';
import CausesPage from './components/CausesPage'; // Add this import

// Simple Home component
const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Donation Management</h1>
      <p>Create and manage donation causes to make a positive impact.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/causes" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#1a73e8', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          marginRight: '10px'
        }}>
          View All Causes
        </a>
        <a href="/create-cause" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px'
        }}>
          Create New Cause
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-cause" element={<CreateCause />} />
        <Route path="/causes" element={<CausesPage />} /> {/* ADD THIS LINE */}
      </Routes>
    </Router>
  );
}

export default App;