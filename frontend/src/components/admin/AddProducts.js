import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addprod.css";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    facultyName: "",
    productID: "",
    productType: "Combo",
    course: "",
    group_name: "",
    subject: "",
    deliveryType: "Regular",
    isFranchise: false,
    isWhatsapp: false,
    priceUpdate: false,
    price: 0,
    discountPrice: 0,
    image: null,
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    category_id: "",
  });
  
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      image: file,  
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        // Replace with the appropriate backend API endpoint
        "http://localhost:8081/admin/add-product",
        productInfo
      );

      if (response.status === 200) {
        setSuccessMessage("Product added successfully");
        navigate("/admin/products");
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
                  className="rdio"
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
                  className="rdio"
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
                  className="rdio"
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
                  className="rdio"
                />
                Fast Track
              </label>
            </div>
          </div>
          
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Discount Price:</label>
            <input
              type="number"
              name="discountPrice"
              value={productInfo.discountPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={productInfo.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Short Description:</label>
            <textarea
              name="shortDescription"
              value={productInfo.shortDescription}
              onChange={handleChange}
            />
          </div>
        
          <div>
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={productInfo.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Category ID:</label>
            <input
              type="text"
              name="category_id"
              value={productInfo.category_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Additional Services:</label>
            <div>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="isFranchise"
                  checked={productInfo.isFranchise}
                  onChange={handleChange}
                  className="rdio"
                />
                Is Franchise
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="isWhatsapp"
                  checked={productInfo.isWhatsapp}
                  onChange={handleChange}
                />
                Broadcast To Whatsapp
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="priceUpdate"
                  checked={productInfo.priceUpdate}
                  onChange={handleChange}
                />
                Price Update
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={productInfo.featured}
                  onChange={handleChange}
                />
                Featured
              </label>
            
            </div>
          </div>
          <button type="submit" id="btnn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
