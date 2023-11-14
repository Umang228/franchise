import React from 'react';
import Navbar from './admin/Navbar';
import CoursesNavbar from './admin/CoursesNavbar';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './home.css'
const HomePage = () => {
  const prevArrow = <Button style={{ position: 'absolute', top: '50%', left: '10px',color:'#0c0c0c' }} icon={<LeftOutlined />} />;
  const nextArrow = <Button style={{ position: 'absolute', top: '50%', right: '10px',color:'#0c0c0c' }} icon={<RightOutlined />} />;
  const images =[
    'images/bannerImg.jpg',
    'images/AllRankersBanner.jpg'
  ]
  return (
    <div>
      <Navbar />
      <CoursesNavbar />

        <Carousel showArrows={true} className="slider" autoplay>
            {images.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`${index}`} width={window.innerWidth} height={430}/>
              </div>
            ))}
          </Carousel>
    </div>
  );
};

export default HomePage;
