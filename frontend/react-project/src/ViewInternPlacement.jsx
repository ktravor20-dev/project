import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function ViewInternPlacement() {
    const navigate = useNavigate();
    const[placements,setPlacements] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchPlacements = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/get_placements/',{
                    headers:{'Authorization': `Bearer ${token}`}
                });
                setPlacements(response.data);

            }catch(error){
                console.error('An error occurred while fetching placements:', error);
            };
        
        
        }
        fetchPlacements();


            
    },[]);
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
        } 

    }
    return(
        <div>
            <h2>Internship Placements</h2>
            <table border='1'>
                <thead> 
                    <tr>    
                        <th>Student Name</th>
                        <th>Company Name</th>
                        <th>Company Location</th>
                        <th>Supervisor</th>
                        <th>Supervisor Email</th>
                        <th>Supervisor Phone</th>
                        <th>Internship Start Date</th>
                        <th>Internship End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map((placement) => (
                         
                          <tr key={placement.id}>
                            <td>{placement.Student_Name.first_name} {placement.Student_Name.last_name}</td>
                            <td>{placement.Company_name}</td>
                            <td>{placement.Company_location}</td>
                            <td>{placement.Supervisor}</td>
                            <td>{placement.Supervisor_email}</td>
                            <td>{placement.Supervisor_phone}</td>
                            <td>{placement.Internship_start_date}</td>
                            <td>{placement.Internship_end_date}</td>
                         </tr>
                    ))}
                    
                </tbody>

            </table>
            <button onClick={Return}>Return to Dashboard</button>
                

        </div>
    );
}
export default ViewInternPlacement;