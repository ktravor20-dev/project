import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Weeklogs.css';

function ViewMessage(){
    const[messages, setMessages] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const fetchMessages = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/get_message/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const ToastId=toast.loading("Loading messages...");
                setTimeout(()=>{
                    toast.dismiss(ToastId);
                },1000);
                setMessages(response.data);
            }catch(error){
                console.error('Error fetching messages:', error);
                toast.error("Failed to fetch messages.");

            };
        };
        fetchMessages();
    },[]);

    return(
        <div >
            <h1 className="page-title">View Messages </h1>
            <div className='logs-container'>
                {messages.map((message) => (
                    <div key={message.id} className='log'>
                        <p><strong>From:</strong> {message.sender}</p>
                        <p><strong>Message:</strong> {message.message}</p>
                        <p><strong>Sent At:</strong> {new Date(message.created_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ViewMessage;