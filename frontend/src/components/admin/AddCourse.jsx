import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./Sidebar";
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        courseName: "",
        courseSubjects: [""],
        courseCategories: [""],
        courseSubCategories: [""],
        courseAuthors: [""],
    });
    const navigate = useNavigate();

    const handleChange = (e, type, index) => {
        const { value } = e.target;

        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (Array.isArray(updatedData[type])) {
                updatedData[type][index] = value;
            } else {
                updatedData[type] = value;
            }
            return updatedData;
        });
    };

    const addInputField = (type) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (Array.isArray(updatedData[type])) {
                updatedData[type] = [...updatedData[type], ""];
            } else {
                updatedData[type] = [""];
            }
            return updatedData;
        });
    };

    const removeInputField = (type, index) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (Array.isArray(updatedData[type])) {
                updatedData[type].splice(index, 1);
            } else {
                updatedData[type] = [""];
            }
            return updatedData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your form submission code here
        try {
            const response = await axios.post(
              "http://localhost:8081/admin/add-course",
              formData
            );
      
            if (response.status === 200) {
              navigate("/admin/courses/show");
            } else {
              console.log("Error adding Course");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

    return (
      <div>
        <SideBar />
        <div className="add-product-form" style={{overflow:'scroll'}}>
          <h2>Add Course</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ margin: "13px" }}>Course Title</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={(e) => handleChange(e, "courseName")}
                style={{
                  width: "500px",
                  borderRadius: "13px",
                  margin: "13px",
                  padding: "13px",
                  border: "2px solid #eee",
                }}
                placeholder="Enter your course title"
                required
              />
            </div>
            <div>
              {formData.courseSubjects.map((subject, index) => (
                <div key={index}>
                  <label style={{ margin: "13px" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name={`courseSubjects[${index}]`}
                    value={subject}
                    onChange={(e) => handleChange(e, "courseSubjects", index)}
                    style={{
                      width: "340px",
                      borderRadius: "13px",
                      margin: "13px 13px 13px 39px",
                      padding: "13px",
                      border: "2px solid #eee",
                      position: "relative",
                      left: "50px"
                    }}
                    placeholder={`Enter ${formData.courseName} Subject's Name`}
                    required
                  />
                  {formData.courseSubjects.length < 4 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"54px"
                   }}
                      onClick={() => addInputField("courseSubjects")}
                    >
                      <AiOutlinePlusCircle />
                    </span>
                  )}
                  {index > 0 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"59px"
                   }}
                      onClick={() => removeInputField("courseSubjects", index)}
                    >
                      <AiOutlineDelete />
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Similar code for other fields: Categories, Sub Categories, Authors */}
            <div>
              {formData.courseCategories.map((categories, index) => (
                <div key={index}>
                  <label style={{ margin: "13px" }}>
                    Category
                  </label>
                  <input
                    type="text"
                    name={`courseCategories[${index}]`}
                    value={categories}
                    onChange={(e) => handleChange(e, "courseCategories", index)}
                    style={{
                      width: "340px",
                      borderRadius: "13px",
                      margin: "13px",
                      padding: "13px",
                      border: "2px solid #eee",
                      position: "relative",
                      left: "60px"
                    }}
                    placeholder={`Enter ${formData.courseName} Category's Name`}
                    required
                  />
                  {formData.courseCategories.length < 4 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"65px"
                   }}
                      onClick={() => addInputField("courseCategories")}
                    >
                      <AiOutlinePlusCircle />
                    </span>
                  )}
                  {index > 0 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"74px"
                   }}
                      onClick={() => removeInputField("courseCategories", index)}
                    >
                      <AiOutlineDelete />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div>
              {formData.courseSubCategories.map((categories, index) => (
                <div key={index}>
                  <label style={{ margin: "13px" }}>
                    Sub Category
                  </label>
                  <input
                    type="text"
                    name={`courseSubCategories[${index}]`}
                    value={categories}
                    onChange={(e) => handleChange(e, "courseSubCategories", index)}
                    style={{
                      width: "340px",
                      borderRadius: "13px",
                      margin: "13px",
                      padding: "13px",
                      border: "2px solid #eee",
                      position: "relative",
                      left: "29px"
                    }}
                    placeholder={`Enter ${formData.courseName} Sub Category's Name`}
                    required
                  />
                  {formData.courseSubCategories.length < 4 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"31px"
                   }}
                      onClick={() => addInputField("courseSubCategories")}
                    >
                      <AiOutlinePlusCircle />
                    </span>
                  )}
                  {index > 0 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"38px"
                   }}
                      onClick={() => removeInputField("courseSubCategories", index)}
                    >
                      <AiOutlineDelete />
                    </span>
                  )}
                </div>
              ))}
            </div>


            <div>
              {formData.courseAuthors.map((categories, index) => (
                <div key={index}>
                  <label style={{ margin: "13px" }}>
                    Author
                  </label>
                  <input
                    type="text"
                    name={`courseAuthors[${index}]`}
                    value={categories}
                    onChange={(e) => handleChange(e, "courseAuthors", index)}
                    style={{
                      width: "340px",
                      borderRadius: "13px",
                      margin: "13px",
                      padding: "13px",
                      border: "2px solid #eee",
                      position: "relative",
                      left: "90px"
                    }}
                    placeholder={`Enter ${formData.courseName} Author's Name`}
                    required
                  />
                  {formData.courseAuthors.length < 4 && (
                    <span
                      style={{
                         color: "black",
                         position:"relative",
                         left:"90px"
                    }}
                      onClick={() => addInputField("courseAuthors")}
                    >
                      <AiOutlinePlusCircle />
                    </span>
                  )}
                  {index > 0 && (
                    <span
                    style={{
                        color: "black",
                        position:"relative",
                        left:"98px"
                   }}
                      onClick={() => removeInputField("courseAuthors", index)}
                    >
                      <AiOutlineDelete />
                    </span>
                  )}
                </div>
              ))}
            </div>


            <button type="submit" className="btn-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddCourse;
