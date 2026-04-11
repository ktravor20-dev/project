import { Routes, Route, useLocation } from 'react-router-dom';
import Weeklogs from './Weeklogs';
import { useNavigate } from 'react-router-dom';
import Inputweeklylogs from './Inputweeklylogs';
import CreateInternPlacement from './CreateInternPlacement';
import DashboardHome from './DashboardHome';
import ViewInternPlacement from './ViewInternPlacement';
import { Outlet } from 'react-router-dom';
import SupervisorDashboard from './SupervisorDashboard';
import AdminDashboard from './AdminDashboard';


function AppContent() {
    const location = useLocation();

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


  

    return (
      
        <div className="app">

          <div className="sidebar">
              <h2>Welcome {localStorage.getItem('username') || 'User'}</h2>
              
              <p  onClick={() => navigate('/studentDashboard/weeklylogs')}>Weekly Logs</p>
              <p>Students</p>
              <p>Supervisors</p>
              <p  onClick={() => navigate('/studentDashboard/createinternshipplacement')}> Create Internship Placements</p>
              <p  onClick={() => navigate('/studentDashboard/viewinternshipplacements')}>View Internship Placements</p>
              
              <p  onClick={() => navigate('/studentDashboard/inputweeklylogs')}>Create Weekly Log</p>
              <button onClick={handleLogout} className="logout-btn">Logout </button>
            </div>

            <div className="main">
             <Outlet />
              <Routes>
                {role === 'STUDENT' && (
                  <>
                    <Route index element={<DashboardHome />}/>
                    <Route path='weeklylogs' element={<Weeklogs />}/>
                    <Route path='inputweeklylogs' element={<Inputweeklylogs />}/>
                    <Route path='createinternshipplacement' element={<CreateInternPlacement />}/>
                    <Route path='viewinternshipplacements' element={<ViewInternPlacement />}/>
                  </>
                )}

                {role === 'INTERN_SUPERVISOR' && (
                  <>
                    <Route index element={<SupervisorDashboard />}/>
                  </>
                )}

                {role === 'SYSTEM_ADMINSTRATOR' && (
                  <>
                    <Route path='/' element={<AdminDashboard />}/>
                  </>
                )}
              </Routes>
            </div>

          
        </div>

        
          );
}
export default AppContent;
   

        