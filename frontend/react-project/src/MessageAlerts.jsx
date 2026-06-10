import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MessageAlerts(){
    const[alerts, setAlerts]=useState([]);

    useEffect(()=>{
        const fetchAlerts=async()=>{
            try{
                const token=localStorage.getItem("token");
                const response=await axios.get("https://backend-qgig.onrender.com/api/message_notifications/ ",{
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
        <div style={{ marginTop: '32px' }}>
            <h2>📥 Messages 
    <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: '9999px' }}>
      {alerts.length} New
    </span></h2>
            {alerts.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'col', gap: '12px' }}><p>No new messages available yet.</p></div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'col', gap: '12px' }}>
                    {alerts.map((alert) => (
                        <div key={alert.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p><strong style={{color:'#0b9d4da1'}}>{alert.message}</strong> <small style={{ fontSize: '12px', color: '#9ca3af' }}>Sent At: {new Date(alert.created_at).toLocaleString()}</small></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )


}
export default MessageAlerts;