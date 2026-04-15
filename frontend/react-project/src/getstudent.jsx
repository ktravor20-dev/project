import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function GetStudent(){
    const [students, setStudents]=useState([])
    const [student_id, setStudentid]=useState('')
    const [selectedOption, setSelectedOption] = usestate(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
         if (!token) {
      setError('You are not logged in.');
      setLoading(false);
      return;
    }
        const fetchUserId = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_user_id/', {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }

                });
                setStudents(response.data);
                
            } catch (error) {
                console.error('An error occurred while fetching user ID:', error);
            }
        };
        fetchUserId();
    }, []);
    // Transform the students data into options for the Selection
    const options= students.map(student => ({
        value: student.id,
        label: `${student.first_name} ${student.last_name}`
    }));
     localStorage.setItem('studentid',student_id);

    
    return(
        <div>
            <label>Select Student</label>
      <Select
        options={options}
        onChange={(selectedOption) => setStudentid(selectedOption.value)}/>
        <button onClick={()=>navigate('/supervisorDashboard/studentLog')}>Search</button>
        </div>
    )

}
export default Getstudent;