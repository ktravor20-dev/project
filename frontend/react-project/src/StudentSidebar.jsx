import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function StudentSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Student</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="weeklylogs">Weekly Logs</NavLink>
      <NavLink to="inputweeklylogs">Create Weekly Log</NavLink>
      

    </div>
  );
}

export default StudentSidebar;