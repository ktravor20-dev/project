import { Routes, Route, useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import SupervisorDashboard from './SupervisorDashboard';
import AdminDashboard from './AdminDashboard';
import StaffRegistration from './StaffRegistration';
import StudentSidebar from "./StudentSidebar";
import SupervisorSidebar from "./SupervisorSidebar";
import AdminSidebar from "./AdminSidebar";

function AppContent({role}) {
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
              
              {role === 'STUDENT' && <StudentSidebar />}
              {role === 'INTERN_SUPERVISOR' && <SupervisorSidebar />}
              {role === 'SYSTEM_ADMINSTRATOR' && <AdminSidebar />}
              <button onClick={handleLogout} className="logout-btn">Logout </button>
          </div>

          <div className="main">
             <Outlet />
              
          </div>

          
        </div>

        
          );
}
export default AppContent;
   

        