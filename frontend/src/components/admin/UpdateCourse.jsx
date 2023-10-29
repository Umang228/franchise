import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({
    courseName: "",
    courseSubjects: [""],
    courseCategories: [""],
    courseSubCategories: [""],
    courseAuthors: [""],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the course data based on the ID from your server
    axios
      .get(`http://localhost:8081/admin/courses/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id]);

  const handleInputChange = (e, type, index) => {
    const { name, value } = e.target;
    const updatedCourse = { ...course };

    if (Array.isArray(updatedCourse[type])) {
      updatedCourse[type][index] = value;
    } else {
      updatedCourse[name] = value;
    }

    setCourse(updatedCourse);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated course data to the server
    axios
      .put(`http://localhost:8081/admin/update-course/${id}`, course)
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/courses/show");
        }
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  return (
    <div>
      <Sidebar />
      <div className="add-product-form">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ margin: "13px" }}>Course Title</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={(e) => handleInputChange(e, null, null)}
              style={{
                width: "500px",
                borderRadius: "13px",
                margin: "13px",
                padding: "13px",
                border: "2px solid #eee",
              }}
              placeholder="Enter course title"
              required
            />
          </div>
          <div>
            {Array.isArray(course.courseSubjects)
              ? course.courseSubjects.map((subject, index) => (
                  <div key={index}>
                    <label style={{ margin: "13px",color:'black' }}>Subject</label>
                    <input
                      type="text"
                      name={`courseSubjects[${index}]`}
                      value={subject}
                      onChange={(e) =>
                        handleInputChange(e, "courseSubjects", index)
                      }
                      style={{
                        width: "340px",
                        borderRadius: "13px",
                        margin: "13px 13px 13px 39px",
                        padding: "13px",
                        border: "2px solid #eee",
                        position: "relative",
                        left: "50px"
                      }}
                      placeholder="Enter subject's name"
                    />
                  </div>
                ))
              : null}
            {/* <button
              onClick={() =>
                setCourse({
                  ...course,
                  courseSubjects: [...course.courseSubjects, ""],
                })
              }
            >
              Add Subject
            </button> */}
          </div>
          {/* Similar code for other fields: Categories, Sub Categories, Authors */}
          <div>
            <button type="submit" className="btn-10">Update Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
