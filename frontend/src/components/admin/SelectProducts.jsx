import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../style/prod.css";
import axios from "axios";
import "../style/prod.css";

export default function SelectProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [enteredPrices, setEnteredPrices] = useState({});
  const [enteredDiscountPrices, setEnteredDiscountPrices] = useState({});

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleCheckboxChange = (productId) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  };

  const handlePriceChange = (productId, price) => {
    setEnteredPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: price,
    }));
  };

  const handleDiscountPriceChange = (productId, discountPrice) => {
    setEnteredDiscountPrices((prevDiscountPrices) => ({
      ...prevDiscountPrices,
      [productId]: discountPrice,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const requestData = {
        selectedProducts: selectedProducts,
        enteredPrices: enteredPrices,
        enteredDiscountPrices: enteredDiscountPrices
      };
  
      await axios.post("http://localhost:8081/admin/select", requestData);
      navigate("/admin/franchise");
      console.log("Selection saved successfully");
    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };
  

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/product");
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">
        <h1 className="heading1">Products</h1>

        <table class="utable">
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
            {records.map((product) => (
              <tr key={product.id} className="row">
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td> {product.facultyName}</td>
                <td> {product.course}</td>
                <td>{product.subject}</td>
                <td>{product.deliveryType}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Price"
                    value={enteredPrices[product.id] || ""}
                    onChange={(e) =>
                      handlePriceChange(product.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Discounted Price"
                    value={enteredDiscountPrices[product.id] || ""}
                    onChange={(e) =>
                      handleDiscountPriceChange(product.id, e.target.value)
                    }
                  />
                </td>
                <td className="action">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(product.id)}
                    checked={selectedProducts.includes(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSubmit} className="btn-10" style={{position:'absolute',top:"500px",color:'white',background:"black"}}>Submit</button>

        <nav>
          <ul>
            <li>
              <a href="#0" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, products) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={products}
              >
                <a href="#0" onClick={() => changeCPage(n)}>
                  {n}
                </a>
              </li>
            ))}
            <li>
              <a href="#0" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
  //pagination
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}
