import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

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
     <>
     <div>
        <h1>Input Weekly Logs</h1>
        <div>
            <Select
                options={options}
                onChange={(selectedOption) => setStudentName(selectedOption.value)}
            />
        </div>
        <div><textarea placeholder='Activities' value={activities} onChange={(e)=>setActivities(e.target.value)}></textarea></div>
        <p><input placeholder='Week Number' onChange={(e)=>setWeekNumber(e.target.value)} /></p>
        <p><input placeholder='Supervisor' onChange={(e)=>setSupervisor(e.target.value)} /></p>
        <div><textarea placeholder="Supervisor Comment" value={supervisorComment} onChange={(e)=>setSupervisorComment(e.target.value)} > </textarea></div>
        <p><input placeholder='Progress' onChange={(e)=>setProgress(e.target.value)} /></p>
        <p><input placeholder='Hours Worked' onChange={(e)=>setHoursWorked(e.target.value)} /></p>
        <p><input placeholder='Remaining Time for Internship' onChange={(e)=>setRemainingTime(e.target.value)} /></p>
        <button onClick={handleSubmit}>Submit</button>
        <div><button onClick={() => navigate('/weeklylogs')}>View Weekly Logs</button></div>
     </div> 
     
     </>
)
}
export default Inputweeklylogs;