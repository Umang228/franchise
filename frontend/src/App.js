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
import AdminEditSelectProducts from './components/admin/EditSelectProducts';
import AdminEditFranchise from './components/admin/EditFranchise';
import FranchiseDashboard from './components/franchise/FranchiseDashboard';
import FranchiseProducts from './components/franchise/Products';
import FranchiseOrder from './components/franchise/Order';
import FranchiseStudent from './components/franchise/Student';
import FranchiseSingleProduct from './components/franchise/SingleProduct';
import FranchiseStudentDetails from './components/franchise/StudentDetails';
import FranchiseOrderPlaced from './components/franchise/OrderPlaced';
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
      <Route path="/admin/franchise" element={<AdminFranchise />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/products/add" element={<AdminAddProducts />} />
      <Route path="/admin/products/edit/:id" element={<AdminEditProducts />} />
      <Route path="/admin/franchise/add" element={<AdminAddFranchise />} />
      <Route path="/admin/franchise/select" element={<AdminSelectProducts />} />
      <Route path="/admin/franchise/select/edit/:id" element={<AdminEditSelectProducts />} />
      <Route path="/admin/franchise/edit/:id" element={<AdminEditFranchise />} />
    


      {/* franchise */}
      <Route path="/franchise/dashboard" element={<Authentication allowedRoles={['franchise']}><FranchiseDashboard /></Authentication>} />
        <Route path="/franchise/products" element={<FranchiseProducts />} />
        <Route path="/franchise/orders" element={<FranchiseOrder />} />
        <Route path="/franchise/students" element={<FranchiseStudent />} />
        <Route path="/franchise/product/:id" element={<FranchiseSingleProduct/>} />
        <Route path="/franchise/product/:id" element={<FranchiseSingleProduct/>} />
        <Route path="/franchise/product/:id" element={<FranchiseSingleProduct/>} />
        <Route path="/franchise/student-details" element={<FranchiseStudentDetails />} />
      <Route path="/franchise/order-placed" element={<FranchiseOrderPlaced />} />

        {/* user */}
        <Route path="/user/dashboard" element={<Authentication allowedRoles={['user']}><UserDashboard /></Authentication>} />
        
      </Routes>

    </BrowserRouter>
  );
}
export default App;
