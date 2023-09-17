import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import {MdPayment} from 'react-icons/md'
import {AiTwotoneMail} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

export default function Franchise() {

  const [franchises, setFranchises] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteFranchiseId, setDeleteFranchiseId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const[search,setSearch]=useState('');
    // pagination
    const[currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = franchises.slice(firstIndex, lastIndex);
    const npage = Math.ceil(franchises.length/recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);



  // Function to fetch franchise data from the backend
  const fetchFranchises = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/franchise');
      if (response.status === 200) {
        setFranchises(response.data);
      }
    } catch (error) {
      console.error('Error fetching franchises:', error);
    }
  };

  // Call fetchFranchises when the component mounts
  useEffect(() => {
    fetchFranchises();
  }, []);

  // Function to open the confirmation dialog for deletion
  const handleOpenConfirmationDialog = (id) => {
    setDeleteFranchiseId(id);
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setDeleteFranchiseId(null);
    setShowConfirmationDialog(false);
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    if (deleteFranchiseId) {
      try {
        console.log(`Deleting franchise with ID: ${deleteFranchiseId}`);

        const response = await axios.delete(`http://localhost:8081/admin/franchise/${deleteFranchiseId}`);
        console.log('Delete response:', response);

        if (response.status === 200) {
          // Update the state of the franchises array
          setFranchises((prevFranchises) => prevFranchises.filter((franchise) => franchise.id !== deleteFranchiseId));
          console.log('Franchise deleted successfully');
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
        console.error('Error deleting franchise:', error);
      }
    }
  };

  return (
    <div className='prod'>
      <Sidebar />
      <div className="child-prod">
      <h1 className='heading1'>All Franchise</h1>
      <form>
        <input type="text" placeholder="Search here" onChange={(e)=>setSearch(e.target.value)}/>
      </form>
      <table className='utable'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>GST Number</th>
            <th>Franchise Type</th>
            <th>Mode of Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.filter((franchise)=>{
            return search.toLowerCase() === '' ? franchise : franchise.name.toLowerCase().includes(search);
          }).map((franchise) => (
            <tr key={franchise.id} className='row'>
              <td>{franchise.id}</td>
              <td>{franchise.name}</td>
              <td><AiTwotoneMail className='mail'/> {franchise.email}</td>
              <td>{franchise.phone_number}</td>
              <td>{franchise.gst_number}</td>
              <td>{franchise.franchise_type}</td>
              <td><MdPayment className='gold'/> {franchise.mode_of_payment}</td>
              <td className='action'>
                <button onClick={() => navigate(`/admin/franchise/edit/${franchise.id}`)} className='edit'><AiFillEdit/> Edit</button>
                <button onClick={() => handleOpenConfirmationDialog(franchise.id)} className='delete'><AiFillDelete/> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={prePage}>Prev</a>
          </li>
          {numbers.map((n,franchise)=>(
            <li className={`page-item ${currentPage === n ? 'active': ''}`} key={franchise}>
              <a href="#" onClick={()=>changeCPage(n)}>{n}</a>
            </li>
          ))}
          <li>
            <a href="#" onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>

      {/* Confirmation Dialog */}
      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this franchise?</p>
          <button onClick={handleCloseConfirmationDialog}>Cancel</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          Franchise deleted successfully.
        </div>
      )}
      </div>

    </div>
  );
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
