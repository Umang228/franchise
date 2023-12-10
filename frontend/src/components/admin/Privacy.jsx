// Privacy.js
import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button, Spin, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import SideBar from './Sidebar';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Privacy = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const fetchPrivacyData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/privacy');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching privacy data:', error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedRecord(null);
    // Reset the form fields when opening the modal
    form.resetFields();
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
    // Populate the form fields with existing record data
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      setPostLoading(true);

      if (selectedRecord) {
        // If selectedRecord is not null, update existing privacy data
        await axios.put(`http://localhost:8081/admin/update-privacy/${selectedRecord.id}`, values);
      } else {
        // If selectedRecord is null, add new privacy data
        await axios.post('http://localhost:8081/admin/add-privacy', values);
      }

      setIsModalVisible(false);
      setLoading(true);
      fetchPrivacyData();
    } catch (error) {
      console.error('Error adding/editing privacy data:', error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      // Delete the privacy data
      await axios.delete(`http://localhost:8081/admin/delete-privacy/${record.id}`);
      setLoading(true);
      fetchPrivacyData();
    } catch (error) {
      console.error('Error deleting privacy data:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'policy',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'details',
      key: 'content',
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
            title="Are you sure to delete this privacy data?"
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
          <h1 style={{ position: 'relative', top: '20px' }}>Privacy</h1>
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
          title={selectedRecord ? 'Edit Privacy Data' : 'Add New Privacy Data'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ position: 'absolute', left: '30vw', top: '30px', width: '60%' }}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item label="Title" name="policy" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Content" name="details" rules={[{ required: true }]}>
              <ReactQuill style={{ height: '150px' }} />
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

export default Privacy;
