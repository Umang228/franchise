import React from 'react';

function Topbar() {
  return (
    <div className="topbar">
      <div className="search-box">
        <input type="text" placeholder="Search" />
      </div>
      <div className="icons">
        <div className="icon">
          <i className="fa fa-envelope"></i>
        </div>
        <div className="icon">
          <i className="fa fa-bell"></i>
        </div>
        <div className="profile-icon">
          <div className="profile">
            <img src="" alt="Profile" />
         
          <div className="dropdown">
            <ul>
              <li>My Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
