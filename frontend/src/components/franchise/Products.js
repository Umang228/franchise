import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

export default function Products() {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productsData, setProductsData] = useState([]);

  // Function to fetch selected product IDs from the backend
  const fetchSelectedProductIds = async () => {
    try {
      const response = await axios.get(
        // Replace with your backend API endpoint to retrieve selected product IDs
        'http://localhost:8081/franchise/products'
      );

      if (response.status === 200) {
        // Split the comma-separated string into an array of product IDs
        const ids = response.data.split(',').map((id) => parseInt(id));
        setSelectedProductIds(ids);
      }
    } catch (error) {
      console.error('Error fetching selected product IDs:', error);
    }
  };

  // Function to fetch product details by product ID
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(
        // Replace with your backend API endpoint to retrieve product details by ID
        `http://localhost:8081/franchise/products/${id}`
      );

      if (response.status === 200) {
        setProductsData((prevData) => [...prevData, response.data]);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Call fetchSelectedProductIds when the component mounts
  useEffect(() => {
    fetchSelectedProductIds();
  }, []);

  // Fetch product details for each selected product ID
  useEffect(() => {
    selectedProductIds.forEach((id) => {
      fetchProductDetails(id);
    });
  }, [selectedProductIds]);

  // Define your table headers
  const tableHeaders = [
    'Product Name',
    'Faculty Name',
    'Product ID',
    'Product Type',
    'Course',
    'Group',
    'Subject',
    'Delivery Type',
    'Actions',
  ];

  return (
    <div>
      <Sidebar />
      <h1>Selected Products</h1>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.facultyName}</td>
              <td>{product.productID}</td>
              <td>{product.productType}</td>
              <td>{product.course}</td>
              <td>{product.group}</td>
              <td>{product.subject}</td>
              <td>{product.deliveryType}</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
