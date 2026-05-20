import { FaClipboardList } from "react-icons/fa";

import { Routes, Route, useLocation } from 'react-router-dom';
import StudentLogNotification from "./StudentLogNotification";
import MessageAlerts from "./MessageAlerts";

function Supervisordefaultview() {
    return(
        <div >
            <div className="cards">
                <div className="card green">
                    <FaClipboardList style={{ marginnRight: "8px" }}/>Student Assigned
                </div>

                <div className="card orange">
                    Pending  Approvals
                    
                </div>
            </div>
            <div><MessageAlerts/></div>
            <div><StudentLogNotification/></div>

        </div>
    )
}
export default Supervisordefaultview;