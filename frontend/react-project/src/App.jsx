
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import AppContent from './dashboard';

import './App.css';

function App() {
    return (
      <Router>
        <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/studentDashboard/*' element={<AppContent role="student" />} />
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/supervisorDashboard/*' element={<AppContent role="supervisor" />} />
              <Route path='/adminDashboard/*' element={<AppContent role="admin" />} />
        </Routes>
        

        
      </Router>
    );
}

export default App;
