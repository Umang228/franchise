import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from 'react-router-dom'
import SideBar from './Sidebar';
const Users = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/users');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenConfirmationDialog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/admin/delete-user/${id}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
    console.log(`Delete user with ID ${id}`);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Add this function
  const handleEditClick = (userId) => {
    // Implement the logic for handling the edit click
    console.log(`Edit user with ID ${userId}`);
    // You can navigate to the edit page or implement your edit logic here
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="prod">
      <SideBar/>
      <div className="child-prod">
        <div className="topBar">
          <h1>Users</h1>
          <button className='btn-10' onClick={() => navigate(`/admin/users/add`)}>+ Add User</button>
        </div>
        <TextField
          label="Search Users"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          className='searchField'
          style={{ margin: '10px'}}
        />
        <div style={{ height: 500, width: '93%', marginLeft: '42px' }}>
          <DataGrid
            rows={filteredUsers}
            columns={[
              { field: 'name', headerName: 'Name', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
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

export default Users;
