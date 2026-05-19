import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Weeklogs.css';

function ViewMessage(){
    const[ messages, SetMessages]=useState([]);
    

    useEffect(()=>{
        const fetchMessages=async()=>{
            try{
                const token=localStorage.getItem("token");
                const response=await axios.get("http://localhost:8000/api/get_message/",{
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
        <div>
            <h2 className="page-title">Messages</h2>
            <div className="logs-container">
            {messages.length === 0 ? (
                <p>No messages sent to you yet.</p>) : ( messages.map((message) => (
                    <div key={message.id} className='log'>
                        <p><strong>From:</strong> {message.sender.first_name} {message.sender.last_name} ({message.sender.role})</p>
                        <p><strong>Message:</strong> {message.message}</p>
                        <p> Sent At: {new Date(message.created_at).toLocaleString()}</p>
                    </div>
                )))}
            </div>
        </div>
    )
        
}
export default ViewMessage;