import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from './Sidebar';

export default function EditFranchise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    gst_number: "",
    franchise_type: "Regular",
    mode_of_payment: "Wallet",
    selected_products: "",
  });

  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch the list of products from the server
    axios
      .get("http://localhost:8081/admin/products") // Replace with your API endpoint
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetch franchise data based on franchiseId
    axios
      .get(`http://localhost:8081/admin/franchise/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setFormData(response.data.franchise);
        }
      })
      .catch((error) => {
        console.error("Error fetching franchise data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8081/admin/franchise/${id}`,
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Franchise updated successfully");
        navigate(`/admin/franchise`);
      } else {
        console.log("Error updating franchise");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="edit-franchise-form">
        <h2>Edit Franchise</h2>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>GST Number:</label>
            <input
              type="text"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Franchise Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="franchise_type"
                  value="Regular"
                  checked={formData.franchise_type === "Regular"}
                  onChange={handleChange}
                />
                Regular
              </label>
              <label>
                <input
                  type="radio"
                  name="franchise_type"
                  value="Online"
                  checked={formData.franchise_type === "Online"}
                  onChange={handleChange}
                />
                Online
              </label>
            </div>
          </div>
          <div>
            <label>Mode of Payment:</label>
            <select
              name="mode_of_payment"
              value={formData.mode_of_payment}
              onChange={handleChange}
            >
              <option value="Wallet">Wallet</option>
              <option value="Payment Gateway">Payment Gateway</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label>Select Products:</label>
            <select
              name="selected_products"
              value={formData.selected_products}
              onChange={handleChange}
            >
              <option value="">Select a Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Update Franchise</button>
          </div>
        </form>
      </div>
    </div>
  );
}
