import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentLogNotification(){
    const[notifications,setNotifications]=useState([]);

    useEffect( ()=>{
        const token =localStorage.getItem('token');
        const getNotifications = async () =>{
            try{
                const respones= await axios.get('http://localhost:8000/api/studentlog_notifications/',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setNotifications(respones.data);
            } catch (error) {
                alert('An error has occurred while fetching notifications');
                console.error('Error fetching notifications:', error);
            }
        }
        getNotifications();
    },[]);
    return(
        <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}> 📥 Student Log Notifications
                <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: '9999px' }}>
                    {notifications.length}
    </span></h2> 
            <div style={{ display: 'flex', flexDirection: 'col', gap: '12px' }} >
            {notifications.length === 0 ? (
                <p>No studentlogs submitted yet .</p>
            ) : (
                
                notifications.map(notification => (
                    <div key={notification.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p><strong style={{color:'#3cb57399'}}>{notification.message}</strong> at <small style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date(notification.created_at).toLocaleString()}</small></p>
                        
                    </div>
                    
                ))
            )}
            </div>
        </div>
     );
}
export default StudentLogNotification;