import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import {FaOpencart} from "react-icons/fa"
import {AiOutlineUserSwitch} from "react-icons/ai"
import {IoMdAddCircle} from "react-icons/io"
import {BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import {HiTemplate} from "react-icons/hi"
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../Header/SidebarMenu";
import { CgFramer } from "react-icons/cg";
import {SiCoursera} from "react-icons/si"
import {BsBook} from "react-icons/bs"
import '../Header/Header.css';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { GoCodeReview } from "react-icons/go";
import { MdPolicy } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";



const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path:"/courses",
    name:"Courses",
    icon:<SiCoursera/>,
    subRoutes:[
      {
        path:"/admin/courses/add",
        name:"Add Courses",
        icon: <IoMdAddCircle />,
      },
      {
        path:"/admin/courses/show",
        name:"Courses",
        icon: <BsBook />,
      }
    ]
  },
  {
    path: "/products",
    name: "Products",
    icon: <HiTemplate />,
    subRoutes: [
      {
        path: "/admin/products",
        name: "Products",
        icon: <FaOpencart />,
      },
      {
        path: "/admin/products/add",
        name: "Add Products",
        icon: <IoMdAddCircle />,
      },
    ],
  },
  {
    path: "/franchise",
    name: "Franchise",
    icon: <CgFramer />,
    exact: true,
    subRoutes: [
      {
        path: "/admin/franchise",
        name: "Franchise",
        icon: <FaUser />,
      },
      {
        path: "/admin/franchise/add",
        name: "Add Franchise",
        icon: <IoMdAddCircle />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Website Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/admin/ranks",
        name: "Ranks",
        icon: <FaUser />,
      },
      {
        path: "/admin/reviews",
        name: "Reviews",
        icon: <GoCodeReview />,      
      },
      {
        path: "/admin/termsCond",
        name: "Terms and Conditions",
        icon: <MdPolicy />
      },
      {
        path: "/admin/policy",
        name: "Privacy Policy",
        icon: <SiGnuprivacyguard />
      }

    ],
  },
  {
    path: "/admin/orders",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <AiOutlineUserSwitch />,
  },
];

const SideBar = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const toggle = () => setIsOpen(!isOpen);
  const [cookies] = useCookies(['token']);
  const userNameRef = useRef(null);

  // Function to decode the JWT token and extract user information
  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded.user;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  useEffect(() => {
    if (cookies.token) {
      const decodedUser = decodeToken(cookies.token);
      if (decodedUser) {
        userNameRef.current = decodedUser.name;
      }
    }
  }, [cookies.token]);
    const filteredRoutes = routes.filter((route) => {
    if (route.subRoutes) {
      const filteredSubRoutes = route.subRoutes.filter((subRoute) =>
        subRoute.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredSubRoutes.length > 0;
    } else {
      return route.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

 

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "280px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.9,
      },
    },
  };

 

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? '280px' : '45px',
            transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {userNameRef.current}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {filteredRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>

    </>
  );
};

export default SideBar;