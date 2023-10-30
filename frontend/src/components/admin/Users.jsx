import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './Sidebar';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch user data from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/users'); // Replace with the correct API endpoint for fetching users
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="prod">
      <SideBar />
      <div className="child-prod">
        <h1 className="heading1">Users</h1>
        <table className="utable">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="row">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* Add more table data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
