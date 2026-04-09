
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './RegisterNewUser';
import Login from './login';
import Weeklogs from './Weeklogs';
import './App.css';
import { useLocation } from 'react-router-dom';

function App() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
}

function AppContent() {
    const location = useLocation();

    return (
      
        <div className="app">

          {/* Sidebar */}
          {!["/", "/register"].includes(location.pathname) && ( 
            <div className="sidebar">
              <h2>InternSys</h2>
              <p>Dashboard</p>
              <p>Weekly Logs</p>
              <p>Students</p>
              <p>Supervisors</p>
            </div>
        )}

          {/* Main content */}
          <div className="main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/weeklylogs" element={<Weeklogs />} />
            </Routes>
          </div>

        </div>
      
    );
}
export default App;