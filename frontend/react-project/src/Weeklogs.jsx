import  React, {useState, useEffect } from 'react';
import './Weeklogs.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast} from 'react-toastify';
 
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
    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8000/api/weeklylogstatus_update/${id}/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setlogs(logs.map(log => log.id === id ? { ...log, is_read: true } : log));
            console.log('Log marked as read');
            toast.success('the supervisor will be notified that you have seen your weekly log')
        } catch (error) {
            console.error('An error occurred while marking the log as read:', error);
            toast.error('An error occurred while notifying the supervisor that you have seen the weekly log.');
        } ;
    }

    const role = localStorage.getItem('role');
    
    
     return (
        <>
            <h1 className="page-title">Created feedback from the Supervisor</h1>
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
                       {role === 'INTERN_SUPERVISOR' && (
                            <button onClick={() => Delectlog(log.id)} className="delete-btn">Delete</button>
                        )}
                        { role==='STUDENT'&&(
                                 <button className={`status-text ${log.is_read? 'status-read':'status-pending'}`} onClick={()=>markAsRead(log.id)}>
                            Status:
                            {log.is_read ? "Marked as seen":'Unmarked as seen'}
                           </button>
                            )}
                            {role==='INTERN_SUPERVISOR' &&(<p className={`status-text ${log.is_read? 'status-read':'status-pending'}`}>
                                <strong>status:</strong>{log.is_read? 'Read':'Unread'}

                            </p>)}
                          

                           
                           

                        
                        
                    </div>
                ))}
                <button onClick={Return} className="return-btn">Return to Dashboard</button>
            </div>
            
        </>
     )
}

export default Weeklogs;
