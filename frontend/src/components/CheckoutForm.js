// Import necessary dependencies from Ant Design and other libraries
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, Row, Col, Typography } from 'antd';
import emailjs from 'emailjs-com';
import Navbar from "./admin/Navbar";

// Destructuring components from Ant Design Typography
const { Option } = Select;
const { Title, Text } = Typography;

// Define the CheckoutForm component
const CheckoutForm = () => {
  // State variables for user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  // State variable to store checked-out items
  const [checkedOutItems, setCheckedOutItems] = useState([]);

  // useEffect hook to run code on component mount
  useEffect(() => {
    // Retrieve checked-out items from local storage
    const storedCheckedOutItems = localStorage.getItem('checkedout');

    // Parse the stored data, or set an empty array if it's not an array
    const parsedCheckedOutItems = JSON.parse(storedCheckedOutItems) || [];

    // Ensure that parsedCheckedOutItems is an array
    if (Array.isArray(parsedCheckedOutItems)) {
      setCheckedOutItems(parsedCheckedOutItems);
    } else {
      setCheckedOutItems([]);
    }

    console.log('checked-out', Object.keys(checkedOutItems));
  }, []);

  // Event handler for the "Buy Now" button click
  const handleBuy = () => {
    // Perform buy process and save checked-out items to local storage
    const itemsToStore = [
      { id: 1, name: 'Product 1', price: 20.0 },
      { id: 2, name: 'Product 2', price: 15.0 },
    ];

    // Save itemsToStore to local storage
    localStorage.setItem('itemsToStore', JSON.stringify(itemsToStore));

    // Send email using EmailJS
    const templateParams = {
      to_name: name,
      to_email: email,
      // Create a string with items details for the email template
      items: itemsToStore.map((item) => `${item.name} - $${item.price.toFixed(2)}`).join('\n'),
    };

    // Replace 'user_your_user_id' with your actual EmailJS user ID
    emailjs
      .send('service_nz0shmf', 'template_k36tqj1', templateParams, 'user_your_user_id')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  // List of countries for the Select component
  const countries = ['Afghanistan', 'Albania', 'Algeria', 'India' /* Add all countries here */];

  // Define the CheckoutSummary component
  const CheckoutSummary = ({ checkedOutItems }) => {
    return (
      <div style={{ marginTop: '20px' }}>
        {/* Display title */}
        <Title level={3}>Checked-out Items</Title>
        {checkedOutItems.length === 0 ? (
          // Display message if no items are checked out
          <Text>No items checked out.</Text>
        ) : (
          // Display checked-out items in a Card component
          <Card style={{ width: '100%' }}>
            {checkedOutItems.map((item) => (
              <p key={item.id}>
                {/* Display each item's name and price */}
                <Text strong>{item.name}</Text> - ${item.price.toFixed(2)}
              </p>
            ))}
          </Card>
        )}
      </div>
    );
  };

  // Return the JSX for the CheckoutForm component
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', background: '#f0f2f5' }}>
        {/* Display title */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Checkout
        </Title>
        {/* Create a two-column layout using Row and Col components */}
        <Row gutter={[16, 16]}>
          {/* Left column with user input form */}
          <Col xs={24} sm={12}>
            <Form layout="vertical">
              <Form.Item label="Name">
                {/* Input for user to enter their name */}
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Email">
                {/* Input for user to enter their email */}
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="Country/Region">
                {/* Select dropdown for user to choose their country */}
                <Select
                  placeholder="Select country"
                  value={country}
                  onChange={(value) => setCountry(value)}
                >
                  {/* Map through countries array to create Options */}
                  {countries.map((country) => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* Additional address input fields */}
              <Form.Item label="Street Address">
                <Input />
              </Form.Item>
              <Form.Item label="Town/City">
                <Input />
              </Form.Item>
              <Form.Item label="State/County">
                <Input />
              </Form.Item>
              {/* Button to trigger the buy process */}
              <Form.Item>
                <Button type="primary" size="large" onClick={handleBuy} block>
                  Buy Now
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {/* Right column displaying checked-out items */}
          <Col xs={24} sm={12}>
            {/* Display checked-out items using the CheckoutSummary component */}
            <CheckoutSummary checkedOutItems={checkedOutItems} />
          </Col>
        </Row>
      </div>

      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "20px 60px",
          height: "300px",
          width: "100%",
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
          {console.log('check-out', checkedOutItems)}
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px", display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'white' }}>Quick Links</h3>
              <a href="#" style={{ color: 'white' }}>Home</a>
              <a href="#" style={{ color: 'white' }}>About Us</a>
              <a href="#" style={{ color: 'white' }}>Courses</a>
              <a href="#" style={{ color: 'white' }}>Contact Us</a>
              <a href="#" style={{ color: 'white' }}>Terms and Conditions</a>
              <a href="#" style={{ color: 'white' }}>Privacy Policy</a>
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

// Export the CheckoutForm component
export default CheckoutForm;
