import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../style/prod.css';

export default function EditSelectProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  

 

  

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/admin/product/${id}`);
        if (response.status === 200) {
          setSelectedProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching selected products:', error);
      }
    };
    fetchProductDetails();

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/products');
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };
    fetchAllProducts();
     
  }, [id]);

  const handleCheckboxChange = (productId) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  };

  
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8081/admin/update_selected_products', {
        id,
        selectedProducts,
      });
      setSuccessMessage('Selection updated successfully');
      navigate('/admin/franchise');
    } catch (error) {
      console.error('Error updating selected products:', error);
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
                <td>{product.price}</td>
              <td>{product.discountPrice}</td>
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

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}
