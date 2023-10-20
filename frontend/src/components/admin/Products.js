import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../style/prod.css'
import axios from 'axios';
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import {AiOutlineUsergroupDelete} from 'react-icons/ai'
import {AiOutlineBook} from 'react-icons/ai'
import {FcBookmark} from 'react-icons/fc'



export default function Products() {
  const [products, setProducts] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const[search,setSearch]=useState('');
  const navigate = useNavigate();
  // pagination
  const[currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length/recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);


  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/products');
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



  // Function to open the confirmation dialog for deletion
  const handleOpenConfirmationDialog = (id) => {
    setDeleteProductId(id);
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setDeleteProductId(null);
    setShowConfirmationDialog(false);
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    if (deleteProductId) {
      try {
        console.log(`Deleting product with ID: ${deleteProductId}`);

        const response = await axios.delete(`http://localhost:8081/admin/products/${deleteProductId}`);
        console.log('Delete response:', response);

        if (response.status === 200) {
          // Update the state of the products array
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deleteProductId));
          console.log('Product deleted successfully');
          setShowSuccessMessage(true);

          // Close the confirmation dialog
          handleCloseConfirmationDialog();

          // Hide the success message after 3 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        } else {
          console.log('Delete request did not return a success status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
 

  return (
    <div className='prod'>
      <Sidebar />
    <div className="child-prod">
    <h1 className='heading1'>Products</h1>
    <form>
        <input type="text" placeholder="Search here" onChange={(e)=>setSearch(e.target.value)} className='searchable'/>
      </form>
      <table class='utable'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Faculty Name</th>
            <th>Course</th>
            <th>Subject</th>
            <th>Delivery Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.filter((product)=>{
            return search.toLowerCase() === '' ? product : product.productName.toLowerCase().includes(search);
          }).map((product) => (
            <tr key={product.id} className='row'>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td><AiOutlineUsergroupDelete className='facu'/> {product.facultyName}</td>
              <td><AiOutlineBook className='course'/> {product.course}</td>
              <td className='subject'><FcBookmark/>{product.subject}</td>
              <td>{product.deliveryType}</td>
              <td className='action'>
                <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className='edit'><AiFillEdit/> Edit</button>
                <button onClick={() => handleOpenConfirmationDialog(product.id)} className='delete'><AiFillDelete/> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className='nv'>
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

      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this product?</p>
          <button onClick={handleCloseConfirmationDialog}>Cancel</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          Product deleted successfully.
        </div>
      )}
    </div>


    </div>
  );
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
