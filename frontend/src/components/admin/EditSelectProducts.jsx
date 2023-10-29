import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../style/prod.css";

export default function EditSelectProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [updatedDiscountPrices, setUpdatedDiscountPrices] = useState({});

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      try {
        const response = await axios.get(`
          http://localhost:8081/admin/product/${id}`);
        if (response.status === 200) {
          const selectedProductsData = response.data;

          const selectedProductsDetails = Object.keys(selectedProductsData).map(
            (productId) => {
              const { price, discountPrice } = selectedProductsData[productId];
              const product = products.find(
                (p) => p.id === parseInt(productId, 10)
              );
              if (product) {
                return {
                  ...product,
                  price,
                  discountPrice,
                };
              }
              return null;
            }
          );

          const filteredSelectedProductsDetails =
            selectedProductsDetails.filter((product) => product !== null);

          setSelectedProducts(filteredSelectedProductsDetails);
        }
      } catch (error) {
        console.error("Error fetching selected products:", error);
      }
    };

    fetchSelectedProducts();
  }, [id, products]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/admin/products"
        );
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const checkboxesRef = useRef({});
  const handleCheckboxChange = (productId) => {
    // Check if the product is already selected
    const isProductSelected = selectedProducts.some((p) => p.id === productId);

    if (isProductSelected) {
      // If it's selected, remove it from the list
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((p) => p.id !== productId)
      );
    } else {
      // If it's not selected, add it to the list
      const productToAdd = products.find((p) => p.id === productId);
      if (productToAdd) {
        setSelectedProducts((prevSelectedProducts) => [
          ...prevSelectedProducts,
          productToAdd,
        ]);
      }
    }
  };

  const handlePriceChange = (productId, value) => {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      price: product.id === productId ? parseFloat(value) : product.price,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleDiscountPriceChange = (productId, value) => {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      discountPrice:
        product.id === productId ? parseFloat(value) : product.discountPrice,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      const selectedProductIds = selectedProducts.map((product) => product.id);
      const updatedProducts = selectedProducts.map((product) => ({
        id: product.id,
        price: updatedPrices[product.id] || product.price,
        discountPrice:
          updatedDiscountPrices[product.id] || product.discountPrice,
      }));

      await axios.post("http://localhost:8081/admin/update_selected_products", {
        id,
        selectedProductIds,
        updatedProducts,
      });
      setSuccessMessage("Selection updated successfully");
      navigate("/admin/franchise");
    } catch (error) {
      console.error("Error updating selected products:", error);
    }
  };

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">
        <h1 className="heading1">Edit Selected Products</h1>

        <table className="utable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Faculty Name</th>
              <th>Course</th>
              <th>Subject</th>
              <th>Delivery Type</th>
              <th>Price</th>
              <th>Discounted Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="row">
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.facultyName}</td>
                <td>{product.course}</td>
                <td>{product.subject}</td>
                <td>{product.deliveryType}</td>
                <td>
                  <input
                    type="number"
                    value={selectedProducts.find(p => p.id === product.id)?.price || 0}

                    onChange={(e) =>
                      handlePriceChange(product.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={selectedProducts.find(p => p.id === product.id)?.discountPrice || 0}

                    onChange={(e) =>
                      handleDiscountPriceChange(product.id, e.target.value)
                    }
                  />
                </td>

                <td className="action">
                  <input
                    type="checkbox"
                    ref={(el) => (checkboxesRef.current[product.id] = el)}
                    onChange={() => handleCheckboxChange(product.id)}
                    checked={selectedProducts.some((p) => p.id === product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <button onClick={handleSubmit} className="btn-10">Update</button>
      </div>
    </div>
  );
}
