
import { useLocation } from 'react-router-dom';




function AppContent() {
    const location = useLocation();

    return (
      
        <div className="app">
            {/* Sidebar */}
          {location.pathname !== "/" && ( 
            <div className="sidebar">
              <h2>InternSys</h2>
              <p>Dashboard</p>
              <p>Weekly Logs</p>
              <p>Students</p>
              <p>Supervisors</p>
              </div>
            )}

        </div>
          )}
export default AppContent;
   

        