import { NavLink } from "react-router-dom";
import './StudentSidebar.css';

function StudentSidebar() {
  return (
    <div className="sidebar-links">
      <h2>Student</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="weeklylogs">Supervisor Feedback</NavLink>
      <NavLink to="createstudentlog">Create your Student Log</NavLink>
      <NavLink to='viewstudentlog'>View student Log</NavLink>
      <NavLink to="viewinternshipplacements">View Placements</NavLink>
      <NavLink to="sendmessage">send Messages</NavLink>
      <NavLink to="viewmessage">View Messages</NavLink>
      
      

    </div>
  );
}

export default StudentSidebar;