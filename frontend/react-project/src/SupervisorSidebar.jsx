import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function SupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>InternSupervisor</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>
      <NavLink to="weeklylogs">View created weekly logs</NavLink>
      <NavLink to="inputweeklylogs">Create a weekly log for a student</NavLink>
      <NavLink to="searchlog">Search Logs</NavLink>
      <NavLink to='viewstudentlog'>View student Logs</NavLink>   
      <NavLink to="messages">Messages</NavLink>  
      <NavLink to="sendmessage">send Messages</NavLink>
      <NavLink to="viewmessage">View Messages</NavLink>

      
    </div>
  );
}
export default SupervisorSidebar;


