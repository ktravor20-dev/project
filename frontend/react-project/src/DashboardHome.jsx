import { FaClipboardList } from "react-icons/fa";
import './DashboardHome.css';
import WeekLogNotifications from "./WeekLogAlerts";
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

      <WeekLogNotifications/>

      
    </div>
  );
}

export default DashboardHome;