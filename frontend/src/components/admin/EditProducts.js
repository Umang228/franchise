import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from './Sidebar';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    category_id: "",
    productImage: null,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch the existing product data based on the id from the URL
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/admin/products/${id}`
        );

        if (response.status === 200) {
          setProductInfo(response.data.products);
        } else {
          console.log("Error fetching product data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductData();
  }, [id]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      // Update the image preview
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));

      // Update the productInfo with the selected image
      setProductInfo((prevInfo) => ({
        ...prevInfo,
        productImage: file,
      }));
    } else {
      setProductInfo((prevInfo) => ({
        ...prevInfo,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in productInfo) {
        // converting boolean values into 0 and 1
        const value = typeof productInfo[key] === "boolean" ? Number(productInfo[key]) : productInfo[key];
        formData.append(key, value);
      }
      const response = await axios.put(
        `http://localhost:8081/admin/products/${id}`,
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Product updated successfully");
        navigate(`/admin/products`);
      } else {
        console.log("Error updating product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="edit-product-form">
        <h2>Edit Product</h2>
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
            <label>Upload Image:</label>
            <input
              type="file"
              name="productImage"
              onChange={handleChange}
              accept="image/*"
            />
              {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
            />
          )}
          </div>
          <div>
            <label>Additional Services:</label>
            <div>
              <label style={{ color: 'black', padding: 15 }}>
                <input
                  type="checkbox"
                  name="isFranchise"
                  checked={productInfo.isFranchise}
                  onChange={handleChange}
                  
                />
                Is Franchise
              </label>
              <label style={{ color: 'black', padding: 15 }}>
                <input
                  type="checkbox"
                  name="isWhatsapp"
                  checked={productInfo.isWhatsapp}
                  onChange={handleChange}
                />
                Broadcast To Whatsapp
              </label>
              <label style={{ color: 'black', padding: 15 }}>
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
          <button type="submit" className="update-product">Update Product</button>
        </form>
      </div>
    </div>
  );
}
