import React, { useState } from "react";
import axios from "axios";

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

export default function StudentDetails() {
  const [studentInfo, setStudentInfo] = useState({
    avatar: null,
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    serial_key: generateRandomKey(),
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevStudentInfo) => ({
      ...prevStudentInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setStudentInfo((prevStudentInfo) => ({
      ...prevStudentInfo,
      avatar: file,
    }));
  };

  // Function to open the confirmation dialog for deletion
  const handleOpenConfirmationDialog = () => {
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(studentInfo);
    try {
      const response = await axios.post(
        "http://localhost:8081/franchise/add-student",
        studentInfo
      );

    } catch (error) {
      console.error("Error submitting student data:", error);
    }
  };

  return (
    <div>
      <h2>Student Details</h2>
      <form>
        <div>
          <label htmlFor="name">Upload Image:</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleImageUpload}
          />
             {imagePreview && (
            <img
              src={imagePreview}
              alt="Avatar Preview"
              style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
            />
            )}
        </div>
        <div>
          <label htmlFor="name">Student Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={studentInfo.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={studentInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={studentInfo.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={studentInfo.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pinCode">Pin Code:</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={studentInfo.pinCode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="button" onClick={() => handleOpenConfirmationDialog()}>
          Submit
        </button>
      </form>
      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to continue?</p>
          <button onClick={handleCloseConfirmationDialog}>Cancel</button>
          <button onClick={handleSubmit}>Yes</button>
        </div>
      )}
    </div>
  );
}
