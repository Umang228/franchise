import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from the MUI library
import TextField from '@mui/material/TextField'; // Import TextField
import axios from 'axios';
import Sidebar from './Sidebar';

const Courses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(''); // State for search input

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/courses');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenConfirmationDialog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/admin/delete-course/${id}`);
      if (response.status === 200) {
        setData((prevData) => prevData.filter((course) => course.id !== id));
        console.log('Course deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
    console.log(`Delete course with ID ${id}`);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value); // Update the search text
  };

  // Filter data based on the search text
  const filteredData = data.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
      course.courseSubjects.toLowerCase().includes(searchText.toLowerCase()) ||
      course.courseCategories.toLowerCase().includes(searchText.toLowerCase()) ||
      course.courseSubCategories.toLowerCase().includes(searchText.toLowerCase()) ||
      course.courseAuthors.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">
        <div className="topBar">
          <h1>Courses</h1>
          <button className='btn-10' onClick={() => navigate(`/admin/courses/add`)}>+ Add Course</button>
        </div>
        <TextField
          label="Search Courses"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          className='searchField'
          style={{ margin: '10px'}}
        />
        <div style={{ height: 500, width: '93%', marginLeft: '42px' }}>
          <DataGrid
            rows={filteredData}
            columns={[
              { field: 'courseName', headerName: 'Course Name', flex: 1 },
              { field: 'courseSubjects', headerName: 'Course Subjects', flex: 1 },
              { field: 'courseCategories', headerName: 'Course Categories', flex: 1 },
              { field: 'courseSubCategories', headerName: 'Course Sub Categories', flex: 1 },
              { field: 'courseAuthors', headerName: 'Course Authors', flex: 1 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 120,
                renderCell: (params) => (
                  <div>
                    <button
                      onClick={() => navigate(`/admin/courses/update/${params.row.id}`)}
                      className='edit-button'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenConfirmationDialog(params.row.id)}
                      className='delete-button'
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
