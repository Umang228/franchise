import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);


    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8081/franchise/order-details'); 
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

 

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    
    <div>
       <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
           
      <Sidebar />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Product ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.mobileNumber}</td>
              <td>{order.city}</td>
              <td>{order.product_id}</td>
              <td>{order.address}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
