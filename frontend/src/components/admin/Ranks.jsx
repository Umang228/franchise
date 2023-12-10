import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, Upload, Spin, Popconfirm } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import SideBar from "./Sidebar";

const Ranks = () => {
  // State for storing records data
  const [data, setData] = useState([]);
  // State for controlling the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State for controlling the loading spinner
  const [loading, setLoading] = useState(true);
  // State for storing the selected record during editing
  const [selectedRecord, setSelectedRecord] = useState(null);
  // State for tracking the image file during the upload
  const [imageFile, setImageFile] = useState(null);
  // State for tracking the loading state during the post request
  const [postLoading, setPostLoading] = useState(false);

  // useEffect to fetch records when the component mounts
  useEffect(() => {
    fetchRecords();
  }, []); // Run once on component mount

  // Function to fetch records from the API
  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/records");
      setData(response.data);
      setLoading(false); // Set loading to false once records are fetched
    } catch (error) {
      console.error("Error fetching records:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  // Function to show the modal for adding/editing a record
  const showModal = () => {
    setIsModalVisible(true);
    setSelectedRecord(null);
    // Reset imageFile state when opening the modal
    setImageFile(null);
  };

  // Function to show the modal for editing a specific record
  const showEditModal = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
    // Populate the modal form with existing record data
    const formValues = {
      image: { url: record.image },
      name: record.Name,
      rank: record.Rank,
      date: record.date,
    };
    // Update the modal form with the record values
    form.setFieldsValue(formValues);
  };

  // Function to handle the cancel action on the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle the form submission (add/edit record)
  const onFinish = async (values) => {
    try {
      setPostLoading(true); // Set loading to true during post request
  
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", values.name);
      formData.append("rank", values.rank);
      formData.append("date", values.date);
  
      // Continue with the main request
      sendAddRecordRequest(formData);
    } catch (error) {
      console.error("Error adding/editing record:", error);
    } finally {
      setPostLoading(false); // Set loading to false after post request
    }
  };

  // Function to handle the main add-record request
  const sendAddRecordRequest = async (formData) => {
    try {
      if (selectedRecord) {
        // Edit an existing record if selectedRecord is not null
        await axios.put(`http://localhost:8081/admin/update-record/${selectedRecord.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Add a new record if selectedRecord is null
        await axios.post("http://localhost:8081/admin/add-record", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      setIsModalVisible(false);
      setLoading(true); // Set loading to true before refetching records
      fetchRecords(); // Refetch records after adding or editing
    } catch (error) {
      console.error("Error adding/editing record:", error);
    }
  };

  // Function to handle the delete action for a record
  const handleDelete = async (record) => {
    try {
      // Make an Axios DELETE request to delete a record
      await axios.delete(`http://localhost:8081/admin/delete-record/${record.id}`);
      setLoading(true); // Set loading to true before refetching records
      fetchRecords(); // Refetch records after deleting
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="avatar"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      key: "Rank",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div>
          {/* Edit button with icon */}
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          {/* Popconfirm for confirming the delete action */}
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record)}
          >
            {/* Delete button with icon */}
            <Button icon={<DeleteOutlined />} type="danger">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Ant Design Form instance
  const [form] = Form.useForm();

  return (
    <div>
      {/* Sidebar component */}
      <SideBar />

      <div style={{ position: "absolute", left: "80px", width: "90%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Heading and Add button */}
          <h1 style={{ position: "relative", top: "20px" }}>Ranks</h1>
          <button className="btn-10" onClick={showModal}>
            + Add
          </button>
        </div>

        {/* Loading spinner or Table based on the loading state */}
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table dataSource={data} columns={columns} />
        )}

        {/* Modal for adding/editing a record */}
        <Modal
          title={selectedRecord ? "Edit Record" : "Add New Record"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ position: 'absolute', left: '30vw', top: '30px' }}
        >
          {/* Form for adding/editing a record */}
          <Form
            form={form}
            onFinish={onFinish}
            encType="multipart/form-data"
            initialValues={
              selectedRecord
                ? {
                  image: { url: selectedRecord.image },
                  name: selectedRecord.Name,
                  rank: selectedRecord.Rank,
                  date: selectedRecord.date,
                }
                : {}
            }
          >
            {/* Form item for uploading an image */}
            <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  // Save the file in state
                  setImageFile(file);
                  return false; // Do not upload immediately
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            {/* Form item for entering the Name */}
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            {/* Form item for entering the Rank */}
            <Form.Item label="Rank" name="rank" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>

            {/* Form item for entering the Date */}
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
              <Input type="text" placeholder="YYYY-MM-DD" />
            </Form.Item>

            {/* Form item for the submit button */}
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

export default Ranks;
