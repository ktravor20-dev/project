import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function AdminSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Admin</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="weeklylogs">Weekly Logs</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>

      
    </div>
  );
}

export default AdminSidebar;