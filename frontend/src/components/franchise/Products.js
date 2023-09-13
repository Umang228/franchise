import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Header/Sidebar';
import axios from 'axios';

export default function Products({ selectedProducts }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to get product details by product ID
  const getProductDetailsById = (id) => {
    return products.find((product) => product.id === id);
  };

  return (
    <div>
      <Sidebar />
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Faculty Name</th>
            <th>Product ID</th>
            <th>Product Type</th>
            <th>Course</th>
            <th>Group</th>
            <th>Subject</th>
            <th>Delivery Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((id) => {
            const product = getProductDetailsById(id);
            if (product) {
              return (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td>{product.facultyName}</td>
                  <td>{product.productID}</td>
                  <td>{product.productType}</td>
                  <td>{product.course}</td>
                  <td>{product.subject}</td>
                  <td>{product.deliveryType}</td>
                  <td>
                    <button onClick={() => navigate(`/franchise/products/edit/${product.id}`)}>Edit</button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}
