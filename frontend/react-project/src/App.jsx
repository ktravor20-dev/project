
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import Weeklogs from './Weeklogs.jsx';
import AppContent from './dashboard';
import './App.css';

function App() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
}

export default App;
