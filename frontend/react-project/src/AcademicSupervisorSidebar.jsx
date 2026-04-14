import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function AcademicSupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Academic Super</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="weeklylogs">Weekly Logs</NavLink>
      <NavLink to="inputweeklylogs">Create Weekly Log</NavLink>
      <NavLink to="searchlog">Search Logs</NavLink>
      

    </div>
  );
}

export default AcademicSupervisorSidebar;