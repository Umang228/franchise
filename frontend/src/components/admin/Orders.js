import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../style/prod.css';

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/order-details');
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className='prod'>
      <Sidebar />
      <div className="child-prod">
        <h1 className='heading1'>Orders</h1>
        <table className='utable'>
          <thead>
            <tr>
              <th>Franchise Name</th>
              <th>Email</th>
              <th>Student Name</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order, index) => (
              <tr key={index}>
                <td>{order.franchise_name}</td>
                <td>{order.franchise_email}</td>
                <td>{order.student_name}</td>
                <td>{order.product_name}</td>
                <td>{/* Add the status here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
