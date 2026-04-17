import  React, {useState, useEffect } from 'react';
import './Weeklogs.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './status.css';

function ViewStudentLog(){
    const[logs, setlogs]=useState([])
    const[search,SetSearch]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        
        const getLogs= async ()=>{
            try{
             const token =localStorage.getItem('token');
             const response=await axios.get('http://localhost:8000/api/getstudentlog/',{
                headers:{
                    Authorization: `Bearer ${token}`
             }});
             setlogs(response.data)

            }catch(error){
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    alert('An error has occured while fetching your logs')
                    console.error('An error occurred while fetching logs:', error);
                }
            }};

        getLogs();    
                     
        }
    ,[]);

    const Return=()=>{
        const role=localStorage.getItem('role')
        if (role === 'STUDENT'){
            navigate('/studentDashboard');
        }
        else if( role ==='INTERN_SUPERVISOR'){
            navigate('/supervisorDashboard');} 
        else if (role ==='ACADEMIC_SUPERVISOR'){
            navigate('/adminDashboard/');
        } else if (role==='SYSTEM_ADMINSTRATOR') {
            navigate('/systemDashboard/')
        } 
    }

    const Delectlog=async (id) =>{
        try {
            if (window.confirm('Are you sure you want to delete this log?')) {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/delete_student_log/${id}/`, {
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
    const markRead =async(id) =>{
        try{
            const token =localStorage.getItem('token');
            console.log('sending token:',token)
            await axios.patch(`http://localhost:8000/api/update_log_status/${id}/`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
                
                    
                    
            });
            alert('status update');
            window.location.reload();

        }catch(error){

            

            alert('an error has occured:');
            console.log('error occured:',error.response?.data)
        }
    }
    const role=localStorage.getItem('role');
    
    return(
        <div>
           <h1 className="page-title">Student  Logs</h1>
           <div>
            <input
            type='text'
            placeholder='Search by week number'
            onChange={(e)=>SetSearch(e.target.value)}
            style={{width:'100%',padding:'12px',marginBottom:'20px',borderRadius:'8px',border:'1px solid #ddd'}}

            />
           </div>
             <div className="logs-container">
                {logs
                .filter((log)=>{
                    if(search==='')return true;
                    const logweek=String(log.Week_Number);
                    return logweek ===search;
                })
                
                
                
                
                
                .map((log) => (
                    <div key={log.id} className='log'>

                          <label>Supervisor's  Name </label>
                          <p className="student-name">{log.Supervisor.first_name}   {log.Supervisor.last_name}</p>

                          <label> Week Number</label>
                          <p> Week: {log.Week_Number}</p>

                          <div> 
                            <strong>Activites</strong>
                            <ol >
                                {log.Activities_Done.split('\n').map((activity, index) => (<li key={`activity-${index}`}>{activity}</li>))}
                            </ol>

                          </div> 


                          <div> 
                            <strong>Challenges</strong>
                            <ol >
                                {log.Challenges.split('\n').map((challenge, index) => (<li key={`challenge- ${index}`}>{challenge}</li>))}
                            </ol>

                          </div> 

                          
                          
                            { role==='INTERN_SUPERVISOR'&&(
                                 <button className={`status-text ${log.is_read? 'status-read':'status-pending'}`} onClick={()=>markRead(log.id)}>
                            Status:
                            {log.is_read ? "Seen":'Pending Review'}
                           </button>
                            )}
                            {role==='STUDENT' &&(<p className={`status-text ${log.is_read? 'status-read':'status-pending'}`}>
                                <strong>status:</strong>{log.is_read? 'Seen':'Pending Review'}

                            </p>)}
                          

                           {role==='STUDENT'&&(<button onClick={() => Delectlog(log.id)} className="delete-btn">Delete</button>)}
                           
                    </div>   
                 ))}

                 <button onClick={Return} className="return-btn">Return to Dashboard</button>

         </div>

        </div>
    )

}
export default  ViewStudentLog;