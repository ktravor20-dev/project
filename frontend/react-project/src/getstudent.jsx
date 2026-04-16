import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function GetStudent() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You are not logged in.');
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_user_id/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('An error occurred while fetching students:', error);
        setError('Failed to load students.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const options = students.map((student) => ({
    value: student.id,
    label: `${student.first_name} ${student.last_name}`,
  }));

  const handleChange = (selected) => {
    setSelectedOption(selected);
    const value = selected ? selected.value : '';
    setStudentId(value);
    localStorage.setItem('studentid', value);
  };

  const handleSearch = () => {
    if (!studentId) {
      alert('Please select a student first.');
      return;
    }

    navigate('/supervisorDashboard/studentLog');
  };

  return (
    <div>
      <label>Select Student</label>

      {loading && <p>Loading students...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Choose a student"
            isClearable
          />

          <button onClick={handleSearch}>Search</button>
        </>
      )}
    </div>
  );
}

export default GetStudent;