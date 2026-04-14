
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Supervisordefaultview from './Supervisordefaultview';



function SupervisorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

 

  return (
    <div className='app'>
      

      
              
      
       <div className='main'>
         <Outlet />
              
       </div> 
      

      
    </div>
  );
}
export default SupervisorDashboard;