import React, { useState, useEffect } from 'react';
import { Table, Input, Checkbox, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

import '../style/prod.css';

const SelectProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [enteredPrices, setEnteredPrices] = useState({});
  const [enteredDiscountPrices, setEnteredDiscountPrices] = useState({});
  const navigate = useNavigate();

  const handleCheckboxChange = (productId) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  };

  const handlePriceChange = (productId, price) => {
    setEnteredPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: price,
    }));
  };

  const handleDiscountPriceChange = (productId, discountPrice) => {
    setEnteredDiscountPrices((prevDiscountPrices) => ({
      ...prevDiscountPrices,
      [productId]: discountPrice,
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        selectedProducts: selectedProducts,
        enteredPrices: enteredPrices,
        enteredDiscountPrices: enteredDiscountPrices,
      };

      await axios.post('http://localhost:8081/admin/select', requestData);
      navigate('/admin/franchise');
      console.log('Selection saved successfully');
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/product');
      if (response.status === 200) {
        setProducts(response.data);

        // Set initial enteredPrices based on fetched products
        const initialPrices = {};
        response.data.forEach((product) => {
          initialPrices[product.id] = product.price;
        });
        setEnteredPrices(initialPrices);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Faculty Name',
      dataIndex: 'facultyName',
      key: 'facultyName',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Delivery Type',
      dataIndex: 'deliveryType',
      key: 'deliveryType',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Enter Price"
          value={enteredPrices[record.id]}
          onChange={(e) => handlePriceChange(record.id, e.target.value)}
        />
      ),
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Enter Discounted Price"
          value={enteredDiscountPrices[record.id] || ''}
          onChange={(e) => handleDiscountPriceChange(record.id, e.target.value)}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Checkbox
          onChange={() => handleCheckboxChange(record.id)}
          checked={selectedProducts.includes(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod" style={{ padding: '115px' }}>
        <h1 className="heading1">Select Products</h1>

        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{ pageSize: 5 }} // Adjust pageSize as needed
          scroll={{ x: true }}
        />

        <Button
          onClick={handleSubmit}
          type="primary"
          className="btn-10"
          style={{ padding: '13px', textAlign: 'center', height: '50px' }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SelectProducts;
