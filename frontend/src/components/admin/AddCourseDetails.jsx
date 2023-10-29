import React from 'react'
import SideBar from "./Sidebar";
const AddCourseDetails = () => {
  return (
    <div>
    <SideBar/>
    <div className="add-product-form">
     <h2>More Details</h2>
    <form>
        <label style={{margin:'13px'}}>Course Title</label>
        {/* <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          style={{width:'500px',borderRadius:'13px',margin:'13px',padding:'13px',border:'2px solid #eee'}}
          placeholder="Enter your course title"
          required
        /> */}
        <div>
        <button type="submit" className="btn-10">Next</button>
      </div>
      </form>
  </div>
</div>
  )
}

export default AddCourseDetails