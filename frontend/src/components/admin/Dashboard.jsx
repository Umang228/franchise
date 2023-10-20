import React from 'react';
import '../style/dashboard.css'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode'; 
import axios from 'axios';
function Dashboard() {
// const switchMode = document.getElementById('switch-mode');

// switchMode.addEventListener('change', function () {
// 	if(this.checked) {
// 		document.body.classList.add('dark');
// 	} else {
// 		document.body.classList.remove('dark');
// 	}
// })
const [cookies] = useCookies(['token']);
let userName = null;

// If token exists, decode it to get user information
if (cookies.token) {
  const decodedToken = jwt_decode(cookies.token);
  userName = decodedToken.user?.name;
}

const handleLogout = async () => {
  try {
   
    await axios.post('http://localhost:8081/logout');
    // Clear the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.replace('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


  return (
	<>
	<Sidebar/>
	    <section id="content">
      {/* NAVBAR */}
      <nav>
        <i className='bx bx-menu'></i>
        <form action="#">
          <div className="form-input">
            <input type="search" placeholder="Search..." />
            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
          </div>
        </form>
        <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode"></label>
        <a href="#" className="notification">
          <i className='bx bxs-bell'></i>
          <span className="num">8</span>
        </a>
        <a href="#" className="profile">
          <img src="img/people.png" alt="User Profile" />
        </a>
        <div>
        {userName ? (
          <button onClick={handleLogout} className="btn-1">Logout</button>
        ) : (
          <>
            <Link to="/">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
      </nav>
      {/* NAVBAR */}

      {/* MAIN */}
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li><i className='bx bx-chevron-right'></i></li>
              <li>
                <a className="active" href="#">Home</a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className='bx bxs-cloud-download'></i>
            <span className="text">Wallet Balance : $10</span>
          </a>
        </div>

        <ul className="box-info">
          <li>
            <i className='bx bxs-calendar-check'></i>
            <span className="text">
              <h3>1020</h3>
              <p>New Order</p>
            </span>
          </li>
          <li>
            <i className='bx bxs-group'></i>
            <span className="text">
              <h3>2834</h3>
              <p>Visitors</p>
            </span>
          </li>
          <li>
            <i className='bx bxs-dollar-circle'></i>
            <span className="text">
              <h3>$2543</h3>
              <p>Total Sales</p>
            </span>
          </li>
        </ul>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
              <i className='bx bx-search'></i>
              <i className='bx bx-filter'></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date Order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status process">Process</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="todo">
            <div className="head">
              <h3>Todos</h3>
              <i className='bx bx-plus'></i>
              <i className='bx bx-filter'></i>
            </div>
            <ul className="todo-list">
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="not-completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="not-completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* MAIN */}
    </section>
	</>
  );
}

export default Dashboard;
