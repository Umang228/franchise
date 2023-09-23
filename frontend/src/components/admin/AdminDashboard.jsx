import React from 'react';
import Sidebar from './Sidebar';
import '../style/dashboard.css'
import DashComponent from './DashComponent';
import LineChart from './LineChart';
import BarChart from './BarChart';



function AdminDashboard() {

    return (
        // <div className='dashboard'>
        //   <Sidebar />
        //   <div className="dashboard-child">
        //   <h1>Welcome to the Admin Dashboard</h1>
        //     <DashComponent/>
        //     <div className="charts">
        //     <div className="chart-1">
        //       <LineChart/>
        //     </div>
        //     <div className="chart-1">
        //       <BarChart/>
        //     </div>
        //     </div>
        //   </div>
        // </div>
        <div><h1>Welcome to admin dashboard</h1>
        <Sidebar /></div>
        
      );



}
 export default AdminDashboard;
