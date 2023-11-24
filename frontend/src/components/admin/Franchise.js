import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Franchise = () => {
  const navigate = useNavigate();

  const [franchises, setFranchises] = useState([]);
  const [searchText, setSearchText] = useState('');

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

  useEffect(() => {
    fetchFranchises();
  }, []);

  const handleOpenConfirmationDialog = (id) => {
    // Implement the logic to open the confirmation dialog
    // You need to define the state and functions for handling confirmation dialog in the Franchise component
    console.log(`Open confirmation dialog for franchise with ID: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Add this function
  const handleEditClick = (franchiseId) => {
    // Implement the logic for handling the edit click
    navigate(`/admin/franchise/edit/${franchiseId}`)
    console.log(`Edit franchise with ID ${franchiseId}`);
    // You can navigate to the edit page or implement your edit logic here
  };

  const filteredFranchises = franchises.filter(
    (franchise) =>
      franchise.name.toLowerCase().includes(searchText.toLowerCase()) ||
      franchise.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">
        <div className="topBar">
          <h1>All Franchise</h1>
          <button className='btn-10' onClick={() => navigate(`/admin/franchise/add`)}>+ Add Franchise</button>
        </div>
        <TextField
          label="Search Franchises"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          className='searchField'
          style={{ margin: '10px'}}
        />
        <div style={{ height: 500, width: '93%', marginLeft: '42px' }}>
          <DataGrid
            rows={filteredFranchises}
            columns={[
              { field: 'id', headerName: 'ID', flex: 1 },
              { field: 'name', headerName: 'Name', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'phone_number', headerName: 'Phone Number', flex: 1 },
              { field: 'gst_number', headerName: 'GST Number', flex: 1 },
              { field: 'franchise_type', headerName: 'Franchise Type', flex: 1 },
              { field: 'mode_of_payment', headerName: 'Mode of Payment', flex: 1 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 120,
                renderCell: (params) => (
                  <div>
                    <button
                      onClick={() => handleEditClick(params.row.id)}
                      className='edit-button'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenConfirmationDialog(params.row.id)}
                      className='delete-button'
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Franchise;
