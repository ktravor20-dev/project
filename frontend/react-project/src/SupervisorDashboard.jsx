import { Routes, Route } from 'react-router-dom';
import Weeklogs from './Weeklogs';
import { useNavigate } from 'react-router-dom';
import Inputweeklylogs from './Inputweeklylogs';
import { Outlet } from 'react-router-dom';
import ViewInternPlacement from './ViewInternPlacement';
import Supervisordefaultview from './Supervisordefaultview';


function SupervisorDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

 

  return (
    <div className='app'>
      

      <div className='sidebar'style={{background:'#18cd48'}}> 

              <h2>Welcome {localStorage.getItem('username') || 'User'}</h2>
              <p  onClick={() => navigate('/supervisorDashboard/weeklylogs')}> View Weekly Logs</p>
              <p  onClick={() => navigate('/supervisorDashboard/inputweeklylogs')}>Create Weekly Log</p>
              <p  onClick={() => navigate('/supervisorDashboard/viewinternshipplacements')}>View Internship Placements</p>
              <button onClick={logout} className="logout-btn">Logout </button>
      </div>        

              
      
       <div className='main'>
         
        
         <Routes>
          <Route index element={<Supervisordefaultview />}/>
          <Route path='weeklylogs' element={<Weeklogs />}/>
          <Route path='inputweeklylogs' element={<Inputweeklylogs />}/>
          <Route path='viewinternshipplacements' element={<ViewInternPlacement />}/>
         </Routes>
        
        </div> 
      

      
    </div>
  );
}
export default SupervisorDashboard;