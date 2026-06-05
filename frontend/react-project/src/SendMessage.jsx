import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './SendMessage.css';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function SendMessage(){
    const[users,setUsers]=useState([]);
    const[receiver,setReceiver]=useState("");
    const[message,setMessage]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                const token=localStorage.getItem("token");
                const response=await axios.get("http://localhost:8000/api/get_all_users/",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users");
            }
        }
        fetchUsers();
    },[]);

    const handleSubmit=async()=>{
        const token=localStorage.getItem("token");
        try{
            await axios.post("http://localhost:8000/api/send_message/",{
                receiver:receiver,
                message:message
            },{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Message sent successfully");
            toast.success("Message sent successfully");
            const role=localStorage.getItem("role");
            if (role === "STUDENT") {
          navigate('/studentDashboard/viewmessage');
        } else if (role === "INTERN_SUPERVISOR") {
          navigate('/supervisorDashboard/viewmessage');
        }else if (role === "ACADEMIC_SUPERVISOR") {
          navigate('/academicSupervisorDashboard/viewmessage');
        }
            
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
        }
    };
    const options= users.map(user => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}  (${user.role})`
    }));

    return(
        <div className="message-card">
        <h1>Send a Message</h1>

        <div className="input-group">
            <label>Receiver</label>
            <Select 
                className="form-group"
                options={options}
                onChange={(selectedOption) => setReceiver(selectedOption.value)}
                placeholder="Select a person to send message"

            />
            <label>Message</label>
            <textarea
                className="form-input textarea-input" rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="form-buttons"> 
            <button onClick={handleSubmit} className="submit-btn">Send Message</button>
            </div>
        </div>

        </div>
    )

    
}

export default SendMessage;          

