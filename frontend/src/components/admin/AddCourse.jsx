import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./Sidebar";
import {
  Form,
  Input,
  Button,
  Space,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";

const { Option } = Select;

const AddCourse = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseSubjects: [""],
    courseCategories: [""],
    courseSubCategories: [""],
    courseAuthors: [""],
  });

  const handleChange = (type, index, value) => {
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/admin/add-course",
        formData
      );

      if (response.status === 200) {
        navigate("/admin/courses/show");
      } else {
        message.error("Error adding Course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="add-product-form">
        <h2>Add Course</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Course Title"
            name="courseName"
            required
            rules={[{ required: true, message: "Please enter course title" }]}
          >
            <Input
              style={{ borderRadius: "13px" }}
              placeholder="Enter your course title"
              onChange={(e) => handleChange("courseName", 0, e.target.value)}
            />
          </Form.Item>
          <Form.List name="courseSubjects">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      width: "100%",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 0]}
                      fieldKey={[fieldKey, 0]}
                      rules={[
                        { required: true, message: "Please enter subject" },
                      ]}
                    >
                      <Input
                        placeholder={`Enter ${formData.courseName} Subject's Name`}
                        onChange={(e) =>
                          handleChange("courseSubjects", 0, e.target.value)
                        }
                      />
                    </Form.Item>
                    {fields.length < 4 && (
                      <AiOutlinePlusCircle
                        style={{ fontSize: "24px", marginTop: "10px" }}
                        onClick={() => add()}
                      />
                    )}
                    {fields.length > 1 && (
                      <AiOutlineDelete
                        style={{ fontSize: "24px", marginTop: "10px" }}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          {/* Similar code for other fields: Categories, Sub Categories, Authors */}
          {/* ... */}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-10">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddCourse;
