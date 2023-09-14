import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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



  // Function to open the confirmation dialog for deletion
  const handleOpenConfirmationDialog = (id) => {
    setDeleteProductId(id);
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setDeleteProductId(null);
    setShowConfirmationDialog(false);
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    if (deleteProductId) {
      try {
        console.log(`Deleting product with ID: ${deleteProductId}`);

        const response = await axios.delete(`http://localhost:8081/admin/products/${deleteProductId}`);
        console.log('Delete response:', response);

        if (response.status === 200) {
          // Update the state of the products array
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deleteProductId));
          console.log('Product deleted successfully');
          setShowSuccessMessage(true);

          // Close the confirmation dialog
          handleCloseConfirmationDialog();

          // Hide the success message after 3 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        } else {
          console.log('Delete request did not return a success status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
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
            <th>Course</th>
            <th>Subject</th>
            <th>Delivery Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.facultyName}</td>
              <td>{product.course}</td>
              <td>{product.subject}</td>
              <td>{product.deliveryType}</td>
              <td>
                <button onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Edit</button>
                <button onClick={() => handleOpenConfirmationDialog(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this product?</p>
          <button onClick={handleCloseConfirmationDialog}>Cancel</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          Product deleted successfully.
        </div>
      )}
    </div>
  );
}
