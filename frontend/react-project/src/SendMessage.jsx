import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Inputweeklylogs.css';
import { useNavigate } from "react-router-dom";

function SendMessage(){
    const [supervisors, setSupervisors] = useState([]);
    const[students,setStudents] = useState([]);
    const[academicSupervisors,setAcademicSupervisors] = useState([]);
    const[supervisorId,setSupervisorId] = useState('');
    const[studentId,setStudentId] = useState('');
    const[academicSupervisorId,setAcademicSupervisorId] = useState('');
    const [message, setMessage] = useState('');
    const[sendername, setSenderName] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const fetchSupervisors = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/supervisors/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSupervisors(response.data);
            }catch(error){
                console.error('Error fetching supervisors:', error);
            }
        };
        const fetchStudents = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/students/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudents(response.data);
            }catch(error){
                console.error('Error fetching students:', error);
            }
        };
        const fetchAcademicSupervisors = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/academic_supervisors/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAcademicSupervisors(response.data);
            }catch(error){
                console.error('Error fetching academic supervisors:', error);
            }
        };
        fetchSupervisors();
        fetchStudents();
        fetchAcademicSupervisors();
    },[]);

    const handleSubmit = async ()=>{
        try{
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:8000/api/send_message/',{
                Student: studentId,
                Intern_Supervisor: supervisorId,
                Academic_Supervisor: academicSupervisorId,
                message: message,
                sender: sendername
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Message sent successfully!");
            console.log("Message sent successfully");
            const role=localStorage.getItem('role')
           if (role === 'STUDENT'){
             navigate('/studentDashboard/viewmessage');
          }
           else if( role ==='INTERN_SUPERVISOR'){
            navigate('/supervisorDashboard/viewmessage');} 
          else if (role ==='ACADEMIC_SUPERVISOR'){
            navigate('/adminDashboard/viewmessage');
        }
         }catch(error){
            console.error('Error sending message:', error);
            toast.error("Failed to send message. Please try again.");
        }
    };

return(
    <div className="form-container">
        <h1>Send Message</h1>

        <div>
            <p>Sending To</p>
            <label>Student:</label>
            <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                <option value="">Select Student</option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <p> OR</p>
            <label>Supervisor:</label>
            <select value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}>
                <option value="">Select Supervisor</option>
                {supervisors.map((supervisor) => (
                    <option key={supervisor.id} value={supervisor.id}>
                        {supervisor.first_name} {supervisor.last_name}          

                    </option>

                ))}
            </select>

        </div>
        <div>
            <p> OR</p>
            <label>Academic Supervisor:</label>
            <select value={academicSupervisorId} onChange={(e) => setAcademicSupervisorId(e.target.value)}>
                <option value="">Select Academic Supervisor</option>
                {academicSupervisors.map((academicSupervisor) => (
                    <option key={academicSupervisor.id} value={academicSupervisor.id}>
                        {academicSupervisor.first_name} {academicSupervisor.last_name}
                    </option>
                ))}
            </select>
        </div>
        <label >From</label>
        <input type="text" placeholder="Your Name" value={sendername} onChange={(e) => setSenderName(e.target.value)} />
        <div>
            <label>Message:</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="form-buttons">
        <button onClick={handleSubmit}>Send Message</button>
        </div>
    </div>

)
}

export default SendMessage;          

