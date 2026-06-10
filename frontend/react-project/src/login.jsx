import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';


function Login(){
    const navigate = useNavigate(); 
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');


    const handleLogin = async () => {

      
     const toastId = toast.loading('Logging in...');

      try {

        const response = await axios.post('http://localhost:8000/api/login/', {
          username: username,
          password: password
          
        });

       

        // save token
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('username', response.data.username);
        console.log('Token saved:', response.data.access);

        // get role 
        const role = response.data.role;  //
        localStorage.setItem('role', role);

        toast.dismiss(toastId); //remove the loading toast
        toast.success('Login successful!');

        //clear form
        setUsername('');
        setPassword('');

        //redirect based on role
        if (role === "STUDENT") {
          navigate('/studentDashboard');
        } else if (role === "INTERN_SUPERVISOR") {
          navigate('/supervisorDashboard');
        } else if (role === "SYSTEM_ADMINSTRATOR") {
          navigate('/adminDashboard');
        } else if (role === "ACADEMIC_SUPERVISOR") {
          navigate('/academicSupervisorDashboard');
        }

      } catch (error) { 
        toast.dismiss(toastId);
        toast.error('Login Failed. Please check your details and try again.');

        setPassword('');
      }
    }; 
    

    return (
      <div className="auth-container">
        <div className="auth-slider">
          <div className="auth-slide slide-one"></div>
          <div className="auth-slide slide-two"></div>
          <div className="auth-slide slide-three"></div>
        </div>
        
        <form className="auth-card" >
          <h2>Login</h2>

          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Login
          </button>


          <p onClick={() => navigate('/register')} className="link">
            Don’t have an account? Create a student account
          </p>
          <p onClick={() => navigate('/staffRegister')} className="link">
            Don’t have an account? Create a staff account
          </p>
        </form>
      </div>
    );
};

export default Login;