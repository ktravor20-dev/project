import React,{useState,useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CreateStudentLog(){
    const[supervisors,setSupervisors]=useState([]);
    const[activities,setActicitives]=useState('');
    const[challenges,setChallenges]=useState('');
    const[supervisor,setSupervisor]=useState('');
    const[week,setWeek_Number]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const token =localStorage.getItem('token');
        const getSupervisors= async ()=>{
            try{
                const response = await axios.get('http://localhost:8000/api/get_supervisors/',{
                headers:{
                    AUTHORIZATION: `Bearer ${token}`
                }
            });
            setSupervisors(response.data);
        }catch(error){
            console.error('an error has occured while fetching the supervisors:',error);}
        }
        getSupervisors();
     }
        
    ,[]);
    const options= supervisors.map(Supervisor => ({
        value: Supervisor.id,
        label: `${Supervisor.first_name} ${Supervisor.last_name}`}));
    const handlein= async ()=>{
        try{
         const token=localStorage.getItem('token');
         const sentdata= await axios.post('http://localhost:8000/api/createstudentlog/',{
            Supervisor:supervisor,
            Week_Number:week,
            Activities_Done:activities,
            Challenges:challenges},{
                headers: {
                Authorization: `Bearer ${token}`
            }});
         console.log(sentdata.data)
         alert('Your log has been successfully created');  
         navigate('/studentDashboard/viewstudentlog') 
        }catch(error){
            alert('There is an error which has occurred');
            console.error('An error has occured while submiting your log :', error);

        }
        }
    return(
        <div className='form-container'>
            <h2>Create Your Student log </h2>

            <div className='form-box'>
                <label>Select Your Supervisor</label>
             <Select
               options={options}
               onChange={(selectedOption) => setSupervisor(selectedOption.value)}
               placeholder="Select Supervisor"
             />

               <label>Week Number</label>
             <input
              type="number"
              onChange={(e) => setWeek_Number(e.target.value)}
             />
              <label>Activities</label>
             <textarea
              value={activities}
              onChange={(e) => setActicitives(e.target.value)}
              />

            <label>Challenges</label>
             <textarea
             value={challenges}
             onChange={(e) => setChallenges(e.target.value)}

             />

            </div>

              <div className="form-buttons">
              <button className="submit-btn" onClick={handlein}>
              Submit
             </button>

             <button
             className="back-btn"
             onClick={()=>navigate('/studentDashboard/viewstudentlog')}
             
             >
             View  Logs
             </button>
             </div>



        </div>

    )



};
export default CreateStudentLog;