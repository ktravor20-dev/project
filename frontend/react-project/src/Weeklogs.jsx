import  React, {useState, useEffect } from 'react';
import './Weeklogs.css';
 
function Weeklogs() {
    const [logs ,setlogs] =useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/get_weekly_logs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setlogs(data);
        })
        .catch(error => console.error ('Error fetching WeeklyLogs:', error));
    }, []);
     return (
        <>
            <h1 className="page-title">Weekly Logs</h1>
            <div className="logs-container">
                {logs.map((log) => (
                    <div key={log.id} className='log'>

                        <p className="student-name">Name:{log.Student_Name.first_name} , {log.Student_Name.last_name}</p>
                        <p><span className="label">Activities:</span> {log.Activities}</p>
                        <p><span className="label">Week_Number:</span> {log.Week_Number}</p>
                        <p><span className="label">Supervisior:</span> {log.Supervisor}</p>
                        <p><span className="label">Supervisior Comment:</span> {log.Supervisor_Comment}</p>
                        
                        <p><span className="label">Progress:</span></p>
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${log.Progress}%` }}></div>
                        </div>
                        <p><span className="label">Hours_worked: {log.Hours_Worked} </span></p>
                        <p><span className="label">Remaining Time for Internship to end:</span> {log.Remaining_time_for_Internship }hours </p>
                        
                    </div>
                ))}
            </div>
        </>
     )
}
export default Weeklogs;
