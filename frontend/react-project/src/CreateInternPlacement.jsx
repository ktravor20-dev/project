import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './CreateInternPlacement.css';

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
                alert('An error has occurred while submitting')
                
            }
    }
     const Return=()=>{
        const role=localStorage.getItem('role')
        if (role === 'STUDENT'){
            navigate('/studentDashboard');
        }
        else if( role ==='INTERN_SUPERVISOR'){
            navigate('/supervisorDashboard');} 
        else if (role ==='ACADEMIC_SUPERVISOR'){
            navigate('/adminDashboard');
        } else if (role==='SYSTEM_ADMINSTRATOR') {
            navigate('/systemDashboard')
        } }
    return (
        <div className="form-container">
           <h1>Create Internship Placement</h1>

           <div className="form-box">

             <label>Select Student</label>
             <Select
               options={options}
               onChange={(selectedOption) => setStudentName(selectedOption.value)}
               placeholder="Select Student"
             />

             <label>Company Name</label>
             <input
               type="text"
               value={companyName}
               onChange={(e) => setCompanyName(e.target.value)}
             />

             <label>Company Location</label>
             <input
               type="text"
               value={companyLocation}
               onChange={(e) => setCompanyLocation(e.target.value)}
             />

             <label>Supervisor Name</label>
             <input
               type="text"
               value={supervisorName}
               onChange={(e) => setSupervisorName(e.target.value)}
             />

             <label>Supervisor Email</label>
             <input
               type="email"
               value={supervisorEmail}
               onChange={(e) => setSupervisorEmail(e.target.value)}
             />

             <label>Supervisor Phone</label>
             <input
               type="text"
               value={supervisorPhone}
               onChange={(e) => setSupervisorPhone(e.target.value)}
             />

             <label>Internship Start Date</label>
             <input
               type="date"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
             />

             <label>Internship End Date</label>
             <input
               type="date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
             />

             <div className="form-buttons">
               <button className="submit-btn" onClick={handleSubmit}>
                 Create Internship
               </button>

               <button
                 className="back-btn"
                 onClick={Return}
               >
                 Back
               </button>
             </div>

           </div>
        </div>
    ); 
        
};
export default CreateInternPlacement;