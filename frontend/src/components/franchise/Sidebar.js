import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import {FaOpencart,} from "react-icons/fa"
import {BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import {HiTemplate} from "react-icons/hi"
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../Header/SidebarMenu";
import '../Header/Header.css';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';






const routes = [
  {
    path: "/franchise/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/products",
    name: "Products",
    icon: <HiTemplate />,
    subRoutes: [
      {
        path: "/franchise/products",
        name: "Products",
        icon: <FaOpencart />,
      },
     
    ],
  },
  
 
  {
    path: "/franchise/orders",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "Logout",
        icon: <FaLock />,
        // onClick:{handleLogout},
      },

    ],
  },

];

const SideBar = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [cookies,] = useCookies(['token']);
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

  useEffect(() => {
    if (cookies.token) {
      const decodedUser = decodeToken(cookies.token);
      if (decodedUser) {
        userNameRef.current = decodedUser.name;
      }
    }
  }, [cookies.token]);
  


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
            width: isOpen ? "280px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
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
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
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