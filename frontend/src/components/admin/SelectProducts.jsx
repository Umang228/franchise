import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../style/prod.css';
import axios from 'axios';
import '../style/prod.css'

export default function SelectProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

      // pagination
  const[currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length/recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleCheckboxChange = (productId) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8081/admin/select', {
        selectedProducts,
      });
      navigate('/admin/franchise');
      // Handle success or update state accordingly
      console.log('Selection saved successfully');
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };

   // Function to fetch product data from the backend
   const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/product');
      if (response.status === 200) {
        setProducts(response.data);
        
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='prod'>
      <Sidebar />
    <div className="child-prod">
    <h1 className='heading1'>Products</h1>

    <table class='utable'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Faculty Name</th>
            <th>Course</th>
            <th>Subject</th>
            <th>Delivery Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {records.map((product) => (
              <tr key={product.id} className='row'>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td> {product.facultyName}</td>
              <td> {product.course}</td>
              <td>{product.subject}</td>
              <td>{product.deliveryType}</td>
              <td className='action'>
              <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(product.id)}
                    checked={selectedProducts.includes(product.id)}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>

      <nav>
        <ul>
          <li>
            <a href="#0" onClick={prePage}>Prev</a>
          </li>
          {numbers.map((n,products)=>(
            <li className={`page-item ${currentPage === n ? 'active': ''}`} key={products}>
              <a href="#0" onClick={()=>changeCPage(n)}>{n}</a>
            </li>
          ))}
          <li>
            <a href="#0" onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>
      </div>
      </div>
    
  )
  //pagination
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
    }
    function changeCPage(id){
      setCurrentPage(id);
  
    }
    function nextPage(){
      if(currentPage !== npage){
        setCurrentPage(currentPage + 1)
      }
    }
}
