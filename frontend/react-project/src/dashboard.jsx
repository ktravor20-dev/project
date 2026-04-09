import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import Weeklogs from './Weeklogs';

function AppContent() {
    const location = useLocation();

    const hideSidebar = ["/", "/register"].includes(location.pathname);

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

          {/* Main Content */}
          <div className="main">  
            <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/weeklylogs' element={<Weeklogs />}/>
            </Routes>
          </div>  

        </div>
          );
}
export default AppContent;
   

        