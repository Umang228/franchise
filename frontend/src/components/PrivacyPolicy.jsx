// PrivacyPolicy.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './admin/Navbar';
import { Row, Col } from "antd";
const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrivacyInfo();
  }, []);

  const fetchPrivacyInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/privacy'); // Update the URL as needed
      setPrivacyData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching privacy information:', error);
      setLoading(false);
    }
  };

  return (
    <div>
        <Navbar/>
      <h1 style={{marginTop:'30px'}}>Privacy Policy</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {privacyData.map((privacyInfo) => (
            <li key={privacyInfo.id}>
             {privacyInfo.details}
            </li>
          ))}
        </ul>
      )}
         <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "20px 10px",
          height: "300px",
          width: "100%",
          marginTop:'45px'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: 'white' }}>Call Us</h3>
              <a href="tel:7742554277" style={{ color: 'white' }}>7742554277</a>
            </div>
            <div>
              <h3 style={{ color: 'white' }}>Email</h3>
              <a href="mailto:air1@gmail.com" style={{ color: 'white' }}>air1@gmail.com</a>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px", display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'white' }}>Quick Links</h3>
              <a href="/homepage" style={{ color: 'white' }}>Home</a>
              <a href="/about" style={{ color: 'white' }}>About Us</a>
              <a href="/allProducts" style={{ color: 'white' }}>Products</a>
              <a href="/contact" style={{ color: 'white' }}>Contact Us</a>
              <a href="/termsNdC" style={{ color: 'white' }}>Terms and Conditions</a>
              <a href="/privacyP" style={{ color: 'white' }}>Privacy Policy</a>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: 'white' }}>CA Classes</h3>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <h3 style={{ color: 'white' }}>Social Links</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 5px", color: 'white' }}
                >
                  <i
                    className="fa-solid fa-eye"
                    style={{ margin: "0 5px" }}
                  ></i>
                  <i
                    className="fab fa-whatsapp"
                    style={{ margin: "0 5px", color: "green" }}
                  ></i>
                  <i
                    className="fab fa-youtube"
                    style={{ margin: "0 5px", color: "red" }}
                  ></i>
                  <i
                    className="fa-solid fa-phone"
                    style={{ margin: "0 5px", color: "darkgray" }}
                  ></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
