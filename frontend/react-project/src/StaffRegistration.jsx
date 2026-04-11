import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function StaffRegistration(){
    const navigate = useNavigate();
    const[ username, setUsername]= useState('');
    const[first_name, setFirstName]=useState('');
    const[last_name, setLastName]=useState('');
    const[email, setEmail]=useState('');
    const[role, setRole ]=useState('');
    const[password, setPassword]=useState('');
    const[staff_id, setStaff_id]=useState('');

    const register =async () =>{
        try{
            const response = await axios.post('http://localhost:8000/api/create_staff/', {
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                role: role,
                password: password,
                Stuff_id: staff_id
            });
            console.log('Staff created:', response.data);
            alert('Staff account has been successfully created');
            navigate('/login');
        } catch (error) {
            alert('Error creating staff account');
            console.error('Error registering staff:', error);
        }
    };

    return(
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register Staff</h2>

                <input placeholder="Username"  onChange={(e)=>setUsername(e.target.value)} required/>
                <input placeholder= "First Name" onChange={(e)=>setFirstName(e.target.value)} required/>
                <input placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} required/>
                <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
                <select value={role} onChange={(e)=>setRole(e.target.value)} required>
                    <option value="">Select a Role</option>
                    <option value="INTERN_SUPERVISOR">Intern Supervisor</option>
                    <option value="ACADEMIC_SUPERVISOR">Academic Supervisor</option>
                    <option value="SYSTEM_ADMINISTRATOR">System Admin</option>
                </select>
                <input placeholder="Staff ID" onChange={(e)=>setStaff_id(e.target.value)}  required/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                <button onClick={register}>Register</button>
                <p onClick={() => navigate('/login')} className="link">
                Already have an account? Login
                </p>
                    
                
            </div>
        </div>
            
                
    );
}
export default StaffRegistration;