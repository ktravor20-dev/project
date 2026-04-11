
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import Weeklogs from './Weeklogs.jsx';
import AppContent from './dashboard';
import Inputweeklylogs from './Inputweeklylogs';
import CreateInternPlacement from './CreateInternPlacement';
import ViewInternPlacement from './ViewInternPlacement';
import './App.css';

function App() {
    return (
      <Router>
        <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/studentDashboard' element={<AppContent />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/weeklylogs' element={<Weeklogs />}/>
              <Route path='/inputweeklylogs' element={<Inputweeklylogs />}/>
              <Route path='/createinternshipplacement' element={<CreateInternPlacement />}/>
              <Route path='/viewinternshipplacements' element={<ViewInternPlacement />}/>
        </Routes>
        

        
      </Router>
    );
}

export default App;
