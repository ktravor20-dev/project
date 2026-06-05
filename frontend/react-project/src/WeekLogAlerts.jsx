import { useState,useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

function WeekLogNotifications(){
    const[alerts,setAlerts]=useState([]);

    useEffect(()=>{
        const token =localStorage.getItem('token');
        const weeklyLogAlerts= async ()=>{
            try{
                const response=await axios.get('http://localhost:8000/api/weeklylog_notifications/',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAlerts(response.data)
            }catch(error){
                toast.error('An error has occurred while fetching weekly log notifications');
                console.error('Error fetching weekly log notifications:',error);
            }
        }
        weeklyLogAlerts();
    },[]);
    return(
        <div>
            <h2>Feedback From Your Intern Supervisor Notifications</h2>
            {alerts.length ===0 ?(<p> No feedback submitted by your supervisor yet</p>):(
                alerts.map(alert=>(<div key={alert.id} >
                    <p><strong style={{color:'#457eb899'}}>{alert.message}</strong> at <small style={{color:'#7f8c8d'}}>{new Date(alert.created_at).toLocaleString()}</small></p>
                </div>))
            )}

        </div>
    )
}
export default WeekLogNotifications