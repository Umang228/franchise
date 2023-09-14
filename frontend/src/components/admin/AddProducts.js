import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import axios from "axios";

export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    facultyName: "",
    productID: "",
    productType: "Combo", // Default value
    course: "",
    group_name: "",
    subject: "",
    deliveryType: "Regular",
    isFranchise: false,
    isWhatsapp: false,
    priceUpdate: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        // Replace with the appropriate backend API endpoint
        'http://localhost:8081/admin/add-product',  
        productInfo
      );

      if (response.status === 200) {
        setSuccessMessage("Product added successfully");
        navigate('/admin/products');
      } else {
        console.log("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="add-product-form">
        <h2>Add Product</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Faculty Name:</label>
            <input
              type="text"
              name="facultyName"
              value={productInfo.facultyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product ID (SKU):</label>
            <input
              type="text"
              name="productID"
              value={productInfo.productID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="productType"
                  value="Combo"
                  checked={productInfo.productType === "Combo"}
                  onChange={handleChange}
                />
                Combo
              </label>
              <label>
                <input
                  type="radio"
                  name="productType"
                  value="Single"
                  checked={productInfo.productType === "Single"}
                  onChange={handleChange}
                />
                Single
              </label>
            </div>
          </div>
          <div>
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={productInfo.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Group:</label>
            <input
              type="text"
              name="group_name"
              value={productInfo.group_name} 
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={productInfo.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Delivery Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="Regular"
                  checked={productInfo.deliveryType === "Regular"}
                  onChange={handleChange}
                />
                Regular
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="Fast Track"
                  checked={productInfo.deliveryType === "Fast Track"}
                  onChange={handleChange}
                />
                Fast Track
              </label>
            </div>
          </div>
          <div>
            <label>Additional Services:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="isFranchise"
                  checked={productInfo.isFranchise}
                  onChange={handleChange}
                />
                Is Franchise
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isWhatsapp"
                  checked={productInfo.isWhatsapp}
                  onChange={handleChange}
                />
                Broadcast To Whatsapp
              </label>
              <label>
                <input
                  type="checkbox"
                  name="priceUpdate"
                  checked={productInfo.priceUpdate}
                  onChange={handleChange}
                />
                Price Update
              </label>
            </div>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
