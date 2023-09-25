import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/prod.css';
import axios from 'axios';

export default function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    console.log('Product:', product);
  }, [product]);

  return (
    <div className="prod">
      <div className="child-prod">
        {product ? (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <img src={product.image} alt={product.productName} className="product-image" />
            <div className="product-details">
              <h1 className="product-name">{product.productName}</h1>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-short-desc">{product.shortDescription}</p>
              <p className="product-desc">{product.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
}
