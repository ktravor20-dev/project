import { FaClipboardList } from "react-icons/fa";
import './DashboardHome.css';
function DashboardHome() {
  return (
    <div className="main"> 
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card green">
          <FaClipboardList style={{ marginRight: "8px" }}/>Total Logs: 12
        </div>

        <div className="card orange">
          Pending: 3
        </div>

        <div className="card blue">
          Approved: 7
        </div>
      </div>

      <h3>Recent Activity</h3>

      <p>Week 4 - Building a website</p>
    </div>
  );
}

export default DashboardHome;