import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function AcademicSupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Academic Supervisor</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="weeklylogs">Weekly Logs</NavLink>
      <NavLink to="searchlog">Search Logs</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>
      <NavLink to="createinternshipplacements">Create Placements</NavLink>
      

    </div>
  );
}

export default AcademicSupervisorSidebar;