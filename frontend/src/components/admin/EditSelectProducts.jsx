import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../style/prod.css";
import { Table, Input, Checkbox, Button } from 'antd';

export default function EditSelectProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [updatedDiscountPrices, setUpdatedDiscountPrices] = useState({});

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      try {
        const response = await axios.get(`
          http://localhost:8081/admin/product/${id}`);
        if (response.status === 200) {
          const selectedProductsData = response.data;

          const selectedProductsDetails = Object.keys(selectedProductsData).map(
            (productId) => {
              const { price, discountPrice } = selectedProductsData[productId];
              const product = products.find(
                (p) => p.id === parseInt(productId, 10)
              );
              if (product) {
                return {
                  ...product,
                  price,
                  discountPrice,
                };
              }
              return null;
            }
          );

          const filteredSelectedProductsDetails =
            selectedProductsDetails.filter((product) => product !== null);

          setSelectedProducts(filteredSelectedProductsDetails);
        }
      } catch (error) {
        console.error("Error fetching selected products:", error);
      }
    };

    fetchSelectedProducts();
  }, [id, products]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/admin/products"
        );
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const checkboxesRef = useRef({});
  const handleCheckboxChange = (productId) => {
    // Check if the product is already selected
    const isProductSelected = selectedProducts.some((p) => p.id === productId);

    if (isProductSelected) {
      // If it's selected, remove it from the list
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((p) => p.id !== productId)
      );
    } else {
      // If it's not selected, add it to the list
      const productToAdd = products.find((p) => p.id === productId);
      if (productToAdd) {
        setSelectedProducts((prevSelectedProducts) => [
          ...prevSelectedProducts,
          productToAdd,
        ]);
      }
    }
  };

  const handlePriceChange = (productId, value) => {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      price: product.id === productId ? parseFloat(value) : product.price,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleDiscountPriceChange = (productId, value) => {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      discountPrice:
        product.id === productId ? parseFloat(value) : product.discountPrice,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      const selectedProductIds = selectedProducts.map((product) => product.id);
      const updatedProducts = selectedProducts.map((product) => ({
        id: product.id,
        price: updatedPrices[product.id] || product.price,
        discountPrice:
          updatedDiscountPrices[product.id] || product.discountPrice,
      }));

      await axios.post("http://localhost:8081/admin/update_selected_products", {
        id,
        selectedProductIds,
        updatedProducts,
      });
      setSuccessMessage("Selection updated successfully");
      navigate("/admin/franchise");
    } catch (error) {
      console.error("Error updating selected products:", error);
    }
  };
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
          type="number"
          value={selectedProducts.find((p) => p.id === record.id)?.price || 0}
          onChange={(e) => handlePriceChange(record.id, e.target.value)}
        />
      ),
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      render: (text, record) => (
        <Input
          type="number"
          value={selectedProducts.find((p) => p.id === record.id)?.discountPrice || 0}
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
          checked={selectedProducts.some((p) => p.id === record.id)}
        />
      ),
    },
  ];


  return (
    <div className="prod">
      <Sidebar />
      <div  style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'35px'}}>
      <h1>Select Products</h1>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Adjust the pageSize as needed
        onChange={(pagination) => console.log('pagination', pagination)}
        // Add additional features or configuration as needed
        style={{padding:'23px'}}
      />

      {successMessage && <p className="success-message">{successMessage}</p>}

      <Button onClick={handleSubmit} type="primary" className="btn-10">
        Update
      </Button>
      </div>

    </div>
  );
}
