import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Card } from "antd";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
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
const navigate = useNavigate();
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
    <div style={{backgroundColor:'#fff'}}>
      {/* Navigation components */}
      <Navbar />
      {/* <CoursesNavbar /> */}

      {/* Image Carousel with welcome text */}
      <div style={{width:'100%',height:'500px'}}>
          <img src="https://air1ca.com/wp-content/themes/airca-child-theme/images/All-Rankers-banner.jpg" alt=""width={1300} height={550}/>
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
              width: 280,
              margin:'-5px',
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => alert(`Clicked on ${item.title}`)}
          >
            {item.icon}
            <Meta title={item.title} style={{ marginTop: "10px" }} />
          </Card>
        ))}
      </div>

      {/*  about us*/}
            
      <div className="about" style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
          <div className="text" style={{textAlign:'center',width:'600px'}}>
            <h2 style={{textAlign:'center',fontSize:'34px',fontWeight:'700'}}>
              About <span style={{color:'goldenrod',textDecoration:'underline'}}> Us
</span>
                          </h2>
            <p>
            CA Atul Agarwal &amp; CA Ajay Agarwal both emerged as the topper of CA Final, creating a history of ICAI in May 2018 &amp; May 2019 respectively at the age of 21. They were also the rank holders in CA Inter &amp; CA Foundation.
            </p>
            <p>
            All India Rank 1 CA Atul is also the only candidate in the history of ICAI to score the highest ever marks (83) in Audit paper. Being a Gold Medalist in Audit &amp; DT, he scored 618/800 marks (77. 25%) in CA Final Exams.
            </p>
            <p>
            All India Rank 1 CA Ajay topped the May 2019 CA Final with the highest marks in the history of ICAI in the last 70 years, following the lead of his brother CA Atul. He scored 650 marks (81.25%) in the CA Final being the gold medalist in 4 subjects Financial Reporting, Strategic Financial Management, DT and ISCA.
            </p>
          </div>
          <div className="image">
            <img src="https://air1ca.com/wp-content/uploads/2020/08/ajay.jpg" alt="" style={{borderTopLeftRadius:'4px solid yellow'}}/>
          </div>
      </div>

      {/* Top Products with Tabs */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{fontSize:'34px',fontWeight:'800'}}>Top <span style={{color:'goldenrod',textDecoration:'underline'}}> Products</span></h2>
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
                        src={product.image.split(',')[0]} // replace with the actual image URL in your data
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      {console.log("image is:- ", product.image.split(',')[0])}

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
                          href={`/admin/products/view/${product.id}`}
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
      <div style={{ textAlign: "center", margin: "30px 0", width: "100%", position: "relative" }}>
        {/* Mobile phone image */}


        {/* Overlayed reviews */}
        <div
          style={{
            width:'100%'
          }}
        >
          <Carousel autoplay style={{ width: "100%", height: "300px" }} dotPosition="bottom">
            {featureItems2.map((item, index) => (
              <Card
                key={index}
                style={{
                  width: "100%",
                  margin: "0 auto",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
              >
                <div style={{ backgroundColor: "" }}>
                  {item.icon} <span><Meta title={item.title} style={{ marginTop: "10px" }} /></span>
                </div>
                <p style={{ margin: '13px' }}>
                  {item.desc}
                </p>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Contact and Social Links */}
      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "20px 10px",
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

export default HomePage;
