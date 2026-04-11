import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CreateInternPlacement() {
    const navigate = useNavigate();
    const[students,setStudents] = useState([]);
    const [ studentName ,setStudentName] = useState('');
    const [companyName ,setCompanyName] = useState('');
    const [startDate ,setStartDate] = useState('');
    const [endDate ,setEndDate] = useState('');
    const [supervisorName ,setSupervisorName] = useState('');
    const [supervisorEmail ,setSupervisorEmail] = useState('');
    const[companyLocation ,setCompanyLocation] = useState('');
    const[supervisorPhone ,setSupervisorPhone] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUserId = async () =>{
            try{
                const response = await axios.get('http://localhost:8000/api/get_user_id/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                    setStudents(response.data);
            }catch(error){
                console.error('An error occurred while fetching user ID:', error);
            }
        }
        fetchUserId();
    }, []);
    const options= students.map(student => ({
        value: student.id,
        label: `${student.first_name} ${student.last_name}`
    }));
    const handleSubmit=  async () => {
        try{
            const token = localStorage.getItem('token');
            const logDta = await axios.post('http://localhost:8000/api/internship_placements/', {
                Student_Name: studentName,
                Company_name: companyName,
                Company_location: companyLocation,
                Supervisor: supervisorName,
                Supervisor_email: supervisorEmail,
                Supervisor_phone: supervisorPhone,
                Internship_start_date: startDate,
                Internship_end_date: endDate
            },{headers: {
                Authorization: `Bearer ${token}`
            }});   
            navigate('/viewinternshipplacements'); 


            }catch(error){
                console.error('An error occurred while submitting the log:', error);
                navigate('/studentDashboard');
            }
    }
return (
    <div>
        <h2>Create Internship Placement</h2>
        <Select
            options={options}
            onChange={(selectedOption) => setStudentName(selectedOption.value)}
            placeholder="Select Student"
        />
        <p><input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></p>
        <p><input type="text" placeholder="Company Location" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} /></p>
        <p><input type="text" placeholder="Supervisor Name" value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} /></p>
        <p><input type="email" placeholder="Supervisor Email" value={supervisorEmail} onChange={(e) => setSupervisorEmail(e.target.value)} /></p>
        <p><input type="text" placeholder="Supervisor Phone" value={supervisorPhone} onChange={(e) => setSupervisorPhone(e.target.value)} /></p>
        <div>
            <label>Internship Start Date</label>
        <p><input type="date"  placeholder="Internship Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></p>
        </div>
        <div>
            <label>Internship End Date</label>
        <p><input type="date" placeholder="Internship End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></p>
        </div>
        <button onClick={handleSubmit}>Create Internship Placement</button>
        <button onClick={() => navigate('/studentDashboard')} style={{cursor: 'pointer'}}>Back to Dashboard</button>
    </div>   
); 
        
};
export default CreateInternPlacement;