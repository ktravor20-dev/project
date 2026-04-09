import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


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

    return(
        <div>
            <h1>Register</h1>
            <p><input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/></p>
            <p><input placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/></p>
            <p><input placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/></p>
            <p><input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/></p>
            <div> 
                
                <select 
                name='role'
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                required
                >
                    <option value="">Select a Role</option>
                    <option value="STUDENT"> Student </option>
                    <option value="INTERN_SUPERVISOR">Intern Supervisor</option>
                    <option value="ACADEMIC_SUPERVISOR"> Academic Supervisor  </option>
                    <option value="COMPANY_MANAGER">  Company Manager </option>
                    <option value="SYSTEM_ADMINSTRATOR">  System Administrator </option>
                </select>
            </div>
            <p><input placeholder="Student ID" onChange={(e)=>setStudent_id(e.target.value)}/></p>
            <p><input type='password'   placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/></p>
            <p><button onClick={register}  style={{cursor:'pointer'}}>Register</button></p>
            

        </div>
    );
}
 export default RegisterUser;