import { FaClipboardList } from "react-icons/fa";

import { Routes, Route, useLocation } from 'react-router-dom';

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
            <h3>Recent Activity</h3>
            <p> Student X submitted a new weekly log.</p>

        </div>
    )
}
export default Supervisordefaultview;