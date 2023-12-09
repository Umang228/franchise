import React, { useState } from 'react';
import Navbar from './admin/Navbar';
import CoursesNavbar from "./admin/CoursesNavbar";
import { Row, Col, Modal, Form, Input, Button } from "antd";
import { useSpring, animated } from 'react-spring';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function ContactUs() {
  // Animation for the form container
  const formContainerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
    toggleFormVisibility(); // Close the form after submission
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {/* Navbar components */}
      <Navbar />
      {/* <CoursesNavbar /> */}

      {/* Contact Us container */}
      <div className="contact-us-container" style={{ marginBottom: '45px' }}>

        {/* Cards Section */}
        <div style={{ background: 'linear-gradient(to right, #0083B0, #00B4DB)', height: '400px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ color: 'white', paddingTop: '150px', fontSize: '35px' }}>Contact Us</h1>
        </div>

        <div className="cards-section" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
          {/* Card 1 */}
          <div className="card" style={{ backgroundColor: '#4158d0', margin: '23px', padding: '43px', color: '#fff', textAlign: 'center', maxWidth: '350px' }}>
            <i aria-hidden="true" class="fas fa-phone-square-alt" style={{ fontSize: '43px' }}></i>
            <h2 class="elementor-heading-title elementor-size-default" style={{ color: '#fff' }}>Call/Whatsapp:</h2>
            <div class="elementor-widget-wrap elementor-element-populated"><div class="elementor-element elementor-element-6928692 elementor-view-default elementor-widget elementor-widget-icon" data-id="6928692" data-element_type="widget" data-widget_type="icon.default"><div class="elementor-widget-container"><div class="elementor-icon-wrapper"><div class="elementor-icon"></div></div></div></div><div class="elementor-element elementor-element-125a976 elementor-widget elementor-widget-heading" data-id="125a976" data-element_type="widget" data-widget_type="heading.default"><div class="elementor-widget-container"></div></div><div class="elementor-element elementor-element-521988c elementor-widget elementor-widget-text-editor" data-id="521988c" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> For Classes/Test Series Order Related Enquiries:</div></div><div class="elementor-element elementor-element-a8ff28b elementor-widget elementor-widget-text-editor" data-id="a8ff28b" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> <a href="tel:+91 7742554277">7742554277 (Call or Whatsapp)</a></div></div><div class="elementor-element elementor-element-7827ee4 elementor-widget elementor-widget-text-editor" data-id="7827ee4" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> For Technical Support:</div></div><div class="elementor-element elementor-element-387c38a elementor-widget elementor-widget-text-editor" data-id="387c38a" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> <a href="tel:+91 9376554277">9376554277 (Call or Whatsapp)</a></div></div><div class="elementor-element elementor-element-c8795a8 elementor-widget elementor-widget-text-editor" data-id="c8795a8" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> For any other queries/doubts:</div></div><div class="elementor-element elementor-element-0772b7d elementor-widget elementor-widget-text-editor" data-id="0772b7d" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"> <a href="tel:+91 9024119090">9024119090 (Whatsapp)</a></div></div></div>
          </div>

          {/* Card 2 */}
          <div className="card" style={{ backgroundColor: 'rgb(43 43 43)', margin: '23px', padding: '43px', color: '#fff', textAlign: 'center', maxWidth: '350px' }}>
            <i aria-hidden="true" class="fas fa-fax" style={{ fontSize: '43px' }}></i>
            <h2 class="elementor-heading-title elementor-size-default" style={{ color: 'white' }}>Telegram Channel:</h2>
            <div class="elementor-widget-wrap elementor-element-populated"><div class="elementor-element elementor-element-d931f26 elementor-view-default elementor-widget elementor-widget-icon" data-id="d931f26" data-element_type="widget" data-widget_type="icon.default"><div class="elementor-widget-container"><div class="elementor-icon-wrapper"><div class="elementor-icon"> </div></div></div></div><div class="elementor-element elementor-element-2489ba5 elementor-widget elementor-widget-heading" data-id="2489ba5" data-element_type="widget" data-widget_type="heading.default"><div class="elementor-widget-container"></div></div><div class="elementor-element elementor-element-a39e4eb elementor-widget elementor-widget-text-editor" data-id="a39e4eb" data-element_type="widget" data-widget_type="text-editor.default"><div class="elementor-widget-container"><p><a href="https://telegram.me/s/air1ca">https://telegram.me/s/air1ca</a></p></div></div></div>
          </div>

          {/* Card 3 */}
          <div className="card" style={{ backgroundColor: '#ffd700', margin: '23px', padding: '43px', maxWidth: '350px', color: '#fff', textAlign: 'center' }}>
            <i aria-hidden="true" class="fa-regular fa-envelope" style={{ fontSize: '43px', marginBottom: '10px' }}></i>
            <h2 style={{ color: '#fff' }}>Reach Out To Us</h2>
            <p style={{ color: '#fff' }}>Reach Out To Us By Filling a Simple Form</p>
            <button onClick={toggleFormVisibility}>Learn More</button>
          </div>
          <Modal
            title="Contact Form"
            visible={isFormVisible}
            onCancel={toggleFormVisibility}
            footer={null}
            width={400} // Set the width of the modal
          >
            <animated.div style={formContainerSpring}>
              <div className="form-container">
                <Form
                  {...layout}
                  name="contactForm"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    className="form-spacing"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                    className="form-spacing"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: 'Please input your message!' }]}
                    className="form-spacing"
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </animated.div>
          </Modal>

        </div>


      </div>

      {/* Contact Details Section */}
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
}

export default ContactUs;
