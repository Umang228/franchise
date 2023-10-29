import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import axios from 'axios';
import Sidebar from './Sidebar';

const Courses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/courses');
      if (response.status === 200) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };

  useEffect(() => {
    // Fetch the course data from your server
    fetchCourses();
  }, []);
  const handleOpenConfirmationDialog = async (id) => {
    // Implement the confirmation dialog logic here
    setDeleteCourseId(id);
    if(deleteCourseId){
        try {
            const response = await axios.delete(`http://localhost:8081/admin/delete-course/${deleteCourseId}`);
            console.log(`Delete response ${response}`);
            if (response.status===200) {
                setData((prevData)=>prevData.filter((course)=>course.id !==deleteCourseId))
                console.log('Franchise deleted successfully');

            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(`Delete course with ID ${id}`);
    // You can show a confirmation dialog or perform any other actions as needed
  };



  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">
        <h1 className="heading1">All Courses</h1>
        <form>
          <input type="text" placeholder="Search here" className="searchable" />
        </form>
        <table className="utable">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Subjects</th>
              <th>Course Categories</th>
              <th>Course Sub Categories</th>
              <th>Course Authors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr key={course.id} className="row">
                <td>{course.courseName}</td>
                <td>{course.courseSubjects}</td>
                <td>{course.courseCategories}</td>
                <td>{course.courseSubCategories}</td>
                <td>{course.courseAuthors}</td>
                <td className="action">
                  <button
                    onClick={() => navigate(`/admin/courses/update/${course.id}`)}
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenConfirmationDialog(course.id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
