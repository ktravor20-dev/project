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


    const hideSidebar = ["/","/login", "/register"].includes(location.pathname);

    return (
      
        <div className="app">

          {/* Sidebar */}
          {!hideSidebar && (
            <div className="sidebar">
              <h2>InternSys</h2>
              <p>Dashboard</p>
              <p>Weekly Logs</p>
              <p>Students</p>
              <p>Supervisors</p>
              <button onClick={handleLogout} className="logout-btn">Logout </button>
            </div>
          )}

          {/* Main Content */}
          <div className="main">  
            <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/weeklylogs' element={<Weeklogs />}/>
            </Routes>
          </div>  

        </div>
          );
}
export default AppContent;
   

        