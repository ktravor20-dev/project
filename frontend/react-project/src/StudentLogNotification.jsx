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
        <div className='notification-container'>
            <h2>Student Log Notifications</h2> 
            {notifications.length === 0 ? (
                <p>No studentlogs submitted yet .</p>
            ) : (
                notifications.map(notification => (
                    <div key={notification.id} >
                        <p><strong style={{color:'#457eb899'}}>{notification.message}</strong> at <small style={{color:'#7f8c8d'}}>{new Date(notification.created_at).toLocaleString()}</small></p>
                        
                    </div>
                ))
            )}
        </div>
     );
}
export default StudentLogNotification;