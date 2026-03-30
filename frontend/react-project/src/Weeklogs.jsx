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
        .then(data => setlogs(data))
        .catch(error => console.error ('Error fetching WeeklyLogs:', error));
    }, []);
     return (
        <div className='page'>
            <h1>Weekly Logs</h1>
            <ul>
                {logs.map((log) => (
                    <li key={log.id} className='log'>
                        <p className='student-name'><strong className='student'>Student:</strong> {log.Student_Name}</p>
                        <p><strong>Activities:</strong> {log.Activities}</p>
                        <p><strong>Week_Number:</strong> {log.Week_Number}</p>
                        <p><strong>Supervisior:</strong> {log.Supervisor}</p>
                        <p><strong>Supervisior Comment:</strong> {log.Supervisor_Comment}</p>
                        
                        <p><strong>Progress:</strong> {log.Progress}%</p>
                        <p><strong>Hours_worked:</strong> {log.Hours_Worked} hours</p>
                        <p><strong>Remaining Time for Internship to end:</strong> {log.Remaining_time_for_Internship }hours </p>
                        
                    </li>
                ))}
            </ul>
        </div>
     )
}
export default Weeklogs;
