import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MessageAlerts(){
    const[alerts, setAlerts]=useState([]);

    useEffect(()=>{
        const fetchAlerts=async()=>{
            try{
                const token=localStorage.getItem("token");
                const response=await axios.get("http://localhost:8000/api/message_notifications/ ",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                setAlerts(response.data);
            }catch (error) {
                console.error("Error fetching message  alerts:", error);
                toast.error("Failed to fetch message alerts");
            }
        }
        fetchAlerts();
    },[]);
    return(
        <div>
            {alerts.length > 0 && (<div>
                <h4>You have {alerts.length} new message(s)</h4>
                <div>
                    {alerts.map((alert) => (
                        <div key={alert.id}>
                            <p>{alert.message} <strong>Sent At: {new Date(alert.created_at).toLocaleString()}</strong></p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )


}
export default MessageAlerts;