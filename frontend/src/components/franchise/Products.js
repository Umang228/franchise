import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import axios from 'axios';
import '../style/prod.css'


export default function Products() {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const fetchSelectedProductIds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/franchise/products');

      if (response.status === 200) {
        const productsWithPrices = response.data;
        setSelectedProductIds(productsWithPrices.map(product => product.product_id));
        setProductsData(productsWithPrices); // Update productsData with price and discount
      }
    } catch (error) {
      console.error('Error fetching selected product IDs:', error);
    }
  };
  useEffect(() => {
    fetchSelectedProductIds();
  }, []);


useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      setProductsData([]);  // Clear existing product data before fetching new data
      const productDetailsPromises = selectedProductIds.map((id) => axios.get(`http://localhost:8081/franchise/products/${id}`));
      const productDetailsResponses = await Promise.all(productDetailsPromises);

      const newProductsData = productDetailsResponses
        .filter((response) => response.status === 200)
        .map((response, index) => ({
          ...response.data,
          price: productsData[index].price, // Use price from productsData
          discountPrice: productsData[index].discount_price // Use discount price from productsData
        }));

      setProductsData(newProductsData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  fetchProductDetails();
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
    <div className='prod'>
      <Sidebar />
        <div className="child-prod">
        <h1 className='heading1'>Selected Products</h1>
      <table className='utable'>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => (
            <tr key={index} onClick={() => handleRowClick(product.id)} className='row'>
              <td>{product.productName}</td>
              <td>{product.facultyName}</td>
              <td>{product.productID}</td>
              <td>{product.productType}</td>
              <td>{product.course}</td>
              <td>{product.group}</td>
              <td>{product.subject}</td>
              <td>{product.deliveryType}</td>
              <td>{product.price}</td>  
              <td>{product.discountPrice}</td>  


            </tr>
          ))}
        </tbody>
      </table>
 
        </div>
     </div>
  );
}