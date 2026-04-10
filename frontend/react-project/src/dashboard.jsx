import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import Weeklogs from './Weeklogs';
import { useNavigate } from 'react-router-dom';

function AppContent() {
    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


  

    return (
      
        <div className="app">

          <div className="sidebar">
              <h2>Welcome {localStorage.getItem('username') || 'User'}</h2>
              
              <p  onClick={() => navigate('/weeklylogs')}>Weekly Logs</p>
              <p>Students</p>
              <p>Supervisors</p>
              <p  onClick={() => navigate('/createinternshipplacement')}> Create Internship Placements</p>
              
              <p  onClick={() => navigate('/inputweeklylogs')}>Create Weekly Log</p>
              <button onClick={handleLogout} className="logout-btn">Logout </button>
            </div>

          
        </div>
          );
}
export default AppContent;
   

        