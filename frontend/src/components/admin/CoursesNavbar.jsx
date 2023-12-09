import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { CaretDownFill } from "react-bootstrap-icons";
import axios from "axios";
import "./CoursesNavbar.css";

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

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>Courses</Dropdown.Toggle>
          <Dropdown.Menu>
            {firstThreeCourses.map((course) => (
              <Dropdown.Item key={course.id}>
                {renderCourseDropdown(course)}
              </Dropdown.Item>
            ))}
            <Dropdown.Item>
              <Dropdown overlay={getDropdownContent(otherCourses)}>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Other Courses <CaretDownFill />
                </a>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );

  function renderCourseDropdown(course) {
    return (
      <Dropdown overlay={getDropdownContent([course])}>
        <a href="/" onClick={(e) => e.preventDefault()}>
          {course.courseName} <CaretDownFill />
        </a>
      </Dropdown>
    );
  }

  function getDropdownContent(courses) {
    return (
      <div className="CoursesNavbar">
        <Dropdown.Menu>
          {courses.map((course) => (
            <Dropdown.Item key={course.id}>
              {isJSON(course.courseCategories) ? (
                JSON.parse(course.courseCategories).map((category) => (
                  <Dropdown.Item key={category.id}>
                    {category.categoryName}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <Dropdown.Menu>
                        {category.subcategories.map((subcategory) => (
                          <Dropdown.Item key={subcategory.id}>
                            {subcategory.subcategoryName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    )}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>{course.courseCategories}</Dropdown.Item>
              )}

              {isJSON(course.courseSubCategories) ? (
                JSON.parse(course.courseSubCategories).map((subCategory) => (
                  <Dropdown.Item key={subCategory.id}>
                    {subCategory.subcategoryName}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>{course.courseSubCategories}</Dropdown.Item>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </div>
    );
  }

  function isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default CoursesNavbar;
