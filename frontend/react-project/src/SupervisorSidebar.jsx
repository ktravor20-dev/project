import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function SupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Supervisor</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>
      <NavLink to="weeklylogs">Weekly Logs</NavLink>
      <NavLink to="searchlog">Search Logs</NavLink>
      <NavLink to="inputweeklylogs">Create Weekly Log</NavLink>

      

      
    </div>
  );
}

export default SupervisorSidebar;