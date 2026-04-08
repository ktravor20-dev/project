import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const Login = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.access);
            console.log('Login successful:', response.data);
            alert('log in successful')
            navigate('/weeklylogs')
        } catch (error) {
            console.log('Error logging in:', error);
        }
    } ; 
    const logout = () => {
        localStorage.removeItem('token');
        console.log('Logged out successfully');
    };


    return(
        <div>
           <p> <input 
                type="text"
                placeholder="Username"
                onChange={(e)=> setUsername(e.target.value)}
                /></p>
            <p><input
            type="password"
            placeholder= "Password"
            onChange ={(e)=> setPassword(e.target.value)}
            /></p>
            <p><buttton onClick={Login}  style={{cursor:'pointer'}}>Login</buttton></p>   
            <p><button onClick={logout} style={{cursor:'pointer'}}>Logout</button></p>
            <p onClick={() => navigate('/register')} style={{cursor:'pointer'}}>Don't have an account? Register here.</p>
        </div>
    );  
};

export default Login;