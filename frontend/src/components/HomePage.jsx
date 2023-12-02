import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Card } from "antd";
import { Carousel } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  GiftOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
  LockOutlined,
  RocketOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Tabs } from "antd";
import Navbar from "./admin/Navbar";
import CoursesNavbar from "./admin/CoursesNavbar";
import { Footer } from "antd/es/layout/layout";
import { Row, Col } from "antd";
// Destructuring components from Ant Design
const { Meta } = Card;
const { TabPane } = Tabs;

const HomePage = () => {
  // State variables
  const [animateText, setAnimateText] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [productTabs, setProductTabs] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    // Set a timeout to animate text after 1 second
    const timeoutId = setTimeout(() => {
      setAnimateText(true);
    }, 1000);

    // Fetch products data from the server
    axios
      .get("http://localhost:8081/admin/products")
      .then((response) => {
        const products = response.data;

        // Get unique course names for tabs
        const uniqueCourses = Array.from(
          new Set(products.map((product) => product.course))
        ).slice(-4);

        // Create tab names and set top products
        const tabNames = uniqueCourses.map((course, index) => ({
          key: index,
          tab: course,
        }));

        setProductTabs(tabNames);
        setTopProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId);
  }, []);

  // React Spring animation for text
  const textSpring = useSpring({
    opacity: animateText ? 1 : 0,
    transform: animateText ? "translateY(0)" : "translateY(20px)",
  });

  // Hardcoded image URLs for Carousel
  const images = [
    "https://www.investopedia.com/thmb/N-OFg2MCyywPGORRfb3LNAnspHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/OnlineCourses_Jacek-Kita-e2c9d834d3524d76ac28da76aec203ca.jpg",
    "https://tipa.in/wp-content/uploads/2021/05/Online-courses.jpg",
  ];

  // Hardcoded feature items
  const featureItems = [
    {
      title: "Exclusive Gifts",
      icon: (
        <GiftOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#FFD700" }}
        />
      ),
    },
    {
      title: "Best Deals",
      icon: (
        <DollarCircleOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#4CAF50" }}
        />
      ),
    },
    {
      title: "24/7 Support",
      icon: (
        <CustomerServiceOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#2196F3" }}
        />
      ),
    },
    {
      title: "Secure Ordering",
      icon: (
        <LockOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#FF5722" }}
        />
      ),
    },
    {
      title: "Fast Delivery",
      icon: (
        <RocketOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#E91E63" }}
        />
      ),
    },
  ];
  const featureItems2 = [
    {
      title: "Harsh",
      icon: (
        <UserOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#FFD700" }}
        />
      ),
      desc:'The lectures are best!! I am watching lectures continuously and its making me feel to learn more and more. The way of teaching concepts with examples is just awesome. I won’t ever forgot the gun and fire extinguisher example in PPE Topic And the Concept Book!! No words sir. It creates a picture of whole topic and makes me love FR more and more. Thank you so much sir!!'
    },
    {
      title: "Hardik",
      icon: (
        <UserOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#4CAF50" }}
        />
      ),
      desc:'The lectures are best!! I am watching lectures continuously and its making me feel to learn more and more. The way of teaching concepts with examples is just awesome. I won’t ever forgot the gun and fire extinguisher example in PPE Topic And the Concept Book!! No words sir. It creates a picture of whole topic and makes me love FR more and more. Thank you so much sir!!'
    },
    {
      title: "Tushar",
      icon: (
        <UserOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#2196F3" }}
        />
      ),
      desc:'The lectures are best!! I am watching lectures continuously and its making me feel to learn more and more. The way of teaching concepts with examples is just awesome. I won’t ever forgot the gun and fire extinguisher example in PPE Topic And the Concept Book!! No words sir. It creates a picture of whole topic and makes me love FR more and more. Thank you so much sir!!'
    },
    {
      title: "Krishna",
      icon: (
        <UserOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#FF5722" }}
        />
      ),
      desc:'The lectures are best!! I am watching lectures continuously and its making me feel to learn more and more. The way of teaching concepts with examples is just awesome. I won’t ever forgot the gun and fire extinguisher example in PPE Topic And the Concept Book!! No words sir. It creates a picture of whole topic and makes me love FR more and more. Thank you so much sir!!'
    },
    {
      title: "Abhishek",
      icon: (
        <UserOutlined
          style={{ fontSize: "36px", marginBottom: "8px", color: "#E91E63" }}
        />
      ),
      desc:'The lectures are best!! I am watching lectures continuously and its making me feel to learn more and more. The way of teaching concepts with examples is just awesome. I won’t ever forgot the gun and fire extinguisher example in PPE Topic And the Concept Book!! No words sir. It creates a picture of whole topic and makes me love FR more and more. Thank you so much sir!!'
    },
  ];

  
  // Event handler for tab change
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  // Render the component
  return (
    <div>
      {/* Navigation components */}
      <Navbar />
      <CoursesNavbar />

      {/* Image Carousel with welcome text */}
      <div>
        <Carousel
          showArrows={true}
          showThumbs={false}
          style={{ height: "50%" }}
        >
          {images.map((imageUrl, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <img
                src={imageUrl}
                alt={`${index}`}
                width={window.innerWidth}
                height={430}
              />
              <animated.div
                style={{
                  ...textSpring,
                  position: "absolute",
                  top: "46%",
                  right: "-22%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h1 style={{ margin: "0", fontSize: "30px", color: "#fff" }}>
                  Welcome to AIR1CA Career Institute [ACI]
                  <br /> The Best Career Institute
                </h1>
              </animated.div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Feature cards */}
      <div
        className="feature-cards"
        style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}
      >
        {featureItems.map((item, index) => (
          <Card
            key={index}
            style={{
              width: 270,
              margin: "20px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onClick={() => alert(`Clicked on ${item.title}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {item.icon}
            <Meta title={item.title} style={{ marginTop: "10px" }} />
          </Card>
        ))}
      </div>

      {/* Top Products with Tabs */}
      <div style={{ textAlign: "center" }}>
        <h2>Top Products based on Rank</h2>
        <Tabs
          centered
          activeKey={selectedTab.toString()}
          onChange={handleTabChange}
          tabBarStyle={{ justifyContent: "center" }}
        >
          {productTabs.map((tab, index) => (
            <TabPane key={index.toString()} tab={tab.tab}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "30px 0",
                }}
              >
                {topProducts
                  .filter((product) => product.course === tab.tab)
                  .map((product) => (
                    <Card
                      key={product.id}
                      style={{
                        width: 270,
                        margin: "20px",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src="/images/header_logo.png" // replace with the actual image URL in your data
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      {console.log("image ", product.image[0])}

                      {/* Product Name */}
                      <a>{product.productName}</a>
                      {/* Product Price */}
                      <p style={{ marginTop: "10px" }}>By {product.author}</p>
                      <p>{`Rs. ${product.price}`}</p>

                      {/* Social Links */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        {/* Add your social icons or links here */}
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ margin: "0 5px" }}
                        >
                          {/* Example social icon */}
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
                    </Card>
                  ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <div style={{ textAlign: "center", margin: "30px 0" ,width:'100%'}}>
        <h1>What Our Students Say</h1>
        <Carousel autoplay style={{ width: "100%",height:'300px' }} dotPosition="bottom">
          {featureItems2.map((item, index) => (
            <Card
              key={index}
              style={{
                width: "100%",
                height:'100%',
                margin: "20px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onClick={() => alert(`Clicked on ${item.title}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {item.icon}
              <Meta title={item.title} style={{ marginTop: "10px" }} />
              <p style={{margin:'13px'}}>
                {item.desc}
              </p>
            </Card>
          ))}
        </Carousel>
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
              <h3 style={{color:'white'}}>Call Us</h3>
              <a href="tel:7742554277"  style={{color:'white'}}>7742554277</a>
            </div>
            <div>
              <h3 style={{color:'white'}}>Email</h3>
              <a href="mailto:air1@gmail.com" style={{color:'white'}}>air1@gmail.com</a>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px",display:'flex',flexDirection:'column' }}>
              <h3  style={{color:'white'}}>Quick Links</h3>
              <a href="#" style={{color:'white'}}>Home</a>
              <a href="#" style={{color:'white'}}>About Us</a>
              <a href="#" style={{color:'white'}}>Courses</a>
              <a href="#" style={{color:'white'}}>Contact Us</a>
              <a href="#" style={{color:'white'}}>Terms and Conditions</a>
              <a href="#" style={{color:'white'}}>Privacy Policy</a>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{color:'white'}}>CA Classes</h3>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <h3  style={{color:'white'}}>Social Links</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 5px",color:'white' }}
                  
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

export default HomePage;
