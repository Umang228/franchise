import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import SideBar from './Sidebar';

const Products = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  const fetchSelectedProductIds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/franchise/products');

      if (response.status === 200) {
        const productsWithPrices = response.data;
        setSelectedProductIds(productsWithPrices.map((product) => product.product_id));
      }
    } catch (error) {
      console.error('Error fetching selected product IDs:', error);
    }
  };

  useEffect(() => {
    fetchSelectedProductIds();
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setProductsData([]);
        const productDetailsPromises = selectedProductIds.map(async (id) => {
          const response = await axios.get(`http://localhost:8081/franchise/products/${id}`);
          if (response.status === 200) {
            return {
              id, // Generate a unique id based on the product_id
              ...response.data,
            };
          }
          return null;
        });
        const productDetailsResponses = await Promise.all(productDetailsPromises);

        const newProductsData = productDetailsResponses.filter(Boolean);
        setProductsData((prevData) => [...prevData, ...newProductsData]);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [selectedProductIds]);

  const handleRowClick = (id) => {
    navigate(`/franchise/product/${id}`);
  };

  const columns = [
    { field: 'productName', headerName: 'Product Name', flex: 2 ,width:'150px' },
    { field: 'facultyName', headerName: 'Faculty Name', flex: 1 },
    { field: 'productID', headerName: 'Product ID', flex: 1 },
    { field: 'productType', headerName: 'Product Type', flex: 1 },
    { field: 'course', headerName: 'Course', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    { field: 'deliveryType', headerName: 'Delivery Type', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'discountPrice', headerName: 'Discount Price', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 2,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleRowClick(params.id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ margin: '20px', flex: '1', padding: '15px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Selected Products</h1>
        <Paper style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={productsData}
            columns={columns}
            pageSize={10}
            onRowClick={(params) => handleRowClick(params.id)}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Products;
