import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Inputweeklylogs.css';

function Inputweeklylogs() {
    const navigate = useNavigate();
    const[students,setStudents] = useState([]);
    const [ studentName ,setStudentName] = useState('');
    const [activities ,setActivities] = useState('');
    const [weekNumber ,setWeekNumber] = useState('');
    const [supervisor ,setSupervisor] = useState('');
    const [supervisorComment ,setSupervisorComment] = useState('');
    const [progress ,setProgress] = useState('');
    const [hoursWorked ,setHoursWorked] = useState('');
    const [remainingTime ,setRemainingTime] = useState('');

    const handleSubmit=  async () => {
        try{
         const token = localStorage.getItem('token');
         const logDta = await axios.post('http://localhost:8000/api/create_weekly_logs/', {
            Student_Name: studentName,
            Activities: activities,
            Week_Number: weekNumber,
            Supervisor: supervisor,
            Supervisor_Comment: supervisorComment,
            Progress: progress,
            Hours_Worked: hoursWorked,
            Remaining_time_for_Internship: remainingTime
         },{headers: {
            Authorization: `Bearer ${token}`
        }});}catch(error){
            console.error('An error occurred while submitting the log:', error);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
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
return (
  <div className="form-container">
    <h1>Input Weekly Logs</h1>

    <div className="form-box">

      <label>Select Student</label>
      <Select
        options={options}
        onChange={(selectedOption) => setStudentName(selectedOption.value)}
      />

      <label>Activities</label>
      <textarea
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
      />

      <label>Week Number</label>
      <input
        type="number"
        onChange={(e) => setWeekNumber(e.target.value)}
      />

      <label>Supervisor</label>
      <input
        type="text"
        onChange={(e) => setSupervisor(e.target.value)}
      />

      <label>Supervisor Comment</label>
      <textarea
        value={supervisorComment}
        onChange={(e) => setSupervisorComment(e.target.value)}
      />

      <label>Progress</label>
      <input
        type="text"
        onChange={(e) => setProgress(e.target.value)}
      />

      <label>Hours Worked</label>
      <input
        type="number"
        onChange={(e) => setHoursWorked(e.target.value)}
      />

      <label>Remaining Time</label>
      <input
        type="text"
        onChange={(e) => setRemainingTime(e.target.value)}
      />

      <div className="form-buttons">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        <button
          className="back-btn"
          onClick={() => navigate('/studentDashboard/weeklylogs')}
        >
          View Weekly Logs
        </button>
      </div>

    </div>
  </div>
);
}
export default Inputweeklylogs;