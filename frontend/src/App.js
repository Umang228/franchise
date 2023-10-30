import './App.css';
import Authentication from './components/Authentication';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/admin/Dashboard';
import AdminFranchise from './components/admin/Franchise';
import AdminProducts from './components/admin/Products';
import AdminOrders from './components/admin/Orders';
import AdminAddProducts from './components/admin/AddProducts';
import AdminEditProducts from './components/admin/EditProducts';
import AdminAddFranchise from './components/admin/AddFranchise';
import AdminSelectProducts from './components/admin/SelectProducts';
import AdminEditSelectProducts from './components/admin/EditSelectProducts';
import AdminEditFranchise from './components/admin/EditFranchise';
import Fdashboard from './components/franchise/Fdashboard';
import FranchiseProducts from './components/franchise/Products';
import FranchiseOrder from './components/franchise/Order';
import FranchiseStudent from './components/franchise/Student';
import FranchiseSingleProduct from './components/franchise/SingleProduct';
import FranchiseStudentDetails from './components/franchise/StudentDetails';
import FranchiseOrderPlaced from './components/franchise/OrderPlaced';
import UserDashboard from './components/user/UserDashboard';
import Navbar from './components/Navbar';
import AddCourse from './components/admin/AddCourse';
import AddCourseDetails from './components/admin/AddCourseDetails';
import Courses from './components/admin/Courses';
import UpdateCourse from './components/admin/UpdateCourse';
import Users from './components/admin/Users';
 function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Authentication allowedRoles={[]}><LoginPage /></Authentication>} />
      <Route path="/register" element={<Authentication allowedRoles={[]}><RegisterPage /></Authentication>} />

      {/* admin */}
      <Route path="/admin/dashboard" element={<Authentication allowedRoles={['admin']}><  Dashboard /></Authentication>} />
      <Route path="/admin/franchise" element={<AdminFranchise />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/products/add" element={<AdminAddProducts />} />
      <Route path="/admin/products/edit/:id" element={<AdminEditProducts />} />
      <Route path="/admin/franchise/add" element={<AdminAddFranchise />} />
      <Route path="/admin/franchise/select" element={<AdminSelectProducts />} />
      <Route path="/admin/franchise/select/edit/:id" element={<AdminEditSelectProducts />} />
      <Route path="/admin/franchise/edit/:id" element={<AdminEditFranchise />} />
      <Route path='/admin/courses/add' element={<AddCourse/>}/>
      <Route path="/admin/courses/show" element={<Courses />} />
      <Route path="/admin/courses/update/:id" element={<UpdateCourse/>} />
      <Route path="/admin/users" element={<Users/>} />


      {/* franchise */}
      <Route path="/franchise/dashboard" element={<Authentication allowedRoles={['franchise']}><Fdashboard /></Authentication>} />
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
