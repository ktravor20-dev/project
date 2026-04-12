
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import AppContent from './dashboard';
import StaffRegistration from './StaffRegistration';  
import SupervisorDashboard from './SupervisorDashboard';
import AdminDashboard from './AdminDashboard';

import './App.css';

function App() {
    return (
      <Router>
        <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/studentDashboard/*' element={<AppContent />} />
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/supervisorDashboard/*' element={<SupervisorDashboard/>} />
              <Route path='/adminDashboard/*' element={< AdminDashboard/>} />
              <Route path='/staffRegister' element={<StaffRegistration />}/>
        </Routes>
        

        
      </Router>
    );
}

export default App;
