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
        <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>🔔 Feedback From Your Intern Supervisor Notifications <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: '9999px' }}>
      {alerts.length} New
    </span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.length ===0 ?(<div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><p> No feedback submitted by your supervisor yet</p></div>):(
                alerts.map(alert=>(<div key={alert.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', borderLeft: '4px solid #2563eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}><p><strong style={{color:'#457eb899'}}>{alert.message}</strong> at <span style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date(alert.created_at).toLocaleString()}</span></p></div>
                </div>))
            )}
            </div>

        </div>
    )
}
export default WeekLogNotifications