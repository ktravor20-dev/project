import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function SupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Supervisor</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="students">Students</NavLink>
      <NavLink to="reviews">Review Logs</NavLink>
      <NavLink to="searchlog">Search Logs</NavLink>

      

      
    </div>
  );
}

export default SupervisorSidebar;