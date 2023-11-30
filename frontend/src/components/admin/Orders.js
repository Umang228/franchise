import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../style/prod.css';

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/order-details');
      
      // Add unique identifier to each row
      const ordersWithId = response.data.map((order, index) => ({
        ...order,
        id: index + 1, // You can use a better unique identifier from your server
      }));
      
      setOrderDetails(ordersWithId);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const columns = [
    { field: 'franchise_name', headerName: 'Franchise Name', flex: 1 },
    { field: 'franchise_email', headerName: 'Email', flex: 1 },
    { field: 'student_name', headerName: 'Student Name', flex: 1 },
    { field: 'product_name', headerName: 'Product Name', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.1,
      renderCell: () => <span className='order-com' style={{ padding: '13px', width: '100%', textAlign: 'center' }}>Completed</span>,
    },
  ];

  return (
    <div className='prod'>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '84px' }}>
          <h1 className='heading1'>Orders</h1>
          <DataGrid
            rows={orderDetails}
            columns={columns}
            pageSize={10}
            autoHeight
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            style={{background:'#fff',boxShadow:'1px 1px 10px lightgray'}}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
