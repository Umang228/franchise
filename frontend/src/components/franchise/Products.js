import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import axios from 'axios';

export default function Products() {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  const fetchSelectedProductIds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/franchise/products');
      if (response.status === 200) {
        setSelectedProductIds(response.data);
      }
    } catch (error) {
      console.error('Error fetching selected product IDs:', error);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/franchise/products/${id}`);
      if (response.status === 200) {
        // Append the new product details to the existing productsData
        setProductsData((prevData) => [...prevData, response.data]);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  useEffect(() => {
    fetchSelectedProductIds();
  }, []);

  useEffect(() => {
    // Fetch product details for each selected product ID
    setProductsData([]); // Clear existing product data before fetching new data
    selectedProductIds.forEach((id) => {
      fetchProductDetails(id);
    });
  }, [selectedProductIds]);


  const handleRowClick = (id) => {
    // Navigate to the product details page when a row is clicked
    navigate(`/franchise/product/${id}`);
  };

  const tableHeaders = [
    'Product Name',
    'Faculty Name',
    'Product ID',
    'Product Type',
    'Course',
    'Group',
    'Subject',
    'Delivery Type',
    'Price',  
    'Discount Price'  
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
          {productsData.map((product, index) => (
            <tr key={index} onClick={() => handleRowClick(product.id)}>
              <td>{product.productName}</td>
              <td>{product.facultyName}</td>
              <td>{product.productID}</td>
              <td>{product.productType}</td>
              <td>{product.course}</td>
              <td>{product.group}</td>
              <td>{product.subject}</td>
              <td>{product.deliveryType}</td>
               
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
