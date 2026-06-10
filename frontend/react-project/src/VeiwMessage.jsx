import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './VeiwMessage.css';

function ViewMessage(){
    const[ messages, SetMessages]=useState([]);
    

    useEffect(()=>{
        const fetchMessages=async()=>{
            try{
                const token=localStorage.getItem("token");
                const response=await axios.get("https://backend-qgig.onrender.com/api/get_message/",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                SetMessages(response.data);
                console.log("Messages fetched successfully:", response.data);
                const[toastId]=toast.info("Messages fetched successfully", { autoClose: 2000 });
                return () => {
                    toast.dismiss(toastId);
                };

            }catch (error) {
                console.error("Error fetching messages:", error);
                toast.error("Failed to fetch messages");
            }
        };
        fetchMessages();
    },[]);

    return(
        <div className="inbox-page">
            <h2 className="page-title">Messages Inbox</h2>
            <div className="inbox-container">
            {messages.length === 0 ? (
                <div className="empty-inbox">
                <p>No messages sent to you yet.</p>
                </div>)
                 : 
                 ( messages.map((message) => (
                    <div key={message.id} className='inbox-card'>
                         <div className="card-accent-stripe"></div>
                         <div className="card-content-wrapper">

                        <div className="inbox-card-header">
                            
                            <div className="sender-info">
                                 <div className="avatar-badge">
                                 {message.sender.first_name ? message.sender.first_name[0].toUpperCase() : 'M'}
                            </div>
                            <div className="sender-text-group">
                                <span className="from-label">From</span>
                                
                            <p> <span className="sender-name">{message.sender.first_name} {message.sender.last_name} 
                            </span><span className="sender-badge">{message.sender.role}</span>
                           </p>
                        </div>
                             
                        
                            </div>
                        
                        
                           <div className="inbox-date">
                           Sent At: {new Date(message.created_at).toLocaleString([], {hour: '2-digit', minute:'2-digit', month: 'short', day: 'numeric'})}
                           </div>
                        </div>
                        <div className="inbox-card-body">
                            <p>{message.message}</p>
                        </div>
                     </div>
                    </div>
                )))}
            </div>
        </div>
    )
        
}
export default ViewMessage;