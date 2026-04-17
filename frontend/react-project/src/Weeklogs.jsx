import  React, {useState, useEffect } from 'react';
import './Weeklogs.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
function Weeklogs() {
    const [logs ,setlogs] =useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchLogs = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/get_weekly_logs/', {
                    headers: {
                        Authorization: `Bearer ${token}`}

                    
                });
                setlogs(response.data);
                    
            }catch(error){
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.error('An error occurred while fetching logs:', error);
                }
                

            }
        };
        fetchLogs();
    },[]);
     const Return=()=>{
        const role=localStorage.getItem('role')
        if (role === 'STUDENT'){
            navigate('/studentDashboard');
        }
        else if( role ==='INTERN_SUPERVISOR'){
            navigate('/supervisorDashboard');} 
        else if (role ==='ACADEMIC_SUPERVISOR'){
            navigate('/adminDashboard');
        } else if (role==='SYSTEM_ADMINSTRATOR') {
            navigate('/systemDashboard')
        } 
    }

    const Delectlog=async (id) =>{
        try {
            if (window.confirm('Are you sure you want to delete this log?')) {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/delete_weekly_log/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setlogs(logs.filter(log => log.id !== id));
            }}
            catch (error) {
                console.error('An error occurred while deleting the log:', error);
            }
        
    }    
    
    
     return (
        <>
            <h1 className="page-title">Supervisor Feedback</h1>
            <div className="logs-container">
                {logs.map((log) => (
                    <div key={log.id} className='log'>

                        <p className="student-name">Name:{log.Student_Name.first_name}   {log.Student_Name.last_name}</p>
                        <div> 
                            <strong>Activites</strong>
                            <ol >
                                {log.Activities.split('\n').map((activity, index) => (<li key={index}>{activity}</li>))}
                            </ol>

                            </div> 
                        <p><span className="label">Week_Number:</span> {log.Week_Number}</p>
                        <p><span className="label">Supervisior:</span> {log.Supervisor}</p>
                        <p><span className="label">Supervisior Comment:</span> {log.Supervisor_Comment}</p>
                        
                        <p><span className="label">Progress:</span></p>
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${log.Progress}%` }}></div>
                        </div>
                        <p><span className="label">Hours_worked: {log.Hours_Worked} </span></p>
                        <p><span className="label">Remaining Time for Internship to end:</span> {log.Remaining_time_for_Internship }hours </p>
                        <button onClick={() => Delectlog(log.id)} className="delete-btn">Delete</button>
                        
                    </div>
                ))}
                <button onClick={Return} className="return-btn">Return to Dashboard</button>
            </div>
            
        </>
     )
}
export default Weeklogs;
