import { FaClipboardList } from "react-icons/fa";

import { Routes, Route, useLocation } from 'react-router-dom';
import StudentLogNotification from "./StudentLogNotification";

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
            
            <StudentLogNotification/>

        </div>
    )
}
export default Supervisordefaultview;