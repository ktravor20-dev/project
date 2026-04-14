import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


//registering new user in the system

function RegisterUser(){
    const navigate = useNavigate();
    const[ username, setUsername]= useState('');
    const[first_name, setFirstName]=useState('');
    const[last_name, setLastName]=useState('');
    const[email, setEmail]=useState('');
    const[role, setRole ]=useState('');
    const[student_id, setStudent_id]=useState('');
    const[password, setPassword]=useState('');

    const register = async ()=> {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register/',{
                username: username,
                first_name: first_name,
                last_name: last_name,
                email:email,
                role:role,
                Student_id:student_id,
                password:password
            });
            console.log('User created:',response.data);
            alert('your account has been successfully created')
            navigate('/login')
        
     } catch (error){
        console.log('Error occused:',error.response.data);
    }
    };

    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Register</h2>

          <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}  required/>
          <input placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} required/>
          <input placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} required/>
          <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>

          <select value={role} onChange={(e)=>setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="STUDENT">Student</option>
            
          </select>

          <input placeholder="Student ID" onChange={(e)=>setStudent_id(e.target.value)} required/>

          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  required/>

          <button onClick={register}>Register</button>

          <p onClick={() => navigate('/login')} className="link">
            Already have an account? Login
          </p>
        </div>
      </div>
    );
}
 export default RegisterUser;