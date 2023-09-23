import './App.css';
import Authentication from './components/Authentication';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminFranchise from './components/admin/Franchise';
import AdminProducts from './components/admin/Products';
import AdminOrders from './components/admin/Orders';
import AdminAddProducts from './components/admin/AddProducts';
import AdminEditProducts from './components/admin/EditProducts';
import AdminAddFranchise from './components/admin/AddFranchise';
import AdminSelectProducts from './components/admin/SelectProducts';
import AdminEditFranchise from './components/admin/EditFranchise';
import FranchiseDashboard from './components/franchise/FranchiseDashboard';
import FranchiseProducts from './components/franchise/Products';
import FranchiseOrder from './components/franchise/Order';
import FranchiseStudent from './components/franchise/Student';
import UserDashboard from './components/user/UserDashboard';
import Navbar from './components/Navbar';

 function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Authentication allowedRoles={[]}><LoginPage /></Authentication>} />
      <Route path="/register" element={<Authentication allowedRoles={[]}><RegisterPage /></Authentication>} />

      {/* admin */}
      <Route path="/admin/dashboard" element={<Authentication allowedRoles={['admin']}><AdminDashboard /></Authentication>} />
      <Route path="/admin/franchise" element={<Authentication allowedRoles={['admin']}><AdminFranchise /></Authentication>} />
      <Route path="/admin/products" element={<Authentication allowedRoles={['admin']}><AdminProducts /></Authentication>} />
      <Route path="/admin/orders" element={<Authentication allowedRoles={['admin']}><AdminOrders /></Authentication>} />
      <Route path="/admin/products/add" element={<Authentication allowedRoles={['admin']}><AdminAddProducts /></Authentication>} />
      <Route path="/admin/products/edit/:id" element={<Authentication allowedRoles={['admin']}><AdminEditProducts /></Authentication>} />
      <Route path="/admin/franchise/add" element={<Authentication allowedRoles={['admin']}><AdminAddFranchise /></Authentication>} />
      <Route path="/admin/franchise/select" element={<Authentication allowedRoles={['admin']}><AdminSelectProducts /></Authentication>} />
      <Route path="/admin/franchise/edit/:id" element={<Authentication allowedRoles={['admin']}><AdminEditFranchise /></Authentication>} />


      {/* franchise */}
      <Route path="/franchise/dashboard" element={<Authentication allowedRoles={['franchise']}><FranchiseDashboard /></Authentication>} />
        <Route path="/franchise/products" element={<Authentication allowedRoles={['franchise']}><FranchiseProducts /></Authentication>} />
        <Route path="/franchise/orders" element={<Authentication allowedRoles={['franchise']}><FranchiseOrder /></Authentication>} />
        <Route path="/franchise/students" element={<Authentication allowedRoles={['franchise']}><FranchiseStudent /></Authentication>} />

        {/* user */}
        <Route path="/user/dashboard" element={<Authentication allowedRoles={['user']}><UserDashboard /></Authentication>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
