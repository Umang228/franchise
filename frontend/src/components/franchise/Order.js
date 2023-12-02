import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import axios from 'axios';

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobileNumber', headerName: 'Mobile Number', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'product_id', headerName: 'Product ID', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
  ];

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
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ margin: '20px', flex: '1', padding: '15px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Orders</h1>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={orderDetails} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  );
}

export default Order;
