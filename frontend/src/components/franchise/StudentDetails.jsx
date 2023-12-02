import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Upload,
  Image,
  Modal,
  Spin,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SideBar from "./Sidebar";

const generateRandomKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const StudentDetails = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setImagePreview(info.file.thumbUrl);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
  };

  const handleOpenConfirmationDialog = () => {
    setShowConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const response = await axios.post(
        "http://localhost:8081/franchise/add-student",
        { ...values, avatar: values.avatar[0] }
      );

      setLoading(false);
      message.success("Student details submitted successfully!");

      const countdown = 15;
      let seconds = countdown;
      const timer = setInterval(() => {
        seconds--;
        if (seconds === 0) {
          clearInterval(timer);
          navigate("/franchise/orders");
        }
      }, 1000);

      navigate("/franchise/order-placed");
    } catch (error) {
      setLoading(false);
      message.error("Error submitting student data. Please try again.");
      console.error("Error submitting student data:", error);
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div>
      <SideBar />
      <div style={{ padding: "60px" }}>
        <h2 style={{ marginBottom: "20px" }}>Student Details</h2>
        <Form
          form={form}
          onFinish={handleOpenConfirmationDialog}
          layout="vertical"
        >
          <Form.Item
            name="avatar"
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={customRequest}
              onChange={handleChange}
              onRemove={handleRemove}
              listType="picture-card"
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="Avatar Preview" />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Student Name"
                rules={[
                  { required: true, message: "Please enter the student name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter the mobile number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-Mail"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please enter the address" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please enter the city" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: "Please enter the state" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pinCode"
                label="Pin Code"
                rules={[
                  { required: true, message: "Please enter the pin code" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="Confirmation"
          visible={showConfirmationDialog}
          onCancel={handleCloseConfirmationDialog}
          footer={[
            <Button key="cancel" onClick={handleCloseConfirmationDialog}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Yes
            </Button>,
          ]}
        >
          <p>Are you sure you want to continue?</p>
        </Modal>
      </div>
    </div>
  );
};

export default StudentDetails;
