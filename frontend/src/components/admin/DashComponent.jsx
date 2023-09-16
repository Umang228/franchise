import React from 'react'

const DashComponent = () => {
  return (
    <div className='maincomp'>
      <div className="dashcomp">
        <div className="icon">
          <h3>
              Total Orders Placed
          </h3>
          <i className="fa-solid fa-truck"></i>
        </div>
        <div className="number">
          <h3>
            67
          </h3>
        </div>
      </div>
      <div className="dashcomp dashcomp2">
        <div className="icon i2">
          <h3>
              Pending Orders
          </h3>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="number spac1">
          <h3>
            67
          </h3>
        </div>
      </div>
      <div className="dashcomp dashcomp3" style={{borderBottom:"4px solid #f76c6c"}}>
        <div className="icon">
          <h3>
              Completed Orders
          </h3>
          <i className="fa-solid fa-bag-shopping" style={{color:"#f76c6c"}}></i>
        </div>
        <div className="number spac2">
          <h3>
            67
          </h3>
        </div>
      </div>
      <div className="dashcomp dashcomp4" style={{borderBottom:"4px solid #a64ac9"}}>
        <div className="icon">
          <h3>
              Total Users Today
          </h3>
          <i class="fa-solid fa-u" style={{color:"#a64ac9"}}></i>
        </div>
        <div className="number spac">
          <h3>
            67
          </h3>
        </div>
      </div>
    </div>
  )
}

export default DashComponent