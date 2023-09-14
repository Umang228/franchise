import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import Sidebar from '../Header/Sidebar';

export default function AddFranchise() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    gst_number: "",
    franchise_type: "Regular",
    mode_of_payment: "Wallet",
    selected_products: [],
  });

  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedList) => {
    setFormData((prevData) => ({
      ...prevData,
      selected_products: selectedList,
    }));
  };
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        // Replace with the appropriate backend API endpoint
        "http://localhost:8081/admin/add-franchise",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Product added successfully");
        navigate("/admin/franchise");
      } else {
        console.log("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch the list of products from the server
    axios
      .get("http://localhost:8081/admin/products")
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="add-franchise-form">
        <h2>Add Franchise</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

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
                  className="rdio"
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
                  className="rdio"
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
              className="modeOfPayment"
            >
              <option value="Wallet">Wallet</option>
              <option value="Payment Gateway">Payment Gateway</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label>Select Products:</label>
            <Multiselect
              options={products}
              displayValue="productName"
              selectedValues={formData.selected_products}
              onSelect={(selectedList) =>
                handleSelectChange(selectedList, "selected_products")
              }
              onRemove={(selectedList) =>
                handleSelectChange(selectedList, "selected_products")
              }
              className="selectProducts"
            />
          </div>

          <div>
            <button type="submit" id="addBtnn">Add Franchise</button>
          </div>
        </form>
      </div>
    </div>
  );
}
