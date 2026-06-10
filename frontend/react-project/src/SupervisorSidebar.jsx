import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function SupervisorSidebar() {
  return (
    <div className="sidebar-links">
      <h2>InternSupervisor</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>
      <NavLink to="weeklylogs">View created  feedback on studentlogs</NavLink>
      <NavLink to="inputweeklylogs">Create a feedback on studentlog</NavLink>
      <NavLink to="searchlog">Get all feedback created for a particular student</NavLink>
      <NavLink to='viewstudentlog'>View student Logs</NavLink>   
      
      <NavLink to="sendmessage">send Messages</NavLink>
      <NavLink to="viewmessage">View Messages</NavLink>

      
    </div>
  );
}
export default SupervisorSidebar;


