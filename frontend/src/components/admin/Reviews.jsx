import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, Spin, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import SideBar from "./Sidebar";

const Reviews = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/comments");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedRecord(null);
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
    const formValues = {
      name: record.name,
      comments: record.comments,
    };
    form.setFieldsValue(formValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      setPostLoading(true);

      if (selectedRecord) {
        await axios.put(`http://localhost:8081/update-comments/${selectedRecord.id}`, values);
      } else {
        await axios.post("http://localhost:8081/admin/add-comment", values);
      }

      setIsModalVisible(false);
      setLoading(true);
      fetchReviews();
    } catch (error) {
      console.error("Error adding/editing review:", error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:8081/admin/delete-comments/${record.id}`);
      setLoading(true);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this review?"
            onConfirm={() => handleDelete(record)}
          >
            <Button icon={<DeleteOutlined />} type="danger">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();

  return (
    <div>
      <SideBar/>
      <div style={{ width: "100%",padding:'65px' }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ position: "relative", top: "20px" }}>Reviews</h1>
          <button className="btn-10" onClick={showModal}>
            + Add
          </button>
        </div>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Table dataSource={data} columns={columns} />
        )}

        <Modal
          title={selectedRecord ? "Edit Review" : "Add New Review"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ position: 'absolute', left: '30vw', top: '30px' }}
        >
          <Form
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Comments" name="comments" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={postLoading}>
                {selectedRecord ? "Save" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;
