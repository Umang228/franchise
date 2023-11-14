import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  return (
    <Row align="middle" style={{ height: '90px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', marginTop: '-10px' }}>
      <Col span={8}>
        {/* Logo Section (Left) */}
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
        <img src="/images/header_logo.png" alt="Logo" width={130}/>
        </div>
      </Col>
      <Col span={8}>
        {/* Search Box (Middle) */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: '-50px' }}>
          <Input placeholder="Search..." style={{ width: '100%' }} />
          <Button type="text" icon={<SearchOutlined />} style={{ background: '#000', color: '#fff',position:'relative',left:'-17px' }} />
        </div>
      </Col>
      <Col span={8}>
        {/* User Actions (Right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button type="text" icon={<LoginOutlined />}>
            Login
          </Button>
          <Button type="text" icon={<UserOutlined />}>
            Register
          </Button>
          <Button type="text" icon={<ShoppingCartOutlined />}>
            Cart
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
