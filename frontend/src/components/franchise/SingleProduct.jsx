import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleProd.css';
import axios from 'axios';
import SideBar from './Sidebar';

export default function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/admin/products/${id}`);

        if (response.status === 200) {
          setProduct(response.data.products);
        } else {
          console.error('Error fetching product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);
  useEffect(() => {
  }, [product]);

  const handleBuyNow = () => {
    navigate('/franchise/student-details');
  };

  return (
    <div>
      <SideBar/>
      <div className="app">
        {product ? (
          <div className="details">
            <div className="big-img">
            <img src={product.image} alt={product.productName}/>
            </div>
            
            <div className="box">
            <div className="row">
            <h1 className="product-name">{product.productName}</h1>
              <p className="product-price">Price: Rs {product.price}</p>
            </div>

              <p className="product-short-desc">{product.shortDescription}</p>
              <p className="product-desc">{product.description}</p>
            </div>
            <button onClick={handleBuyNow} className="btn-4">
              Buy Now
            </button>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
}
