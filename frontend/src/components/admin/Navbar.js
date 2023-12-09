import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { MdShoppingCart } from "react-icons/md";
const Navbar = () => {
  return (
    <div style={{ height: '90px', backgroundColor: '#fff', display: 'flex', alignItems: 'center',justifyContent:'space-between', marginTop: '-10px',position:'sticky',top:'0',zIndex:'20000',boxShadow:'0.5px 0.60px 3px gray' }}>
      <div>
        {/* Logo Section (Left) */}
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '60px' }}>
        <img src="/images/header_logo.png" alt="Logo" width={130}/>
        </div>
      </div>

      <div>
        {/* User Actions (Right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',fontSize:'18px',marginRight:'28px' }} className='topMenu'>
        <li key="home">
          <a href="/homepage" style={{ color: "#000",fontSize:'15px'  }}>
         Home
          </a>
        </li>
        <li key="about">
          <a href="/about" style={{ color: "#000",fontSize:'15px'  }}>
        About Us
          </a>
        </li>
        <li key="contact">
          <a href="/contact" style={{ color: "#000",fontSize:'15px'  }}>
         Contact Us
          </a>
        </li>
        <li key="contact">
          <a href="/contact" style={{ color: "#000",fontSize:'15px'  }}>
         Products
          </a>
        </li>
        <li>
        <a href="#" style={{ color: "#fff",fontSize:'15px',backgroundColor:'#000',padding:'13px',borderRadius:'13px',display:'flex',alignItems:'center',justifyContent:'space-around',width:'90px'}}>
        <MdShoppingCart />  Cart
            </a>
        </li>
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
