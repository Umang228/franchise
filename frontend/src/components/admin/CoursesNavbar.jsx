import React, { useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import axios from "axios";

const CoursesNavbar = () => {
  const [courses, setCourses] = useState([]);
  const [firstThreeCourses, setFirstThreeCourses] = useState([]);
  const [otherCourses, setOtherCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/courses")
      .then((response) => {
        setCourses(response.data);
        setFirstThreeCourses(response.data.slice(0, 3));
        setOtherCourses(response.data.slice(3));
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const navbarStyle = {
    backgroundColor: "#0C0C0C",
    color: "white",
    border: "none",
    height: "75px",
    display: "flex",
    justifyContent: "center", // Align items horizontally to the center
    alignItems: "center", // Align items vertically to the center
  };

  const menuStyle = {
    display: "flex",
    backgroundColor: "#0C0C0C",
    color: "#fff",
    border: "none",
  };

  const dropdownIconStyle = {
    fontSize: "12px",
  };

  return (
    <div className="CoursesNavbar" style={navbarStyle}>
      <Menu mode="horizontal" style={menuStyle}>
        <Menu.Item key="home">
          <a href="/homepage" style={{ color: "#fff" }}>
            Home
          </a>
        </Menu.Item>
        <Menu.Item key="about">
          <a href="/about" style={{ color: "#fff" }}>
            About Us
          </a>
        </Menu.Item>
        <Menu.Item key="contact">
          <a href="/contact" style={{ color: "#fff" }}>
            Contact Us
          </a>
        </Menu.Item>
        <Menu.SubMenu key="courses" title="Courses">
          {firstThreeCourses.map((course) => (
            <Menu.Item key={course.id}>
              {renderCourseDropdown(course)}
            </Menu.Item>
          ))}
          <Menu.Item key="otherCourses">
            <Dropdown overlay={getDropdownContent(otherCourses)}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  color:'#0c0c0c'
                }}
              >
                Other Courses <CaretDownFilled style={dropdownIconStyle} />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );

  function renderCourseDropdown(course) {
    return (
      <Dropdown overlay={getDropdownContent([course])}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            color: "#0c0c0c",
            width: "100%",
            height: "100%", // Adjust the width as needed
            display: "flex",
            alignItems: "center",
          }}
        >
          {course.courseName} <CaretDownFilled style={dropdownIconStyle} />
        </a>
      </Dropdown>
    );
  }

  function getDropdownContent(courses) {
    return (
      <Menu>
        {courses.map((course) => (
          <Menu.Item key={course.id}>
            {course.categories && course.categories.length > 0 ? (
              course.categories.map((category) => (
                <Menu.Item key={category.id}>
                  {category.categoryName}
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <Menu>
                        {category.subcategories.map((subcategory) => (
                          <Menu.Item key={subcategory.id}>
                            {subcategory.subcategoryName}
                          </Menu.Item>
                        ))}
                      </Menu>
                    )}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item disabled>No categories found</Menu.Item>
            )}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
};

export default CoursesNavbar;
