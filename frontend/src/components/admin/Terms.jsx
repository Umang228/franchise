// Terms.js
import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button, Spin, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import SideBar from './Sidebar';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Terms = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/terms');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching terms:', error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedRecord(null);
    form.resetFields(); // Reset form fields when adding a new term
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      setPostLoading(true);

      if (selectedRecord) {
        // Handle edit logic here
        await axios.put(`http://localhost:8081/admin/update-term/${selectedRecord.id}`, values);
      } else {
        // Handle add logic here
        await axios.post('http://localhost:8081/admin/add-term', values);
      }

      setIsModalVisible(false);
      setLoading(true);
      fetchTerms();
    } catch (error) {
      console.error('Error adding/editing term:', error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      // Handle delete logic here
      await axios.delete(`http://localhost:8081/admin/delete-term/${record.id}`);
      setLoading(true);
      fetchTerms();
    } catch (error) {
      console.error('Error deleting term:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title', // Update dataIndex to 'title'
      key: 'title', // Update key to 'title'
    },
    {
      title: 'Description',
      dataIndex: 'description', // Update dataIndex to 'description'
      key: 'description', // Update key to 'description'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this term?"
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
      <SideBar />

      <div style={{ position: 'absolute', left: '80px', width: '90%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ position: 'relative', top: '20px' }}>Terms and Conditions</h1>
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
          title={selectedRecord ? 'Edit Term' : 'Add New Term'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ position: 'relative', width: '90vw', height: '60%' }} // Set the width property here
        >
          <Form form={form} onFinish={onFinish} style={{ width: '100%' }}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true }]}>
              {/* Use React Quill for rich text editing */}
              <ReactQuill style={{ height: '150px', width: '450px' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={postLoading}>
                {selectedRecord ? 'Save' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Terms;
