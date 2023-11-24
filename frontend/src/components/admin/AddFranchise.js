import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Form, Input, Radio, Select, Button } from "antd";
export default function AddFranchise() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    gst_number: "",
    franchise_type: "Regular",
    mode_of_payment: "Wallet",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {


    try {
      const response = await axios.post(
        "http://localhost:8081/admin/add-franchise",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Franchise added successfully");
        navigate("/admin/franchise/select");
      } else {
        console.log("Error adding Franchise");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="add-franchise-form">
        <h2>Add Franchise</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" required>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{padding:'8px',width:'90%'}}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{padding:'8px',width:'90%'}}
            />
          </Form.Item>

          <Form.Item label="Phone Number" required>
            <Input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              style={{padding:'8px',width:'90%'}}
            />
          </Form.Item>

          <Form.Item label="Password" required>
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{padding:'8px',width:'90%'}}
            />
          </Form.Item>

          <Form.Item label="GST Number" required>
            <Input
              type="text"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
              style={{padding:'8px',width:'90%'}}
            />
          </Form.Item>

          <Form.Item label="Franchise Type" required>
            <Radio.Group
              name="franchise_type"
              value={formData.franchise_type}
              onChange={handleChange}
            >
              <Radio value="Regular">Regular</Radio>
              <Radio value="Online">Online</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Mode of Payment" required>
            <Select
              name="mode_of_payment"
              value={formData.mode_of_payment}
              onChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  mode_of_payment: value,
                }))
              }
              style={{width:'90%'}}
            >
              <Select.Option value="Wallet">Wallet</Select.Option>
              <Select.Option value="Payment Gateway">
                Payment Gateway
              </Select.Option>
              <Select.Option value="Both">Both</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
