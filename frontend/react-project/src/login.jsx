import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Auth.css';

function Login(){
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          username: username,
          password: password
        });

        // save token
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('username', response.data.username);

        // get role 
        const role = response.data.role;  //

        localStorage.setItem('role', role);

        console.log("Login successful:", response.data);

        alert('log in successful');

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
        console.log('Error logging in:', error);
      }
    }; 
    

    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>


          <p onClick={() => navigate('/register')} className="link">
            Don’t have an account? Create a student account
          </p>
          <p onClick={() => navigate('/staffRegister')} className="link">
            Don’t have an account? Create a staff account
          </p>
        </div>
      </div>
    );
};

export default Login;