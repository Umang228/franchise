import React from 'react'
import Navbar from './admin/Navbar'
import CoursesNavbar from './admin/CoursesNavbar'
import { Row, Col } from "antd";
import { SiSemanticscholar } from "react-icons/si";
import { SiGooglescholar } from "react-icons/si";
import { FaRegHandshake } from "react-icons/fa";
import { GiRunningNinja } from "react-icons/gi";
import { LuNetwork } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import { MdOutlineLeaderboard } from "react-icons/md";
const AboutUs = () => {
  const images = [
    'images/edu.jpg']

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Navbar />
      {/* <CoursesNavbar /> */}
      <div className='aboutUs'>
        <div className='aboutLeft'>
          <h4>
            ABOUT US
          </h4>
          <h3 style={{ fontSize: '23px', fontWeight: '600' }}>
            Other than enlightlening
            <br />We Provide a path to <br />
            Success
          </h3>
          <h3 style={{ fontSize: '20px', color: 'darkgray', fontWeight: '300' }}>
            त्याग दो सब ख्वाहिशें  कुछ अलग करने के लिए
            <br />
            “राम” ने  बहुत कुछ  खोया “श्री राम” बनने के लिए
          </h3>
          <div className='bttn'>
            Get Started
          </div>
        </div>
        <div className='aboutRight'>
          <img src="https://air1ca.com/wp-content/uploads/2020/08/about_our_vision.jpg" alt="" width={400} />
        </div>
      </div>
      <div className='aboutDown'>
        <h3 style={{ fontWeight: '600', textAlign: 'center', marginTop: '30px' }}>
          Our Story
        </h3>
        <h3 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
          History is not only created by swords and wars,It can also be created by the pen <br />
          as they say, “The pen is mightier than the sword.”
        </h3>
        <div className="story" style={{ marginBottom: '60px' }}>
          <div className="storyLeft">
            <img src="https://air1ca.com/wp-content/uploads/2020/08/about_our_vision.jpg" alt="" width={450} />
          </div>
          <div className="storyRight" style={{ width: '500px' }}>
            <p>
              CA Atul Agarwal &amp; CA Ajay Agarwal both emerged as the topper of CA Final, creating a history of ICAI in May 2018 &amp; May 2019 respectively at the age of 21. They were also the rank holders in CA Inter &amp; CA Foundation.
            </p>
            <p>
              All India Rank 1 CA Atul is also the only candidate in the history of ICAI to score the highest ever marks (83) in Audit paper. Being a Gold Medalist in Audit &amp; DT, he scored 618/800 marks (77. 25%) in CA Final Exams.
            </p>
            <p>
              All India Rank 1 CA Atul is also the only candidate in the history of ICAI to score the highest ever marks (83) in Audit paper. Being a Gold Medalist in Audit &amp; DT, he scored 618/800 marks (77. 25%) in CA Final Exams.
            </p>
            <p>
              All India Rank 1 CA Atul is also the only candidate in the history of ICAI to score the highest ever marks (83) in Audit paper. Being a Gold Medalist in Audit &amp; DT, he scored 618/800 marks (77. 25%) in CA Final Exams.
            </p>
            <p>
              <b>To get a rank in CA Exams – ICAI Material, Consistent Revision &amp; Mock Test are key to success.</b>
            </p>
          </div>
        </div>
        <div className='vision' style={{ marginBottom: '60px' }}>
          <div className="visionRight" style={{ width: '500px' }}>
            <h3 style={{ fontWeight: '600' }}>Our <span style={{ color: 'goldenrod' }}>Vision</span></h3>
            We started AIR1CA with a vision in effectively engaging students, ensuring their learning, and shaping their development. We believe in providing real value to our students with no  false guidance and show them the sure path to success. We want to revolutionize the existing ecosystem in the CA Coaching Industry for teaching students.
          </div>
          <div className="visionLeft">
            <img src="https://air1ca.com/wp-content/uploads/2020/08/about_our_vision.jpg" alt="" width={450} />
          </div>

        </div>
        <div className='vision' style={{ marginBottom: '60px' }}>
          <div className="visionRight" style={{ width: '500px' }}>
            <h3 style={{ fontWeight: '600' }}><span style={{ color: 'goldenrod' }}>Our</span> Mission</h3>
            <p>
              Our mission is to get 100% results in CA Exams. We want that the deserving candidate does  not fail due to wrong guidance &amp; wrong coaching.
            </p>
            <p>
              AIR1CA’s mission is to create and nurture a team of successful students who can be recognized as a swiss knife in the rapidly growing CA ecosystem. We want us to be identified as an innovative leader in the world of CA by enlightening our students which revolutionizes the way they study and therefore help them to stay ahead of their competition.
            </p>
          </div>
          <div className="visionLeft">
            <img src="	https://air1ca.com/wp-content/uploads/2020/08/our_mission_img.jpg" alt="" width={450} />
          </div>

        </div>
        <div className="vision" style={{marginBottom:'60px',display:'flex',flexDirection:'column'}}>
          <h1 style={{textAlign:'center'}}> Our <span style={{color:'goldenrod',textDecoration:'underline'}}>Values</span> </h1>
          <p style={{textAlign:'center',marginBottom:'60px'}}>
            We empower our students with our expertise
            <br />
            We believe in giving conceptual plus exam oriented knowledge, so that students can perform well in both practical life &amp; exams.
            <br />
            We want to enlighten our students with integrity and we choose our thoughts and actions based on our values rather than personal gain.
            </p>
          <div className="action" style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',}}>
              <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <SiSemanticscholar style={{color:'goldenrod',width:'300px',fontSize:'164px'}}/>
                 <h3 style={{textAlign:'center'}}>Student Success</h3>
                  <p style={{textAlign:'center',marginTop:'20px',width:'300px'}}>
                  Making our student successful is #1 on our priority list nothing else is more important for us than this.
                  </p>
                </div>
                <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <SiSololearn style={{color:'goldenrod',width:'300px',fontSize:'164px',position:'relative',top:'-15px'}}/>
                 <h3 style={{textAlign:'center'}}>Continuous Learning</h3>
                  <p style={{textAlign:'center',marginTop:'20px',width:'300px'}}>
                  Continuous and insatiable hunger for learning will make us and our students stay ahead of the competition.
                  </p>
                </div>
                <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <FaRegHandshake style={{color:'goldenrod',width:'300px',fontSize:'164px'}}/>
                 <h3 style={{textAlign:'center'}}>Trust & Accountability</h3>
                  <p style={{textAlign:'center',marginTop:'20px',width:'300px'}}>
                  Trust is the glue that holds us all together and we also hold ourselves accountable for our actions and the associated results.
                  </p>
                </div>
                <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <GiRunningNinja style={{color:'goldenrod',width:'300px',fontSize:'164px'}}/>
                 <h3 style={{textAlign:'center'}}>Smart Study</h3>
                  <p style={{textAlign:'center',marginTop:'20px',width:'300px'}}>
                  Only hard work is not sufficient to succeed. We gotta do it with smartness. We believe in the formula of reading 1 book 10 times instead of 10 books 1 time.
                  </p>
                </div>
                <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <LuNetwork style={{color:'goldenrod',width:'300px',fontSize:'164px'}}/>
                 <h3 style={{textAlign:'center'}}>Communication</h3>
                  <p style={{textAlign:'center',marginTop:'20px',width:'300px'}}>
                  We value and emphasize communication as we think it is the key to all the problems and it also helps us understand ourselves, our students..</p>
                </div>
                <div style={{width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <MdOutlineLeaderboard style={{color:'goldenrod',width:'300px',fontSize:'164px'}}/>
                 <h3 style={{textAlign:'center'}}>Leadership</h3>
                  <p style={{textAlign:'center',marginTop:'20px'}}>
                  We believe in leadership as it is the art of getting someone else to do something you want done because he wants to do it.
                  </p>
                </div>
                
          </div>
        </div>
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
  )
}

export default AboutUs
