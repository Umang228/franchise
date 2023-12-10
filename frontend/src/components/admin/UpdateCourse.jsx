import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Form,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Tag,
  message,
} from "antd";
import SideBar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Item } = Form;

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseSubjects: [""],
    courseCategories: [""],
    courseSubCategories: [""],
    courseAuthors: [""],
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/admin/courses/${id}`
        );

        if (response.status === 200) {
          const courseData = response.data;
          // Parse stringified arrays into actual arrays
          courseData.courseSubjects = JSON.parse(courseData.courseSubjects);
          courseData.courseCategories = JSON.parse(courseData.courseCategories);
          courseData.courseSubCategories = JSON.parse(
            courseData.courseSubCategories
          );
          courseData.courseAuthors = JSON.parse(courseData.courseAuthors);

          setFormData(courseData);
        } else {
          message.error("Failed to fetch course details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

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
    try {
      const response = await axios.put(`http://localhost:8081/admin/update-course/${id}`, formData)

      if (response.status === 200) {
        message.success("Course updated successfully");
        navigate("/admin/courses/show");
      } else {
        message.error("Course update failed.");
        console.log("Error updating Course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <SideBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "80%", // Adjust the width as needed
          margin: "20px auto",
          marginBottom: "20px", // Add margin-bottom to create space
        }}
      >
        <div style={{ flex: 3, marginRight: "130px" }}>
          <Title level={2}>Update Course</Title>
          <Form onFinish={handleSubmit} layout="vertical">
            <Item label="Course Title">
              <Input
                name="courseName"
                value={formData.courseName}
                onChange={(e) => handleChange(e, "courseName")}
                style={{ width: "100%", borderRadius: "8px" }}
                placeholder="Enter your course title"
                required
              />
            </Item>

            {/* Subjects */}
            <Item label="Subjects">
              {formData.courseSubjects.map((subject, index) => (
                <Row key={index} gutter={16} style={{ marginBottom: "8px" }}>
                  <Col flex="auto">
                    <Input
                      name={`courseSubjects[${index}]`}
                      value={subject}
                      onChange={(e) => handleChange(e, "courseSubjects", index)}
                      style={{ width: "100%", borderRadius: "8px" }}
                      placeholder={`Enter Subject's Name`}
                      required
                    />
                  </Col>
                  <Col>
                    <Space>
                      {formData.courseSubjects.length < 8 && (
                        <PlusOutlined
                          style={{ fontSize: "18px", color: "green" }}
                          onClick={() => addInputField("courseSubjects")}
                        />
                      )}
                      {index > 0 && (
                        <DeleteOutlined
                          style={{ fontSize: "18px", color: "red" }}
                          onClick={() =>
                            removeInputField("courseSubjects", index)
                          }
                        />
                      )}
                    </Space>
                  </Col>
                </Row>
              ))}
            </Item>

            {/* Categories */}
            <Item label="Categories">
              {formData.courseCategories.map((category, index) => (
                <Row key={index} gutter={16} style={{ marginBottom: "8px" }}>
                  <Col flex="auto">
                    <Input
                      name={`courseCategories[${index}]`}
                      value={category}
                      onChange={(e) =>
                        handleChange(e, "courseCategories", index)
                      }
                      style={{ width: "100%", borderRadius: "8px" }}
                      placeholder={`Enter Category's Name`}
                      required
                    />
                  </Col>
                  <Col>
                    <Space>
                      {formData.courseCategories.length < 8 && (
                        <PlusOutlined
                          style={{ fontSize: "18px", color: "green" }}
                          onClick={() => addInputField("courseCategories")}
                        />
                      )}
                      {index > 0 && (
                        <DeleteOutlined
                          style={{ fontSize: "18px", color: "red" }}
                          onClick={() =>
                            removeInputField("courseCategories", index)
                          }
                        />
                      )}
                    </Space>
                  </Col>
                </Row>
              ))}
            </Item>

            {/* Sub Categories */}
            <Item label="Sub Categories">
              {formData.courseSubCategories.map((subCategory, index) => (
                <Row key={index} gutter={16} style={{ marginBottom: "8px" }}>
                  <Col flex="auto">
                    <Input
                      name={`courseSubCategories[${index}]`}
                      value={subCategory}
                      onChange={(e) =>
                        handleChange(e, "courseSubCategories", index)
                      }
                      style={{ width: "100%", borderRadius: "8px" }}
                      placeholder={`Enter Sub Category's Name`}
                      required
                    />
                  </Col>
                  <Col>
                    <Space>
                      {formData.courseSubCategories.length < 8 && (
                        <PlusOutlined
                          style={{ fontSize: "18px", color: "green" }}
                          onClick={() => addInputField("courseSubCategories")}
                        />
                      )}
                      {index > 0 && (
                        <DeleteOutlined
                          style={{ fontSize: "18px", color: "red" }}
                          onClick={() =>
                            removeInputField("courseSubCategories", index)
                          }
                        />
                      )}
                    </Space>
                  </Col>
                </Row>
              ))}
            </Item>

            {/* Authors */}
            <Item label="Authors">
              {formData.courseAuthors.map((author, index) => (
                <Row key={index} gutter={16} style={{ marginBottom: "8px" }}>
                  <Col flex="auto">
                    <Input
                      name={`courseAuthors[${index}]`}
                      value={author}
                      onChange={(e) => handleChange(e, "courseAuthors", index)}
                      style={{ width: "100%", borderRadius: "8px" }}
                      placeholder={`Enter Author's Name`}
                      required
                    />
                  </Col>
                  <Col>
                    <Space>
                      {formData.courseAuthors.length < 8 && (
                        <PlusOutlined
                          style={{ fontSize: "18px", color: "green" }}
                          onClick={() => addInputField("courseAuthors")}
                        />
                      )}
                      {index > 0 && (
                        <DeleteOutlined
                          style={{ fontSize: "18px", color: "red" }}
                          onClick={() =>
                            removeInputField("courseAuthors", index)
                          }
                        />
                      )}
                    </Space>
                  </Col>
                </Row>
              ))}
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "16px", borderRadius: "8px" }}
              >
                Update
              </Button>
            </Item>
          </Form>
        </div>

        <div style={{ flex: 1 }}>
          <Divider />
          {/* Displaying Tags with User Input Data */}
          <Title level={3}>Preview</Title>
          <div>
            <Title level={4}>Subjects</Title>
            {formData.courseSubjects.map((subject, index) => (
              <Tag key={index} color="blue">
                {subject}
              </Tag>
            ))}
          </div>
          <div>
            <Title level={4}>Categories</Title>
            {formData.courseCategories.map((category, index) => (
              <Tag key={index} color="green">
                {category}
              </Tag>
            ))}
          </div>
          <div>
            <Title level={4}>Sub Categories</Title>
            {formData.courseSubCategories.map((subCategory, index) => (
              <Tag key={index} color="purple">
                {subCategory}
              </Tag>
            ))}
          </div>
          <div>
            <Title level={4}>Authors</Title>
            {formData.courseAuthors.map((author, index) => (
              <Tag key={index} color="orange">
                {author}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
