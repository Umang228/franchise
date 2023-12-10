import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, List, Typography, Empty, Space } from "antd";
import Navbar from "./admin/Navbar";
import { Row, Col } from "antd";
import { ShoppingCartOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        // Retrieve cart items from local storage
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleCheckout = () => {
        // Add your logic for handling the checkout process
        // For now, let's just clear the cart
        const selectedProduct = {
            id: cartItems[1].id,
            name: cartItems[1].productName,
            variants: cartItems[1].variants,
            image:cartItems[1].image,
            description:cartItems[1].description,
            price: cartItems[1].price,
          };
          if (selectedProduct) {
           const updatedProd = JSON.stringify(selectedProduct)
            console.log('prod',updatedProd);
          localStorage.setItem("checkedout",updatedProd);
          }
        // Navigate to the checkout page
        history("/checkout");
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                <Title level={2}>
                    <div>
                        <ShoppingCartOutlined style={{ marginRight: "8px" }} />
                        Shopping Cart
                    </div>
                </Title>
                {cartItems.length === 0 ? (
                    <Empty description="Your cart is empty" />
                ) : (
                    <>
                        <List
                            itemLayout="horizontal"
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`${item.price ? `Rs ${item.price}` : cartItems[1].description}`}
                                    />
                                </List.Item>
                            )}
                            style={{ marginTop: '60px', backgroundColor: '#fff', padding: '80px', boxShadow: '1px 1px 5px lightgray' }}
                        />
                        <div style={{ marginTop: "20px", textAlign: "right" }}>
                            <img src={cartItems[1].image} alt="" width={200} style={{ marginBottom: '20px', position: 'relative', top: '-288px', left: '-10px' }} />
                            <Title level={4} style={{ position: 'relative', top: '-200px', left: '-30px' }}>
                                Total: Rs{cartItems[1].price}
                            </Title>
                            <Space style={{ position: 'relative', top: '-180px' }}>
                                <Button type="primary" icon={<CheckOutlined />} onClick={handleCheckout}>
                                    Checkout
                                </Button>
                                <Link to="/">
                                    <Button icon={<ArrowLeftOutlined />}>Continue Shopping</Button>
                                </Link>
                            </Space>
                        </div>


                    </>
                )}
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

export default Cart;
